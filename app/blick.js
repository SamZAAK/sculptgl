'use strict'

////
var app;
var _this = this;
var eyeEmpty = [];
var trash;
var addedToEye = 0;
var allEyes;

// if you have multiple .draggable elements
// get all draggie elements
var draggableElems = document.querySelectorAll('.draggable');
// array of Draggabillies
var draggies = []
var eyeURLs = ['resources/eyes/1.png', 'resources/eyes/2.png', 'resources/eyes/3.png', 'resources/eyes/4.png', 'resources/eyes/5.png', 'resources/eyes/6.png']
var trashbutton = document.getElementById("trashbutton");

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

    app._sculptManager.setToolIndex(1);
    app._sculptManager.setTempToolIndex(1);
    app._sculptManager.selectionChanged(app._mainObj);

    setInterval(onTimerTick, 33); // 33 milliseconds = ~ 30 frames per sec

});

function onWindowResize() {
    console.log(window.innerWidth);
    for (var i = 0; i < draggies.length; i++) {
        var elem = draggies[i];

        console.log(elem.position.x / window.innerWidth + " and " + elem.position.y / window.innerHeight);
    }
}

function registerDropdowns(acc) {
    console.log(acc.length);
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

            if (acc[d].innerText == "Werkzeuge" || acc[d].innerText == "Tools") {
                acc[d].classList.toggle("active");
                panel.style.maxHeight = null;

            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";

            }
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

}

function Crease() {
    // console.log("crease");

    app._sculptManager.setToolIndex(6);
    app._sculptManager.setTempToolIndex(6);
    app._sculptManager.selectionChanged(app._mainObj);

}

function Drag() {
    // console.log("crease");

    app._sculptManager.setToolIndex(7);
    app._sculptManager.setTempToolIndex(7);
    app._sculptManager.selectionChanged(app._mainObj);
}


function createEye(id, parent) {
    let elem = document.createElement("div");
    let img = document.createElement("img");

    let eyeSize = '4rem';

    img.src = eyeURLs[id];
    img.style.width = eyeSize;
    img.style.height = eyeSize;
    img.style.position = "flexible";

    elem.appendChild(img);
    // elem.style.display = "contents";
    elem.style.pointerEvents = 'all';
    elem.style.width = '100%';
    elem.style.height = 'auto';
    elem.id = id;


    // document.getElementById("eyeport").appendChild(elem);
    parent.appendChild(elem);



    return elem;
}

function LoadTexture(url, id) {
    app.loadTextureManual(url, id);
}

function Undo() {
    console.log(app);

    app._stateManager.undo();
}

function toggleForm(value) {
    document.getElementById("formular").classList.toggle(value);
}

function replaceColor(_canvas) {

    // var ctx = _canvas.getContext("2d");
    // var imageData = ctx.getImageData(0, 0, _canvas.width, _canvas.height);

    // var data = imageData.data;

    // console.log(data);

    // for (var i = 0; i < data.length; i += 4) {
    //     var red = data[i + 0];
    //     var green = data[i + 1];
    //     var blue = data[i + 2];

    //     var redA = false;
    //     var blueA = false;
    //     var greenA = false;

    //     var variance = 5;

    //     var redbase = 255;
    //     var greenBase = 255;
    //     var blueBase = 255;


    //     if (green > greenBase - variance || green < greenBase + variance)
    //         greenA = true;

    //     if (blue > blueBase - variance || blue < blueBase + variance)
    //         blueA = true;

    //     if (red > redbase - variance || red < redbase + variance)
    //         redA = true;

    //     if (redA && greenA && blueA) {
    //         data[i + 3] = 0;
    //     }
    // }
    // ctx.putImageData(imageData, 0, 0);

    // open in new window like this
  
   var w = window.open('', '');
    w.document.title = "Screenshot";
    var img = new Image();
    // // Without 'preserveDrawingBuffer' set to true, we must render now
    img.src = _canvas.toDataURL();
    w.document.body.appendChild(img);
}

function takeScreenshot() {

    app.screenshot();
    html2canvas(document.getElementById('viewport')).then(canvas => {
        // Without 'preserveDrawingBuffer' set to true, we must render now
        // img.src = canvas.toDataURL();

        // replaceColor(canvas); VON JONAS AUSGEBLENDET
  save(canvas.toDataURL());
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