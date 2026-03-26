/*:
* @plugindesc (v1.07)状态层数
* @author 小c
* @version 1.0.7
* @date 8/2/2020
*
* @param Max State Floor
* @text 状态最高层数
* @type number
* @min 0
* @desc 默认状态最高层数
* @default 5
*
* @param State Added Type
* @text 状态叠加模式
* @type boolean
* @on 加法
* @off 乘法
* @desc 基础属性与特殊属性的叠加方式
* true - 加法模式  false - 乘法模式
* @default false
*
* @param Expired Remove Completely
* @text 状态解除模式
* @type boolean
* @on 完全解除
* @off 解除1层
* @desc 状态回合数归0时解除状态的行为
* true - 完全解除   false - 解除1层
* @default true
*
* @param Show State Floor
* @text 显示状态层数
* @type boolean
* @on 显示
* @off 隐藏
* @desc 是否在状态图标显示层数
* @default true
*
* @param Floor Text
* @text 层数显示文字
* @desc 层数显示区域的内容，%1表示状态层数的数字。
* @default %1层
* 
* @param Floor Font Size
* @text 层数显示字体大小
* @type number
* @min 0
* @desc 层数显示的字体大小
* @default 12
*
* @param Floor Font Color
* @text 层数显示字体颜色
* @type number
* @min 0
* @desc 层数显示的字体颜色
* @default 6
*
* @param Floor Buffer X
* @text 层数显示X偏移
* @desc 层数显示坐标的X偏移量
* @default 2
*
* @param Floor Buffer Y
* @text 层数显示Y偏移
* @desc 层数显示坐标的Y偏移量
* @default 6
*
* @help
* 状态层数定义，实现可叠加状态，并可选择数据叠加模式。
* 若使用了CP_PetCore，请把该插件放在它的上面。
*
* 叠加模式
* 叠加模式选择对基础属性【攻击力等】、特殊属性【经验值等】、元素抗性
* 【属性有效度】、DEBUFF抗性【弱化有效度】、状态抗性【状态有效度】生效。
*
* 叠加模式说明，此插件定义两种模式，其意义以HP为例说明。
* 设有两个特性效果
* A：最大HP * 110%，即最大HP + 10%
* B：最大HP * 80%，即最大HP - 20%
* 乘法模式：MV系统默认。
* A+A 得到 最大HP * 121%，即最大HP + 21%
* A+B 得到 最大HP * 88%，即最大HP - 12%
*
* 加法模式：所影响的属性以波动百分比进行加法叠加
* A+A 得到 最大HP + 20%，即最大HP * 120%
* A+B 得到 最大HP - 10%，即最大HP * 90%
*
* 在进行特性配置时依然按照乘法配置，即单特性欲实现最大HP + 10%，请直接
* 配置特性 最大HP * 110%，插件会根据配置进行对应的叠加运算。
*
* 元素抗性的叠加结果不会反号，举例说明
* 张三 职业为法外狂徒，拥有一件装备 四六级辅导材料
* 张三 物理伤害减免30%，即 物理 抗 30% 【物理 * 70%】
* 法外狂徒 物理伤害减免40%，即 物理 抗 40% 【物理 * 60%】
* 四六级辅导材料 物理伤害减免40%，即 物理 抗 40% 【物理 * 60%】
* 此时 张三将完全免疫物理伤害，即 物理 抗 100% 【物理 * 0%】，而不是 物
* 理 吸 10%。
* 关于元素抗性的损抗吸叠加模式的详细说明可参见游戏 轩辕剑叁：云和山的
* 彼端。
*
* 额外属性（命中率等）默认即为加法叠加，不提供叠加算法改变的需求。
*
* 状态层数
* 状态标签
* <State Can Added Floor> 状态为具有层数的可叠加状态
* <Max State Floor: x> 状态最高层数为x，0表示不限层数
* <Next Floor State: x> 下级状态为x，不配置则不存在下级状态
* 下级状态是指从第二层状态开始叠加的特性，每叠加1层将叠加一次下级状态
* 特性，若没有下级状态，则叠加原状态特性。
* 举例：中毒状态有HP自动恢复-10%，下级状态HP自动恢复-5%。
* 则1层中毒HP自动恢复为-10%，2层为-15%，3层为-20%。
* 多层状态只对状态特性有叠加作用，其他由插件引入的特性无效。
*
* 多层状态解除模式，当多重状态回合数归0时将执行不同的操作
* <Expired Remove Completely>
* 多层状态回合数归0时完全解除状态。
* <Expired Remove 1 Floor>
* 多层状态回合数归0时解除1层状态
*
* 物品/技能标签
* <Add State x Floor: y>
* 技能对目标添加状态x，一次叠加y层
* <Remove State x Floor: y>
* 技能对目标解除状态x，一次解除y层
* 以上标签中 x为状态id，y必须为正整数。
* 
* <Remove State Completely>
* 物品技能解除可叠加状态时会直接解状态。
* 未配置时为解除一层状态。
*
* 若此多层状态在战斗结束时解除，战斗结束后将完全解除状态。
*
* 角色/职业/武器/防具/敌人/状态标签
* <Expired Remove State x: y Floor>
* 多层状态x，当其回合数归0时解除y层状态
* 此效果会覆盖状态解除模式中的逐层解除模式，一次解除y层
* 一次性解除模式不受影响，回合数归0将完全解除。
* 当角色有多个此特性时，每次解除的层数取所有特性的平均数。
* 若最终结果y = 0，回合数归0将不解除状态。
* 没有此标签且解除模式为逐层解除时，解除1层状态。
*
* JavaScript函数
* battler.stateFloor(stateId) 返回指定状态的层数
* battler.removeStateCompletely(stateId) 完全解除指定状态，只对可叠加状态有
* 效
* battler.addStateMoreFloor(stateId, floor) 添加指定状态floor层
* battler.removeStateMoreFloor(stateId, floor) 解除指定状态floor层
* 上面两个函数中floor必须为正整数。
*
* 更新日志
* v1.00
* 插件完成
*
* v1.01
* 兼容YEP状态分类，使<Remove State Completely>对分类解状态有效。
* 可选择属性特性的叠加模式。
* 更改了部分插件参数的默认值。
*
* v1.02
* 增加技能/物品一次叠加/解除多层状态效果。
* 增加回合数归0时的操作选项【可能会干扰YEP状态核心的Leave接口】。
*
* v1.03
* 新增回合数归0时的状态解除层数配置。
*
* v1.04
* 添加战斗结束时完全解除状态的效果。
*
* v1.05
* 解决在YEP-ATB战斗系统下状态回合数归零解除错误的问题
*
* v1.06
* 解决未使用YEP_X_StateCategories时战斗结束状态结算错误的问题
*
* v1.07
* 解决因角色数据缺失引发的炸旧档问题
*/

