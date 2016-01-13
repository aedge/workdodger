var preload = function(game){}
 
preload.prototype = {
	preload: function(){ 
		this.game.load.image('space', 'assets/deep-space.jpg');
		this.game.load.image('ship', 'assets/ship.png');
		this.game.load.image('baddie', 'assets/space-baddie.png');
		this.game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);	
	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}