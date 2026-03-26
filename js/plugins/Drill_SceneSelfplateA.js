//=============================================================================
// Drill_SceneSelfplateA.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        主菜单 - 全自定义信息面板A
 * @author Drill_up
 *
 *
 * @help
 * =============================================================================
 * +++ Drill_SceneSelfplateA +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 可全部自定义的信息面板，包含一个选项窗口、一个文本描述窗口和一个描述图。
 * 你可以在面板中写任何东西，比如做成新手教学手册、历史书、怪物掉宝介绍、
 * 指示牌内容等。
 * 【支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----使用技巧
 * 1.如果你只要一个描述窗口，设置一个选项，然后把选项窗口设置y1000看不见即可。
 * 2.如果你要做像任务激活那种形式，设置两个选项，一个激活，一个未激活（灰色）
 * 通过插件指令开启关闭激活未激活的，使其看起来像一个选项。
 * 3.窗口的布局规划是任意的，你可以去看看"窗口与布局.docx"。
 * 4.描述图没有大小限制，你甚至可以做成一个大窗口，切换选项等同于切换窗口。
 * 5.窗口选项和描述支持所有文本的特殊内容：
 *    \c[n] 变颜色    \i[n] 显示图标    \{\} 字体变大变小
 *    \V[n] 显示变量  \N[n] 显示角色名  \G 显示货币单位
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 描述窗口中支持一些简单的表达式，表达式可以识别内容并转换成特定形式，如下：
 * （内容中的冒号为英文冒号。冒号之间没空格。）
 * 
 * <复:B:A>
 *
 * 参数A：被复制的内容
 * 参数B：数字值
 *        填2，表示内容复制2个，填\V[12]变量，会根据游戏中的值，变化复制数量。
 *
 * <分隔:C:D>
 *
 * 参数C：颜色数字
 * 参数D：分隔线厚度
 *
 * 示例：
 * ii<复:2:aaa>ii
 *   表示iiaaaaaaii。
 * <分隔:0:1>
 *   表示整行会变成一条厚度为1，颜色为0（白色）的分隔线。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 先确保项目img文件夹下是否有menus_self文件夹！（img/menus_self）
 * 如果没有文件夹，自己建立。需要配置下列资源文件：
 *
 * 资源-整体布局
 * 资源-选项窗口
 * 资源-描述窗口
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 打开全自定义信息面板，使用下面的插件指令：
 *
 * 插件指令（打开面板）：Selfplate_A_open
 *
 * 插件指令（显示选项）：Selfplate_A_enable 1
 * 插件指令（隐藏选项）：Selfplate_A_disable 1
 * 插件指令（锁定选项）：Selfplate_A_lock 1
 * 插件指令（解锁选项）：Selfplate_A_unlock 1
 *
 * 面板打开时，游戏是暂停的，所以你不能在面板中实时变化某些数值。
 *
 * -----------------------------------------------------------------------------
 * ----关键字
 * 该面板的关键字为： Selfplate_A
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 使得与其他自定义信息面板互不干扰，添加了复合表达式功能。
 * [v1.2]
 * 使得自定义信息面板可以添加到标题中，并且数据可全局可分档存储。
 *
 * @param ----杂项----
 * @default 
 *
 * @param 资源-整体布局
 * @parent ----杂项----
 * @desc 信息面板的整体布局。
 * @default 信息面板-整体布局
 * @require 1
 * @dir img/menus_self/
 * @type file
 *
 * @param 是否添加到主菜单
 * @parent ----杂项----
 * @type boolean
 * @on 添加
 * @off 不添加
 * @desc true - 添加，false - 不添加
 * @default false
 *
 * @param 主菜单显示名
 * @parent 是否添加到主菜单
 * @desc 主菜单显示的选项名。
 * @default 信息面板A
 *
 * @param 是否在标题窗口中显示
 * @parent ----杂项----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true-显示,false-不显示。注意数据存储的位置，如果是分档存储，标题将打开上一存档的数据。没有存档则会报错。
 * @default false
 *
 * @param 标题窗口显示名
 * @parent 是否在标题窗口中显示
 * @desc 标题窗口显示的名称。
 * @default 信息面板A
 *
 * @param 数据是否全局存储
 * @parent 是否在标题窗口中显示
 * @type boolean
 * @on 全局存储
 * @off 分档存储
 * @desc true-存储在全局游戏中,false-存在存档记录中,控制该面板的解锁隐藏的状态数据存储位置。(该设置不会立即生效,要多试)
 * @default false
 *
 * @param 用语-锁定的选项名
 * @parent ----杂项----
 * @desc 信息面板显示的被锁定选项名。
 * @default \c[7]---未知---
 *
 * @param 用语-锁定的选项内容
 * @parent ----杂项----
 * @type note
 * @desc 信息面板显示的被锁定选项内容。
 * @default "该内容的描述已被隐藏。"
 *
 * @param ---内容组 1至20---
 * @default 
 *
 * @param 内容-1
 * @parent ---内容组 1至20---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-2
 * @parent ---内容组 1至20---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-3
 * @parent ---内容组 1至20---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-4
 * @parent ---内容组 1至20---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-5
 * @parent ---内容组 1至20---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-6
 * @parent ---内容组 1至20---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-7
 * @parent ---内容组 1至20---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-8
 * @parent ---内容组 1至20---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-9
 * @parent ---内容组 1至20---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-10
 * @parent ---内容组 1至20---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-11
 * @parent ---内容组 1至20---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-12
 * @parent ---内容组 1至20---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-13
 * @parent ---内容组 1至20---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-14
 * @parent ---内容组 1至20---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-15
 * @parent ---内容组 1至20---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-16
 * @parent ---内容组 1至20---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-17
 * @parent ---内容组 1至20---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-18
 * @parent ---内容组 1至20---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-19
 * @parent ---内容组 1至20---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-20
 * @parent ---内容组 1至20---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param ---内容组21至40---
 * @default 
 *
 * @param 内容-21
 * @parent ---内容组21至40---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-22
 * @parent ---内容组21至40---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-23
 * @parent ---内容组21至40---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-24
 * @parent ---内容组21至40---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-25
 * @parent ---内容组21至40---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-26
 * @parent ---内容组21至40---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-27
 * @parent ---内容组21至40---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-28
 * @parent ---内容组21至40---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-29
 * @parent ---内容组21至40---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-30
 * @parent ---内容组21至40---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-31
 * @parent ---内容组21至40---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-32
 * @parent ---内容组21至40---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-33
 * @parent ---内容组21至40---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-34
 * @parent ---内容组21至40---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-35
 * @parent ---内容组21至40---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-36
 * @parent ---内容组21至40---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-37
 * @parent ---内容组21至40---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-38
 * @parent ---内容组21至40---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-39
 * @parent ---内容组21至40---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-40
 * @parent ---内容组21至40---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param ---内容组41至60---
 * @default 
 *
 * @param 内容-41
 * @parent ---内容组41至60---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-42
 * @parent ---内容组41至60---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-43
 * @parent ---内容组41至60---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-44
 * @parent ---内容组41至60---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-45
 * @parent ---内容组41至60---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-46
 * @parent ---内容组41至60---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-47
 * @parent ---内容组41至60---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-48
 * @parent ---内容组41至60---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-49
 * @parent ---内容组41至60---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-50
 * @parent ---内容组41至60---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-51
 * @parent ---内容组41至60---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-52
 * @parent ---内容组41至60---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-53
 * @parent ---内容组41至60---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-54
 * @parent ---内容组41至60---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-55
 * @parent ---内容组41至60---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-56
 * @parent ---内容组41至60---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-57
 * @parent ---内容组41至60---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-58
 * @parent ---内容组41至60---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-59
 * @parent ---内容组41至60---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-60
 * @parent ---内容组41至60---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param ---内容组61至80---
 * @default 
 *
 * @param 内容-61
 * @parent ---内容组61至80---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-62
 * @parent ---内容组61至80---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-63
 * @parent ---内容组61至80---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-64
 * @parent ---内容组61至80---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-65
 * @parent ---内容组61至80---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-66
 * @parent ---内容组61至80---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-67
 * @parent ---内容组61至80---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-68
 * @parent ---内容组61至80---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-69
 * @parent ---内容组61至80---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-70
 * @parent ---内容组61至80---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-71
 * @parent ---内容组61至80---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-72
 * @parent ---内容组61至80---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-73
 * @parent ---内容组61至80---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-74
 * @parent ---内容组61至80---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-75
 * @parent ---内容组61至80---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-76
 * @parent ---内容组61至80---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-77
 * @parent ---内容组61至80---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-78
 * @parent ---内容组61至80---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-79
 * @parent ---内容组61至80---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param 内容-80
 * @parent ---内容组61至80---
 * @type struct<SelfplateA>
 * @desc 添加新的内容，一个选项对应一个描述和一个描述图。
 * @default 
 *
 * @param ----选项窗口----
 * @default 
 * 
 * @param 平移-选项窗口 X
 * @parent ----选项窗口----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 30
 *
 * @param 平移-选项窗口 Y
 * @parent ----选项窗口----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 120
 *
 * @param 选项窗口起点 X
 * @parent ----选项窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default -100
 *
 * @param 选项窗口起点 Y
 * @parent ----选项窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 选项窗口移动时长
 * @parent ----选项窗口----
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 30
 *
 * @param 是否使用选项窗口布局
 * @parent ----选项窗口----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 资源-选项窗口
 * @desc 选项窗口的图片资源。
 * @parent 是否使用选项窗口布局
 * @default 信息面板-选项窗口
 * @require 1
 * @dir img/menus_self/
 * @type file
 *
 * @param 平移-选项窗口布局 X
 * @parent 是否使用选项窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-选项窗口布局 Y
 * @parent 是否使用选项窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 选项窗口宽度
 * @parent ----选项窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 220
 *
 * @param 选项窗口高度
 * @parent ----选项窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的高度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 460
 *
 * @param 选项窗口列数
 * @parent ----选项窗口----
 * @type number
 * @min 1
 * @desc 选项窗口的列数。
 * @default 1
 *
 * @param 选项窗口字体大小
 * @parent ----选项窗口----
 * @type number
 * @min 1
 * @desc 选项窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param ----描述窗口----
 * @default 
 * 
 * @param 平移-描述窗口 X
 * @parent ----描述窗口----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 285
 *
 * @param 平移-描述窗口 Y
 * @parent ----描述窗口----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 100
 *
 * @param 描述窗口起点 X
 * @parent ----描述窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default 100
 *
 * @param 描述窗口起点 Y
 * @parent ----描述窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 描述窗口移动时长
 * @parent ----描述窗口----
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 30
 *
 * @param 是否使用描述窗口布局
 * @parent ----描述窗口----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 资源-描述窗口
 * @desc 描述窗口的图片资源。
 * @parent 是否使用描述窗口布局
 * @default 信息面板-描述窗口
 * @require 1
 * @dir img/menus_self/
 * @type file
 *
 * @param 平移-描述窗口布局 X
 * @parent 是否使用描述窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-描述窗口布局 Y
 * @parent 是否使用描述窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 描述窗口宽度
 * @parent ----描述窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 510
 *
 * @param 描述窗口高度
 * @parent ----描述窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的高度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 360
 *
 * @param 描述窗口字体大小
 * @parent ----描述窗口----
 * @type number
 * @min 1
 * @desc 描述窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param 描述窗口行间距
 * @parent ----描述窗口----
 * @type number
 * @min 1
 * @desc 描述窗口行间距，通过这个设置你的图标与文字的适应。
 * @default 10
 * 
 * @param 平移-描述图 X
 * @parent ----描述窗口----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 285
 *
 * @param 平移-描述图 Y
 * @parent ----描述窗口----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 480
 *
 * @param 描述图起点 X
 * @parent ----描述窗口----
 * @desc 描述图初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 描述图起点 Y
 * @parent ----描述窗口----
 * @desc 描述图初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 100
 *
 * @param 描述图移动时长
 * @parent ----描述窗口----
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 30
 * 
 *
 */
