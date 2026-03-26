//=============================================================================
  /*:
 * @plugindesc v1.00 BattleDissuade 战斗劝阻
 * @author 流逝的岁月
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 *
 * 这个插件会让你在战斗时,新增一个选项,可以让你在不战斗的情况下胜利
 *
 *
 *---------------------------------------------------------
 *
 *使用条例：本插件完全免费，随意魔改
 * 
 *---------------------------------------------------------
 *
 *
 *

 *
 *
 *
 * 注意:在对抗多个敌人中,会选择优先级高的敌人的全部数据,如果敌人优先级别相同,则会按照敌人ID优先级高的作为敌人的全部数据
 * 同理,职业,角色,技能,物品,护甲,武器,敌人也是同理
 *
 *
 * 在遇到敌人的规则是这样的:
 * 敌人群中会选择优先级最高的敌人
 * 武器中会使用我方所有单位所装备的武器中选择优先级最高的武器
 * 护甲中会使用我方所有单位所装备的武器中选择优先级最高的装甲
 * 物品中会使用背包中所有物品中选择优先级最高的物品
 * 技能中会使用我方所有单位所有技能中选择优先级最高的技能
 * 角色中会使用我方所有角色中优先级最高的角色
 * 职业会使用我方所有角色所有职业中优先级最高的职业
 *
 * 以此判断是否会出现或激活劝降的显示
 * 同时劝降的概率是可以累加或是相减的,范围在0~100之间,100代表概率为100%
 *
 *
 * 注意:除了武器外，所有的类型都被视为'护甲'装备,包括首饰项链...盔甲等一系列装备,因此代表,只会享有一种加成效果,请注意
 * 注意:请填写设置优先级标签，未填写优先级标签的对象的默认优先级为0
 * 
 *
 * 注意:在'劝降概率'中,你可以填写一段公式来满足要求,以下是你可以用到的数据信息
 *
 *
 * variables[x]                  //x替换为数值ID,全局变量值
 * switchs[x]                    //x替换为数值ID,全局开关值
 * enemy                        //优先级最高的敌人对象
 * weapon                       //优先级最高的武器对象(可能为 空 请注意)
 * armor                        //优先级最高的护甲对象(可能为 空 请注意)
 * item                         //优先级最高的道具对象(可能为 空 请注意)
 * skill                        //优先级最高的技能对象(可能为 空 请注意)
 * actor                        //优先级最高的角色对象
 * aclass                       //优先级最高的职业对象
 * a                            //我方优先级最高的对象数据
 * b                            //敌方优先级最高的对象数据
 *
 * a.mhp                        //对象最大生命值
 * a.hp                         //对象目前生命值
 * a.mmp                        //对象最大魔法值
 * a.mp                         //对象目前魔法值
 * a.atk                        //对象攻击
 * a.def                        //对象防御
 * a.mat                        //对象魔攻
 * a.mdf                        //对象魔抗
 * a.agi                        //对象敏捷
 * a.luk                        //对象幸运
 *
 * b.mhp                        //对象最大生命值
 * b.mmp                        //对象最大魔法值
 * b.atk                        //对象攻击
 * b.def                        //对象防御
 * b.mat                        //对象魔攻
 * b.mdf                        //对象魔抗
 * b.agi                        //对象敏捷
 * b.luk                        //对象幸运
 *
 *
 *
 *
 *
 *------------------------------------------------------------------------------------------
 * 以下是一些标签和插件指令 
 * 你可以在 职业 角色 技能 物品 护甲 武器 敌人 中,为其备注中,添加以下的标签:
 * 注意之间的优先级: 插件参数 < 职业 < 角色 < 技能 < 物品 < 护甲 < 武器 < 敌人
 *
 *
 * 比方说你的角色拥有标签<ZzyBDF Enable> 而插件参数'激活菜单项'设置为false,那么只要角色上场,依然会拥有'劝降'激活效果
 * 比方说敌人拥有标签<ZzyBDF Remove> 而你的武器拥有<ZzyBDF Insert>效果,那么也无法出现'劝降'选项
 *
 *
 * <ZzyBDF Enable>                   //在场时允许'劝降'被激活,这个优先级会大于插件参数的设置
 * <ZzyBDF Disable>                  //在场时使'劝降'无法被激活,这个优先级会大于插件参数的设置
 * <ZzyBDF Insert>                   //在场时使'劝降'出现,这个优先级会大于插件参数的设置
 * <ZzyBDF Remove>                   //在场时隐藏'劝降'出现,这个优先级会大于插件参数的设置
 * <ZzyBDF Level: x>                 //请将x填写整数,这代表优先级,数值越大则优先级越高,优先级高则会作为所使用的效果
 * 
 * <ZzyBDF Rate: +x>                 //这会提升基础劝降的概率,填写范围(0~100),基础劝降概率为插件参数中所填写的内容
 * <ZzyBDF Rate: -x>                 //这会减少基础劝降的概率,填写范围(0~100),基础劝降概率为插件参数中所填写的内容
 * <ZzyBDF RatePer: +x>              //这会提升基础劝降概率的(0~100)的百分比,填写范围(0~100),基础劝降概率为插件参数中所填写的内容
 * <ZzyBDF RatePer: -x>              //这会减少基础劝降概率的(0~100)的百分比,填写范围(0~100),基础劝降概率为插件参数中所填写的内容
 * 
 *  
 * 以下是一些标签和插件指令 
 * 你可以在 角色 敌人 中,为其备注中,添加以下的标签:
 * 注意之间的优先级: 插件参数 < 角色 < 敌人
 *
 * <ZzyBDF InText: x>                //设置为专属的劝降语录,多条语录用'&'进行隔开,注意特殊字符'%1',依然是敌人团队的名称
 * <ZzyBDF InText: x&x&x...>
 * <ZzyBDF FailText: x>              //设置为专属的劝降语录,多条语录用'&'进行隔开,注意特殊字符'%1',依然是敌人团队的名称
 * <ZzyBDF FailText: x&x&x...>       
 * <ZzyBDF WinText: x>               //设置为专属的劝降语录,多条语录用'&'进行隔开,注意特殊字符'%1',依然是敌人团队的名称
 * <ZzyBDF WinText: x&x&x...>        
 *
 * //设置为专属劝降时触发的音效,请填写正确的格式内容,x1为audio/se文件夹中的文件名,x2为音量,x3为音调,x4为声道
 * <ZzyBDF InSound: x1,x2,x3,x4>    
 * <ZzyBDF FailSound: x1,x2,x3,x4> 
 * <ZzyBDF WinSound: x1,x2,x3,x4> 
 *
 *
 *
 *
 *
 * 插件命令
 *----------Command Plugin----------------
 
 ZzyBDF EnableMenu                          //这会激活选项菜单
 ZzyBDF DisableMenu                         //这会隐藏选项菜单
 ZzyBDF InsertMenu                          //这会添加选项菜单
 ZzyBDF RemoveMenu                          //这会隐藏选项菜单
 ZzyBDF CommandName x                       //这会改变显示选项的名称,x替换为显示的名称
 
 ZzyBDF Bissuade Frame x                    //这会改变劝降等待的时长,这可以是一个公式
 ZzyBDF Bissuade Rate x                     //这会改变劝降概率 这可以是一个公式
 ZzyBDF Bissuade Count x                    //这会改变劝降次数 这可以是一个公式
 ZzyBDF Bissuade Over x(Disable/Remove)     //达到劝降次数，可选值Disable(未激活),Remove(隐藏)
 
 ZzyBDF EarnExp x(true/false)               //这会导致劝降胜利后,是否可以获得经验值
 ZzyBDF EarnCoin x(true/false)              //这会导致劝降胜利后,是否可以获得金币
 ZzyBDF EarnItem x(true/false)              //这会导致劝降胜利后,是否可以获得掉落物


 
--------------------------------------------------
日志:





 我叫坂本：1.00v 完成插件
 
---------------------------------------------------


 * @param ---菜单设置---
 * @default
  
 * @param EnableMenu
 * @text 激活菜单项
 * @parent ---菜单设置---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 战斗时在菜单栏中'劝降'是否是激活状态
 * YES - true     NO - false
 * @default true
  
 * @param InsertMenu
 * @text 添加菜单项
 * @parent ---菜单设置---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 战斗时在菜单栏中是否添加'劝降'
 * YES - true     NO - false
 * @default true
 *
 *
 * @param MenuCommandName
 * @text 战斗显示名称
 * @parent ---菜单设置---
 * @type text
 * @desc 战斗时菜单上显示选项的名称，默认名称'劝降'
 * @default 劝降
 *
 *
 *
 * @param ---游戏设置---
 * @default
 *
 * @param BissuadeFrame
 * @text 劝降时长
 * @parent ---游戏设置---
 * @type text
 * @desc 在进行劝降时,需要等待的时长,才会出现劝降的判定结果,以帧作为单位,默认值60,注意这可以是一个公式
 * @default 60
 *
 *
 * @param BissuadeRate
 * @text 劝降概率
 * @parent ---游戏设置---
 * @type text
 * @desc 这是进行劝降时,会成功的概率,范围在0~100之间,代表百分比,注意这可以是一个公式
 * @default 100
 *
 * @param BissuadeCount
 * @text 劝降次数
 * @parent ---游戏设置---
 * @type text
 * @desc 这是允许进行劝降的次数,超过次数后劝降就会未激活或是隐藏,如果想可以无限劝降,可以设置值高一些(推荐999),注意这可以是一个公式
 * @default 999
 *
 * @param BissuadeOver
 * @text 达到劝降次数
 * @parent ---游戏设置---
 * @type combo
 * @option Disable
 * @option Remove
 * @desc 达到劝降的最大次数后,会执行的内容,'Disable'为'劝降'菜单未激活状态,'Remove'为'劝降菜单'被隐藏
 * @default Disable
 *
 * 
 * @param ---规则设置---
 * @default
 *
 * @param IsEarnExp
 * @parent ---规则设置---
 * @text 是否获得经验
 * @type boolean
 * @on YES
 * @off NO
 * @desc 通过'劝降'结束战斗小队是否会获得经验
 * YES - true     NO - false
 * @default true
 *
 * @param IsEarnCoin
 * @parent ---规则设置---
 * @text 是否获得金币
 * @type boolean
 * @on YES
 * @off NO
 * @desc 通过'劝降'结束战斗小队是否会获得金币
 * YES - true     NO - false
 * @default true
 *
 * @param IsEarnItem
 * @parent ---规则设置---
 * @text 是否获得掉落物
 * @type boolean
 * @on YES
 * @off NO
 * @desc 通过'劝降'结束战斗小队是否会获得掉落物
 * YES - true     NO - false
 * @default true
 *
 * @param ---文本设置---
 * @default
 *
 * @param DissuadingText
 * @text 劝降时显示内容
 * @parent ---文本设置---
 * @type []
 * @desc 当进行劝降时,会在以下内容中随机抽取一条用于显示,'%1'会被替换为战斗时敌人团队的名称
 * @default ["正在尝试说服%1投降","%1,给句痛快话,投降不投降"]
 *
 * @param DissuadeFailText
 * @text 劝降失败显示内容
 * @parent ---文本设置---
 * @type []
 * @desc 劝降失败时,会在以下内容中随机抽取一条用于显示,'%1'会被替换为战斗时敌人团队的名称
 * @default ["劝降失败","%1表示:誓死不屈"]
 *
 * @param DissuadeWinText
 * @text 劝降成功显示内容
 * @parent ---文本设置---
 * @type []
 * @desc 劝降成功时,会在以下内容中随机抽取一条用于显示,'%1'会被替换为战斗时敌人团队的名称
 * @default ["劝降成功","不用丝毫战斗就战胜了%1!"]
 *
 *
 *
 * @param ---声音设置---
 * @default
 *
 * @param InSound
 * @text 劝降时音效
 * @parent ---声音设置---
 * @type text
 * @desc 劝降时产生的声音,请填写audio/se文件夹中的文件名,不包含m4a.ogg的后缀名,未填写则不会播放声音
 * @default Cat
 *
 * @param InVolume
 * @text 劝降时音量
 * @parent ---声音设置---
 * @type number
 * @min 0
 * @desc 劝降时产生的音量,默认值100
 * @default 100
 *
 * @param InPitch
 * @text 劝降时音调
 * @parent ---声音设置---
 * @type number
 * @min 0
 * @desc 劝降时产生的音调,默认值100
 * @default 100
 *
 * @param InPan
 * @text 劝降时声道
 * @parent ---声音设置---
 * @type number
 * @desc 劝降时产生的声道,默认值0
 * @default 0
 *
 *
 * @param WinSound
 * @text 劝降胜利时音效
 * @parent ---声音设置---
 * @type text
 * @desc 劝降胜利时产生的声音,请填写audio/se文件夹中的文件名,不包含m4a.ogg的后缀名,未填写则不会播放声音
 * @default Dog
 *
 * @param WinVolume
 * @text 劝降胜利时音量
 * @parent ---声音设置---
 * @type number
 * @min 0
 * @desc 劝降胜利时产生的音量,默认值100
 * @default 100
 *
 * @param WinPitch
 * @text 劝降胜利时音调
 * @parent ---声音设置---
 * @type number
 * @min 0
 * @desc 劝降胜利时产生的音调,默认值100
 * @default 100
 *
 * @param WinPan
 * @text 劝降胜利时声道
 * @parent ---声音设置---
 * @type number
 * @desc 劝降胜利时产生的声道,默认值0
 * @default 0
 *
 *
 * @param FailSound
 * @text 劝降失败时音效
 * @parent ---声音设置---
 * @type text
 * @desc 劝降失败时产生的声音,请填写audio/se文件夹中的文件名,不包含m4a.ogg的后缀名,未填写则不会播放声音
 * @default Cow
 *
 * @param FailVolume
 * @text 劝降失败时音量
 * @parent ---声音设置---
 * @type number
 * @min 0
 * @desc 劝降失败时产生的音量,默认值100
 * @default 100
 *
 * @param FailPitch
 * @text 劝降失败时音调
 * @parent ---声音设置---
 * @type number
 * @min 0
 * @desc 劝降失败时产生的音调,默认值100
 * @default 100
 *
 * @param FailPan
 * @text 劝降失败时声道
 * @parent ---声音设置---
 * @type number
 * @desc 劝降失败时产生的声道,默认值0
 * @default 0
 *
 *
 *
 *
 *
 *
 *
 *
 * @param ---脚本设置---
 * @default
 * 
 * @param FailScript
 * @text 劝降失败后
 * @parent ---脚本设置---
 * @type note
 * @desc 
 * @default ""
 *
 *
 * @param WinScript
 * @text 劝降成功后
 * @parent ---脚本设置---
 * @type note
 * @desc 
 * @default ""
 *
 *
 *
 *
 *
 */

