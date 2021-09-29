'use strict'

////
var app;
var _this = this;
var eyeEmpty = [];
var trash;
var addedToEye = 0;
var allEyes;
var eyeSize = '4.2rem';
var allTools;

window.mobileCheck = function() {
    let check = false;
    (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

// if you have multiple .draggable elements
// get all draggie elements
var draggableElems = document.querySelectorAll('.draggable');
// array of Draggabillies
var draggies = []
var eyeURLs = ['resources/eyes/1.png', 'resources/eyes/2.png', 'resources/eyes/3.png', 'resources/eyes/4.png', 'resources/eyes/5.png', 'resources/eyes/6.png']
var trashbutton = document.getElementById("trashbutton");
allTools = document.getElementsByClassName("iconmini")

window.addEventListener('resize', onWindowResize);


window.addEventListener('load', function() {

    app = new window.SculptGL();
    app.start();

    // app._background.loadBackgroundURL("resources/ui/empty.png");

    app._background.loadBackgroundURL("resources/bg.png");

    registerDropdowns(document.getElementsByClassName("dropdownButton"));
    trash = document.getElementById("trash");

    allEyes = document.querySelectorAll('#eye');
    for (var i = 0; i < allEyes.length; i++) {
        var eye = allEyes[i];

        makeeye(i, eye);
        eyeEmpty[i] = false;
    }

    trashbutton = document.getElementById("trashbutton");

    centerTrash();

    app._sculptManager.setToolIndex(1);
    app._sculptManager.setTempToolIndex(1);
    app._sculptManager.selectionChanged(app._mainObj);

    deactivateToolButtons(0);


    setInterval(onTimerTick, 33); // 33 milliseconds = ~ 30 frames per sec

});

function onWindowResize() {
    for (var i = 0; i < draggies.length; i++) {
        var elem = draggies[i];

        // console.log(elem.position.x / window.innerWidth + " and " + elem.position.y / window.innerHeight);
    }

    centerTrash();
}

function centerTrash() {
    var centerTrash = window.innerWidth / 2 - 30;
    document.getElementById('trash').style.left = centerTrash + 'px';

}

function registerDropdowns(acc) {
    for (let d = 0; d < acc.length; d++) {
        acc[d].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });

        var panel = acc[d].nextElementSibling;
        console.log(window.innerWidth);
        if (window.innerWidth < 1000) {
            acc[d].classList.toggle("active");
            panel.style.maxHeight = null;
        } else {

            // if (acc[d].innerText == "Werkzeuge" || acc[d].innerText == "Tools") {
            //     acc[d].classList.toggle("active");
            //     panel.style.maxHeight = null;

            // } else {
            panel.style.maxHeight = panel.scrollHeight + "px";

            // }
        }
    }
}

function onTimerTick() {
    for (var i = 0; i < eyeEmpty.length; i++) {

        if (eyeEmpty[i]) {
            makeeye(i, allEyes[i]);
            eyeEmpty[i] = false;
        }
    }
}

function makeeye(i, eye) {
    //Add dragable
    var draggie = new Draggabilly(createEye(i, eye), {
        // options...
    });
    draggies.push(draggie);

    var self = _this;
    // draggie.setPosition(window.innerWidth - 145, i * 100 + 90);

    draggie.on('pointerDown', function(event, pointer) {

        // let left = event.srcElement.style.left;
        // let top = event.srcElement.top;

        // console.log(event.srcElement.style);

        if (event.srcElement.parentElement.id != "eyeport") {
            document.getElementById("eyeport").appendChild(event.srcElement);

            self.addedToEye++;
            console.log(self.addedToEye);
            this.setPosition(pointer.clientX - 95 / 2, pointer.clientY - self.addedToEye * 95 + 95 / 2);

            // event.srcElement.style.left = pointer.clientX + "px";
            // event.srcElement.style.bottom = pointer.clientY + "px";

            // console.log(event.srcElement.style);
        }

        //Show Trash
        trash.style.bottom = '1rem';

    });
    draggie.on('pointerUp', function(event, pointer) {
        trash.style.bottom = '-100px';

    });



    draggie.on('dragMove', function(event, pointer, moveVector) {
        if (pointer.pageY > window.innerHeight - 100 && pointer.pageX > window.innerWidth / 2 - 50 && pointer.pageX < window.innerWidth / 2 + 50) {
            trashbutton.style.backgroundColor = "#ff003e";
        } else {
            trashbutton.style.backgroundColor = "#e9e9e9";
        }

    });

    draggie.on('dragEnd', function(event, pointer) {

        if (event.srcElement.id == "canvas")
            return;

        if (pointer.pageX < window.innerWidth - 100) {

            if (hasClass(event.srcElement, "placed")) {
                console.log("move an existing one");
            } else {
                let id = event.srcElement.id;
                event.srcElement.className = "placed";
                // document.getElementById("eyeport").appendChild(event.srcElement);

                eyeEmpty[id] = true;
            }

            if (pointer.pageY > window.innerHeight - 100 && pointer.pageX > window.innerWidth / 2 - 50 && pointer.pageX < window.innerWidth / 2 + 50) {
                event.srcElement.style.opacity = '0';
            }
        }


    });
}

