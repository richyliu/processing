// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCNijsg_9QoHtOOYcqDHTmlkPz2czAt26s",
    authDomain: "code-editor-64d96.firebaseapp.com",
    databaseURL: "https://code-editor-64d96.firebaseio.com",
    projectId: "code-editor-64d96",
    storageBucket: "code-editor-64d96.appspot.com",
    messagingSenderId: "38033207002"
});

let ref = firebase.database().ref();
let password;
let auth = '?client_id=d036f9ed0ff4ffe05f92&client_secret=94968fd4157d632abbe1b0d5d2de52ecaa077f09';
// a list of all the files and folders
let directory = {};
// list of globals that need to be cleared on each 
let globals = {};


// setup code mirror
let cm = CodeMirror.fromTextArea($('#editor')[0], {
    mode: 'javascript',
    theme: 'material',
    indentUnit: 4,
    lineNumbers: true,
    extraKeys: {
        'Ctrl-/': cm => {
            cm.toggleComment();
        },
        'Cmd-/': cm => {
            cm.toggleComment();
        },
        'Ctrl-S': save,
        'Cmd-S': save,
        'Ctrl-I': runCode,
        'Ctrl-`': switchScreen,
    },
    continueComments: true,
    scrollbarStyle: 'overlay'
});


// init event handlers
$('#project').change(() => {
    let project = $('#project')[0].value;
    
    updateList(project);
    localStorage.setItem('project', project);
    dropdownChange();
});
$('#file').change(dropdownChange);
function dropdownChange() {
    let project = $('#project')[0].value;
    let file = $('#file')[0].value;
    
    loadFile(project, file);
    localStorage.setItem('file', file);
}

// pulls data from github to overwrite current file
$('#pull').click(() => {
    if (confirm('Are you sure you want to overwrite the current file?')) {
        $.get(`https://api.github.com/repos/richyliu/processing/contents/projects/${$('#project')[0].value}/${$('#file')[0].value}.js${auth}`, data => {
            // data is in base64
            cm.setValue(window.atob(data.content));
            
            // save to firebase
            ref
                .child($('#project')[0].value)
                .child($('#file')[0].value)
                .set(data.content);
        });
    }
});

// run code
$('#run-code').click(runCode);

// save code
$('#save').click(save);

// pause code
$('#pause').click(pause);

// switch between output and editor
$(document).keydown(e => {
    if (e.which == 192 && e.ctrlKey) {
        switchScreen();
    }
    if (e.which == 66 && e.ctrlKey) {
        pause();
    }
});



// when the auth stated changes, either execute logged in or logged out code
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // logged in
        let project = localStorage.getItem('project') || 'evo_sim';
        let file = localStorage.getItem('file') || 'main';
        
        // initialize directory
        initDirectory(() => {
            updateList(project);
            $('#project')[0].value = project;
            $('#file')[0].value = file;
            for (let folder in directory) {
                $.get(`https://raw.githubusercontent.com/richyliu/processing/gh-pages/projects/${folder}/manifest.json${auth}`, data => {
                    globals[folder] = JSON.parse(data).globals || [];
                });
            }
        });
        
        loadFile(project, file);
    } else {
        // not logged in
        // prompt the user for the password
        password = prompt("Enter your password");
        
        // onAuthStateChanged will run again after login
        firebase.auth().signInWithEmailAndPassword('a@a.com', password).catch(e => console.error(e));
    }
});



/**
 * Loads a certain file in the a project
 * @param  {string} project Full name of the project to load
 * @param  {string} file    Full name of the file to load
 */
function loadFile(project, file) {
    ref.child(project).child(file).once('value', snapshot => {
        cm.setValue(window.atob(snapshot.val() || ''));
    });
}



/**
 * Save current file's contents to firebase
 */
function save() {
    // save notepad content to firebase
    ref
        .child($('#project')[0].value)
        .child($('#file')[0].value)
        .set(window.btoa(cm.getValue()));
}



/**
 * Run the current project in the iframe
 */
function runCode() {
    switchScreen();
    save();
    $('#output').html('');
    window.p = null;
    let project = $('#project')[0].value;
    
    globals[project].forEach(global => {
        window[global] = null;
    });
    
    // number of files that need to be loaded before executing main
    let numFiles = directory[project].length;
    // number of files that are done
    let numDone = 0;
    // all the code
    let code = Array(numFiles).fill('');
    
    directory[project].forEach((file, i) => {
        ref.child(project).child(file).once('value', snapshot => {
            // save file to spot in code
            code[i] = window.atob(snapshot.val());
            
            numDone++;
            
            // run all the code once everything has been loaded
            if (numDone == numFiles) {
                new p5(instance => {
                    window.p = instance;
                    code.forEach(c => {
                        $.globalEval(c);
                    });
                }, $('#output')[0]);
            }
        });
    });
    
}



/**
 * Update list of files and projects only for current project
 * @param  {string} project    Current project to update list
 */
function updateList(project) {
    $('#file').html('');
    
    for (let folder in directory) {
        if (folder == project) {
            directory[folder].forEach(file => {
                $('#file').append(`<option>${file}</option>`);
            });
            break;
        }
    }
}



/**
 * Pause the p5 instance
 */
function pause() {
    if (p._loop) {
        p.noLoop();
        switchScreen();
    } else {
        p.loop();
    }
}



/**
 * Toggle between the editor and the output
 */
function switchScreen() {
    $('#editor-wrapper').toggle();
    $('#output-wrapper').toggle();
}



/**
 * Initialize directory from Github
 * @param  {Function} callback Called once everything finished
 */
function initDirectory(callback) {
    let expectedTotal = 0;
    let total = 0;
    $.get('https://api.github.com/repos/richyliu/processing/contents/projects' + auth, data => {
        data.forEach(folder => {
            if (folder.type == 'dir') {
                expectedTotal++;
                $('#project').append(`<option>${folder.name}</option>`);
                directory[folder.name] = [];
                
                // load files
                $.get(`https://api.github.com/repos/richyliu/processing/contents/projects/${folder.name}${auth}`, files => {
                    total++;
                    files.forEach(file => {
                        // matches filename ending with .js
                        let match = file.name.match(/^(.+)\.js$/);
                        if (match) {
                            directory[folder.name].push(match[1]);
                        }
                    });
                    if (total == expectedTotal) {
                        callback();
                    }
                });
            }
        });
    });
}
