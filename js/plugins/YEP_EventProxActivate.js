//=============================================================================
// Yanfly Engine Plugins - Event Proximity Activate
// YEP_EventProxActivate.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventProxActivate = true;

var Yanfly = Yanfly || {};
Yanfly.EvPrAc = Yanfly.EvPrAc || {};
Yanfly.EvPrAc.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 事件区域范围激活(已翻译)
 * @author Yanfly Engine Plugins
 *
 * @help
 * 插件更新:yanfly.moe/plugins/en/YEP_EventProxActivate.js
 * 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
 * 事件注释:
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * 以事件为中心的方形区域都可以激活该事件,x替换为方形区域范围
 * <Activation Square: x>
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 以事件为中心的半径区域都可以激活该事件,x替换为半径区域范围
 * <Activation Radius: x>
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 以事件为中心的一整行区域都可以激活该事件,x替换为行的高度
 * <Activation Row: x>
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 以事件为中心的一整列区域都可以激活该事件,x替换为列的宽度
 * <Activation Column: x>
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * ※注意:如果设置了事件激活范围,自动执行和并行处理的方式更改为角色处于事
 * 件的激活范围内运行,而不是事件出现直接运行
 */
//=============================================================================

//=============================================================================
// Game_CharacterBase
//=============================================================================

Yanfly.EvPrAc.Game_CharacterBase_increaseSteps =
  Game_CharacterBase.prototype.increaseSteps;
Game_CharacterBase.prototype.increaseSteps = function() {
  Yanfly.EvPrAc.Game_CharacterBase_increaseSteps.call(this);
  this.eventProximityIncreaseSteps();
};

Game_CharacterBase.prototype.eventProximityIncreaseSteps = function() {
};

//=============================================================================
// Game_Player
//=============================================================================

Yanfly.EvPrAc.Game_Player_startMapEvent = Game_Player.prototype.startMapEvent;
Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {
  Yanfly.EvPrAc.Game_Player_startMapEvent.call(this, x, y, triggers, normal);
  if (!$gameMap.isEventRunning() && !$gameMap.isAnyEventStarting()) {
    this.startProximityEvent(triggers, normal);
  }
};

Game_Player.prototype.startProximityEvent = function(triggers, normal) {
  var events = $gameMap.events();
  var length = events.length;
  for (var i = 0; i < length; ++i) {
    var ev = events[i];
    if (!ev) continue;
    if (!ev.isTriggerIn(triggers)) continue;
    if (!ev._activationType || ev._activationType === 'none') continue;
    if (this.meetPlayerProximityConditions(ev)) ev.start();
  }
};

Game_Player.prototype.meetPlayerProximityConditions = function(ev) {
  if (ev._activationType === 'radius') {
    var x1 = this.x;
    var y1 = this.y;
    var x2 = ev.x;
    var y2 = ev.y;
    var radius = $gameMap.distance(x1, y1, x2, y2);
    return ev._activationDist >= radius
  } else if (ev._activationType === 'square') {
    return ev._activationDist >= Math.abs(ev.deltaXFrom(this.x)) &&
           ev._activationDist >= Math.abs(ev.deltaYFrom(this.y));
  } else if (ev._activationType === 'row') {
    return ev._activationDist >= Math.abs(ev.deltaYFrom(this.y));
  } else if (ev._activationType === 'column') {
    return ev._activationDist >= Math.abs(ev.deltaXFrom(this.x));
  } else {
    return false;
  }
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.EvPrAc.Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
  this._initialAutoTriggerBypass = true;
  Yanfly.EvPrAc.Game_Event_setupPage.call(this);
  this._initialAutoTriggerBypass = false;
  this.setupEventProximitySettings();
};

Game_Event.prototype.setupEventProximitySettings = function() {
  this.initEventProximitySettings();
  this.setupEventProximityCommentTags();
};

Game_Event.prototype.initEventProximitySettings = function() {
  this._activationDist = 0;
  this._activationType = 'none';
};

Game_Event.prototype.setupEventProximityCommentTags = function() {
  if (!this.page()) return;
  var note1 = /<ACTIVATION SQUARE: (\d+)>/i;
  var note2 = /<ACTIVATION (?:RADIUS|PROXIMITY): (\d+)>/i;
  var note3 = /<ACTIVATION (?:ROW|X|HORIZONTAL): (\d+)>/i;
  var note4 = /<ACTIVATION (?:COLUMN|Y|VERTICAL): (\d+)>/i;
  var list = this.list();
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var ev = list[i];
    if ([108, 408].contains(ev.code)) {
      if (ev.parameters[0].match(note1)) {
        this._activationDist = parseInt(RegExp.$1);
        this._activationType = 'square';
      } else if (ev.parameters[0].match(note2)) {
        this._activationDist = parseInt(RegExp.$1);
        this._activationType = 'radius';
      } else if (ev.parameters[0].match(note3)) {
        this._activationDist = parseInt(RegExp.$1);
        this._activationType = 'row';
      } else if (ev.parameters[0].match(note4)) {
        this._activationDist = parseInt(RegExp.$1);
        this._activationType = 'column';
      }
    }
  }
};

Game_Event.prototype.eventProximityIncreaseSteps = function() {
  if (!$gameMap.isEventRunning() && !$gameMap.isAnyEventStarting()) {
    $gamePlayer.startProximityEvent([2], this.isNormalPriority());
  }
};

Yanfly.EvPrAc.Game_Event_checkEventTriggerAuto =
  Game_Event.prototype.checkEventTriggerAuto;
Game_Event.prototype.checkEventTriggerAuto = function() {
  if (this._trigger !== 3) return;
  if (this._initialAutoTriggerBypass) return;
  if (!this.meetEventProximityConditions(false)) return;
  Yanfly.EvPrAc.Game_Event_checkEventTriggerAuto.call(this);
};

Yanfly.EvPrAc.Game_Event_updateParallel = Game_Event.prototype.updateParallel;
Game_Event.prototype.updateParallel = function() {
  if (!this._interpreter) return;
  if (!this.meetEventProximityConditions(true)) return;
  Yanfly.EvPrAc.Game_Event_updateParallel.call(this);
};

Game_Event.prototype.meetEventProximityConditions = function(parallel) {
  if (!parallel && $gameMap.isEventRunning()) return false;
  if (!parallel && $gameMap.isAnyEventStarting()) return false;
  if (!this._activationType || this._activationType === 'none') return true;
  return $gamePlayer.meetPlayerProximityConditions(this);
};

//=============================================================================
// End of File
//=============================================================================