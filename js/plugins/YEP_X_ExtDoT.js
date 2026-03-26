//=============================================================================
// Yanfly引擎插件-增益和状态扩展-随时间延长的伤害
// YEP_X_ExtDoT.js
//=============================================================================

if (Imported.YEP_BattleEngineCore && Imported.YEP_BuffsStatesCore) {

var Imported = Imported || {};
Imported.YEP_X_ExtDoT = true;

var Yanfly = Yanfly || {};
Yanfly.EDoT = Yanfly.EDoT || {};
Yanfly.EDoT.version = 1.04;

//=============================================================================
 /*:
 * @plugindesc v1.04 (Req YEP_BattleEngineCore & YEP_BuffsStatesCore)
 * Create custom DoT formulas and effects with ease.
 * @author Yanfly Engine Plugins + Tigress Collaboration
 *
 * @param ---Defaults---
 * @default
 *
 * @param Regen Animation
 * @parent ---Defaults---
 * @type animation
 * @desc 创建再生状态时，这将是默认动画。
 * 保持0不播放动画。
 * @default 46
 *
 * @param DoT Animation
 * @type animation
 * @desc desc创建圆点状态时，这将是默认动画。
 * 保持0不播放动画。
 * @default 59
 *
 * @param Default Variance
 * @type number
 * @desc 这是扩展圆点公式的默认方差值。
 * 保持0不变。
 * @default 20
 *
 * @param Default Element
 * @type number
 * @desc 这是用于扩展圆点公式的默认元素。
 * 保留为0表示无元素。
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 此插件需要YEP\u BattleEngineCore和YEP\u BuffsStatesCore。
 * 确保此插件位于插件列表中YEP\u BattleEngineCore和YEP\u BuffsStatesCore下。
 *
 * RPG制造者MV不提供使用自定义公式来处理任何伤害或治疗的能力。
 * 这个插件，通过Yanfly的Buffs&States核心的帮助，
 * 将允许使用公式来创建自定义的伤害或治疗随时间变化的值，
 * 动画，方差控制和基本速率方面。
 *
 * 这是一个由Tigress和Yanfly合作的插件，以确保与Yanfly引擎插件库兼容。
 *
 * ============================================================================
 * 便签
 * ============================================================================
 *
 * 在你的状态中插入以下注释标签，以实现它们各自随时间的损害效果。
 *
 * 状态注释标签：
 *
 *    ---
 *
 *   <Regen Animation: x>
 *   <DoT Animation: x>
 *   - 这将使状态播放动画x，以在一段时间内恢复/伤害，
 *   如果通过下面使用的延长伤害随时间公式造成任何治疗或伤害。
 *
 *   示例：
 *     <Regen Animation: 41>  // 发生重生状态时播放动画41
 *     <DoT Animation: 59>    // 发生圆点状态时播放动画59
 *
 *   * 注意：仅当与以下公式之一一起使用且公式不产生0值时，才会出现动画。
 *
 *   ---
 *
 *   <Regen Formula: x>
 *   - 这将使受影响的战斗者每回合回复x点生命。
 *   可以使用公式或数值代替“x”。
 *
 *   示例：
 *     <Regen Formula: 100>        // 每回合精确回复100气血
 *     <Regen Formula: a.mdf * 2>  // 重新生成等于原点mdf的HP
 *
 *   ---
 *
 *   <DoT Formula: x>
 *   - 这将使受影响的战斗者每回合受到x点生命伤害。可以使用公式或数值代替“x”。
 *
 *   示例：
 *     <DoT Formula: 100>        // 每回合精确伤害100点气血
 *     <DoT Formula: a.mat * 2>  // 伤害血量等于原点的mat
 *
 *   ---
 *
 *   <Regen Element: x>
 *   <DoT Element: x>
 *   - 这将使此状态造成的治疗/伤害成为元素“x”。
 *   这将考虑目标对该元素的元素速率。如果留空，则不存在元素修饰符。
 *
 *   示例：
 *     <Regen Element: 4>   // 完成的治疗将受到Element 4的影响。
 *     <DoT Element: 5>     // 造成的伤害将受到Element 5的影响。
 *
 *   ---
 *
 *   <Regen Variance: x%>
 *   <DoT Variance: x%>
 *   - 您希望圆点效果具有的方差量。用百分比值替换x。
 *   如果留空，默认情况下将使用插件参数中的设置。
 *
 *   示例：
 *     <Regen Variance: 10%>   // 再生将有10%的治疗方差
 *     <DoT Variance: 20%>     // 圆点将有20%的伤害方差
 *
 * ============================================================================
 * 疯狂模式-自定义点公式
 * ============================================================================
 *
 * 对于那些有JavaScript经验并希望创建更复杂的公式来定制随时间变化的损伤/
 * 愈合状态的人，您可以使用下面的注释标签。
 *
 * 状态注释标签：
 *
 *   ---
 *
 *   <Custom DoT Formula>
 *    if (a.isActor()) {
 *      value = a.level * 100;
 *      variance = 20;
 *      element = 1;
 *    } else {
 *      value = a.hp / 50;
 *      variance = 10;
 *      element = 2;
 *    }
 *   </Custom DoT Formula>
 *   - 造成的损失将等于“value”。这是主要由公式单独造成的基础伤害。
 *   要处理的最终损坏将受到“variance”和“element”值的影响，这些值
 *   也可以在此公式中更改。如果公式中没有“variance”或“element”，
 *   它们将采用默认值。如果你要做一个治疗效果，使用下面这个笔记标签。
 *
 *   ---
 *
 *   <Custom Regen Formula>
 *    if (a.isActor()) {
 *      value = a.level * 8;
 *      variance = 15;
 *      element = 3;
 *    } else {
 *      value = a.hp / 2;
 *      variance = 5;
 *      element = 4;
 *    }
 *   </Custom Regen Formula>
 *   - 要处理的治疗将等于“value”。这是基本治疗主要由公式单独处理。
 *   要处理的最终修复将受到“variance”和“element”值的影响，这些值
 *   也可以在此公式中更改。如果公式中没有“variance”或“element”，
 *   它们将采用默认值。如果你想造成破坏性的影响，用这个上面的标签。
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.04:
 * - 当由于更新到MV 1.6.1而将错误代码插入脚本调用或自定义疯狂模式代码段时，
 * 绕过isDevToolsOpen（）错误。
 *
 * Version 1.03:
 * - 为RPG Maker MV版本1.6.1更新。
 *
 * Version 1.02:
 * - 使点效果只为防止错误和崩溃而战斗。
 *
 * Version 1.01:
 * - 为RPG Maker MV 1.5.0版更新。
 *
 * Version 1.00:
 * - 插件完成！
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ExtDoT');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.EDoTRegenAni = Number(Yanfly.Parameters['Regen Animation']);
Yanfly.Param.EDoTDamageAni = Number(Yanfly.Parameters['DoT Animation']);
Yanfly.Param.EDoTDefVariance = Number(Yanfly.Parameters['Default Variance']);
Yanfly.Param.EDoTDefElement = Number(Yanfly.Parameters['Default Element']);

//=============================================================================
// DataManager
// ----------------------------------------------------------------------------
// Notetags added by Yanfly
//=============================================================================

Yanfly.EDoT.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.EDoT.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_ExtDoT) {
    this.processEDoTNotetags1($dataStates);
    Yanfly._loaded_YEP_X_ExtDoT = true;
  }
  
  return true;
};

DataManager.processEDoTNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.dotAnimation = 0;
    obj.dotElement = Yanfly.Param.EDoTDefElement;
    obj.dotVariance = Yanfly.Param.EDoTDefVariance;
    var evalMode = 'none';
    obj.dotFormula = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:REGEN|DOT) ANIMATION:[ ](\d+)>/i)) {
        obj.dotAnimation = parseInt(RegExp.$1);
      } else if (line.match(/<(?:REGEN|REGENERATE) FORMULA:[ ](.*)>/i)) {
        var formula = String(RegExp.$1);
        obj.dotFormula = 'value = Math.max(0, ' + formula + ');\n';
        obj.dotFormula += 'healing = true;'
        if (obj.dotAnimation === 0) {
          obj.dotAnimation = Yanfly.Param.EDoTRegenAni;
        }
      } else if (line.match(/<(?:DOT|DAMAGE OVER TIME) FORMULA:[ ](.*)>/i)) {
        var formula = String(RegExp.$1);
        obj.dotFormula = 'value = Math.max(0, ' + formula + ');\n';
        obj.dotFormula += 'healing = false;'
        if (obj.dotAnimation === 0) {
          obj.dotAnimation = Yanfly.Param.EDoTDamageAni;
        }
      } else if (line.match(/<(?:REGEN|DOT) VARIANCE:[ ](\d+)([%％])>/i)) {
        obj.dotVariance = parseInt(RegExp.$1);
      } else if (line.match(/<(?:REGEN|DOT) ELEMENT:[ ](\d+)>/i)) {
        obj.dotElement = parseInt(RegExp.$1);
      } else if (line.match(/<(?:CUSTOM REGEN FORMULA)>/i)) {
        evalMode = 'custom dot formula';
      } else if (line.match(/<\/(?:CUSTOM REGEN FORMULA)>/i)) {
        obj.dotFormula += 'healing = true';
        evalMode = 'none';
      } else if (line.match(/<(?:CUSTOM DOT FORMULA)>/i)) {
        evalMode = 'custom dot formula';
      } else if (line.match(/<\/(?:CUSTOM DOT FORMULA)>/i)) {
        obj.dotFormula += 'healing = false';
        evalMode = 'none';
      } else if (evalMode === 'custom dot formula') {
        obj.dotFormula += line + '\n';
      }
    }
  }
};

//=============================================================================
// Game_Battler
// ----------------------------------------------------------------------------
// Compatibility with YEP_BuffsStatesCore
//=============================================================================

Yanfly.EDoT.Game_Battler_regenerateAll = Game_Battler.prototype.regenerateAll;
Game_Battler.prototype.regenerateAll = function() {
  if (this.isAlive() && $gameParty.inBattle()) {
    this.processDamageOverTimeStates();
  }
  Yanfly.EDoT.Game_Battler_regenerateAll.call(this);
};

Game_Battler.prototype.processDamageOverTimeStates = function() {
  if (!$gameParty.inBattle()) return;
  var result = JsonEx.makeDeepCopy(this._result);
  var states = this.states();
  while (states.length > 0) {
    var state = states.shift();
    if (state) {
      this.processDamageOverTimeStateEffect(state);
    }
  }
  this._result = result;
};

Game_Battler.prototype.processDamageOverTimeStateEffect = function(state) {
  var stateId = state.id;
  var state = $dataStates[stateId];
  if (!state) return;
  if (state.dotFormula === '') return;
  var a = this.stateOrigin(stateId);
  var b = this;
  var user = this;
  var target = this;
  var origin = this.stateOrigin(stateId);
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var healing = false;
  var variance = state.dotVariance;
  var element = state.dotElement;
  var code = state.dotFormula;
  try {
    eval(code);
    if (healing) {
      value = Math.abs(Math.max(0, value));
    } else {
      value = Math.abs(Math.max(0, value)) * -1;
    }
    value = this.applyDamageOverTimeVariance(value, variance);
    value = this.applyDamageOverTimeElement(value, element);
    value = Math.round(value);
    if (value !== 0) {
      this.clearResult();
      this.gainHp(value);
      this.startDamagePopup();
      if (state.dotAnimation > 0) {
        this.startAnimation(state.dotAnimation);
      }
      if (this.isDead()) {
        this.performCollapse();
      }
      this.clearResult();
    }
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'CUSTOM DOT ' + stateId + ' CODE ERROR');
  }
};

Game_Battler.prototype.applyDamageOverTimeVariance = function(damage, vari) {
  if (vari === 0) return damage;
  var variance = vari;
  var amp = Math.floor(Math.max(Math.abs(damage) * variance / 100, 0));
  var v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;
  return damage >= 0 ? damage + v : damage - v;
};

Game_Battler.prototype.applyDamageOverTimeElement = function(damage, element) {
  if (element === 0) return damage;
  return damage * this.elementRate(element);
};

//=============================================================================
// Utilities
// ----------------------------------------------------------------------------
// From Yanfly's Utility Library
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") return;
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================
} else {

var text = '================================================================\n';
text += 'YEP_X_ExtDoT requires YEP_BattleEngineCore and ';
text += 'YEP_BuffsStatesCoreto be at the latest version to run properly. '
text += '\n\nPlease go to www.yanfly.moe and update to the latest version for ';
text += 'the YEP_BattleEngineCore and YEP_BuffsStatesCore plugins.\n';
text += '================================================================\n';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.YEP_BuffsStatesCore