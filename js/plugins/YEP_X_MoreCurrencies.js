//=============================================================================
// Yanfly Engine Plugins - Shop Menu Extension Plugin - More Currencies
// YEP_X_MoreCurrencies.js
// Translate to Japanese : munokura.tk
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MoreCurrencies = true;

var Yanfly = Yanfly || {};
Yanfly.MC = Yanfly.MC || {};
Yanfly.MC.version = 1.05;

//=============================================================================
 /*:
 * @plugindesc v1.05 (Requires YEP_ShopMenuCore.js) This plugin adds
 * functionality for your shops to have multiple currencies.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Currency Padding
 * @parent ---General---
 * @type number
 * @min 0
 * @desc The padding used for multiple currencies in pixels.
 * @default 10
 *
 * @param Font Size
 * @parent ---General---
 * @type number
 * @min 1
 * @desc The font size used for currency in shops.
 * Default: 28
 * @default 20
 *
 * @param ---Proxies---
 * @default
 *
 * @param Copy Name
 * @parent ---Proxies---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Copy name of original item for proxy items?
 * NO - false     YES - true
 * @default true
 *
 * @param Copy Icon
 * @parent ---Proxies---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Copy icon of original item for proxy items?
 * NO - false     YES - true
 * @default true
 *
 * @param Copy Help
 * @parent ---Proxies---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Copy help descriptions of original item for proxy items?
 * NO - false     YES - true
 * @default true
 *
 * @param Copy Traits
 * @parent ---Proxies---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Copy traits of original item for proxy items?
 * NO - false     YES - true
 * @default true
 *
 * @param Copy Parameters
 * @parent ---Proxies---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Copy stat parameters of original item for proxy items?
 * NO - false     YES - true
 * @default true
 *
 * @param ---Aftermath---
 * @default
 *
 * @param Gold as Item
 * @parent ---Aftermath---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Do you wish to draw gold as an item drop?
 * NO - false     YES - true
 * @default true
 *
 * @param Gold Icon
 * @parent ---Aftermath---
 * @type number
 * @min 0
 * @desc The icon used for gold. If you are using the Core Engine,
 * this will automatically change to the icon used there.
 * @default 314
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_ShopMenuCore.
 * Make sure this plugin is located under YEP_ShopMenuCore in the plugin list.
 *
 * As an extension of the Shop Menu Core, this plugin enables you to have items
 * cost multiple currencies or different currencies using variables and/or
 * other items themselves.
 *
 * ============================================================================
 * Instructions - Variables as Currency
 * ============================================================================
 *
 * If you're planning to use variables as currency (and you should!), you can
 * set them up in a way to have them show an icon. Name your currency variable
 * as such:
 * 
 * \i[x]Variable Name
 *
 * When displayed in shops, it will show the icon and the name. However, if you
 * want it to display only the icon and/or exclude some text, place the text
 * inside a << and >> bracket like such:
 *
 * \i[x]<<Variable Name>>
 *
 * That way, only the icon will be shown while all the next inside the << >>
 * will be hidden.
 *
 * ============================================================================
 * Instructions - Proxies
 * ============================================================================
 *
 * Perhaps in your game, you would like for the player to have multiple ways of
 * purchasing an item through one currency or another. However, inputting the
 * costs for all of the options makes the item cost every single aspect. But,
 * what you can do is make proxies of these items. For example, in the database
 * will will have the following:
 *
 * Potion           - 50 Gold
 * Potion (Proxy A) - 5 Gems
 * Potion (Proxy B) - 3 Jewels
 *
 * Placing all three items in your shop normally would result in three types of
 * potions that do not stack into the same category. However, by using this
 * proxy notetag, you can make them all attribute to the same Potion item:
 *
 *   <Proxy Buy: x>
 *   <Proxy Buy: name>
 *   If you're using this item as a proxy for another item (so you can set a
 *   different cost for the item), this item will end up representing item x,
 *   weapon x, or armor x of the same type. If you're using a named notetag and
 *   you have multiple entries in your database with the same name, priority
 *   will be given to the item, weapon, or armor with the highest ID.
 *
 * If Proxy A and B link back to the main Potion, then whenever the player buys
 * the Proxies in the shop, they will link back to the main Potion, making it
 * possible to buy the same item using different currencies.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You can use the following notetags to adjust various properties for more
 * currencies for your items, weapons, and armors.
 *
 * Item, Weapon, and Armor Notetags:
 * 
 *   <Variable x Buy Price: y>
 *   This sets the currency of this item, weapon, or armor to variable x with
 *   a buy price of y. You can insert multiples of this notetag to have more
 *   than one variable cost for that item, weapon, or armor.
 *
 *   <Variable x Sell Price: y>
 *   This makes it that when selling this item, weapon, or armor, the player
 *   will gain variable x in y amount. You can insert multiples of this
 *   notetag to have more than one variable cost for that item, weapon, or
 *   armor.
 *
 *   <Item x Buy Price: y>
 *   <Item name Buy Price: y>
 *   This sets the currency of this item, weapon, or armor to cost item x (or
 *   the named item) with a buy price of y. You can insert multiples of this
 *   notetag to have more than one item cost for that item, weapon, or armor.
 *   If you're using Item Core, this will not work on independent items. If you
 *   are using the named version of the notetag and have multiple items in your
 *   database of the same name, priority will be given to the item with the
 *   highest ID.
 *
 *   <Item x Sell Price: y>
 *   <Item name Sell Price: y>
 *   When selling this item, weapon, or armor, the player will get item x (or
 *   the named item) with a quantity of y. You can insert multiples of this
 *   notetag to have more than one item cost for that item, weapon, or armor.
 *   If you're using Item Core, this will not work on independent items. If you
 *   are using the named version of the notetag and have multiple items in your
 *   database of the same name, priority will be given to the item with the
 *   highest ID.
 *
 *   <Weapon x Buy Price: y>
 *   <Weapon name Buy Price: y>
 *   This sets the currency of this item, weapon, or armor to cost weapon x (or
 *   the named weapon) with a buy price of y. You can insert multiples of this
 *   notetag to have more than one weapon cost for that item, weapon, or armor.
 *   If you're using Item Core, this will not work on independent items. If you
 *   are using the named version of the notetag and have multiple items in your
 *   database of the same name, priority will be given to the item with the
 *   highest ID.
 *
 *   <Weapon x Sell Price: y>
 *   <Weapon name Sell Price: y>
 *   When selling this item, weapon, or armor, the player will get weapon x (or
 *   the named weapon) with a quantity of y. You can insert multiples of this
 *   notetag to have more than one weapon cost for that item, weapon, or armor.
 *   If you're using Item Core, this will not work on independent items. If you
 *   are using the named version of the notetag and have multiple items in your
 *   database of the same name, priority will be given to the item with the
 *   highest ID.
 *
 *   <Armor x Buy Price: y>
 *   <Armor name Buy Price: y>
 *   This sets the currency of this item, weapon, or armor to cost armor x (or
 *   the named armor) with a buy price of y. You can insert multiples of this
 *   notetag to have more than one armor cost for that item, weapon, or armor.
 *   If you're using Item Core, this will not work on independent items. If you
 *   are using the named version of the notetag and have multiple items in your
 *   database of the same name, priority will be given to the item with the
 *   highest ID.
 *
 *   <Armor x Sell Price: y>
 *   <Armor name Sell Price: y>
 *   When selling this item, weapon, or armor, the player will get armor x (or
 *   the named armor) with a quantity of y. You can insert multiples of this
 *   notetag to have more than one armor cost for that item, weapon, or armor.
 *   If you're using Item Core, this will not work on independent items. If you
 *   are using the named version of the notetag and have multiple items in your
 *   database of the same name, priority will be given to the item with the
 *   highest ID.
 *
 *   <Proxy Buy: x>
 *   <Proxy Buy: name>
 *   If you're using this item as a proxy for another item (so you can set a
 *   different cost for the item), this item will end up representing item x,
 *   weapon x, or armor x of the same type. If you're using a named notetag and
 *   you have multiple entries in your database with the same name, priority
 *   will be given to the item, weapon, or armor with the highest ID.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.05:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.04:
 * - Fixed a typo within the code. Please update Item Core, Item Disassemble,
 * Attachable Augments, and More Currencies if you are using those plugins.
 *
 * Version 1.03:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.02:
 * - Fixed crash bugs from selling independent items from games saved before
 * the plugin was installed. These independent items will not contain any sell
 * data made from variables, items, weapons, or armors, but newly generated
 * ones will.
 *
 * Version 1.01:
 * - Fixed a graphical issue with gold display in the number window.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
 /*:ja
 * @plugindesc v1.05 (要YEP_ShopMenuCore.js)店が複数の通貨を持つための機能を追加します。
 * @author Yanfly Engine Plugins
 *
 * @param ---一般---
 * @default
 *
 * @param Currency Padding
 * @parent ---一般---
 * @type number
 * @min 0
 * @desc ピクセル単位で複数の通貨に使用されるパディング。
 * @default 10
 *
 * @param Font Size
 * @parent ---一般---
 * @type number
 * @min 1
 * @desc 店内の通貨に使用されるフォントサイズ。
 * Default: 28
 * @default 20
 *
 * @param ---プロキシ---
 * @default
 *
 * @param Copy Name
 * @parent ---プロキシ---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 代理アイテムの元のアイテムの名前をコピーしますか?
 * NO - false     YES - true
 * @default true
 *
 * @param Copy Icon
 * @parent ---プロキシ---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 代理アイテムの元のアイテムのアイコンをコピーしますか?
 * NO - false     YES - true
 * @default true
 *
 * @param Copy Help
 * @parent ---プロキシ---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 代理アイテムの元のアイテムのヘルプの説明をコピーしますか?
 * NO - false     YES - true
 * @default true
 *
 * @param Copy Traits
 * @parent ---プロキシ---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 代理アイテムの元のアイテムの特性をコピーしますか?
 * NO - false     YES - true
 * @default true
 *
 * @param Copy Parameters
 * @parent ---プロキシ---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 代理アイテムの元のアイテムの能力値をコピーしますか?
 * NO - false     YES - true
 * @default true
 *
 * @param ---その他---
 * @default
 *
 * @param Gold as Item
 * @parent ---その他---
 * @type boolean
 * @on YES
 * @off NO
 * @desc アイテムドロップとして通貨を得ますか?
 * NO - false     YES - true
 * @default true
 *
 * @param Gold Icon
 * @parent ---その他---
 * @type number
 * @min 0
 * @desc 通貨に使用されるアイコン。CoreEngineを使用している場合、自動的にそこで使用されているアイコンに変わります。
 * @default 314
 *
 * @help
 * 翻訳:ムノクラ
 * https://munokura.tk/
 * https://twitter.com/munokura/
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * このプラグインはYEP_ShopMenuCoreを必要とします。
 * プラグイン管理のYEP_ShopMenuCoreの下に
 * このプラグインがあることを確認してください。
 *
 * ShopMenuCoreの拡張機能として、
 * このプラグインを使用すると、
 * 変数や他のアイテム自体を使用して、
 * アイテムに複数の通貨・異なる通貨を設定できます。
 *
 * ============================================================================
 * Instructions - Variables as Currency
 * ============================================================================
 *
 * 通貨として変数を使うことを計画しているなら(そうすべきです。)、
 * それらにアイコンを表示させるような方法で設定できます。
 * 通貨変数に次のような名前を付けます。
 *
 * \i[x]変数名
 *
 * 店頭で表示すると、
 * アイコンと名前が表示されます。
 * アイコンだけを表示したりテキストを除外したりしたい場合、
 * 次のように << text >> の括弧でテキストを配置します。
 *
 * \i[x]<<変数名>>
 *
 * <<>> の内側のものは全て隠され、アイコンだけが表示されます。
 *
 * ============================================================================
 * Instructions - Proxies
 * ============================================================================
 *
 * ゲームで、プレーヤーが1つの通貨・別の通貨を使って
 * アイテムを購入する方法を複数持っているとします。
 * ただし、全てのオプションの費用を入力すると、
 * 項目は全ての側面で費用がかかります。
 * しかし、できることはこれらのアイテムのプロキシを作ることです。
 * 例えば、データベースには次のようになります。
 *
 * Potion           - 50 Gold
 * Potion (Proxy A) - 5 Gems
 * Potion (Proxy B) - 3 Jewels
 *
 * 店に3つのアイテム全てを置くことは
 * 通常同じカテゴリーに重ならない3つのタイプのポーションをもたらすでしょう。
 * このプロキシメモタグを使用すると、
 * それら全てを同じポーションアイテムに属させることができます。
 *
 *   <Proxy Buy: x>
 *   <Proxy Buy: name>
 * このアイテムを別のアイテムの代理として使用している場合
 * (つまり、アイテムに別のコストを設定できます)、
 * このアイテムは同じタイプのアイテムx、武器x、防具xを表すことになります。
 * 名前付きのメモタグを使用していて、
 * データベースに同じ名前のエントリが複数ある場合、
 * 最も高いIDを持つアイテム、武器、防具が優先されます。
 *
 * プロキシAとBがメインのポーションにリンクバックする場合、
 * プレイヤーがショップでプロキシを購入する度に、
 * メインのポーションにリンクバックするため、
 * 異なる通貨を使用して同じ商品を購入することができます。
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * アイテム、武器、防具に多くの通貨にプロパティを調整するために
 * 以下のメモタグを使うことができます。
 *
 * アイテム、武器、防具のメモタグ
 *
 *   <Variable x Buy Price: y>
 *   このアイテム、武器、防具の通貨を、
 *   購入価格がyの変数xに設定します。
 *   このアイテム、武器、防具に複数の変動費を持つために、
 *   このメモタグの複数行を挿入することができます。
 *
 *   <Variable x Sell Price: y>
 *   このアイテム、武器、防具を売る時、
 *   プレイヤーはy量で変数xを得ることになります。
 *   このアイテム、武器、防具に複数の変動費を持つために、
 *   このメモタグの複数行を挿入することができます。
 *
 *   <Item x Buy Price: y>
 *   <Item name Buy Price: y>
 *   このアイテム、武器、防具の通貨を購入アイテムの価格がyで、
 *   コストがxのアイテム(名前の付いたアイテム)に設定します。
 *   そのアイテム、武器、防具に複数のアイテムコストを設定するのに、
 *   メモタグの複数行を挿入することができます。
 *   もしItemCoreを使っているなら、
 *   独立したアイテムでは動作しません。
 *   名前付きバージョンのメモタグを使用していて、
 *   データベース内に同じ名前のアイテムが複数ある場合、
 *   最も高いIDを持つアイテムが優先されます。
 *
 *   <Item x Sell Price: y>
 *   <Item name Sell Price: y>
 *   このアイテム、武器、防具を売る時、
 *   プレイヤーは数量xのアイテムx(名前のついたアイテム)を手に入れるでしょう。
 *   そのアイテム、武器、防具に複数のアイテムコストを設定するのに
 *   このメモタグの複数行を挿入することができます。
 *   もしItemCoreを使っているなら、
 *   独立したアイテムでは動作しません。
 *   名前付きバージョンのメモタグを使用していて、
 *   データベース内に同じ名前のアイテムが複数ある場合、
 *   最も高いIDを持つアイテムが優先されます。
 *
 *   <Weapon x Buy Price: y>
 *   <Weapon name Buy Price: y>
 *   このアイテム、武器、防具の通貨を、
 *   購入価格yで、価格が武器x(・名前付き武器)に設定します。
 *   このアイテム、武器、防具に複数の武器コストを設定するのに、
 *   このメモタグの複数行を挿入することができます。
 *   もしItemCoreを使っているなら、
 *   独立したアイテムでは動作しません。
 *   名前付きバージョンのメモタグを使用していて、
 *   データベース内に同じ名前のアイテムが複数ある場合、
 *   最も高いIDを持つアイテムが優先されます。
 *
 *   <Weapon x Sell Price: y>
 *   <Weapon name Sell Price: y>
 *   このアイテム、武器、防具を売る時、
 *   プレイヤーは量yの武器x(・名前付き武器)を手に入れるでしょう。
 *   このアイテム、武器、防具に複数の武器コストを設定するのに、
 *   このメモタグの複数行を挿入することができます。
 *   もしItemCoreを使っているなら、
 *   独立したアイテムでは動作しません。
 *   名前付きバージョンのメモタグを使用していて、
 *   データベース内に同じ名前のアイテムが複数ある場合、
 *   最も高いIDを持つアイテムが優先されます。
 *
 *   <Armor x Buy Price: y>
 *   <Armor name Buy Price: y>
 *   このアイテム、武器、防具の通貨を、
 *   購入価格yでコスト防具x(名前付き防具)に設定します。
 *   そのアイテム、武器、防具に複数の防具コストを設定するのに
 *   このメモタグの複数行を挿入することができます。
 *   もしItemCoreを使っているなら、
 *   独立したアイテムでは動作しません。
 *   名前付きバージョンのメモタグを使用していて、
 *   データベース内に同じ名前のアイテムが複数ある場合、
 *   最も高いIDを持つアイテムが優先されます。
 *
 *   <Armor x Sell Price: y>
 *   <Armor name Sell Price: y>
 *   このアイテム、武器、防具を売る時、
 *   プレイヤーは数量yの防具x(防具の名前)を手に入れるでしょう。
 *   そのアイテム、武器、防具に複数の防具コストを設定するのに
 *   このメモタグの複数行を挿入することができます。
 *   もしItemCoreを使っているなら、
 *   独立したアイテムでは動作しません。
 *   名前付きバージョンのメモタグを使用していて、
 *   データベース内に同じ名前のアイテムが複数ある場合、
 *   最も高いIDを持つアイテムが優先されます。
 *
 *   <Proxy Buy: x>
 *   <Proxy Buy: name>
 *   このアイテムを別のアイテムの代理として使用している場合
 *   (つまり、アイテムに別のコストを設定できます)、
 *   このアイテムは同じタイプのアイテムx、武器x、防具xを表すことになります。
 *   名前付きのメモタグを使用していて、
 *   データベースに同じ名前のエントリが複数ある場合、
 *   最も高いIDを持つアイテム、武器、防具が優先されます。
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.05:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.04:
 * - Fixed a typo within the code. Please update Item Core, Item Disassemble,
 * Attachable Augments, and More Currencies if you are using those plugins.
 *
 * Version 1.03:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.02:
 * - Fixed crash bugs from selling independent items from games saved before
 * the plugin was installed. These independent items will not contain any sell
 * data made from variables, items, weapons, or armors, but newly generated
 * ones will.
 *
 * Version 1.01:
 * - Fixed a graphical issue with gold display in the number window.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_ShopMenuCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_MoreCurrencies');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.MCCurrencyPadding = Number(Yanfly.Parameters['Currency Padding']);
Yanfly.Param.MCCurrencyFontSize = Number(Yanfly.Parameters['Font Size']);

Yanfly.Param.MCCopyName = eval(String(Yanfly.Parameters['Copy Name']));
Yanfly.Param.MCCopyIcon = eval(String(Yanfly.Parameters['Copy Icon']));
Yanfly.Param.MCCopyHelp = eval(String(Yanfly.Parameters['Copy Help']));
Yanfly.Param.MCCopyTraits = eval(String(Yanfly.Parameters['Copy Traits']));
Yanfly.Param.MCCopyParams = eval(String(Yanfly.Parameters['Copy Parameters']));

Yanfly.Param.MCGoldItem = eval(String(Yanfly.Parameters['Gold as Item']));
Yanfly.Param.MCGoldIcon = Number(Yanfly.Parameters['Gold Icon']);
if (Yanfly.Icon.Gold) Yanfly.Param.MCGoldIcon = Yanfly.Icon.Gold;

//=============================================================================
// DataManager
//=============================================================================

Yanfly.MC.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.MC.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_X_MoreCurrencies) {
    this.processMCNotetagsI($dataItems);
    this.processMCNotetagsW($dataWeapons);
    this.processMCNotetagsA($dataArmors);
    this.processMCNotetags1($dataItems, 0);
    this.processMCNotetags1($dataWeapons, 1);
    this.processMCNotetags1($dataArmors, 2);
    Yanfly._loaded_YEP_X_MoreCurrencies = true;
  }
  return true;
};

DataManager.processMCNotetagsI = function(group) {
  if (Yanfly.ItemIdRef) return;
  Yanfly.ItemIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.ItemIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processMCNotetagsW = function(group) {
  if (Yanfly.WeaponIdRef) return;
  Yanfly.WeaponIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.WeaponIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processMCNotetagsA = function(group) {
  if (Yanfly.ArmorIdRef) return;
  Yanfly.ArmorIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.ArmorIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processMCNotetags1 = function(group, itemType) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.proxyBuy = 0;
    obj.variableBuyPrice = {};
    obj.variableBuyPrices = [];
    obj.variableSellPrice = {};
    obj.variableSellPrices = [];
    obj.itemBuyPrice = {};
    obj.itemBuyPrices = [];
    obj.itemSellPrice = {};
    obj.itemSellPrices = [];
    obj.weaponBuyPrice = {};
    obj.weaponBuyPrices = [];
    obj.weaponSellPrice = {};
    obj.weaponSellPrices = [];
    obj.armorBuyPrice = {};
    obj.armorBuyPrices = [];
    obj.armorSellPrice = {};
    obj.armorSellPrices = [];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<PROXY BUY:[ ](\d+)>/i)) {
        obj.proxyBuy = parseInt(RegExp.$1);
        this.adjustProxyBuy(obj, itemType);
      } else if (line.match(/<PROXY BUY:[ ](.*)>/i)) {
        var name = String(RegExp.$1).toUpperCase();
        if (itemType === 0 && Yanfly.ItemIdRef[name]) {
          obj.proxyBuy = Yanfly.ItemIdRef[name];
        } else if (itemType === 1 && Yanfly.WeaponIdRef[name]) {
          obj.proxyBuy = Yanfly.WeaponIdRef[name];
        } else if (itemType === 2 && Yanfly.ArmorIdRef[name]) {
          obj.proxyBuy = Yanfly.ArmorIdRef[name];
        }
        this.adjustProxyBuy(obj, itemType);
      } else if (line.match(/<VARIABLE[ ](\d+)[ ]BUY PRICE:[ ](\d+)>/i)) {
        var varId = parseInt(RegExp.$1);
        var value = parseInt(RegExp.$2);
        if (obj.variableBuyPrices.contains(varId)) continue;
        obj.variableBuyPrices.unshift(varId);
        obj.variableBuyPrice[varId] = value;
      } else if (line.match(/<VARIABLE[ ](\d+)[ ]SELL PRICE:[ ](\d+)>/i)) {
        var varId = parseInt(RegExp.$1);
        var value = parseInt(RegExp.$2);
        if (obj.variableSellPrices.contains(varId)) continue;
        obj.variableSellPrices.unshift(varId);
        obj.variableSellPrice[varId] = value;
        obj.canSell = true;
        obj.cannotSell = false;
      } else if (line.match(/<ITEM[ ](\d+)[ ]BUY PRICE:[ ](\d+)>/i)) {
        var varId = parseInt(RegExp.$1);
        var value = parseInt(RegExp.$2);
        if (obj.itemBuyPrices.contains(varId)) continue;
        if (Imported.YEP_ItemCore) {
          if (DataManager.isIndependent($dataItems[varId])) continue;
        }
        obj.itemBuyPrices.unshift(varId);
        obj.itemBuyPrice[varId] = value;
      } else if (line.match(/<ITEM[ ](.*)[ ]BUY PRICE:[ ](\d+)>/i)) {
        var name = String(RegExp.$1).toUpperCase();
        var value = parseInt(RegExp.$2);
        var varId = Yanfly.ItemIdRef[name];
        if (!varId) continue;
        if (obj.itemBuyPrices.contains(varId)) continue;
        if (Imported.YEP_ItemCore) {
          if (DataManager.isIndependent($dataItems[varId])) continue;
        }
        obj.itemBuyPrices.unshift(varId);
        obj.itemBuyPrice[varId] = value;
      } else if (line.match(/<ITEM[ ](\d+)[ ]SELL PRICE:[ ](\d+)>/i)) {
        var varId = parseInt(RegExp.$1);
        var value = parseInt(RegExp.$2);
        if (obj.itemSellPrices.contains(varId)) continue;
        if (Imported.YEP_ItemCore) {
          if (DataManager.isIndependent($dataItems[varId])) continue;
        }
        obj.itemSellPrices.unshift(varId);
        obj.itemSellPrice[varId] = value;
        obj.canSell = true;
        obj.cannotSell = false;
      } else if (line.match(/<ITEM[ ](.*)[ ]SELL PRICE:[ ](\d+)>/i)) {
        var name = String(RegExp.$1).toUpperCase();
        var value = parseInt(RegExp.$2);
        var varId = Yanfly.ItemIdRef[name];
        if (!varId) continue;
        if (obj.itemSellPrices.contains(varId)) continue;
        if (Imported.YEP_ItemCore) {
          if (DataManager.isIndependent($dataItems[varId])) continue;
        }
        obj.itemSellPrices.unshift(varId);
        obj.itemSellPrice[varId] = value;
        obj.canSell = true;
        obj.cannotSell = false;
      } else if (line.match(/<WEAPON[ ](\d+)[ ]BUY PRICE:[ ](\d+)>/i)) {
        var varId = parseInt(RegExp.$1);
        var value = parseInt(RegExp.$2);
        if (obj.weaponBuyPrices.contains(varId)) continue;
        if (Imported.YEP_ItemCore) {
          if (DataManager.isIndependent($dataWeapons[varId])) continue;
        }
        obj.weaponBuyPrices.unshift(varId);
        obj.weaponBuyPrice[varId] = value;
      } else if (line.match(/<WEAPON[ ](.*)[ ]BUY PRICE:[ ](\d+)>/i)) {
        var name = String(RegExp.$1).toUpperCase();
        var value = parseInt(RegExp.$2);
        var varId = Yanfly.WeaponIdRef[name];
        if (!varId) continue;
        if (obj.weaponBuyPrices.contains(varId)) continue;
        if (Imported.YEP_ItemCore) {
          if (DataManager.isIndependent($dataWeapons[varId])) continue;
        }
        obj.weaponBuyPrices.unshift(varId);
        obj.weaponBuyPrice[varId] = value;
      } else if (line.match(/<WEAPON[ ](\d+)[ ]SELL PRICE:[ ](\d+)>/i)) {
        var varId = parseInt(RegExp.$1);
        var value = parseInt(RegExp.$2);
        if (obj.weaponSellPrices.contains(varId)) continue;
        if (Imported.YEP_ItemCore) {
          if (DataManager.isIndependent($dataWeapons[varId])) continue;
        }
        obj.weaponSellPrices.unshift(varId);
        obj.weaponSellPrice[varId] = value;
        obj.canSell = true;
        obj.cannotSell = false;
      } else if (line.match(/<WEAPON[ ](.*)[ ]SELL PRICE:[ ](\d+)>/i)) {
        var name = String(RegExp.$1).toUpperCase();
        var value = parseInt(RegExp.$2);
        var varId = Yanfly.WeaponIdRef[name];
        if (!varId) continue;
        if (obj.weaponSellPrices.contains(varId)) continue;
        if (Imported.YEP_ItemCore) {
          if (DataManager.isIndependent($dataWeapons[varId])) continue;
        }
        obj.weaponSellPrices.unshift(varId);
        obj.weaponSellPrice[varId] = value;
        obj.canSell = true;
        obj.cannotSell = false;
      } else if (line.match(/<ARMOR[ ](\d+)[ ]BUY PRICE:[ ](\d+)>/i)) {
        var varId = parseInt(RegExp.$1);
        var value = parseInt(RegExp.$2);
        if (obj.armorBuyPrices.contains(varId)) continue;
        if (Imported.YEP_ItemCore) {
          if (DataManager.isIndependent($dataArmors[varId])) continue;
        }
        obj.armorBuyPrices.unshift(varId);
        obj.armorBuyPrice[varId] = value;
      } else if (line.match(/<ARMOR[ ](.*)[ ]BUY PRICE:[ ](\d+)>/i)) {
        var name = String(RegExp.$1).toUpperCase();
        var value = parseInt(RegExp.$2);
        var varId = Yanfly.ArmorIdRef[name];
        if (!varId) continue;
        if (obj.armorBuyPrices.contains(varId)) continue;
        if (Imported.YEP_ItemCore) {
          if (DataManager.isIndependent($dataArmors[varId])) continue;
        }
        obj.armorBuyPrices.unshift(varId);
        obj.armorBuyPrice[varId] = value;
      } else if (line.match(/<ARMOR[ ](\d+)[ ]SELL PRICE:[ ](\d+)>/i)) {
        var varId = parseInt(RegExp.$1);
        var value = parseInt(RegExp.$2);
        if (obj.armorSellPrices.contains(varId)) continue;
        if (Imported.YEP_ItemCore) {
          if (DataManager.isIndependent($dataArmors[varId])) continue;
        }
        obj.armorSellPrices.unshift(varId);
        obj.armorSellPrice[varId] = value;
        obj.canSell = true;
        obj.cannotSell = false;
      } else if (line.match(/<ARMOR[ ](.*)[ ]SELL PRICE:[ ](\d+)>/i)) {
        var name = String(RegExp.$1).toUpperCase();
        var value = parseInt(RegExp.$2);
        var varId = Yanfly.ArmorIdRef[name];
        if (!varId) continue;
        if (obj.armorSellPrices.contains(varId)) continue;
        if (Imported.YEP_ItemCore) {
          if (DataManager.isIndependent($dataArmors[varId])) continue;
        }
        obj.armorSellPrices.unshift(varId);
        obj.armorSellPrice[varId] = value;
        obj.canSell = true;
        obj.cannotSell = false;
      }
    }
  }
};

DataManager.adjustProxyBuy = function(obj, itemType) {
    if (obj.proxyBuy <= 0) return;
    obj.nonIndependent = true;
    var id = obj.proxyBuy;
    var item = null;
    if (itemType === 0) item = $dataItems[id];
    if (itemType === 1) item = $dataWeapons[id];
    if (itemType === 2) item = $dataArmors[id];
    if (Yanfly.Param.MCCopyName) obj.name = item.name;
    if (Yanfly.Param.MCCopyIcon) obj.iconIndex = item.iconIndex;
    if (Yanfly.Param.MCCopyHelp) obj.description = item.description;
    if (Yanfly.Param.MCCopyParams && itemType === 0) {
      obj.effects = item.effects;
    }
    if (Yanfly.Param.MCCopyParams && itemType !== 0) {
      obj.params = item.params.slice();
    }
};

//=============================================================================
// Window_Base
//=============================================================================

Window_Base.prototype.getcurrencyGoldWidth = function(value) {
    if (Imported.YEP_CoreEngine) {
      return this.getCoreGoldWidth(value);
    } else {
      return this.getDefaultGoldWidth(value);
    }
};

Window_Base.prototype.getCoreGoldWidth = function(value) {
    this.resetTextColor();
    this.contents.fontSize = Yanfly.Param.GoldFontSize;
    if (this.usingGoldIcon(TextManager.currencyUnit)) {
      var ww = Window_Base._iconWidth;
    } else {
      var ww = this.textWidth(TextManager.currencyUnit);
    }
    ww += this.textWidth(Yanfly.Util.toGroup(value));
    ww += 4;
    if (this.usingGoldIcon(TextManager.currencyUnit)) ww += 2;
    return ww;
};

Window_Base.prototype.getDefaultGoldWidth = function(value) {
    this.resetTextColor();
    var ww = Math.min(80, this.textWidth(TextManager.currencyUnit));
    ww += this.textWidth(Yanfly.Util.toGroup(value));
    ww += 6;
    return ww;
};

Yanfly.MC.Window_Base_resetFontSettings = 
    Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function() {
    if (this._bypassResetText) return;
    Yanfly.MC.Window_Base_resetFontSettings.call(this);
};

Yanfly.MC.Window_Base_drawCurrencyValue =
    Window_Base.prototype.drawCurrencyValue;
Window_Base.prototype.drawCurrencyValue = function(value, unit, wx, wy, ww) {
    if (unit !== TextManager.currencyUnit) {
      this.drawAltCurrency(value, unit, wx, wy, ww);
    }
    Yanfly.MC.Window_Base_drawCurrencyValue.call(this, value, unit, wx, wy, ww);
};

Window_Base.prototype.drawAltCurrency = function(value, unit, wx, wy, ww) {
    this.resetTextColor();
    var iconIndex = 0;
    var unitText = '';
    if (DataManager.isItem(unit) || DataManager.isWeapon(unit) ||
    DataManager.isArmor(unit)) {
      var iconIndex = unit.iconIndex;
    } else if (unit.match(/VARIABLE[ ](\d+)/i)) {
      var name = $dataSystem.variables[parseInt(RegExp.$1)];
      if (name.match(/\\I\[(\d+)\]/i)) {
        var iconIndex = parseInt(RegExp.$1);
      }
      name = name.replace(/\\I\[(\d+)\]/gi, '');
      unitText = name.replace(/<<(.*?)>>/gi, '');
    }
    // Draw Text
    this.contents.fontSize = Yanfly.Param.MCCurrencyFontSize;
    if (unitText !== '') {
      this.changeTextColor(this.systemColor());
      this.drawText(unitText, wx, wy, ww, 'right');
      ww -= this.textWidth(unitText);
    }
    // Draw Icon
    if (iconIndex > 0) {
      if (unitText !== '') ww -= 6;
      ww -= Window_Base._iconWidth;
      this.drawIcon(iconIndex, wx + ww, wy + 2);
    }
    this.resetTextColor();
    this.drawText(Yanfly.Util.toGroup(value), wx, wy, ww, 'right');
    ww -= this.textWidth(Yanfly.Util.toGroup(value));
    this.resetFontSettings();
    return ww;
};

//=============================================================================
// Window_Gold
//=============================================================================

Yanfly.MC.Window_Gold_refresh = Window_Gold.prototype.refresh;
Window_Gold.prototype.refresh = function() {
    var x = this.textPadding();
    var ww = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
    if (this.isDrawGoldCurrency()) {
      Yanfly.MC.Window_Gold_refresh.call(this);
      ww -= this.getcurrencyGoldWidth(this.value());
      ww -= Yanfly.Param.MCCurrencyPadding;
    }
    if (this._item) this.drawItemCurrencies(x, ww);
    this.resetFontSettings();
};

Window_Gold.prototype.isDrawGoldCurrency = function() {
    if (this._item) {
      var item = this._item;
      if (this._buyMode) {
        if (item.variableBuyPrices && item.variableBuyPrices.length > 0) {
          return item.price > 0;
        }
        if (item.itemBuyPrices && item.itemBuyPrices.length > 0) {
          return item.price > 0;
        }
        if (item.weaponBuyPrices && item.weaponBuyPrices.length > 0) {
          return item.price > 0;
        }
        if (item.armorBuyPrices && item.armorBuyPrices.length > 0) {
          return item.price > 0;
        }
      } else {
        if (item.variableSellPrices && item.variableSellPrices.length > 0) {
          return item.price > 0;
        }
        if (item.itemSellPrices && item.itemSellPrices.length > 0) {
          return item.price > 0;
        }
        if (item.weaponSellPrices && item.weaponSellPrices.length > 0) {
          return item.price > 0;
        }
        if (item.armorSellPrices && item.armorSellPrices.length > 0) {
          return item.price > 0;
        }
      }
    }
    return true;
};

Window_Gold.prototype.setItemBuy = function(item) {
    if (this._item === item) return;
    this._item = item;
    this._buyMode = true;
    this.refresh();
};

Window_Gold.prototype.setItemSell = function(item) {
    if (this._item === item) return;
    this._item = item;
    this._buyMode = false;
    this.refresh();
};

Window_Gold.prototype.drawItemCurrencies = function(wx, ww) {
    var item = this._item;
    var wy = 0;
    // Variables
    var currencies = this._buyMode ?
      item.variableBuyPrices : item.variableSellPrices;
    if (currencies) {
      var length = currencies.length;
      if (length > 0) {
        for (var i = 0; i < length; ++i) {
          var varId = currencies[i];
          var value = $gameVariables.value(varId);
          var unit = 'VARIABLE ' + varId;
          ww = this.drawAltCurrency(value, unit, wx, wy, ww);
          ww -= Yanfly.Param.MCCurrencyPadding;
        }
      }
    }
    // Armors
    currencies = this._buyMode ? item.armorBuyPrices : item.armorSellPrices;
    if (currencies) {
      length = currencies.length;
      if (length > 0) {
        for (var i = 0; i < length; ++i) {
          var costItem = $dataArmors[currencies[i]];
          var value = $gameParty.numItems(costItem);
          ww = this.drawAltCurrency(value, costItem, wx, wy, ww);
          ww -= Yanfly.Param.MCCurrencyPadding;
        }
      }
    }
    // Weapons
    currencies = this._buyMode ? item.weaponBuyPrices : item.weaponSellPrices;
    if (currencies) {
      length = currencies.length;
      if (length > 0) {
        for (var i = 0; i < length; ++i) {
          var costItem = $dataWeapons[currencies[i]];
          var value = $gameParty.numItems(costItem);
          ww = this.drawAltCurrency(value, costItem, wx, wy, ww);
          ww -= Yanfly.Param.MCCurrencyPadding;
        }
      }
    }
    // Items
    currencies = this._buyMode ? item.itemBuyPrices : item.itemSellPrices;
    if (currencies) {
      length = currencies.length;
      if (length > 0) {
        for (var i = 0; i < length; ++i) {
          var costItem = $dataItems[currencies[i]];
          var value = $gameParty.numItems(costItem);
          ww = this.drawAltCurrency(value, costItem, wx, wy, ww);
          ww -= Yanfly.Param.MCCurrencyPadding;
        }
      }
    }
};

//=============================================================================
// Window_ShopStatus
//=============================================================================

Yanfly.MC.Window_ShopStatus_drawPossession =
    Window_ShopStatus.prototype.drawPossession;
Window_ShopStatus.prototype.drawPossession = function(x, y) {
    var oldItem = this._item;
    if (this._item.proxyBuy) {
      var id = this._item.proxyBuy;
      if (DataManager.isItem(this._item)) this._item = $dataItems[id];
      if (DataManager.isWeapon(this._item)) this._item = $dataWeapons[id];
      if (DataManager.isArmor(this._item)) this._item = $dataArmors[id];
    }
    Yanfly.MC.Window_ShopStatus_drawPossession.call(this, x, y);
    this._item = oldItem;
};

Yanfly.MC.Window_ShopStatus_setItem = Window_ShopStatus.prototype.setItem;
Window_ShopStatus.prototype.setItem = function(item) {
    if (item && item.proxyBuy) {
      var id = item.proxyBuy;
      if (DataManager.isItem(item)) item = $dataItems[id];
      if (DataManager.isWeapon(item)) item = $dataWeapons[id];
      if (DataManager.isArmor(item)) item = $dataArmors[id];
    }
    Yanfly.MC.Window_ShopStatus_setItem.call(this, item);
};

//=============================================================================
// Window_ShopBuy
//=============================================================================

Yanfly.MC.Window_ShopBuy_drawBuyPrice = Window_ShopBuy.prototype.drawBuyPrice;
Window_ShopBuy.prototype.drawBuyPrice = function(item, rect) {
    if (!item) return;
    if (item.price > 0) {
      Yanfly.MC.Window_ShopBuy_drawBuyPrice.call(this, item, rect);
    }
    var ww = this.calculatePriceWidth(item, rect);
    ww = this.drawVariableBuyPrices(item, rect, ww);
    ww = this.drawArmorBuyPrices(item, rect, ww);
    ww = this.drawWeaponBuyPrices(item, rect, ww);
    ww = this.drawItemBuyPrices(item, rect, ww);
};

Window_ShopBuy.prototype.calculatePriceWidth = function(item, rect) {
    if (item.price <= 0) return rect.width;
    var ww = rect.width;
    ww -= this.getcurrencyGoldWidth(item.price);
    ww -= Yanfly.Param.MCCurrencyPadding;
    return ww;
};

Window_ShopBuy.prototype.drawVariableBuyPrices = function(item, rect, ww) {
    if (!item.variableBuyPrices) return ww;
    if (item.variableBuyPrices.length <= 0) return ww;
    var length = item.variableBuyPrices.length;
    for (var i = 0; i < length; ++i) {
      var varId = item.variableBuyPrices[i];
      ww = this.drawVariablePrice(item, varId, rect, ww);
    }
    return ww;
};

Window_ShopBuy.prototype.drawVariablePrice = function(item, varId, rect, ww) {
    var value = item.variableBuyPrice[varId];
    var unit = 'VARIABLE ' + varId;
    ww = this.drawAltCurrency(value, unit, rect.x, rect.y, ww);
    ww -= Yanfly.Param.MCCurrencyPadding;
    return ww;
};

Window_ShopBuy.prototype.drawItemBuyPrices = function(item, rect, ww) {
    if (!item.itemBuyPrices) return ww;
    if (item.itemBuyPrices.length <= 0) return ww;
    var length = item.itemBuyPrices.length;
    for (var i = 0; i < length; ++i) {
      var varId = item.itemBuyPrices[i];
      ww = this.drawItemBuyPrice(item, varId, rect, ww);
    }
    return ww;
};

Window_ShopBuy.prototype.drawItemBuyPrice = function(item, varId, rect, ww) {
    var value = item.itemBuyPrice[varId];
    var unit = $dataItems[varId];
    ww = this.drawAltCurrency(value, unit, rect.x, rect.y, ww);
    ww -= Yanfly.Param.MCCurrencyPadding;
    return ww;
};

Window_ShopBuy.prototype.drawWeaponBuyPrices = function(item, rect, ww) {
    if (!item.weaponBuyPrices) return ww;
    if (item.weaponBuyPrices.length <= 0) return ww;
    var length = item.weaponBuyPrices.length;
    for (var i = 0; i < length; ++i) {
      var varId = item.weaponBuyPrices[i];
      ww = this.drawWeaponBuyPrice(item, varId, rect, ww);
    }
    return ww;
};

Window_ShopBuy.prototype.drawWeaponBuyPrice = function(item, varId, rect, ww) {
    var value = item.weaponBuyPrice[varId];
    var unit = $dataWeapons[varId];
    ww = this.drawAltCurrency(value, unit, rect.x, rect.y, ww);
    ww -= Yanfly.Param.MCCurrencyPadding;
    return ww;
};

Window_ShopBuy.prototype.drawArmorBuyPrices = function(item, rect, ww) {
    if (!item.armorBuyPrices) return ww;
    if (item.armorBuyPrices.length <= 0) return ww;
    var length = item.armorBuyPrices.length;
    for (var i = 0; i < length; ++i) {
      var varId = item.armorBuyPrices[i];
      ww = this.drawArmorBuyPrice(item, varId, rect, ww);
    }
    return ww;
};

Window_ShopBuy.prototype.drawArmorBuyPrice = function(item, varId, rect, ww) {
    var value = item.armorBuyPrice[varId];
    var unit = $dataArmors[varId];
    ww = this.drawAltCurrency(value, unit, rect.x, rect.y, ww);
    ww -= Yanfly.Param.MCCurrencyPadding;
    return ww;
};

Window_ShopBuy.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Yanfly.MC.Window_ShopBuy_isEnabled = Window_ShopBuy.prototype.isEnabled;
Window_ShopBuy.prototype.isEnabled = function(item) {
    // Variables
    if (item && $gamePlayer.isDebugThrough()) return true;
    if (item && item.variableBuyPrices.length > 0) {
      var length = item.variableBuyPrices.length;
      for (var i = 0; i < length; ++i) {
        var varId = item.variableBuyPrices[i];
        var price = item.variableBuyPrice[varId];
        var value = $gameVariables.value(varId);
        if (value < price) return false;
      }
    }
    // Items
    if (item && item.itemBuyPrices.length > 0) {
      var length = item.itemBuyPrices.length;
      for (var i = 0; i < length; ++i) {
        var varId = item.itemBuyPrices[i];
        var price = item.itemBuyPrice[varId];
        var value = $gameParty.numItems($dataItems[varId]);
        if (value < price) return false;
      }
    }
    // Weapons
    if (item && item.weaponBuyPrices.length > 0) {
      var length = item.weaponBuyPrices.length;
      for (var i = 0; i < length; ++i) {
        var varId = item.weaponBuyPrices[i];
        var price = item.weaponBuyPrice[varId];
        var value = $gameParty.numItems($dataWeapons[varId]);
        if (value < price) return false;
      }
    }
    // Armors
    if (item && item.armorBuyPrices.length > 0) {
      var length = item.armorBuyPrices.length;
      for (var i = 0; i < length; ++i) {
        var varId = item.armorBuyPrices[i];
        var price = item.armorBuyPrice[varId];
        var value = $gameParty.numItems($dataArmors[varId]);
        if (value < price) return false;
      }
    }
    return Yanfly.MC.Window_ShopBuy_isEnabled.call(this, item);
};

Yanfly.MC.Window_ShopBuy_updateHelp = Window_ShopBuy.prototype.updateHelp;
Window_ShopBuy.prototype.updateHelp = function() {
    Yanfly.MC.Window_ShopBuy_updateHelp.call(this);
    if (SceneManager._scene._goldWindow) {
      SceneManager._scene._goldWindow.setItemBuy(this.item())
    }
};

//=============================================================================
// Window_ShopSell
//=============================================================================

Yanfly.MC.Window_ShopSell_updateHelp = Window_ShopSell.prototype.updateHelp;
Window_ShopSell.prototype.updateHelp = function() {
    Yanfly.MC.Window_ShopSell_updateHelp.call(this);
    if (SceneManager._scene._goldWindow) {
      SceneManager._scene._goldWindow.setItemSell(this.item())
    }
};

//=============================================================================
// Scene_Shop
//=============================================================================

Yanfly.MC.Scene_Shop_maxBuy = Scene_Shop.prototype.maxBuy;
Scene_Shop.prototype.maxBuy = function() {
    var max = Yanfly.MC.Scene_Shop_maxBuy.call(this);
    // Variables
    var length = this._item.variableBuyPrices.length;
    if (length > 0) {
      for (var i = 0; i < length; ++i) {
        var varId = this._item.variableBuyPrices[i];
        var value = $gameVariables.value(varId);
        var price = this._item.variableBuyPrice[varId];
        max = Math.min(max, Math.floor(value / price));
      }
    }
    // Items
    var length = this._item.itemBuyPrices.length;
    if (length > 0) {
      for (var i = 0; i < length; ++i) {
        var varId = this._item.itemBuyPrices[i];
        var value = $gameParty.numItems($dataItems[varId]);
        var price = this._item.itemBuyPrice[varId];
        max = Math.min(max, Math.floor(value / price));
      }
    }
    // Weapons
    var length = this._item.weaponBuyPrices.length;
    if (length > 0) {
      for (var i = 0; i < length; ++i) {
        var varId = this._item.weaponBuyPrices[i];
        var value = $gameParty.numItems($dataWeapons[varId]);
        var price = this._item.weaponBuyPrice[varId];
        max = Math.min(max, Math.floor(value / price));
      }
    }
    // Armors
    var length = this._item.armorBuyPrices.length;
    if (length > 0) {
      for (var i = 0; i < length; ++i) {
        var varId = this._item.armorBuyPrices[i];
        var value = $gameParty.numItems($dataArmors[varId]);
        var price = this._item.armorBuyPrice[varId];
        max = Math.min(max, Math.floor(value / price));
      }
    }
    return max;
};

Yanfly.MC.Scene_Shop_doBuyGold = Scene_Shop.prototype.doBuyGold;
Scene_Shop.prototype.doBuyGold = function(number) {
    Yanfly.MC.Scene_Shop_doBuyGold.call(this, number);
    // Variables
    var length = this._item.variableBuyPrices.length;
    if (length > 0) {
      for (var i = 0; i < length; ++i) {
        var varId = this._item.variableBuyPrices[i];
        var value = $gameVariables.value(varId);
        var price = this._item.variableBuyPrice[varId];
        $gameVariables.setValue(varId, value - price * number);
      }
    }
    // Items
    var length = this._item.itemBuyPrices.length;
    if (length > 0) {
      for (var i = 0; i < length; ++i) {
        var varId = this._item.itemBuyPrices[i];
        var value = $gameParty.numItems($dataItems[varId]);
        var price = this._item.itemBuyPrice[varId];
        $gameParty.gainItem($dataItems[varId], -price * number);
      }
    }
    // Weapons
    var length = this._item.weaponBuyPrices.length;
    if (length > 0) {
      for (var i = 0; i < length; ++i) {
        var varId = this._item.weaponBuyPrices[i];
        var value = $gameParty.numItems($dataWeapons[varId]);
        var price = this._item.weaponBuyPrice[varId];
        $gameParty.gainItem($dataWeapons[varId], -price * number);
      }
    }
    // Armors
    var length = this._item.armorBuyPrices.length;
    if (length > 0) {
      for (var i = 0; i < length; ++i) {
        var varId = this._item.armorBuyPrices[i];
        var value = $gameParty.numItems($dataArmors[varId]);
        var price = this._item.armorBuyPrice[varId];
        $gameParty.gainItem($dataArmors[varId], -price * number);
      }
    }
};

Yanfly.MC.Scene_Shop_doBuyItem = Scene_Shop.prototype.doBuyItem;
Scene_Shop.prototype.doBuyItem = function(number) {
    var oldItem = this._item;
    if (this._item.proxyBuy) {
      var id = this._item.proxyBuy;
      if (DataManager.isItem(this._item)) this._item = $dataItems[id];
      if (DataManager.isWeapon(this._item)) this._item = $dataWeapons[id];
      if (DataManager.isArmor(this._item)) this._item = $dataArmors[id];
    }
    Yanfly.MC.Scene_Shop_doBuyItem.call(this, number);
    this._item = oldItem;
};

Yanfly.MC.Scene_Shop_onBuyCancel = Scene_Shop.prototype.onBuyCancel;
Scene_Shop.prototype.onBuyCancel = function() {
    Yanfly.MC.Scene_Shop_onBuyCancel.call(this);
    this._goldWindow.setItemBuy(null);
};

Yanfly.MC.Scene_Shop_doSellGold = Scene_Shop.prototype.doSellGold;
Scene_Shop.prototype.doSellGold = function(number) {
    Yanfly.MC.Scene_Shop_doSellGold.call(this, number);
    // Variables
    if (this._item.variableSellPrices) {
      var length = this._item.variableSellPrices.length;
      if (length > 0) {
        for (var i = 0; i < length; ++i) {
          var varId = this._item.variableSellPrices[i];
          var value = $gameVariables.value(varId);
          var price = this._item.variableSellPrice[varId];
          $gameVariables.setValue(varId, value + price * number);
        }
      }
    }
    // Items
    if (this._item.itemSellPrices) {
      var length = this._item.itemSellPrices.length;
      if (length > 0) {
        for (var i = 0; i < length; ++i) {
          var varId = this._item.itemSellPrices[i];
          var value = $gameParty.numItems($dataItems[varId]);
          var price = this._item.itemSellPrice[varId];
          $gameParty.gainItem($dataItems[varId], price * number);
        }
      }
    }
    // Weapons
    if (this._item.weaponSellPrices) {
      var length = this._item.weaponSellPrices.length;
      if (length > 0) {
        for (var i = 0; i < length; ++i) {
          var varId = this._item.weaponSellPrices[i];
          var value = $gameParty.numItems($dataWeapons[varId]);
          var price = this._item.weaponSellPrice[varId];
          $gameParty.gainItem($dataWeapons[varId], price * number);
        }
      }
    }
    // Armors
    if (this._item.armorSellPrices) {
      var length = this._item.armorSellPrices.length;
      if (length > 0) {
        for (var i = 0; i < length; ++i) {
          var varId = this._item.armorSellPrices[i];
          var value = $gameParty.numItems($dataArmors[varId]);
          var price = this._item.armorSellPrice[varId];
          $gameParty.gainItem($dataArmors[varId], price * number);
        }
      }
    }
};

Yanfly.MC.Scene_Shop_onSellCancel = Scene_Shop.prototype.onSellCancel;
Scene_Shop.prototype.onSellCancel = function() {
    Yanfly.MC.Scene_Shop_onSellCancel.call(this);
    this._goldWindow.setItemSell(null);
};

//=============================================================================
// Victory Aftermath Changes
//=============================================================================

if (Imported.YEP_VictoryAftermath) {

//=============================================================================
// Window_VictoryDrop
//=============================================================================

if (Yanfly.Param.MCGoldItem) {

Window_VictoryDrop.prototype.drawGold = function(item, index) {
    if (item !== 'gold') return;
    this.resetFontSettings();
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    var value = BattleManager._rewards.gold;
    var currency = TextManager.currencyUnit;
    this.drawIcon(Yanfly.Param.MCGoldIcon, rect.x + 2, rect.y);
    var wx = rect.x + Window_Base._iconWidth + 4;
    var ww = rect.width - Window_Base._iconWidth + 4;
    this.drawText(currency, wx, rect.y, ww);
    var size = Yanfly.Param.ItemQuantitySize || 28;
    this.contents.fontSize = size;
    var text = '\u00d7' + Yanfly.Util.toGroup(value);
    this.drawText(text, rect.x, rect.y, rect.width, 'right');
    this.resetFontSettings();
};

}; // Yanfly.Param.MCGoldItem

//=============================================================================
// End Victory Aftermath Changes
//=============================================================================

} // Imported.YEP_VictoryAftermath

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
    Yanfly.Util.toGroup = function(inVal) {
        return inVal;
    }
};

//=============================================================================
// End of File
//=============================================================================
}; //