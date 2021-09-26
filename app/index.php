<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, viewport-fit=cover" />
    <title>
        Blickfelder Formular
    </title>

    <script>
        function save(dataURL) {
          document.getElementById('hidden_data').value = dataURL;
          var fd = new FormData(document.forms["monsterform"]);
          var xhr = new XMLHttpRequest();
          xhr.open('POST', 'upload_data.php', true);
          xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
              var percentComplete = (e.loaded / e.total) * 100;
              console.log(percentComplete + '% uploaded');
            }
          };
          xhr.onload = function () {

          };
          xhr.send(fd);
        };

    </script>
    <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

        html,
        body {
            width: 100%;
            height: 100%;
        }

        html {
            font-size: 20px;
        }

        #formular {
            background-color: #bfbfbf;
            font-family: 'Monument Grotesk';
            box-shadow: -1rem 0 2rem 2em #bfbfbf;
            height: 100%;
            position: fixed;
            padding: 3rem 3rem 1rem 1rem;
            width: 30em;
            right: -35rem;
            top: 0;
            transition: right .6s ease-out;
        }

        #formular.in {
            right: 0;
        }

        #formular input {
            background-color: transparent;
            border: none;
            clear: both;
            width: 100%;
            border-bottom: 1px solid #000;
            font-family: inherit;
            outline: none;
            font-size: inherit;
            padding: .35rem 0;
        }

        .form-group,
        .formcheckbox {
            margin: 0 0 2rem;
        }

        #formular p.small {
            position: absolute;
            bottom: 1rem;
            font-size: .6rem;
        }

        .btn-primary {
            font-family: Arial;
            padding: .25rem .65rem;
            border: none;
            font-size: inherit;
            cursor: pointer;
            font-family: inherit;
            border-radius: .35rem;
        }

        .btn-primary:hover {
            background-color: #000;
            color: #FFF;
        }

        #formular #inp-newsletter {
            clear: none;
            -webkit-appearance: checkbox;
            height: .1rem;
            padding: 0;
            width: .1rem;
            margin: 0.15rem 0 0 0.1rem;
            position: relative;
            text-align: center;
            border: none;
            vertical-align: top;
            font-size: .1rem;
            display: inline-block;
        }

        .formcheckbox label {
            display: flex;
        }

        #formular #inp-newsletter+p {
            display: inline-block;
            padding: 0 0 0 1.5rem;
        }

        .checkbox input:before {
            height: 1rem;
            cursor: pointer;
            width: 1rem;
            margin: -.1rem 0 0 -0.2rem;
            content: '';
            display: inline-block;
            background-color: #bfbfbf;
            border: 1px solid;
            position: absolute;
            top: 0;
            overflow: hidden;
        }

        .checkbox input:checked:before {
            background-image: url(img/cross.svg);
            background-size: 100%;
            background-position: center;
        }

        @media (max-width: 600px) {
            #formular {
                width: 100%;
                padding: 1.5rem 1rem;
                right: calc(-100% - 5rem);
            }
        }

        @font-face {
            font-family: 'Monument Grotesk';
            src: url('fonts/MonumentGrotesk-Medium.woff2') format('woff2'), url('fonts/MonumentGrotesk-Medium.woff') format('woff');
            font-weight: 500;
            font-style: normal;
        }

        ::selection {
            background: #00ed33;
            color: #000;
        }

        ::-moz-selection {
            background: #00ed33;
            color: #000;
        }

        body {
            overflow: hidden;
            margin: 0;
            font-family: 'Monument Grotesk';
            letter-spacing: .1rem;
            -moz-user-select: -moz-none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -o-user-select: none;
            user-select: none;
        }

        .tools {
            margin: 10px;
        }

        h2 {
            border-radius: 10px;
            /* background-color: white; */
            font-family: 'Monument Grotesk';
            text-align: center;
            padding: 5px 10px;
            margin: 10px;
        }

        button {
            font-family: 'Monument Grotesk';
            letter-spacing: .1rem;
            border-radius: 10px;
            font-size: 24px;
            background-color: white;
            border-style: none;
            text-align: center;
            padding: 5px 10px;
        }

        .active,
        button:hover,
        .dropdownButton:hover {
            background-color: #ff003e;
        }

        .icon {
            width: 100%;
            height: auto;
        }

        .trash {
            width: 100px;
            height: 100px;
            bottom: -100px;
            left: 45%;
            right: 0;
            position: fixed;
            transition: bottom 0.2s ease-out;
        }

        img {
            -webkit-user-drag: none;
            -khtml-user-drag: none;
            -moz-user-drag: none;
            -o-user-drag: none;
            pointer-events: none;
        }

        .selectable {
            background: url('resources/ui/bg.png') no-repeat;
            background-size: 100%;
            width: 100px;
            height: 100px;
            min-height: 100px;
        }

        .dropdownButton {
            background-color: #ffffff;
            width: 160px;
        }

        .dropdown {
            display: flex;
            flex-direction: column;
            margin: 10px;
            padding: 0 18px;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.2s ease-out;
        }

        .lefttop {
            position: fixed;
            left: 0px;
            top: 0px;
            margin: 10px;
            display: flex;
            flex-direction: column;
        }

        @media all and (max-width: 1000px) {
            .lefttop {
                flex-direction: row;
            }

            .dropdown {
                padding: 0 18px;
                overflow: hidden;
            }
        }
    </style>
</head>