var Imported = Imported || {};
Imported.CP_StateFloor = true;

var CP = CP || {};
CP.StateFloorManager = CP.StateFloorManager || {};
var params = PluginManager.parameters("CP_StateFloor");

CP.StateFloorManager.MAX_STATE_FLOOR = Number(params["Max State Floor"]) || 1;
CP.StateFloorManager.STATE_ADDED_TYPE = eval(params["State Added Type"]) || false;
CP.StateFloorManager.SHOW_STATE_FLOOR = eval(params["Show State Floor"]) || false;
CP.StateFloorManager.EXPIRED_REMOVE_COMPLETELY = eval(params["Expired Remove Completely"]) || false;

CP.StateFloorManager.FLOOR_TEXT = params["Floor Text"];
CP.StateFloorManager.FLOOR_FONT_SIZE = Number(params["Floor Font Size"]) || 18;
CP.StateFloorManager.FLOOR_FONT_COLOR = Number(params["Floor Font Color"]) || 0;
CP.StateFloorManager.FLOOR_BUFFER_X = Number(params["Floor Buffer X"]) || 0;
CP.StateFloorManager.FLOOR_BUFFER_Y = Number(params["Floor Buffer Y"]) || 0;

CP.StateFloorManager._loaded = false;
CP.StateFloorManager.DATABASE_LOADED = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function(){
	if(!CP.StateFloorManager.DATABASE_LOADED.call(this))
		return false;

	if(!CP.StateFloorManager._loaded){
		CP.StateFloorManager.loadStateFloor();
		CP.StateFloorManager.loadSkillItemData($dataSkills);
		CP.StateFloorManager.loadSkillItemData($dataItems);

		CP.StateFloorManager.loadExpiredRemoveStateFloor($dataActors);
		CP.StateFloorManager.loadExpiredRemoveStateFloor($dataClasses);
		CP.StateFloorManager.loadExpiredRemoveStateFloor($dataWeapons);
		CP.StateFloorManager.loadExpiredRemoveStateFloor($dataArmors);
		CP.StateFloorManager.loadExpiredRemoveStateFloor($dataEnemies);
		CP.StateFloorManager.loadExpiredRemoveStateFloor($dataStates);

		CP.StateFloorManager._loaded = true;
	}

	return true;
};

