//=============================================================================
// Yanfly Engine Plugins - Battle AI Core Extension - Actor Auto Battle AI
// YEP_X_ActorAutoBattleAI.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ActorAutoBattleAI = true;

var Yanfly = Yanfly || {};
Yanfly.AABAI = Yanfly.AABAI || {};
Yanfly.AABAI.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 AI 自动战斗☁️
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 正式介绍
 * ============================================================================
 *
 * 这个插件需要YEP _ BattleAICore。
 * 确保这个插件位于插件列表中的YEP _ BattleAICore下。
 *
 * 默认情况下，如果一个角色有自动战斗特征，它将循环
 * 遍历它所学的每一个技能(无论它是否可以访问该技能类
 * 型都无关紧要)，并选择其中最难击中的技能。这种设置
 * 可能适用于一些自动战斗机，但不是全部。
 * 这个插件的作用是它结合了YPE库的自动战斗核心的自动优先系统，
 * 用于角色自动战斗.
 *
 * If you don't have YEP_BattleAICore yet, please download it from here:
 * http://yanfly.moe/2015/10/19/yep-16-battle-a-i-core/
 *
 * ============================================================================
 * 插件参数
 * ============================================================================
 *
 * 默认人工智能级别:
 * - See 'Actor AI Level' in the Notetags section below.
 *
 * Bypass Requirement:
 * - 这是一个技能列表，为了使用它，你可以绕过这个要求
 * 去学习技能。也就是说，像'Attack'和/或'Guard'
 * 这样的技能通常不是由角色学习的，
 * 但他们可以通过命令窗口获得。
 *
 * Curate Skill List:
 * - 用于自动战斗的技能只能是通过可用技能类型获得的技
 * 能。这是一个可选择的选项，因为有时候，角色学习的
 * 技能可以通过自动战斗使用，尽管没有获得该技能类
 * 型。举例来说，一个角色在骑士职业中学习了技能，但
 * 是当他转换到法师职业时，他就失去了骑士技能。然
 * 而，尽管如此，自动战斗将允许法师职业使用骑士技能
 * 类型的技能，如果它是设置的一部分。
 * 启用此选项来管理技能列表将移除可用技能类型之外的技能使用能力。
 * ...
 *
 * Undecided AI:
 * - 如果没有通过人工智能优先级列表确定技能，角色将使
 * 用默认的自动战斗人工智能来确定使用哪个技能。
 * 否则，如果设置为假，则角色仅执行基本攻击。
 *
 * ============================================================================
 * 注释标记
 * ============================================================================
 *
 * 设置自动战斗人工智能的注意事项。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 角色AI水平
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * 角色AI水平并不能决定他们有多聪明。
 * 相反，他们决定严格遵循<人工智能优先级>列表。
 * 人工智能级别为80意味着它有80%的机会遵循人工智能优先级列表上的优先操作，
 * 然后进入下一个有80%机会的列表，
 * 以此类推。
 * AI水平越低，几率越低，使得AI更随机。
 *
 * Class Notetag:
 *
 *   <AI Level: x>
 *   将演员的AI等级设置为x，x越低，角色越随机。
 *   x的值越高，角色在遵循其设置中的人工智能
 *   优先级列表时就越严格。.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 角色AI优先
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * 如果一个类有一个人工智能优先级列表，
 * 参与者将从上到下进入该列表(给予顶部的动作比底部的动作更高的优先级)，
 * 寻找任何满足条件的动作。
 * 如果这个条件得到满足，
 * 那么这个动作就是角色要进行的动作。
 *
 * 要为参与者设置优先级列表，必须在类的注释框中放置
 * 符合以下格式的注释标签:
 *
 *   <AI Priority>                      <AI Priority>
 *    condition: SKILL x, target   or    condition: skill name, target
 *    condition: SKILL x, target         condition: skill name, target
 *   </AI Priority>                     </AI Priority>
 *
 * 任何数量的条件和技能都可以放在两个
 * <AI Priority> 标签之间。您可以选择使用技能标识或技能名称。但是，
 * 如果您使用技能名称，请记住它不区分大小写，
 * 并且如果您的数据库中有任何技能具有匹配的名称，
 * 具有较大技能标识的技能将是所使用的操作。
 *
 * ============================================================================
 * 条件
 * ============================================================================
 *
 * <AI Priority>注释标签使用的条件与YEP _ BattleAICore插件中的条件相同。
 * 请参考YEP _ BattleAICore帮助文件，
 * 了解哪些条件可用于人工智能设置。
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Fixed a bug that made curated skill types not work.
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param Default AI Level
 * @text 默认AI级别
 * @type number
 * @min 0
 * @max 100
 * @desc 这是所有角色默认的AI等级。
 * Level 0: Very Random     Level 100: Very Strict
 * @default 100
 *
 * @param Bypass Requirement
 * @text 旁路要求
 * @type skill[]
 * @desc 这是一个技能列表，为了使用它，
 * 你可以绕过这个要求去学习技能。
 * @default ["1","2","3","4","5","6","7"]
 *
 * @param Curate Skill List
 * @text 管理技能列表
 * @type boolean
 * @on YES
 * @off NO
 * @desc 用于自动战斗的技能只能是通过可用技能类型获得的技能。
 * ... YES - true   NO - false
 * @default true
 *
 * @param Undecided AI
 * @text 未定AI
 * @type boolean
 * @on YES
 * @off NO
 * @desc 如果没有确定技能，使用默认的自动战斗AI？
 * 否则，只执行基本攻击。
 * @default false
 *
 */