/*~struct~SelfplateA:
 * 
 * @param 选项名
 * @desc 当前的选项名字。
 * @default 未命名选项
 *
 * @param 是否初始显示
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
 *
 * @param 是否初始锁定
 * @type boolean
 * @on 锁定
 * @off 解锁
 * @desc true - 锁定，false - 解锁
 * @default false
 * 
 * @param 描述内容
 * @type note
 * @desc 该选项下的描述窗口显示的内容。
 * @default "没有描述"
 *
 * @param 资源-描述图片
 * @desc 该选项下的显示的描述图片。
 * @default 
 * @require 1
 * @dir img/menus_self/
 * @type file
 *
 */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//插件记录：
//		【该插件 上锁解锁为局部+全局 两个都存，其它全局变量混用】
//		替换以下字符变成新面板：
//		（A面板旧版本有函数没有做区分）
//		Selfplate_A
//		SelfplateA
//		selfA
//		信息面板A
//		menus_selfA -> menus_self
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_SceneSelfplateA = true;
　　var DrillUp = DrillUp || {}; 

    DrillUp.parameters = PluginManager.parameters('Drill_SceneSelfplateA');
    DrillUp.selfA_layout = String(DrillUp.parameters['资源-整体布局'] || "");
    DrillUp.selfA_selWin_layout = String(DrillUp.parameters['资源-选项窗口'] || "");
    DrillUp.selfA_descWin_layout = String(DrillUp.parameters['资源-描述窗口'] || "");
	DrillUp.selfA_add_to_menu = String(DrillUp.parameters['是否添加到主菜单'] || "true") === "true";	
    DrillUp.selfA_menu_name = String(DrillUp.parameters['主菜单显示名'] || "");
	DrillUp.selfA_add_to_title = String(DrillUp.parameters['是否在标题窗口中显示'] || "false") === "true";	
    DrillUp.selfA_title_name = String(DrillUp.parameters['标题窗口显示名'] || "");
	DrillUp.selfA_title_data_global = String(DrillUp.parameters['数据是否全局存储'] || "false") === "true";	
	
	DrillUp.selfA_selWin_x = Number(DrillUp.parameters['平移-选项窗口 X'] || 30);
	DrillUp.selfA_selWin_y = Number(DrillUp.parameters['平移-选项窗口 Y'] || 120);
	DrillUp.selfA_selWin_slideX = Number(DrillUp.parameters['选项窗口起点 X'] || -100);
	DrillUp.selfA_selWin_slideY = Number(DrillUp.parameters['选项窗口起点 Y'] || 0);
	DrillUp.selfA_selWin_slideTime = Number(DrillUp.parameters['选项窗口移动时长'] || 30);
	DrillUp.selfA_selWin_Layout_visible = String(DrillUp.parameters['是否使用选项窗口布局'] || "true") === "true";	
	DrillUp.selfA_selWin_LayoutX = Number(DrillUp.parameters['平移-选项窗口布局 X'] || 0);
	DrillUp.selfA_selWin_LayoutY = Number(DrillUp.parameters['平移-选项窗口布局 Y'] || 0);
	DrillUp.selfA_selWin_width = Number(DrillUp.parameters['选项窗口宽度'] || 220);
	DrillUp.selfA_selWin_height = Number(DrillUp.parameters['选项窗口高度'] || 460);
	DrillUp.selfA_selWin_fontsize = Number(DrillUp.parameters['选项窗口字体大小'] || 22);
	DrillUp.selfA_selWin_col = Number(DrillUp.parameters['选项窗口列数'] || 1);

	DrillUp.selfA_descWin_x = Number(DrillUp.parameters['平移-描述窗口 X'] || 285);
	DrillUp.selfA_descWin_y = Number(DrillUp.parameters['平移-描述窗口 Y'] || 100);
	DrillUp.selfA_descWin_slideX = Number(DrillUp.parameters['描述窗口起点 X'] || 100);
	DrillUp.selfA_descWin_slideY = Number(DrillUp.parameters['描述窗口起点 Y'] || 0);
	DrillUp.selfA_descWin_slideTime = Number(DrillUp.parameters['描述窗口移动时长'] || 30);
	DrillUp.selfA_descWin_Layout_visible = String(DrillUp.parameters['是否使用描述窗口布局'] || "true") === "true";	
	DrillUp.selfA_descWin_LayoutX = Number(DrillUp.parameters['平移-描述窗口布局 X'] || 0);
	DrillUp.selfA_descWin_LayoutY = Number(DrillUp.parameters['平移-描述窗口布局 Y'] || 0);
	DrillUp.selfA_descWin_width = Number(DrillUp.parameters['描述窗口宽度'] || 510);
	DrillUp.selfA_descWin_height = Number(DrillUp.parameters['描述窗口高度'] || 360);
	DrillUp.selfA_descWin_fontsize = Number(DrillUp.parameters['描述窗口字体大小'] || 22);
	DrillUp.selfA_descWin_lineheight = Number(DrillUp.parameters['描述窗口行间距'] || 10);

	DrillUp.selfA_descPic_x = Number(DrillUp.parameters['平移-描述图 X'] || 285);
	DrillUp.selfA_descPic_y = Number(DrillUp.parameters['平移-描述图 Y'] || 480);
	DrillUp.selfA_descPic_slideX = Number(DrillUp.parameters['描述图起点 X'] || 0);
	DrillUp.selfA_descPic_slideY = Number(DrillUp.parameters['描述图起点 Y'] || 100);
	DrillUp.selfA_descPic_slideTime = Number(DrillUp.parameters['描述图移动时长'] || 30);
	
	DrillUp.selfA_context_list_length = 80;
	DrillUp.selfA_context_visible_list = [];	//全局用的临时控制显示变量
	DrillUp.selfA_context_list = {};
	for (var i = 1; i <= DrillUp.selfA_context_list_length ; i++ ) {
		if( DrillUp.parameters['内容-' + String(i) ] != "" ){
			DrillUp.selfA_context_list[i] = JSON.parse(DrillUp.parameters['内容-' + String(i)] );
		}else{
			DrillUp.selfA_context_list[i] = "";
		}
		DrillUp.selfA_context_list[i]['index'] = i;
			
		//描述内容处理
		var temp = String(DrillUp.selfA_context_list[i]['描述内容']);
		temp = temp.substring(1,temp.length-1);
		temp = temp.replace(/\\\\/g,"\\");
		temp = temp.split(/\\n/);
		DrillUp.selfA_context_list[i]['context'] = temp;
		//alert(temp);
		
		//选项名处理
		temp = String(DrillUp.selfA_context_list[i]['选项名']);
		temp = temp.replace(/\\\\/g,"\\");
		DrillUp.selfA_context_list[i]['name'] = temp;
		
		//显示处理
		DrillUp.selfA_context_list[i]['enabled'] = (DrillUp.selfA_context_list[i]['是否初始显示'] || "false") == "true" ;
		
		//锁定处理
		DrillUp.selfA_context_list[i]['locked'] = (DrillUp.selfA_context_list[i]['是否初始锁定'] || "false") == "true" ;
		
		//描述图片处理
		DrillUp.selfA_context_list[i]['pic'] = (DrillUp.selfA_context_list[i]['资源-描述图片'] || "");
		
	};
	
	DrillUp.selfA_locked_name = String(DrillUp.parameters['用语-锁定的选项名'] || "");
	DrillUp.selfA_locked_name = DrillUp.selfA_locked_name.replace(/\\\\/g,"\\");
	DrillUp.selfA_locked_context = String(DrillUp.parameters['用语-锁定的选项内容'] || "");
	DrillUp.selfA_locked_context = DrillUp.selfA_locked_context.substring(1,DrillUp.selfA_locked_context.length-1);
	DrillUp.selfA_locked_context = DrillUp.selfA_locked_context.replace(/\\\\/g,"\\");
	DrillUp.selfA_locked_context = DrillUp.selfA_locked_context.split(/\\n/);
	
	
