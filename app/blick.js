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
        console.log(acc[d].innerText);
        if (acc[d].innerText == "Werkzeuge" || acc[d].innerText == "Tools") {
            acc[d].classList.toggle("active");
            panel.style.maxHeight = null;
            console.log("ha");
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";

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
            this.setPosition(pointer.clientX, pointer.clientY - self.addedToEye * 60);

            // event.srcElement.style.left = pointer.clientX + "px";
            // event.srcElement.style.bottom = pointer.clientY + "px";

            // console.log(event.srcElement.style);
        }

        //Show Trash
        trash.style.bottom = '1rem';

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

        trash.style.bottom = '-100px';

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

    let eyeSize = '95px';

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
    console.log(app);

    app._stateManager.undo();
}

function toggleForm(value) {
    document.getElementById("formular").style.display = value;
}


function takeScreenshot() {

    app.screenshot();
    html2canvas(document.getElementById('viewport')).then(canvas => {
        // Without 'preserveDrawingBuffer' set to true, we must render now
        // img.src = canvas.toDataURL();


        // open in new window like this
        var w = window.open('', '');
        w.document.title = "Screenshot";
        var img = new Image();
        // // Without 'preserveDrawingBuffer' set to true, we must render now
        img.src = canvas.toDataURL();
        w.document.body.appendChild(img);


        console.log(canvas);
        // save(canvas.toDataURL());
    });
    app.render();
}