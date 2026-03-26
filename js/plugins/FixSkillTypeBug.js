//=============================================================================
// FixSkillTypeBug.js
//=============================================================================

/*:
 * @plugindesc fix the bug that the same skill type repeated display
 * @author 康娜酱
 * 
 * @help 这个插件没有命令
 * 
 */

(function() {

  var _Game_BattlerBase_addedSkillTypes = Game_BattlerBase.prototype.addedSkillTypes;
  Game_BattlerBase.prototype.addedSkillTypes = function() {
    var arr = _Game_BattlerBase_addedSkillTypes.call(this);
    return [...new Set(arr)];
  };

})();