//=============================================================================
// ** 全局读取
//=============================================================================
	var _drill_global = DataManager.loadGlobalInfo();
	//alert(JSON.stringify(_drill_global));
	if( !DrillUp.global_selfA_enable ){	//游戏没关情况
		if( _drill_global && _drill_global[0] && _drill_global[0]["_global_Selfplate_A_enable"] ){		//游戏关闭后，重开读取global中的配置
			DrillUp.global_selfA_enable = _drill_global[0]["_global_Selfplate_A_enable"];
		}else{
			DrillUp.global_selfA_enable = [];
		}
	}
	if( !DrillUp.global_selfA_lock ){	
		if( _drill_global && _drill_global[0] && _drill_global[0]["_global_Selfplate_A_lock"] ){
			DrillUp.global_selfA_lock = _drill_global[0]["_global_Selfplate_A_lock"];
		}else{
			DrillUp.global_selfA_lock = [];
		}
	}
	for(var i=1 ; i< DrillUp.global_selfA_enable.length ; i++){	//全局变量赋值（存储的数量多一个，i0）
		DrillUp.selfA_context_list[i]['enabled'] = DrillUp.global_selfA_enable[i] ;	//显示处理
		DrillUp.selfA_context_list[i]['locked'] = DrillUp.global_selfA_lock[i] ;	//锁定处理
	}
	
	
