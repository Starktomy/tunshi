//=============================================================================
// Yanfly Engine Plugins - Battle Animation Speed Option
// YEP_BattleAniSpeedOpt.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_BattleAniSpeedOpt = true;

var Yanfly = Yanfly || {};
Yanfly.BASO = Yanfly.BASO || {};
Yanfly.BASO.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 战斗动画播放速度控制☁️
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 导言
 *  ============================================================================
 * 
 * 球员的舒适度是在比赛中要注意的一个主要问题
 * 现在设计电子游戏。RPG也不例外。在里面
 * 在RPG中，玩家通常大部分时间都在战斗中。
 * 在这一大部分时间里，玩家通常都在等待战斗
 * 完成播放的动画。
 * 
 * 这个插件增加了玩家选择速度的能力
 * 从选项菜单中播放的战斗动画。从默认值
 * 速度，即每四个真实帧播放一个动画帧，以最快的速度
 * 设置，每一个真实帧播放一个动画帧，播放器现在
 * 有权选择战斗中的进展速度。
 *
 * ============================================================================
 * 兼容性
 * ============================================================================
 *
 * This plugin is made compatible with the following plugins:
 * - YEP_BattleEngineCore
 * - YEP_X_ActSeqPack1
 * - YEP_X_ActSeqPack2
 * - YEP_X_ActSeqPack3
 *
 * 如果您正在使用列出的插件，请将此插件放在列出的
 * 插件管理器列表中的插件以获得最大的兼容性。这是为了
 * 确保动作序列与战斗动画正常工作
 * 速度选项。
 *
 * ============================================================================
 * 选项核心设置-添加新选项
 * ============================================================================
 *
 * If you are using YEP_OptionsCore.js, you can add a new Option using this
 * plugin. Here's the following code/parameter settings you can use with it.
 *
 * ---------
 * Settings:
 * ---------
 * 
 * Name:
 * \i[302]Battle Animation Speed
 *
 * Help Description:
 * Changes the speed of battle animations.
 *
 * Symbol:
 * battleAniSpeed
 *
 * Show/Hide:
 * show = Imported.YEP_BattleAniSpeedOpt;
 *
 * Enable:
 * enabled = true;
 *
 * Ext:
 * ext = 0;
 *
 * ----------
 * Functions:
 * ----------
 * 
 * Make Option Code:
 * this.addCommand(name, symbol, enabled, ext);
 *
 * Draw Option Code:
 * var rect = this.itemRectForText(index);
 * var statusWidth = this.statusWidth();
 * var quarterWidth = statusWidth / 4;
 * var titleWidth = rect.width - statusWidth;
 * this.resetTextColor();
 * this.changePaintOpacity(this.isCommandEnabled(index));
 * this.drawOptionsName(index);
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changePaintOpacity(value === 4);
 * var text = this.battleAnimationSpeedText(4);
 * this.drawText(text, titleWidth + quarterWidth * 0, rect.y, quarterWidth, 'center');
 * this.changePaintOpacity(value === 3);
 * var text = this.battleAnimationSpeedText(3);
 * this.drawText(text, titleWidth + quarterWidth * 1, rect.y, quarterWidth, 'center');
 * this.changePaintOpacity(value === 2);
 * var text = this.battleAnimationSpeedText(2);
 * this.drawText(text, titleWidth + quarterWidth * 2, rect.y, quarterWidth, 'center');
 * this.changePaintOpacity(value === 1);
 * var text = this.battleAnimationSpeedText(1);
 * this.drawText(text, titleWidth + quarterWidth * 3, rect.y, quarterWidth, 'center');
 *
 * Process OK Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * value -= 1;
 * if (value <= 0) value = 4;
 * value = value.clamp(1, 4);
 * this.changeValue(symbol, value);
 *
 * Cursor Right Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * value -= 1;
 * value = value.clamp(1, 4);
 * this.changeValue(symbol, value);
 * 
 * Cursor Left Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * value += 1;
 * value = value.clamp(1, 4);
 * this.changeValue(symbol, value);
 *
 * Default Config Code:
 * // Empty. Provided by this plugin.
 *
 * Save Config Code:
 * // Empty. Provided by this plugin.
 *
 * Load Config Code:
 * // Empty. Provided by this plugin.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Compatibility update with YEP_OptionsCore.js.
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param ---General---
 * @text ---全局---
 * @default
 *
 * @param Option Name
 * @text 选项名称
 * @parent ---General---
 * @desc 游戏中使用的选项命令文本.
 * @default 战斗动画
 *
 * @param Default Speed
 * @text 默认速度
 * @parent ---General---
 * @type number
 * @min 0
 * @desc 战斗动画使用的默认速度.
 * @default 4
 *
 * @param Affect Movement?
 * @text 影响运动？
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 你希望这会影响战斗者的移动速度吗?
 * @default true
 *
 * @param Affect Waiting?
 * @text 影响等待？
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 你希望这也影响角色动画等待和事件吗?
 * @default true
 *
 * @param ---Vocabulary---
 * @text ---词汇---
 * @default
 *
 * @param Speed 1
 * @text 速度1
 * @parent ---Vocabulary---
 * @desc 用于此速度的文本.
 * @default Fastest
 *
 * @param Speed 2
 * @text 速度2
 * @parent ---Vocabulary---
 * @desc 用于此速度的文本.
 * @default Faster
 *
 * @param Speed 3
 * @text 速度3
 * @parent ---Vocabulary---
 * @desc 用于此速度的文本.
 * @default Fast
 *
 * @param Speed 4
 * @text 速度4
 * @parent ---Vocabulary---
 * @desc 用于此速度的文本.
 * @default Full
 *
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_BattleAniSpeedOpt');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.BattleAniOptName = String(Yanfly.Parameters['Option Name']);
Yanfly.Param.BattleAniOptSpeed = Number(Yanfly.Parameters['Default Speed']);
Yanfly.Param.BattleAniOptMove = String(Yanfly.Parameters['Affect Movement?']);
Yanfly.Param.BattleAniOptMove = eval(Yanfly.Param.BattleAniOptMove);
Yanfly.Param.BattleAniOptWait = String(Yanfly.Parameters['Affect Waiting?']);
Yanfly.Param.BattleAniOptWait = eval(Yanfly.Param.BattleAniOptWait);