<body>
    <script src='sculptgl.js'></script>
    <script src="draggabilly.pkgd.js"></script>
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
    <script src='blick.js'></script>
    <input type='file' id='fileopen' multiple style='display: none' />
    <input type='file' id='backgroundopen' style='display: none' />
    <input type='file' id='alphaopen' style='display: none' />
    <input type='file' id='textureopen' style='display: none' />
    <input type='file' id='matcapopen' style='display: none' />

    <div id='viewport' onclick='toggleForm("none")'>
        <div id="eyeport" style="position:fixed;z-index: 1000;width: 100%;height: 100%; pointer-events: none;"></div>
        <canvas id='canvas'></canvas>

    </div>
    <div class="tools">
        <div class="lefttop">
            <div style="margin:10px;">
                <button class="dropdownButton">Werkzeuge</button>
                <div class="dropdown">
                    <button class="selectable" onclick='Paint()'>
                        <image class="icon" src="resources/ui/pull.png"></image>
                    </button>
                    <button class="selectable" onclick='Crease()'>
                        <image class="icon" src="resources/ui/push.png"></image>
                    </button>
                    <button class="selectable" onclick='Drag()'>
                        <image class="icon" src="resources/ui/pinch.png"></image>
                    </button>
                </div>
            </div>
            <div style="margin:10px;">
                <button class="dropdownButton">Textur</button>
                <div class="dropdown">
                    <button class="selectable" onclick="LoadTexture('resources/bg.png', 0)">
                        <image class="icon" src="resources/ui/1.png"></image>
                    </button>
                    <button class="selectable" onclick="LoadTexture('resources/dropper.png', 1)">
                        <image class="icon" src="resources/ui/2.png"></image>
                    </button>
                    <button class="selectable" onclick="LoadTexture('resources/uv.png', 2)">
                        <image class="icon" src="resources/ui/3.png"></image>
                    </button>
                </div>
            </div>
        </div>
        <div class="leftbottom" style="position:fixed; bottom:0px;">
            <h2> <button style="border-radius: 100%; width:80px;" onclick='Undo()'>
                    <image class="icon" src="resources/ui/back.png"></image>
                </button></h2>
        </div>
        <div class="righttop" style="position:fixed; right:0px;top:10px;">
            <div style="margin:10px;">
                <button class="dropdownButton">Drag & Drop</button>
                <div class="dropdown">
                    <button class="selectable" id="eye">
                    </button>
                    <button class="selectable" id="eye">
                    </button>
                    <button class="selectable" id="eye">
                    </button>
                    <button class="selectable" id="eye">
                    </button>
                    <button class="selectable" id="eye">
                    </button>
                    <button class="selectable" id="eye">
                    </button>
                </div>
            </div>
        </div>
        <div class="rightbottom" style="position:fixed; right:0px;bottom:0px;">
            <h2> <button id="fertig" style="width:140px;" onclick='toggleForm("in");takeScreenshot();'>Fertig?</button></h2>
        </div>

        <div class="trash" id="trash">
            <image class="icon" src="resources/ui/trash.jpg"></image>
        </div>
    </div>
    <div id="formular">

        <?php

        if (isset($_POST['submit'])) {
            $dbhost = 'windspie.mysql.db.hostpoint.ch';
            $dbuser = 'windspie_blickf';
            $dbpass = 'FU?GBL2oB!8TZAmzFb8v';
            $dbname = 'windspie_blickfelder';
            $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
            mysqli_set_charset($conn, 'utf8mb4');
            if (!$conn) {
                die('Could not connect: ' . mysqli_error());
            }
            include 'upload_data.php';
            $inp_email = $_POST['inp-email'];
            $inp_name = $_POST['inp-name'];
            $inp_newsletter = $_POST['inp-newsletter'];
            $upload_dir = "https://blickfelder.ch/testformular/monsters/";
            $file = $upload_dir . $time . ".png";
            $filename = $file;

            $sql = "INSERT INTO monsters " . "(name,email,newsletter,monsterimg,datestamp) " . "VALUES('$inp_name','$inp_email','$inp_newsletter','$filename',NOW())";
            $retval = mysqli_query($conn, $sql);

            if (!$retval) {
                die('Could not enter data: ' . mysqli_error());
            }

            echo "Danke für die Einreichung!\n";

            mysqli_close($conn);
        } else {
        ?>

            <form action="https://blickfelder.ch/oktober/danke" method="post" name="monsterform">
                <div class="form-group" id="fg-name">
                    <label class="control-label" for="inp-name">Dein Name (real oder Pseudonym)*:</label> <input class="form-control" id="inp-name" name="inp-name" required="" type="text" value="">
                </div>
                <div class="form-group" id="fg-email">
                    <label class="control-label" for="inp-email">Deine E-Mail-Adresse*:</label> <input class="form-control" id="inp-email" name="inp-email" required="" type="email" value="">
                </div>
                <div class="checkbox formcheckbox" id="fg-newsletter">
                    <label><input id="inp-newsletter" name="inp-newsletter" type="checkbox" value="1">
                        <p>
                            Ja, ich möchte den Blickfelder-Newsletter abonnieren.
                        </p>
                    </label>

                </div>
                <input name="hidden_data" id='hidden_data' type="hidden" />
                <button class="btn btn-primary" id="submitbutton" name="submit" onclick="" type="submit" value="Abschicken">Abschicken</button>
            </form>
            <p class="small">
                *Pflichtfeld / Dein Name wird im Archiv aller Kreaturen neben deiner Kreation stehen.
            </p> <?php
                }
                    ?>
    </div>

</body>

</html>