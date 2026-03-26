//=============================================================================
// GT50 Plugins - EquipSuitCore Extension - EquipSuitAdded1
// GT_X_EquipSuitAdded1.js
//=============================================================================

var Imported = Imported || {};
Imported.GT_X_EquipSuitAdded1 = true;

var GT = GT || {};
GT.ESAdded1 = GT.ESAdded1 || {};
GT.ESAdded1.version = 1.0;

//=============================================================================
/*:
 * @plugindesc [v1.0]        装备 - 套装系统 - 套装数扩展1
 * @author ganfly
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 * 
 * 本组插件为装备套装系统的套装数扩展，可以将套装核心的100个套装扩展
 * 到更多，必须安装GT_EquipSuitCore才能运行。
 * 本组插件参考了YEP插件
 *
 *     GT_X_EquipSuitAdded1 扩展101-200号套装。
 *     GT_X_EquipSuitAdded2 扩展201-300号套装。
 *     GT_X_EquipSuitAdded3 扩展301-400号套装。
 *     GT_X_EquipSuitAdded4 扩展401-500号套装。
 *     GT_X_EquipSuitAdded5 扩展501-600号套装。
 *     GT_X_EquipSuitAdded6 扩展601-700号套装。
 *     GT_X_EquipSuitAdded7 扩展701-800号套装。
 *     GT_X_EquipSuitAdded8 扩展801-900号套装。
 *     GT_X_EquipSuitAdded9 扩展901-1000号套装。
 *
 * ============================================================================
 * 参数对照表及公式
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
 * 用户规约
 * ============================================================================
 * 
 *  MIT规约。
 *  如果你使用了本插件，请在致谢中包含'ganfly'或者'gt50'，谢啦！
 * 
 * ============================================================================
 * 更新日志
 * ============================================================================
 * 
 * [v1.0] 完成插件。
 * 
 * ============================================================================
 * 帮助结束
 * ============================================================================
 *
 * @param Suit List 101-125
 * @text ----套装列表101-125----
 * @default
 *
 * @param Suit 101
 * @text 套装101
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 102
 * @text 套装102
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 103
 * @text 套装103
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 104
 * @text 套装104
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 105
 * @text 套装105
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 106
 * @text 套装106
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 107
 * @text 套装107
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 108
 * @text 套装108
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 109
 * @text 套装109
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 110
 * @text 套装110
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 111
 * @text 套装111
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 112
 * @text 套装112
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 113
 * @text 套装113
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 114
 * @text 套装114
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 115
 * @text 套装115
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 116
 * @text 套装116
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 117
 * @text 套装117
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 118
 * @text 套装118
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 119
 * @text 套装119
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 120
 * @text 套装120
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 121
 * @text 套装121
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 122
 * @text 套装122
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 123
 * @text 套装123
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 124
 * @text 套装124
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 125
 * @text 套装125
 * @parent Suit List 101-125
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit List 126-150
 * @text ----套装列表126-150----
 * @default
 *
 * @param Suit 126
 * @text 套装126
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 127
 * @text 套装127
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 128
 * @text 套装128
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 129
 * @text 套装129
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 130
 * @text 套装130
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 131
 * @text 套装131
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 132
 * @text 套装132
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 133
 * @text 套装133
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 134
 * @text 套装134
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 135
 * @text 套装135
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 136
 * @text 套装136
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 137
 * @text 套装137
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 138
 * @text 套装138
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 139
 * @text 套装139
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 140
 * @text 套装140
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 141
 * @text 套装141
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 142
 * @text 套装142
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 143
 * @text 套装143
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 144
 * @text 套装144
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 145
 * @text 套装145
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 146
 * @text 套装146
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 147
 * @text 套装147
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 148
 * @text 套装148
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 149
 * @text 套装149
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 150
 * @text 套装150
 * @parent Suit List 126-150
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit List 151-175
 * @text ----套装列表151-175----
 * @default
 *
 * @param Suit 151
 * @text 套装151
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 152
 * @text 套装152
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 153
 * @text 套装153
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 154
 * @text 套装154
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 155
 * @text 套装155
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 156
 * @text 套装156
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 157
 * @text 套装157
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 158
 * @text 套装158
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 159
 * @text 套装159
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 160
 * @text 套装160
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 161
 * @text 套装161
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 162
 * @text 套装162
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 163
 * @text 套装163
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 164
 * @text 套装164
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 165
 * @text 套装165
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 166
 * @text 套装166
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 167
 * @text 套装167
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 168
 * @text 套装168
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 169
 * @text 套装169
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 170
 * @text 套装170
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 171
 * @text 套装171
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 172
 * @text 套装172
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 173
 * @text 套装173
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 174
 * @text 套装174
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 175
 * @text 套装175
 * @parent Suit List 151-175
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit List 176-200
 * @text ----套装列表176-200----
 * @default
 *
 * @param Suit 176
 * @text 套装176
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 177
 * @text 套装177
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 178
 * @text 套装178
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 179
 * @text 套装179
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 180
 * @text 套装180
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 181
 * @text 套装181
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 182
 * @text 套装182
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 183
 * @text 套装183
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 184
 * @text 套装184
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 185
 * @text 套装185
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 186
 * @text 套装186
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 187
 * @text 套装187
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 188
 * @text 套装188
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 189
 * @text 套装189
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 190
 * @text 套装190
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 191
 * @text 套装191
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 192
 * @text 套装192
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 193
 * @text 套装193
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default
 *
 * @param Suit 194
 * @text 套装194
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 195
 * @text 套装195
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 196
 * @text 套装196
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 197
 * @text 套装197
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 198
 * @text 套装198
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 199
 * @text 套装199
 * @parent Suit List 176-200
 * @type struct<Suit>
 * @desc 编辑套装效果
 * @default 
 *
 * @param Suit 200
 * @text 套装200
 * @parent Suit List 176-200
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

if (Imported.GT_EquipSuitCore) {
	
//=============================================================================
// Parameter Variables
//=============================================================================

GT.Parameters = PluginManager.parameters('GT_X_EquipSuitAdded1');
GT.Param = GT.Param || {};

GT.Param.EquipSuitData1 = GT.Parameters;

//=============================================================================
// DataManager
//=============================================================================

GT.ESAdded1.DataManager_equipSuitDatabaseCreate = DataManager.equipSuitDatabaseCreate;
DataManager.equipSuitDatabaseCreate = function() {
	GT.ESAdded1.DataManager_equipSuitDatabaseCreate.call(this);
    $dataEquipSuits = $dataEquipSuits || [null];
    for (var i = 101; i <= 200; ++i) {
        var equipSuitData = JSON.parse(GT.Param.EquipSuitData1['Suit ' + i] || 'null');
        if (equipSuitData) {
			this.equipSuitDatabaseAdd(i, equipSuitData);
		}
    }
	GT.Param.EquipSuitData1 = {};
};

//=============================================================================
// End of File
//=============================================================================
} else {
	
var text = '警告，你试图在没有安装GT_EquipSuitCore的情况下运行GT_X_EquipSuitAdded1，\n请安装GT_EquipSuitCore。';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.GT_EquipSuitCore
	