Yanfly.Param.BattleAniOptVocab = [];
Yanfly.Param.BattleAniOptVocab.push('None');
Yanfly.Param.BattleAniOptVocab.push(String(Yanfly.Parameters['Speed 1']));
Yanfly.Param.BattleAniOptVocab.push(String(Yanfly.Parameters['Speed 2']));
Yanfly.Param.BattleAniOptVocab.push(String(Yanfly.Parameters['Speed 3']));
Yanfly.Param.BattleAniOptVocab.push(String(Yanfly.Parameters['Speed 4']));

//=============================================================================
// MainCode
//=============================================================================

ConfigManager.battleAniSpeed = Yanfly.Param.BattleAniOptSpeed;

Yanfly.BASO.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    var config = Yanfly.BASO.ConfigManager_makeData.call(this);
    config.battleAniSpeed = this.battleAniSpeed;
    return config;
};

Yanfly.BASO.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    Yanfly.BASO.ConfigManager_applyData.call(this, config);
    this.battleAniSpeed = this.readConfigBattleAnimationSpeed(config,
      'battleAniSpeed');
};

ConfigManager.readConfigBattleAnimationSpeed = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        return Yanfly.Param.BattleAniOptSpeed;
    }
};

//=============================================================================
// Sprite_Animation
//=============================================================================