//=============================================================================

if (Imported.YEP_BattleAICore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ActorAutoBattleAI');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.AABAIDefaultLevel = Number(Yanfly.Parameters['Default AI Level']);
Yanfly.Param.AABAIBypassRequirementSkills = 
  JSON.parse(Yanfly.Parameters['Bypass Requirement']);
Yanfly.Param.AABAICurate = eval(String(Yanfly.Parameters['Curate Skill List']));
Yanfly.Param.AABAIUndecided = eval(String(Yanfly.Parameters['Undecided AI']));

Yanfly.SetupParameters = function() {
  var length = Yanfly.Param.AABAIBypassRequirementSkills.length;
  for (var i = 0; i < length; ++i) {
    Yanfly.Param.AABAIBypassRequirementSkills[i] = 
      Number(Yanfly.Param.AABAIBypassRequirementSkills[i]);
  }
};
Yanfly.SetupParameters();

//=============================================================================
// DataManager
//=============================================================================

Yanfly.AABAI.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.AABAI.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_X_ActorAutoBattleAI) {
    this.processAABAINotetags1($dataClasses);
    Yanfly._loaded_YEP_X_ActorAutoBattleAI = true;
  }
  return true;
};

DataManager.processAABAINotetags1 = function(group) {
  var note1 = /<(?:AI PRIORITY)>/i;
  var note2 = /<\/(?:AI PRIORITY)>/i;
  var note3 = /<(?:AI CONSIDER TAUNT|ai considers taunts)>/i;
  var note4 = /<(?:AI LEVEL):[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.aiPattern = [];
    var aiPatternFlag = false;
    obj.aiConsiderTaunt = false;
    obj.aiLevel = Yanfly.Param.AABAIDefaultLevel * 0.01;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        aiPatternFlag = true;
      } else if (line.match(note2)) {
        aiPatternFlag = false;
      } else if (aiPatternFlag) {
        obj.aiPattern.push(line);
      } else if (line.match(note3)) {
        obj.aiConsiderTaunt = true;
      } else if (line.match(note4)) {
        obj.aiLevel = parseFloat(RegExp.$1 * 0.01);
      }
    }
  }
};

//=============================================================================
// AIManager
//=============================================================================

Yanfly.AABAI.AIManager_hasSkill = AIManager.hasSkill;
AIManager.hasSkill = function(skillId) {
  if (this.battler() && this.battler().isActor()) {
    return this.checkActorHasSkillRequirement(skillId);
  } else {
    return Yanfly.AABAI.AIManager_hasSkill.call(this, skillId);
  }
};

AIManager.checkActorHasSkillRequirement = function(skillId) {
  var skill = $dataSkills[skillId];
  if (!skill) return false;
  if (Yanfly.Param.AABAIBypassRequirementSkills.contains(skillId)) return true;
  if (Yanfly.Param.AABAICurate) {
    var skillTypes = this.battler().addedSkillTypes();
    if (skillTypes && !skillTypes.contains(skill.stypeId)) return false;
  }
  return Yanfly.AABAI.AIManager_hasSkill.call(this, skillId);
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.AABAI.Game_Actor_makeAutoBattleActions =
  Game_Actor.prototype.makeAutoBattleActions;
Game_Actor.prototype.makeAutoBattleActions = function() {
  if (this.isConfused()) {
    this.makeConfusionActions();
  } else if (this.currentClass().aiPattern.length > 0) {
    this.setAIPattern();
    this.setActionState('waiting');
  } else {
    Yanfly.AABAI.Game_Actor_makeAutoBattleActions.call(this);
  }
};

Game_Actor.prototype.setAIPattern = function() {
  Game_Battler.prototype.setAIPattern.call(this);
  if (this.numActions() <= 0) return;
  AIManager.setBattler(this);
  for (var i = 0; i < this.currentClass().aiPattern.length; ++i) {
    if (Math.random() > this.aiLevel()) continue;
    var line = this.currentClass().aiPattern[i];
    if (AIManager.isDecidedActionAI(line)) return;
  }
  if (Yanfly.Param.AABAIUndecided) {
    Yanfly.AABAI.Game_Actor_makeAutoBattleActions.call(this);
  } else {
    for (var i = 0; i < this.numActions(); i++) {
      this._actions[i].setAttack();
    }
  }
  this.setActionState('waiting');
};

Game_Actor.prototype.aiLevel = function() {
    return this.currentClass().aiLevel;
};

//=============================================================================
// Error Message
//=============================================================================
} else {

var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_X_ActorAutoBattleAI without YEP_BattleAICore. Please visit ';
text += 'Yanfly.moe and install YEP_BattleAICore in your game project before ';
text += 'you can use this plugin.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.YEP_BattleAICore

//=============================================================================
// Error Message
//=============================================================================