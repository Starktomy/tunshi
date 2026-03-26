//=============================================================================
// GT50 Plugins - EquipSuitCore
// GT_EquipSuitCore.js
//=============================================================================

var Imported = Imported || {};
Imported.GT_EquipSuitCore = true;

var GT = GT || {};
GT.ESCore = GT.ESCore || {};
GT.ESCore.version = 1.4;

//=============================================================================
/*:
 * @plugindesc [v1.4]        装备 - 套装系统 - 核心
 * @author ganfly
 *
 * @help
 * ============================================================================
 *  介绍
 * ============================================================================
 * 
 * 装备套装系统，装备了一定数量的同一套装装备后会获得额外增益。
 * 本插件参考了YEP插件、XdRs_SuitCore、Olivia_EquipSetBonuses
 *
 * 目前支持效果：
 *     被动状态(兼容YEP_AutoPassiveStates的状态备注条件。)
 *     状态免疫
 *     学习技能
 *     基础参数增益
 *     额外参数增益
 *     特殊参数增益
 *     战斗结算增益
 *
 * ============================================================================
 *  参数对照表及公式
 * ============================================================================
 *
 *  Base代表基础值，Plus代表参数加成，Rate代表参数倍率
 * 
 *  基础参数      公式：(Base + Plus) * Rate
 *  MHP 最大生命
 *  MMP 最大魔法
 *  ATK 攻击力
 *  DEF 防御力
 *  MAT 魔法攻击力
 *  MDF 魔法防御力
 *  AGI 敏捷
 *  LUK 幸运
 *
 *  额外参数      公式：(Base + Plus) * Rate
 *  HIT 命中率
 *  EVA 闪避率
 *  CRI 暴击率
 *  CEV 暴击闪避率
 *  MEV 魔法闪避率
 *  MRF 魔法反射率
 *  CNT 反击率
 *  HRG 生命自动回复率
 *  MRG 魔法自动回复率
 *  TRG 怒气自动回复率
 * 
 *  特殊参数      公式：(Base + Plus) * Rate
 *  TGR 受到攻击几率
 *  GRD 防御效果
 *  REC 回复效果
 *  PHA 药理知识
 *  MCR 魔法消耗率
 *  TCR 怒气补充率
 *  PDR 物理伤害率
 *  MDR 魔法伤害率
 *  FDR 地形伤害率
 *  EXR 经验率
 *  
 *  战斗结算      公式：(Base + Base * Plus) * Rate
 *  EXP 经验获得量
 *  GOLD 金币获得量
 *  ITEM 物品爆率
 * 
 * ============================================================================
 *  备注
 * ============================================================================
 *
 * ----武器/防具备注:
 * 
 * <Equip Suit: x>
 * <Equip Suit: x, x, x>
 * <Equip Suit: x to y>
 *
 * 使得该装备属于x号套装或者是x到y号套装
 *
 *
 * ============================================================================
 *  脚本
 * ============================================================================
 * 
 *    $gameSystem.equipSuitPieces(suitId)
 *         返回id为suitid的套装所含的装备数
 * 
 *    $gameSystem.equipSuitPerActorNum(suitId, actorId)
 *         返回队伍里的actorId号角色(从0开始)装备了套装suitId的件数
 *
 *    $gameSystem.equipSuitTotalCount()
 *         返回数据库的总套装数
 *
 * ============================================================================
 *  用户规约
 * ============================================================================
 * 
 *  MIT规约。
 *  如果你使用了本插件，请在致谢中包含'ganfly'或者'gt50'，谢啦！
 * 
 * ============================================================================
 *  更新日志
 * ============================================================================
 * 
 * [v1.0] 完成插件。
 *  
 * [v1.1] 添加了战斗结算增益效果。
 * 
 * [v1.2] 添加了与扩展插件的兼容性。
 *
 * [v1.3] 优化了内部结构，增加了统计套装所含装备数的功能。
 * 
 * [v1.4] 修复了与YEP_PartySystem之间的bug。修复了大量小bug，
 *        添加了一些脚本供调用。
 *
 * ============================================================================
 *  帮助结束
 * ============================================================================
 *
 * @param Suit List 1-25
 * @text ----套装列表1-25----
 * @default
 *
 * @param Suit 1
 * @text 套装1
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 2
 * @text 套装2
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 3
 * @text 套装3
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 4
 * @text 套装4
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 5
 * @text 套装5
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 6
 * @text 套装6
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 7
 * @text 套装7
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 8
 * @text 套装8
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 9
 * @text 套装9
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 10
 * @text 套装10
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 11
 * @text 套装11
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 12
 * @text 套装12
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 13
 * @text 套装13
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 14
 * @text 套装14
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 15
 * @text 套装15
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 16
 * @text 套装16
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 17
 * @text 套装17
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 18
 * @text 套装18
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 19
 * @text 套装19
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 20
 * @text 套装20
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 21
 * @text 套装21
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 22
 * @text 套装22
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 23
 * @text 套装23
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 24
 * @text 套装24
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 25
 * @text 套装25
 * @parent Suit List 1-25
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit List 26-50
 * @text ----套装列表26-50----
 * @default
 *
 * @param Suit 26
 * @text 套装26
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 27
 * @text 套装27
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 28
 * @text 套装28
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 29
 * @text 套装29
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 30
 * @text 套装30
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 31
 * @text 套装31
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 32
 * @text 套装32
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 33
 * @text 套装33
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 34
 * @text 套装34
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 35
 * @text 套装35
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 36
 * @text 套装36
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 37
 * @text 套装37
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 38
 * @text 套装38
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 39
 * @text 套装39
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 40
 * @text 套装40
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 41
 * @text 套装41
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 42
 * @text 套装42
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 43
 * @text 套装43
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 44
 * @text 套装44
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 45
 * @text 套装45
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 46
 * @text 套装46
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 47
 * @text 套装47
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 48
 * @text 套装48
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 49
 * @text 套装49
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 50
 * @text 套装50
 * @parent Suit List 26-50
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit List 51-75
 * @text ----套装列表51-75----
 * @default
 *
 * @param Suit 51
 * @text 套装51
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 52
 * @text 套装52
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 53
 * @text 套装53
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 54
 * @text 套装54
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 55
 * @text 套装55
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 56
 * @text 套装56
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 57
 * @text 套装57
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 58
 * @text 套装58
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 59
 * @text 套装59
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 60
 * @text 套装60
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 61
 * @text 套装61
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 62
 * @text 套装62
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 63
 * @text 套装63
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 64
 * @text 套装64
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 65
 * @text 套装65
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 66
 * @text 套装66
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 67
 * @text 套装67
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 68
 * @text 套装68
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 69
 * @text 套装69
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 70
 * @text 套装70
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 71
 * @text 套装71
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 72
 * @text 套装72
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 73
 * @text 套装73
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 74
 * @text 套装74
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 75
 * @text 套装75
 * @parent Suit List 51-75
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit List 76-100
 * @text ----套装列表76-100----
 * @default
 *
 * @param Suit 76
 * @text 套装76
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 77
 * @text 套装77
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 78
 * @text 套装78
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 79
 * @text 套装79
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 80
 * @text 套装80
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 81
 * @text 套装81
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 82
 * @text 套装82
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 83
 * @text 套装83
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 84
 * @text 套装84
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 85
 * @text 套装85
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 86
 * @text 套装86
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 87
 * @text 套装87
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 88
 * @text 套装88
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 89
 * @text 套装89
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 90
 * @text 套装90
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 91
 * @text 套装91
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 92
 * @text 套装92
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 93
 * @text 套装93
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 94
 * @text 套装94
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 95
 * @text 套装95
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 96
 * @text 套装96
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 97
 * @text 套装97
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 98
 * @text 套装98
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 99
 * @text 套装99
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 100
 * @text 套装100
 * @parent Suit List 76-100
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 */
/* ---------------------------------------------------------------------------
 * struct<Suit>
 * ---------------------------------------------------------------------------
 */
