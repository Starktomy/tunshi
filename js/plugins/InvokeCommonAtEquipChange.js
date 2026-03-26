//=============================================================================
// Plugin for RPG Maker MV and MZ
// InvokeCommonAtEquipChange.js
//=============================================================================
// [Update History]
// 2022.May.06 Ver1.0.0 first release
// 2022.May.07 Ver1.1.0 Enables to do it when one is unequipped

/*:ja
 * @target MV MZ
 * @plugindesc [Ver1.1.0]Invoke Common Event When player changes equipment
 * @author Sasuke KANNAZUKI
 *
 * @param commonId
 * @text Default Common Event ID
 * @desc deault commonID when user changes equip.
 * @type common_event
 * @min 0
 * @default 1
 *
 * @param timing
 * @text Event Invoke Timing
 * @desc The timing when it invokes common event
 * @option Just after equip changed
 * @value immediate
 * @option When player close menu
 * @value wait
 * @type select
 * @default wait
 *
 * @param doesInvokeAtNone
 * @text Does invoke when unequip?
 * @desc When player unequip item, invoke common event?
 * @type boolean
 * @on Yes
 * @off No. Only Equip Something
 * @default false
 *
 * @param commonIdAtNone
 * @parent doesInvokeAtNone
 * @text Common Id At Unequipped
 * @desc Common Event Id That Invokes When Player Unequipped
 * @type common_event
 * @min 0
 * @default 1
 *
 * @help This plugin does not provide plugin commands.
 * This plugin runs under RPG Maker MV(Ver1.6.0 or later) and MZ.
 * This plugin enables common event invocation at player changes any equipment.
 *
 * [Summary]
 * When player changes an actor's equipment, invoke specified common event.
 * If you need to change different common event at any equipment,
 * Write down following notation at weapon or armor note.
 * <invokeCommonEventId:12>
 * In this case, it'll invoke common event #12.
 * If you set 0, common event won't invoke.
 *
 * You can select the timing of common event invocation at parameter.
 * - When you select 'Just after equip changed', menu closed immediate and
 *   invoke specified common event.
 * - When you select 'When player close menu', wait until menu is closed.
 *   In this case, there is 2 notes.
 *  - When player change plural equipments, only invoke set last one.
 *  - If you change equip and save the game, common event won't invoke when
 *   load the game.
 *
 * [Advaned Option: When The Actor Become Unequipped]
 * If the actor become uneqipped, you can select invoke it or not by option.
 * If you select invoke it at become unequipped, set the default common event.
 * If you need to change common event at unequip specified equipment,
 * Write down following notation at weapon or armor note.
 * <removeCommonEventId:15>
 * In this case, it'll invoke common event #15.
 * If you set 0, common event won't invoke.
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:
 * @target MV MZ
 * @plugindesc [Ver1.1.0]更换装备时触发公共事件
 * @author 神無月サスケ
 *
 * @param commonId
 * @text 公共事件ID
 * @desc 更换装备时调用的默认公共事件 ID
 * @type common_event
 * @min 0
 * @default 0
 *
 * @param timing
 * @text 触发时机
 * @desc 什么时候触发公共事件
 * @option 更改装备后立即
 * @value immediate
 * @option 关闭菜单时
 * @value wait
 * @type select
 * @default wait
 *
 * @param doesInvokeAtNone
 * @text 卸下装备时启动
 * @desc 卸下装备时也要启动公共事件吗？
 * @type boolean
 * @on 启动
 * @off 不启动
 * @default false
 *
 * @param commonIdAtNone
 * @parent doesInvokeAtNone
 * @text 卸下装备时公共事件
 * @desc 卸下装备留空时启动的公共事件
 * @type common_event
 * @min 0
 * @default 0
 *
 * @help 此插件没有插件命令。
 * 此插件支持RPG工具MV(Ver1.6.0或更高版本)和MZ。
 * 通过安装此插件，玩家可以在更换装备时调用公共事件。
 *
 * ■概要
 * 当角色更换装备时触发一个公共事件。
 * 如果要为特定的装备设置特殊的公共事件，
 * 请在装备备注栏中写入:
 * <invokeCommonEventId:12>
 * 这样便会触发ID12的公共事件。
 * 如果设置为0，则不会触发公共事件。
 *
 * 根据选项，可以设置触发时机。
 * ・如果选择「更改装备后立即」，
 *  则更改装备后立即切换到地图画面，并执行公共事件。
 * ・选择「关闭菜单时」，则关闭菜单后才会触发。
 * 　- 更改多个装备时，仅执行最后一个装备的公共事件。
 *   - 装备变更后进行保存并加载时，不会执行公共事件。
 * ◆补充一点，关于【卸下装备时启动】参数的触发条件，
 *  只会触发参数设置好的公共事件ID，如果没有设置则不会触发。
 * ◆因为MV默认一次性只能触发一个公共事件，
 *  配合插件【HIME_CommonEventQueue.js】可同时执行多个公共事件。
 *
 * ■追加功能：卸下装备时
 * 可以选择设置在卸下装备时是否调用公共事件。
 * 此时启动的公共事件也可以选择设置。
 * 如果想在卸下特定装备时启动不同的公共事件，
 * 请在装备备注栏中写入:
 * <removeCommonEventId:15>
 * 这样便会触发ID15的公共事件。
 * 如果设置为0，则不会触发公共事件。
 *
 * ■使用条款
 * 这个插件是在MIT许可下分发的。
 * 请自由使用。
 * http://opensource.org/licenses/mit-license.php
 */