Yanfly.BASO.Sprite_Animation_setupRate = Sprite_Animation.prototype.setupRate;
Sprite_Animation.prototype.setupRate = function() {
  if ($gameParty.inBattle()) {
    this._rate = ConfigManager.battleAniSpeed;
  } else {
    Yanfly.BASO.Sprite_Animation_setupRate.call(this);
  }
};

//=============================================================================
// Sprite_Battler
//=============================================================================

if (Yanfly.Param.BattleAniOptMove) {

Yanfly.BASO.Sprite_Battler_startMove = Sprite_Battler.prototype.startMove;
Sprite_Battler.prototype.startMove = function(x, y, duration) {
  var modifier = 5 - ConfigManager.battleAniSpeed;
  duration = Math.ceil(duration / modifier);
  Yanfly.BASO.Sprite_Battler_startMove.call(this, x, y, duration);
};

}; // Yanfly.Param.BattleAniOptMove


//=============================================================================
// Window_Options
//=============================================================================

Yanfly.BASO.Window_Options_addVolumeOptions =
  Window_Options.prototype.addVolumeOptions;
Window_Options.prototype.addVolumeOptions = function() {
  if (!Imported.YEP_OptionsCore) this.addBattleAnimationSpeedOptions();
  Yanfly.BASO.Window_Options_addVolumeOptions.call(this);
};

Window_Options.prototype.addBattleAnimationSpeedOptions = function() {
  var text = Yanfly.Param.BattleAniOptName;
  this.addCommand(text, 'battleAniSpeed');
};

Yanfly.BASO.Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
  var symbol = this.commandSymbol(index);
  if (symbol === 'battleAniSpeed') {
    var value = this.getConfigValue(symbol);
    return this.battleAnimationSpeedText(value);
  } else {
    return Yanfly.BASO.Window_Options_statusText.call(this, index);
  }
};

Window_Options.prototype.battleAnimationSpeedText = function(value) {
  return Yanfly.Param.BattleAniOptVocab[value] || '';
};

if (!Imported.YEP_OptionsCore) {

Yanfly.BASO.Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
  var index = this.index();
  var symbol = this.commandSymbol(index);
  if (symbol === 'battleAniSpeed') {
    var value = this.getConfigValue(symbol);
    value += 1;
    if (value > 4) value = 1;
    value = value.clamp(1, 4);
    this.changeValue(symbol, value);
  } else {
    Yanfly.BASO.Window_Options_processOk.call(this);
  }
};

Yanfly.BASO.Window_Options_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function(wrap) {
  var index = this.index();
  var symbol = this.commandSymbol(index);
  if (symbol === 'battleAniSpeed') {
    var value = this.getConfigValue(symbol);
    value += 1;
    value = value.clamp(1, 4);
    this.changeValue(symbol, value);
  } else {
    Yanfly.BASO.Window_Options_cursorRight.call(this, wrap);
  }
};

Yanfly.BASO.Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function(wrap) {
  var index = this.index();
  var symbol = this.commandSymbol(index);
  if (symbol === 'battleAniSpeed') {
    var value = this.getConfigValue(symbol);
    value -= 1;
    value = value.clamp(1, 4);
    this.changeValue(symbol, value);
  } else {
    Yanfly.BASO.Window_Options_cursorLeft.call(this, wrap);
  }
};

}; // Imported.YEP_OptionsCore


//=============================================================================
// Compatibility Additions
//=============================================================================

//=============================================================================
// BattleManager
//=============================================================================

BattleManager.actionAniWait = function(frames) {
  frames *= ConfigManager.battleAniSpeed || 4;
  this._logWindow._waitCount = parseInt(frames);
  return false;
};

