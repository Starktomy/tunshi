/*:ja
@target MV MZ
@plugindesc virtual stick v1.1.2
@author unagi ootoro
@url https://raw.githubusercontent.com/unagiootoro/RPGMZ/master/VirtualPad.js
@help
It is a plugin that introduces a virtual stick.

【How to use】
By changing the "stick mode" of the plug-in parameter
・ Move in 4 directions
・ Move in 8 directions
・ 360 degree movement
You can choose one of them.

If you choose to move in 8 directions or 360 degrees, you need to install the following plug-ins.
・ 8-direction movement: A plug-in that supports diagonal movement, or a dot movement plug-in
・ 8-direction movement: Dot movement plug-in
* For plug-ins that support diagonal movement
  We have confirmed the operation with "Yami_8DirEx.js" and "HalfMove.js".

When used in combination with other mobile plug-ins, this plug-in is
Please install below other mobile plugins.

【License】
This plugin is available under the terms of the MIT license.


@param STICK_MODE
@text stick mode
@type number
@default 0
@desc
Specifies the mode of the virtual stick.
0: 4 directions move 1: 8 directions move 2: 360 degrees move

@param PAD_SIZE
@text pad size
@type number
@ default 128
@desc
Specifies the size of the virtual stick.

@param STICK_SIZE
@text stick size
@type number
@default 64
@desc
Specifies the stick size of the virtual stick.

@param MARGIN
@text margin
@type number
@default 8
@desc
Specifies the pad center judgment margin.

@param ALWAYS_DUSH
@text always dash
@type boolean
@default false
@desc
If set to true, pad movement will always be a dash.

@param PAD_IMAGE_FILE_NAME
@text pad image file name
@type file
@dir img
@desc
Specify the file name of the pad image.

@param STICK_IMAGE_FILE_NAME
@text stick image file name
@type file
@dir img
@desc
Specify the file name of the stick image.

@param PAD_STROKE_COLOR
@text Pad border color
@type string
@default #0000aa
@desc
Specifies the color of the pad border.

@param PAD_FILL_COLOR
@text Pad fill color
@type string
@default #0000ff
@desc
Specifies the color of the pad fill.

@param PAD_OPACITY
@text pad transparency
@type number
@default 64
@desc
Specify the transparency of the pad from 0 to 255.

@param STICK_STROKE_COLOR
@text Stick border color
@type string
@default #0000aa
@desc
Specifies the color of the stick border.

@param STICK_FILL_GRAD1_COLOR
@text Stick fill gradient start
@type string
@default #ffffff
@desc
Stick fill Specifies the color at which the gradient starts.

@param STICK_FILL_GRAD2_COLOR
@text Stick fill gradient middle
@type string
@default #aaaaff
@desc
Stick fill gradient Specifies a color in the middle.

@param STICK_FILL_GRAD3_COLOR
@text Stick fill gradient end
@type string
@default #0000ff
@desc
Stick fill Specifies the color at the end of the gradient.
*/