CP.StateFloorManager.loadStateFloor = function(){
	for(var i = 1; i < $dataStates.length; i++){
		var state = $dataStates[i];
		state.canAddedFloor = false;
		state.maxStateFloor = this.MAX_STATE_FLOOR;
		state.nextFloorState = state.id;
		state.expiredRemoveCompletely = this.EXPIRED_REMOVE_COMPLETELY;

		if(state.meta["State Can Added Floor"])
			state.canAddedFloor = true;
		if(state.meta["Max State Floor"]){
			var floor = Math.floor(Number(state.meta["Max State Floor"]) || 0);
			state.maxStateFloor = floor < 0 ? 0 : floor;
		}

		if(state.meta["Next Floor State"])
			state.nextFloorState = Number(state.meta["Next Floor State"]) || state.id;

		if(state.meta["Expired Remove Completely"])
			state.expiredRemoveCompletely = true;
		if(state.meta["Expired Remove 1 Floor"])
			state.expiredRemoveCompletely = false;;
	}
};

CP.StateFloorManager.loadSkillItemData = function(items){
	for(var i = 1; i < items.length; i++){
		var item = items[i];
		item.removeStateCompletely = false;
		item.stateMoreFloorsEffect = [];

		if(item.meta["Remove State Completely"])
			item.removeStateCompletely = true;

		var reg1 = /<Add State (\d+) Floor: (\d+)>/g;
		var reg2 = /<Remove State (\d+) Floor: (\d+)>/g;

		var ex;
		while(ex = reg1.exec(item.note)){
			var id = Number(ex[1]);
			var floor = Number(ex[2]);
			if(this.isStateCanAddedFloor(id))
				item.stateMoreFloorsEffect.push([1, id, floor]);
		}

		while(ex = reg2.exec(item.note)){
			var id = Number(ex[1]);
			var floor = Number(ex[2]);
			if(this.isStateCanAddedFloor(id))
				item.stateMoreFloorsEffect.push([-1, id, floor]);
		}
	}
};

CP.StateFloorManager.loadExpiredRemoveStateFloor = function(items){
	for(var i = 1; i < items.length; i++){
		var item = items[i];
		item.expiredRemoveStateFloors = [];
		var reg = /<Expired Remove State (\d+): (\d+) Floor>/g;

		var ex;
		while(ex = reg.exec(item.note)){
			var s = Number(ex[1]) || 0;
			var f = Number(ex[2]) || 0;

			if(s > 0 && f >= 0)
				item.expiredRemoveStateFloors.push({state: s, floor: f});
		}
	}
};

CP.StateFloorManager.isStateCanAddedFloor = function(stateId){
	if(!stateId || !$dataStates[stateId])
		return false;
	return !!$dataStates[stateId].canAddedFloor;
};