//=============================================================================
// ** 全局存储
//=============================================================================
var _drill_selfA_saveGlobal = DataManager.saveGlobalInfo;
DataManager.saveGlobalInfo = function(info) {	//第0个存档为全局存档
	if(!info[0]){info[0] = []};
	DrillUp.global_selfA_enable = [null];	//i从0开始
	DrillUp.global_selfA_lock = [null];
	for (var i = 1; i <= DrillUp.selfA_context_list_length ; i++ ) {
		DrillUp.global_selfA_enable.push(DrillUp.selfA_context_list[i]['enabled']);
		DrillUp.global_selfA_lock.push(DrillUp.selfA_context_list[i]['locked']);
	}
	info[0]["_global_Selfplate_A_enable"] = DrillUp.global_selfA_enable;
	info[0]["_global_Selfplate_A_lock"] = DrillUp.global_selfA_lock;
	_drill_selfA_saveGlobal.call(this,info);
};

DataManager.forceSaveGlobalInfo = function() {
	var globalInfo = this.loadGlobalInfo() || [];
	globalInfo[0] = this.makeSavefileInfo();
	this.saveGlobalInfo(globalInfo);
};

//=============================================================================
// ** ImageManager
//=============================================================================

ImageManager.loadMenuSelfDef = function(filename) {
    return this.loadBitmap('img/menus_self/', filename, 0, true);
};