if (Yanfly.Param.BattleAniOptWait) {

BattleManager.actionWait = function(frames) {
  var modifier = 5 - ConfigManager.battleAniSpeed;
  frames = Math.ceil(frames / modifier);
  this._logWindow._waitCount = parseInt(frames);
  return false;
};

if (Imported.YEP_X_ActSeqPack2) {

BattleManager.actionFadeScreen = function(actionName, actionArgs) {
  var frames = actionArgs[0] || 60;
  var modifier = 5 - ConfigManager.battleAniSpeed;
  frames = Math.ceil(frames / modifier);
  if (actionName === 'FADE IN') {
    $gameScreen.startFadeIn(frames);
  } else if (actionName === 'FADE OUT') {
    $gameScreen.startFadeOut(frames);
  }
  return false;
};

BattleManager.actionFlashScreen = function(actionArgs) {
  if (actionArgs[0].toUpperCase() === 'WHITE') {
    var flash = [255, 255, 255, 255];
    var frames = actionArgs[1] || 60;
  } else if (actionArgs[0].toUpperCase() === 'RED') {
    var flash = [255, 0, 0, 255];
    var frames = actionArgs[1] || 60;
  } else if (actionArgs[0].toUpperCase() === 'ORANGE') {
    var flash = [255, 128, 0, 255];
    var frames = actionArgs[1] || 60;
  } else if (actionArgs[0].toUpperCase() === 'YELLOW') {
    var flash = [255, 255, 0, 255];
    var frames = actionArgs[1] || 60;
  } else if (actionArgs[0].toUpperCase() === 'GREEN') {
    var flash = [0, 255, 0, 255];
    var frames = actionArgs[1] || 60;
  } else if (actionArgs[0].toUpperCase() === 'BLUE') {
    var flash = [0, 128, 255, 255];
    var frames = actionArgs[1] || 60;
  } else if (actionArgs[0].toUpperCase() === 'PURPLE') {
    var flash = [128, 64, 255, 255];
    var frames = actionArgs[1] || 60;
  } else if (actionArgs[0].toUpperCase() === 'MAGENTA') {
    var flash = [255, 0, 255, 255];
    var frames = actionArgs[1] || 60;
  } else if (actionArgs[0].toUpperCase() === 'BLACK') {
    var flash = [0, 0, 0, 255];
    var frames = actionArgs[1] || 60;
  } else {
    var red = actionArgs[0] || 0;
    var green = actionArgs[1] || 0;
    var blue = actionArgs[2] || 0;
    var intensity = actionArgs[3] || 0;
    var frames = actionArgs[4] || 60;
    var modifier = 5 - ConfigManager.battleAniSpeed;
    frames = Math.ceil(frames / modifier);
    var flash = [parseInt(red), parseInt(green),
        parseInt(blue), parseInt(intensity)];
  }
  $gameScreen.startFlash(flash, frames);
  return false;
};

BattleManager.actionFloat = function(name, actionArgs) {
  var movers = this.makeActionTargets(name);
  if (movers.length < 1) return true;
  var cmd = actionArgs[0];
  var frames = actionArgs[1] || 12;
  var modifier = 5 - ConfigManager.battleAniSpeed;
  frames = Math.ceil(frames / modifier);
  var pixels = 0;
  if (cmd.match(/(\d+)([%％])/i)) {
    var floatPeak = parseFloat(RegExp.$1 * 0.01);
  } else if (cmd.match(/(\d+)/i)) {
    pixels = parseInt(RegExp.$1);
    var floatPeak = 0.0;
  } else {
    var floatPeak = 1.0;
  }
  movers.forEach(function(mover) {
    var floatRate = floatPeak + (pixels / mover.spriteHeight());
    mover.spriteFloat(floatRate, frames);
  });
  return false;
};

BattleManager.actionJump = function(name, actionArgs) {
  var movers = this.makeActionTargets(name);
  if (movers.length < 1) return true;
  var cmd = actionArgs[0];
  var frames = actionArgs[1] || 12;
  var modifier = 5 - ConfigManager.battleAniSpeed;
  frames = Math.ceil(frames / modifier);
  var pixels = 0;
  if (cmd.match(/(\d+)([%％])/i)) {
    var jumpPeak = parseFloat(RegExp.$1 * 0.01);
  } else if (cmd.match(/(\d+)/i)) {
    pixels = parseInt(RegExp.$1);
    var jumpPeak = 0.0;
  } else {
    var jumpPeak = 1.0;
  }
  movers.forEach(function(mover) {
    var jumpRate = jumpPeak + (pixels / mover.spriteHeight());
    mover.spriteJump(jumpRate, frames);
  });
  return true;
};

BattleManager.actionOpacity = function(name, actionArgs) {
  var targets = this.makeActionTargets(name);
  if (targets.length < 1) return true;
  var cmd = actionArgs[0];
  var frames = actionArgs[1] || 12;
  var modifier = 5 - ConfigManager.battleAniSpeed;
  frames = Math.ceil(frames / modifier);
  if (cmd.match(/(\d+)([%％])/i)) {
    var opacity = parseInt(RegExp.$1 * 0.01 * 255).clamp(0, 255);
  } else if (cmd.match(/(\d+)/i)) {
    var opacity = parseInt(RegExp.$1);
  } else {
    return false;
  }
  targets.forEach(function(target) {
    target.spriteOpacity(opacity, frames);
  });
  return false;
};

BattleManager.actionTintScreen = function(actionArgs) {
  if (actionArgs[0].toUpperCase() === 'NORMAL') {
    var tint = [0, 0, 0, 0];
    var frames = actionArgs[1] || 60;
  } else if (actionArgs[0].toUpperCase() === 'DARK') {
    var tint = [-68, -68, -68, 0];
    var frames = actionArgs[1] || 60;
  } else if (actionArgs[0].toUpperCase() === 'SEPIA') {
    var tint = [34, -34, -68, 170];
    var frames = actionArgs[1] || 60;
  } else if (actionArgs[0].toUpperCase() === 'SUNSET') {
    var tint = [68, -34, -34, 0];
    var frames = actionArgs[1] || 60;
  } else if (actionArgs[0].toUpperCase() === 'NIGHT') {
    var tint = [68, -68, 0, 68];
    var frames = actionArgs[1] || 60;
  } else {
    var red = actionArgs[0] || 0;
    var green = actionArgs[1] || 0;
    var blue = actionArgs[2] || 0;
    var gray = actionArgs[3] || 0;
    var frames = actionArgs[4] || 60;
    var modifier = 5 - ConfigManager.battleAniSpeed;
    frames = Math.ceil(frames / modifier);
    var tint = [parseInt(red), parseInt(green),
        parseInt(blue), parseInt(gray)];
  }
  $gameScreen.startTint(tint, frames);
  return false;
};

BattleManager.actionShakeScreen = function(actionArgs) {
  var power = actionArgs[0] || 5;
  var speed = actionArgs[1] || 5;
  var frames = actionArgs[2] || 60;
  var modifier = 5 - ConfigManager.battleAniSpeed;
  frames = Math.ceil(frames / modifier);
  $gameScreen.startShake(parseInt(power), parseInt(speed), parseInt(frames));
  return false;
};

}; // Imported.YEP_X_ActSeqPack2

if (Imported.YEP_X_ActSeqPack3) {

BattleManager.actionCameraFocus = function(actionArgs) {
  if (!ConfigManager.battleCamera) return true;
  this._cameraFocusGroup = this.makeActionTargets(actionArgs[0]);
  if (this._cameraFocusGroup.length < 1) return false;
  var type = (actionArgs[1]) ? actionArgs[1].toUpperCase() : 'CENTER';
  var frames = actionArgs[2] || 30;
  var modifier = 5 - ConfigManager.battleAniSpeed;
  frames = Math.ceil(frames / modifier);
  if (['FRONT BASE', 'FRONT FOOT', 'FRONT FEET'].contains(type)) {
    this._cameraFocusPosX = 'FRONT';
    this._cameraFocusPosY = 'BASE';
  } else if (['BASE', 'FOOT', 'FEET'].contains(type)) {
    this._cameraFocusPosX = 'MIDDLE';
    this._cameraFocusPosY = 'BASE';
  } else if (['BACK BASE', 'BACK FOOT', 'BACK FEET'].contains(type)) {
    this._cameraFocusPosX = 'BACK';
    this._cameraFocusPosY = 'BASE';
  } else if (['FRONT CENTER', 'FRONT MIDDLE', 'FRONT'].contains(type)) {
    this._cameraFocusPosX = 'FRONT';
    this._cameraFocusPosY = 'MIDDLE';
  } else if (['CENTER', 'MIDDLE'].contains(type)) {
    this._cameraFocusPosX = 'MIDDLE';
    this._cameraFocusPosY = 'MIDDLE';
  } else if (['BACK CENTER', 'BACK MIDDLE', 'BACK'].contains(type)) {
    this._cameraFocusPosX = 'BACK';
    this._cameraFocusPosY = 'MIDDLE';
  } else if (['FRONT HEAD', 'FRONT TOP'].contains(type)) {
    this._cameraFocusPosX = 'FRONT';
    this._cameraFocusPosY = 'TOP';
  } else if (['HEAD', 'TOP'].contains(type)) {
    this._cameraFocusPosX = 'MIDDLE';
    this._cameraFocusPosY = 'TOP';
  } else if (['BACK HEAD', 'BACK TOP'].contains(type)) {
    this._cameraFocusPosX = 'BACK';
    this._cameraFocusPosY = 'TOP';
  } else {
    this._cameraFocusPosX = 'MIDDLE';
    this._cameraFocusPosY = 'MIDDLE';
  }
  $gameScreen.setCameraDuration(frames)
  return true;
};

BattleManager.actionCameraPan = function(actionArgs) {
  if (!ConfigManager.battleCamera) return true;
  var cmd = actionArgs[0].toUpperCase();
  var frames = 30;
  var modifier = 5 - ConfigManager.battleAniSpeed;
  frames = Math.ceil(frames / modifier);
  if (['LEFT'].contains(cmd)) {
    this._cameraX -= eval(actionArgs[1]) || 100;;
    frames = actionArgs[2] || 30;
  } else if (['RIGHT'].contains(cmd)) {
    this._cameraX += eval(actionArgs[1]) || 100;;
    frames = actionArgs[2] || 30;
  } else if (['UP'].contains(cmd)) {
    this._cameraY -= eval(actionArgs[1]) || 100;;
    frames = actionArgs[2] || 30;
  } else if (['DOWN'].contains(cmd)) {
    this._cameraY += eval(actionArgs[1]) || 100;;
    frames = actionArgs[2] || 30;
  }
  $gameScreen.setCameraDuration(frames)
  return true;
};

BattleManager.actionCameraScreen = function(actionArgs) {
  if (!ConfigManager.battleCamera) return true;
  var cmd = actionArgs[0].toUpperCase();
  var frames = 30;
  var modifier = 5 - ConfigManager.battleAniSpeed;
  frames = Math.ceil(frames / modifier);
  if (['TOP LEFT', 'UPPER LEFT'].contains(cmd)) {
    this._cameraX = 0;
    this._cameraY = 0;
    frames = actionArgs[1] || 30;
  } else if (['FAR LEFT', 'ABSOLUTE LEFT'].contains(cmd)) {
    this._cameraX = 0;
    this._cameraY = Graphics.boxHeight / 2;
    frames = actionArgs[1] || 30;
  } else if (['BOTTOM LEFT', 'LOWER LEFT'].contains(cmd)) {
    this._cameraX = 0;
    this._cameraY = Graphics.boxHeight;
    frames = actionArgs[1] || 30;
  } else if (['TOP CENTER', 'UPPER CENTER'].contains(cmd)) {
    this._cameraX = Graphics.boxWidth / 2;
    this._cameraY = 0;
    frames = actionArgs[1] || 30;
  } else if (['CENTER', 'MIDDLE'].contains(cmd)) {
    this._cameraX = Graphics.boxWidth / 2;
    this._cameraY = Graphics.boxHeight / 2;
    frames = actionArgs[1] || 30;
  } else if (['BOTTOM CENTER', 'LOWER CENTER'].contains(cmd)) {
    this._cameraX = Graphics.boxWidth / 2;
    this._cameraY = Graphics.boxHeight;
    frames = actionArgs[1] || 30;
  } else if (['TOP RIGHT', 'UPPER RIGHT'].contains(cmd)) {
    this._cameraX = Graphics.boxWidth;
    this._cameraY = 0;
    frames = actionArgs[1] || 30;
  } else if (['FAR RIGHT', 'ABSOLUTE RIGHT'].contains(cmd)) {
    this._cameraX = Graphics.boxWidth;
    this._cameraY = Graphics.boxHeight / 2;
    frames = actionArgs[1] || 30;
  } else if (['BOTTOM RIGHT', 'LOWER RIGHT'].contains(cmd)) {
    this._cameraX = Graphics.boxWidth;
    this._cameraY = Graphics.boxHeight;
    frames = actionArgs[1] || 30;
  } else if (['POINT', 'POSITION', 'COORDINATE', 'SCREEN', 'SCREEN POS',
  'COORDINATES'].contains(cmd)) {
    this._cameraX = eval(actionArgs[1]) || 0;
    this._cameraY = eval(actionArgs[2]) || 0;
    frames = actionArgs[3] || 30;
  } else {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return false;
    var type = actionArgs[1].toUpperCase();
    var frames = actionArgs[2] || 30;
    if (['FRONT BASE', 'FRONT FOOT', 'FRONT FEET',
    'FRONT'].contains(type)) {
      this._cameraX = this.targetPosX(targets, 'FRONT');
      this._cameraY = this.targetPosY(targets, 'BASE');
    } else if (['BASE', 'FOOT', 'FEET'].contains(type)) {
      this._cameraX = this.targetPosX(targets, 'MIDDLE');
      this._cameraY = this.targetPosY(targets, 'BASE');
    } else if (['BACK BASE', 'BACK FOOT', 'BACK FEET',
    'BACK'].contains(type)) {
      this._cameraX = this.targetPosX(targets, 'BACK');
      this._cameraY = this.targetPosY(targets, 'BASE');
    } else if (['FRONT CENTER', 'FRONT MIDDLE'].contains(type)) {
      this._cameraX = this.targetPosX(targets, 'FRONT');
      this._cameraY = this.targetPosY(targets, 'MIDDLE');
    } else if (['CENTER', 'MIDDLE'].contains(type)) {
      this._cameraX = this.targetPosX(targets, 'MIDDLE');
      this._cameraY = this.targetPosY(targets, 'MIDDLE');
    } else if (['BACK CENTER', 'BACK MIDDLE',].contains(type)) {
      this._cameraX = this.targetPosX(targets, 'BACK');
      this._cameraY = this.targetPosY(targets, 'MIDDLE');
    } else if (['FRONT HEAD', 'FRONT TOP'].contains(type)) {
      this._cameraX = this.targetPosX(targets, 'FRONT');
      this._cameraY = this.targetPosY(targets, 'TOP');
    } else if (['HEAD', 'TOP'].contains(type)) {
      this._cameraX = this.targetPosX(targets, 'MIDDLE');
      this._cameraY = this.targetPosY(targets, 'TOP');
    } else if (['BACK HEAD', 'BACK TOP'].contains(type)) {
      this._cameraX = this.targetPosX(targets, 'BACK');
      this._cameraY = this.targetPosY(targets, 'TOP');
    } else {
      return true;
    }
  }
  $gameScreen.setCameraDuration(frames)
  return true;
};

}; // Imported.YEP_X_ActSeqPack3

}; // Yanfly.Param.BattleAniOptWait

//=============================================================================
// End of File
//=============================================================================