var LiuYue = LiuYue || {};
LiuYue.LiuYue_BattleDissuade = true;//插件启动



var Zzy = Zzy || {};
Zzy.BDF = Zzy.BDF || {};
Zzy.BDF.version = 1.00;  
Zzy.Parameters = PluginManager.parameters('LiuYue_BattleDissuade');
Zzy.Param = Zzy.Param || {};
 
Zzy.Param.BDFEnableMenu = eval(String(Zzy.Parameters['EnableMenu']));
Zzy.Param.BDFInsertMenu = eval(String(Zzy.Parameters['InsertMenu']));
Zzy.Param.BDFMenuCommandName = String(Zzy.Parameters['MenuCommandName']);

Zzy.Param.BCFBissuadeFrame = String(Zzy.Parameters['BissuadeFrame']);//劝降时长-公式
Zzy.Param.BDFBissuadeRate = String(Zzy.Parameters['BissuadeRate']);//劝降概率-公式
Zzy.Param.BDFBissuadeCount = String(Zzy.Parameters['BissuadeCount']);//劝降次数-公式
Zzy.Param.BDFBissuadeOver = String(Zzy.Parameters['BissuadeOver']);//达到劝降次数

Zzy.Param.BDFIsEarnExp = eval(String(Zzy.Parameters['IsEarnExp']));//获取经验
Zzy.Param.BDFIsEarnCoin = eval(String(Zzy.Parameters['IsEarnCoin']));//获取金币
Zzy.Param.BDFIsEarnItem = eval(String(Zzy.Parameters['IsEarnItem']));//获取掉落物

