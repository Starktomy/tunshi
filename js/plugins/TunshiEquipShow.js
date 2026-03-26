
var TH = TH || {};
TH.Param = {};
TH.Param.Parameters = PluginManager.parameters('TunshiEquipShow');
TH.Param_dunPaiXianShi = 0;  
TH.Param_direnhanban = 1;  
TH.Param_zuojizhuangbei = 4;

ImageManager.loadWuqitu = function(filename, hue) {
    return this.loadBitmap('img/wuqitu/', filename, hue, true);
};

var TH_Party_initialize = Game_Party.prototype.initialize
Game_Party.prototype.initialize = function() {
  TH_Party_initialize.call(this);
    this._weaponzuobiao = -1;
    this._diRenWeaponzuobiao = -1;
    this._weaponzuobiaoPanDing = -1
};

//创建
Sprite_Actor.prototype.createMainSprite = function() {
	this._ZuoJiSprite = new Sprite_Base();
    this._ZuoJiSprite.anchor.x = 0.5;
    this._ZuoJiSprite.anchor.y = 0.5;
    this.addChild(this._ZuoJiSprite);

    this._mainSprite = new Sprite_Base();
    this._mainSprite.anchor.x = 0.5;
    this._mainSprite.anchor.y = 1;
    this.addChild(this._mainSprite);
    this._effectTarget = this._mainSprite;

    this._WuQiSprite = new Sprite_Base();
    this._WuQiSprite.anchor.x = 0.5;
    this._WuQiSprite.anchor.y = 0.5;
    this.addChild(this._WuQiSprite);

    this._ZuoJiSprite1 = new Sprite_Base();
    this._ZuoJiSprite1.anchor.x = 0.5;
    this._ZuoJiSprite1.anchor.y = 0.5;
    this.addChild(this._ZuoJiSprite1);

    this._DunPaiSprite = new Sprite_Base();
    this._DunPaiSprite.anchor.x = 0.5;
    this._DunPaiSprite.anchor.y = 0.5;
    this.addChild(this._DunPaiSprite);

};
Sprite_Actor.prototype.updateBitmap = function() {
    Sprite_Battler.prototype.updateBitmap.call(this);
    var name = this._actor.battlerName();
    if (this._battlerName != name) {
        this._battlerName = name;
        this._mainSprite.bitmap = ImageManager.loadSvActor(name);
        var actor = this._battler
        var id = this._battler.equips()[0] 
        if (id != null){
          var wqid = this._battler._equips[0]._itemId
          var JSwuqi = $dataWeapons[wqid].meta.wuqiid;
          this._WuQiSprite.bitmap = ImageManager.loadWuqitu(JSwuqi);
          this._WuQiSprite.x = -23
          this._WuQiSprite.y = -30
        }
		id = this._battler.equips()[0] 
        if (id != null){
          var wqid = this._battler._equips[0]._itemId
          var JSwuqi = $dataWeapons[wqid].meta.wuqiid;
          this._WuQiSprite.bitmap = ImageManager.loadWuqitu(JSwuqi);
          this._WuQiSprite.x = -23
          this._WuQiSprite.y = -30
        }
        if ($gameVariables.value(TH.Param_dunPaiXianShi) != 0){
          var actor = this._battler
          var id = this._battler.equips()[1] 
          if (id != null){
            var dpid = this._battler._equips[1]._itemId
            var JSdunpai = $dataArmors[dpid].meta.wuqiid;
            this._DunPaiSprite.bitmap = ImageManager.loadWuqitu(JSdunpai);
            this._DunPaiSprite.x = -7
            this._DunPaiSprite.y = -33
          }
        }
			
			
			if (this._battler.equips().length == 13) {
				TH.Param_zuojizhuangbei = 8;
			} else if (this._battler.equips().length == 9) {
				TH.Param_zuojizhuangbei = 6;
			} else {
				TH.Param_zuojizhuangbei = 4;
			}
			
			var zqid = this._battler.equips()[TH.Param_zuojizhuangbei]; 
			
          if (zqid != null){
			  
            var zqid = this._battler._equips[TH.Param_zuojizhuangbei]._itemId
            var JSzuoJi = $dataArmors[zqid].meta.zuojiid;
			if (JSzuoJi == undefined) 
				return;
            this._ZuoJiSprite.bitmap = ImageManager.loadWuqitu(JSzuoJi);
            this._ZuoJiSprite.x = 0
            this._ZuoJiSprite.y = -43
            var JSzuoJi1 = $dataArmors[zqid].meta.zuojiid+"1"
            this._ZuoJiSprite1.bitmap = ImageManager.loadWuqitu(JSzuoJi1);
            this._ZuoJiSprite1.x = 0
            this._ZuoJiSprite1.y = -43
            this._mainSprite.y = -30
            this._WuQiSprite.y = -60
            if ($gameVariables.value(100) != 0){
            this._DunPaiSprite.y = -63
          }

            if ($dataArmors[zqid].meta.feixing != null){
              this._mainSprite.y = -68
              this._WuQiSprite.y = -98
              if ($gameVariables.value(100) != 0){
              this._DunPaiSprite.y = -101
            }
            }
            if ($dataArmors[zqid].meta.zhongxing != null){
              this._mainSprite.y = -45
              this._WuQiSprite.y = -75
              if ($gameVariables.value(100) != 0){
              this._DunPaiSprite.y = -78
            }
            }
            if ($dataArmors[zqid].meta.tuoshiche != null){
              this._mainSprite.y = 0
              this._WuQiSprite.y = -30
              if ($gameVariables.value(100) != 0){
              this._DunPaiSprite.y = -33
            }
            }
            if ($dataArmors[zqid].meta.zuojiAx != null ){
              this._ZuoJiSprite.x = $dataArmors[zqid].meta.zuojiAx
              this._ZuoJiSprite1.x = $dataArmors[zqid].meta.zuojiAx
            }
            if ($dataArmors[zqid].meta.zuojiAy != null ){
              this._ZuoJiSprite.y = $dataArmors[zqid].meta.zuojiAy
              this._ZuoJiSprite1.y = $dataArmors[zqid].meta.zuojiAy
            }
        }
    }
};