CP.StateFloorManager.maxStateFloor = function(stateId){
	if(!this.isStateCanAddedFloor(stateId))
		return -1;

	return $dataStates[stateId].maxStateFloor;
};

//----------------------------
//  DataManager
//----------------------------
CP.StateFloorManager.DATA_EXTRACT_SAVE_CONTENTS = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents){
	CP.StateFloorManager.DATA_EXTRACT_SAVE_CONTENTS.call(this, contents);
	$gameActors.initSaveStateFloors();
};

//----------------------------
//  Game_Actors
//----------------------------
//读档时初始化没有的参数
Game_Actors.prototype.initSaveStateFloors = function(){
	for(var i = 0; i < this._data.length; i++){
		var actor = this._data[i];
		if(!!actor)
			actor.initStateFloors();
	}
};

//----------------------------
//  Game_BattlerBase
//----------------------------
CP.StateFloorManager.CLEAR_BATTLER_STATES = Game_BattlerBase.prototype.clearStates;
Game_BattlerBase.prototype.clearStates = function() {
	CP.StateFloorManager.CLEAR_BATTLER_STATES.call(this);

	this.initStateFloors();
	if(Imported.YEP_X_StateCategories)
		this.setApplyingItem(null); //记录对此目标施加效果的物品
};

Game_BattlerBase.prototype.initStateFloors = function(){
	if(!this._statesFloor)
		this._statesFloor = [];
};

if(Imported.YEP_X_StateCategories){

Game_BattlerBase.prototype.setApplyingItem = function(item){
	this._applyingItem = item;
};

Game_BattlerBase.prototype.applyingItem = function(){
	return this._applyingItem;
};

}

Game_BattlerBase.prototype.expiredRemoveStateFloor = function(stateId){
	var data = this.getExpiredRemoveStateFloorData().filter(function(obj){
		return obj.state === stateId;
	}).map(function(obj){
		return obj.floor;
	});

	var s = 0;
	for(var i = 0; i < data.length; i++){
		s += data[i];
	}

	if(data.length === 0)
		return -1;

	return Math.floor(s / data.length);
};

Game_BattlerBase.prototype.getExpiredRemoveStateFloorData = function(){
	var objects = this.states();
	var datas = [];
	if(this.isActor())
		objects =  objects.concat(this.actor(), this.currentClass(), this.equips());
	else
		objects = objects.concat(this.enemy());

	objects.forEach(function(data){
		if(!!data)
			datas = datas.concat(data.expiredRemoveStateFloors);
	});

	return datas;
};

Game_BattlerBase.prototype.stateFloorData = function(stateId){
	for(var i = 0; i < this._statesFloor.length; i++){
		var data = this._statesFloor[i];
		if(data.state === stateId)
			return data;
	}

	return null;
};

Game_BattlerBase.prototype.stateFloor = function(stateId){
	var data = this.stateFloorData(stateId);

	if(!data)
		return 0;
	else
		return data.floor;
};

Game_BattlerBase.prototype.refreshStateFloor = function(){
	this._statesFloor = this._statesFloor.filter(function(data){
		return data.floor > 0;
	});
};

Game_BattlerBase.prototype.addNewStateFloor = function(stateId){
	if(!CP.StateFloorManager.isStateCanAddedFloor(stateId))  return;

	var state = $dataStates[stateId];
	var data = {state: stateId, floor: 1};

	this._statesFloor.push(data);
};

Game_BattlerBase.prototype.addStateFloor = function(stateId){
	var data = this.stateFloorData(stateId);
	if(!data)
		this.addNewStateFloor(stateId);
	else{
		var maxFloor = CP.StateFloorManager.maxStateFloor(stateId)
		if(maxFloor === 0 || data.floor < maxFloor)
			data.floor++;
	}
};

Game_BattlerBase.prototype.removeStateFloor = function(stateId){
	var data = this.stateFloorData(stateId);

	if(!!data){
		data.floor--;
	}
};

Game_BattlerBase.prototype.clearStateFloor = function(stateId){
	var data = this.stateFloorData(stateId);
	if(!!data)
		data.floor = 0;
};