//==============================
// * 插件指令
//==============================
var _selfA_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_selfA_Game_Interpreter_pluginCommand.call(this, command, args);
	//打开菜单
	if (command === 'Selfplate_A_open') {
		SceneManager.push(Scene_Selfplate_A);
	}
	//显示第n个选项
	if (command === 'Selfplate_A_enable') {
		if(args.length == 1){
			var temp = Number(args[0]);
			DrillUp.selfA_context_list[temp]['enabled'] = true;	//全局数据
			DataManager.forceSaveGlobalInfo();
			if($gameSystem._selfA_context_list){ $gameSystem._selfA_context_list[temp]['enabled'] = true;}	//存档数据
		}
	}
	//隐藏第n个选项
	if (command === 'Selfplate_A_disable') {
		if(args.length == 1){
			var temp = Number(args[0]);
			DrillUp.selfA_context_list[temp]['enabled'] = false;	//全局数据
			DataManager.forceSaveGlobalInfo();
			if($gameSystem._selfA_context_list){ $gameSystem._selfA_context_list[temp]['enabled'] = false;}	//存档数据
		}
	}
	//锁定第n个选项
	if (command === 'Selfplate_A_lock') {
		if(args.length == 1){
			var temp = Number(args[0]);
			DrillUp.selfA_context_list[temp]['locked'] = true;	//全局数据
			DataManager.forceSaveGlobalInfo();
			if($gameSystem._selfA_context_list){ $gameSystem._selfA_context_list[temp]['locked'] = true;}	//存档数据
		}
	}
	//解锁第n个选项
	if (command === 'Selfplate_A_unlock') {
		if(args.length == 1){
			var temp = Number(args[0]);
			DrillUp.selfA_context_list[temp]['locked'] = false;	//全局数据
			DataManager.forceSaveGlobalInfo();
			if($gameSystem._selfA_context_list){ $gameSystem._selfA_context_list[temp]['locked'] = false;}	//存档数据
		}
	}
	
};

// ======================================================================
// * Scene_Menu 主菜单按钮
// ======================================================================
var _drill_selfAplate_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	_drill_selfAplate_createCommandWindow.call(this);
    this._commandWindow.setHandler('Selfplate_A',   this.command_Selfplate_A.bind(this));
};
Scene_Menu.prototype.command_Selfplate_A = function() {
    SceneManager.push(Scene_Selfplate_A);
};

var _drill_selfAplate_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	_drill_selfAplate_addOriginalCommands.call(this);
	if( DrillUp.selfA_add_to_menu ){
		this.addCommand(DrillUp.selfA_menu_name, 'Selfplate_A', this.areMainCommandsEnabled());
	}
};

//=============================================================================
// ** Scene Tittle 标题选项
//=============================================================================	
var _drill_selfAplate_title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    _drill_selfAplate_title_createCommandWindow.call(this);
	this._commandWindow.setHandler('Selfplate_A',  this.command_T_Selfplate_A.bind(this));
};
Scene_Title.prototype.command_T_Selfplate_A = function() {
    this._commandWindow.close();
    SceneManager.push(Scene_Selfplate_A);
};
var _drill_selfAplate_title_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    _drill_selfAplate_title_makeCommandList.call(this);
	if( DrillUp.selfA_add_to_title ){
		this.addCommand( DrillUp.selfA_title_name ,'Selfplate_A');
	}
};	
//=============================================================================
// ** 菜单-定义
//=============================================================================