Zzy.Param.BDFFailScript = new Function(JSON.parse(Zzy.Parameters['FailScript']));//失败脚本
Zzy.Param.BDFWinScript = new Function(JSON.parse(Zzy.Parameters['WinScript']));//成功脚本

Zzy.Param.BCFDissuadingText = eval(String(Zzy.Parameters['DissuadingText']));//劝降时显示内容 文本组
Zzy.Param.BCFDissuadeFailText = eval(String(Zzy.Parameters['DissuadeFailText']));//劝降失败显示内容 文本组
Zzy.Param.BCFDissuadeWinText = eval(String(Zzy.Parameters['DissuadeWinText']));//劝降成功显示内容 文本组



//---------------------------Sound-----------------------
Zzy.BDF.MakeSE = function(seName,seVolume,sePitch,sePan)
{
	if(!seName)return undefined;
	var se = {
		name:seName,
		volume:(seVolume ? seVolume : 100),
		pitch:(sePitch ? sePitch : 100),
		pan:(sePan ? sePan : 0)
	};
	return se;
}

Zzy.Param.BDFInSound = String(Zzy.Parameters['InSound']);//音效
Zzy.Param.BDFInVolume = parseInt(Zzy.Parameters['InVolume']);//音量
Zzy.Param.BDFInPitch = parseInt(Zzy.Parameters['InPitch']);//音调
Zzy.Param.BDFInPan = parseInt(Zzy.Parameters['InPan']);//声道
Zzy.Param.BDFInSE = Zzy.BDF.MakeSE(Zzy.Param.BDFInSound,Zzy.Param.BDFInVolume,Zzy.Param.BDFInPitch,Zzy.Param.BDFInPan);

Zzy.Param.BDFWinSound = String(Zzy.Parameters['WinSound']);//音效
Zzy.Param.BDFWinVolume = parseInt(Zzy.Parameters['WinVolume']);//音量
Zzy.Param.BDFWinPitch = parseInt(Zzy.Parameters['WinPitch']);//音调
Zzy.Param.BDFWinPan = parseInt(Zzy.Parameters['WinPan']);//声道
Zzy.Param.BDFWinSE = Zzy.BDF.MakeSE(Zzy.Param.BDFWinSound,Zzy.Param.BDFWinVolume,Zzy.Param.BDFWinPitch,Zzy.Param.BDFWinPan);

Zzy.Param.BDFFailSound = String(Zzy.Parameters['FailSound']);//音效
Zzy.Param.BDFFailVolume = parseInt(Zzy.Parameters['FailVolume']);//音量
Zzy.Param.BDFFailPitch = parseInt(Zzy.Parameters['FailPitch']);//音调
Zzy.Param.BDFFailPan = parseInt(Zzy.Parameters['FailPan']);//声道
Zzy.Param.BDFFailSE = Zzy.BDF.MakeSE(Zzy.Param.BDFFailSound,Zzy.Param.BDFFailVolume,Zzy.Param.BDFFailPitch,Zzy.Param.BDFFailPan);



Zzy.BDF.BdCommand = 'zzybdfcom';//命令




//=================================================================
//Game_System
//=================================================================
Zzy.BDF.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() 
{
    Zzy.BDF.Game_System_initialize.call(this);
	
	this.ZzyBDFInitData();//初始化
	
};

Game_System.prototype.ZzyBDFInitData = function()
{
	this._ZzyBDFEnableMenu = Zzy.Param.BDFEnableMenu;
	this._ZzyBDFInsertMenu = Zzy.Param.BDFInsertMenu;
	this._ZzyBDFMenuCommandName = Zzy.Param.BDFMenuCommandName;
	
	this._ZzyBCFBissuadeFrame = Zzy.Param.BCFBissuadeFrame;//这会改变劝降等待时长 这可以是一个公式
	this._ZzyBDFBissuadeRate = Zzy.Param.BDFBissuadeRate;//这会改变劝降概率 这可以是一个公式
	this._ZzyBDFBissuadeCount = Zzy.Param.BDFBissuadeCount;//这会改变劝降次数 这可以是一个公式
	this._ZzyBDFBissuadeOver = Zzy.Param.BDFBissuadeOver;//达到劝降次数，可选值Disable(未激活),Remove(隐藏)	
	
	this._ZzyBDFIsEarnExp = Zzy.Param.BDFIsEarnExp;//获取经验
	this._ZzyBDFIsEarnCoin = Zzy.Param.BDFIsEarnCoin;//获取金币
	this._ZzyBDFIsEarnItem = Zzy.Param.BDFIsEarnItem;//获取掉落物
	
	
}


Game_System.prototype.setZzyBDFEnableMenu = function(isEnable)
{this._ZzyBDFEnableMenu = isEnable;}

Game_System.prototype.setZzyBDFInsertMenu = function(isEnable)
{this._ZzyBDFInsertMenu = isEnable;}

Game_System.prototype.setZzyBDFMenuCommandName = function(name)
{this._ZzyBDFMenuCommandName = name;}

Game_System.prototype.getZzyBDFEnableMenu = function()
{return this._ZzyBDFEnableMenu;}

Game_System.prototype.getZzyBDFInsertMenu = function()
{return this._ZzyBDFInsertMenu;}

Game_System.prototype.getZzyBDFMenuCommandName = function()
{return this._ZzyBDFMenuCommandName;}

	



//================================================================
//Game_Interpreter
//================================================================
Zzy.BDF.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args)
{
	Zzy.BDF.Game_Interpreter_pluginCommand.call(this,command,args);
	if(command === 'ZzyBDF')
	{
		this.ZzyBDFCommand(args);
	}
	
}


