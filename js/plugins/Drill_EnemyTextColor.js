//=============================================================================
// Drill_EnemyTextColor.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        敌人 - 敌人文本颜色
 * @author Drill_up
 * 
 * @param 颜色配置
 * @type text[]
 * @desc 自定义你的配置颜色，可以无限添加。
 * @default ["#FF4444","#FF784C","#FFFF40","#80FF80","#98F5FF","#40C0F0","#8080FF","#FF69B4","#8B4C39","#BEBEBE","#797979"]
 *
 * @param MOG-敌人指针是否变色
 * @type boolean
 * @on 变色
 * @off 不变色
 * @desc true - 变色，false - 不变色，敌人指针插件也会变色。
 * @default true
 *
 * @param MOG-Boss是否变色
 * @type boolean
 * @on 变色
 * @off 不变色
 * @desc true - 变色，false - 不变色，bossHP插件也会变色。
 * @default true
 *
 * @param 消息窗口是否变色
 * @type boolean
 * @on 变色
 * @off 不变色
 * @desc true - 变色，false - 不变色，注意，该设置需要 战斗-窗口提示消息 插件才能生效。
 * @default true
 * 
 * @help  
 * =============================================================================
 * +++ Drill_EnemyTextColor +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 根据敌人中的标签注释，改变文本颜色。只此一个单独的功能。
 * （目前不支持敌人图鉴变色）
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件：
 * 在要修改颜色的敌人设置中，添加注释即可：
 *
 * <颜色:1>
 * <颜色:#FF4444>
 *
 * 颜色后面的数字1对应你配置中的第1个颜色。你也可以直接贴颜色代码。
 *
 * -----------------------------------------------------------------------------
 * ----插件条件
 * 消息窗口变色 需要 Drill_WindowLog 窗口提示消息 插件才能生效。
 * （消息窗口只支持数字颜色）
 *
 * -----------------------------------------------------------------------------
 * ----关于颜色：
 * 默认配置是：
 *  #FF4444 赤   <颜色:1>
 *  #FF784C 橙   <颜色:2>
 *  #FFFF40 黄   <颜色:3>
 *  #80FF80 绿   <颜色:4>
 *  #98F5FF 青   <颜色:5>
 *  #40C0F0 蓝   <颜色:6>
 *  #8080FF 紫   <颜色:7>
 *  #FF69B4 粉   <颜色:8>
 *  #8B4C39 棕   <颜色:9>
 *  #BEBEBE 亮灰 <颜色:10>
 *  #797979 暗灰 <颜色:11>
 *
 * 如果你想配置更完美的颜色，推荐去这个网址找到你想要的颜色代码：
 * http://tool.oschina.net/commons?type=3
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 使得消息窗口中的颜色也会变化。
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//插件记录：
//		【该插件没有存储数据，全局和局部变量混用】
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_EnemyTextColor = true;
　　var DrillUp = DrillUp || {}; 

    DrillUp.parameters = PluginManager.parameters('Drill_EnemyTextColor');
    DrillUp.enemy_color_mog_c = String(DrillUp.parameters['MOG-敌人指针是否变色'] || "true") === "true";
    DrillUp.enemy_color_mog_boss = String(DrillUp.parameters['MOG-Boss是否变色'] || "true") === "true";
    DrillUp.enemy_color_ebook = String(DrillUp.parameters['敌人图鉴是否变色'] || "true") === "true";
    DrillUp.enemy_color_massage = String(DrillUp.parameters['消息窗口是否变色'] || "true") === "true";
	if(DrillUp.parameters['颜色配置'] != "" ){
		DrillUp.color_conf_e = JSON.parse(DrillUp.parameters['颜色配置']);
	}else{
		DrillUp.color_conf_e = ["#FF4444","#FF784C","#FFFF40","#80FF80","#98F5FF","#40C0F0","#8080FF","#FF69B4","#8B4C39","#BEBEBE","#797979"];
	}

//=============================================================================
// ** 覆写函数 （敌人选择窗口绘制）
//=============================================================================
Window_BattleEnemy.prototype.drawItem = function(index) {
	var color = String($dataEnemies[this._enemies[index]._enemyId].meta['颜色'] || "");
	if(color !== ""){
		if( color.slice(0,1) === "#" ){
			this.changeTextColor(color);
		}else{
			this.changeTextColor(DrillUp.color_conf_e[ Number(color) -1 ]);
		}
	}else{
		this.resetTextColor();
	}
    var name = this._enemies[index].name();
    var rect = this.itemRectForText(index);
    this.drawText(name, rect.x, rect.y, rect.width);
	this.resetTextColor();
};


//=============================================================================
// ** 与mog指针相适应
//=============================================================================
var _mog_cursor_refresh_arrow_name = BattleCursor.prototype.refresh_arrow_name;
BattleCursor.prototype.refresh_arrow_name = function(battler,sprite) {
	if(Imported.MOG_BattleCursor && DrillUp.enemy_color_mog_c){
		//for(var a in battler){
		//	textb ="key:"+a+" value:"+ battler[a]+"\n";
		//	alert(textb);
		//}
		//battler._enemyId
		if( battler._enemyId ){
			var color = String($dataEnemies[battler._enemyId].meta['颜色'] || "");
			if(color !== ""){
				if( color.slice(0,1) === "#" ){
					sprite.bitmap.textColor = color;
				}else{
					sprite.bitmap.textColor = DrillUp.color_conf_e[ Number(color) -1 ];
				}
			}else{
				sprite.bitmap.textColor = "#ffffff";
			}
		}
		_mog_cursor_refresh_arrow_name.call(this,battler,sprite);
		sprite.bitmap.textColor = "#ffffff";
	}else{
		_mog_cursor_refresh_arrow_name.call(this,battler,sprite);
	}
};

//=============================================================================
// ** 与mog bosshp相适应
//=============================================================================
if(window.Sprite_BossHP){
	var _mog_BossHP_refresh_name = Sprite_BossHP.prototype.refresh_name;
	Sprite_BossHP.prototype.refresh_name = function() {
		
		if(Imported.MOG_BossHP && DrillUp.enemy_color_mog_boss){
			if( this._battler ){
				var color = String($dataEnemies[this._battler._enemyId].meta['颜色'] || "");
				if(color !== ""){
					if( color.slice(0,1) === "#" ){
						this._name.bitmap.textColor = color;
					}else{
						this._name.bitmap.textColor = DrillUp.color_conf_e[ Number(color) -1 ];
					}
				}else{
					this._name.bitmap.textColor = "#ffffff";
				}
			}
			_mog_BossHP_refresh_name.call(this);
			this._name.bitmap.textColor = "#ffffff";
		}else{
			_mog_BossHP_refresh_name.call(this);
		}
	};
}