/*~struct~Suit:
 *
 * @param SuitName
 * @text 套装名称
 * @desc 套装名称，可以使用文字代码。
 * @default xx套装
 *
 * @param SuitDescription
 * @text 套装额外说明
 * @type note
 * @desc 对整个套装的额外说明，可以使用文字代码。
 * @default ""
 *
 * @param SuitBonuses
 * @text 套装增益效果
 * @type struct<SuitPieces>[]
 * @desc 套装的分层效果。
 * @default []
 *
 * @param SuitNote
 * @text 套装备注
 * @type note
 * @desc 套装备注，无游戏内效果，仅用于制作套装时标记用
 * 比如可以写一下套装包含的装备，方便查找
 * @default ""
 */
/* ---------------------------------------------------------------------------
 * struct<SuitPieces>[]
 * ---------------------------------------------------------------------------
 */
/*~struct~SuitPieces:
 *
 * @param RequirePieces
 * @text 效果所需装备件数
 * @type number
 * @min 1
 * @desc 效果所需装备件数
 * @default 1
 *
 * @param Text
 * @text 本层效果说明
 * @type note
 * @desc 本层效果的额外说明，可以使用文字代码。
 * @default ""
 *
 * @param ShowText
 * @text 是否显示这层效果?
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否显示这层效果?
 * @default true
 *
 * @param PiecesBonuses
 * @text ----增益效果----
 *
 * @param PassiveStates
 * @text 被动状态
 * @parent PiecesBonuses
 * @type State[]
 * @desc 达到装备数要求时，自动给角色附加的状态，兼容YEP_AutoPassiveStates的状态备注条件。
 * @default []
 *
 * @param StatesResist
 * @text 状态免疫
 * @parent PiecesBonuses
 * @type State[]
 * @desc 达到装备数要求时，角色免疫的状态。
 * @default []
 *
 * @param AddSkills
 * @text 学习技能
 * @parent PiecesBonuses
 * @type Skill[]
 * @desc 达到装备数要求时，角色学习的技能。
 * @default []
 *
 * @param ParamBonuses
 * @text 基础参数增益
 * @parent PiecesBonuses
 * @type struct<ParamBonuses>[]
 * @desc 达到装备数要求时，角色的基础参数增益。
 * @default []
 *
 * @param XParamBonuses
 * @text 额外参数增益
 * @parent PiecesBonuses
 * @type struct<XParamBonuses>[]
 * @desc 达到装备数要求时，角色的额外参数增益。
 * @default []
 *
 * @param SParamBonuses
 * @text 特殊参数增益
 * @parent PiecesBonuses
 * @type struct<SParamBonuses>[]
 * @desc 达到装备数要求时，角色的特殊参数增益。
 * @default []
 *
 * @param BResultBonuses
 * @text 战斗结算增益
 * @parent PiecesBonuses
 * @type struct<BResultBonuses>[]
 * @desc 达到装备数要求时，队伍的战斗结算增益。
 * @default []
 *
 */
