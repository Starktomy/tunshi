/*:
-------------------------------------------------------------------------
@title Common Event Queue
@author Hime
@date Nov 5, 2015
-------------------------------------------------------------------------
@plugindesc 允许同时运行多个公共事件。
@help 
-------------------------------------------------------------------------
== 介绍 ==

默认情况下，如果尝试运行多个公共事件，引擎只会执行最后一个。 

该插件允许调用多个公共事件并确保引擎执行每个事件。 

== 使用条款 ==

- 免费用于有信用的非商业项目
- 商业用途请联系我

== Change Log ==
Nov 5, 2015
  - Fixed error where I cleared out Imported
Oct 27, 2015
  - Initial release
 
== 用法 == 

即插即用
-------------------------------------------------------------------------
 */ 
var Imported = Imported || {} 
var TH = TH || {};
Imported.CommonEventQueue = 1;
TH.CommonEventQueue = TH.CommonEventQueue || {};

(function ($) {

  var TH_CommonEventQueue_GameTemp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function() {
    TH_CommonEventQueue_GameTemp_initialize.call(this);
    this._commonEventQueue = [];
  };
  
  Game_Temp.prototype.reserveCommonEvent = function(commonEventId) {
    if (commonEventId > 0) {
      this._commonEventQueue.push(commonEventId);
    }
  };
  
  Game_Temp.prototype.isCommonEventReserved = function() {
    return this._commonEventQueue.length > 0;
  };
  
  Game_Temp.prototype.reservedCommonEvent = function() {
    var id = this._commonEventQueue.shift()    
    return $dataCommonEvents[id];
};
})(TH.CommonEventQueue);