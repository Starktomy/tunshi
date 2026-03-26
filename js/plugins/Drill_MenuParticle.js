//=============================================================================
// Drill_MenuParticle.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        主菜单 - 多层菜单粒子
 * @author Drill_up
 *
 * @help
 * =============================================================================
 * +++ Drill_MenuParticle +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在任意菜单中放置一个或者多个粒子，只要关键字对上。
 * 如果要了解更多信息，去看看"关于菜单背景,粒子,魔法圈.docx"。
 * ★★必须放在 各菜单界面、菜单插件 的前面★★
 * ★★自带背景的菜单插件可能不起作用，因为那个插件自己设置了底图★★
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 先确保项目img文件夹下是否有menus文件夹！（img/menus）
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-默认粒子
 *
 * 背景1 资源-粒子
 * 背景2 资源-粒子
 * 背景3 资源-粒子
 * ……
 *
 * 你可以在同一个菜单里面加入非常多的不同种类的粒子。
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
 * @param ---默认粒子---
 * @default
 *
 * @param 资源-默认粒子
 * @parent ---默认粒子---
 * @desc 默认粒子的图片资源。
 * @default 粒子-默认粒子
 * @require 1
 * @dir img/menus/
 * @type file
 *
 * @param 平移-默认粒子 X
 * @parent ---默认粒子---
 * @desc x轴方向平移，单位像素。0为贴在最左边。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 平移-默认粒子 Y
 * @parent ---默认粒子---
 * @desc x轴方向平移，单位像素。0为贴在最上面。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 默认透明度
 * @parent ---默认粒子---
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 默认混合模式
 * @parent ---默认粒子---
 * @type number
 * @min 0
 * @max 16
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"pixi的渲染混合模式"。
 * @default 0
 *
 * @param 默认粒子数量
 * @parent ---默认粒子---
 * @type number
 * @min 0
 * @desc 默认的菜单粒子数量。
 * @default 10
 *
 * @param 默认粒子X速度
 * @parent ---默认粒子---
 * @desc 粒子按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 * @default 0
 *
 * @param 默认粒子Y速度
 * @parent ---默认粒子---
 * @desc 粒子按y轴方向循环移动的速度。正数向下，负数向上。（可为小数）
 * @default 0
 *
 * @param 默认粒子旋转速度
 * @parent ---默认粒子---
 * @desc 正数逆时针，负数顺时针，单位 弧度/帧。(1秒60帧)
 * 6.28表示一圈，设置0.01表示大概10秒转一圈，设置0则不旋转。
 * @default 1.0
 *
 * @param ---粒子组 1至20---
 * @default
 *
 * @param 粒子-1
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-2
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-3
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-4
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-5
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-6
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-7
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-8
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-9
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-10
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-11
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-12
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-13
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-14
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-15
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-16
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-17
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-18
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-19
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-20
 * @parent ---粒子组 1至20---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子组21至40---
 * @default
 *
 * @param 粒子-21
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-22
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-23
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-24
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-25
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-26
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-27
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-28
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-29
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-30
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-31
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-32
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-33
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-34
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-35
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-36
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-37
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-38
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-39
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-40
 * @parent ---粒子组21至40---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子组41至60---
 * @default
 *
 * @param 粒子-41
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-42
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-43
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-44
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-45
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-46
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-47
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-48
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-49
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-50
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-51
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-52
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-53
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-54
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-55
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-56
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-57
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-58
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-59
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-60
 * @parent ---粒子组41至60---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子组61至80---
 * @default
 *
 * @param 粒子-61
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-62
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-63
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-64
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-65
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-66
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-67
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-68
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-69
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-70
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-71
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-72
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-73
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-74
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-75
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-76
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-77
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-78
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-79
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-80
 * @parent ---粒子组61至80---
 * @type struct<MenuParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 */
