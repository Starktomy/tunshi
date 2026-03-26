//=============================================================================
// Mehmet Plugins - Ghost Buttons
// Mehmet_Ghost Buttons.js
//=============================================================================

//=============================================================================
/*:
* @plugindesc v1.0.3 虚拟按钮插件
* @author Mehmet
*
* @help
* ============================================================================
* 介绍
* ============================================================================
* 摇杆左右长按且拽拉力度满足可触发换页操作
* 长按摇杆后等于固定方向
* 仅供移动端使用!
* 联系我合作QQ:2016052059
* 感谢以下大佬给与的帮助:
* 江枫眠 moonyoulove （づ￣3￣）づ╭❤～
* ============================================================================
* 插件指令
* ============================================================================
* 开启 GhostButtons Show
* 关闭 GhostButtons Hide
* ============================================================================
* 脚本指令
* ============================================================================
* 暂无,请优先使用插件指令,因为部分脚本指令可能会发生变动导致发生意外事件
* ============================================================================
* 更新日志
* ============================================================================
* V 1.0.3 去除按键瞬间连点效果,这让游戏体验一度变得十分糟糕
* V 1.0.2 修复ES6语法 ?? ** 等不兼容问题
* V 1.0.1 优化判断核心、删除脚本指令
* V 1.0.0 于2020.7.22 完成插件
*/
var Mehmet = Mehmet || {};
// Specifies that the scene does not display ghost buttons
Mehmet.disableGhostButtonsScene = [
	Scene_Boot,
    Scene_Title
];
!function () {
    "use strict";

    // Set the default point of the joystick
    var JoyStickPoint = { x: 220, y: SceneManager._screenHeight / 2 + 180 };

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        if (command.toLowerCase() === 'ghostbuttons') {
            if (args[0].toLowerCase() === 'show') {
                ConfigManager.ghostButtons = true;
                ConfigManager.save();
                SceneManager._scene.createGhostButtons && SceneManager._scene.createGhostButtons();
            }
            if (args[0].toLowerCase() === 'hide') {
                ConfigManager.ghostButtons = false;
                ConfigManager.save();
                SceneManager._scene.clearGhostButtons && SceneManager._scene.clearGhostButtons();
            }
        }
    };

    Bitmap.prototype.drawCircleClip_Keyboard = function (x, y, radius, color) {
        var context = this._context;
        context.save();
        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2, false);
        context.fill();
        context.clip();
        context.save();;
        this._setDirty();
    };

    Bitmap.prototype.drawRoundRect = function (x, y, width, height, radius, color) {
        var context = this._context;
        context.save();
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(x + radius, y);
        context.lineTo(x + width - radius, y);
        context.arc(x + width - radius, y + radius, radius, Math.PI * 1.5, Math.PI * 2);
        context.lineTo(x + width, y + height - radius);
        context.arc(x + width - radius, y + height - radius, radius, 0, Math.PI * 0.5);
        context.lineTo(x + radius, y + height);
        context.arc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI);
        context.lineTo(x, y + radius);
        context.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5);
        context.fill();
        context.clip();
        context.save();
        this._setDirty();
    };

    Bitmap.prototype.drawJoyStickOutside = function (x, y, radius, color, outline) {
        function rads(angle) {
            return Math.PI * angle / 180;
        }
        function ites(angleA, angleB, r, c) {
            context.beginPath();
            context.moveTo(radius, radius);
            context.arc(radius, radius, r, rads(angleA), rads(angleB), false);
            context.closePath();
            context.fillStyle = c;
            context.fill();
        }
        var context = this._context;
        context.save();
        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2, false);
        context.fill();
        context.clip();
        if (outline) {
            // ites(316, 44, radius, "rgba(0, 0, 0, 0.2)");
            // ites(46, 134, radius, "rgba(0, 0, 0, 0.2)");
            // ites(136, 224, radius, "rgba(0, 0, 0, 0.2)");
            // ites(226, 314, radius, "rgba(0, 0, 0, 0.2)");
            ites(0, 360, Math.round(radius * 0.6), "rgba(0, 0, 0, 0.6)");
            context.beginPath();
            context.strokeStyle = '#fff';
            context.lineWidth = '10';
            context.arc(x, y, radius, Math.PI * 0, Math.PI * 2, true);
            context.closePath();
            context.stroke();
        }
        context.save();
        this._setDirty();
    };

    Bitmap.prototype.drawJoyStickInside = function (x, y, radius, color, outline, drawCharacter) {
        function ites(x, y, w, r, c, m) {
            context.beginPath();
            m ? context.fillStyle = c : context.strokeStyle = c;
            m ? null : context.lineWidth = w;
            context.arc(x, y, r, Math.PI * 0, Math.PI * 2, true);
            context.closePath();
            m ? context.fill() : context.stroke();
        }
        var context = this._context;
        context.save();
        context.fillStyle = color;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2, false);
        context.fill();
        context.clip();
        if (outline) {
            ites(x, y, 2, radius / 2, '#000')
            ites(x, y, 2, radius / 2, '#FFA400', true)
            ites(x, y, 5, radius, 'rgba(0, 0, 0, 0.8)')
        }
        context.save();
        if (drawCharacter && $gamePlayer && $gamePlayer._characterName) {
            var bitmap = ImageManager.loadCharacter($gamePlayer._characterName);
            var big = ImageManager.isBigCharacter($gamePlayer._characterName);
            var pw = bitmap.width / (big ? 3 : 12);
            var ph = bitmap.height / (big ? 4 : 8);
            var n = $gamePlayer._characterIndex;
            var sx = (n % 4 * 3 + 1) * pw;
            var sy = (Math.floor(n / 4) * 4) * ph;
            context.globalCompositeOperation = 'source-over';
            var dw = dw || pw;
            var dh = dh || ph;
            context.drawImage(bitmap._canvas, sx, sy, pw, ph, x - pw / 2, y - ph / 2, dw, dh);
            context.save();
        }
        this._setDirty();
    };

    // Handle the situation where multi-touch triggers cancellation
    var _TouchInput_onCancel = TouchInput._onCancel;
    TouchInput._onCancel = function (x, y) {
        if (!SceneManager._scene.getChildByName('ghostButtons') && !SceneManager._scene.getChildByName('JoyStick')) {
            _TouchInput_onCancel.apply(this, arguments);
        }
    };

    function Sprite_JoyStick() {
        this.initialize.apply(this, arguments);
    }

    Sprite_JoyStick.prototype = Object.create(Sprite_Button.prototype);
    Sprite_JoyStick.prototype.constructor = Sprite_JoyStick;

    Sprite_JoyStick.prototype.initialize = function () {
        Sprite.prototype.initialize.call(this);
        this._coldFrame = null;
        this._clickHandler = null;
        this._dir4 = 0;
        this._dir8 = 0;
        this._direction = '';
        this._defaultOpacity = 80;
        this._hotFrame = null;
        this._moved = false;
        this._multiTouch = false;
        this._pressure = 0;
        this._pressedTime = 0;
        this._preferredAxis = '';
        this._radius = 0;
        this._range = 3;
        this._released = !(Mehmet._joyStickLastPoint && (Mehmet._joyStickLastPoint.x || Mehmet._joyStickLastPoint.y));
        this._touching = false;
        this._triggered = false;
        this._touchInput = Mehmet._joyStickLastPoint || { x: 0, y: 0 };
    };

    Sprite_JoyStick.prototype.update = function () {
        Sprite.prototype.update.call(this);
        this.updateDirection();
        this.updateFrame();
        this.processTouch();
    };

    Sprite_JoyStick.prototype.updateDirection = function () {
        if (this._D_Pad && this.isActive() && this.isButtonTouched() && !this._released) {
            var x = this.canvasToLocalX(this._touchInput.x);
            var y = this.canvasToLocalY(this._touchInput.y);
            // Calculate the coordinates of the joystick relative to the bottom seat
            var px = x;
            var py = y;
            var angle = Math.atan2(y, x) * 180 / Math.PI;
            var c = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            var b = Math.abs(y);
            if (c > this._radius) {
                var py = (b / c) * this._radius * (y > 0 ? 1 : -1);
                var px = Math.sqrt(Math.pow(this._radius, 2) - Math.pow(py, 2)) * (x > 0 ? 1 : -1);
            }
            // The pressure value is between 0 and 1.
            this._pressure = c / (this._range * this._radius);
            // Within what range the joystick is set to be unresponsive
            if (Math.max(Math.abs(x), Math.abs(y)) <= Math.round(this._radius * 0.3)) {
                this._D_Pad.move(px, py);
                this.opacity = Math.max(this.opacity += 3, 255);
                return;
            }
            this.getJoyStickDirection(angle);
            this._D_Pad.move(px, py);
            this.opacity = Math.max(this.opacity += 3, 255);
        }
    };

    Sprite_JoyStick.prototype.getJoyStickDirection = function (angle) {
        if (135 < angle || angle <= -135) {
            var x = -1;
            var y = 0;
            this._dir8 = this.makeNumpadDirection(x, y);
            this.refreshPreferredAxis(x, y);
            this._dir4 = this.makeNumpadDirection(x, y);
            this._direction = 'left';
        }
        if (-45 < angle && angle <= 45) {
            var x = 1;
            var y = 0;
            this._dir8 = this.makeNumpadDirection(x, y);
            this.refreshPreferredAxis(x, y);
            this._dir4 = this.makeNumpadDirection(x, y);
            this._direction = 'right';
        }
        if (-135 < angle && angle <= -45) {
            var x = 0;
            var y = -1;
            this._dir8 = this.makeNumpadDirection(x, y);
            this.refreshPreferredAxis(x, y);
            this._dir4 = this.makeNumpadDirection(x, y);
            this._direction = 'up';
        }
        if (45 < angle && angle <= 135) {
            var x = 0;
            var y = 1;
            this._dir8 = this.makeNumpadDirection(x, y);
            this.refreshPreferredAxis(x, y);
            this._dir4 = this.makeNumpadDirection(x, y);
            this._direction = 'down';
        }
    };

    Sprite_JoyStick.prototype.makeNumpadDirection = function (x, y) {
        if (x !== 0 || y !== 0) {
            return 5 - y * 3 + x;
        }
        return 0;
    };

    Sprite_JoyStick.prototype.refreshPreferredAxis = function (x, y) {
        if (x !== 0 && y !== 0) {
            if (this._preferredAxis === 'x') {
                y = 0;
            } else {
                x = 0;
            }
        } else if (x !== 0) {
            this._preferredAxis = 'y';
        } else if (y !== 0) {
            this._preferredAxis = 'x';
        }
    };

    Sprite_JoyStick.prototype.processTouch = function () {
        if (this.isActive()) {
            this._touching = !this._released;
            if (this._touching && this._dir4) {
                this._pressedTime++;
                for (var key of ['down', 'left', 'right', 'up']) {
                    if (key == this._direction) {
                        Input._currentState[key] = true;
                        this._isLongPressed = this._pressedTime >= 36;
                        if ($gamePlayer.isMoving()) {
                            Input._currentState['shift'] = !ConfigManager.alwaysDash && this._pressure >= 0.55;
                        }
                        this._pageTime = this._pageTime || 0;
                        this._pageTime++;
                        if (this._isLongPressed && this._pressure >= 0.65 && this._pageTime >= 24 && GhostButton_TouchInput.isMoved() && SceneManager._scene._windowLayer && SceneManager._scene._windowLayer.children) {
                            this._pageTime = 0;
                            switch (key) {
                                case 'left':
                                    SceneManager._scene._windowLayer.children.forEach(function (w) {
                                        if (w.active && Object.getPrototypeOf(w) instanceof Window_Selectable) {
                                            if (w._handlers["pageup"]) {
                                                w._handlers["pageup"]();
                                            } else if (w.cursorPageup) {
                                                w.cursorPageup();
                                            }
                                            SoundManager.playCursor();
                                            return;
                                        }
                                    })
                                    break;
                                case 'right':
                                    SceneManager._scene._windowLayer.children.forEach(function (w) {
                                        if (w.active && Object.getPrototypeOf(w) instanceof Window_Selectable) {
                                            if (w._handlers["pagedown"]) {
                                                w._handlers["pagedown"]();
                                            } else if (w.cursorPagedown) {
                                                w.cursorPagedown();
                                            }
                                            SoundManager.playCursor();
                                            return;
                                        }
                                    })
                                    break;
                            }
                        }
                    } else {
                        Input._currentState[key] = false;
                    }
                }
            } else {
                this._D_Pad.move(0, 0);
                this._isLongPressed = false;
                Input._currentState['shift'] = false;
                this.opacity = Math.max(this.opacity -= 3, this._defaultOpacity);
                for (var key of ['down', 'left', 'right', 'up', 'shift']) {
                    Input._currentState[key] = false;
                }
            }
            if (this.x < this._radius) {
                this.move(this._radius + 10, this.y);
            }
            if (this.y > SceneManager._screenHeight - this._radius) {
                this.move(this.x, SceneManager._screenHeight - this._radius - 10);
            }
        } else {
            this.touchInputClear();
        }
    };

    Sprite_JoyStick.prototype.isButtonTouched = function () {
        if (this._touchInput.x || this._touchInput.y) {
            var x = this.canvasToLocalX(this._touchInput.x);
            var y = this.canvasToLocalY(this._touchInput.y);
            return Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(this._radius * this._range, 2);
        } else {
            return false;
        }
    };

    Sprite_JoyStick.prototype.isValidTouched = function (x = 0, y = 0, active = true) {
        // this.setPedestalPoint(x, y);
		var x = this.canvasToLocalX(x);
        var y = this.canvasToLocalY(y);
		var range = (active && this.opacity === this._defaultOpacity) ? 1 : this._range;
        return Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(this._radius * this._range, 2);
    };

    Sprite_JoyStick.prototype.setPedestalPoint = function (x, y) {
        if (this.opacity <= this._defaultOpacity) {
            var distance = Math.sqrt(Math.pow(x - JoyStickPoint.x) + Math.pow(y - JoyStickPoint.y));
            var isValid = distance <= this._radius * 1.25;
            if (isValid) {
                $gameSystem._joyStick = $gameSystem._joyStick || {};
                $gameSystem._joyStick.x = (x + JoyStickPoint.x) / 2;
                $gameSystem._joyStick.y = (y + JoyStickPoint.y) / 2;
                $gameSystem._joyStick.x = Math.max($gameSystem._joyStick.x, this._radius * 1.25);
                $gameSystem._joyStick.y = Math.min($gameSystem._joyStick.y, SceneManager._screenHeight - this._radius * 1.25);
                this.move($gameSystem._joyStick.x, $gameSystem._joyStick.y);
            }
        }
    };

    Sprite_JoyStick.prototype.onTouchStart = function (event) {
        var effectiveTouches = [];
        var keys = Object.keys(event.touches);
        for (var key of keys) {
            var touch = event.touches[key];
            var x = Graphics.pageToCanvasX(touch.pageX);
            var y = Graphics.pageToCanvasY(touch.pageY);
            if (this.isValidTouched(x, y)) {
                effectiveTouches.push({ x, y });
            }
        }
        if (effectiveTouches.length >= 2) {
            this._pressedTime = this._pressedTime || 0;
            this._multiTouch = true;
            this._released = false;
            this._triggered = true;
            var point = { x: this.x, y: this.y };
            var distance = Infinity;
            for (var e of effectiveTouches) {
                if (distance > Math.abs(e.x - this.x) + Math.abs(e.y - this.y)) {
                    distance = Math.abs(e.x - this.x) + Math.abs(e.y - this.y);
                    point = { x: e.x, y: e.y };
                }
            }
            this._touchInput = point;
            Mehmet._joyStickLastPoint = point;
        } else if (effectiveTouches.length) {
            if (!Graphics.isInsideCanvas(effectiveTouches[0].x, effectiveTouches[0].y)) {
                return this.touchInputClear();
            }
            this._multiTouch = false;
            this._pressedTime = this._pressedTime || 0;
            this._released = false;
            this._triggered = true;
            this._touchInput = effectiveTouches[0];
            Mehmet._joyStickLastPoint = effectiveTouches[0];
        } else {
            this.touchInputClear();
        }
    };

    Sprite_JoyStick.prototype.onTouchMove = function (event) {
        var effectiveTouches = [];
        var keys = Object.keys(event.touches);
        for (var key of keys) {
            var touch = event.touches[key];
            var x = Graphics.pageToCanvasX(touch.pageX);
            var y = Graphics.pageToCanvasY(touch.pageY);
            if (this.isValidTouched(x, y)) {
                effectiveTouches.push({ x, y });
            }
        }
        if (effectiveTouches.length >= 2) {
            this._moved = true;
            this._multiTouch = true;
            this._released = false;
            var point = { x: this.x, y: this.y };
            var distance = Infinity;
            for (var e of effectiveTouches) {
                if (distance > Math.abs(e.x - this.x) + Math.abs(e.y - this.y)) {
                    distance = Math.abs(e.x - this.x) + Math.abs(e.y - this.y);
                    point = { x: e.x, y: e.y };
                }
            }
            this._touchInput = point;
            Mehmet._joyStickLastPoint = point;
        } else if (effectiveTouches.length) {
            var { x, y } = this._touchInput;
            if (!x && !y) {
                return this.touchInputClear();
            }
            this._moved = true;
            this._multiTouch = false;
            this._released = false;
            this._touchInput = effectiveTouches[0];
            Mehmet._joyStickLastPoint = effectiveTouches[0];
        } else {
            this.touchInputClear();
        }
    };

    Sprite_JoyStick.prototype.onTouchEnd = function (event) {
        var effectiveTouches = [];
        var keys = Object.keys(event.touches);
        for (var key of keys) {
            var touch = event.touches[key];
            var x = Graphics.pageToCanvasX(touch.pageX);
            var y = Graphics.pageToCanvasY(touch.pageY);
            if (this.isValidTouched(x, y)) {
                effectiveTouches.push({ x, y });
            }
        }
        if (effectiveTouches.length >= 2) {
            var isValid = false;
            var { x, y } = this._touchInput;
            for (var touch of effectiveTouches) {
                if (touch.x === x && touch.y === y) {
                    isValid = true;
                    break;
                }
            }
            if (isValid) {
                this._released = false;
            } else {
                this.touchInputClear();
            }
        } else if (effectiveTouches.length) {
            var touch = effectiveTouches[0];
            var { x, y } = this._touchInput;
            if (touch.x === x && touch.y === y) {
                this._released = false;
            } else {
                this.touchInputClear();
            }
        } else {
            this.touchInputClear();
        }
    };

    Sprite_JoyStick.prototype.onTouchCancel = function (event) {
        this.touchInputClear();
    };

    Sprite_JoyStick.prototype.touchInputClear = function (enforcement = true) {
        this._dir4 = 0;
        this._dir8 = 0;
        this._direction = '';
        this._moved = false;
        this._multiTouch = false;
        this._pressure = 0;
        this._pressedTime = 0;
        this._preferredAxis = '';
        this._released = true;
        this._triggered = false;
        this._touchInput = { x: 0, y: 0 };
        for (var key of ['down', 'left', 'right', 'up', 'shift']) {
            Input._currentState[key] = false;
        }
        if (enforcement) {
            Mehmet._joyStickLastPoint = { x: 0, y: 0 };
        }
    };

    function createJoyStick(diameter = 280) {
        if (!$gameSystem) { return; }
        var spriteJoyStick = new Sprite_JoyStick();
        setJoyStickAttribute(spriteJoyStick, diameter);
        $gameSystem._joyStick = $gameSystem._joyStick || {};
        spriteJoyStick.move($gameSystem._joyStick.x || JoyStickPoint.x, $gameSystem._joyStick.y || JoyStickPoint.y);
        spriteJoyStick._isReady && SceneManager._scene.addChild(spriteJoyStick);
    }

    function setJoyStickAttribute(spriteJoyStick, diameter) {
        var spriteJoyStick = spriteJoyStick;
        if (!(spriteJoyStick instanceof Sprite)) {
            return spriteJoyStick._isReady = false;
        }
        var radius = Math.round(diameter / 2);
        spriteJoyStick.name = "JoyStick";
        spriteJoyStick.anchor.set(0.5);
        spriteJoyStick._radius = radius;
        var ioyStickBitmap = new Bitmap(diameter, diameter);
        ioyStickBitmap.drawJoyStickOutside(radius, radius, radius, 'transparent', true);
        spriteJoyStick.bitmap = ioyStickBitmap;
        spriteJoyStick._D_Pad = new Sprite_Base();
        spriteJoyStick._D_Pad.anchor.set(0.5);
        spriteJoyStick._D_Pad._radius = Math.round(radius * 0.6);
        var d_PadBitmap = new Bitmap(spriteJoyStick._D_Pad._radius * 2, spriteJoyStick._D_Pad._radius * 2);
        d_PadBitmap.drawJoyStickInside(spriteJoyStick._D_Pad._radius, spriteJoyStick._D_Pad._radius, spriteJoyStick._D_Pad._radius, 'rgba(255, 255, 255, 0.8)', true, true);
        spriteJoyStick._D_Pad.bitmap = d_PadBitmap;
        spriteJoyStick.addChild(spriteJoyStick._D_Pad);
        spriteJoyStick.opacity = 150;
        spriteJoyStick._isReady = true;
    }

    function Sprite_Keyboard() {
        this.initialize.apply(this, arguments);
    }

    Sprite_Keyboard.prototype = Object.create(Sprite_JoyStick.prototype);
    Sprite_Keyboard.prototype.constructor = Sprite_Keyboard;

    Sprite_Keyboard.prototype.initialize = function (keyName) {
        Sprite.prototype.initialize.call(this);
        this._coldFrame = null;
        this._clickHandler = null;
        this._defaultOpacity = 80;
        this._hotFrame = null;
        this._keyName = keyName || null;
        this._latestKeyName = null;
        this._moved = false;
        this._multiTouch = false;
        this._pressure = 0;
        this._pressedTime = 0;
        this._radius = 0;
        this._range = 1;
        this._released = true;
        this._touching = false;
        this._triggered = false;
        this._touchInput = { x: 0, y: 0 };
    };

    Sprite_Keyboard.prototype.update = function () {
        Sprite.prototype.update.call(this);
        this.updateFrame();
        this.processTouch();
    };

    Sprite_Keyboard.prototype.processTouch = function () {
        if (this.isActive()) {
            this._touching = this._triggered && this.isButtonTouched();
            if (this._touching) {
                this.opacity = 255;
                this._pressedTime++;
                // Do not trigger long press event
                // if (Input._currentState[this._keyName]) {
                //     return this.touchInputClear();
                // }
                Input._currentState[this._keyName] = true;
            } else {
                this.touchInputClear();
            }
        } else {
            this.touchInputClear();
        }
    };

    Sprite_JoyStick.prototype.isButtonTouched = function () {
        if (this._touchInput.x || this._touchInput.y) {
            var x = this.canvasToLocalX(this._touchInput.x);
            var y = this.canvasToLocalY(this._touchInput.y);
            return Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(this._radius * this._range, 2);
        } else {
            return false;
        }
    };

    Sprite_Keyboard.prototype.isValidTouched = function (x = 0, y = 0) {
        var x = this.canvasToLocalX(x);
        var y = this.canvasToLocalY(y);
        return Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(this._radius * this._range, 2);
    };

    Sprite_Keyboard.prototype.touchInputClear = function () {
        Input._currentState[this._keyName] = false;
        if (Input._latestButton == this._keyName) {
            Input._latestButton = null;
        }
        this._latestKeyName = null;
        this._moved = false;
        this._multiTouch = false;
        this.opacity = Math.max(this.opacity -= 3, this._defaultOpacity);
        this._pressure = 0;
        this._pressedTime = 0;
        this._released = true;
        this._triggered = false;
        this._touchInput = { x: 0, y: 0 };
    };

    function createGhostButtons() {
        var spriteGhostButtons = new Sprite_Base();
        spriteGhostButtons.name = "ghostButtons";
        spriteGhostButtons.anchor.set(0.5);
        // set button position
        spriteGhostButtons.move(SceneManager._screenWidth - 300, SceneManager._screenHeight / 2);
        spriteGhostButtons.addChild(creatKeyboardSprite("keyboardAction", 'ok', 'A', 50, 160));
        spriteGhostButtons.addChild(creatKeyboardSprite("keyboardCancel", 'escape', 'B', 180, 50));
     //这里   spriteGhostButtons.addChild(creatKeyboardSprite("keyboardShift", 'shift', 'S', 0, 0));
     //    if ([Scene_Map, Scene_Menu].includes(SceneManager._scene.constructor)) {
     //        spriteGhostButtons.addChild(creatKeyboardSprite("keyboardSave", 'tilde', 'Save', 260, -(SceneManager._screenHeight / 2 - 40)));
     //    }
        SceneManager._scene.addChild(spriteGhostButtons);
    }

   function creatKeyboardSprite(name, keyName, title, x, y) {
        var diameter = 120;
        var height = diameter;
  if (title == 'Save') {
      diameter = 80;
      height = Math.round(diameter * 3 / 4);
  }
        var radius = Math.round(diameter / 2);
        var sprite_Keyboard = new Sprite_Keyboard(keyName);
        sprite_Keyboard.name = name;
        sprite_Keyboard.anchor.set(0.5);
        sprite_Keyboard._radius = radius;
        var ioyStickBitmap = new Bitmap(diameter, diameter);
        if (title !== 'Save') {
            ioyStickBitmap.drawCircleClip_Keyboard(radius, radius, radius, 'transparent');
        } else {
            ioyStickBitmap.drawRoundRect(0, 0, diameter, height, Math.round(radius / 4), 'transparent');
        }
        sprite_Keyboard.bitmap = ioyStickBitmap;
        sprite_Keyboard.bitmap.gradientFillRect(0, 0, diameter, diameter, 'rgba(207, 217, 223, 0.8)', 'rgba(226, 235, 240, 0.8)');
        sprite_Keyboard.bitmap.fontSize = 72;
        if (title == 'Save') {
            sprite_Keyboard.bitmap.gradientFillRect(0, 0, diameter, height, 'rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.4)');
            sprite_Keyboard.bitmap.fontSize = 24;
        }
        sprite_Keyboard.bitmap.textColor = '#FFA400';
        sprite_Keyboard.bitmap.drawText(title, 0, 0, diameter, height, 'center');
        sprite_Keyboard.move(x, y);
        return sprite_Keyboard;
		
  } 

    var _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
		
        _Game_System_initialize.apply(this, arguments);
        this._joyStick = {};
    }

    var _Scene_Base_start = Scene_Base.prototype.start;
    Scene_Base.prototype.start = function () {
		
        _Scene_Base_start.apply(this, arguments);
        !Mehmet.disableGhostButtonsScene.includes(this.constructor) && this.createGhostButtons();
    };

    Scene_Base.prototype.createGhostButtons = function () {
		
        if (ConfigManager['ghostButtons'] && (Utils.isOptionValid('test') || Utils.isMobileDevice())) {
            if (!this.getChildByName('ghostButtons') || !this.getChildByName('JoyStick')) {
                Utils.isOptionValid('test') && console.log('There are no ghost buttons in the scene');
                createJoyStick();
                createGhostButtons();
            }
        }
    };

    var _Scene_Base_terminate = Scene_Base.prototype.terminate;
    Scene_Base.prototype.terminate = function () {
		
        this.clearGhostButtons();
        _Scene_Base_terminate.apply(this, arguments);
    };

    Scene_Base.prototype.clearGhostButtons = function () {
		
        var joyStick = this.getChildByName('JoyStick');
        if (joyStick) {
            // Passing true into the touchInputClear function forces the touch flag to be cleared.
            joyStick.touchInputClear && joyStick.touchInputClear(false);
            this.removeChild(joyStick);
            joyStick = undefined;
        }
        var ghostButtons = this.getChildByName('ghostButtons');
        if (ghostButtons) {
            ghostButtons.children.forEach(function (sprite) {
                if (sprite && sprite instanceof Sprite_Keyboard) {
                    sprite.touchInputClear();
                }
            })
            ghostButtons && this.removeChild(ghostButtons);
        }
        ghostButtons = undefined;
    };


    var _Scene_Map_isMapTouchOk = Scene_Map.prototype.isMapTouchOk;
    Scene_Map.prototype.isMapTouchOk = function () {
		
        if (this.getChildByName("JoyStick")) {
            return false;
        };
        return _Scene_Map_isMapTouchOk.apply(this, arguments);
    };

    var _Scene_Options_update = Scene_Options.prototype.update;
    Scene_Options.prototype.update = function () {
		
        _Scene_Options_update.call(this);
        if (ConfigManager.ghostButtons && (Utils.isOptionValid('test') || Utils.isMobileDevice())) {
            this.createGhostButtons && this.createGhostButtons();
        } else {
            this.clearGhostButtons && this.clearGhostButtons();
        }
    };

    var _Window_Selectable_processTouch = Window_Selectable.prototype.processTouch;
    Window_Selectable.prototype.processTouch = function () {
		
        if (!SceneManager._scene.getChildByName("JoyStick")) {
            _Window_Selectable_processTouch.call(this);
        }
    };

    var _Window_Selectable_updateInputData = Window_Selectable.prototype.updateInputData;
    Window_Selectable.prototype.updateInputData = function () {
		
        _Window_Selectable_updateInputData.call(this);
        GhostButton_TouchInput.update();
    };

    var _Window_Message_isTriggered = Window_Message.prototype.isTriggered;
    Window_Message.prototype.isTriggered = function () {
		
        if (SceneManager._scene.getChildByName("JoyStick")) {
            return Input.isRepeated('ok') || Input.isRepeated('cancel');
        }
        return _Window_Message_isTriggered.call(this);
    };

    var _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList
    Window_Options.prototype.makeCommandList = function () {
		
        _Window_Options_makeCommandList.apply(this, arguments);
        if (Utils.isOptionValid('test') || Utils.isMobileDevice()) {
            this.addGhostButtonsOptions();
        }
    };

    Window_Options.prototype.addGhostButtonsOptions = function () {
        this.addCommand('虚拟按钮', 'ghostButtons');
    };

    var _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function () {
		
        var config = _ConfigManager_makeData.apply(this, arguments);
        config.ghostButtons = this.ghostButtons || false;
        return config;
    };

    var _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function (config) {
		
        _ConfigManager_applyData.apply(this, arguments);
        this.ghostButtons = this.readFlag(config, 'ghostButtons');
    };

    var _SceneManager_initInput = SceneManager.initInput;
    SceneManager.initInput = function () {
        _SceneManager_initInput.call(this);
        GhostButton_TouchInput.initialize();
    };

    var _SceneManager_updateInputData = SceneManager.updateInputData;
    SceneManager.updateInputData = function () {
        _SceneManager_updateInputData.call(this);
        GhostButton_TouchInput.update();
    };

    var _SceneManager_snapForBackground = SceneManager.snapForBackground;
    SceneManager.snapForBackground = function() {
        this._scene.clearGhostButtons();
        _SceneManager_snapForBackground.call(this);
        this._scene.createGhostButtons();
    }

    //-----------------------------------------------------------------------------
    /**
     * The static class that handles input data from the mouse and touchscreen.
     *
     * @class GhostButton_TouchInput
     */
    function GhostButton_TouchInput() {
        throw new Error('This is a static class');
    }

    /**
     * Initializes the touch system.
     *
     * @static
     * @method initialize
     */
    GhostButton_TouchInput.initialize = function () {
        this.clear();
        this._setupEventHandlers();
    };

    /**
     * The wait time of the pseudo key repeat in frames.
     *
     * @static
     * @property keyRepeatWait
     * @type Number
     */
    GhostButton_TouchInput.keyRepeatWait = 24;

    /**
     * The interval of the pseudo key repeat in frames.
     *
     * @static
     * @property keyRepeatInterval
     * @type Number
     */
    GhostButton_TouchInput.keyRepeatInterval = 6;

    /**
     * Clears all the touch data.
     *
     * @static
     * @method clear
     */
    GhostButton_TouchInput.clear = function () {
        this._mousePressed = false;
        this._screenPressed = false;
        this._pressedTime = 0;
        this._events = {};
        this._events.triggered = false;
        this._events.cancelled = false;
        this._events.moved = false;
        this._events.released = false;
        this._events.wheelX = 0;
        this._events.wheelY = 0;
        this._triggered = false;
        this._cancelled = false;
        this._moved = false;
        this._released = false;
        this._wheelX = 0;
        this._wheelY = 0;
        this._x = 0;
        this._y = 0;
        this._date = 0;
    };

    /**
     * Updates the touch data.
     *
     * @static
     * @method update
     */
    GhostButton_TouchInput.update = function () {
        this._triggered = this._events.triggered;
        this._cancelled = this._events.cancelled;
        this._moved = this._events.moved;
        this._released = this._events.released;
        this._wheelX = this._events.wheelX;
        this._wheelY = this._events.wheelY;
        this._events.triggered = false;
        this._events.cancelled = false;
        this._events.moved = false;
        this._events.released = false;
        this._events.wheelX = 0;
        this._events.wheelY = 0;
        if (this.isPressed()) {
            this._pressedTime++;
        }
    };

    /**
     * Checks whether the mouse button or touchscreen is currently pressed down.
     *
     * @static
     * @method isPressed
     * @return {Boolean} True if the mouse button or touchscreen is pressed
     */
    GhostButton_TouchInput.isPressed = function () {
        return this._mousePressed || this._screenPressed;
    };

    /**
     * Checks whether the left mouse button or touchscreen is just pressed.
     *
     * @static
     * @method isTriggered
     * @return {Boolean} True if the mouse button or touchscreen is triggered
     */
    GhostButton_TouchInput.isTriggered = function () {
        return this._triggered;
    };

    /**
     * Checks whether the left mouse button or touchscreen is just pressed
     * or a pseudo key repeat occurred.
     *
     * @static
     * @method isRepeated
     * @return {Boolean} True if the mouse button or touchscreen is repeated
     */
    GhostButton_TouchInput.isRepeated = function () {
        return (this.isPressed() &&
            (this._triggered ||
                (this._pressedTime >= this.keyRepeatWait &&
                    this._pressedTime % this.keyRepeatInterval === 0)));
    };

    /**
     * Checks whether the left mouse button or touchscreen is kept depressed.
     *
     * @static
     * @method isLongPressed
     * @return {Boolean} True if the left mouse button or touchscreen is long-pressed
     */
    GhostButton_TouchInput.isLongPressed = function () {
        return this.isPressed() && this._pressedTime >= this.keyRepeatWait;
    };

    /**
     * Checks whether the right mouse button is just pressed.
     *
     * @static
     * @method isCancelled
     * @return {Boolean} True if the right mouse button is just pressed
     */
    GhostButton_TouchInput.isCancelled = function () {
        return this._cancelled;
    };

    /**
     * Checks whether the mouse or a finger on the touchscreen is moved.
     *
     * @static
     * @method isMoved
     * @return {Boolean} True if the mouse or a finger on the touchscreen is moved
     */
    GhostButton_TouchInput.isMoved = function () {
        return this._moved;
    };

    /**
     * Checks whether the left mouse button or touchscreen is released.
     *
     * @static
     * @method isReleased
     * @return {Boolean} True if the mouse button or touchscreen is released
     */
    GhostButton_TouchInput.isReleased = function () {
        return this._released;
    };

    /**
     * [read-only] The horizontal scroll amount.
     *
     * @static
     * @property wheelX
     * @type Number
     */
    Object.defineProperty(GhostButton_TouchInput, 'wheelX', {
        get: function () {
            return this._wheelX;
        },
        configurable: true
    });

    /**
     * [read-only] The vertical scroll amount.
     *
     * @static
     * @property wheelY
     * @type Number
     */
    Object.defineProperty(GhostButton_TouchInput, 'wheelY', {
        get: function () {
            return this._wheelY;
        },
        configurable: true
    });

    /**
     * [read-only] The x coordinate on the canvas area of the latest touch event.
     *
     * @static
     * @property x
     * @type Number
     */
    Object.defineProperty(GhostButton_TouchInput, 'x', {
        get: function () {
            return this._x;
        },
        configurable: true
    });

    /**
     * [read-only] The y coordinate on the canvas area of the latest touch event.
     *
     * @static
     * @property y
     * @type Number
     */
    Object.defineProperty(GhostButton_TouchInput, 'y', {
        get: function () {
            return this._y;
        },
        configurable: true
    });

    /**
     * [read-only] The time of the last input in milliseconds.
     *
     * @static
     * @property date
     * @type Number
     */
    Object.defineProperty(GhostButton_TouchInput, 'date', {
        get: function () {
            return this._date;
        },
        configurable: true
    });

    /**
     * @static
     * @method _setupEventHandlers
     * @private
     */
    GhostButton_TouchInput._setupEventHandlers = function () {
        // document.addEventListener('mousedown', this._onMouseDown.bind(this));
        // document.addEventListener('mousemove', this._onMouseMove.bind(this));
        // document.addEventListener('mouseup', this._onMouseUp.bind(this));
        // document.addEventListener('wheel', this._onWheel.bind(this));
        document.addEventListener('touchstart', this._onTouchStart.bind(this), { passive: true });
        document.addEventListener('touchmove', this._onTouchMove.bind(this), { passive: true });
        document.addEventListener('touchend', this._onTouchEnd.bind(this));
        document.addEventListener('touchcancel', this._onTouchCancel.bind(this));
        // document.addEventListener('pointerdown', this._onPointerDown.bind(this));
    };

    /**
     * @static
     * @method _onMouseDown
     * @param {MouseEvent} event
     * @private
     */
    GhostButton_TouchInput._onMouseDown = function (event) {
        if (event.button === 0) {
            this._onLeftButtonDown(event);
        } else if (event.button === 1) {
            this._onMiddleButtonDown(event);
        } else if (event.button === 2) {
            this._onRightButtonDown(event);
        }
    };

    /**
     * @static
     * @method _onLeftButtonDown
     * @param {MouseEvent} event
     * @private
     */
    GhostButton_TouchInput._onLeftButtonDown = function (event) {
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        if (Graphics.isInsideCanvas(x, y)) {
            this._mousePressed = true;
            this._pressedTime = 0;
            this._onTrigger(x, y);
        }
    };

    /**
     * @static
     * @method _onMiddleButtonDown
     * @param {MouseEvent} event
     * @private
     */
    GhostButton_TouchInput._onMiddleButtonDown = function (event) {
    };

    /**
     * @static
     * @method _onRightButtonDown
     * @param {MouseEvent} event
     * @private
     */
    GhostButton_TouchInput._onRightButtonDown = function (event) {
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        if (Graphics.isInsideCanvas(x, y)) {
            this._onCancel(x, y);
        }
    };

    /**
     * @static
     * @method _onMouseMove
     * @param {MouseEvent} event
     * @private
     */
    GhostButton_TouchInput._onMouseMove = function (event) {
        if (this._mousePressed) {
            var x = Graphics.pageToCanvasX(event.pageX);
            var y = Graphics.pageToCanvasY(event.pageY);
            this._onMove(x, y);
        }
    };

    /**
     * @static
     * @method _onMouseUp
     * @param {MouseEvent} event
     * @private
     */
    GhostButton_TouchInput._onMouseUp = function (event) {
        if (event.button === 0) {
            var x = Graphics.pageToCanvasX(event.pageX);
            var y = Graphics.pageToCanvasY(event.pageY);
            this._mousePressed = false;
            this._onRelease(x, y);
        }
    };

    /**
     * @static
     * @method _onWheel
     * @param {WheelEvent} event
     * @private
     */
    GhostButton_TouchInput._onWheel = function (event) {
        this._events.wheelX += event.deltaX;
        this._events.wheelY += event.deltaY;
        event.preventDefault();
    };

    /**
     * @static
     * @method _onTouchStart
     * @param {TouchEvent} event
     * @private
     */
    GhostButton_TouchInput._onTouchStart = function (event) {
        if (event.changedTouches.length || event.touches.length) {
            var joyStick = SceneManager._scene.getChildByName('JoyStick');
            joyStick && joyStick.onTouchStart(event);
            joyStick = undefined;
            var ghostButtons = SceneManager._scene.getChildByName('ghostButtons');
            if (ghostButtons && ghostButtons.children.length) {
                ghostButtons.children.forEach(function (sprite) {
                    if (sprite && sprite instanceof Sprite_Keyboard) {
                        sprite.onTouchStart(event);
                    }
                })
            }
            ghostButtons = undefined;
        }
        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i];
            var x = Graphics.pageToCanvasX(touch.pageX);
            var y = Graphics.pageToCanvasY(touch.pageY);
            if (Graphics.isInsideCanvas(x, y)) {
                this._screenPressed = true;
                this._pressedTime = 0;
                if (event.touches.length >= 2) {
                    this._onCancel(x, y);
                } else {
                    this._onTrigger(x, y);
                }
            }
        }
        if (window.cordova || window.navigator.standalone) {
            event.preventDefault();
        }
    };

    /**
     * @static
     * @method _onTouchMove
     * @param {TouchEvent} event
     * @private
     */
    GhostButton_TouchInput._onTouchMove = function (event) {
        if (event.changedTouches.length || event.touches.length) {
            var joyStick = SceneManager._scene.getChildByName('JoyStick');
            joyStick && joyStick.onTouchMove(event);
            joyStick = undefined;
            var ghostButtons = SceneManager._scene.getChildByName('ghostButtons');
            if (ghostButtons && ghostButtons.children.length) {
                ghostButtons.children.forEach(function (sprite) {
                    if (sprite && sprite instanceof Sprite_Keyboard) {
                        sprite.onTouchMove(event);
                    }
                })
            }
            ghostButtons = undefined;
        }
        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i];
            var x = Graphics.pageToCanvasX(touch.pageX);
            var y = Graphics.pageToCanvasY(touch.pageY);
            this._onMove(x, y);
        }
    };

    /**
     * @static
     * @method _onTouchEnd
     * @param {TouchEvent} event
     * @private
     */
    GhostButton_TouchInput._onTouchEnd = function (event) {
        if (event.changedTouches.length || event.touches.length) {
            var joyStick = SceneManager._scene.getChildByName('JoyStick');
            joyStick && joyStick.onTouchEnd(event);
            joyStick = undefined;
            var ghostButtons = SceneManager._scene.getChildByName('ghostButtons');
            if (ghostButtons && ghostButtons.children.length) {
                ghostButtons.children.forEach(function (sprite) {
                    if (sprite && sprite instanceof Sprite_Keyboard) {
                        sprite.onTouchEnd(event);
                    }
                })
            }
            ghostButtons = undefined;
        }
        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i];
            var x = Graphics.pageToCanvasX(touch.pageX);
            var y = Graphics.pageToCanvasY(touch.pageY);
            this._screenPressed = false;
            this._onRelease(x, y);
        }
    };

    /**
     * @static
     * @method _onTouchCancel
     * @param {TouchEvent} event
     * @private
     */
    GhostButton_TouchInput._onTouchCancel = function (event) {
        if (event.changedTouches.length || event.touches.length) {
            var joyStick = SceneManager._scene.getChildByName('JoyStick');
            joyStick && joyStick.onTouchCancel(event);
            joyStick = undefined;
            var ghostButtons = SceneManager._scene.getChildByName('ghostButtons');
            if (ghostButtons && ghostButtons.children.length) {
                ghostButtons.children.forEach(function (sprite) {
                    if (sprite && sprite instanceof Sprite_Keyboard) {
                        sprite.onTouchCancel(event);
                    }
                })
            }
            ghostButtons = undefined;
        }
        this._screenPressed = false;
    };

    /**
     * @static
     * @method _onPointerDown
     * @param {PointerEvent} event
     * @private
     */
    GhostButton_TouchInput._onPointerDown = function (event) {
        if (event.pointerType === 'touch' && !event.isPrimary) {
            var x = Graphics.pageToCanvasX(event.pageX);
            var y = Graphics.pageToCanvasY(event.pageY);
            if (Graphics.isInsideCanvas(x, y)) {
                // For Microsoft Edge
                this._onCancel(x, y);
                event.preventDefault();
            }
        }
    };

    /**
     * @static
     * @method _onTrigger
     * @param {Number} x
     * @param {Number} y
     * @private
     */
    GhostButton_TouchInput._onTrigger = function (x, y) {
        this._events.triggered = true;
        this._x = x;
        this._y = y;
        this._date = Date.now();
    };

    /**
     * @static
     * @method _onCancel
     * @param {Number} x
     * @param {Number} y
     * @private
     */
    GhostButton_TouchInput._onCancel = function (x, y) {
        this._events.cancelled = true;
        this._x = x;
        this._y = y;
    };

    /**
     * @static
     * @method _onMove
     * @param {Number} x
     * @param {Number} y
     * @private
     */
    GhostButton_TouchInput._onMove = function (x, y) {
        this._events.moved = true;
        this._x = x;
        this._y = y;
    };

    /**
     * @static
     * @method _onRelease
     * @param {Number} x
     * @param {Number} y
     * @private
     */
    GhostButton_TouchInput._onRelease = function (x, y) {
        this._events.released = true;
        this._x = x;
        this._y = y;
    };
}();