/*:
@target MV MZ
@plugindesc 虚拟摇杆 v1.1.1
@author うなぎおおとろ
@url https://raw.githubusercontent.com/unagiootoro/RPGMZ/master/VirtualPad.js
@help
这是一个引入虚拟摇杆的插件。

【使用方法】
通过改变插件参数的“摇杆模式”，来修改默认摇杆
・4方向移動
・8方向移動
・360度移動

如果选择8个方向或360度移动，则需要安装以下插件。 
・8方向移動: 支持对角线移动的插件，或者点移动插件
・360度移動: 点移动插件
※对于支持对角线移动的插件
  「Yami_8DirEx.js」「HalfMove.js」大概都可以。

另外，与其他移动类插件并用时，
请将此插件导入到其他移动类插件的下方。

【ライセンス】
此插件可根据 MIT 许可条款使用。


@param STICK_MODE
@text 摇杆模式
@type number
@default 0
@desc
设置虚拟摇杆的模式。
0: 4方向移動  1: 8方向移動  2: 360度移动

@param PAD_SIZE
@text 底盘大小
@type number
@default 128
@desc
设置虚拟摇杆底盘的大小。

@param STICK_SIZE
@text 摇杆大小
@type number
@default 64
@desc
设置虚拟摇杆的大小。

@param MARGIN
@text 底盘边界
@type number
@default 8
@desc
设置底盘中心的判定边界。 

@param ALWAYS_DUSH
@text 始终跑步
@type boolean
@default false
@desc
如果设置为true，则摇杆移动始终为跑步状态。

@param PAD_IMAGE_FILE_NAME
@text 底盘图像文件名
@type file
@dir img
@desc
设置底盘图像的文件名。 

@param STICK_IMAGE_FILE_NAME
@text 摇杆图像文件名
@type file
@dir img
@desc
设置摇杆的文件名。

@param PAD_STROKE_COLOR
@text 底盘边框色
@type string
@default #0000aa
@desc
设置底盘边框的颜色。

@param PAD_FILL_COLOR
@text 底盘填充色
@type string
@default #0000ff
@desc
指定填充底盘的颜色

@param PAD_OPACITY
@text 底盘透明度
@type number
@default 64
@desc
设置底盘的透明度( 0到255 )。

@param STICK_STROKE_COLOR
@text 摇杆边框色
@type string
@default #0000aa
@desc
设置摇杆边框的颜色。

@param STICK_FILL_GRAD1_COLOR
@text 摇杆填充渐变色
@type string
@default #ffffff
@desc
设置摇杆的填充渐变色。

@param STICK_FILL_GRAD2_COLOR
@text 摇杆中间渐变色
@type string
@default #aaaaff
@desc
设置摇杆中间的填充渐变色。

@param STICK_FILL_GRAD3_COLOR
@text 摇杆末端渐变色
@type string
@default #0000ff
@desc
设置摇杆填充末端的渐变颜色。
*/

const VirtualPadPluginName = document.currentScript.src.match(/^.*\/(.+)\.js$/)[1];

let $virtualPad = null;

