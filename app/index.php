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
            -webkit-overflow-scrolling: touch;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
            z-index: 1000;
        }

        #formular.in {
            right: 0;
        }

        #formular input {
            background-color: transparent;
            border: none;
            clear: both;
            -webkit-appearance: none;
            width: 100%;
            border-bottom: 1px solid #000;
            font-family: inherit;
            outline: none;
            border-radius: 0;
            font-size: inherit;
            padding: .35rem 0;
        }
#formular.in + .blocker {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 999;
    top: 0;
    left: 0;
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
            padding: .15rem .65rem;
            border: none;
            font-size: inherit;
            cursor: pointer;
            font-family: inherit;
            border-radius: .35rem;
        }

        .btn-primary:hover {
            background-color: #ff003e;
            color: #000;
        }

        #formular #inp-newsletter {
            clear: none;
            -webkit-appearance: checkbox;
            height: .9rem;
            padding: 0;
            width: .9rem;
            margin: 0.15rem 0 0 0.1rem;
            position: relative;
            text-align: center;
            border: none;
            vertical-align: top;
            font-size: .9rem;
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
            margin: -.1rem 0 0 -0.5rem;
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

        @font-face {
            font-family: 'Scotch Genovese';
            src: url('fonts/ScotchGenovese-Book.woff2') format('woff2'), url('fonts/ScotchGenovese-Book.woff') format('woff');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
        }

        @font-face {
            font-family: 'Monument Grotesk';
            src: url('fonts/MonumentGrotesk-Medium.woff2') format('woff2'), url('fonts/MonumentGrotesk-Medium.woff') format('woff');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
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
                letter-spacing: 0.02em;
            line-height: 1.2;
        }

        .tools {
            margin: 10px;
        }

        h2 {
            /* border-radius: .25rem;
    /* background-color: white; 
    font-family: 'Monument Grotesk';
    text-align: center;
    padding: 5px 10px;
    margin: 10px;
    */
        }

        button {
            padding: .15rem .65rem;
            border: none;
            /* margin: 1rem 0 0; */
            border-radius: .25rem;
            font-size: inherit;
            cursor: pointer;
            font-family: 'Monument Grotesk';
            background-color: #e9e5ef;
                letter-spacing: 0.02em;
            line-height: 1.2;
        }

        button:hover {
            background-color: #ff003e;
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

        .iconmini {
            width: 75%;
            height: auto;
        }

        .trash {
            left: 48%;
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
            padding: 0;
            background: url(resources/ui/bg.png) no-repeat;
            background-size: 100%;
            width: 4rem;
            height: 4rem;
            min-height: 4rem;
            margin: 5px;
        }

        .selectable:hover {
            background: url(resources/ui/bg_red.png) no-repeat;
            background-size: 100%;
            width: 4rem;
            height: 4rem;
            min-height: 4rem;
        }

        .dropdownButton {
            background-color: #e9e9e9;
            width: 100%;
            /* margin: 0 0 .2rem; */
            /* margin: 1rem; */
        }

        .dropdown {
            display: flex;
            flex-direction: column;
            align-items: center;
            /* width: 160px; */
            /* margin: 10px; */
            /* pointer-events: none; */
            padding: 0 18px;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.2s ease-out;
        }

        .circle {
            border-radius: 100%;
            width: 3rem;
            height: 3rem;
        }

        .left {
            left: 1rem;
            display: flex;
            flex-direction: column;
        }

        .menu {
            width: 8rem;
            position: fixed;
            /* gap: 1rem; */
            /* margin: 1rem; */
        }

        .top {
            top: 1rem;
        }

        .right {
            right: 1rem;
        }

        .bottom {
            bottom: 1rem;
        }

        @media all and (max-width: 1000px) {

            html{
                font-size: 1rem;
            }

            .menu{
                width:unset;
            }
#formular {
    max-width: 100%;
    padding: 2rem .25rem 1rem .25rem;
}

            .left.top {
                flex-direction: row;
            }

            .dropdown {
                padding: 0 18px;
                overflow: hidden;
            }

            .dropdownButton{
                width: unset;
            }
        }
    </style>
</head>

