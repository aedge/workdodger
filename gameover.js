var gameOver = function(game){}
var timeLasted;

gameOver.prototype = {
	init: function(timeLastedIn){
		timeLasted = timeLastedIn;
	},
  	create: function(){
        //  A spacey background
		this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
        
		displayGameOver(this.game, timeLasted);
	}	
	
}