Game_Interpreter.prototype.ZzyBDFCommand = function(args)
{
	var command = String(args[0]);
	
	switch(command)
	{
		case 'EnableMenu'://这会改变最大通关数
		var isEnable = eval(String(args[1]));
		$gameSystem.setZzyBDFEnableMenu(true);
		break;
		
		case 'DisableMenu'://这会改变最大通关数
		var isEnable = eval(String(args[1]));
		$gameSystem.setZzyBDFEnableMenu(false);
		break;
		
		case 'InsertMenu'://这会改变最大通关数
		var isEnable = eval(String(args[1]));
		$gameSystem.setZzyBDFInsertMenu(true);
		break;
		
		case 'RemoveMenu'://这会改变最大通关数
		var isEnable = eval(String(args[1]));
		$gameSystem.setZzyBDFInsertMenu(false);
		break;
		
		case 'CommandName'://这会修改显示的菜单名称
		var name = String(args[1]);
		$gameSystem.setZzyBDFMenuCommandName(name);
		break;
		
		case 'Bissuade':
		this.ZzyBDFBissuadeCommand(args);
		break;
		
		case 'EarnExp':
		var isEnable = eval(String(args[1]));
		$gameSystem._ZzyBDFIsEarnExp = isEnable;
		break;
		
		case 'EarnCoin':
		var isEnable = eval(String(args[1]));
		$gameSystem._ZzyBDFIsEarnCoin = isEnable;
		break;
		
		case 'EarnItem':
		var isEnable = eval(String(args[1]));
		$gameSystem._ZzyBDFIsEarnItem = isEnable;
		break;
		

	}
}

Game_Interpreter.prototype.ZzyBDFBissuadeCommand = function(args)
{
	var command = String(args[1]);
	switch(command)
	{
		case 'Frame':
		var frameEval = String(args[2]);
		$gameSystem._ZzyBCFBissuadeFrame = frameEval;
		break;
		
		case 'Rate':
		var rateEval = String(args[2]);
		$gameSystem._ZzyBDFBissuadeRate = rateEval;
		break;
		
		case 'Count':
		var countEval = String(args[2]);
		$gameSystem._ZzyBDFBissuadeCount = countEval;
		break;
		
		case 'Over':
		switch(String(args[2]))
		{
			case 'Disable':
			$gameSystem._ZzyBDFBissuadeOver = 'Disable';
			break;
			
			case 'Remove':
			$gameSystem._ZzyBDFBissuadeOver = 'Remove';
			break;
			
			default:
			$gameSystem._ZzyBDFBissuadeOver = 'Disable';
		}
		break;
	}
	
}




//================================================================
//DataManager
//================================================================
Zzy.BDF.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function()
{
	if (!Zzy.BDF.DataManager_isDatabaseLoaded.call(this)) return false;
	
	//添加标签内容
	this.ZzyBDFLoadNoteCase1($dataClasses);//职业
	this.ZzyBDFLoadNoteCase2($dataActors);//角色
	this.ZzyBDFLoadNoteCase1($dataSkills);//技能
	this.ZzyBDFLoadNoteCase1($dataItems);//物品
	this.ZzyBDFLoadNoteCase1($dataArmors);//护甲
	this.ZzyBDFLoadNoteCase1($dataWeapons);//武器
	this.ZzyBDFLoadNoteCase2($dataEnemies);//敌人
	
	return true;
}

DataManager.ZzyBDFLoadNoteCase2 = function(objArr)//加载标签
{
  for (var i = 1; i < objArr.length; i++) 
  {
    var obj = objArr[i];
    var noteData = obj.note.split(/[\r\n]+/);
	
	obj.zzyBDF = {};

	for(var j=0;j<noteData.length;j++)
	{
		var lineStr = noteData[j];
		
		if(lineStr.match(/<ZZYBDF LEVEL:[ ](\d+)>/i))//优先级
		{
			var level = parseInt(RegExp.$1);
			obj.zzyBDF['level'] = level;
		}
		else if(lineStr.match(/<ZZYBDF ENABLE>/i))
		{
			obj.zzyBDF['isEnable'] = true;
		}
		else if(lineStr.match(/<ZZYBDF DISABLE>/i))
		{
			obj.zzyBDF['isEnable'] = false;
		}
		else if(lineStr.match(/<ZZYBDF INSERT>/i))
		{
			obj.zzyBDF['isInsert'] = true;
		}
		else if(lineStr.match(/<ZZYBDF REMOVE>/i))
		{
			obj.zzyBDF['isInsert'] = false;
		}
		else if (lineStr.match(/<ZZYBDF RATE:[ ](.*)>/i))
		{
			var rate = Number(RegExp.$1);
			obj.zzyBDF['rate'] = rate;
		}
		else if (lineStr.match(/<ZZYBDF RATEPER:[ ](.*)>/i))
		{
			var ratePer = Number(RegExp.$1);
			obj.zzyBDF['ratePer'] = ratePer;
		}
		else if (lineStr.match(/<ZZYBDF INTEXT:[ ](.*)>/i))
		{
			var textArr = String(RegExp.$1);
			textArr = textArr.split('&');
			obj.zzyBDF['inText'] = textArr;
		}
		else if (lineStr.match(/<ZZYBDF FAILTEXT:[ ](.*)>/i))
		{
			var textArr = String(RegExp.$1);
			textArr = textArr.split('&');
			obj.zzyBDF['failText'] = textArr;
		}
		else if (lineStr.match(/<ZZYBDF WINTEXT:[ ](.*)>/i))
		{
			var textArr = String(RegExp.$1);
			textArr = textArr.split('&');
			obj.zzyBDF['winText'] = textArr;
		}
		else if (lineStr.match(/<ZZYBDF INSOUND:[ ](.*)>/i))
		{
			var seStr = String(RegExp.$1);
			obj.zzyBDF['inSe'] = {};
			seArr = seStr.split(',');
			seArr[0] = String(seArr[0]);
			seArr[1] = String(seArr[1]);
			seArr[2] = String(seArr[2]);
			seArr[3] = String(seArr[3]);
			obj.zzyBDF['inSe'].name = seArr[0];
			obj.zzyBDF['inSe'].volume = seArr[1];
			obj.zzyBDF['inSe'].pitch = seArr[2];
			obj.zzyBDF['inSe'].pan = seArr[3];
		}
		else if (lineStr.match(/<ZZYBDF FAILSOUND:[ ](.*)>/i))
		{
			var seStr = String(RegExp.$1);
			obj.zzyBDF['failSe'] = {};
			seArr = seStr.split(',');
			seArr[0] = String(seArr[0]);
			seArr[1] = String(seArr[1]);
			seArr[2] = String(seArr[2]);
			seArr[3] = String(seArr[3]);
			obj.zzyBDF['failSe'].name = seArr[0];
			obj.zzyBDF['failSe'].volume = seArr[1];
			obj.zzyBDF['failSe'].pitch = seArr[2];
			obj.zzyBDF['failSe'].pan = seArr[3];
		}
		else if (lineStr.match(/<ZZYBDF WINSOUND:[ ](.*)>/i))
		{
			var seStr = String(RegExp.$1);
			obj.zzyBDF['winSe'] = {};
			seArr = seStr.split(',');
			seArr[0] = String(seArr[0]);
			seArr[1] = String(seArr[1]);
			seArr[2] = String(seArr[2]);
			seArr[3] = String(seArr[3]);
			obj.zzyBDF['winSe'].name = seArr[0];
			obj.zzyBDF['winSe'].volume = seArr[1];
			obj.zzyBDF['winSe'].pitch = seArr[2];
			obj.zzyBDF['winSe'].pan = seArr[3];
		}		
	}
  }
}



