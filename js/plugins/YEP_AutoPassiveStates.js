//=============================================================================
// Yanfly引擎插件-自动被动状态
// YEP_AutoPassiveStates.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_AutoPassiveStates = true;

var Yanfly = Yanfly || {};
Yanfly.APS = Yanfly.APS || {};
Yanfly.APS.version = 1.17;

//=============================================================================
 /*:
 * @plugindesc v1.17 This plugin allows for some states to function as
 * passives for actors, enemies, skills, and equips.
 * @author Yanfly Engine Plugins
 *
 * @param ---Basic---
 * @default
 *
 * @param Actor Passives
 * @parent ---Basic---
 * @desc 这些状态总是以被动的形式出现在参与者身上。
 * 在每个状态标识之间放置一个空格。
 * @default 0
 *
 * @param Enemy Passives
 * @parent ---Basic---
 * @desc 这些状态在敌人身上总是被动出现。
 * 在每个状态标识之间放置一个空格。
 * @default 0
 *
 * @param Global Passives
 * @parent ---Basic---
 * @desc 这些状态将永远以被动的形式出现在所有的战斗者身上。
 * 在每个状态标识之间放置一个空格。
 * @default 0
 *
 * @param ---List---
 * @default ...Requires RPG Maker MV 1.5.0+...
 *
 * @param Actor Passives List
 * @parent ---List---
 * @type state[]
 * @desc 这些状态总是以被动的形式出现在参与者身上。
 * Use with RPG Maker MV 1.5.0+.
 * @default []
 *
 * @param Enemy Passives List
 * @parent ---List---
 * @type state[]
 * @desc 这些状态在敌人身上总是被动出现。
 * Use with RPG Maker MV 1.5.0+.
 * @default []
 *
 * @param Global Passives List
 * @parent ---List---
 * @type state[]
 * @desc 这些状态将永远以被动的形式出现在所有的战斗者身上。
 * Use with RPG Maker MV 1.5.0+.
 * @default []
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 *
 * 被动状态是自动激活的状态。你可以把它们看作是特质的延伸，
 * 但要有更多的灵活性。只要参与者或敌人有自动被动状态的便签，
 * 它们就会一直存在。
 *
 * ============================================================================
 * 便签
 * ============================================================================
 *
 * For those who would like to allocate passive states to your battlers, use
 * the notetags below:
 *
 * 演员，职业，技能，武器，盔甲，敌人标签：
 *   <Passive State: x>
 *   <Passive State: x, x, x>
 *   这将允许行为体或敌人将状态x作为被动状态。
 *   如果放在武器或装甲记事本中，用户将处于被动状态。
 *
 *   <Passive State: x to y>
 *   这将添加状态x到y（按顺序），使参与者或敌人处于被动状态。
 *   如果放在武器或装甲记事本中，用户将处于被动状态。
 *
 * 对于那些不希望自己的被动状态始终处于启用状态的人，可以使
 * 用以下注释标记来介绍被动状态的条件。
 * 必须满足所有条件才能出现被动状态。
 *
 * State Notetags:
 *   <Passive Condition: HP Above x%>
 *   <Passive Condition: HP Below x%>
 *   <Passive Condition: MP Above x%>
 *   <Passive Condition: MP Below x%>
 *   如果用户的HP或MP高于/低于MaxHP或MaxMP的x%，
 *   则将满足此条件以显示被动状态。
 *
 *   <Passive Condition: Stat Above x>
 *   <Passive Condition: Stat Below x>
 *   将“stat”替换为“HP”、“MP”、“TP”、“MAXHP”、“MAXMP”、
 *   “ATK”、“DEF”、“MAT”、“MDF”、“AGI”、“LUK”。
 *   如果上述状态高于/低于x，则满足被动状态出现的条件。
 *
 *   <Passive Condition: Switch x ON>
 *   <Passive Condition: Switch x OFF>
 *   如果开关x打开/关闭，则满足出现被动状态的条件。
 *
 *   <Passive Condition: Variable x Above y>
 *   <Passive Condition: Variable x Below y>
 *   将x替换为要检查其是否高于/低于y的变量，然后满足显示被动状态的条件。
 *
 * ============================================================================
 * 疯狂模式-条件被动
 * ============================================================================
 *
 * 对于那些懂一点JavaScript并希望在特定条件下显示被动状态的人，
 * 可以使用这个notetag来完成条件因子。
 * to accomplish conditional factors.
 *
 * 状态注释标签:
 *   <Custom Passive Condition>自定义被动条件
 *   if (user.hp / user.mhp <= 0.25) {
 *     condition = true;
 *   } else {
 *     condition = false;
 *   }
 *   </Custom Passive Condition>
 *   这使您能够输入要满足的条件，以便显示被动状态。如果'condition'变量返回true，
 *   则会出现被动状态。如果“condition”返回false，它就不会出现。
 *   如果条件没有定义，它将返回真的，被动状态将出现在战场上。
 *   注意：必须满足所有非自定义被动条件，才能满足此条件并允许自定义条件出现。
 *   注意：如果您决定使用要求参与者具有特定状态的条件，则它不能是被动状态以
 *   防止无限循环。
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.17:
 * - Optimization update. There should be less lag spikes if there are more
 * passive conditions present on a battler.
 *
 * Version 1.16:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.15:
 * - Bug fixed that made global passives not apply to actors.
 *
 * Version 1.14:
 * - Updated for RPG Maker MV version 1.5.0.
 * - Added parameters: Actor Passives List, Enemy Passives List, and
 *   Global Passives List
 *
 * Version 1.13:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.12:
 * - Implemented <Custom Passive Condition> to now affect passive state ID's
 * added by Equip Battle Skills.
 *
 * Version 1.11:
 * - Added 'Global Passives' that encompass both actors and enemies.
 *
 * Version 1.10:
 * - Added compatibility functionality for Equip Battle Skills to add the
 * equipped passive states during battle test.
 *
 * Version 1.09:
 * - Added 'Actor Passives' and 'Enemy Passives' plugin parameters. This will
 * cause all actors and enemies respectively to be affected by the listed
 * states as passives.
 *
 * Version 1.08:
 * - Fixed conditional checks to make sure all states are being checked
 * properly without conflict with other conditional states.
 *
 * Version 1.07:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.06:
 * - Added a mass member refresh whenever $gamePlayer is refreshed.
 *
 * Version 1.05a:
 * - Added Lunatic Mode - <Custom Passive Condition> notetag for states.
 * - Fixed a bug that would cause infinite loops.
 *
 * Version 1.04:
 * - Added a lot of passive condition notetags for states.
 * --- <Passive Condition: HP/MP Above/Below x%>
 * --- <Passive Condition: Stat Above/Below x>
 * --- <Passive Condition: Switch x ON/OFF>
 * --- <Passive Condition: Variable x Above/Below y>
 *
 * Version 1.03:
 * - Added refreshing whenever a new skill is learned to update passives.
 *
 * Version 1.02:
 * - Optimized passive state calculations to reduce lag.
 *
 * Version 1.01:
 * - Fixed a bug with having multiple passive states of the same ID.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.SetupParameters = function() {
  Yanfly.Parameters = PluginManager.parameters('YEP_AutoPassiveStates');
  Yanfly.Param = Yanfly.Param || {};
  Yanfly.Param.APSActorPas = String(Yanfly.Parameters['Actor Passives']);
  Yanfly.Param.APSActorPas = Yanfly.Param.APSActorPas.split(' ');
  for (var i = 0; i < Yanfly.Param.APSActorPas.length; ++i) {
    Yanfly.Param.APSActorPas[i] = parseInt(Yanfly.Param.APSActorPas[i]);
    Yanfly.Param.APSActorPas[i] = Yanfly.Param.APSActorPas[i] || 0;
  }
  var data = JSON.parse(Yanfly.Parameters['Actor Passives List']);
  for (var i = 0; i < data.length; ++i) {
    var stateId = parseInt(data[i]);
    if (stateId <= 0) continue;
    if (Yanfly.Param.APSActorPas.contains(stateId)) continue;
    Yanfly.Param.APSActorPas.push(stateId);
  }
  Yanfly.Param.APSEnemyPas = String(Yanfly.Parameters['Enemy Passives']);
  Yanfly.Param.APSEnemyPas = Yanfly.Param.APSEnemyPas.split(' ');
  for (var i = 0; i < Yanfly.Param.APSEnemyPas.length; ++i) {
    Yanfly.Param.APSEnemyPas[i] = parseInt(Yanfly.Param.APSEnemyPas[i]);
    Yanfly.Param.APSEnemyPas[i] = Yanfly.Param.APSEnemyPas[i] || 0;
  }
  var data = JSON.parse(Yanfly.Parameters['Enemy Passives List']);
  for (var i = 0; i < data.length; ++i) {
    var stateId = parseInt(data[i]);
    if (stateId <= 0) continue;
    if (Yanfly.Param.APSEnemyPas.contains(stateId)) continue;
    Yanfly.Param.APSEnemyPas.push(stateId);
  }
  Yanfly.Param.APSGlobalPas = String(Yanfly.Parameters['Global Passives']);
  Yanfly.Param.APSGlobalPas = Yanfly.Param.APSGlobalPas.split(' ');
  for (var i = 0; i < Yanfly.Param.APSGlobalPas.length; ++i) {
    id = parseInt(Yanfly.Param.APSGlobalPas[i]);
    Yanfly.Param.APSActorPas.push(id);
    Yanfly.Param.APSEnemyPas.push(id);
  }
  var data = JSON.parse(Yanfly.Parameters['Global Passives List']);
  for (var i = 0; i < data.length; ++i) {
    var stateId = parseInt(data[i]);
    if (stateId <= 0) continue;
    if (!Yanfly.Param.APSActorPas.contains(stateId)) {
      Yanfly.Param.APSActorPas.push(stateId);
    }
    if (!Yanfly.Param.APSEnemyPas.contains(stateId)) {
      Yanfly.Param.APSEnemyPas.push(stateId);
    }
  }
};
Yanfly.SetupParameters();

//=============================================================================
// DataManager
//=============================================================================

Yanfly.APS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.APS.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_AutoPassiveStates) {
    this.processAPSNotetags1($dataActors, Yanfly.Param.APSActorPas);
    this.processAPSNotetags1($dataClasses);
    this.processAPSNotetags1($dataEnemies, Yanfly.Param.APSEnemyPas);
    this.processAPSNotetags1($dataSkills);
    this.processAPSNotetags1($dataWeapons);
    this.processAPSNotetags1($dataArmors);
    this.processAPSNotetags2($dataStates);
    Yanfly._loaded_YEP_AutoPassiveStates = true;
  }
  return true;
};

DataManager.processAPSNotetags1 = function(group, inheritArray) {
  var note1 = /<(?:PASSIVE STATE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note2 = /<(?:PASSIVE STATE):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.passiveStates = [];
    if (inheritArray) {
      obj.passiveStates = obj.passiveStates.concat(inheritArray);
    }

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.passiveStates = obj.passiveStates.concat(array);
      } else if (line.match(note2)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.passiveStates = obj.passiveStates.concat(range);
      }
    }
  }
};

DataManager.processAPSNotetags2 = function(group) {
  var note1a = /<(?:PASSIVE CONDITION):[ ](.*)[ ](?:ABOVE)[ ](\d+)([%％])>/i;
  var note1b = /<(?:PASSIVE CONDITION):[ ](.*)[ ](?:BELOW)[ ](\d+)([%％])>/i;
  var note2a = /<(?:PASSIVE CONDITION):[ ](.*)[ ](?:ABOVE)[ ](\d+)>/i;
  var note2b = /<(?:PASSIVE CONDITION):[ ](.*)[ ](?:BELOW)[ ](\d+)>/i;
  var note3a = /<(?:PASSIVE CONDITION):[ ]SWITCH[ ](\d+)[ ](.*)>/i;
  var notez1 = /<(?:CUSTOM PASSIVE CONDITION)>/i;
  var notez2 = /<\/(?:CUSTOM PASSIVE CONDITION)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.passiveCondition = '';
    obj.passiveConditionEval = '';
    var evalMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1a)) {
        var rate = parseFloat(RegExp.$2) * 0.01;
        var param = this.getPassiveConditionParamRate(String(RegExp.$1));
        var pass = 'if (' + param + ' <= ' + rate + ') condition = false;';
        obj.passiveCondition = obj.passiveCondition + pass + '\n';
      } else if (line.match(note1b)) {
        var rate = parseFloat(RegExp.$2) * 0.01;
        var param = this.getPassiveConditionParamRate(String(RegExp.$1));
        var pass = 'if (' + param + ' >= ' + rate + ') condition = false;';
        obj.passiveCondition = obj.passiveCondition + pass + '\n';
      } else if (line.match(note2a)) {
        var rate = parseInt(RegExp.$2);
        var param = this.getPassiveConditionParam(String(RegExp.$1));
        var pass = 'if (' + param + ' <= ' + rate + ') condition = false;';
        obj.passiveCondition = obj.passiveCondition + pass + '\n';
      } else if (line.match(note2b)) {
        var rate = parseInt(RegExp.$2);
        var param = this.getPassiveConditionParam(String(RegExp.$1));
        var pass = 'if (' + param + ' >= ' + rate + ') condition = false;';
        obj.passiveCondition = obj.passiveCondition + pass + '\n';
      } else if (line.match(note3a)) {
        var id = parseInt(RegExp.$1);
        var value = String(RegExp.$2).toUpperCase();
        var pass = ''
        if (['ON', 'TRUE', 'ENABLE', 'ENABLED'].contains(value)) {
          pass = 'if (!$gameSwitches.value(' + id + ')) condition = false;'
        }
        if (['OFF', 'FALSE', 'DISABLE', 'DISABLED'].contains(value)) {
          pass = 'if ($gameSwitches.value(' + id + ')) condition = false;'
        }
        if (pass === '') continue;
        obj.passiveCondition = obj.passiveCondition + pass + '\n';
      } else if (line.match(notez1)) {
        evalMode = 'custom passive condition';
      } else if (line.match(notez2)) {
        evalMode = 'none';
      } else if (evalMode === 'custom passive condition') {
        obj.passiveConditionEval = obj.passiveConditionEval + line + '\n';
      }
    }

    obj.passiveCondition = new Function('condition','a','user','subject','b',
      'target','s','v', obj.passiveCondition + '\nreturn condition;');
    obj.passiveConditionEval = new Function('condition','a','user','subject',
      'b','target','s','v', obj.passiveConditionEval + '\nreturn condition;');
  }
};

DataManager.getPassiveConditionParam = function(string) {
    string = string.toUpperCase();
    var text = 'user.';
    if (['HP'].contains(string)) text += 'hp';
    if (['MP', 'SP'].contains(string)) text += 'mp';
    if (['TP'].contains(string)) text += 'tp';
    if (['ATK'].contains(string)) text += 'param(2)';
    if (['DEF'].contains(string)) text += 'param(3)';
    if (['MAT', 'INT'].contains(string)) text += 'param(4)';
    if (['MDF', 'RES'].contains(string)) text += 'param(5)';
    if (['AGI'].contains(string)) text += 'param(6)';
    if (['LUK'].contains(string)) text += 'param(7)';
    if (['MAX HP', 'MAXHP'].contains(string)) text += 'mhp';
    if (['MAX MP', 'MAX SP', 'MAXMP', 'MAXSP'].contains(string)) text += 'mmp';
    if (string.match(/VARIABLE[ ](\d+)/i)) {
      text = '$gameVariables.value(' + parseInt(RegExp.$1) + ')';
    }
    return text;
};

DataManager.getPassiveConditionParamRate = function(string) {
    string = string.toUpperCase();
    var text = '0';
    if (['HP'].contains(string)) return 'user.hpRate()';
    if (['MP'].contains(string)) return 'user.mpRate()';
    return text;
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.APS.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function() {
    this._passiveStatesRaw = undefined;
    Yanfly.APS.Game_BattlerBase_refresh.call(this);
};

Yanfly.APS.Game_BattlerBase_states = Game_BattlerBase.prototype.states;
Game_BattlerBase.prototype.states = function() {
    var array = Yanfly.APS.Game_BattlerBase_states.call(this);
    array = array.concat(this.passiveStates());
    this.sortPassiveStates(array);
    return array;
};

Yanfly.APS.Game_BattlerBase_isStateAffected =
    Game_BattlerBase.prototype.isStateAffected;
Game_BattlerBase.prototype.isStateAffected = function(stateId) {
    if (this.isPassiveStateAffected(stateId)) return true;
    return Yanfly.APS.Game_BattlerBase_isStateAffected.call(this, stateId);
};

Game_BattlerBase.prototype.passiveStates = function() {
    var array = [];
    var raw = this.passiveStatesRaw();
    for (var i = 0; i < raw.length; ++i) {
      var state = $dataStates[raw[i]];
      if (state && array.contains(state)) continue;
      array.push(state);
    }
    return array;
};

Game_BattlerBase.prototype.passiveStatesRaw = function() {
    var array = [];
    return array.filter(Yanfly.Util.onlyUnique);
};

Game_BattlerBase.prototype.getPassiveStateData = function(obj) {
    if (!obj) return [];
    if (!obj.passiveStates) return [];
    var array = [];
    for (var i = 0; i < obj.passiveStates.length; ++i) {
      var stateId = obj.passiveStates[i];
      if (!this.meetPassiveStateCondition(stateId)) continue;
      array.push(stateId);
    }
    var added = this.addEquipBattleTestSkillPassives(obj);
    if (added.length > 0) {
      for (var i = 0; i < added.length; ++i) {
        var stateId = added[i];
        if (!this.meetPassiveStateCondition(stateId)) continue;
        array.push(stateId);
      }
    }
    return array;
};

Game_BattlerBase.prototype.addEquipBattleTestSkillPassives = function(obj) {
  if (!Imported.YEP_EquipBattleSkills) return [];
  if (!DataManager.isBattleTest()) return [];
  if (!DataManager.isSkill(obj)) return [];
  return obj.equipStates;
};

Game_BattlerBase.prototype.meetPassiveStateCondition = function(stateId) {
    this._checkPassiveStateCondition = this._checkPassiveStateCondition || [];
    if (this._checkPassiveStateCondition.contains(stateId)) return false;
    var state = $dataStates[stateId];
    if (!state) return false;
    if (state.passiveCondition !== '') {
      if (!this.passiveStateConditions(state)) return false;
    }
    if (state.passiveConditionEval === '') return true;
    return this.passiveStateConditionEval(state);
};

Game_BattlerBase.prototype.passiveStateConditions = function(state) {
  this._checkPassiveStateCondition = this._checkPassiveStateCondition || [];
  this._checkPassiveStateCondition.push(state.id);
  var condition = true;
  var a = this;
  var user = this;
  var subject = this;
  var b = this;
  var target = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = state.passiveCondition;
  try {
    condition = state.passiveCondition.call(this, condition, a, user, subject,
      b, target, s, v);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'PASSIVE STATE CUSTOM CONDITION ERROR');
  }
  var index = this._checkPassiveStateCondition.indexOf(state.id);
  this._checkPassiveStateCondition.splice(index, 1);
  return condition;
};

Game_BattlerBase.prototype.passiveStateConditionEval = function(state) {
  this._checkPassiveStateCondition = this._checkPassiveStateCondition || [];
  this._checkPassiveStateCondition.push(state.id);
  var condition = true;
  var a = this;
  var user = this;
  var subject = this;
  var b = this;
  var target = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = state.passiveConditionEval;
  try {
    condition = state.passiveConditionEval.call(this, condition, a, user,
      subject, b, target, s, v);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'PASSIVE STATE CUSTOM CONDITION ERROR');
  }
  var index = this._checkPassiveStateCondition.indexOf(state.id);
  this._checkPassiveStateCondition.splice(index, 1);
  return condition;
};

Game_BattlerBase.prototype.sortPassiveStates = function(array) {
    array.sort(function(a, b) {
      var p1 = a.priority;
      var p2 = b.priority;
      if (p1 !== p2) return p2 - p1;
      return a - b;
    });
};

Game_BattlerBase.prototype.isPassiveStateAffected = function(stateId) {
    return this.passiveStatesRaw().contains(stateId);
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.APS.Game_Battler_isStateAddable = Game_Battler.prototype.isStateAddable;
Game_Battler.prototype.isStateAddable = function(stateId) {
    if (this.isPassiveStateAffected(stateId)) return false;
    return Yanfly.APS.Game_Battler_isStateAddable.call(this, stateId);
};

Yanfly.APS.Game_Battler_removeState = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId) {
    if (this.isPassiveStateAffected(stateId)) return;
    Yanfly.APS.Game_Battler_removeState.call(this, stateId);
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.passiveStatesRaw = function() {
    if (this._passiveStatesRaw !== undefined) return this._passiveStatesRaw;
    var array = Game_BattlerBase.prototype.passiveStatesRaw.call(this);
    array = array.concat(this.getPassiveStateData(this.actor()));
    array = array.concat(this.getPassiveStateData(this.currentClass()));
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      array = array.concat(this.getPassiveStateData(equip));
    }
    for (var i = 0; i < this._skills.length; ++i) {
      var skill = $dataSkills[this._skills[i]];
      array = array.concat(this.getPassiveStateData(skill));
    }
    this._passiveStatesRaw = array.filter(Yanfly.Util.onlyUnique)
    return this._passiveStatesRaw;
};

Yanfly.APS.Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
    Yanfly.APS.Game_Actor_learnSkill.call(this, skillId);
    this._passiveStatesRaw = undefined;
};

Yanfly.APS.Game_Actor_forgetSkill = Game_Actor.prototype.forgetSkill;
Game_Actor.prototype.forgetSkill = function(skillId) {
    Yanfly.APS.Game_Actor_forgetSkill.call(this, skillId);
    this._passiveStatesRaw = undefined;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.passiveStatesRaw = function() {
    if (this._passiveStatesRaw !== undefined) return this._passiveStatesRaw;
    var array = Game_BattlerBase.prototype.passiveStatesRaw.call(this);
    array = array.concat(this.getPassiveStateData(this.enemy()));
    for (var i = 0; i < this.skills().length; ++i) {
      var skill = this.skills()[i];
      array = array.concat(this.getPassiveStateData(skill));
    }
    this._passiveStatesRaw = array.filter(Yanfly.Util.onlyUnique)
    return this._passiveStatesRaw;
};

if (!Game_Enemy.prototype.skills) {
    Game_Enemy.prototype.skills = function() {
      var skills = []
      for (var i = 0; i < this.enemy().actions.length; ++i) {
        var skill = $dataSkills[this.enemy().actions[i].skillId];
        if (skill) skills.push(skill);
      }
      return skills;
    }
};

//=============================================================================
// Game_Unit
//=============================================================================

Game_Unit.prototype.refreshMembers = function() {
    var group = this.allMembers();
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var member = group[i];
      if (member) member.refresh();
    }
};

Game_Unit.prototype.allMembers = function() {
    return this.members();
};

//=============================================================================
// Game_Player
//=============================================================================

Yanfly.APS.Game_Player_refresh = Game_Player.prototype.refresh;
Game_Player.prototype.refresh = function() {
    $gameParty.refreshMembers();
    Yanfly.APS.Game_Player_refresh.call(this);
};

//=============================================================================
// Utilities
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

Yanfly.Util.getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

Yanfly.Util.onlyUnique = function(value, index, self) {
    return self.indexOf(value) === index;
};

//=============================================================================
// End of File
//=============================================================================