CP.StateFloorManager.BATTLER_TRAIT_OBJECTS = Game_BattlerBase.prototype.traitObjects;
Game_BattlerBase.prototype.traitObjects = function(){
	return CP.StateFloorManager.BATTLER_TRAIT_OBJECTS.call(this).concat(this.allFloorStates());
};

Game_BattlerBase.prototype.allFloorStates = function(){
	var objects = new Array();
	this._statesFloor.forEach(function(data){
		var state = $dataStates[$dataStates[data.state].nextFloorState];
		var count = data.floor - 1;

		while(count > 0){
			objects.push(state);
			count--;
		}
	});

	return objects;
};

CP.StateFloorManager.BATTLER_TRAITS_PI = Game_BattlerBase.prototype.traitsPi;
Game_BattlerBase.prototype.traitsPi = function(code, id){
    if(CP.StateFloorManager.STATE_ADDED_TYPE)
    	return this.traitsPiToSum(code, id);
    else
    	return CP.StateFloorManager.BATTLER_TRAITS_PI.call(this, code, id);
};

Game_BattlerBase.prototype.traitsPiToSum = function(code, id){
	var traits = this.traitsWithId(code, id);
	var rate = 0;

	for(var i = 0; i < traits.length; i++){
		var value = traits[i].value - 1;
		rate += value;
	}

	rate += 1;

	return rate < 0 ? 0 : rate;
};

if(!Imported.YEP_BuffsStatesCore){

Game_BattlerBase.prototype.statesAndBuffs = function(){
	var group = this.states();
    var length = group.length;
    var array = [];
    for(var i = 0; i < length; ++i){
		var state = group[i];
		if(state && state.iconIndex > 0) array.push(state);
    }
    for (var i = 0; i < 8; ++i){
    	if (this._buffs[i]) array.push(i);
    }
    return array;
};

}

//----------------------------
//  Game_Battler
//----------------------------
CP.StateFloorManager.ADD_BATTLER_STATE = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId){
	CP.StateFloorManager.ADD_BATTLER_STATE.call(this, stateId);
    if(CP.StateFloorManager.isStateCanAddedFloor(stateId) && this.isStateAddable(stateId))
    	this.addStateFloor(stateId);
};

Game_Battler.prototype.needRemoveAuto = function(stateId){
	return this._stateTurns[stateId] <= 0;
};

CP.StateFloorManager.REMOVE_BATTLER_STATE = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId){
	if(this.isStateAffected(stateId)){
		if(!CP.StateFloorManager.isStateCanAddedFloor(stateId))
			CP.StateFloorManager.REMOVE_BATTLER_STATE.call(this, stateId);
		else{
			var state = $dataStates[stateId];
			var exp = this.needRemoveAuto(stateId);
			var count = this.expiredRemoveStateFloor(stateId)
			if(count < 0 || !exp)
				this.removeStateFloor(stateId);
			else{
				for(var i = 0; i < count; i++)
					this.removeStateFloor(stateId);
			}
			if(exp)
				this.resetStateCounts(stateId);
			if(this.stateFloor(stateId) <= 0 || (exp && state && state.expiredRemoveCompletely)){
				CP.StateFloorManager.REMOVE_BATTLER_STATE.call(this, stateId);
				this.clearStateFloor(stateId);
				this.refreshStateFloor();
			}
		}
	}
};

Game_Battler.prototype.removeStateCompletely = function(stateId){
	if(CP.StateFloorManager.isStateCanAddedFloor(stateId) && this.isStateAffected(stateId)){
		this.clearStateFloor(stateId);
		CP.StateFloorManager.REMOVE_BATTLER_STATE.call(this, stateId);
		this.refreshStateFloor(); 
	}
};

Game_Battler.prototype.addStateMoreFloor = function(stateId, floor){
	if(floor > 0 && CP.StateFloorManager.isStateCanAddedFloor(stateId)){
		for(var i = 0; i < floor; i++)
			this.addState(stateId);
	}
};

