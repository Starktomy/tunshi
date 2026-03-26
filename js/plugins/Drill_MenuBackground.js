//=============================================================================
// Drill_MenuBackground.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        主菜单 - 多层菜单背景
 * @author Drill_up
 *
 * @help
 * =============================================================================
 * +++ Drill_MenuBackground +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在任意菜单中放置一个或者多个背景，只要关键字对上。
 * 如果要了解更多信息，去看看"关于菜单背景,粒子,魔法圈.docx"。
 * ★★必须放在 各菜单界面、菜单插件 的前面★★
 * ★★自带背景的菜单插件可能不起作用，因为那个插件自己设置了底图★★
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 先确保项目img文件夹下是否有menus文件夹！（img/menus）
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-默认背景
 *
 * 背景1 资源-背景
 * 背景2 资源-背景
 * 背景3 资源-背景
 * ……
 *
 * 你可以在同一个菜单里面加入非常多的不同种类的背景。
 *
 * -----------------------------------------------------------------------------
 * ----关于如何识别自定义关键字
 * 一般查看yep菜单的第一个设置参数名，比如：
 * YEP物品合成第一个设置参数名是：Synthesis Command，那么关键字为Synthesis。
 * YEP任务系统第一个设置参数名是：Quest Command，那么关键字为Quest。
 *
 * Lagomoro（小优）的菜单关键字是：Lagomoro_Mission
 *
 * -----------------------------------------------------------------------------
 * ----界面与背景关系表
 * 
 * 可设置   关键字            关系界面
 *  √       Menu             （主菜单界面） 
 *  √       Item             （道具界面） 
 *  √       Skill            （技能界面）
 *  √       Equip            （装备界面） 
 *  √       Status           （状态界面） 
 *  √       Formation        （队形界面） 
 *  √       Options          （选项界面） 
 *  √       Save             （保存界面） 
 *  √       Shop             （商店界面） 
 *  √       GameEnd          （游戏结束选择界面）
 *
 *  √       EnemyBook        （敌人图鉴界面）
 *  √       ItemBook         （道具图鉴界面）
 *  √       Picture_Gallery  （画廊界面）
 *  x       Music_Book       （音乐书界面）
 *  x       Fast_Travel      （世界地图界面）
 *  x       CharSelect       （角色选择界面）
 *
 *  √       Selfplate_A      （全自定义信息面板A）
 *  √       Lagomoro_Mission （小优任务界面）
 *  √       Synthesis        （YEP物品合成界面）
 *  √       Quest            （YEP任务系统界面）
 *
 * 配置背景关键字时，不要忘了加"Scene_"前缀！
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 *
 *
 * @param 底图设置
 * @type boolean
 * @on 地图画面
 * @off 全黑
 * @desc true - 地图画面，false - 全黑。进入菜单后，看到的是当前地图的图片。你也可以设置成全黑。
 * @default false
 *
 * @param ---默认背景---
 * @default
 *
 * @param 资源-默认背景
 * @parent ---默认背景---
 * @desc 默认背景的图片资源。
 * @default 背景-默认背景
 * @require 1
 * @dir img/menus/
 * @type file
 *
 * @param 平移-默认背景 X
 * @parent ---默认背景---
 * @desc x轴方向平移，单位像素。0为贴在最左边。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 平移-默认背景 Y
 * @parent ---默认背景---
 * @desc x轴方向平移，单位像素。0为贴在最上面。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 默认透明度
 * @parent ---默认背景---
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 默认混合模式
 * @parent ---默认背景---
 * @type number
 * @min 0
 * @max 16
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"pixi的渲染混合模式"。
 * @default 0
 *
 * @param 默认背景X速度
 * @parent ---默认背景---
 * @desc 背景按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 * @default 0
 *
 * @param 默认背景Y速度
 * @parent ---默认背景---
 * @desc 背景按y轴方向循环移动的速度。正数向上，负数向下。（可为小数）
 * @default 0
 *
 * @param ---背景组 1至20---
 * @default
 *
 * @param 背景-1
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-2
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-3
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-4
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-5
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-6
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-7
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-8
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-9
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-10
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-11
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-12
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-13
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-14
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-15
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-16
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-17
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-18
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-19
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-20
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景组21至40---
 * @default
 *
 * @param 背景-21
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-22
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-23
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-24
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-25
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-26
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-27
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-28
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-29
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-30
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-31
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-32
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-33
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-34
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-35
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-36
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-37
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-38
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-39
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-40
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景组41至60---
 * @default
 *
 * @param 背景-41
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-42
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-43
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-44
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-45
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-46
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-47
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-48
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-49
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-50
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-51
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-52
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-53
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-54
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-55
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-56
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-57
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-58
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-59
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-60
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景组61至80---
 * @default
 *
 * @param 背景-61
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-62
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-63
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-64
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-65
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-66
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-67
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-68
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-69
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-70
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-71
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-72
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-73
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-74
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-75
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-76
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-77
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-78
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-79
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-80
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 */
/*~struct~MenuBackground:
 * 
 * @param 所属菜单
 * @type select
 * @option 主菜单
 * @value 主菜单
 * @option 道具
 * @value 道具
 * @option 技能
 * @value 技能
 * @option 装备
 * @value 装备
 * @option 状态
 * @value 状态
 * @option 队形
 * @value 队形
 * @option 选项
 * @value 选项
 * @option 保存
 * @value 保存
 * @option 商店
 * @value 商店
 * @option 游戏结束
 * @value 游戏结束
 * @option 敌人图鉴
 * @value 敌人图鉴
 * @option 道具图鉴
 * @value 道具图鉴
 * @option 画廊
 * @value 画廊
 * @option 自定义
 * @value 自定义
 * @desc 将背景放在指定的菜单。如果为自定义，那么要填写自定义关键字。
 * @default 主菜单
 * 
 * @param 自定义关键字
 * @parent 所属菜单
 * @desc 设置所属菜单为自定义时，将根据此关键字找到对应的菜单。前缀为Scene_，比如：Scene_Synthesis。
 * @default 
 *
 * @param 资源-背景
 * @desc 背景的图片资源。
 * @default 背景-默认背景
 * @require 1
 * @dir img/menus/
 * @type file
 *
 * @param 平移-背景 X
 * @desc x轴方向平移，单位像素。0为贴在最左边。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 平移-背景 Y
 * @desc x轴方向平移，单位像素。0为贴在最上面。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 混合模式
 * @type number
 * @min 0
 * @max 16
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"pixi的渲染混合模式"。
 * @default 0
 *
 * @param 背景X速度
 * @desc 背景按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 * @default 0
 *
 * @param 背景Y速度
 * @desc 背景按y轴方向循环移动的速度。正数向上，负数向下。（可为小数）
 * @default 0
 *
 * @param 菜单层级
 * @type select
 * @option 在菜单后面
 * @value 0
 * @option 在菜单前面
 * @value 1
 * @desc 背景所属的菜单层级。
 * @default 0
 *
 * @param 图片层级
 * @type number
 * @min 0
 * @desc 背景在同一个菜单，并且在菜单层级下，先后排序的位置，0表示最后面。
 * @default 0
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//插件记录：
//		【该插件从全局变量中筛选，放入局部变量使用】
//		插件结构并不复杂，但是坑多，需要理清楚下面变量的关系：
//			DrillUp.menu_backgrounds		获取的值（80个）
//			this._sprite_backgrounds_data	符合的值（小于80个，不要将数组二者混合使用）
//			this._sprite_backgrounds		符合的图片（小于80个）
//			temp_sprite			临时图片
//			temp_sprite_data	临时的值


//=============================================================================
// ** 变量获取    MOG可视化编辑生成代码↓
//=============================================================================
			var Imported = Imported || {};
			Imported.Drill_MenuBackground = true;
			var DrillUp = DrillUp || {}; 

			DrillUp.parameters = PluginManager.parameters('Drill_MenuBackground');
			DrillUp.menu_backgrounds_bottom_visible = 'false';

			DrillUp.menu_backgrounds_def = [];
			DrillUp.menu_backgrounds_def['src_img'] = 'beijing_morencaidan_0';
			DrillUp.menu_backgrounds_def['x'] = 0;
			DrillUp.menu_backgrounds_def['y'] = 0;
			DrillUp.menu_backgrounds_def['opacity'] = 255;
			DrillUp.menu_backgrounds_def['blendMode'] = 0;
			DrillUp.menu_backgrounds_def['x_speed'] = 0.0;
			DrillUp.menu_backgrounds_def['y_speed'] = 0.0;

			DrillUp.menu_backgrounds_max = 7;
			DrillUp.menu_backgrounds = [];

			DrillUp.menu_backgrounds[0] = {};
			DrillUp.menu_backgrounds[0]['menu'] = '主菜单';
			DrillUp.menu_backgrounds[0]['menu_key'] = '';
			DrillUp.menu_backgrounds[0]['src_img'] = 'beijing_morencaidan_1';
			DrillUp.menu_backgrounds[0]['x'] = 0;
			DrillUp.menu_backgrounds[0]['y'] = 0;
			DrillUp.menu_backgrounds[0]['opacity'] = 255;
			DrillUp.menu_backgrounds[0]['blendMode'] = 0;
			DrillUp.menu_backgrounds[0]['x_speed'] = 0.0;
			DrillUp.menu_backgrounds[0]['y_speed'] = 0.0;
			DrillUp.menu_backgrounds[0]['menu_index'] = 0;
			DrillUp.menu_backgrounds[0]['zIndex'] = 0;

			DrillUp.menu_backgrounds[1] = {};
			DrillUp.menu_backgrounds[1]['menu'] = '道具';
			DrillUp.menu_backgrounds[1]['menu_key'] = '';
			DrillUp.menu_backgrounds[1]['src_img'] = 'beijing_item_3';
			DrillUp.menu_backgrounds[1]['x'] = 0;
			DrillUp.menu_backgrounds[1]['y'] = 0;
			DrillUp.menu_backgrounds[1]['opacity'] = 255;
			DrillUp.menu_backgrounds[1]['blendMode'] = 0;
			DrillUp.menu_backgrounds[1]['x_speed'] = 0.0;
			DrillUp.menu_backgrounds[1]['y_speed'] = 0.0;
			DrillUp.menu_backgrounds[1]['menu_index'] = 0;
			DrillUp.menu_backgrounds[1]['zIndex'] = 0;

			DrillUp.menu_backgrounds[2] = {};
			DrillUp.menu_backgrounds[2]['menu'] = '技能';
			DrillUp.menu_backgrounds[2]['menu_key'] = '';
			DrillUp.menu_backgrounds[2]['src_img'] = 'beijing_skill_4';
			DrillUp.menu_backgrounds[2]['x'] = 0;
			DrillUp.menu_backgrounds[2]['y'] = 0;
			DrillUp.menu_backgrounds[2]['opacity'] = 255;
			DrillUp.menu_backgrounds[2]['blendMode'] = 0;
			DrillUp.menu_backgrounds[2]['x_speed'] = 0.0;
			DrillUp.menu_backgrounds[2]['y_speed'] = 0.0;
			DrillUp.menu_backgrounds[2]['menu_index'] = 0;
			DrillUp.menu_backgrounds[2]['zIndex'] = 0;

			DrillUp.menu_backgrounds[3] = {};
			DrillUp.menu_backgrounds[3]['menu'] = '装备';
			DrillUp.menu_backgrounds[3]['menu_key'] = '';
			DrillUp.menu_backgrounds[3]['src_img'] = 'beijing_zhuangbei_5';
			DrillUp.menu_backgrounds[3]['x'] = 0;
			DrillUp.menu_backgrounds[3]['y'] = 0;
			DrillUp.menu_backgrounds[3]['opacity'] = 255;
			DrillUp.menu_backgrounds[3]['blendMode'] = 0;
			DrillUp.menu_backgrounds[3]['x_speed'] = 0.0;
			DrillUp.menu_backgrounds[3]['y_speed'] = 0.0;
			DrillUp.menu_backgrounds[3]['menu_index'] = 0;
			DrillUp.menu_backgrounds[3]['zIndex'] = 0;

			DrillUp.menu_backgrounds[4] = {};
			DrillUp.menu_backgrounds[4]['menu'] = '状态';
			DrillUp.menu_backgrounds[4]['menu_key'] = '';
			DrillUp.menu_backgrounds[4]['src_img'] = 'beijing_zhuangtai_6';
			DrillUp.menu_backgrounds[4]['x'] = 0;
			DrillUp.menu_backgrounds[4]['y'] = 0;
			DrillUp.menu_backgrounds[4]['opacity'] = 255;
			DrillUp.menu_backgrounds[4]['blendMode'] = 0;
			DrillUp.menu_backgrounds[4]['x_speed'] = 0.0;
			DrillUp.menu_backgrounds[4]['y_speed'] = 0.0;
			DrillUp.menu_backgrounds[4]['menu_index'] = 0;
			DrillUp.menu_backgrounds[4]['zIndex'] = 0;

			DrillUp.menu_backgrounds[5] = {};
			DrillUp.menu_backgrounds[5]['menu'] = '保存';
			DrillUp.menu_backgrounds[5]['menu_key'] = '';
			DrillUp.menu_backgrounds[5]['src_img'] = 'beijing_baocun_7';
			DrillUp.menu_backgrounds[5]['x'] = 0;
			DrillUp.menu_backgrounds[5]['y'] = 0;
			DrillUp.menu_backgrounds[5]['opacity'] = 255;
			DrillUp.menu_backgrounds[5]['blendMode'] = 0;
			DrillUp.menu_backgrounds[5]['x_speed'] = 0.0;
			DrillUp.menu_backgrounds[5]['y_speed'] = 0.0;
			DrillUp.menu_backgrounds[5]['menu_index'] = 0;
			DrillUp.menu_backgrounds[5]['zIndex'] = 1;

			DrillUp.menu_backgrounds[6] = {};
			DrillUp.menu_backgrounds[6]['menu'] = '主菜单';
			DrillUp.menu_backgrounds[6]['menu_key'] = '';
			DrillUp.menu_backgrounds[6]['src_img'] = 'beijing_zhucaidan_8';
			DrillUp.menu_backgrounds[6]['x'] = 0;
			DrillUp.menu_backgrounds[6]['y'] = 0;
			DrillUp.menu_backgrounds[6]['opacity'] = 255;
			DrillUp.menu_backgrounds[6]['blendMode'] = 0;
			DrillUp.menu_backgrounds[6]['x_speed'] = 0.0;
			DrillUp.menu_backgrounds[6]['y_speed'] = 0.0;
			DrillUp.menu_backgrounds[6]['menu_index'] = 0;
			DrillUp.menu_backgrounds[6]['zIndex'] = 0;

			DrillUp.menu_backgrounds[7] = {};
			DrillUp.menu_backgrounds[7]['menu'] = '商店';
			DrillUp.menu_backgrounds[7]['menu_key'] = '';
			DrillUp.menu_backgrounds[7]['src_img'] = 'beijing_shop';
			DrillUp.menu_backgrounds[7]['x'] = 0;
			DrillUp.menu_backgrounds[7]['y'] = 0;
			DrillUp.menu_backgrounds[7]['opacity'] = 255;
			DrillUp.menu_backgrounds[7]['blendMode'] = 0;
			DrillUp.menu_backgrounds[7]['x_speed'] = 0.0;
			DrillUp.menu_backgrounds[7]['y_speed'] = 0.0;
			DrillUp.menu_backgrounds[7]['menu_index'] = 0;
			DrillUp.menu_backgrounds[7]['zIndex'] = 0;
//=============================================================================
// **ImageManager    MOG可视化编辑生成代码↑
//=============================================================================
ImageManager.loadMenus = function(filename) {
    return this.loadBitmap('img/menus/', filename, 0, true);
};

//=============================================================================
// ** 从 Scene_MenuBase 中进行背景追加
//=============================================================================

var _drill_menu_background_createBackground = Scene_MenuBase.prototype.createBackground;
Scene_MenuBase.prototype.createBackground = function() {
	SceneManager._menu_background = false;	
   	this._sprite_backgrounds = [];							//注意，该数组与DrillUp.menu_backgrounds数组的下标不同步，要使用data
   	this._sprite_backgrounds_data = [];
	_drill_menu_background_createBackground.call(this);		//与背景一同创建
	
	if (this._backgroundSprite && !DrillUp.menu_backgrounds_bottom_visible ) {	//底图
		this._backgroundSprite.bitmap = null;
	};

};

var _drill_menu_background_terminate = Scene_MenuBase.prototype.terminate;
Scene_MenuBase.prototype.terminate = function() {
	_drill_menu_background_terminate.call(this);			//设置需要下次重新创建
	SceneManager._menu_background = false;
};

//==============================
// ** 层级排序
//==============================
Scene_MenuBase.prototype.sortByZIndex = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};

//==============================
// * 创建背景
//==============================
Scene_MenuBase.prototype.create_backgrounds_drill = function() {	
	SceneManager._menu_background = true;
	
	if(!this._sprite_backgrounds){
		this._sprite_backgrounds = [];		//防止某些覆写的菜单报错
		this._sprite_backgrounds_data = [];
	}
	if( !this._backgroundSprite ){		//菜单后面层
		this._backgroundSprite = new Sprite();
	}
	if( !this._foregroundSprite ){		//菜单前面层
		this._foregroundSprite = new Sprite();
		this.addChild(this._foregroundSprite);
	}
	
	for (var i = 0; i < DrillUp.menu_backgrounds.length; i++) {
		if( this.check_backgrounds(i) ){
			var temp_sprite_data = JSON.parse(JSON.stringify( DrillUp.menu_backgrounds[i] ));	//拷贝object（杜绝引用造成的修改）
			var temp_sprite = new TilingSprite(ImageManager.loadMenus(temp_sprite_data['src_img']));	//TilingSprite平铺图层
			temp_sprite.move(0, 0, Graphics.width, Graphics.height);
			temp_sprite.origin.x = temp_sprite_data['x'];
			temp_sprite.origin.y = temp_sprite_data['y'];
			temp_sprite.opacity = temp_sprite_data['opacity'];
			temp_sprite.blendMode = temp_sprite_data['blendMode'];
			temp_sprite.zIndex = temp_sprite_data['zIndex'];
			
			this._sprite_backgrounds.push(temp_sprite);
			this._sprite_backgrounds_data.push(temp_sprite_data);
			if( temp_sprite_data['menu_index'] == 0 ){
				this._backgroundSprite.addChild(temp_sprite);
			}else{
				this._foregroundSprite.addChild(temp_sprite);
			}
		}
	}
	if(this._sprite_backgrounds.length == 0 ){	//默认背景，0菜单层级，0图片层级（需要重新配一个json结构）
		var temp_sprite_data = [];
		temp_sprite_data['src_img'] = DrillUp.menu_backgrounds_def['src_img'];
		temp_sprite_data['x'] = DrillUp.menu_backgrounds_def['x'];
		temp_sprite_data['y'] = DrillUp.menu_backgrounds_def['y'];
		temp_sprite_data['opacity'] = DrillUp.menu_backgrounds_def['opacity'];
		temp_sprite_data['blendMode'] = DrillUp.menu_backgrounds_def['blendMode'];
		temp_sprite_data['x_speed'] = DrillUp.menu_backgrounds_def['x_speed'];
		temp_sprite_data['y_speed'] = DrillUp.menu_backgrounds_def['y_speed'];
		temp_sprite_data['zIndex'] = 0;
		
		var temp_sprite = new TilingSprite(ImageManager.loadMenus(temp_sprite_data['src_img']));
		temp_sprite.move(0, 0, Graphics.width, Graphics.height);
		temp_sprite.origin.x = temp_sprite_data['x']
		temp_sprite.origin.y = temp_sprite_data['y'];
		temp_sprite.opacity = temp_sprite_data['opacity'];
		temp_sprite.blendMode = temp_sprite_data['blendMode'];
		temp_sprite.zIndex = temp_sprite_data['zIndex'];
		
		this._sprite_backgrounds.push(temp_sprite);
		this._sprite_backgrounds_data.push(temp_sprite_data);
		this._backgroundSprite.addChild(temp_sprite);
	}
	this.sortByZIndex();
};

//==============================
// * 检查背景所在菜单
//==============================
Scene_MenuBase.prototype.check_backgrounds = function(i) {
	var temp_sprite_data = DrillUp.menu_backgrounds[i] ; 	//注意，执行该方法，是在DrillUp.menu_backgrounds中遍历
	if ( temp_sprite_data === undefined || temp_sprite_data.length == 0  ) {
		return false;
	}
	if( SceneManager._scene.constructor.name === "Scene_Menu" && temp_sprite_data['menu'] == "主菜单" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Item" && temp_sprite_data['menu'] == "道具" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Skill" && temp_sprite_data['menu'] == "技能" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Equip" && temp_sprite_data['menu'] == "装备" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Status" && temp_sprite_data['menu'] == "状态" ){
		return true;
	}else if( (SceneManager._scene.constructor.name === "Scene_Party"||SceneManager._scene.constructor.name === "Scene_Formation") && temp_sprite_data['menu'] == "队形"  ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Options" && temp_sprite_data['menu'] == "选项" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Save" && temp_sprite_data['menu'] == "保存" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Shop" && temp_sprite_data['menu'] == "商店" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_GameEnd" && temp_sprite_data['menu'] == "游戏结束" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_EnemyBook" && temp_sprite_data['menu'] == "敌人图鉴" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_ItemBook" && temp_sprite_data['menu'] == "物品图鉴" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Picture_Gallery" && temp_sprite_data['menu'] == "画廊" ){
		return true;
	}else{
		if( SceneManager._scene.constructor.name === temp_sprite_data['menu_key'] ){
			return true;
		}
	}
	return false;
};

//==============================
// * 刷新背景
//==============================
var _drill_menu_background_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_menu_background_update.call(this);
	
	if ( SceneManager.isCurrentSceneStarted() && !SceneManager._menu_background ) {
		this.create_backgrounds_drill();				//创建，进入界面后只执行一次
	}
	if (SceneManager._menu_background) {this.update_backgrounds()};
};

Scene_MenuBase.prototype.update_backgrounds = function() {
	for (var i = 0; i < this._sprite_backgrounds.length; i++) {
		this._sprite_backgrounds[i].origin.x += this._sprite_backgrounds_data[i]['x_speed'];
		this._sprite_backgrounds[i].origin.y += this._sprite_backgrounds_data[i]['y_speed'];
	};
};