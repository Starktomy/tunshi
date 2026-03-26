//==============================================================================================================
// Virtual_Buttons.js
//==============================================================================================================
/*:
 * @target MZ
 * @plugindesc <MV + MZ> 虚拟按键
 * @author 芯☆淡茹水
 * @help 
 * 
 * 〓 说明 〓
 * 
 * 该插件在 Input 里面所有登记的按键都可以添加成虚拟按钮，
 * 添加时写好这个按钮的 键盘十进制键值 ，以及其他必要的按钮参数。
 * 
 * 任何可以用电脑键盘操作的界面，并且虚拟按键里有对应的键盘按键（例如最基本的确定/取消），皆可以用
 * 虚拟按键操作。
 * 若虚拟按键无法操作某个界面，请先检查该界面是否能够用电脑键盘操作！
 * 
 * 〓 MV插件命令 〓
 * 
 * 1，显示/隐藏 虚拟按键 =>  ChangeVbVisible enabled
 *    enabled :显示或者隐藏，写 ON 为显示； 写 OFF 为隐藏。
 * 
 * 2, 打开虚拟按键设置界面 =>  OpenVbDebug
 * 
 * 
 * @param routine
 * @text 〓 常规设置 〓
 * @default
 * 
 * @param rocker
 * @text 〓 摇杆设置 〓
 * @default
 * 
 * @param button
 * @text 〓 按键设置 〓
 * @default
 * 
 * @param imgPath
 * @parent routine
 * @text 图片文件路径
 * @desc 虚拟按键相关的各种图片的文件路径。
 * @default img/system/
 * 
 * @param opacity
 * @parent routine
 * @min 0
 * @max 100
 * @type number
 * @text 初始虚拟按键不透明度
 * @desc 初始虚拟按键的不透明度(0 ~ 100)。
 * @default 60
 * 
 * @param visible
 * @parent routine
 * @type boolean
 * @text 初始虚拟按键是否显示
 * @desc 初始虚拟按键是否显示。
 * @default true
 * 
 * @param coexistTouch
 * @parent routine
 * @type boolean
 * @text 是否与鼠标触碰共存
 * @desc 虚拟按钮功能是否与默认的鼠标触碰功能共存。
 * 若摇杆设置为不固定，强行不能共存。
 * @default true
 * 
 * @param invalidScenes
 * @parent routine
 * @text 不显示虚拟按键的场景
 * @desc 场景类名，格式：SceneClass1,SceneClass2,SceneClass3....
 * @default
 * 
 * 
 * @param rockerX
 * @parent rocker
 * @type number
 * @text 摇杆初始 X 坐标
 * @desc 摇杆初始 X 坐标。
 * @default 20
 * 
 * @param rockerY
 * @parent rocker
 * @type number
 * @text 摇杆初始 Y 坐标
 * @desc 摇杆初始 Y 坐标。
 * @default 450
 * 
 * @param rockerDiam
 * @parent rocker
 * @type number
 * @text 摇杆圆形直径
 * @desc 未使用图片时，将以此直径来绘制摇杆。
 * @default 160
 * 
 * @param rockerFix
 * @parent rocker
 * @type boolean
 * @text 摇杆是否固定
 * @desc 固定时,摇杆常显示；
 * 不固定时，摇杆触碰时显示，默认鼠标触碰失效。
 * @default true
 * 
 * @param rockerImg
 * @parent rocker
 * @text 摇杆底圈图片名
 * @desc 使用图片作为摇杆底圈。
 * @default
 * 
 * @param seName
 * @parent rocker
 * @text 点击到摇杆时播放的SE
 * @desc 点击到摇杆时播放的SE。
 * @default
 * 
 * @param ballImg
 * @parent rocker
 * @text 摇杆滚球图片名
 * @desc 使用图片作为摇杆滚球。
 * @default
 * 
 * @param ballLimit
 * @parent rocker
 * @type boolean
 * @text 摇杆滚球是否限制在底圈圆范围内
 * @desc 摇杆滚球是否限制在底圈圆范围内。
 * @default true
 * 
 *  
 * @param keyA
 * @parent button
 * @text 按键1设置(默认 确定键)
 * @type struct<keyButton>
 * @default {"x":"590","y":"540","width":"86","height":"56","value":"90","text":"A"}
 * 
 * @param keyB
 * @parent button
 * @text 按键2设置(默认 取消键)
 * @type struct<keyButton>
 * @default {"x":"700","y":"540","width":"86","height":"56","value":"88","text":"B"}
 * 
 * @param keyC
 * @parent button
 * @text 按键3设置
 * @type struct<keyButton>
 * @default
 * 
 * @param keyD
 * @parent button
 * @text 按键4设置
 * @type struct<keyButton>
 * @default
 * 
 * @param keyE
 * @parent button
 * @text 按键5设置
 * @type struct<keyButton>
 * @default
 * 
 * 
 * @command ChangeVbVisible
 * @text 显示/隐藏虚拟按键
 * @desc 显示/隐藏虚拟按键。
 * 
 * @arg state
 * @type boolean
 * @default true
 * @text 虚拟按键可视
 * @desc 虚拟按键可视开启或关闭。
 * 
 * 
 * @command OpenVbDebug
 * @text 打开虚拟按键设置场景
 * @desc 打开虚拟按键设置场景。
 */