(() => {
"use strict";

const params = PluginManager.parameters(VirtualPadPluginName)

const STICK_MODE = parseInt(params["STICK_MODE"]);
const PAD_SIZE = parseInt(params["PAD_SIZE"]);
const STICK_SIZE = parseInt(params["STICK_SIZE"]);
const MARGIN = parseInt(params["MARGIN"]);
const ALWAYS_DUSH = params["ALWAYS_DUSH"] === "true";
const PAD_IMAGE_FILE_NAME = params["PAD_IMAGE_FILE_NAME"];
const STICK_IMAGE_FILE_NAME = params["STICK_IMAGE_FILE_NAME"];
const PAD_STROKE_COLOR = params["PAD_STROKE_COLOR"];
const PAD_FILL_COLOR = params["PAD_FILL_COLOR"];
const PAD_OPACITY = params["PAD_OPACITY"];
const STICK_STROKE_COLOR = params["STICK_STROKE_COLOR"];
const STICK_FILL_GRAD1_COLOR = params["STICK_FILL_GRAD1_COLOR"];
const STICK_FILL_GRAD2_COLOR = params["STICK_FILL_GRAD2_COLOR"];
const STICK_FILL_GRAD3_COLOR = params["STICK_FILL_GRAD3_COLOR"];


class VirtualPad {
    constructor() {
        this.reset();
    }

    reset() {
        this._virtualPadTouched = false;
        this._touchActionResult = false;
        this._visible = false;
        this._point = null;
        this._deg = null;
    }

    isVisible() {
        return this._visible;
    }

    open(point) {
        if (this._point) {
            const far = this.calcFar(this._point, point);
            if (far >= MARGIN) {
                this._deg = this.calcDeg(this._point, point);
            } else {
                this._deg = null;
            }
        } else {
            this._visible = true;
            this._point = point;
        }
    }

    close() {
        this._visible = false;
        this._point = null;
        this._deg = null;
    }

    point() {
        if(this._point.x<408 && this._point.y>312){
        return this._point;}
        else if(this._point.x>=408 || (this._point.x<408 && this._point.y<=312)){
        this._virtualPadTouched = false;
        return 0;
        }
    }

    deg() {
        return this._deg;
    }

    dir4() {
        if (!this._deg) return 0;
        const deg = this._deg;
        if ((deg >= 315 && deg < 360) || (deg >= 0 && deg < 45)) {
            return 8;
        } else if (deg >= 45 && deg < 135) {
            return 6;
        } else if (deg >= 135 && deg < 225) {
            return 2;
        } else if (deg >= 225 && deg < 315) {
            return 4;
        }
        throw new Error(`${deg} is invalid`);
    }

    dir8() {
        if (!this._deg) return 0;
        const deg = this._deg;
        if ((deg >= 337.5 && deg < 360) || (deg >= 0 && deg < 22.5)) {
            return 8;
        } else if (deg >= 22.5 && deg < 67.5) {
            return 9;
        } else if (deg >= 67.5 && deg < 112.5) {
            return 6;
        } else if (deg >= 112.5 && deg < 157.5) {
            return 3;
        } else if (deg >= 157.5 && deg < 202.5) {
            return 2;
        } else if (deg >= 202.5 && deg < 247.5) {
            return 1;
        } else if (deg >= 247.5 && deg < 292.5) {
            return 4;
        } else if (deg >= 292.5 && deg < 337.5) {
            return 7;
        }
        throw new Error(`${deg} is invalid`);
    }

    touchActionResult() {
        return this._touchActionResult;
    }

    setTouchActionResult(result) {
        this._touchActionResult = result;
    }

    virtualPadTouched() {
        return this._virtualPadTouched;
    }

    setVirtualPadTouched(touched) {
        this._virtualPadTouched = touched;
    }

    calcDeg(fromPoint, newPoint) {
        const ox = newPoint.x - fromPoint.x;
        const oy = newPoint.y - fromPoint.y;
        const rad = Math.atan2(oy, ox);
        let deg =  rad / Math.PI * 180 + 90;
        if (deg > 360) deg = deg % 360;
        if (deg < 0) {
            let rdeg = -deg;
            if (rdeg > 360) rdeg = rdeg % 360;
            deg = 360 - rdeg;
        }
        return deg;
    }

    calcFar(fromPoint, newPoint) {
        const xDiff = newPoint.x - fromPoint.x;
        const yDiff = newPoint.y - fromPoint.y;
        if (xDiff === 0 && yDiff === 0) return 0;
        return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    }
}

const _DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    _DataManager_createGameObjects.call(this);
    $virtualPad = new VirtualPad();
};

const _Scene_Map_create = Scene_Map.prototype.create;
Scene_Map.prototype.create = function() {
    _Scene_Map_create.call(this);
    $virtualPad.reset();
};

const _Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    $virtualPad.setVirtualPadTouched(false);
    _Scene_Map_update.call(this);
    this.updateVirtualPad();
};

Scene_Map.prototype.updateVirtualPad = function() {
    if ($gameMap.isEventRunning() || this.isBusy()) {
        $virtualPad.close();
    } else {
        if ($virtualPad.virtualPadTouched()) {
            const screenX = TouchInput.x;
            const screenY = TouchInput.y;
            $virtualPad.open({ x: screenX, y: screenY });
        } else {
            $virtualPad.close();
        }
    }
};

// 仮想パッド表示フラグをONにする
const _Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function() {
    if (Utils.RPGMAKER_NAME === "MZ") {
        if (TouchInput.isPressed() && !this.isAnyButtonPressed()) {
            $virtualPad.setVirtualPadTouched(true);
        }
    } else {
        if (TouchInput.isPressed()) {
            $virtualPad.setVirtualPadTouched(true);
        }
    }
    // 従来の処理はイベント起動に必要なため、そのまま残す
    _Scene_Map_processMapTouch.call(this);
};


// ドット移動対応時のタッチポイント到達時にDestinationをクリアする処理を無効化
Game_Player.prototype.updateTouchPoint = function() {
};