Game_Battler.prototype.removeStateMoreFloor = function(stateId, floor){
	if(floor > 0 && CP.StateFloorManager.isStateCanAddedFloor(stateId)){
		for(var i = 0; i < floor; i++)
			this.removeState(stateId);
	}
};

CP.StateFloorManager.REMOVE_BATTLE_STATE = Game_Battler.prototype.removeBattleStates;
Game_Battler.prototype.removeBattleStates = function(){
	CP.StateFloorManager.REMOVE_BATTLE_STATE.call(this);

    this.states().forEach(function(state){
        if(state.removeAtBattleEnd && CP.StateFloorManager.isStateCanAddedFloor(state.id)){
            this.removeStateCompletely(state.id);
        }
    }, this);
};

if(Imported.YEP_X_StateCategories){

CP.StateFloorManager.REMOVE_BATTLER_STATE_CATEGORY_EFFECT = Game_Battler.prototype.removeStateCategoryEffect;
Game_Battler.prototype.removeStateCategoryEffect = function(obj, user){
	var item = this.applyingItem();
	var floorData = JSON.parse(JSON.stringify(this._statesFloor));
	CP.StateFloorManager.REMOVE_BATTLER_STATE_CATEGORY_EFFECT.call(this, obj, user);

	floorData.forEach(function(data){
		var state = $dataStates[data.state];

		if(state && item && item.removeStateCompletely && this.stateFloor(data.state) < data.floor)
			this.removeStateCompletely(data.state);
	}, this);
};

//----------------------------
// Game_Action
//----------------------------

CP.StateFloorManager.APPLY_STATE_CATEGORY_REMOVAL_EFFECT = Game_Action.prototype.applyStateCategoryRemovalEffect;
Game_Action.prototype.applyStateCategoryRemovalEffect = function(target) {
  target.setApplyingItem(this.item());

  CP.StateFloorManager.APPLY_STATE_CATEGORY_REMOVAL_EFFECT.call(this, target);

  target.setApplyingItem(null);
};

}

CP.StateFloorManager.ITEM_EFFECT_REMOVE_STATE = Game_Action.prototype.itemEffectRemoveState;
Game_Action.prototype.itemEffectRemoveState = function(target, effect){
	var item = this.item();
	var floor = target.stateFloor(effect.dataId);
	CP.StateFloorManager.ITEM_EFFECT_REMOVE_STATE.call(this, target, effect);
	if(floor > 0 && item.removeStateCompletely){
		var nf = target.stateFloor(effect.dataId);
		if(nf < floor) //成功解除
			target.removeStateCompletely(effect.dataId);
	}
};

CP.StateFloorManager.APPLY_ACTION_ITEM_USER_EFFECT = Game_Action.prototype.applyItemUserEffect
Game_Action.prototype.applyItemUserEffect = function(target){
	CP.StateFloorManager.APPLY_ACTION_ITEM_USER_EFFECT.call(this, target);

	this.changeMoreStateFloor(target);
};

Game_Action.prototype.execStateFloorChange = function(target, effect){
	if(effect[0] > 0)
		target.addStateMoreFloor(effect[1], effect[2]);
	else if(effect[0] < 0)
		target.removeStateMoreFloor(effect[1], effect[2]);
};

Game_Action.prototype.changeMoreStateFloor = function(target){
	var effects = this.item().stateMoreFloorsEffect;
	effects.forEach(function(effect){
		this.execStateFloorChange(target, effect);
	}, this);
};

//----------------------------
//  Window_Base  我方状态显示
//----------------------------
Window_Base.prototype.drawActorStateFloor = function(actor, wx, wy, ww){
	var iw = Window_Base._iconWidth;
	var icons = actor.allIcons().slice(0, Math.floor(ww / iw));
	var max = icons.length;
	var shownMax = Math.floor(ww / iw);
	for(var i = 0; i < actor.states().length; i++){
		if(shownMax <= 0) break;

		var state = actor.states()[i];
		if(state.iconIndex <= 0) continue;

		if(CP.StateFloorManager.SHOW_STATE_FLOOR && CP.StateFloorManager.isStateCanAddedFloor(state.id))
			this.drawStateFloor(actor, state, wx, wy);
		
		wx += iw;
		--shownMax;
	}
};