function hasClass(target, className) {
    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
}




function Paint() {
    // console.log("pinch");
    app._sculptManager.setToolIndex(1);
    app._sculptManager.setTempToolIndex(1);
    app._sculptManager.selectionChanged(app._mainObj);

    deactivateToolButtons(0);
}

function Crease() {
    // console.log("crease");

    app._sculptManager.setToolIndex(6);
    app._sculptManager.setTempToolIndex(6);
    app._sculptManager.selectionChanged(app._mainObj);

    deactivateToolButtons(1);
}

function Drag() {
    // console.log("crease");

    app._sculptManager.setToolIndex(7);
    app._sculptManager.setTempToolIndex(7);
    app._sculptManager.selectionChanged(app._mainObj);

    deactivateToolButtons(2);
}

function deactivateToolButtons(id) {
    for (var i = 0; i < allTools.length; i++) {

        allTools[i].parentElement.style.background = "url(./resources/ui/bg.png) no-repeat";
        allTools[i].parentElement.style.backgroundSize = "100%";

    }

    allTools[id].parentElement.style.background = "url(./resources/ui/bg_red.png) no-repeat";
    allTools[id].parentElement.style.backgroundSize = "100%";

}


function createEye(id, parent) {
    let elem = document.createElement("div");
    let img = document.createElement("img");



    img.src = eyeURLs[id];
    img.style.width = eyeSize;
    img.style.height = eyeSize;
    img.style.position = "flexible";

    elem.appendChild(img);
    // elem.style.display = "contents";
    elem.style.pointerEvents = 'all';
    elem.style.width = eyeSize;
    elem.style.height = eyeSize;
    elem.id = id;


    // document.getElementById("eyeport").appendChild(elem);
    parent.appendChild(elem);



    return elem;
}

function LoadTexture(url, id) {
    app.loadTextureManual(url, id);
}

function Undo() {

    app._stateManager.undo();
}

function toggleForm(value) {
    document.getElementById("formular").classList.toggle(value);
}


function replaceColor(_canvas) {

    var ctx = _canvas.getContext("2d");
    var imageData = ctx.getImageData(0, 0, _canvas.width, _canvas.height);

    var data = imageData.data;

    console.log(data);

    for (var i = 0; i < data.length; i += 4) {
        var red = data[i + 0];
        var green = data[i + 1];
        var blue = data[i + 2];

        var redA = false;
        var blueA = false;
        var greenA = false;

        var variance = 5;

        var redbase = 255;
        var greenBase = 255;
        var blueBase = 255;


        if (green > greenBase - variance && green < greenBase + variance)
            greenA = true;

        if (blue > blueBase - variance && blue < blueBase + variance)
            blueA = true;

        if (red > redbase - variance && red < redbase + variance)
            redA = true;

        if (redA && greenA && blueA) {
            data[i + 3] = 0;
        }
    }
    ctx.putImageData(imageData, 0, 0);

    // open in new window like this

    var w = window.open('', '');
    w.document.title = "Screenshot";
    var img = new Image();
    // // Without 'preserveDrawingBuffer' set to true, we must render now
    img.src = _canvas.toDataURL();
    w.document.body.appendChild(img);
    // save(_canvas.toDataURL());

}

function takeScreenshot() {

    app.screenshot();
    html2canvas(document.getElementById('viewport')).then(canvas => {
        // Without 'preserveDrawingBuffer' set to true, we must render now
        // img.src = canvas.toDataURL();

        replaceColor(canvas);
        // VON JONAS AUSGEBLENDET
        // save(canvas.toDataURL());
    });
    app.render();
}


function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return ({
        h: h,
        s: s,
        l: l,
    });
}


function hslToRgb(h, s, l) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return ({
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
    });
}