Game_Player.prototype.updateDashing = function() {
    if (this.isMoving()) {
        return;
    }
    if (this.canMove() && !this.isInVehicle() && !$gameMap.isDashDisabled()) {
        if (ALWAYS_DUSH) {
            this._dashing = this.isDashButtonPressed() || $gameTemp.isDestinationValid();
        } else {
            this._dashing = this.isDashButtonPressed();
        }
    } else {
        this._dashing = false;
    }
};

Game_Player.prototype.getInputDeg = function() {
    return null;
};

Game_Player.prototype.moveByInput = function() {
    if (!this.isMoving() && this.canMove()) {
        let direction = this.getInputDirection();
        let deg = this.getInputDeg();
        if (direction > 0) {
            $gameTemp.clearDestination();
        } else if (deg != null) {
            $gameTemp.clearDestination();
            if (typeof DotMoveSystemPluginName !== "undefined") {
                this.dotMoveByDeg(deg);
            }
        } else {
            if (STICK_MODE === 1) {
                direction = $virtualPad.dir8();
            } else if (STICK_MODE === 2) {
                deg = $virtualPad.deg();
                if (typeof DotMoveSystemPluginName !== "undefined") {
                    if (deg != null) this.dotMoveByDeg(deg);
                } else {
                    throw new Error("DotMoveSystem.js is not installed.");
                }
            } else {
                direction = $virtualPad.dir4();
            }
        }
        if (direction > 0) {
            // Yami_8DirEx.jsとの併用に対応
            if (typeof Game_Player.prototype.processMoveByInput !== "undefined") {
                this.processMoveByInput(direction);
            } else {
                this.executeMove(direction);
            }   
        }
    }
};

// 事前に設定しておいたDestinationに応じて振り向き、イベントがあれば起動する
// イベントを起動しなかった場合は振り向きをキャンセルする
const _Game_Player_triggerTouchAction = Game_Player.prototype.triggerTouchAction;
Game_Player.prototype.triggerTouchAction = function() {
    const currentDir = $gamePlayer.direction();
    const x = $gameTemp.destinationX();
    const y = $gameTemp.destinationY();
    if (y < $gamePlayer.y) {
        $gamePlayer.setDirection(8);
    } else if (x > $gamePlayer.x) {
        $gamePlayer.setDirection(6);
    } else if (y > $gamePlayer.y) {
        $gamePlayer.setDirection(2);
    } else if (x < $gamePlayer.x) {
        $gamePlayer.setDirection(4);
    }
    const touchActionResult = _Game_Player_triggerTouchAction.call(this);
    $virtualPad.setTouchActionResult(touchActionResult);
    if (touchActionResult) {
        // タッチでアクションを実行したときは仮想パッドを表示しない
        $virtualPad.setVirtualPadTouched(false);
        return true;
    } else {
        $gameTemp.clearDestination();
        $gamePlayer.setDirection(currentDir);
    }
};

let spriteClass;
if (Utils.RPGMAKER_NAME === "MZ") {
    spriteClass = Sprite;
} else {
    spriteClass = Sprite_Base;
}

class Sprite_VirtualPad extends spriteClass {
    initialize() {
        super.initialize();
        this._stickSprite = null;
        this.createBitmap();
        this.createStick();
        this.hide();
    }

    update() {
        super.update();
        if ($virtualPad.isVisible()) {
            this.show();
            const point = $virtualPad.point();
            const pad = this.padding();
            this.x = point.x - this.bitmap.width / 2 - pad;
            this.y = point.y - this.bitmap.height / 2 - pad;
            const deg = $virtualPad.deg();
            if (deg == null) {
                this.moveStickToCenter(deg);
            } else {
                this.moveStickByDeg(deg);
            }
        } else {
            this.hide();
        }
    }

    createBitmap() {
        if (PAD_IMAGE_FILE_NAME) {
            this.bitmap = ImageManager.loadBitmap("img/", PAD_IMAGE_FILE_NAME);
        } else {
            this.createDefaultBitmap();
        }
    }

