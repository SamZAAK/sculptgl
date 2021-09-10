import Selection from 'drawables/Selection';
import Tools from 'editing/tools/Tools';
import Enums from 'misc/Enums';

class SculptManager {

    constructor(main) {
        this._main = main;

        this._oldMesh = null;

        this._toolIndex = Enums.Tools.CREASE; // sculpting mode
        this._tempToolIndex = Enums.Tools.CREASE;
        this._tools = []; // the sculpting tools

        // symmetry stuffs
        this._symmetry = true; // if symmetric sculpting is enabled  

        // continuous stuffs
        this._continuous = true; // continuous sculpting
        this._sculptTimer = -1; // continuous interval timer

        this._selection = new Selection(main._gl); // the selection geometry (red hover circle)

        this.init();
    }

    setToolIndex(id) {
        this._toolIndex = id;
    }

    getToolIndex() {
        return this._toolIndex;
    }

    setTempToolIndex(id) {
        this._tempToolIndex = id;
    }
    getTempToolIndex() {
        return this._tempToolIndex;
    }

    getCurrentTool() {
        return this._tools[this._toolIndex];
    }

    getSymmetry() {
        return this._symmetry;
    }

    getTool(index) {
        return this._tools[index];
    }

    getSelection() {
        return this._selection;
    }

    init() {
        var main = this._main;
        var tools = this._tools;
        for (var i = 0, nb = Tools.length; i < nb; ++i) {
            if (Tools[i]) tools[i] = new Tools[i](main);
        }
    }

    canBeContinuous() {
        switch (this._toolIndex) {
            case Enums.Tools.TWIST:
            case Enums.Tools.MOVE:
            case Enums.Tools.DRAG:
            case Enums.Tools.LOCALSCALE:
            case Enums.Tools.TRANSFORM:
                return false;
            default:
                return true;
        }
    }

    isUsingContinuous() {
        return this._continuous && this.canBeContinuous();
    }

    start(ctrl) {
        var tool = this.getCurrentTool();
        var canEdit = tool.start(ctrl);
        if (this._main.getPicking().getMesh() && this.isUsingContinuous())
            this._sculptTimer = window.setInterval(tool._cbContinuous, 16.6);

        this.selectionChanged(this._main.getPicking().getMesh());
        return canEdit;
    }

    selectionChanged(mesh) {
        console.log(mesh.name);

        if (mesh == null || mesh == this._oldMesh) {

        } else {
            console.log("h");
            if (mesh.name == "head") {
                this.setToolIndex(this.getTempToolIndex());

            } else {
                var id = this.getToolIndex();

                this.setTempToolIndex(id);

                this.setToolIndex(12);
            }
            console.log(this.getTempToolIndex());

            this._oldMesh = mesh;


        }
    }

    end() {
        this.getCurrentTool().end();
        if (this._sculptTimer !== -1) {
            clearInterval(this._sculptTimer);
            this._sculptTimer = -1;
        }
    }

    preUpdate() {
        this.getCurrentTool().preUpdate(this.canBeContinuous());
    }

    update() {
        if (this.isUsingContinuous())
            return;
        this.getCurrentTool().update();
    }

    postRender() {
        this.getCurrentTool().postRender(this._selection);
    }

    addSculptToScene(scene) {
        return this.getCurrentTool().addSculptToScene(scene);
    }
}

export default SculptManager;