/* ---------------------------------------------------------------------------
 * struct<ParamBonuses>[]
 * ---------------------------------------------------------------------------
 */
/*~struct~ParamBonuses:
 *
 * @param ParamName
 * @text 参数名称
 * @type combo
 * @option MHP
 * @option MMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc 参数名称，参照帮助中的缩写和参数名对照表
 * @default MHP
 *
 * @param ParamRate
 * @text 参数倍率
 * @desc 参数乘的倍率，1.0就是乘100%
 * @default 1.0
 *
 * @param ParamPlus
 * @text 参数加成
 * @desc 参数改变的值，可为负数，0代表加0，1代表加1，-1代表减1
 * @default 0
 *
 */
/* ---------------------------------------------------------------------------
 * struct<XParamBonuses>[]
 * ---------------------------------------------------------------------------
 */
/*~struct~XParamBonuses:
 *
 * @param ParamName
 * @text 参数名称
 * @type combo
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @desc 参数名称，参照帮助中的缩写和参数名对照表
 * @default HIT
 *
 * @param ParamRate
 * @text 参数倍率
 * @desc 参数乘的倍率，1.0就是乘100%
 * @default 1.0
 *
 * @param ParamPlus
 * @text 参数加成
 * @desc 参数改变的值，可为负数，0代表加0%，1代表加1%，-1代表减1%
 * @default 0
 *
 */
/* ---------------------------------------------------------------------------
 * struct<SParamBonuses>[]
 * ---------------------------------------------------------------------------
 */
/*~struct~SParamBonuses:
 *
 * @param ParamName
 * @text 参数名称
 * @type combo
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc 参数名称，参照帮助中的缩写和参数名对照表
 * @default TGR
 *
 * @param ParamRate
 * @text 参数倍率
 * @desc 参数乘的倍率，1.0就是乘100%
 * @default 1.0
 *
 * @param ParamPlus
 * @text 参数加成
 * @desc 参数改变的值，可为负数，0代表加0%，1代表加1%，-1代表减1%
 * @default 0
 *
 */
/* ---------------------------------------------------------------------------
 * struct<BResultBonuses>[]
 * ---------------------------------------------------------------------------
 */
