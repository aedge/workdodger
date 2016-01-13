var gameTitle = function(game){} 

gameTitle.prototype = {
  	create: function(){
		//  A spacey background
		this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
        /**
		var text = "Workdodger";
		var style = { font: "40px Arial", fill: "#ffffff", align: "center" };
		var titleText = this.game.add.text(this.game.world.centerX - 110, 50, text, style);
		var playText = this.game.add.text(this.game.world.centerX - 30, 300, 'play', style);
		
		playText.inputEnabled = true;
		playText.events.onInputOver.add(this.textFocus, this);
		playText.events.onInputOut.add(this.textBlur, this);
		playText.events.onInputDown.add(this.playTheGame, this);
        **/
		
		//var playButton = this.game.add.button(160,320,"play again",this.playTheGame,this);
		//playButton.anchor.setTo(0.5,0.5);
	},    
	playTheGame: function(){
		this.game.state.start("TheGame");
	},
    /**
	textFocus: function(item) {
		item.fill = "#ff0044";
	},
	textBlur: function(item) {
		item.fill = "#ffffff";
	}
	**/
}