    createDefaultBitmap() {
        this.bitmap = new Bitmap(PAD_SIZE, PAD_SIZE);
        const ctx = this.bitmap._context;
        const pad = this.padding();
        const cx = this.bitmap.width / 2;
        const cy = this.bitmap.height / 2;
        const r = this.bitmap.width / 2 - pad;
        const beginRad = 0;
        const endRad = 2 * Math.PI;

        ctx.arc(cx, cy, r, beginRad, endRad, false);
        ctx.strokeStyle = PAD_STROKE_COLOR;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.globalAlpha = PAD_OPACITY / 255.0;
        ctx.fillStyle = PAD_FILL_COLOR;
        ctx.fill();
    }

    createStick() {
        this._stickSprite = new Sprite_Stick();
        this.addChild(this._stickSprite);
    }

    show() {
        super.show();
        this._stickSprite.show();
    }

    hide() {
        super.hide();
        this._stickSprite.hide();
    }

    moveStickToCenter() {
        const pad = this.padding();
        const cx = this.bitmap.width / 2;
        const cy = this.bitmap.height / 2;
        const x = cx - this._stickSprite.width / 2 + pad;
        const y = cy - this._stickSprite.height / 2 + pad;
        this._stickSprite.x = x;
        this._stickSprite.y = y;
    }

    moveStickByDeg(deg) {
        this.moveStickToCenter();
        const rad = (deg - 90) / 180 * Math.PI;
        const pad = this.padding();
        const pad2 = this._stickSprite.padding();
        const r = this.bitmap.width / 2 - pad;
        const r2 = this._stickSprite.bitmap.width / 2 - pad2;
        const diffX = Math.cos(rad) * r;
        const diffY = Math.sin(rad) * r;
        const diffX2 = Math.cos(rad) * r2;
        const diffY2 = Math.sin(rad) * r2;
        this._stickSprite.x += diffX - diffX2 - pad2;
        this._stickSprite.y += diffY - diffY2 - pad2;
    }

    padding() {
        return 4;
    }
}

class Sprite_Stick extends spriteClass {
    initialize() {
        super.initialize();
        this.createBitmap();
    }

    update() {
        super.update();
    }

    createBitmap() {
        if (STICK_IMAGE_FILE_NAME) {
            this.bitmap = ImageManager.loadBitmap("img/", STICK_IMAGE_FILE_NAME);
        } else {
            this.createDefaultBitmap();
        }
    }

    createDefaultBitmap() {
        this.bitmap = new Bitmap(STICK_SIZE, STICK_SIZE);
        const ctx = this.bitmap._context;
        const pad = this.padding();
        const cx = this.bitmap.width / 2;
        const cy = this.bitmap.height / 2;
        const r = this.bitmap.width / 2 - pad;
        const beginRad = 0;
        const endRad = 2 * Math.PI;

        ctx.arc(cx, cy, r, beginRad, endRad, false);
        ctx.strokeStyle = STICK_STROKE_COLOR;
        ctx.lineWidth = 1;
        ctx.stroke();

        const grdCx = this.bitmap.width / 3;
        const grdCy = this.bitmap.height / 3;
        const grd = ctx.createRadialGradient(grdCx, grdCy, 0, cx, cy, r);
        grd.addColorStop(0, STICK_FILL_GRAD1_COLOR);
        grd.addColorStop(0.25, STICK_FILL_GRAD2_COLOR);
        grd.addColorStop(1, STICK_FILL_GRAD3_COLOR);

        ctx.fillStyle = grd;
        ctx.fill();
    }

    padding() {
        return 4;
    }
};

const _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {
    _Spriteset_Map_createLowerLayer.call(this);
    this.createVirtualPad();
};

Spriteset_Map.prototype.createVirtualPad = function() {
    this._virtualPadSprite = new Sprite_VirtualPad();
    this._baseSprite.addChild(this._virtualPadSprite);
};

// 仮想パッドを表示するときはDestination矩形を表示しない
Sprite_Destination.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if ($gameTemp.isDestinationValid() && $virtualPad.touchActionResult()) {
        this.updatePosition();
        this.updateAnimation();
        this.visible = true;
    } else {
        this._frameCount = 0;
        this.visible = false;
    }
};

})();
