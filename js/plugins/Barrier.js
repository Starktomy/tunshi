//=============================================================================
// Barrier.js
//=============================================================================


/*:
* @plugindesc 用状态实现屏障功能
* @author 剣崎宗二
*
* @param BarrierText
* @text 屏障文本
* @desc 屏障激活时显示文本（%2 = 吸收伤害量 %3 = 剩余量 %1 = 屏障状态名称）被破坏时不显示。 
* @default %1吸收了%2的伤害，剩余%3！
*
* @param BarrierBreakText
* @text 破坏屏障文本
* @desc 屏障破坏信息（%1 = 屏障状态名称 %2 = 伤害量） 
* @default %1被摧毁了,承受了%2的伤害！
*
* @param Piercing
* @text 屏障穿透
* @type boolean
* @desc 超过屏障物理强度的伤害是否穿透。如果关闭，会使过量伤害无效。
* @default true
* @on 开启
* @off 关闭
*
* @param PiercingChain
* @text 连锁穿透
* @type boolean
* @desc 穿透伤害是否被下一个屏障阻挡。如果关闭，穿透伤害直接造成伤害，忽略其他屏障。 
* @default true
* @on 开启
* @off 关闭
*
* @param BarrierAnime 
* @text 屏障动画
* @type animation
* @desc 被屏障挡住时的动画ID(默认)
* @default 1
* 
* @param BarrierBreakAnime 
* @text 破坏屏障动画
* @type animation
* @desc 屏障被打破时的动画ID(默认)
* @default 2
*
* @help
* 这是实现减少伤害的屏障的插件。
* 如果在状态备注中输入<barrier:300> （数字为吸收值），则吸收直到该值消失。
* 可以输入与减伤值计算公式相同的公式，但不能使用'>'，并且a（攻击方）不存在，只能使用b（授予方）。请注意。
* 动画标签处于<BarrierBreakAnime: 1>状态（如果被破坏就播放ID3）
* <BarrierAnime:3>　　（如果没有被破坏则播放ID1） 
* 等。
* <barrierelement:3,9>仅抵挡属性ID为3，9的伤害。
* 技能标签<ignorebarrier>强制穿透屏障。
------------------------------------------------------------------------------
*注：1.屏障标签:<barrier:x>  x为屏障的吸收伤害值。（也能用公式）
*    2.只能用于状态上面，且屏障是永久且一次性的屏障，
*      如果屏障没有被打破，屏障将会一直保留，直到被打破则消失。
*    3.屏障能保留剩下的吸收值。
*    4.同一个状态的屏障值是不能叠加的，只会刷新吸收值，
*      所以想要叠加屏障只能再设置一个状态。
*    5.<barrierelement:x>标签可以吸收指定属性ID的伤害，
*      想指定多个时使用,分隔开。
*    6.在技能备注中输入<ignorebarrier>标签，可以无视屏障。
*------------------------------------------------------------------------------
* 汉化：
* 2022.6.11 - 文本汉化完毕，并添加注意事项。
*/