function Scene_Selfplate_A() {
    this.initialize.apply(this, arguments);
}

Scene_Selfplate_A.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Selfplate_A.prototype.constructor = Scene_Selfplate_A;

//==============================
// * 菜单-初始化
//==============================
Scene_Selfplate_A.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
	this._cur_index = -1;
	//alert($gameSystem._selfA_context_list); //检查存档是否有记录
	if (!$gameSystem._selfA_context_list) {$gameSystem.data_init_Selfplate_A();};
};

//==============================
// * 菜单-存档数据赋值
//==============================
Game_System.prototype.data_init_Selfplate_A = function() {
	this._selfA_context_list = JSON.parse(JSON.stringify( DrillUp.selfA_context_list ));	//拷贝object（杜绝引用造成的修改）
	//（其它存储数据在这里初始化）
};

//==============================
// * 菜单-创建
//==============================
Scene_Selfplate_A.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this._field = new Sprite();
	this.addChild(this._field);	//布局（先画，其图层都被放在后面）
	this.createLayout();
	this.createDescPic();
	this.createSelect();
	this.createDesc();
	this.createSelectLayout();
	this.createDescLayout();
};

//==============================
// * 菜单-每帧刷新
//==============================
Scene_Selfplate_A.prototype.update = function() { 
	Scene_MenuBase.prototype.update.call(this);	
	this.updateSlide();
	this.updateIndex();
}

//==============================
// * 菜单-整体布局
//==============================
Scene_Selfplate_A.prototype.createLayout = function() {
	this._layout = new Sprite(ImageManager.loadMenuSelfDef(DrillUp.selfA_layout));
	this._field.addChild(this._layout);	
};

//==============================
// * 菜单-选项窗口
//==============================
Scene_Selfplate_A.prototype.createSelect = function() {
	var x = DrillUp.selfA_selWin_x + DrillUp.selfA_selWin_slideX;
	var y = DrillUp.selfA_selWin_y + DrillUp.selfA_selWin_slideY;
	var width = DrillUp.selfA_selWin_width;
	var height = DrillUp.selfA_selWin_height;
	this._window_select = new Window_SelfplateA_Select(x, y, width, height);
	this._window_select.contentsOpacity = 0;
	if( DrillUp.selfA_selWin_Layout_visible ){
		this._window_select.opacity = 0;
	}
	this._window_select._moving = 0;
	this._window_select.setHandler('cancel',   this.popScene.bind(this));//绑定退出界面事件
	this.addChild(this._window_select);
};

//==============================
// * 菜单-选项窗口布局
//==============================
Scene_Selfplate_A.prototype.createSelectLayout = function() {
	this._window_select_layout = new Sprite(ImageManager.loadMenuSelfDef(DrillUp.selfA_selWin_layout));
	if(!DrillUp.selfA_selWin_Layout_visible){
		this._window_select_layout = new Sprite("");
	};
	this._window_select_layout.x = this._window_select.x + DrillUp.selfA_selWin_LayoutX;
	this._window_select_layout.y = this._window_select.y + DrillUp.selfA_selWin_LayoutY;
	this._window_select_layout.opacity = 0;
	this._field.addChild(this._window_select_layout);	
};

//==============================
// * 菜单-描述窗口
//==============================
Scene_Selfplate_A.prototype.createDesc = function() {
	var x = DrillUp.selfA_descWin_x + DrillUp.selfA_descWin_slideX;
	var y = DrillUp.selfA_descWin_y + DrillUp.selfA_descWin_slideY;
	var width = DrillUp.selfA_descWin_width;
	var height = DrillUp.selfA_descWin_height;
	this._window_desc = new Window_SelfplateA_Desc(x, y, width, height);
	this._window_desc.contentsOpacity = 0;
	if( DrillUp.selfA_descWin_Layout_visible ){
		this._window_desc.opacity = 0;
	}
	this._window_desc._moving = 0;
	this.addChild(this._window_desc);
};

//==============================
// * 菜单-描述窗口布局
//==============================
Scene_Selfplate_A.prototype.createDescLayout = function() {
	this._window_desc_layout = new Sprite(ImageManager.loadMenuSelfDef(DrillUp.selfA_descWin_layout));
	if(!DrillUp.selfA_descWin_Layout_visible){
		this._window_desc_layout = new Sprite("");
	};
	this._window_desc_layout.x = this._window_desc.x + DrillUp.selfA_descWin_LayoutX;
	this._window_desc_layout.y = this._window_desc.y + DrillUp.selfA_descWin_LayoutY;
	this._window_desc_layout.opacity = 0;
	this._field.addChild(this._window_desc_layout);	
};

//==============================
// * 菜单-描述图片
//==============================
Scene_Selfplate_A.prototype.createDescPic = function() {
	this._window_desc_pic = new Sprite();
	this._window_desc_pic.x = DrillUp.selfA_descPic_x + DrillUp.selfA_descPic_slideX;
	this._window_desc_pic.y = DrillUp.selfA_descPic_y + DrillUp.selfA_descPic_slideY;
	this._field.addChild(this._window_desc_pic);	
};