Window_Base.prototype.drawStateFloor = function(actor, state, wx, wy){
	wx += CP.StateFloorManager.FLOOR_BUFFER_X;
	wy += CP.StateFloorManager.FLOOR_BUFFER_Y;
	var floor = actor.stateFloor(state.id);
	this.changePaintOpacity(true);
	this.changeTextColor(this.textColor(CP.StateFloorManager.FLOOR_FONT_COLOR));
	this.contents.fontSize = CP.StateFloorManager.FLOOR_FONT_SIZE;
	this.drawText(CP.StateFloorManager.FLOOR_TEXT.format(floor), wx, wy, Window_Base._iconWidth, "left");
	this.resetFontSettings();
	this.resetTextColor();
};

CP.StateFloorManager.DRAW_ACTOR_ICONS = Window_Base.prototype.drawActorIcons;
Window_Base.prototype.drawActorIcons = function(actor, wx, wy, ww){
	ww = ww || 144;

	CP.StateFloorManager.DRAW_ACTOR_ICONS.call(this, actor, wx, wy, ww);
	this.drawActorStateFloor(actor, wx, wy, ww);
};

//----------------------------
//  Sprite_StateIcon  敌人状态显示
//----------------------------
CP.StateFloorManager.INIT_SPRITE_STATE_ICON_MEMBERS = Sprite_StateIcon.prototype.initMembers;
Sprite_StateIcon.prototype.initMembers = function(){
	CP.StateFloorManager.INIT_SPRITE_STATE_ICON_MEMBERS.call(this);

    this._floorSprite = new Sprite();
    this.addChild(this._floorSprite);
    this._floorSprite.anchor.x = 0.5;
    this._floorSprite.anchor.y = 0.5;
    var w = Window_Base._iconWidth;
    var h = Window_Base._iconHeight;
    this._floorSprite.bitmap = new Bitmap(w, h);
};

CP.StateFloorManager.UPDATE_SPRITE_STATE_ICON_FRAME = Sprite_StateIcon.prototype.updateFrame;
Sprite_StateIcon.prototype.updateFrame = function() {
	CP.StateFloorManager.UPDATE_SPRITE_STATE_ICON_FRAME.call(this);

	this.updateStateFloor();
};

Sprite_StateIcon.prototype.updateStateFloor = function(){
	this._floorSprite.bitmap.clear();
	if(!this._battler)  return;
	var group = this._battler.statesAndBuffs();
	if(group.length <= 0)  return;

	var state = group[this._animationIndex];
	if(CP.StateFloorManager.SHOW_STATE_FLOOR && CP.StateFloorManager.isStateCanAddedFloor(state.id))
		this.drawStateFloor(state);
};

if(!Imported.YEP_BuffsStatesCore){

Sprite_StateIcon.prototype.textColor = function(n) {
    return SceneManager._scene._statusWindow.textColor(n);
};

}

Sprite_StateIcon.prototype.drawStateFloor = function(state){
	if(!state)  return;
	if(!CP.StateFloorManager.isStateCanAddedFloor(state.id))  return;
	var floor = this._battler.stateFloor(state.id);
	var wx = CP.StateFloorManager.FLOOR_BUFFER_X;
	var wy = CP.StateFloorManager.FLOOR_BUFFER_Y;
	var ww = Window_Base,_iconWidth;
	var wh = Window_Base.prototype.lineHeight.call(this);
	var contents = this._floorSprite.bitmap;
	contents.fontSize = CP.StateFloorManager.FLOOR_FONT_SIZE;
	contents.textColor = this.textColor(CP.StateFloorManager.FLOOR_FONT_COLOR);
	contents.drawText(CP.StateFloorManager.FLOOR_TEXT.format(floor), wx, wy, ww, wh, "left");
};