(function () {

  var parameters = PluginManager.parameters('Barrier');
  var BarrierText = parameters['BarrierText'];
  var BarrierBreakText = parameters['BarrierBreakText'];
  var Piercing = (parameters['Piercing'] == "true");
  var PiercingChain = (parameters['PiercingChain'] == "true");

  var BarrierAnime = Number(parameters['BarrierAnime']);
  var BarrierBreakAnime = Number(parameters['BarrierBreakAnime']);

  function Barrier() {
    throw new Error('This is a static class');
  }

  //ActionLogs系
  var Game_ActionResult_prototype_clear = Game_ActionResult.prototype.clear;
  Game_ActionResult.prototype.clear = function () {
    Game_ActionResult_prototype_clear.call(this);
    this.barrieredDmg = [];
    this.barrieredBreak = [];
  };

  Barrier.findIdIndex = function (array, extid) {
    if (!array) return -1;

    for (var i = 0; i < array.length; i++) {
      if (array[i].id == extid) {
        return i;
      }
    }
    return -1;
  };

  Barrier.findId = function (array, extid) {
    if (!array) return null;

    targetIndex = Barrier.findIdIndex(array, extid)
    if (targetIndex != -1) {
      return array[targetIndex];
    }
    return null;
  };

  Barrier.findFromState = function (array) {
    if (!array) return null;

    for (i = 0; i < array.length; i++) {
      if ($dataStates[array[i]].meta.barrier) {
        return array[i];
      }
    }
    return null;
  };

  Barrier.getUniqueId = function (battler) {
    if (battler.isActor()) {
      return battler.actorId();
    }
    else {
      return "e" + battler.index();
    }
  }

  Barrier.FindAnimeId = function (stateId, broken) {
    if ($dataStates[stateId] && $dataStates[stateId].meta) {
      if (broken && $dataStates[stateId].meta.BarrierBreakAnime) { return Number($dataStates[stateId].meta.BarrierBreakAnime) }

      if (!broken && $dataStates[stateId].meta.BarrierAnime) { return Number($dataStates[stateId].meta.BarrierAnime) }
    }

    return broken ? BarrierBreakAnime : BarrierAnime;
  }

  //Message系
  Window_BattleLog.prototype.displayBarrier = function (target) {
    var targetBarrier = target._barrierList;
    var targetBarrierDmg = target.result().barrieredDmg;
    var targetBarrierBreak = target.result().barrieredBreak;

    var local = this;

    targetBarrierBreak.forEach(function (element) {
      var name = $dataStates[element.id].name;
      var dmg = element.value;
      local.push('showAnimation', target, [target], Barrier.FindAnimeId(element.id, true));
      local.push('addText', BarrierBreakText.format(name, dmg));
    }, this);

    targetBarrierDmg.forEach(function (element) {
      var name = $dataStates[element.id].name;
      var dmg = element.value;
      var left = Barrier.findId(targetBarrier, element.id).value;
      local.push('showAnimation', target, [target], Barrier.FindAnimeId(element.id, false));
      local.push('addText', BarrierText.format(name, dmg, left));
    }, this);
  };

  var Window_BattleLog_prototype_displayHpDamage = Window_BattleLog.prototype.displayHpDamage;
  Window_BattleLog.prototype.displayHpDamage = function (target) {
    this.displayBarrier(target);
    Window_BattleLog_prototype_displayHpDamage.call(this, target);
  }

  //state系
  var Game_Battler_prototype_addState = Game_Battler.prototype.addState;
  Game_Battler.prototype.addState = function (stateId) {
    Game_Battler_prototype_addState.call(this, stateId);

    var targetState = $dataStates[stateId];
    var targetBarrierState = Barrier.findId(this._barrierList, stateId);
    if (targetState && (targetState.meta.barrier || targetState.meta.healablebarrier)) {
      var b = this;
      var b_str = targetState.meta.healablebarrier ? targetState.meta.healablebarrier : targetState.meta.barrier;
      var b_value = eval(b_str);
      if (!b_value) { b_value = 1; }
      var b_healable = !!targetState.meta.healablebarrier;
      var b_element = targetState.meta.barrierelement ? targetState.meta.barrierelement.split(",") : [];


      if (!targetBarrierState) {
        var barrierStateObject = {};
        barrierStateObject.id = stateId;
        barrierStateObject.value = b_value;
        barrierStateObject.healable = b_healable;
        barrierStateObject.maxValue = b_value;
        barrierStateObject.elements = b_element;
        this._barrierList.push(barrierStateObject);
      }
      else {
        targetBarrierState.value = b_value;
        targetBarrierState.maxValue = b_value;
      }
    }
  };

  var Game_BattlerBase_prototype_eraseState = Game_BattlerBase.prototype.eraseState;
  Game_BattlerBase.prototype.eraseState = function (stateId) {
    Game_BattlerBase_prototype_eraseState.call(this, stateId)
    var targetState = $dataStates[stateId];
    if (targetState && (targetState.meta.barrier || targetState.meta.healablebarrier)) {
      var targetId = Barrier.findIdIndex(this._barrierList, stateId);
      this._barrierList.splice(targetId, 1);
    }
  };

  var kz_Game_BattlerBase_prototype_clearStates = Game_BattlerBase.prototype.clearStates;
  Game_BattlerBase.prototype.clearStates = function () {
    kz_Game_BattlerBase_prototype_clearStates.call(this);
    this._barrierList = [];
  };

  //Dmg系
  var Game_Action_prototype_executeHpDamage = Game_Action.prototype.executeHpDamage;
  Game_Action.prototype.executeHpDamage = function (target, value) {
    var skill = this.item();
    if (target._barrierList && target._barrierList.length > 0 && !skill.meta.ignorebarrier) {
      //バリアリストに何か入ってる場合
      var blist = target._barrierList;
      target.result().barrieredDmg = [];
      target.result().barrieredBreak = [];

      if (value > 0) {
        var removalList = [];
        for (var i = 0; i < blist.length; i++) {
          if (blist[i].elements.length < 1 || this.barrierElementMatch(blist[i], skill))

            if (blist[i].value > value)  //割れなかった場合
            {
              var dmgObject = {};
              dmgObject.id = blist[i].id;
              dmgObject.value = value;
              target.result().barrieredDmg.push(dmgObject);

              blist[i].value -= value;
              value = 0;
              break;
            }
            else  //割れた場合
            {
              var breakObject = {};
              breakObject.id = blist[i].id;
              breakObject.value = blist[i].value;
              target.result().barrieredBreak.push(breakObject);

              if (Piercing) {
                value -= blist[i].value;
              }
              else {
                value = 0;
              }
              removalList.push(blist[i].id);
              console.log(PiercingChain);
              if (!PiercingChain) { break; }
            }
        }
        for (var i = 0; i < removalList.length; i++) {
          target.removeState(removalList[i]);
        }
      }
      else {
        //回復の場合
        var healableList = blist.filter(function (item) {
          return item.healable;
        });

        for (var i = 0; i < healableList.length; i++) {
          var dmgOnBarrier = healableList[i].value - healableList[i].maxValue;
          if (dmgOnBarrier < value) //バリアの減りの方が激しい場合
          {
            var dmgObject = {};
            dmgObject.id = blist[i].id;
            dmgObject.value = value;
            target.result().barrieredDmg.push(dmgObject);

            healableList[i].value -= value;
            value = 0;
            break;
          }
          else //回復量が上回った場合
          {
            var dmgObject = {};
            dmgObject.id = blist[i].id;
            dmgObject.value = dmgOnBarrier;
            target.result().barrieredDmg.push(dmgObject);

            value -= dmgOnBarrier;
            if (!PiercingChain) { break; }
          }
        }
      }
    }
    Game_Action_prototype_executeHpDamage.call(this, target, value);
  }

  Game_Action.prototype.barrierElementMatch = function (barrier, skill) {
    if (skill.damage.elementId < 0) {
      var result = false;
      this.subject().attackElements().forEach(function (e) {
        if (barrier.elements.indexOf(e) > 0) {
          result = true;
        }
      }, this)
      return result;
    } else {
      console.log(skill.damage.elementId);
      console.log(barrier.elements);
      console.log(barrier.elements.indexOf(skill.damage.elementId));
      return barrier.elements.indexOf(skill.damage.elementId.toString()) >= 0;
    }
  }
})();