//==============================
// * 菜单-重设窗口起点
//==============================
Scene_Selfplate_A.prototype.resetPosition = function() {
	//描述窗口每切换选项时刷新起点
	this._window_desc._moving = 0;
	this._window_desc.x = DrillUp.selfA_descWin_x + DrillUp.selfA_descWin_slideX;
	this._window_desc.y = DrillUp.selfA_descWin_y + DrillUp.selfA_descWin_slideY;
	this._window_desc.contentsOpacity = 0;
	this._window_desc.opacity = 0;
	this._window_desc_layout.opacity = 0;
	
	this._window_desc_pic._moving = 0;
	this._window_desc_pic.x = DrillUp.selfA_descPic_x + DrillUp.selfA_descPic_slideX;
	this._window_desc_pic.y = DrillUp.selfA_descPic_y + DrillUp.selfA_descPic_slideY;
	this._window_desc_pic.opacity = 0;
};

//==============================
// * 菜单-窗口平移
//==============================
Scene_Selfplate_A.prototype.updateSlide = function() {
	this._window_select._moving += 1;
    if (this._window_select._moving <= DrillUp.selfA_selWin_slideTime) {
		//this._window_select.x -= DrillUp.selfA_selWin_slideX/DrillUp.selfA_selWin_slideTime;
		//this._window_select.y -= DrillUp.selfA_selWin_slideY/DrillUp.selfA_selWin_slideTime;
		//this._window_select.contentsOpacity += 256/DrillUp.selfA_selWin_slideTime;
		this._window_select_layout.x = this._window_select.x + DrillUp.selfA_selWin_LayoutX;
		this._window_select_layout.y = this._window_select.y + DrillUp.selfA_selWin_LayoutY;
		this._window_select_layout.opacity += 256/DrillUp.selfA_selWin_slideTime;
		//if( !DrillUp.selfA_selWin_Layout_visible ){
		//	this._window_select.opacity += 256/DrillUp.selfA_selWin_slideTime;
		//}
	};
	this._window_desc._moving += 1;
    if (this._window_desc._moving <= DrillUp.selfA_descWin_slideTime) {
		//this._window_desc.x -= DrillUp.selfA_descWin_slideX/DrillUp.selfA_descWin_slideTime;
		//this._window_desc.y -= DrillUp.selfA_descWin_slideY/DrillUp.selfA_descWin_slideTime;
		//this._window_desc.contentsOpacity += 256/DrillUp.selfA_descWin_slideTime;
		this._window_desc_layout.x = this._window_desc.x + DrillUp.selfA_descWin_LayoutX;
		this._window_desc_layout.y = this._window_desc.y + DrillUp.selfA_descWin_LayoutY;
		this._window_desc_layout.opacity += 256/DrillUp.selfA_descWin_slideTime;
		//if( !DrillUp.selfA_descWin_Layout_visible ){
		//	this._window_desc.opacity += 256/DrillUp.selfA_descWin_slideTime;
		//}
	};
	this._window_desc_pic._moving += 1;
    if (this._window_desc_pic._moving <= DrillUp.selfA_descPic_slideTime) {
		this._window_desc_pic.x -= DrillUp.selfA_descPic_slideX/DrillUp.selfA_descPic_slideTime;
		this._window_desc_pic.y -= DrillUp.selfA_descPic_slideY/DrillUp.selfA_descPic_slideTime;
		this._window_desc_pic.opacity += 256/DrillUp.selfA_descPic_slideTime;
	};
};

//==============================
// * 菜单-窗口描述图刷新
//==============================
Scene_Selfplate_A.prototype.refreshDescPic = function(index) {
	var context_index = DrillUp.selfA_context_visible_list[index]['index'];
	this._window_desc_pic.bitmap = ImageManager.loadMenuSelfDef(DrillUp.selfA_context_list[context_index]["pic"]);
}

//==============================
// * 菜单-窗口选项刷新
//==============================
Scene_Selfplate_A.prototype.updateIndex = function() {
	if( this._cur_index != this._window_select._index ){
		this._cur_index = this._window_select._index;
		this.resetPosition();
		this._window_desc.refreshDesc(this._cur_index);
		this.refreshDescPic(this._cur_index);
	}
}


//==========================================================================================
// * 选项窗口
//==========================================================================================

function Window_SelfplateA_Select() {
	this.initialize.apply(this, arguments);
}

Window_SelfplateA_Select.prototype = Object.create(Window_Selectable.prototype);
Window_SelfplateA_Select.prototype.constructor = Window_SelfplateA_Select;

Window_SelfplateA_Select.lastTopRow = 0;
Window_SelfplateA_Select.lastIndex  = 0;

Window_SelfplateA_Select.prototype.initialize = function(x, y, width, height) {
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this.refresh();
	if( Window_SelfplateA_Select.lastIndex >= this._list.length ){
		Window_SelfplateA_Select.lastIndex = this._list.length-1;
	}
	this.setTopRow(Window_SelfplateA_Select.lastTopRow);
	this.select(Window_SelfplateA_Select.lastIndex);
	this.activate();
};

Window_SelfplateA_Select.prototype.maxCols = function() {
	return DrillUp.selfA_selWin_col;
};

Window_SelfplateA_Select.prototype.maxItems = function() {
	return this._list ? this._list.length : 0;
};

