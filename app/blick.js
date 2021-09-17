//Animation Stuff

var acc = document.getElementsByClassName("dropdownButton");
var addedToEye = 0;
console.log(acc);

for (var i = 0; i < acc.length; i++) {
    console.log(acc[i]);

    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });

    var panel = acc[i].nextElementSibling;

    panel.style.maxHeight = panel.scrollHeight + "px";
}



////

var app;
var _this = this;
var eyeEmpty = [];


var trash = document.getElementById("trash");

// if you have multiple .draggable elements
// get all draggie elements
var draggableElems = document.querySelectorAll('.draggable');
// array of Draggabillies
var draggies = []
var eyeURLs = ['resources/eyes/1.png', 'resources/eyes/2.png', 'resources/eyes/3.png', 'resources/eyes/4.png', 'resources/eyes/5.png', 'resources/eyes/6.png']

var allEyes = document.querySelectorAll('#eye');
console.log(allEyes);
for (var i = 0; i < allEyes.length; i++) {
    var eye = allEyes[i];

    makeeye(i, eye);
    eyeEmpty[i] = false;
}

setInterval(onTimerTick, 33); // 33 milliseconds = ~ 30 frames per sec

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
        trash.style.bottom = '0px';

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

            if (pointer.pageY > window.innerHeight - 100) {
                console.log(pointer);
                event.srcElement.style.opacity = '0';
            }
        }
        console.log(trash);
        trash.style.bottom = '-100px';

    });
}

function hasClass(target, className) {
    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
}


window.addEventListener('load', function() {
    app = new window.SculptGL();
    app.start();

    app._background.loadBackgroundURL("resources/bg.png");

});

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

// function Eye(id) {
//     // app.addPlane(id);
//     // app._sculptManager.setToolIndex(12);

//     // init Draggabillies

//     var draggie = new Draggabilly(createEye(id), {
//         // options...
//     });
//     draggies.push(draggie);
//     draggie.setPosition(500, 500);

// }

function createEye(id, parent) {
    let elem = document.createElement("div");
    let img = document.createElement("img");

    let eyeSize = '60px';

    img.src = eyeURLs[id];
    img.style.width = eyeSize;
    img.style.height = eyeSize;
    img.style.position = "flexible";

    elem.appendChild(img);
    elem.style.display = "absolute";
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
        var img = new Image();
        // Without 'preserveDrawingBuffer' set to true, we must render now
        // img.src = canvas.toDataURL();
        save(canvas.toDataURL());
    });
    app.render();
}