/*~struct~BResultBonuses:
 *
 * @param ParamName
 * @text 参数名称
 * @type combo
 * @option EXP
 * @option GOLD
 * @option ITEM
 * @desc 参数名称，参照帮助中的缩写和参数名对照表
 * @default EXP
 *
 * @param ParamRate
 * @text 参数倍率
 * @desc 参数乘的倍率，1.0就是乘100%
 * @default 1.0
 *
 * @param ParamPlus
 * @text 参数加成
 * @desc 参数改变的值，可为负数，0代表加0%，1代表加1%，-1代表减1%
 * @default 0
 *
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

GT.Parameters = PluginManager.parameters('GT_EquipSuitCore');
GT.Param = GT.Param || {};

GT.Param.EquipSuitData0 = GT.Parameters;

//=============================================================================
// DataManager
//=============================================================================

var $dataEquipSuits = [null];
GT.ESCore.totalCount = 0;

DataManager.equipSuitDatabaseAdd = function(id, data) {
    if (!data) return $dataEquipSuits.push(null);
    var suitName = data['SuitName'];
    var suitDescription = data['SuitDescription'];
	var suitBonuses = [];
	var dataBonuses = JSON.parse(data['SuitBonuses']);
	for (var i = 0; i < dataBonuses.length; ++i) {
		var pieceBonuses = this.equipSuitDataExtract(JSON.parse(dataBonuses[i]));
		suitBonuses.push(pieceBonuses);
	}
    var Suit = {
        name: suitName,
        id: id,
		indexEquip: [],
        description: suitDescription,
        bonuses: suitBonuses,
        note: ''
    };
    $dataEquipSuits[id] = Suit;
    GT.ESCore.totalCount += 1;
};

DataManager.equipSuitDataExtract = function(data) {
	obj = {};
	obj.requirePieces = Number(data.RequirePieces);
	obj.text = data.Text;
	obj.showText = eval(data.ShowText);
	var states = JSON.parse(data.PassiveStates);
	obj.states = [];
	while (states.length > 0) {
		obj.states.push(parseInt(states.shift()))
	};
	var statesResist = JSON.parse(data.StatesResist);
	obj.statesResist = [];
	while (statesResist.length > 0) {
		obj.statesResist.push(parseInt(statesResist.shift()))
	};
	var skills = JSON.parse(data.AddSkills);
	obj.skills = [];
	while (skills.length > 0) {
		obj.skills.push(parseInt(skills.shift()))
	};
	var paramBonuses = this.equipPieceDataExtract(JSON.parse(data.ParamBonuses));
	var xParamBonuses = this.equipPieceDataExtractX(JSON.parse(data.XParamBonuses));
	var sParamBonuses = this.equipPieceDataExtractS(JSON.parse(data.SParamBonuses));
	var bResultBonuses = this.equipPieceDataExtractB(JSON.parse(data.BResultBonuses));
	
	obj.paramRate = paramBonuses.paramRate;
	obj.paramPlus = paramBonuses.paramPlus;
	obj.xparamRate = xParamBonuses.paramRate;
	obj.xparamPlus = xParamBonuses.paramPlus;
	obj.sparamRate = sParamBonuses.paramRate;
	obj.sparamPlus = sParamBonuses.paramPlus;
	obj.bResultRate = bResultBonuses.paramRate;
	obj.bResultPlus = bResultBonuses.paramPlus;
	return obj;
};

DataManager.equipPieceDataExtract = function(data) {
	var paramRate = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
	var paramPlus = [0,0,0,0,0,0,0,0];
	for (var i = 0; i < data.length; i++) {
		var param = JSON.parse(data[i]);
		switch (param.ParamName) {
        case 'MHP':
			paramRate[0] = Number(param.ParamRate);
			paramPlus[0] = Number(param.ParamPlus);
			break;
		case 'MMP':
			paramRate[1] = Number(param.ParamRate);
			paramPlus[1] = Number(param.ParamPlus);
			break;
		case 'ATK':
			paramRate[2] = Number(param.ParamRate);
			paramPlus[2] = Number(param.ParamPlus);
			break;
		case 'DEF':
			paramRate[3] = Number(param.ParamRate);
			paramPlus[3] = Number(param.ParamPlus);
			break;
		case 'MAT':
			paramRate[4] = Number(param.ParamRate);
			paramPlus[4] = Number(param.ParamPlus);
			break;
		case 'MDF':
			paramRate[5] = Number(param.ParamRate);
	        paramPlus[5] = Number(param.ParamPlus);
			break;
		case 'AGI':
			paramRate[6] = Number(param.ParamRate);
	        paramPlus[6] = Number(param.ParamPlus);
			break;
        case 'LUK':
			paramRate[7] = Number(param.ParamRate);
	        paramPlus[7] = Number(param.ParamPlus);
			break;			
        }				
	}
	var paramTotelData = {
        paramRate: paramRate,
        paramPlus: paramPlus
    };
	return paramTotelData;
};

DataManager.equipPieceDataExtractX = function(data) {
	var paramRate = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
	var paramPlus = [0,0,0,0,0,0,0,0,0,0];
	for (var i = 0; i < data.length; i++) {
		var param = JSON.parse(data[i]);
		switch (param.ParamName) {
        case 'HIT':
			paramRate[0] = Number(param.ParamRate);
			paramPlus[0] = Number(param.ParamPlus);
			break;
		case 'EVA':
			paramRate[1] = Number(param.ParamRate);
			paramPlus[1] = Number(param.ParamPlus);
			break;
		case 'CRI':
			paramRate[2] = Number(param.ParamRate);
			paramPlus[2] = Number(param.ParamPlus);
			break;
		case 'CEV':
			paramRate[3] = Number(param.ParamRate);
			paramPlus[3] = Number(param.ParamPlus);
			break;
		case 'MEV':
			paramRate[4] = Number(param.ParamRate);
			paramPlus[4] = Number(param.ParamPlus);
			break;
		case 'MRF':
			paramRate[5] = Number(param.ParamRate);
	        paramPlus[5] = Number(param.ParamPlus);
			break;
		case 'CNT':
			paramRate[6] = Number(param.ParamRate);
	        paramPlus[6] = Number(param.ParamPlus);
			break;
        case 'HRG':
			paramRate[7] = Number(param.ParamRate);
	        paramPlus[7] = Number(param.ParamPlus);
			break;
        case 'MRG':
			paramRate[8] = Number(param.ParamRate);
	        paramPlus[8] = Number(param.ParamPlus);
			break;
        case 'TRG':
			paramRate[9] = Number(param.ParamRate);
	        paramPlus[9] = Number(param.ParamPlus);
			break;			
        }				
	}
	var paramTotelData = {
        paramRate: paramRate,
        paramPlus: paramPlus
    };
	return paramTotelData;
};

DataManager.equipPieceDataExtractS = function(data) {
	var paramRate = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
	var paramPlus = [0,0,0,0,0,0,0,0,0,0];
	for (var i = 0; i < data.length; i++) {
		var param = JSON.parse(data[i]);
		switch (param.ParamName) {
        case 'TGR':
			paramRate[0] = Number(param.ParamRate);
			paramPlus[0] = Number(param.ParamPlus);
			break;
		case 'GRD':
			paramRate[1] = Number(param.ParamRate);
			paramPlus[1] = Number(param.ParamPlus);
			break;
		case 'REC':
			paramRate[2] = Number(param.ParamRate);
			paramPlus[2] = Number(param.ParamPlus);
			break;
		case 'PHA':
			paramRate[3] = Number(param.ParamRate);
			paramPlus[3] = Number(param.ParamPlus);
			break;
		case 'MCR':
			paramRate[4] = Number(param.ParamRate);
			paramPlus[4] = Number(param.ParamPlus);
			break;
		case 'TCR':
			paramRate[5] = Number(param.ParamRate);
	        paramPlus[5] = Number(param.ParamPlus);
			break;
		case 'PDR':
			paramRate[6] = Number(param.ParamRate);
	        paramPlus[6] = Number(param.ParamPlus);
			break;
        case 'MDR':
			paramRate[7] = Number(param.ParamRate);
	        paramPlus[7] = Number(param.ParamPlus);
			break;
        case 'FDR':
			paramRate[8] = Number(param.ParamRate);
	        paramPlus[8] = Number(param.ParamPlus);
			break;
        case 'EXR':
			paramRate[9] = Number(param.ParamRate);
	        paramPlus[9] = Number(param.ParamPlus);
			break;			
        }				
	}
	var paramTotelData = {
        paramRate: paramRate,
        paramPlus: paramPlus
    };
	return paramTotelData;
};

DataManager.equipPieceDataExtractB = function(data) {
	var paramRate = [1.0, 1.0, 1.0];
	var paramPlus = [0,0,0];
	for (var i = 0; i < data.length; i++) {
		var param = JSON.parse(data[i]);
		switch (param.ParamName) {
        case 'EXP':
			paramRate[0] = Number(param.ParamRate);
			paramPlus[0] = Number(param.ParamPlus);
			break;
		case 'GOLD':
			paramRate[1] = Number(param.ParamRate);
			paramPlus[1] = Number(param.ParamPlus);
			break;
		case 'ITEM':
			paramRate[2] = Number(param.ParamRate);
			paramPlus[2] = Number(param.ParamPlus);
			break;			
        }				
	}
	var paramTotelData = {
        paramRate: paramRate,
        paramPlus: paramPlus
    };
	return paramTotelData;
};

DataManager.equipSuitDatabaseCreate = function() {
    $dataEquipSuits = [null];
    for (var i = 1; i <= 100; ++i) {
        var equipSuitData = JSON.parse(GT.Param.EquipSuitData0['Suit ' + i] || 'null');
        if (equipSuitData) {
			this.equipSuitDatabaseAdd(i, equipSuitData);
		}
    }
	GT.Param.EquipSuitData0 = {};
};

//------------------------------------------------------------------------------

GT.ESCore.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!GT.ESCore.DataManager_isDatabaseLoaded.call(this)) 
		return false;
    if (!GT._loaded_GT_ESCore) {
		this.equipSuitDatabaseCreate();
        this.processESCoreNotetags($dataWeapons);
        this.processESCoreNotetags($dataArmors);
        GT._loaded_GT_ESCore = true;
    }
    return true;
};

DataManager.processESCoreNotetags = function (group) {
    for (var i = 1; i < group.length; i++) {
        var obj = group[i];
        this.setupEquipSuitNotetags(obj);
    }
};

DataManager.setupEquipSuitNotetags = function (obj) {
	var note1 = /<(?:EQUIP SUIT):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
    var note2 = /<(?:EQUIP SUIT):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
	
    var notedata = obj.note.split(/[\r\n]+/);
	obj.equipSuit = [];
	
    for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (line.match(note1)) {
			var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
			obj.equipSuit = obj.equipSuit.concat(array);
        } 
		else if (line.match(note2)) {
            var range = GT.Util.getRange(parseInt(RegExp.$1), parseInt(RegExp.$2));
			obj.equipSuit = obj.equipSuit.concat(range);
        } 
    }
	var type = DataManager.isWeapon(obj) ? 0 : 1;
	var itemId = obj.id;
	for (var i = 0; i < obj.equipSuit.length; i++) {
		var suitId = obj.equipSuit[i];
		$dataEquipSuits[suitId].indexEquip.push([type, itemId]);
	}
};

//=============================================================================
// Game_System
//=============================================================================

Game_System.prototype.equipSuitPieces = function(suitId) {
	return $dataEquipSuits[suitId].indexEquip.length || 0; 
};

Game_System.prototype.equipSuitPerActorNum = function(suitId, actorId) {
	var actor = $gameParty.members()[actorId];
    return actor ? actor.getEquipSuitsCount(suitId, actor._equipSuitsTotal) : 0;
};

Game_System.prototype.equipSuitTotalCount = function() {
    return GT.ESCore.totalCount || 0;
};

//=============================================================================
// Game_Actor
//=============================================================================

GT.ESCore.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    GT.ESCore.Game_Actor_setup.call(this, actorId);
	this.refreshEquipSuit();
};

Game_Actor.prototype.refreshEquipSuit = function () {
    this.setupEquipSuit();
    this.addEquipSuit();
    this.getEquipSuitBonusesIDs();
};

Game_Actor.prototype.setupEquipSuit = function() {
    this._equipSuits = [];
	this._equipSuitsTotal = [];
    this._equipSuitsStateIDs = [];
	this._equipSuitsStateResistIDs = [];
	this._equipSuitsSkillIDs = [];
};

Game_Actor.prototype.addEquipSuit = function () {
    var equips = this.equips();
    for (var i = 0; i < equips.length; i++) {
        var item = equips[i];
		if (!item) continue;
		if (item.baseItemId)
			item = DataManager.getBaseItem(item);
        if (item && item.equipSuit.length > 0) {
            for (var j = 0; j < item.equipSuit.length; j++) {
                var key = item.equipSuit[j];
				this._equipSuitsTotal.push(key);
                if (!this._equipSuits.contains(key)) {
                    this._equipSuits.push(key);
                }
            }
        }
    }
};

Game_Actor.prototype.getEquipSuitsCount = function(suitId, suitIdArr) {
    var occur = 0;
    for(var i = 0; i < suitIdArr.length; i++){
        if (suitIdArr[i] === suitId) occur++;
    }
    return occur;
};

Game_Actor.prototype.getEquipSuitBonusesIDs = function () {
    var suits = this._equipSuits;
    for (var i = 0; i < suits.length; i++) {
        var suitId = this._equipSuits[i];
        var pieces = this.getEquipSuitsCount(suitId, this._equipSuitsTotal);
        var data = $dataEquipSuits[suitId];
		if (data && data.bonuses && data.bonuses.length > 0) {	
			for (var p = 0; p < data.bonuses.length; p++) {
				var pieceBonuses = data.bonuses[p];
				var requirePieces = pieceBonuses.requirePieces;
				if (pieceBonuses && pieces >= requirePieces) {
					if (pieceBonuses.states) {
						this._equipSuitsStateIDs = this._equipSuitsStateIDs.concat(pieceBonuses.states);
					}
					if (pieceBonuses.statesResist) {
						this._equipSuitsStateResistIDs = this._equipSuitsStateResistIDs.concat(pieceBonuses.statesResist);
					}
					if (pieceBonuses.skills) {
						this._equipSuitsSkillIDs = this._equipSuitsSkillIDs.concat(pieceBonuses.skills);
					}
				}
			}	
		}
    }
};

Game_Actor.prototype.equipSuitBonusParamEdit = function (paramType, paramId, editType) {
	if (!this._equipSuits) return editType;
    var value = editType;
    var paramKey = paramType + (editType ? 'Rate' : 'Plus');
    var suits = this._equipSuits;
    for (var i = 0; i < suits.length; i++) {
        var suitId = this._equipSuits[i];
        var pieces = this.getEquipSuitsCount(suitId, this._equipSuitsTotal);
        var data = $dataEquipSuits[suitId];
		if (data && data.bonuses && data.bonuses.length > 0) {
            for (var p = 0; p < data.bonuses.length; p++) {
				var pieceBonuses = data.bonuses[p];
				var requirePieces = pieceBonuses.requirePieces;
				if (pieceBonuses && pieceBonuses[paramKey] && pieces >= requirePieces) {
                    if (!editType) 
					    value += pieceBonuses[paramKey][paramId];
					else	
                        value *= pieceBonuses[paramKey][paramId];					
				}
            }
		}
    }
    return value;
};

Game_Actor.prototype.addEquipSuitBonusStates = function (states) {
	if(!this._equipSuitsStateIDs) return states;
    for (var i = 0; i < this._equipSuitsStateIDs.length; i++) {
        var stateId = this._equipSuitsStateIDs[i];
        var state = $dataStates[stateId];
		if (Imported.YEP_AutoPassiveStates) {
			if (!this.meetPassiveStateCondition(stateId)) continue;
		}
        if (state && !states.contains(state)) {
            states.push(state);
        }
    }
	this.sortEquipSuitBonusStates(states);
    return states;
};

Game_Actor.prototype.sortEquipSuitBonusStates = function(states) {
    states.sort(function(a, b) {
        var p1 = a.priority;
        var p2 = b.priority;
        if (p1 !== p2) return p2 - p1;
        return a - b;
    });
};

GT.ESCore.Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
Game_Actor.prototype.paramPlus = function (paramId) {
    var plus = GT.ESCore.Game_Actor_paramPlus.call(this, paramId);
    return plus + this.equipSuitBonusParamEdit('param', paramId, 0);
};

GT.ESCore.Game_Actor_paramRate = Game_Actor.prototype.paramRate;
Game_Actor.prototype.paramRate = function (paramId) {
    var rate = GT.ESCore.Game_Actor_paramRate.call(this, paramId);
    return rate * this.equipSuitBonusParamEdit('param', paramId, 1);
};

GT.ESCore.Game_Actor_xparam = Game_Actor.prototype.xparam;
Game_Actor.prototype.xparam = function (xparamId) {
    var value = GT.ESCore.Game_Actor_xparam.call(this, xparamId);
    value += this.equipSuitBonusParamEdit('xparam', xparamId, 0) / 100;
    value *= this.equipSuitBonusParamEdit('xparam', xparamId, 1);
    return value;
};

GT.ESCore.Game_Actor_sparam = Game_Actor.prototype.sparam;
Game_Actor.prototype.sparam = function (sparamId) {
    var value = GT.ESCore.Game_Actor_sparam.call(this, sparamId);
    value += this.equipSuitBonusParamEdit('sparam', sparamId, 0) / 100;
    value *= this.equipSuitBonusParamEdit('sparam', sparamId, 1);
    return value;
};

GT.ESCore.Game_Actor_states = Game_Actor.prototype.states;
Game_Actor.prototype.states = function () {
    var states = GT.ESCore.Game_Actor_states.call(this);
    states = this.addEquipSuitBonusStates(states);
    return states;
};

GT.ESCore.Game_Actor_addedSkills = Game_Actor.prototype.addedSkills;
Game_Actor.prototype.addedSkills = function() {
	var skills = GT.ESCore.Game_Actor_addedSkills.call(this);
	if(!this._equipSuitsSkillIDs) return skills;
	for (var i = 0; i < this._equipSuitsSkillIDs.length; i++) {
		var skillId = this._equipSuitsSkillIDs[i];
        if (!skills.contains(skillId)) {
            skills.push(skillId);
        }
	}
    return skills;
};

GT.ESCore.Game_Actor_stateResistSet = Game_Actor.prototype.stateResistSet;
Game_Actor.prototype.stateResistSet = function() {
	var stateResist = GT.ESCore.Game_Actor_stateResistSet.call(this);
	if(!this._equipSuitsStateResistIDs) return stateResist;
	for (var i = 0; i < this._equipSuitsStateResistIDs.length; i++) {
		var stateId = this._equipSuitsStateResistIDs[i];
        if (!stateResist.contains(stateId)) {
            stateResist.push(stateId);
        }
	}
    return stateResist;
};

GT.ESCore.Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
Game_Actor.prototype.changeEquip = function (slotId, item) {
    if (!this._equips[slotId]) this._equips[slotId] = new Game_Item();
    GT.ESCore.Game_Actor_changeEquip.call(this, slotId, item);
	this.refreshEquipSuit();
};

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.equipSuitBonusBResultRate = function(bResultId) {
	var value = 1.0;
	var members = this.members();
	for (var i = 0; i < members.length; i++) {
		value *= members[i].equipSuitBonusParamEdit('bResult', bResultId, 1);
	}
    return value;
};

Game_Party.prototype.equipSuitBonusBResultPlus = function(bResultId) {
	var value = 0;
	var members = this.members();
	for (var i = 0; i < members.length; i++) {
		value += members[i].equipSuitBonusParamEdit('bResult', bResultId, 0) / 100;
	}
    return value;
};

Game_Party.prototype.equipSuitBonusBResultCal = function(base, bResultId) {
	var Rate = this.equipSuitBonusBResultRate(bResultId);
	var Plus = base * this.equipSuitBonusBResultPlus(bResultId);
	base += Plus;
	base *= Rate;
	if (bResultId !== 2) base = Math.floor(base);
    return base;
};

//=============================================================================
// Game_Enemy
//=============================================================================

GT.ESCore.Game_Enemy_dropItemRate = Game_Enemy.prototype.dropItemRate;
Game_Enemy.prototype.dropItemRate = function() {
    return $gameParty.equipSuitBonusBResultCal(GT.ESCore.Game_Enemy_dropItemRate.call(this), 2);
};

//=============================================================================
// Game_Troop
//=============================================================================

GT.ESCore.Game_Troop_expTotal = Game_Troop.prototype.expTotal;
Game_Troop.prototype.expTotal = function() {
    return $gameParty.equipSuitBonusBResultCal(GT.ESCore.Game_Troop_expTotal.call(this), 0);
};

GT.ESCore.Game_Troop_goldTotal = Game_Troop.prototype.goldTotal;
Game_Troop.prototype.goldTotal = function() {
    return $gameParty.equipSuitBonusBResultCal(GT.ESCore.Game_Troop_goldTotal.call(this), 1);
};

//=============================================================================
// Utilities
//=============================================================================

GT.Util = GT.Util || {};

GT.Util.getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

//=============================================================================
// End of File
//=============================================================================