Window_SelfplateA_Select.prototype.standardFontSize = function() {
    return DrillUp.selfA_selWin_fontsize;
};

Window_SelfplateA_Select.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
    if (this._moving <= DrillUp.selfA_selWin_slideTime) {
		this.x -= DrillUp.selfA_selWin_slideX/DrillUp.selfA_selWin_slideTime;
		this.y -= DrillUp.selfA_selWin_slideY/DrillUp.selfA_selWin_slideTime;
		this.contentsOpacity += 256/DrillUp.selfA_selWin_slideTime;
	}
	if( DrillUp.selfA_selWin_Layout_visible ){
		this.opacity = 0;
	}else{
		this.opacity += 256/DrillUp.selfA_selWin_slideTime;
	}
};

Window_SelfplateA_Select.prototype.refresh = function() {
	DrillUp.selfA_context_visible_list = [];
	for(var i=1; i<= DrillUp.selfA_context_list_length ;i++){
		
		if( DrillUp.selfA_title_data_global ){
			var temp = DrillUp.selfA_context_list[i];	//全局数据
		}else{
			var temp = $gameSystem._selfA_context_list[i];	//存档数据
		}
		
		if( temp != "" && temp['enabled'] == true ){
			DrillUp.selfA_context_visible_list.push( temp );
		}
	}
	this._list = [];
	for(var j=0; j< DrillUp.selfA_context_visible_list.length ;j++){
		if( DrillUp.selfA_context_visible_list[j]['locked'] == false ){
			this._list.push( DrillUp.selfA_context_visible_list[j]['name'] );
		}else{
			this._list.push( DrillUp.selfA_locked_name );
		}
	}
	this.createContents();
	this.drawAllItems();	//绘制选项内容
};

Window_SelfplateA_Select.prototype.drawItem = function(index) {
    var str = this._list[index];
	var rect = this.itemRectForText(index);
	this.drawTextEx(str, rect.x, rect.y);
};

Window_SelfplateA_Select.prototype.processCancel = function() {
	Window_Selectable.prototype.processCancel.call(this);
	Window_SelfplateA_Select.lastTopRow = this.topRow();
	Window_SelfplateA_Select.lastIndex = this.index();
};

//==========================================================================================
// * 显示窗口
//==========================================================================================
function Window_SelfplateA_Desc() {
    this.initialize.apply(this, arguments);
}

Window_SelfplateA_Desc.prototype = Object.create(Window_Base.prototype);
Window_SelfplateA_Desc.prototype.constructor = Window_SelfplateA_Desc;

Window_SelfplateA_Desc.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x,y,width,height);
};

Window_SelfplateA_Desc.prototype.standardFontSize = function() {
    return DrillUp.selfA_descWin_fontsize;
};

Window_SelfplateA_Desc.prototype.update = function() {
	Window_Base.prototype.update.call(this);
    if (this._moving <= DrillUp.selfA_descWin_slideTime) {
		this.x -= DrillUp.selfA_descWin_slideX/DrillUp.selfA_descWin_slideTime;
		this.y -= DrillUp.selfA_descWin_slideY/DrillUp.selfA_descWin_slideTime;
		this.contentsOpacity += 256/DrillUp.selfA_descWin_slideTime;
	}
	if( DrillUp.selfA_descWin_Layout_visible ){
		this.opacity = 0;
	}else{
		this.opacity += 256/DrillUp.selfA_descWin_slideTime;
	}
};
	
Window_SelfplateA_Desc.prototype.refreshDesc = function(index) {
    this.createContents();
    this.contents.clear();
	//获取当前选项的描述内容
	var cur_index = index;
	this._data = DrillUp.selfA_context_visible_list[ cur_index ]['context'];
	if( DrillUp.selfA_context_visible_list[ cur_index ]['locked'] ){
		this._data = DrillUp.selfA_locked_context;
	}
	
	//绘制内容
	for (var i=0; i<this._data.length; i++) {
		var x = 0;
		var y = 0 + i*(this.standardFontSize() +DrillUp.selfA_descWin_lineheight);
		var temp = this._data[i];
		//复合表达式处理
		
		var re_A = /<复:.*?>/g;
		var re_ma_A = temp.match(re_A);
		if( re_ma_A != null ){
			
			var str = String(re_ma_A);
			var result = "";
			var s = str.slice(3,str.length-1).split(":");
			var copy = 0;
			var ss = s[0];
			if( ss.slice(0,2) == "\\v" || ss.slice(0,2) == "\\V" ){
				copy = Number(ss.slice(3,ss.length-1));
				copy = $gameVariables.value(copy);
			}else{
				copy = Number(s[0]);
			}
			for(var j =0;j< copy; j++){
				result += s[1];
			}
			
			temp = temp.replace(str,result);
		}
		
		var re_B = /<分隔:.*?>/;		// 分隔:颜色:厚度
		var re_ma_B = temp.match(re_B);
		if( re_ma_B != null ){
			var str = String(re_ma_B)
			var s = str.slice(4,str.length-1).split(":");
			if(s.length == 2){
				this.contents.fillRect(4, y + this.standardFontSize()/2 - Number(s[1])/2 , this.width - 8, Number(s[1]), this.textColor(s[0]));
				continue ;
			}
		}
		
		this.drawTextEx(temp,x,y);
	}
}