DataManager.ZzyBDFLoadNoteCase1 = function(objArr)//加载标签
{
  for (var i = 1; i < objArr.length; i++) 
  {
    var obj = objArr[i];
    var noteData = obj.note.split(/[\r\n]+/);
	
	obj.zzyBDF = {};

	for(var j=0;j<noteData.length;j++)
	{
		var lineStr = noteData[j];
		
		if(lineStr.match(/<ZZYBDF LEVEL:[ ](\d+)>/i))//优先级
		{
			var level = parseInt(RegExp.$1);
			obj.zzyBDF['level'] = level;
		}
		else if(lineStr.match(/<ZZYBDF ENABLE>/i))
		{
			obj.zzyBDF['isEnable'] = true;
		}
		else if(lineStr.match(/<ZZYBDF DISABLE>/i))
		{
			obj.zzyBDF['isEnable'] = false;
		}
		else if(lineStr.match(/<ZZYBDF INSERT>/i))
		{
			obj.zzyBDF['isInsert'] = true;
		}
		else if(lineStr.match(/<ZZYBDF REMOVE>/i))
		{
			obj.zzyBDF['isInsert'] = false;
		}
		else if (lineStr.match(/<ZZYBDF RATE:[ ](.*)>/i))
		{
			var rate = Number(RegExp.$1);
			obj.zzyBDF['rate'] = rate;
		}
		else if (lineStr.match(/<ZZYBDF RATEPER:[ ](.*)>/i))
		{
			var ratePer = Number(RegExp.$1);
			obj.zzyBDF['ratePer'] = ratePer;
		}		


	}
  }
	
}


//================================================================
//Window_PartyCommand
//================================================================

//添加命令,设定插入位置在逃跑的上方
Zzy.BDF.Window_PartyCommand_initialize = Window_PartyCommand.prototype.initialize;
Window_PartyCommand.prototype.initialize = function() 
{
	Zzy.BDF.Window_PartyCommand_initialize.call(this);
	this._zzyBDFCommand = undefined;
    this._ZzyBDFWait = 0;//等待时间
    this._ZzyBDFCWait = 0;//计数
    this._IsZzyBDFWait = false;//等待判断
	this._ZzyBDFStage = 0;//阶段
};
	


Window_PartyCommand.prototype.SetupZzyBDFWait = function(stage)
{
	this._ZzyBDFStage = stage;
    this._IsZzyBDFWait = true;
    this._ZzyBDFCWait = 0;//计数
	this._ZzyBDFWait = BattleManager.ZzyBDFEvalTransformation($gameSystem._ZzyBCFBissuadeFrame);//等待时间	
}


Zzy.BDF.Window_PartyCommand_update = Window_PartyCommand.prototype.update;
Window_PartyCommand.prototype.update = function()
{
	if(!this.updateZzyBDFWait())return;
	
	if(Zzy.BDF.Window_PartyCommand_update)
	{Zzy.BDF.Window_PartyCommand_update.call(this)}
	else
	{Window_Command.prototype.update.call(this);}
	
}


Window_PartyCommand.prototype.updateZzyBDFWait = function()
{
	if(!this._IsZzyBDFWait)return true;
	
	if(this._ZzyBDFCWait < this._ZzyBDFWait)
	{
		this._ZzyBDFCWait++;
	}
	else
	{
		switch(this._ZzyBDFStage)
		{
			case 1://阶段1劝降中
				this.ClearZzyBDFWait();
				if(BattleManager.ZzyBDFAfterDissuade())//如果劝降成功,则开启二阶段等待
				{
					BattleManager.ZzyBDFPlayBissuadeWinSound();//胜利音效
					this.SetupZzyBDFWait(2);//阶段2
				}
				else//失败
				{
					BattleManager.ZzyBDFPlayBissuadeFailSound();//失败音效
				}
			break;
			case 2://阶段2等待敌人撤退
				this.ClearZzyBDFWait();
				//敌人全部撤退
				
				BattleManager.ZzyBDFAllEnemyEscape();
				
			break;
		}
		
		
		

	}
	return false;
}




Window_PartyCommand.prototype.ClearZzyBDFWait = function()
{
	this._ZzyBDFStage = 0;//阶段
	this._ZzyBDFWait = 0;//等待时间
	this._ZzyBDFCWait = 0;//技术
    this._IsZzyBDFWait = false;//等待判断	
}


Zzy.BDF.Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() 
{
	Zzy.BDF.Window_PartyCommand_makeCommandList.call(this);

	
	if(BattleManager.ZzyBDFInsert())
	{
		var isEnable = BattleManager.ZzyBDFEnable();
		if(BattleManager.getZzyBDFTurnUse())//如果本回合已经使用过,那么为未激活
		{		
			isEnable = false;
		}
		
		if(BattleManager.IsZzyBDFNoHaveCount())
		{
			if($gameSystem._ZzyBDFBissuadeOver === 'Remove')
			{return;}//如果是Remove则不会添加劝降	
			else
			{isEnable = false;}//处于未激活状态
		}
		
		
		
	
		this.ZzyBDFAddCommand(isEnable);//添加劝退
	}
};


Window_Command.prototype.ZzyBDFAddCommand = function(isEnable)//添加劝退命令
{
	//制作命令
	var command = {};
	command.name = $gameSystem.getZzyBDFMenuCommandName();
	command.symbol = Zzy.BDF.BdCommand;
	command.enabled = isEnable;
	command.ext = null;
	this._zzyBDFCommand = command;
	
	//插入位置:在逃跑之上,或是最下
	var len = this._list.length;
	var insertIndex = -1;
	for(i=len-1;i>=0;i--)
	{
		var tList = this._list[i];
		
		if(tList.symbol === 'escape')//查找到对应位置
		{
			insertIndex = i;
			break;
		}
	}
	
	if(insertIndex === -1)
	{
		insertIndex = len;//设置为最后位置,添加命令
		this._list[insertIndex] = command;
	}
	else//插入命令
	{
		for(var i=len-1;i>=insertIndex;i--)
		{
			//向前位移
			this._list[i+1] = this._list[i];
		}
		this._list[insertIndex] = command;
	}
	
}


//================================================================
//BattleManager
//================================================================

Zzy.BDF.BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() 
{
	Zzy.BDF.BattleManager_initMembers.call(this);
	
	this._zzyBDFEnable = false;//是否显示
	this._zzyBDFInsert = false;
	this._zzyBDFBaseRate = 0;//劝降基础概率
	this._zzyBDFData = [];//数据
	this._zzyBDFCount = 0;//劝退次数
	this._isZzyBDFTurnUse = false;//是否回合已经使用
	this._ZzyBDFIsDissuadeWin = false;//是否为劝降胜利
};

BattleManager.ZzyBDFEnable = function()
{
	return this._zzyBDFEnable;
}

BattleManager.ZzyBDFInsert = function()
{
	return this._zzyBDFInsert;
}


