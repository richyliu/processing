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
let directory = {
    'evo_sim': [
        'main',
        'world',
        'blob',
        'basicblob'
    ],
    'battleship': [
        'main'
    ],
    'pianojs': [
        'main'
    ],
    'polytopia': [
        'main'
    ],
    'scrabble': [
        'scrabble'
    ]
};


// delete this later
for (let folder in directory) {
    $('#project').append(`<option>${folder}</option>`);
}

// initialize directory
// get('https://api.github.com/repos/richyliu/processing/contents' + auth, data => {
//     data.forEach(directory => {
//         if (directory.type == 'dir') {
//             $('#project').append(`<option>${directory.name}</option>`);
//             directory[directory.name] = [];
//             get(`https://api.github.com/repos/richyliu/processing/contents/${directory.name}${auth}`, files => {
//                 files.forEach(file => {
//                     // matches filename ending with .js
//                     let match = file.name.match(/^(.+)\.js/);
//                     if (match) {
//                         directory[directory.name].push(match[1]);
//                     }
//                 });
//             });
//         }
//     });
// });

// setup code mirror
let cm = CodeMirror.fromTextArea($('#editor')[0], {
    mode: 'javascript',
    theme: 'material',
    indentUnit: 4,
    lineNumbers: true,
    extraKeys: {
        'Ctrl-S': save,
        'Cmd-S': save,
        'Ctrl-/': cm => {
            cm.toggleComment();
        },
        'Cmd-/': cm => {
            cm.toggleComment();
        },
        'Ctrl-B': runCode,
        'Cmd-B': runCode,
    },
    continueComments: true
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
        get(`https://api.github.com/repos/richyliu/processing/contents/projects/${$('#project')[0].value}/${$('#file')[0].value}.js${auth}`, data => {
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

// run code in iframe
$('#run-code').click(runCode);

$('#save').click(save);



// when the auth stated changes, either execute logged in or logged out code
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // logged in
        let project = localStorage.getItem('project') || 'evo_sim';
        let file = localStorage.getItem('file') || 'main';
        
        updateList(project);
        loadFile(project, file);
        $('#project')[0].value = project;
        $('#file')[0].value = file;
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
    save();
    
    directory[$('#project')[0].value].forEach(file => {
        ref.child($('#project')[0].value).child(file).once('value', snapshot => {
            eval(window.atob(snapshot.val()));
            
            // last file
            if (typeof window.mainCode == 'function') {
                $('#output-wrapper').html('');
                window.mainCode = null;
                window.p = null;
                new p5(instance => {
                    console.log('instiating p5');
                    window.p = instance;
                    window.mainCode();
                }, $('#output-wrapper')[0]);
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
 * Get JSON from a url
 * @param  {string}   url      Source url
 * @param  {Function} callback Data passed in as first argument
 */
function get(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            let data = JSON.parse(request.responseText);
            callback(data);
        } else {
            // We reached our target server, but it returned an error
            console.error(request);
        }
    };
    request.send();
}