(() => {
  const pluginName = 'invokeCommonAtEquipChange';
  //
  // process parameters
  //
  const parameters = PluginManager.parameters(pluginName);
  const defaultCommonId = Number(parameters['commonId'] || 0);
  const invokeTiming   = parameters['timing'] || 'wait';
  const doesInvokeAtNone = !!eval(parameters['doesInvokeAtNone']);
  const commonIdAtNone = Number(parameters['commonIdAtNone'] || 0);

  //
  // determine common event id to invoke
  //
  const commonIdForTheEquip = item => {
    if (item) {
      let commonId;
      if (commonId = item.meta.invokeCommonEventId) {
        return +commonId;
      }
    }
    return defaultCommonId;
  };

  const commonIdForRemoved = item => {
    if (item) {
      let commonId;
      if (commonId = item.meta.removeCommonEventId) {
        return +commonId;
      }
    }
    return commonIdAtNone;
  };

  const isImmediate = () => invokeTiming === 'immediate';

  const discardOldReservation = () => {
    if ("clearCommonEventReservation" in $gameTemp) { // MZ
      $gameTemp.clearCommonEventReservation();
    }
  };
  //
  // reserve common event
  //
  const _Scene_Equip_onItemOk = Scene_Equip.prototype.onItemOk;
  Scene_Equip.prototype.onItemOk = function() {
    const oldEquip = this.actor().equips()[this._slotWindow.index()];
    const itemToEquip = this._itemWindow.item();
    _Scene_Equip_onItemOk.call(this);
    /*if (itemToEquip) {
      discardOldReservation();
      $gameTemp.reserveCommonEvent(commonIdForTheEquip(itemToEquip));
    } else if (doesInvokeAtNone) {
      discardOldReservation();
      $gameTemp.reserveCommonEvent(commonIdForRemoved(oldEquip));
    }*/
    if (doesInvokeAtNone) {
      discardOldReservation();
      $gameTemp.reserveCommonEvent(commonIdForRemoved(oldEquip));
    }
    if (itemToEquip) {
      discardOldReservation();
      $gameTemp.reserveCommonEvent(commonIdForTheEquip(itemToEquip));
    }
    if (isImmediate()) {
      Scene_ItemBase.prototype.checkCommonEvent.call(this);
    }
  };

})();