BattleManager.ResetZzyBDFTurnUse = function()//重置回合使用
{this._isZzyBDFTurnUse = false;}

BattleManager.TheZzyBDFTurnUse = function()//回合使用
{this._isZzyBDFTurnUse = true;}

BattleManager.getZzyBDFTurnUse = function()//回合是否
{return this._isZzyBDFTurnUse;}

BattleManager.IsZzyBDFNoHaveCount = function()//没有次数
{return this._zzyBDFCount <= 0;}



Zzy.BDF.BattleManager_setup = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose)
{
	Zzy.BDF.BattleManager_setup.call(this,troopId, canEscape, canLose);
	
	
	this.ZzyBDFClearData();//清理数据
	this.ZzyBDFMakeDissuadeData();//制作劝降数据
	
	this._zzyBDFCount = this.ZzyBDFEvalTransformation($gameSystem._ZzyBDFBissuadeCount);//劝降次数
}


BattleManager.ZzyBDFClearData = function()
{
	this._zzyBDFEnable = false;//是否显示
	this._zzyBDFInsert = false;
	this._zzyBDFBaseRate = 0;//劝降基础概率
	this._zzyBDFData = [];//数据
	this._zzyBDFCount = 0;//劝退次数
	this._isZzyBDFTurnUse = false;//是否回合已经使用
	this._ZzyBDFIsDissuadeWin = false;//是否为劝降胜利
}

BattleManager.IsZzyBDFDissuadeWin = function()
{
	return this._ZzyBDFIsDissuadeWin;
}




BattleManager.getZzyBDFData = function()
{
	return this._zzyBDFData;
}


BattleManager.subZzyBDFBissuadeCount = function()//劝降次数判定
{
	this._zzyBDFCount--;
	if(this._zzyBDFCount <= 0)
	{return false;}
	return true;
}



BattleManager.ZzyBDFMakeDissuadeData = function()
{
//插件参数 < 职业 < 角色 < 技能 < 物品 < 护甲 < 武器 < 敌人	
	var enemy = this.getZzyBDFEnemyObj();//敌人
	var weapon = this.getZzyBDFWeaponObj();//武器
	var armor = this.getZzyBDFArmorObj();//护甲
	var item = this.getZzyBDFItemObj();//物品
	var skill = this.getZzyBDFSkillObj();//技能
	var actor = this.getZzyBDFActorObj();//角色
	var aclass = this.getZzyBDFClassObj();//职业
	
	//压入数据信息
	this._zzyBDFData.push(enemy);
	this._zzyBDFData.push(weapon);
	this._zzyBDFData.push(armor);
	this._zzyBDFData.push(item);
	this._zzyBDFData.push(skill);
	this._zzyBDFData.push(actor);
	this._zzyBDFData.push(aclass);
	
	//计算是否激活和显示
	this.ZzyBDFCalVisible();

}

BattleManager.ZzyBDFStartBissuade = function()
{
	
	
	

}


BattleManager.ZzyBDFProcessBissuade = function()
{
	this.TheZzyBDFTurnUse();//回合已使用
	this.subZzyBDFBissuadeCount();//减少劝降次数
	this.ZzyBDFStartBissuade();//开始劝降	
}


BattleManager.ZzyBDFAfterDissuade = function()
{
	//进行下一步:判定结果
	//按下劝降
	var isSuccess = this.ZzyBDFDissuadeSuccess();//是否成功
	//劝降执行脚本
	if(isSuccess)
	{
		Zzy.Param.BDFWinScript();
		var winText = this.MakeZzyBDFBissuadeWinText();
		this._logWindow.addText(winText);
		
		//劝降成功会导致所有的敌人逃离
	}
	else
	{
		Zzy.Param.BDFFailScript();
		var failText = this.MakeZzyBDFBissuadeFailText();
		this._logWindow.addText(failText);
	}

	return isSuccess;
}




BattleManager.ZzyBDFDissuadeSuccess = function()
{
	//首先计算概率
	var rate = this.ZzyBDFCalculateRate();
	//概率测试
	var rValue = Math.random() * 100;
	return !!(rValue < rate);
}

BattleManager.ZzyBDFCalculateRate = function()//计算概率
{
	//基础概率
	var baseRate = this.ZzyBDFEvalTransformation($gameSystem._ZzyBDFBissuadeRate);

	//添加额外概率
	var tData = this.getZzyBDFData();
	
	var exRate = 0;
	var exRatePer = 0;
	
	for(var i=0;i<tData.length;i++)
	{
		if(!tData[i])continue;
		if(!tData[i].zzyBDF)continue;
		exRate += tData[i].zzyBDF.rate ? tData[i].zzyBDF.rate : 0;
		exRatePer += tData[i].zzyBDF.ratePer ? tData[i].zzyBDF.ratePer : 0;
	}
	
	//计算概率	
	
	return baseRate + exRate + (baseRate * exRatePer * 0.01);//最终概率
}

BattleManager.ZzyBDFAllEnemyEscape = function()
{
	
	this._ZzyBDFIsDissuadeWin = true;//设置为劝降胜利
	//所有敌人进入死亡状态
	var enemyArr = $gameTroop._enemies;
	for(var i=0;i<enemyArr.length;i++)
	{
		if(enemyArr[i]._hp !== 0)
		{
			enemyArr[i].setHp(0);
			enemyArr[i].performCollapse();
		}
	}
	//performCollapse
	this.checkBattleEnd();//宣告胜利结束
}



BattleManager.ZzyBDFCalVisible = function()
{
	//判断isEnable情况
	
	var isHaveE = false;
	
	for(var i=0;i<this._zzyBDFData.length;i++)
	{
		if(!this._zzyBDFData[i])continue;
		if(this._zzyBDFData[i].zzyBDF.isEnable === true)
		{
			this._zzyBDFEnable = true;
			isHaveE = true;
			break;
		}
		else if(this._zzyBDFData[i].zzyBDF.isEnable === false)
		{
			this._zzyBDFEnable = false;
			isHaveE = true;
			break;
		}
		
	}
	if(!isHaveE)
	{
		this._zzyBDFEnable = $gameSystem.getZzyBDFEnableMenu();
	}
	
	var isHaveI = false;
	for(var i=0;i<this._zzyBDFData.length;i++)
	{
		if(!this._zzyBDFData[i])continue;
		if(this._zzyBDFData[i].zzyBDF.isInsert === true)
		{
			this._zzyBDFInsert = true;
			isHaveI = true;
			break;
		}
		else if(this._zzyBDFData[i].zzyBDF.isInsert === false)
		{
			this._zzyBDFInsert = false;
			isHaveI = true;
			break;
		}
		
	}
	if(!isHaveI)
	{
		this._zzyBDFInsert = $gameSystem.getZzyBDFInsertMenu();
	}	
	
	
}

	
	