/* ---------------------------------------------------------------------------
 * struct<keyButton>
 * ---------------------------------------------------------------------------
*/
 /*~struct~keyButton: 
 *
 * @param x
 * @type number
 * @text 按键初始 X 坐标
 * @desc 按键初始 X 坐标。
 * @default
 * 
 * @param y
 * @type number
 * @text 按键初始 Y 坐标
 * @desc 按键初始 Y 坐标。
 * @default
 * 
 * @param width
 * @type number
 * @text 按键宽度
 * @desc 按键宽度(未使用图片时，以此宽度绘制按键，至少 30 像素！)。
 * @default
 * 
 * @param height
 * @type number
 * @text 按键高度
 * @desc 按键高度(未使用图片时，以此宽度绘制按键，至少 30 像素！)。
 * @default
 * 
 * @param value
 * @type number
 * @text 按键键值
 * @desc 按键的键盘键值(十进制)。
 * @default
 * 
 * @param text
 * @text 按键名
 * @desc 按键名。
 * @default
 * 
 * @param img
 * @text 按键图片名
 * @desc 使用图片作为这个按键。
 * @default
 * 
 * @param se
 * @text 点击时播放的SE
 * @desc 点击时播放的SE。
 * @default
 * 
*/
//==============================================================================================================
;((isMZ) => {
//==============================================================================================================
const pluginName = 'XdRs_VirtualButtons';
const parameters = PluginManager.parameters(pluginName);
//==============================================================================================================
// 核心 修改/增加 部分
//==============================================================================================================
CanvasRenderingContext2D.prototype.setRoundRectPath = function(width, height, radius){
    this.beginPath(0); 
    this.arc(width - radius, height - radius, radius, 0, Math.PI / 2); 
    this.lineTo(radius, height);
    this.arc(radius, height - radius, radius, Math.PI / 2, Math.PI); 
    this.lineTo(0, radius);  
    this.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);  
    this.lineTo(width - radius, 0); 
    this.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);  
    this.lineTo(width, height - radius);
    this.closePath();
};
Bitmap.prototype.fillRoundRect = function(x, y, width, height, radius, lineWidth, strokeColor, fillColor) {         
    if (2 * radius > width || 2 * radius > height) return;
    const context = this._context;
    context.save();
    context.translate(x, y); 
    context.setRoundRectPath(width, height, radius);
    context.lineWidth = lineWidth || 2;
    context.strokeStyle = strokeColor || 'black';
    if (fillColor) {
        context.fillStyle = fillColor;
        context.fill();
    }
    context.stroke();
    context.restore();
};
Bitmap.prototype.drawCircleGD = function(x, y, r, scale, color1, color2) {
    const context = this._context;
    const rg = context.createRadialGradient(x, y, r, x, y, r * scale);
    context.beginPath();
	context.arc(x, y , r, 0, Math.PI * 2, true);
	context.closePath();
	rg.addColorStop(0, color1);
	rg.addColorStop(1, color2);
	context.fillStyle = rg;
	context.fill();
    context.restore();
};
Bitmap.prototype.clearCircle = function(x, y, r) {
    const context = this._context;
    context.save();
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI, false);
    context.clip();
    context.clearRect(x-r, y-r , 2 * r, 2 * r);
    context.restore();
};
Bitmap.prototype.drawArrow = function(x, y, width, height, color, direction) {
    const ox = direction === 'up' ? x + width / 2 : x;
    const oy = direction === 'left' ? y + height / 2 : y;
    const sy = direction === 'right' ? y + height / 2 : (direction === 'up' ? y + height : y);
    const sx = direction === 'left' ? x + width : (direction === 'down' ? x + width / 2 : x);
    const context = this._context;
    context.beginPath();
    context.moveTo(ox, oy);
    context.lineTo(x + width, sy);
    context.lineTo(sx, y + height);
    context.lineTo(ox, oy);
	context.closePath();
	context.fillStyle = color;
    context.fill();
    context.stroke();
    context.restore();
};
Bitmap.prototype.setImageData = function(imageData) {
    if (imageData) this._context.putImageData(imageData, 0, 0);
};
if (isMZ) {
    Bitmap.prototype.adjustTone = function(r, g, b) {
        if ((r || g || b) && this.width > 0 && this.height > 0) {
            const context = this._context;
            const imageData = context.getImageData(0, 0, this.width, this.height);
            const pixels = imageData.data;
            for (var i = 0; i < pixels.length; i += 4) {
                pixels[i + 0] += r;
                pixels[i + 1] += g;
                pixels[i + 2] += b;
            }
            context.putImageData(imageData, 0, 0);
            this._baseTexture.update();
        }
    };
}
//==============================================================================================================
const TouchInput_onLeftButtonDown = TouchInput._onLeftButtonDown;
TouchInput._onLeftButtonDown = function(event) {
    const x = Graphics.pageToCanvasX(event.pageX);
    const y = Graphics.pageToCanvasY(event.pageY);
    !VB_Manager.isHover(x, y) && TouchInput_onLeftButtonDown.call(this, event);
};
TouchInput._onTouchStart = function(event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i];
        var x = Graphics.pageToCanvasX(touch.pageX);
        var y = Graphics.pageToCanvasY(touch.pageY);
        if (Graphics.isInsideCanvas(x, y) && !VB_Manager.isHover(x, y)) {
            this._screenPressed = true;
            this._pressedTime = 0;
            if (event.touches.length >= 2) {
                this._onCancel(x, y);
            } else {
                this._onTrigger(x, y);
            }
            event.preventDefault();
        }
    }
    if (window.cordova || window.navigator.standalone) {
        event.preventDefault();
    }
};
TouchInput._onTouchMove = function(event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i];
        var x = Graphics.pageToCanvasX(touch.pageX);
        var y = Graphics.pageToCanvasY(touch.pageY);
        !VB_Manager.isHover(x, y) && this._onMove(x, y);
    }
};
const XR_TouchInput_update = TouchInput.update;
TouchInput.update = function() {
    VB_Manager.isCoexistTouch() && XR_TouchInput_update.call(this);
};
//==============================================================================================================
if (!isMZ) {
    const XR_StorageManager_localFilePath = StorageManager.localFilePath;
    StorageManager.localFilePath = function(savefileId) {
        if (savefileId === 'virtualButton') {
            return this.localFileDirectoryPath() + VB_Manager.dataFileName() + '.rpgsave';
        }
        return XR_StorageManager_localFilePath.call(this, savefileId);
    };
    const XR_StorageManager_webStorageKey = StorageManager.webStorageKey;
    StorageManager.webStorageKey = function(savefileId) {
        if (savefileId === 'virtualButton') {
            return 'RPG ' + VB_Manager.dataFileName();
        }
        return XR_StorageManager_webStorageKey.call(this, savefileId);
    };
};
//==============================================================================================================
ImageManager.loadVbImg = function(filename) {
    return this.loadBitmap(parameters['imgPath'], filename);
};
//==============================================================================================================
const XR_SceneManager_changeScene = SceneManager.changeScene;
SceneManager.changeScene = function() {
    const tmp = this._scene ? this._scene.constructor : null;
    XR_SceneManager_changeScene.call(this);
    if (this._scene && tmp !== this._scene.constructor) {
        VB_Manager.onSceneChange(this._scene.constructor);
    }
};
const XR_SceneManager_updateInputData = SceneManager.updateInputData;
SceneManager.updateInputData = function() {
    XR_SceneManager_updateInputData.call(this);
    VB_Manager.update();
};
//==============================================================================================================
if (isMZ) {
    PluginManager.registerCommand(pluginName, 'ChangeVbVisible', args => {
        VB_Manager.changeVisible(!!eval(args.state));
    });
    PluginManager.registerCommand(pluginName, 'OpenVbDebug', () => {
        SceneManager.push(Scene_DebugVB);
    });
} else {
    const XR_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        XR_Game_Interpreter_pluginCommand.call(this, command, args);
        command === 'ChangeVbVisible' && VB_Manager.changeVisible(args[0].toUpperCase() === 'ON');
        command === 'OpenVbDebug' && SceneManager.push(Scene_DebugVB);
    };
}
//==============================================================================================================
const XR_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    XR_Scene_Boot_start.call(this);
    VB_Manager.initialize();
};
//==============================================================================================================
// 虚拟按键核心部分
//==============================================================================================================
function VB_Manager() { throw new Error('This is a static class'); }
VB_Manager.initialize = function() {
    document.body.parentNode.style.overflowX = 'hidden';
    document.body.parentNode.style.overflowY = 'hidden'; 
    this._buttons = [];
    this._requestImgs = [];
    this._isSceneVisible = true;
    this._isImgRequested = false;
    this._isVisible = !!eval(parameters['visible']);
    this.setupBaseData();
    this.loadSaveData();
};
VB_Manager.dataFileName = function() {
    return 'VirtualButtons';
};
VB_Manager.setupBaseData = function() {
    const requestImgs = [];
    this._baseData = {'buttons':{}};
    this._baseData.opacity = parseInt(parameters['opacity']) / 100;
    this._baseData.coexistTouch = !!eval(parameters['coexistTouch']);
    const rd = parseInt(parameters['rockerDiam']) || 160;
    const rx = Math.max(0, Math.min(Graphics.width - rd,  parseInt(parameters['rockerX']) || 0));
    const ry = Math.max(0, Math.min(Graphics.height - rd, parseInt(parameters['rockerY']) || 0));
    this._baseData.buttons['rocker'] = {};
    this._baseData.buttons['rocker'].se = parameters['seName'];
    this._baseData.buttons['rocker'].img = parameters['rockerImg'];
    this._baseData.buttons['rocker'].ballImg = parameters['ballImg'];
    this._baseData.buttons['rocker'].rect = new Rectangle(rx, ry, rd, rd);
    this._baseData.buttons['rocker'].isFixed = !!eval(parameters['rockerFix']);
    this._baseData.buttons['rocker'].ballLimit = !!eval(parameters['ballLimit']);
    requestImgs.push(parameters['rockerImg']);
    requestImgs.push(parameters['ballImg']);
    ['A','B','C','D','E'].forEach(s => {
        const name = 'key'+s;
        if (parameters[name]) {
            const struct = JSON.parse(parameters[name]);
            if (struct.value) {
                const w = parseInt(struct.width) || 0;
                const h = parseInt(struct.height) || 0;
                const x = Math.max(0, Math.min(Graphics.width - w,  parseInt(struct.x) || 0));
                const y = Math.max(0, Math.min(Graphics.height - h, parseInt(struct.y) || 0));
                if (struct.img || w >= 30 && h >= 30) {
                    requestImgs.push(struct.img);
                    this._baseData.buttons[name] = {};
                    this._baseData.buttons[name].se = struct.se;
                    this._baseData.buttons[name].img = struct.img;
                    this._baseData.buttons[name].text = struct.text;
                    this._baseData.buttons[name].rect = new Rectangle(x,y,w,h);
                    this._baseData.buttons[name].keyCode = parseInt(struct.value);
                }  
            }
        }
    });
    this._requestImgs = requestImgs.filter(imgName => !!imgName);
    this.startRequestImgs();
};
VB_Manager.loadSaveData = function() {
    this._saveData = null;
    if (isMZ) {
        StorageManager.loadObject(this.dataFileName())
            .then(data => { this.onSaveDataLoad(data); })
            .catch(()  => { this.onSaveDataLoad(null); });
    } else {
        const data = StorageManager.load('virtualButton');
        this.onSaveDataLoad(data ? JSON.parse(data) : null);
    }
};
VB_Manager.startRequestImgs = function() {
    if (this._requestImgs.length > 0) {
        this._requestImgs.forEach(imgName => {
            const bitmap = ImageManager.loadVbImg(imgName);
            bitmap.addLoadListener(() => { this.onImgRequested(imgName); });
        });
    } else this.onRequestImgsEnd();
};
VB_Manager.onImgRequested = function(imgName) {
    const index = this._requestImgs.indexOf(imgName);
    this._requestImgs.splice(index, 1);
    this._requestImgs.length === 0 && this.onRequestImgsEnd();
};
VB_Manager.onRequestImgsEnd = function() {
    this._isImgRequested = true;
    this.isSaveDataLoaded() && this.createButtons();
};
VB_Manager.onSaveDataLoad = function(data) {
    this._saveData = data || {'empty':true};
    this._isImgRequested && this.createButtons();
};
VB_Manager.onSceneChange = function(sceneClass) {
    if (this.isReady()) {
        const arr = parameters['invalidScenes'].split(',');
        const result = arr.some(text => {
            let scene = null;
            try { scene = eval(text); } 
            catch (e) { 
                console.error('【虚拟按键插件】 不显示虚拟按键的场景参数设置错误 => ('+text+') ？！'); 
            }
            return scene && scene === sceneClass;
        });
        this.changeSceneVisible(!result);
    }
};
VB_Manager.isSaveDataLoaded = function() {
    return !!this._saveData;
};
VB_Manager.isReady = function() {
    return this._isImgRequested && this.isSaveDataLoaded();
};
VB_Manager.isEnabled = function() {
    return this.isReady() && this._isVisible && this._isSceneVisible;
};
VB_Manager.isCoexistTouch = function() {
    if (!this.isEnabled() || !this._baseData) return true;
    return this._baseData.buttons['rocker'].isFixed && this._baseData.coexistTouch;
};
VB_Manager.createButtons = function() {
    const isEmptySave = !!this._saveData.empty;
    const opacity = this[isEmptySave ? '_baseData' : '_saveData'].opacity;
    const arr = Object.keys(this._baseData.buttons);
    arr.forEach(name => {
        let point = null;
        if (!isEmptySave && this._saveData.buttons[name]) {
            point = this._saveData.buttons[name];
        }
        const data = this._baseData.buttons[name];
        if (point) {
            data.rect.x = point.x;
            data.rect.y = point.y;
        }
        const button = new (name === 'rocker' ? VB_Rocker : VB_Button)(name, data, opacity);
        this._buttons.push(button);
    });
    this.refreshButtonsVisible();
};
VB_Manager.resetSaveData = function(data) {
    this._saveData = data;
    const opacity = this._saveData.opacity;
    const arr = Object.keys(this._saveData.buttons);
    arr.forEach(name => {
        const point = this._saveData.buttons[name];
        if (point) {
            this._buttons.forEach(b => {
                if (b.name() === name) {
                    b.reset(point.x, point.y, opacity);
                }
            });
        }
    });
    if (isMZ) StorageManager.saveObject(this.dataFileName(), this._saveData);
    else StorageManager.save('virtualButton', JSON.stringify(this._saveData));
};
VB_Manager.changeVisible = function(state) {
    if (this.isReady() && this._isVisible !== state) {
        this._isVisible = state;
        this.refreshButtonsVisible();
    }
};
VB_Manager.changeSceneVisible = function(state) {
    if (this.isReady() && this._isSceneVisible !== state) {
        this._isSceneVisible = state;
        this.refreshButtonsVisible();
    }
};
VB_Manager.refreshButtonsVisible = function() {
    const visible = this._isVisible && this._isSceneVisible;
    this._buttons.forEach(b => b.changeVisible(visible));
};
VB_Manager.getDebugData = function() {
    const data = {'buttons':{}};
    const isEmptySave = !!this._saveData.empty;
    data.opacity = this[isEmptySave ? '_baseData' : '_saveData'].opacity;
    Object.keys(this._baseData.buttons).forEach(name => {
        const rect = this._baseData.buttons[name].rect;
        let point = new Point(rect.x, rect.y);
        if (!isEmptySave && this._saveData.buttons[name]) {
            point = this._saveData.buttons[name];
        }
        data.buttons[name] = point;
    });
    return data;
};
VB_Manager.getDebugImgs = function() {
    const data = {};
    const needRocker = this._baseData.buttons['rocker'].isFixed;
    this._buttons.forEach(b => {
        if (b.name() !== 'rocker' || needRocker) {
            data[b.name()] = b.makeDebugData();
        }
    });
    return data;
};
VB_Manager.isHover = function(x, y) {
    return this.isEnabled() && this._buttons.some(b => b.isTouch(x, y));
};
VB_Manager.isHoverButton = function(x, y) {
    if (!this.isEnabled()) return false;
    return this._buttons.some(b => {
        return b.name() !== 'rocker' && b.isTouch(x, y);
    });
};
VB_Manager.update = function() {
    if (this.isEnabled()) {
        this._buttons.forEach(b => b.update());
    }
};
//==============================================================================================================
function VB_PartBase() {
    this.initialize.apply(this, arguments);
}
VB_PartBase.prototype.constructor = VB_PartBase;
VB_PartBase.prototype.initialize = function(name, data, opacity) {
    this._name = name;
    this._data = data;
    this._lastScale = 1;
    this._isVisible = true;
    this._rect = data.rect;
    this._currentKeys = [];
    this._opacity = opacity;
    this.clear();
    this.createBitmap();
    this.setupEventHandlers();
};
VB_PartBase.prototype.clear = function() {
    this._isPressed = false;
    this._identifier = null;
    this.clearPressedKeys();
};
VB_PartBase.prototype.clearPressedKeys = function() {
    this.keyUp(...this._currentKeys);
    this._currentKeys = [];
};
VB_PartBase.prototype.name = function() {
    return this._name;
};
VB_PartBase.prototype.playSe = function() {
    if (this._data.se) {
        const vol = ConfigManager.seVolume;
        const se = {"name":this._data.se,"volume":vol,"pitch":100,"pan":0};
        AudioManager.playSe(se);
    }
};
VB_PartBase.prototype.keyDown = function() {
    Array.prototype.forEach.call(arguments, keyCode => {
        if (!!keyCode && !this._currentKeys.contains(keyCode)) {
            Input._onKeyDown(this.createInputEvent(keyCode));
            this._currentKeys.push(keyCode);
        }
    });
};
VB_PartBase.prototype.keyUp = function() {
    Array.prototype.forEach.call(arguments, keyCode => {
        if (this._currentKeys.contains(keyCode)) {
            Input._onKeyUp(this.createInputEvent(keyCode));
            const index = this._currentKeys.indexOf(keyCode);
            this._currentKeys.splice(index, 1);
        }
    });
};
VB_PartBase.prototype.createInputEvent = function(keyCode) {
    const event = {};
    event.keyCode = keyCode;
    event.preventDefault = () => {};
    return event;
};
VB_PartBase.prototype.createBitmap = function() {
    if (this._data.img) {
        this._bitmap = this.createPictureBitmap(this._data.img);
        this._rect.width = this._bitmap.width;
        this._rect.height = this._bitmap.height;
    } else {
        this._bitmap = new Bitmap(this._rect.width, this._rect.height);
        this.drawBitmap();
    }
    this.setupBitmap();
};
VB_PartBase.prototype.createPictureBitmap = function(name) {
    const img = ImageManager.loadVbImg(name);
    const bw = img.width, bh = img.height;
    const bitmap = new Bitmap(bw, bh);
    bitmap.blt(img, 0, 0, bw, bh, 0, 0);
    return bitmap;
};
VB_PartBase.prototype.drawBitmap = function() {
    const w = this._bitmap.width, h = this._bitmap.height;
    const r = Math.floor(w / 2);
    const color1 = 'rgb(20,20,20)', color2 = 'rgb(120,120,120)';
    const color3 = 'rgb(0,0,0)',    color4 = 'rgb(80,80,80)';
    const color5 = 'rgba(255,255,255,0.5)';
    if (this._name === 'rocker') {
        const r2 = r * 0.9, r3 = r * 0.6, aw = w / 5;;
        this._bitmap.drawCircleGD(r, r, r, 0.95, color2, color1);
        this._bitmap.drawCircleGD(r, r, r2, 0.8, color1, color2);
        this._bitmap.drawCircleGD(r, r, r3, 0.4, color4, color3);
        this._bitmap.drawArrow(w/2-aw/2, r - r3, aw, aw, color5, 'up');
        this._bitmap.drawArrow(r-r3, w/2-aw/2, aw, aw, color5, 'left');
        this._bitmap.drawArrow(w-r3-aw/2, w/2-aw/2, aw, aw, color5, 'right');
        this._bitmap.drawArrow(w/2-aw/2, w-r3-aw/2, aw, aw, color5, 'down');
        this._bitmap.clearCircle(r, r, r/3-4);
    } else {
        this._bitmap.fillRoundRect(6, 6, w-12, h-12, 10, 6, color3);
        this._bitmap.clearRect(0, 0, w, h - 12);
        this._bitmap.fillRoundRect(5, 5, w-10, h-12, 10, 4, color3, color4);
        if (this._data.text) {
            this._bitmap.fontSize = h - 24;
            this._bitmap.drawText(this._data.text, 6, 6, w-12, h-15, 'center');
        }
    }
};
VB_PartBase.prototype.setupBitmap = function() {
    const canvas = this._bitmap.canvas;
    canvas.id = this._name;
    canvas.style.position = 'absolute';
    canvas.style.margin = 'auto';
    canvas.style.zIndex = 97;
    this.onWindowResize();
    this.onOpacityChange();
    document.body.appendChild(canvas);
};
VB_PartBase.prototype.setupEventHandlers = function() {
    document.addEventListener('mousedown',  this.onMouseDown.bind(this));
    document.addEventListener('mousemove',  this.onMouseMove.bind(this));
    document.addEventListener('mouseup',    this.onMouseUp.bind(this));
    document.addEventListener('touchstart', this.onTouchStart.bind(this));
    document.addEventListener('touchmove',  this.onTouchMove.bind(this));
    document.addEventListener('touchend',   this.onTouchEnd.bind(this));
};
VB_PartBase.prototype.setOpacity = function(opacity) {
    if (this._opacity !== opacity) {
        this._opacity = opacity;
        this.onOpacityChange();
    }
};
VB_PartBase.prototype.changeVisible = function(state) {
    if (this._isVisible !== state) {
        this._isVisible = state;
        !state && this.clear();
        this.onOpacityChange();
    }
};
VB_PartBase.prototype.onOpacityChange = function() {
    if (this._bitmap) {
        const opacity = this.isVisible() ? this._opacity : 0;
        this._bitmap.canvas.style.opacity = opacity;
    }
};
VB_PartBase.prototype.isVisible = function() {
    return this._isVisible;
};
VB_PartBase.prototype.isCurrentTouch = function(touch) {
    return touch && this._identifier === touch.identifier;
};
VB_PartBase.prototype.onMouseDown = function(event) {
    if (this._isVisible && event.button === 0) {
        const x = Graphics.pageToCanvasX(event.pageX);
        const y = Graphics.pageToCanvasY(event.pageY);
        if (Graphics.isInsideCanvas(x, y) && this.isTouch(x, y)) {
            this.onTouch(x, y);
        }
    }
};
VB_PartBase.prototype.onMouseMove = function(event) {
    if (this._isVisible && event.button === 0 && this._isPressed) {
        const x = Graphics.pageToCanvasX(event.pageX);
        const y = Graphics.pageToCanvasY(event.pageY);
        this.isTouch(x, y) ? this.onTouchChange(x, y) : this.onRelease();
    }
};
VB_PartBase.prototype.onMouseUp = function(event) {
    if (this._isVisible && event.button === 0 && this._isPressed) {
        this.onRelease();
    }
};
VB_PartBase.prototype.onTouchStart = function(event) {
    if (this._isVisible) {
        for (let i=0;i<event.changedTouches.length;++i) {
            let touch = event.changedTouches[i];
            let x = Graphics.pageToCanvasX(touch.pageX);
            let y = Graphics.pageToCanvasY(touch.pageY);
            if (Graphics.isInsideCanvas(x, y) && this.isTouch(x, y)) {
                this.onTouch(x, y, touch);
                event.preventDefault();
            }
        }
        if (window.cordova || window.navigator.standalone) {
            event.preventDefault();
        }
    }
};
VB_PartBase.prototype.onTouchMove = function(event) {
    if (this._isVisible && this._isPressed) {
        for (let i=0;i<event.changedTouches.length;++i) {
            let touch = event.changedTouches[i];
            if (this.isCurrentTouch(touch)) {
                let x = Graphics.pageToCanvasX(touch.pageX);
                let y = Graphics.pageToCanvasY(touch.pageY);
                this.isTouch(x, y) ? this.onTouchChange(x, y) : this.onRelease(); 
            }
        }
    }
};
VB_PartBase.prototype.onTouchEnd = function(event) {
    if (this._isVisible && this._isPressed) {
        for (let i=0;i<event.changedTouches.length;++i) {
            let touch = event.changedTouches[i];
            this.isCurrentTouch(touch) && this.onRelease();
        }
    }
};
VB_PartBase.prototype.isTouch = function(x, y) {
    return this._isVisible && this._rect && this._rect.contains(x, y);
};
VB_PartBase.prototype.onTouch = function(x, y, touch) {
    if (!this._isPressed) {
        this._isPressed = true;
        this.playSe();
        this.keyDown(this._data.keyCode);
        if (touch) {
            this._identifier = touch.identifier;
        }
    }
};
VB_PartBase.prototype.onTouchChange = function(x, y) {
};
VB_PartBase.prototype.onRelease = function() {
    this.clear();
};
VB_PartBase.prototype.makeDebugData = function() {
    if (this._rect) {
        const bitmap = new Bitmap(this._rect.width, this._rect.height);
        bitmap.blt(this._bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0);
        return {'x':this._rect.x, 'y':this._rect.y, 'bitmap':bitmap};
    }
    return null;
};
VB_PartBase.prototype.reset = function(x, y, opacity) {
    if (this._rect) {
        this._rect.x = x;
        this._rect.y = y;
        this.onWindowResize();
        this.setOpacity(opacity);
    }
};
VB_PartBase.prototype.isWindowResize = function() {
    return this._lastScale !== Graphics._realScale ||
    this._lastWindowWidth !== document.body.clientWidth ||
    this._lastWindowHeight !== document.body.clientHeight;
};
VB_PartBase.prototype.onWindowResize = function() {
    const top = Graphics._canvas.offsetTop;
    const left = Graphics._canvas.offsetLeft;
    this._lastScale = Graphics._realScale;
    this._lastWindowWidth = document.body.clientWidth;
    this._lastWindowHeight = document.body.clientHeight;
    this._bitmap.canvas.style.top = this._rect.y * this._lastScale + top + 'px';
    this._bitmap.canvas.style.left = this._rect.x * this._lastScale + left + 'px';
    this._bitmap.canvas.style.width = this._rect.width * this._lastScale + 'px';
    this._bitmap.canvas.style.height = this._rect.height * this._lastScale + 'px';
};
VB_PartBase.prototype.update = function() {
    if (this._isVisible && this._bitmap) {
        this.updateGraphicsScale();
    }
};
VB_PartBase.prototype.updateGraphicsScale = function() {
    this.isWindowResize() && this.onWindowResize();
};
//==============================================================================================================
function VB_Rocker() {
    this.initialize.apply(this, arguments);
}
VB_Rocker.prototype = Object.create(VB_PartBase.prototype);
VB_Rocker.prototype.constructor = VB_Rocker;
VB_Rocker.prototype.initialize = function(name, data, opacity) {
    VB_PartBase.prototype.initialize.call(this, name, data, opacity);
    this.createBall();
    this.setupDirectionKeys();
    this.onOpacityChange();
};
VB_Rocker.prototype.clear = function() {
    VB_PartBase.prototype.clear.call(this);
    this._lastDirection = 0;
};
VB_Rocker.prototype.setupDirectionKeys = function() {
    const keys = Object.keys(Input.keyMapper);
    const a = ['down','left','right','up'].map(keyName => {
        for (let i=0;i<keys.length;++i) {
            if (Input.keyMapper[keys[i]] === keyName) {
                return parseInt(keys[i]);
            }
        }
        return 0;
    });
    this._directionKeys = [[],[a[0],a[1]],[a[0]],[a[0],a[2]],[a[1]],
                          [],[a[2]],[a[1],a[3]],[a[3]],[a[2],a[3]]];
};
VB_Rocker.prototype.getDirectionKeys = function(d) {
    return this._directionKeys[d] || [];
};
VB_Rocker.prototype.createBall = function() {
    if (this._data.ballImg) {
        this._ball = this.createPictureBitmap(this._data.ballImg);
    } else {
        const size = Math.floor(this._rect.width / 3), r = size / 2;
        this._ball = new Bitmap(size, size);
        this._ball.drawCircleGD(r, r, r, 0.4, 'rgb(0,0,0)', 'rgb(80,80,80)');
    }
    const canvas = this._ball.canvas;
    canvas.id = 'keyBall';
    canvas.style.opacity = this._opacity;
    canvas.style.position = 'absolute';
    canvas.style.margin = 'auto';
    canvas.style.zIndex = 98;
    this.ballHoming();
    document.body.appendChild(canvas);
};
VB_Rocker.prototype.isBallMoved = function(x, y) {
    return this._ballX !== x || this._ballY !== y;
};
VB_Rocker.prototype.setBallPosition = function(x, y, force) {
    if (this._ball && (force || this.isBallMoved(x, y))) {
        this._ballX = x;
        this._ballY = y;
        const top = Graphics._canvas.offsetTop;
        const left = Graphics._canvas.offsetLeft;
        this._ball.canvas.style.top = y * this._lastScale + top + 'px';
        this._ball.canvas.style.left = x * this._lastScale + left + 'px';
        this._ball.canvas.style.width = this._ball.width * this._lastScale + 'px';
        this._ball.canvas.style.height = this._ball.height * this._lastScale + 'px';
    }
};
VB_Rocker.prototype.ballHoming = function() {
    const n = this._rect.width / 2 - this._ball.width / 2;
    this.setBallPosition(this._rect.x+n, this._rect.y+n);
};
VB_Rocker.prototype.isVisible = function() {
    return this._isVisible && (this._data.isFixed || this._isPressed);
};
VB_Rocker.prototype.onOpacityChange = function() {
    VB_PartBase.prototype.onOpacityChange.call(this);
    if (this._ball) {
        const opacity = this.isVisible() ? this._opacity : 0;
        this._ball.canvas.style.opacity = opacity;
    }
};
VB_Rocker.prototype.reactionDistance = function() {
    return this._rect.width / 5;
};
VB_Rocker.prototype.isTouch = function(x, y) {
    if (this._data.isFixed) {
        if (this._isPressed && !this._data.ballLimit) return true;
        return VB_PartBase.prototype.isTouch.call(this, x, y);
    }
    return this._isVisible && Graphics.isInsideCanvas(x, y);
};
VB_Rocker.prototype.onTouch = function(x, y, touch) {
    if (!this._isPressed && !VB_Manager.isHoverButton(x, y)) {
        VB_PartBase.prototype.onTouch.call(this, x, y, touch);
        if (this._data.isFixed) this.onTouchChange(x, y);
        else {
            const rx = x - this._rect.width / 2;
            const ry = y - this._rect.height / 2;
            this.reset(rx, ry, this._opacity);
            this.onOpacityChange();
        }
    }
};
VB_Rocker.prototype.onTouchChange = function(x, y) {
    VB_PartBase.prototype.onTouchChange.call(this, x, y);
    const sw = this._ball.width / 2;
    let bx = Math.max(0, Math.min(Graphics.width - sw*2, x - sw));
    let by = Math.max(0, Math.min(Graphics.height - sw*2, y - sw));
    const ox = this._rect.x + this._rect.width / 2;
    const oy = this._rect.y + this._rect.height / 2;
    const a = Math.PI / 2 + Math.atan2(y - oy, x - ox);
    const angle = (a / Math.PI * 180 + 360) % 360;
    let distance = Math.abs(x - ox) + Math.abs(y - oy);
    if (this._data.ballLimit) {
        const max = Math.floor(this._rect.width / 2) - Math.floor(this._ball.width / 2) - 4;
        distance = Math.min(max, distance);
        bx = ox + distance * Math.sin(angle * Math.PI / 180) - sw;
        by = oy - distance * Math.cos(angle * Math.PI / 180) - sw;
    }
    this.setBallPosition(bx, by);
    if (distance >= this.reactionDistance()) {
        this.refreshTouchDirection(angle);
    } else {
        this._lastDirection = 0;
        this.clearPressedKeys();
    }
};
VB_Rocker.prototype.refreshTouchDirection = function(angle) {
    const index = Math.max(0, Math.floor((angle - 22.5) / 45 + 1)) % 8;
    const direction = [8,9,6,3,2,1,4,7][index];
    if (direction && this._lastDirection !== direction) {
        const newKeys  = this.getDirectionKeys(direction);
        const lastkeys = this.getDirectionKeys(this._lastDirection).filter(k => {
            return !newKeys.contains(k);
        });
        this.keyUp(...lastkeys);
        this.keyDown(...newKeys);
    }
    this._lastDirection = direction;
};
VB_Rocker.prototype.onRelease = function() {
    VB_PartBase.prototype.onRelease.call(this);
    !this._data.isFixed && this.onOpacityChange();
    this.ballHoming();
};
VB_Rocker.prototype.reset = function(x, y, opacity) {
    VB_PartBase.prototype.reset.call(this, x, y, opacity);
    this.ballHoming();
};
VB_Rocker.prototype.onWindowResize = function() {
    VB_PartBase.prototype.onWindowResize.call(this);
    this.setBallPosition(this._ballX, this._ballY, true);
};
//==============================================================================================================
function VB_Button() {
    this.initialize.apply(this, arguments);
}
VB_Button.prototype = Object.create(VB_PartBase.prototype);
VB_Button.prototype.constructor = VB_Button;
VB_Button.prototype.initialize = function(name, data, opacity) {
    this._highlight = false;
    VB_PartBase.prototype.initialize.call(this, name, data, opacity);
};
VB_Button.prototype.createBitmap = function() {
    VB_PartBase.prototype.createBitmap.call(this);
    if (this._bitmap) {
        const context = this._bitmap._context;
        this._imageData = context.getImageData(0,0,this._rect.width,this._rect.height);
    }
};
VB_Button.prototype.closeHighlight = function() {
    if (this._highlight) {
        this._highlight = false;
        this._bitmap.setImageData(this._imageData);
    }
};
VB_Button.prototype.onTouch = function(x, y, touch) {
    VB_PartBase.prototype.onTouch.call(this, x, y, touch);
    if (!this._highlight && this._imageData) {
        this._highlight = true;
        this._bitmap.adjustTone(80,80,80);
    }
};
VB_Button.prototype.onRelease = function() {
    VB_PartBase.prototype.onRelease.call(this);
    this.closeHighlight();
};
VB_Button.prototype.onOpacityChange = function() {
    VB_PartBase.prototype.onOpacityChange.call(this)
    this.closeHighlight();
};
VB_Button.prototype.makeDebugData = function() {
    this.closeHighlight();
    return VB_PartBase.prototype.makeDebugData.call(this);
};
//==============================================================================================================
// 默认窗口 增加/修改 部分
//==============================================================================================================
const XR_Window_Base_activate = Window_Base.prototype.activate;
Window_Base.prototype.activate = function() {
    XR_Window_Base_activate.call(this);
    this._vbCount = 5;
};
const XR_Window_Base_update = Window_Base.prototype.update;
Window_Base.prototype.update = function() {
    XR_Window_Base_update.call(this);
    if (!!this._vbCount) this._vbCount--;
};
//==============================================================================================================
const XR_Window_Selectable_isOpenAndActive = Window_Selectable.prototype.isOpenAndActive;
Window_Selectable.prototype.isOpenAndActive = function() {
    return !this._vbCount && XR_Window_Selectable_isOpenAndActive.call(this);
};
//==============================================================================================================
const XR_Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
Window_Options.prototype.makeCommandList = function() {
    this.addCommand('虚拟按键调整', 'virtualButton');
    XR_Window_Options_makeCommandList.call(this);
};
const XR_Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
    const symbol = this.commandSymbol(index);
    if (symbol === 'virtualButton') return '';
    return XR_Window_Options_statusText.call(this, index);
};
const XR_Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
    const symbol = this.commandSymbol(this.index());
    if (symbol === 'virtualButton') {
        SoundManager.playOk();
        return SceneManager.push(Scene_DebugVB);
    }
    XR_Window_Options_processOk.call(this);
};
const XR_Window_Options_changeValue = Window_Options.prototype.changeValue;
Window_Options.prototype.changeValue = function(symbol, value) {
    symbol !== 'virtualButton' && XR_Window_Options_changeValue.call(this, symbol, value);
};
//==============================================================================================================
// 虚拟按键设置（窗口+场景）部分
//==============================================================================================================
function DebugVB_SpriteBase() {
    this.initialize.apply(this, arguments);
}
DebugVB_SpriteBase.prototype = Object.create(Sprite.prototype);
DebugVB_SpriteBase.prototype.constructor = DebugVB_SpriteBase;
DebugVB_SpriteBase.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._pressCount = 0;
};
DebugVB_SpriteBase.prototype.hitTest = function(x, y) {
    const rect = new Rectangle(
        -this.anchor.x * this.width,
        -this.anchor.y * this.height,
        this.width,
        this.height
    );
    return rect.contains(x, y);
};
DebugVB_SpriteBase.prototype.isTouched = function() {
    const touchPos = new Point(TouchInput.x, TouchInput.y);
    const localPos = this.worldTransform.applyInverse(touchPos);
    return this.hitTest(localPos.x, localPos.y);
};
DebugVB_SpriteBase.prototype.isPressed = function() {
    return this._pressCount > 0;
};
DebugVB_SpriteBase.prototype.isActive = function() {
    if (!this.worldVisible || this.isPressed()) return false;
    return !this.parent || !this.parent.isActive || this.parent.isActive();
};
DebugVB_SpriteBase.prototype.onTouch = function() {
    SoundManager.playOk();
    this._pressCount = 8;
    this.scale = new Point(0.95, 0.95);
};
DebugVB_SpriteBase.prototype.onPressEnd = function() {
    this._pressCount = 0;
    this.scale = new Point(1, 1);
};
DebugVB_SpriteBase.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updatePressed();
    this.updateTouch();
};
DebugVB_SpriteBase.prototype.updatePressed = function() {
    if (this.isPressed()) {
        this._pressCount--;
        !this._pressCount && this.onPressEnd();
    }
};
DebugVB_SpriteBase.prototype.updateTouch = function() {
    if (TouchInput.isTriggered() && this.isActive()) {
        this.isTouched() && this.onTouch();
    }
};
//==============================================================================================================
function DebugVB_Arrow() {
    this.initialize.apply(this, arguments);
}
DebugVB_Arrow.prototype = Object.create(DebugVB_SpriteBase.prototype);
DebugVB_Arrow.prototype.constructor = DebugVB_Arrow;
DebugVB_Arrow.prototype.initialize = function(x, y) {
    DebugVB_SpriteBase.prototype.initialize.call(this);
    this.anchor = new Point(0.5, 0.5);
    this.bitmap = new Bitmap(32, 32);
    this.bitmap.drawArrow(0, 0, 32, 32, 'white', 'down');
    this.visible = false;
    this.move(x, y);
};
DebugVB_Arrow.prototype.isActive = function() {
    return this.worldVisible && !this.isPressed();
};
DebugVB_Arrow.prototype.onTouch = function() {
    DebugVB_SpriteBase.prototype.onTouch.call(this);
    this.parent.onArrowPress();
};
//==============================================================================================================
function DebugVB_Button() {
    this.initialize.apply(this, arguments);
}
DebugVB_Button.prototype = Object.create(DebugVB_SpriteBase.prototype);
DebugVB_Button.prototype.constructor = DebugVB_Button;
DebugVB_Button.prototype.initialize = function(x, y, w, h, text, fun) {
    DebugVB_SpriteBase.prototype.initialize.call(this);
    this.anchor = new Point(0.5, 0.5);
    this.bitmap = new Bitmap(w, h);
    this._pressFun = fun;
    this.drawBitmap(text);
    this.move(x, y);
};
DebugVB_Button.prototype.drawBitmap = function(text) {
    this.bitmap.fillRoundRect(2,2,this.width-4,this.height-4,5,2,'Black','LightSlateBlue');
    this.bitmap.fontSize = this.height / 2;
    this.bitmap.drawText(text, 0, 0, this.width, this.height, 'center');
};
DebugVB_Button.prototype.onTouch = function() {
    DebugVB_SpriteBase.prototype.onTouch.call(this);
    this._pressFun && this._pressFun();
};
//==============================================================================================================
function DebugVB_Keymap() {
    this.initialize.apply(this, arguments);
}
DebugVB_Keymap.prototype = Object.create(DebugVB_SpriteBase.prototype);
DebugVB_Keymap.prototype.constructor = DebugVB_Keymap;
DebugVB_Keymap.prototype.initialize = function(x, y, bitmap, opacity) {
    DebugVB_SpriteBase.prototype.initialize.call(this);
    this._touchPoint = null;
    this.opacity = opacity;
    this.bitmap = bitmap;
    this.move(x, y);
};
DebugVB_Keymap.prototype.isActive = function() {
    return this.parent.debugMod() === 'place';
};
DebugVB_Keymap.prototype.setOpacity = function(opacityRate) {
    this.opacity = opacityRate * 255;
};
DebugVB_Keymap.prototype.updateTouch = function() {
    if (!this.isActive()) return;
    if (this._touchPoint) {
        if (!TouchInput.isPressed()) this._touchPoint = null;
        else {
            const x = TouchInput.x - this._touchPoint.x;
            const y = TouchInput.y - this._touchPoint.y;
            this.x = Math.max(0, Math.min(Graphics.width-this.width, x));
            this.y = Math.max(0, Math.min(Graphics.height-this.height, y));
        }
    } else {
        if (TouchInput.isTriggered() && this.isTouched()) {
            const x = TouchInput.x - this.x;
            const y = TouchInput.y - this.y;
            this._touchPoint = new Point(x, y);
        }
    }
};
//==============================================================================================================
function DebugVB_Window() {
    this.initialize.apply(this, arguments);
}
DebugVB_Window.prototype = Object.create(Sprite.prototype);
DebugVB_Window.prototype.constructor = DebugVB_Window;
DebugVB_Window.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._isDisplay = true;
    this.createBitmap();
    this.createParts();
    this.x = (Graphics.width - this.width) / 2;
};
DebugVB_Window.prototype.createBitmap = function() {
    this.bitmap = new Bitmap(640, 64);
    this.bitmap.fillRoundRect(4,4,this.width-8,this.height-8,8,4,'Black','LightSlateGray');
};
DebugVB_Window.prototype.createParts = function() {
    const fun1 = () => {
        this._isDisplay = false;
        this.parent.changeDebugMod('opacity');
    };
    const fun2 = () => {
        this._isDisplay = false;
        this.parent.changeDebugMod('place');
    };
    const fun3 = () => { this.parent.applyDebug(); };
    const fun4 = () => { this.parent.popScene(); };
    this._opButton = new DebugVB_Button(100, 32, 160, 36, '调整透明度', fun1);
    this._pcButton = new DebugVB_Button(280, 32, 160, 36, '调整位置', fun2);
    this._okButton = new DebugVB_Button(460, 32, 100, 36, '确定', fun3);
    this._clButton = new DebugVB_Button(570, 32, 100, 36, '取消', fun4);
    this._arrow = new DebugVB_Arrow(this.width/2, this.height+24);
    this.addChild(this._opButton);
    this.addChild(this._pcButton);
    this.addChild(this._okButton);
    this.addChild(this._clButton);
    this.addChild(this._arrow);
};
DebugVB_Window.prototype.isOnPlace = function() {
    return this.y === (this._isDisplay ? 0 : -64);
};
DebugVB_Window.prototype.isActive = function() {
    return this._isDisplay && this.isOnPlace();
};
DebugVB_Window.prototype.onArrowPress = function() {
    this.parent.changeDebugMod('select');
    this._isDisplay = true;
};
DebugVB_Window.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateInput();
    this.updateDisplay();
};
DebugVB_Window.prototype.updateInput = function() {
    if (this.isActive()) {
        if (Input.isTriggered('escape') || TouchInput.isCancelled()) {
            SoundManager.playCancel();
            this.parent.popScene();
        }
    }
};
DebugVB_Window.prototype.updateDisplay = function() {
    if (!this.isOnPlace()) {
        this.y += (this._isDisplay ? 8 : -8);
        if (this.isOnPlace()) {
            this._arrow.visible = !this._isDisplay;
        }
    }
};
//==============================================================================================================
function DebugVB_Opacity() {
    this.initialize.apply(this, arguments);
}
DebugVB_Opacity.prototype = Object.create(Sprite.prototype);
DebugVB_Opacity.prototype.constructor = DebugVB_Opacity;
DebugVB_Opacity.prototype.initialize = function(opacityRate) {
    Sprite.prototype.initialize.call(this);
    this._opacityRate = opacityRate;
    this.visible = false;
    this._touchX = null;
    this.createBitmap();
    this.createParts();
    this.drawRateText();
    const x = (Graphics.width - this.width) / 2;
    const y = (Graphics.height - this.height) / 2;
    this.move(x, y);
};
DebugVB_Opacity.prototype.createBitmap = function() {
    this.bitmap = new Bitmap(640, 64);
    this.bitmap.fillRoundRect(4,4,this.width-8,this.height-8,8,4,'Black','SlateGray');
    this.bitmap.fillRect(40, 30, 500, 4, 'Salmon');
};
DebugVB_Opacity.prototype.createParts = function() {
    this._cvs = new Sprite();
    this._piece = new Sprite();
    this._cvs.bitmap = new Bitmap(this.width, this.height);
    this._piece.bitmap = new Bitmap(30, 30);
    this._piece.bitmap.drawCircleGD(15, 15, 15, 0.4, 'Purple', 'rgb(180,180,180)');
    this.setupPiece();
    this.addChild(this._cvs);
    this.addChild(this._piece);
};
DebugVB_Opacity.prototype.setupPiece = function() {
    const x = 470 * this._opacityRate / 100 + 40;
    this._piece.move(x, 17);
};
DebugVB_Opacity.prototype.opacityRate = function() {
    return this._opacityRate / 100;
};
DebugVB_Opacity.prototype.drawRateText = function() {
    this._cvs.bitmap.clear();
    const text = ''+this._opacityRate+'%';
    this._cvs.bitmap.drawText(text, 0, 0, 620, 64, 'right');
};
DebugVB_Opacity.prototype.refreshOpacityRate = function() {
    this._opacityRate = Math.floor((this._piece.x - 40) / 470 * 100);
    this.drawRateText();
    this.parent.refreshKeymapsOpacity();
};
DebugVB_Opacity.prototype.isTouchPiece = function() {
    const touchPos = new Point(TouchInput.x, TouchInput.y);
    const localPos = this._piece.worldTransform.applyInverse(touchPos);
    const rect = new Rectangle(0,0,30,30);
    return rect.contains(localPos.x, localPos.y);
};
DebugVB_Opacity.prototype.isTouchBar = function() {
    const x = TouchInput.x, y = TouchInput.y;
    if (x < this.x + 40 || y < this.y + 17) return false;
    return x <= this.x + 540 && y <= this.y + 47;
};
DebugVB_Opacity.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.worldVisible && this.updateTouch();
};
DebugVB_Opacity.prototype.updateTouch = function() {
    const tmp = this._piece.x;
    if (this._touchX !== null) {
        if (TouchInput.isPressed()) {
            const x = TouchInput.x - this._touchX - this.x;
            this._piece.x = Math.max(40, Math.min(510, x));
        } else this._touchX = null;
    } else {
        if (TouchInput.isTriggered()) {
            if (this.isTouchPiece()) {
                this._touchX = TouchInput.x - this._piece.x - this.x;
            } else if (this.isTouchBar()) {
                const tx = TouchInput.x - this.x - 15;
                this._piece.x = Math.max(40, Math.min(510, tx));
            }
        }
    }
    tmp !== this._piece.x && this.refreshOpacityRate();
};
//==============================================================================================================
function Scene_DebugVB() {
    this.initialize.apply(this, arguments);
}
Scene_DebugVB.prototype = Object.create(Scene_Base.prototype);
Scene_DebugVB.prototype.constructor = Scene_DebugVB;
Scene_DebugVB.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
    this._debugMod = 'select';
    this._data = VB_Manager.getDebugData();
    this._imgData = VB_Manager.getDebugImgs();
    this._dataVisible = VB_Manager._isVisible;
    VB_Manager.changeVisible(false);
};
Scene_DebugVB.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    VB_Manager.changeVisible(this._dataVisible);
};
Scene_DebugVB.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createKeymaps();
    this.createOptWindow();
    this.createOpacityWindow();
};
Scene_DebugVB.prototype.createBackground = function() {
    const w = Graphics.width;
    const h = Graphics.height;
    const color = 'rgba(0,0,0,0.5)';
    const nw = w / 3 - 1, nh = h / 3 - 1;
    this._background = new Sprite();
    this._background.bitmap = new Bitmap(w, h);
    this._background.bitmap.fillAll('rgb(120,120,120)');
    this._background.bitmap.fillRect(0, nh, w, 3, color);
    this._background.bitmap.fillRect(nw, 0, 3, h, color);
    this._background.bitmap.fillRect(nw*2, 0, 3, h, color);
    this._background.bitmap.fillRect(0, nh*2, w, 3, color);
    this.addChild(this._background);
};
Scene_DebugVB.prototype.createKeymaps = function() {
    this._keymaps = {};
    const opacity = this._data.opacity * 255;
    Object.keys(this._imgData).forEach(name => {
        const data = this._imgData[name];
        this._keymaps[name] = new DebugVB_Keymap(data.x, data.y, data.bitmap, opacity);
        this.addChild(this._keymaps[name]);
    });
};
Scene_DebugVB.prototype.createOptWindow = function() {
    this._optWindow = new DebugVB_Window();
    this.addChild(this._optWindow);
};
Scene_DebugVB.prototype.createOpacityWindow = function() {
    this._opacityWindow = new DebugVB_Opacity(Math.floor(this._data.opacity * 100));
    this.addChild(this._opacityWindow);
};
Scene_DebugVB.prototype.debugMod = function() {
    return this._debugMod;
};
Scene_DebugVB.prototype.changeDebugMod = function(mod) {
    this._debugMod = mod;
    this._opacityWindow.visible = (mod === 'opacity');
};
Scene_DebugVB.prototype.refreshKeymapsOpacity = function() {
    const rate = this._opacityWindow.opacityRate();
    Object.keys(this._keymaps).forEach(name => {
        this._keymaps[name].setOpacity(rate);
    });
};
Scene_DebugVB.prototype.applyDebug = function() {
    this._data.opacity = this._opacityWindow.opacityRate();
    Object.keys(this._keymaps).forEach(name => {
        const sprite = this._keymaps[name];
        const point = new Point(sprite.x, sprite.y);
        this._data.buttons[name] = point;
    });
    VB_Manager.resetSaveData(this._data);
    this.popScene();
};
//==============================================================================================================
})(Utils.RPGMAKER_NAME === 'MZ');
//==============================================================================================================
// end
//==============================================================================================================