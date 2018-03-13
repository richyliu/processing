<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Projects</title>
    </head>
    <body>
        <div id="output"></div>
        <script src="../min/p5.min.js"></script>
        <!--<script src="../min/grafica.min.js"></script>
        <script src="../min/jquery-3.2.1.min.js"></script>
        <script src="../min/quadtree.min.js"></script>
        <script src="../min/Deserialize.js"></script>
        <script src="shared/NeuralNetwork.js"></script>-->
        <?php
            $dir = array_splice(scandir($_GET['file']), 2);

            foreach($dir as $file) {
                if (strpos($file, 'js')) {
                    echo '<script src="' . $_GET['file'] . '/' . $file . '"></script>';
                }
            }
        ?>
    </body>
</html>