BattleManager.getZzyBDFClassObj = function()
{
	var aArr = $gameParty.battleMembers();
	var csIdArr = [];//职业
	var csDataArr = [];
	for(var i=0;i<aArr.length;i++)//遍历所有角色
	{
		var csId = aArr[i]._classId;
		if(!Zzy.BDF.IsHave(csIdArr,csId))
		{
			csIdArr.push(csId);
			csDataArr.push($dataClasses[csId]);
		}
	}	
	var useCs = this.ZzyBDFProcess1(csIdArr,csDataArr);
	return useCs;	
}

	
BattleManager.getZzyBDFSkillObj	= function()
{
	var aArr = $gameParty.battleMembers();
	var skIdArr = [];//技能
	var skDataArr = [];
	
	for(var i=0;i<aArr.length;i++)//遍历所有角色
	{
		var skills = aArr[i]._skills;

		for(var j=0;j<skills.length;j++)
		{
			var skId = skills[j];//获取技能ID
			if(!Zzy.BDF.IsHave(skIdArr,skId))
			{
				skIdArr.push(skId);
				skDataArr.push($dataSkills[skId]);
			}
		}
	}
	var useSk = this.ZzyBDFProcess1(skIdArr,skDataArr);
	return useSk;	
}


BattleManager.getZzyBDFItemObj = function()
{
	var itIdArr = [];
	var itDataArr = [];
	for(var itId in $gameParty._items)//获取道具的ID值
	{
		itIdArr.push(parseInt(itId));
		itDataArr.push($dataItems[itId]);
	}
	
	var useIt = this.ZzyBDFProcess1(itIdArr,itDataArr);
	return useIt;
}
	
	
	
BattleManager.getZzyBDFArmorObj = function()
{
	var aArr = $gameParty.battleMembers();

	var amIdArr = [];
	var amDataArr = [];	
	for(var i=0;i<aArr.length;i++)//遍历所有角色
	{
		//查找关键字'armor'
		var eArr = aArr[i]._equips;
		for(var j=0;j<eArr.length;j++)
		{
			var amId = eArr[j].itemId();
			if(!eArr[j].isArmor())continue;
			if(!amId)continue;
			{
				if(!Zzy.BDF.IsHave(amIdArr,amId))
				{
					amIdArr.push(amId);
					amDataArr.push($dataArmors[amId]);
				}
			}			
		}
	}	
	var useAm = this.ZzyBDFProcess1(amIdArr,amDataArr);
	return useAm;
}

	
BattleManager.getZzyBDFWeaponObj = function()
{
	var aArr = $gameParty.battleMembers();

	var wpIdArr = [];
	var wpDataArr = [];
	for(var i=0;i<aArr.length;i++)//遍历所有角色
	{
		//查找关键字'weapon'
		var eArr = aArr[i]._equips;
		for(var j=0;j<eArr.length;j++)
		{
			var wpId = eArr[j].itemId();
			if(!eArr[j].isWeapon())continue;
			if(!wpId)continue;
			
			if(eArr[j].isWeapon())//判断是武器
			{
				if(!Zzy.BDF.IsHave(wpIdArr,wpId))
				{
					wpIdArr.push(wpId);
					wpDataArr.push($dataWeapons[wpId]);
				}
			}
		}
	}
	var useWp = this.ZzyBDFProcess1(wpIdArr,wpDataArr);
	return useWp;
}
	
	
	
BattleManager.getZzyBDFActorObj = function()
{
	//获取到战斗成员
	var aArr = $gameParty.battleMembers();
	var acIdArr = [];
	var acDataArr = [];
	for(var i=0;i<aArr.length;i++)
	{	
		var acId = aArr[i].actorId();
		if(!Zzy.BDF.IsHave(acIdArr,acId))
		{
			acIdArr.push(acId);//添加
			acDataArr.push($dataActors[acId]);
		}
	}
	
	var useAc = this.ZzyBDFProcess1(acIdArr,acDataArr);
	return useAc;
}


BattleManager.getZzyBDFEnemyObj = function()
{
	//优先级-敌人
	var evIdArr = [];
	var evDataArr = [];
	var eArr = $gameTroop.members();

	for(var i=0;i<eArr.length;i++)
	{	
	     var evId = eArr[i].enemyId();
		 if(!Zzy.BDF.IsHave(evIdArr,evId))
		 {
			 evIdArr.push(evId);//添加
			 evDataArr.push($dataEnemies[evId]);
		 }
	}
	 
	var useEn = this.ZzyBDFProcess1(evIdArr,evDataArr);
	return useEn;	
}


BattleManager.ZzyBDFProcess1 = function(objIdArr,objDataArr)//过程1返回最高权重对象
{
	var pIndex = 0;//优先级最高的下标
	var isNoLevel = true;
	var useObj = null;
	
	if(objDataArr && objDataArr.length && objDataArr[pIndex].zzyBDF.level)//首次判断
	{isNoLevel = false;}
	
	for(var i=1;i<objIdArr.length;i++)
	{
		var objData = objDataArr[i];
		if(!objData.zzyBDF.level)continue;
		//比较两个单位的level值
		var le1 = objDataArr[pIndex].zzyBDF.level ? objDataArr[pIndex].zzyBDF.level : 0;
		var le2 = objData.zzyBDF.level;
		
		if(le1 < le2)//替换下标值
		{pIndex =i;}
		isNoLevel = false;
	}
	if(isNoLevel)//敌人中不存在优先级,那么比较ID等级
	{
		var maxI = Zzy.BDF.MaxIndexOfArr(objIdArr);
		useObj = objDataArr[maxI];//使用的敌人信息
	}
	else
	{
		useObj = objDataArr[pIndex];//使用的敌人信息
	}
	return useObj;
}

BattleManager.ZzyBDFEvalTransformation = function(evalStr)
{
	var variable = $gameVariables._data;
	var switchs = $gameSwitches._data;
	var enemy = this._zzyBDFData[0];
	var weapon = this._zzyBDFData[1];
	var armor = this._zzyBDFData[2];
	var item = this._zzyBDFData[3];
	var skill = this._zzyBDFData[4];
	var actor = this._zzyBDFData[5];
	var aclass = this._zzyBDFData[6];
	
	var a = $gameActors._data[actor.id];

	var b = {};
	b.mhp = enemy.params[0];//最大生命值
	b.mmp = enemy.params[1];//最大魔法值
	b.atk = enemy.params[2];//攻击
	b.def = enemy.params[3];//防御
	b.mat = enemy.params[4];//魔攻
	b.mdf = enemy.params[5];//魔抗
	b.agi = enemy.params[6];//敏捷
	b.luk = enemy.params[7];//幸运
	

	return eval(evalStr);	
	
}

Zzy.BDF.BattleManager_updateTurnEnd = BattleManager.updateTurnEnd;
BattleManager.updateTurnEnd = function()//回合结束时,重置点击效果
{
	Zzy.BDF.BattleManager_updateTurnEnd.call(this);
	
	this.ResetZzyBDFTurnUse();//刷新回合使用
};


BattleManager.MakeZzyBDFBissuadeInText = function()//制作劝降文字
{
	//检测敌人或是玩家是否存在语录
	var enemy = this._zzyBDFData[0];
	var actor = this._zzyBDFData[5];
	var textArr = null;
	if(enemy.zzyBDF.inText && enemy.zzyBDF.inText.length > 0)
	{textArr = enemy.zzyBDF.inText;}
	else if(actor.zzyBDF.inText && actor.zzyBDF.inText.length > 0)
	{textArr = actor.zzyBDF.inText;}
	else
	{textArr = Zzy.Param.BCFDissuadingText;}
	var troopName = $gameTroop.troop().name;
	//替换战斗敌人团队名称
	//随机抽取-制作文字
	var text = Zzy.BDF.RandomText(textArr);
	text = text.format(troopName);
	return text;
}