<body>
    <?php $lang = $_GET['lang'];

    if($lang == 'en'){
        $tools = 'Tools';
        $texture = 'Texture';
        $dragndrop = 'Drag &amp; Drop';
        $nametext = 'Your name (real or pseudonym)';
        $emailtext = 'Your email address';
        $newslettertext = 'Yes, I would like to subscribe to the Blickfelder newsletter.';
        $pflichtfeldtext = 'Mandatory field / Your name will appear in the archive of all creatures next to your creation.';
        $submittext = 'Submit';
        $done = 'Done?';
        $langtag = 'en/';
    }
    else{
         $tools = 'Werkzeuge';
        $texture = 'Textur';
        $dragndrop = 'Drag &amp; Drop';
        $nametext = 'Dein Name (real oder Pseudonym)';
        $emailtext = 'Deine E-Mail-Adresse';
        $newslettertext = 'Ja, ich möchte den Blickfelder-Newsletter abonnieren.';
        $pflichtfeldtext = 'Pflichtfeld / Dein Name wird im Archiv aller Kreaturen neben deiner Kreation stehen.';
        $submittext = 'Abschicken';
        $done = 'Fertig?';
        $langtag = '';
    }
    ?>
    <script src='sculptgl.js'></script>
    <script src="draggabilly.pkgd.js"></script>
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
    <script src='blick.js'></script>
    <input type='file' id='fileopen' multiple style='display: none' />
    <input type='file' id='backgroundopen' style='display: none' />
    <input type='file' id='alphaopen' style='display: none' />
    <input type='file' id='textureopen' style='display: none' />
    <input type='file' id='matcapopen' style='display: none' />

    <div id='viewport'>
        <div id="eyeport" style="position:fixed;z-index: 1000;width: 100%;height: 100%; pointer-events: none;"></div>
        <canvas id='canvas'></canvas>
    </div>
    <div class="tools">
        <div class="menu left top">
            <div>
                <button class="dropdownButton"><?php echo $tools; ?></button>
                <div class="dropdown" style="margin-bottom: 1rem;>
                    <button class="selectable" onclick='Paint()'>
                        <image class="iconmini" src="resources/ui/pull.png"></image>
                    </button>
                    <button class="selectable" onclick='Crease()'>
                        <image class="iconmini" src="resources/ui/push.png"></image>
                    </button>
                    <button class="selectable" onclick='Drag()'>
                        <image class="iconmini" src="resources/ui/pinch.png"></image>
                    </button>
                </div>
            </div>
            <div>
                <button class="dropdownButton"><?php echo $texture; ?></button>
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
        <div class="menu left bottom" style="left:3rem">
            <button class="circle" onclick='Undo()'>
                <image class="icon" src="resources/ui/back.png"></image>
            </button>
        </div>
        <div class="menu right top">
            <div>
                <button class="dropdownButton"><?php echo $dragndrop; ?></button>
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
        <div class="menu right bottom" style="width:unset">
            <button id="fertig" onclick='toggleForm("in");takeScreenshot();'><?php echo $done; ?></button>
        </div>

        <div class="menu trash bottom" id="trash">
            <button class="circle" id="trashbutton">
                <image class="icon" src="resources/ui/Tool_Augen-loeschen.png "></image>
            </button>
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
            $filepath = $_COOKIE['monster'];
            $filepath = "https://blickfelder.ch/creature/monsters/". $filepath;
            $inp_email = $_POST['inp-email'];
            $inp_name = $_POST['inp-name'];
            $inp_newsletter = $_POST['inp-newsletter'];
            $sql = "INSERT INTO monsters " . "(name,email,newsletter,monsterimg,datestamp) " . "VALUES('$inp_name','$inp_email','$inp_newsletter','$filepath',NOW())";
            $retval = mysqli_query($conn, $sql);
            if (!$retval) {
                die('Could not enter data: ' . mysqli_error());
            }
           echo "<script>window.location.replace('https://blickfelder.ch/".$langtag."oktober/danke');</script>";
            mysqli_close($conn);
        } else {
        ?>

            <form action="<?php $_SERVER['PHP_SELF']; ?>" method="post" name="monsterform">
                <div class="form-group" id="fg-name">
                    <label class="control-label" for="inp-name"><?php echo $nametext; ?>*:</label> <input class="form-control" id="inp-name" name="inp-name" required="" type="text" value="">
                </div>
                <div class="form-group" id="fg-email">
                    <label class="control-label" for="inp-email"><?php echo $emailtext; ?>*:</label> <input class="form-control" id="inp-email" name="inp-email" required="" type="email" value="">
                </div>
                <div class="checkbox formcheckbox" id="fg-newsletter">
                    <label><input id="inp-newsletter" name="inp-newsletter" type="checkbox" value="1">
                        <p>
                            <?php echo $newslettertext; ?>
                        </p>
                    </label>

                </div>
                <input name="hidden_data" id='hidden_data' type="hidden" />
                <button class="btn btn-primary" id="submitbutton" name="submit" type="submit" value="Abschicken"><?php echo $submittext; ?></button>
            </form>
            <p class="small">
                *  <?php echo $pflichtfeldtext; ?>
            </p> <?php
                }
                    ?>
    </div>
<div class="blocker" onclick='toggleForm("in")'></div>
</body>

</html>