Sprite_Actor.prototype.updateFrame = function() {
    Sprite_Battler.prototype.updateFrame.call(this);
    var bitmap = this._mainSprite.bitmap;
    var bitmap1 = this._WuQiSprite.bitmap;
    var bitmap2 = this._DunPaiSprite.bitmap;
    var bitmap3 = this._ZuoJiSprite.bitmap;
    if (bitmap) {
        var motionIndex = this._motion ? this._motion.index : 0;
        var pattern = this._pattern < 3 ? this._pattern : 1;
        var cw = bitmap.width / 9;
        var ch = bitmap.height / 6;
        var cx = Math.floor(motionIndex / 6) * 3 + pattern;
        var cy = motionIndex % 6;
        this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch);
    }
    if (bitmap1) {
        //var motionIndex = this._motion ? this._motion.index : 0;
        var motionIndex = 0;
        var pattern = this._pattern < 3 ? this._pattern : 1;
        var actor = this._battler
        var id = this._battler.equips()[0] 
        if (id != null){
          var cw = bitmap1.width / 3;
          var cx = Math.floor(motionIndex / 6) * 3 + pattern;
          this._WuQiSprite.setFrame(cx * cw, 0, cw, bitmap1.height);
        }
    }
    if (bitmap2) {
        var motionIndex = this._motion ? this._motion.index : 0;
        var pattern = this._pattern < 3 ? this._pattern : 1;
        var actor = this._battler
        var id = this._battler.equips()[1] 
          if (id != null){
          var cw = bitmap2.width / 3;
          var cx = Math.floor(motionIndex / 6) * 3 + pattern;
          this._DunPaiSprite.setFrame(cx * cw, 0, cw, bitmap2.height);
        }
    }
    if (bitmap3) {
		if (this._battler.equips().length == 13) {
			TH.Param_zuojizhuangbei = 8;
		} else if (this._battler.equips().length == 9) {
			TH.Param_zuojizhuangbei = 6;
		} else {
			TH.Param_zuojizhuangbei = 4;
		}
		
        var motionIndex = this._motion ? this._motion.index : 0;
        var pattern = this._pattern < 3 ? this._pattern : 1;
        var actor = this._battler
        var id = this._battler.equips()[TH.Param_zuojizhuangbei] 
          if (id != null){
          var cw = bitmap3.width / 3;
          var cx = 0 + pattern*cw
          this._ZuoJiSprite.setFrame(cx, 0, cw, bitmap3.height);
          this._ZuoJiSprite1.setFrame(cx, 0, cw, bitmap3.height);
        }
    }

};


//获取角色方执行ID
Sprite_Actor.prototype.setupWeaponAnimation = function() {
    if (this._actor.isWeaponAnimationRequested()) {
        $gameParty._weaponzuobiao = this._actor.index()
        $gameParty._weaponzuobiaoPanDing = 0
        this._weaponSprite.setup(this._actor.weaponImageId());
        this._actor.clearWeaponAnimation();
    }
};
//攻击武器坐标
Yanfly.BEC.Sprite_Weapon_setup = Sprite_Weapon.prototype.setup;
Sprite_Weapon.prototype.setup = function(weaponImageId) {
    Yanfly.BEC.Sprite_Weapon_setup.call(this, weaponImageId);
    this._animationCount -= 1; // Synch with sprite

    if ($gameParty._weaponzuobiaoPanDing == 0){
        var id = $gameParty.members()[$gameParty._weaponzuobiao]
        if (id.equips()[TH.Param_zuojizhuangbei] != null){
          this.y = - 22
          var zqid = id._equips[TH.Param_zuojizhuangbei]._itemId
          if ($dataArmors[zqid].meta.feixing != null){
            this.y = - 68
          }
          if ($dataArmors[zqid].meta.zhongxing != null){
                this.y = - 40
            }
          if ($dataArmors[zqid].meta.tuoshiche != null){
                this.y = 0
          }
        }
    }
    if ($gameParty._weaponzuobiaoPanDing == 1){
      var enemy = $gameTroop.members()[$gameParty._diRenWeaponzuobiao]._enemyId
      if ($dataEnemies[enemy].meta.zuojiid != null){
        this.y = - 36
        if ($dataEnemies[enemy].meta.feixing != null ){
          this.y = - 68
        }
        if ($dataEnemies[enemy].meta.zhongxing != null ){
          this.y = - 40
        }
        if ($dataEnemies[enemy].meta.tuoshiche != null){
          this.y = 0
        }
      }
    }
    $gameParty._weaponzuobiao = -1
    $gameParty._diRenWeaponzuobiao = -1
    $gameParty._weaponzuobiaoPanDing = -1
};