BattleManager.MakeZzyBDFBissuadeFailText = function()//制作劝降失败文字
{
	//检测敌人或是玩家是否存在语录
	var enemy = this._zzyBDFData[0];
	var actor = this._zzyBDFData[5];
	var textArr = null;
	if(enemy.zzyBDF.failText && enemy.zzyBDF.failText.length > 0)
	{textArr = enemy.zzyBDF.failText;}
	else if(actor.zzyBDF.failText && actor.zzyBDF.failText.length > 0)
	{textArr = actor.zzyBDF.failText;}
	else
	{textArr = Zzy.Param.BCFDissuadeFailText;}
	var troopName = $gameTroop.troop().name;
	//替换战斗敌人团队名称
	//随机抽取-制作文字
	var text = Zzy.BDF.RandomText(textArr);
	text = text.format(troopName);
	return text;	
}


BattleManager.MakeZzyBDFBissuadeWinText = function()//制作劝降失败文字
{
	//检测敌人或是玩家是否存在语录
	var enemy = this._zzyBDFData[0];
	var actor = this._zzyBDFData[5];
	var textArr = null;
	if(enemy.zzyBDF.winText && enemy.zzyBDF.winText.length > 0)
	{textArr = enemy.zzyBDF.winText;}
	else if(actor.zzyBDF.winText && actor.zzyBDF.winText.length > 0)
	{textArr = actor.zzyBDF.winText;}
	else
	{textArr = Zzy.Param.BCFDissuadeWinText;}
	var troopName = $gameTroop.troop().name;
	//替换战斗敌人团队名称
	//随机抽取-制作文字
	var text = Zzy.BDF.RandomText(textArr);
	text = text.format(troopName);
	return text;	
}


BattleManager.ZzyBDFPlayBissuadingSound = function()
{
	var enemy = this._zzyBDFData[0];
	var actor = this._zzyBDFData[5];
	var se = null;
	if(enemy.zzyBDF.inSe)
	{se = enemy.zzyBDF.inSe;}
	else if(actor.zzyBDF.inSe)
	{se = actor.zzyBDF.inSe;}
	else
	{se = Zzy.Param.BDFInSE;}
	
	if(se.name)//名称是否存在,不存在则不会播放声音
	{
		AudioManager.playSe(se);
	}
}

BattleManager.ZzyBDFPlayBissuadeFailSound = function()
{
	var enemy = this._zzyBDFData[0];
	var actor = this._zzyBDFData[5];	
	var se = null;
	if(enemy.zzyBDF.failSe)
	{se = enemy.zzyBDF.failSe;}
	else if(actor.zzyBDF.failSe)
	{se = actor.zzyBDF.failSe;}
	else
	{se = Zzy.Param.BDFFailSE;}
	
	if(se.name)//名称是否存在,不存在则不会播放声音
	{
		AudioManager.playSe(se);
	}	
}

BattleManager.ZzyBDFPlayBissuadeWinSound = function()
{
	var enemy = this._zzyBDFData[0];
	var actor = this._zzyBDFData[5];
	var se = null;
	if(enemy.zzyBDF.winSe)
	{se = enemy.zzyBDF.winSe;}
	else if(actor.zzyBDF.winSe)
	{se = actor.zzyBDF.winSe;}
	else
	{se = Zzy.Param.BDFWinSE;}
	
	if(se.name)//名称是否存在,不存在则不会播放声音
	{
		AudioManager.playSe(se);
	}		
}




//================================================================
//Scene_Battle
//================================================================


Zzy.BDF.Scene_Battle_initialize = Scene_Battle.prototype.initialize;
Scene_Battle.prototype.initialize = function() 
{
   Zzy.BDF.Scene_Battle_initialize.call(this);

};

Zzy.BDF.Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function()
{
	Zzy.BDF.Scene_Battle_update.call(this);
}


Zzy.BDF.Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function()
{
	Zzy.BDF.Scene_Battle_createPartyCommandWindow.call(this);
	
	this._partyCommandWindow.setHandler(Zzy.BDF.BdCommand,this.ZzyBDFCommandDissuade.bind(this));
	
}


Scene_Battle.prototype.ZzyBDFCommandDissuade = function()
{
	//执行结束后,让命令灰化
	this._partyCommandWindow._zzyBDFCommand.enabled = false;//灰化
	this.ZzyBDFMenuAfterUse();
    
}

Scene_Battle.prototype.ZzyBDFMenuAfterUse = function()//使用之后
{
	//播放劝降语音
	BattleManager.ZzyBDFPlayBissuadingSound();//播放劝降音效
	
	this.SetupZzyBDFWait(1);//设定劝降等待时间
	BattleManager.ZzyBDFProcessBissuade();//劝降过程
	//显示劝降文字
	var inText = BattleManager.MakeZzyBDFBissuadeInText();//制作劝降文字
	this._logWindow.addText(inText);//显示劝降文字
	
}


Scene_Battle.prototype.SetupZzyBDFWait = function(stage)
{
	this._partyCommandWindow.SetupZzyBDFWait(stage);
}


//================================================================
//Game_Troop
//================================================================

Zzy.BDF.Game_Troop_goldTotal = Game_Troop.prototype.goldTotal;
Game_Troop.prototype.goldTotal = function() 
{
	var gold = Zzy.BDF.Game_Troop_goldTotal.call(this);
	if(BattleManager.IsZzyBDFDissuadeWin() && !$gameSystem._ZzyBDFIsEarnCoin)
	{
		return 0;
	}
	return gold;
};

Zzy.BDF.Game_Troop_expTotal = Game_Troop.prototype.expTotal;
Game_Troop.prototype.expTotal = function()
{
	var exp = Zzy.BDF.Game_Troop_expTotal.call(this);
	if(BattleManager.IsZzyBDFDissuadeWin() && !$gameSystem._ZzyBDFIsEarnExp)
	{
		return 0;
	}
	return exp;
}

Zzy.BDF.Game_Troop_makeDropItems = Game_Troop.prototype.makeDropItems;
Game_Troop.prototype.makeDropItems = function()
{
	var items = Zzy.BDF.Game_Troop_makeDropItems.call(this);
	if(BattleManager.IsZzyBDFDissuadeWin() && !$gameSystem._ZzyBDFIsEarnItem)
	{
		items = [];
	}
	return items;
}






//=====================================Zzy.BDF.Function=============================
Zzy.BDF.IsHave = function(Arr,val)
{
	for(var i=0;i<Arr.length;i++)
	{
		if(Arr[i] === val)
		{return true;}
	}
	return false;
	
}

Zzy.BDF.MaxOfArr = function(Arr)//返回一个数组中最大的值
{
	var maxV = Arr[0];
	for(var i=1;i<Arr.length;i++)
	{
		if(maxV < Arr[i])
		{maxV = Arr[i];}
	}
	return maxV;
}

Zzy.BDF.MaxIndexOfArr = function(Arr)//返回一个数组中最大的值的下标
{
	var maxI = 0;
	for(var i=1;i<Arr.length;i++)
	{
		if(Arr[maxI] < Arr[i])
		{maxI = i;}
	}
	return maxI;
}

Zzy.BDF.RandomText = function(textArr)//从数组中抽出一条
{
	var len = textArr.length;
	var rIndex = Math.floor(Math.random() * len);
	return textArr[rIndex];
}