/*~struct~MenuParticle:
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
 * @desc 将粒子放在指定的菜单。如果为自定义，那么要填写自定义关键字。
 * @default 主菜单
 * 
 * @param 自定义关键字
 * @parent 所属菜单
 * @desc 设置所属菜单为自定义时，将根据此关键字找到对应的菜单。前缀为Scene_，比如：Scene_Synthesis。
 * @default 
 *
 * @param 资源-粒子
 * @desc 粒子的图片资源。
 * @default 粒子-默认粒子
 * @require 1
 * @dir img/menus/
 * @type file
 *
 * @param 平移-粒子 X
 * @desc x轴方向平移，单位像素。0为贴在最左边。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 平移-粒子 Y
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
 * @param 粒子数量
 * @type number
 * @min 1
 * @desc 菜单的粒子数量。
 * @default 10
 *
 * @param 粒子X速度
 * @desc 粒子按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 * @default 0
 *
 * @param 粒子Y速度
 * @desc 粒子按y轴方向循环移动的速度。正数向上，负数向下。（可为小数）
 * @default 0
 *
 * @param 粒子旋转速度
 * @desc 正数逆时针，负数顺时针，单位 弧度/帧。(1秒60帧)
 * 6.28表示一圈，设置0.01表示大概10秒转一圈，设置0则不旋转。
 * @default 0.01
 *
 * @param 菜单层级
 * @type select
 * @option 在菜单后面
 * @value 0
 * @option 在菜单前面
 * @value 1
 * @desc 粒子所属的菜单层级。
 * @default 0
 *
 * @param 图片层级
 * @type number
 * @min 0
 * @desc 粒子在同一个菜单，并且在菜单层级下，先后排序的位置，0表示最后面。
 * @default 8
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//插件记录：
//		【该插件从全局变量中筛选，放入局部变量使用】
//		插件结构比背景复杂，多一个数组的量级，需要理清楚下面变量的关系：
//			DrillUp.menu_particles				获取的值（80个）
//			this._sprite_particles_data			符合的值（小于80个，不要将数组二者混合使用）
//			this._sprite_particles				符合的图片（小于80个）
//			DrillUp.menu_particles[i]['count']	粒子数量（直接遍历塞进符合图片中）
//			temp_sprite			临时图片
//			temp_sprite_data	临时的值
//=============================================================================
// ** 变量获取    MOG可视化编辑生成代码↓
//=============================================================================
			var Imported = Imported || {};
			Imported.Drill_MenuParticle = true;
			var DrillUp = DrillUp || {}; 

			DrillUp.parameters = PluginManager.parameters('Drill_MenuParticle');
			DrillUp.menu_particles_def = [];
			DrillUp.menu_particles_def['src_img'] = 'lizi_skill_0';
			DrillUp.menu_particles_def['x'] = 0;
			DrillUp.menu_particles_def['y'] = 0;
			DrillUp.menu_particles_def['opacity'] = 255;
			DrillUp.menu_particles_def['blendMode'] = 0;
			DrillUp.menu_particles_def['count'] = 30;
			DrillUp.menu_particles_def['x_speed'] = 0.0;
			DrillUp.menu_particles_def['y_speed'] = 0.0;
			DrillUp.menu_particles_def['rotation'] = 0.01;

			DrillUp.menu_particles_max = 6;
			DrillUp.menu_particles = [];

			DrillUp.menu_particles[0] = {};
			DrillUp.menu_particles[0]['menu'] = '主菜单';
			DrillUp.menu_particles[0]['menu_key'] = '';
			DrillUp.menu_particles[0]['src_img'] = 'lizi_zhucaidan_1';
			DrillUp.menu_particles[0]['x'] = 100;
			DrillUp.menu_particles[0]['y'] = 0;
			DrillUp.menu_particles[0]['opacity'] = 255;
			DrillUp.menu_particles[0]['blendMode'] = 0;
			DrillUp.menu_particles[0]['count'] = 10;
			DrillUp.menu_particles[0]['x_speed'] = 0.2;
			DrillUp.menu_particles[0]['y_speed'] = -0.6;
			DrillUp.menu_particles[0]['rotation'] = 0.00;
			DrillUp.menu_particles[0]['menu_index'] = 0;
			DrillUp.menu_particles[0]['zIndex'] = 1;

			DrillUp.menu_particles[1] = {};
			DrillUp.menu_particles[1]['menu'] = '主菜单';
			DrillUp.menu_particles[1]['menu_key'] = '';
			DrillUp.menu_particles[1]['src_img'] = 'lizi_zhucaidan_2';
			DrillUp.menu_particles[1]['x'] = 200;
			DrillUp.menu_particles[1]['y'] = 0;
			DrillUp.menu_particles[1]['opacity'] = 255;
			DrillUp.menu_particles[1]['blendMode'] = 0;
			DrillUp.menu_particles[1]['count'] = 10;
			DrillUp.menu_particles[1]['x_speed'] = 0.2;
			DrillUp.menu_particles[1]['y_speed'] = -0.4;
			DrillUp.menu_particles[1]['rotation'] = 0.00;
			DrillUp.menu_particles[1]['menu_index'] = 0;
			DrillUp.menu_particles[1]['zIndex'] = 2;

			DrillUp.menu_particles[2] = {};
			DrillUp.menu_particles[2]['menu'] = '主菜单';
			DrillUp.menu_particles[2]['menu_key'] = '';
			DrillUp.menu_particles[2]['src_img'] = 'lizi_zhucaidan_3';
			DrillUp.menu_particles[2]['x'] = 300;
			DrillUp.menu_particles[2]['y'] = 0;
			DrillUp.menu_particles[2]['opacity'] = 255;
			DrillUp.menu_particles[2]['blendMode'] = 0;
			DrillUp.menu_particles[2]['count'] = 10;
			DrillUp.menu_particles[2]['x_speed'] = 0.2;
			DrillUp.menu_particles[2]['y_speed'] = -0.2;
			DrillUp.menu_particles[2]['rotation'] = 0.00;
			DrillUp.menu_particles[2]['menu_index'] = 0;
			DrillUp.menu_particles[2]['zIndex'] = 3;

			DrillUp.menu_particles[3] = {};
			DrillUp.menu_particles[3]['menu'] = '道具';
			DrillUp.menu_particles[3]['menu_key'] = '';
			DrillUp.menu_particles[3]['src_img'] = 'lizi_item_4';
			DrillUp.menu_particles[3]['x'] = 0;
			DrillUp.menu_particles[3]['y'] = 0;
			DrillUp.menu_particles[3]['opacity'] = 255;
			DrillUp.menu_particles[3]['blendMode'] = 0;
			DrillUp.menu_particles[3]['count'] = 20;
			DrillUp.menu_particles[3]['x_speed'] = 0.2;
			DrillUp.menu_particles[3]['y_speed'] = -0.1;
			DrillUp.menu_particles[3]['rotation'] = 0.01;
			DrillUp.menu_particles[3]['menu_index'] = 0;
			DrillUp.menu_particles[3]['zIndex'] = 1;

			DrillUp.menu_particles[4] = {};
			DrillUp.menu_particles[4]['menu'] = '道具';
			DrillUp.menu_particles[4]['menu_key'] = '';
			DrillUp.menu_particles[4]['src_img'] = 'lizi_item_5';
			DrillUp.menu_particles[4]['x'] = 0;
			DrillUp.menu_particles[4]['y'] = 0;
			DrillUp.menu_particles[4]['opacity'] = 255;
			DrillUp.menu_particles[4]['blendMode'] = 0;
			DrillUp.menu_particles[4]['count'] = 20;
			DrillUp.menu_particles[4]['x_speed'] = 0.2;
			DrillUp.menu_particles[4]['y_speed'] = -0.2;
			DrillUp.menu_particles[4]['rotation'] = 0.01;
			DrillUp.menu_particles[4]['menu_index'] = 0;
			DrillUp.menu_particles[4]['zIndex'] = 0;

			DrillUp.menu_particles[5] = {};
			DrillUp.menu_particles[5]['menu'] = '技能';
			DrillUp.menu_particles[5]['menu_key'] = '';
			DrillUp.menu_particles[5]['src_img'] = 'lizi_skill_6';
			DrillUp.menu_particles[5]['x'] = 0;
			DrillUp.menu_particles[5]['y'] = 0;
			DrillUp.menu_particles[5]['opacity'] = 255;
			DrillUp.menu_particles[5]['blendMode'] = 0;
			DrillUp.menu_particles[5]['count'] = 30;
			DrillUp.menu_particles[5]['x_speed'] = 0.0;
			DrillUp.menu_particles[5]['y_speed'] = 0.0;
			DrillUp.menu_particles[5]['rotation'] = 0.01;
			DrillUp.menu_particles[5]['menu_index'] = 0;
			DrillUp.menu_particles[5]['zIndex'] = 0;

			DrillUp.menu_particles[6] = {};
			DrillUp.menu_particles[6]['menu'] = '商店';
			DrillUp.menu_particles[6]['menu_key'] = 'Scene_Shop';
			DrillUp.menu_particles[6]['src_img'] = 'lizi_shop';
			DrillUp.menu_particles[6]['x'] = 0;
			DrillUp.menu_particles[6]['y'] = 0;
			DrillUp.menu_particles[6]['opacity'] = 255;
			DrillUp.menu_particles[6]['blendMode'] = 0;
			DrillUp.menu_particles[6]['count'] = 90;
			DrillUp.menu_particles[6]['x_speed'] = 0.0;
			DrillUp.menu_particles[6]['y_speed'] = 0.0;
			DrillUp.menu_particles[6]['rotation'] = 0.01;
			DrillUp.menu_particles[6]['menu_index'] = 0;
			DrillUp.menu_particles[6]['zIndex'] = 4;
//=============================================================================
// **ImageManager    MOG可视化编辑生成代码↑
//=============================================================================
ImageManager.loadMenus = function(filename) {
    return this.loadBitmap('img/menus/', filename, 0, true);
};

//=============================================================================
// ** 从 Scene_MenuBase 中进行粒子追加
//=============================================================================

var _drill_menu_particle_createBackground = Scene_MenuBase.prototype.createBackground;
Scene_MenuBase.prototype.createBackground = function() {
	SceneManager._menu_particle = false;	
   	this._sprite_particles = [];
   	this._sprite_particles_data = [];
	_drill_menu_particle_createBackground.call(this);		//与背景一同创建
	
};

var _drill_menu_particle_terminate = Scene_MenuBase.prototype.terminate;
Scene_MenuBase.prototype.terminate = function() {
	_drill_menu_particle_terminate.call(this);			//设置需要下次重新创建
	SceneManager._menu_particle = false;
};

//==============================
// ** 层级排序
//==============================
Scene_MenuBase.prototype.sortByZIndex = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};

//==============================
// * 创建粒子
//==============================
Scene_MenuBase.prototype.create_particles = function() {	
	SceneManager._menu_particle = true;
	
	if(!this._sprite_particles){
		this._sprite_particles = [];		//防止某些覆写的菜单报错
		this._sprite_particles_data = [];
	}
	if( !this._backgroundSprite ){		//菜单后面层
		this._backgroundSprite = new Sprite();
	}
	if( !this._foregroundSprite ){		//菜单前面层
		this._foregroundSprite = new Sprite();
		this.addChild(this._foregroundSprite);
	}
	
	for (var i = 0; i < DrillUp.menu_particles.length; i++) {
		if( this.check_particles(i) ){
			for( var j = 0; j < DrillUp.menu_particles[i]['count'] ; j++ ){
				
				var temp_sprite_data = JSON.parse(JSON.stringify( DrillUp.menu_particles[i] ));	//拷贝object（杜绝引用造成的修改）
				
				var temp_sprite = new Sprite(ImageManager.loadMenus(temp_sprite_data['src_img']));
				temp_sprite.anchor.x = 0.5;
				temp_sprite.anchor.y = 0.5;
				temp_sprite.blendMode = temp_sprite_data['blendMode'];
				temp_sprite.zIndex = temp_sprite_data['zIndex'];
				
				this._sprite_particles.push(temp_sprite);
				this._sprite_particles_data.push(temp_sprite_data);
				if( temp_sprite_data['menu_index'] == 0 ){
					this._backgroundSprite.addChild(temp_sprite);
				}else{
					this._foregroundSprite.addChild(temp_sprite);
				}
				
				this.reset_particles(this._sprite_particles_data.length-1);
			}

		}
	}
	if(this._sprite_particles.length == 0){	//默认粒子，0菜单层级，0图片层级
		for( var j = 0; j < DrillUp.menu_particles_def['count'] ; j++ ){
			
			var temp_sprite_data = [];
			temp_sprite_data['src_img'] = DrillUp.menu_particles_def['src_img'] ;
			temp_sprite_data['x'] = DrillUp.menu_particles_def['x'] ;
			temp_sprite_data['y'] = DrillUp.menu_particles_def['y'] ;
			temp_sprite_data['opacity'] = DrillUp.menu_particles_def['opacity'] ;
			temp_sprite_data['blendMode'] = DrillUp.menu_particles_def['blendMode'] ;
			temp_sprite_data['count'] = DrillUp.menu_particles_def['count'] ;
			temp_sprite_data['x_speed'] = DrillUp.menu_particles_def['x_speed'] ;
			temp_sprite_data['y_speed'] = DrillUp.menu_particles_def['y_speed'] ;
			temp_sprite_data['rotation'] = DrillUp.menu_particles_def['rotation'] ;
			
			var temp_sprite = new Sprite(ImageManager.loadMenus(temp_sprite_data['src_img']));
			temp_sprite.anchor.x = 0.5;
			temp_sprite.anchor.y = 0.5;
			temp_sprite.blendMode = temp_sprite_data['blendMode'];
			temp_sprite.zIndex = 8;
			
			this._sprite_particles.push(temp_sprite);
			this._sprite_particles_data.push(temp_sprite_data);
			this._backgroundSprite.addChild(temp_sprite);
		
			this.reset_particles(this._sprite_particles_data.length-1);
		}
	}
	this.sortByZIndex();
};

//==============================
// * 检查粒子所在菜单
//==============================
Scene_MenuBase.prototype.check_particles = function(i) {
	var temp_sprite_data = DrillUp.menu_particles[i] ; 	//注意，执行该方法，是在DrillUp.menu_particles中遍历
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
// * 刷新粒子
//==============================
var _drill_menu_particle_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_menu_particle_update.call(this);
	
	if ( SceneManager.isCurrentSceneStarted() && !SceneManager._menu_particle ) {
		this.create_particles();				//创建，进入界面后只执行一次
	}
	if (SceneManager._menu_particle) {this.update_particles()};
};

Scene_MenuBase.prototype.update_particles = function() {
	for (var i = 0; i < this._sprite_particles.length; i++) {
		this._sprite_particles[i].x += this._sprite_particles_data[i]['x_speed_random'];
		this._sprite_particles[i].y += this._sprite_particles_data[i]['y_speed_random'];
		this._sprite_particles[i].rotation += this._sprite_particles_data[i]['rotation_random'];
		this._sprite_particles[i].opacity += 3 * this._sprite_particles_data[i]['opacity_dir'];
		if(this._sprite_particles[i].opacity >= 255){
			this._sprite_particles_data[i]['opacity_dir'] = -1 * Math.random() ;
		}
    	if (this.need_reset_particles(i)) { this.reset_particles(i);};
	};
};

//==============================
// * 粒子重设条件
//==============================	
Scene_MenuBase.prototype.need_reset_particles = function(i) {
	var spr = this._sprite_particles[i];
	var data = this._sprite_particles_data[i];
	
	if (spr.x < -1 * Math.abs(data['start_x_fix']) - spr.width * 3) {return true};		//过边界
	if (spr.x > Math.abs(data['start_x_fix']) + Graphics.boxWidth + spr.width * 3) {return true};
	if (spr.y < -1 * Math.abs(data['start_y_fix']) - spr.height * 3) {return true};
	if (spr.y > Math.abs(data['start_y_fix']) + Graphics.boxHeight + spr.height * 3) {return true};
	
	if(spr.opacity == 0 && data['opacity_dir'] < 0 ){return true;}	//透明度低
	
	return false;
};

//==============================
// * 粒子重设
//==============================	
Scene_MenuBase.prototype.reset_particles = function(i) {
	var spr = this._sprite_particles[i];
	var data = this._sprite_particles_data[i];
	
	data['x_speed_random'] = ((Math.random() * 2) + 0.4) * data['x_speed'] + Math.random()-0.5;		//偏随机x方向
	data['y_speed_random'] = ((Math.random() * 2) + 0.4) * data['y_speed'] + Math.random()-0.5;		//偏随机y方向
	data['rotation_random']= ((Math.random() * data['rotation']));									//偏随机旋转
	data['opacity_dir'] = 1 * Math.random();
	data['start_x_fix'] = 0;
	data['start_y_fix'] = 0;
	if (data['x_speed'] > 0) { data['start_x_fix'] = -(Graphics.boxWidth / 4)};		//起点偏移x
	if (data['x_speed'] < 0) { data['start_x_fix'] = (Graphics.boxWidth / 4)};
	if (data['y_speed'] > 0) { data['start_y_fix'] = -(Graphics.boxHeight / 4)};	//起点偏移y
	if (data['y_speed'] < 0) { data['start_y_fix'] = (Graphics.boxHeight / 4)};
	
	spr.x = data['start_x_fix'] + Math.randomInt(Graphics.boxWidth);		//变化值
	spr.y = data['start_y_fix'] + Math.randomInt(Graphics.boxHeight);
	spr.opacity = 0;
	var pz = ((Math.random() * 0.5) * 1);
	spr.scale = new PIXI.Point(0.5 + Number(pz), 0.5 + Number(pz));
	
	//this._sprite_particles[i] = spr;			//data得到的是变量地址，不需要重新赋值
	//this._sprite_particles_data[i] = data;
	
};