var theGame = function(game) {

}

theGame.prototype = {
		create: function() {
			
			//  This will run in Canvas mode, so let's gain a little speed and display
			this.game.renderer.clearBeforeRender = false;
			this.game.renderer.roundPixels = true;

			//  We need arcade physics
			this.game.physics.startSystem(Phaser.Physics.ARCADE);

			//  A spacey background
			this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

			//  Our player ship
			sprite = this.game.add.sprite(300, 300, 'ship');
			sprite.anchor.set(0.5);
			sprite.animations.add('kaboom');
			
			spriteExplosion = this.game.add.sprite(-20, -20, 'kaboom');
			spriteExplosion.anchor.x = 0.5;
			spriteExplosion.anchor.y = 0.5;
			spriteExplosion.animations.add('kaboom');
			
			//enemies
			enemies = this.game.add.group();
		    enemies.enableBody = true;
			enemies.physicsBodyType = Phaser.Physics.ARCADE;

			//  and its physics settings
			this.game.physics.enable(sprite, Phaser.Physics.ARCADE);

			sprite.body.drag.set(100);
			sprite.body.maxVelocity.set(200);

			//  Game input
			cursors = this.game.input.keyboard.createCursorKeys();
			this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
			
			numEnemies = 1;
			maxEnemies = 20;
			spawnPoint = 1; //1=top,2=right,3=bottom,4=left
			counter = 0;
			gameStartTime = this.game.time.now;
			counterText = this.game.add.text(10, 10, 'Survival Time: 0 Seconds', { font: "22px Arial", fill: "#ffffff", align: "center" })
			this.game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

			
			this.game.time.events.loop(Phaser.Timer.SECOND * 0.5, this.createBaddie, this);

		},

		update: function() {
		
			this.game.physics.arcade.overlap(sprite, enemies, this.spriteEnemyCollisionHandler, null, this);
			this.game.physics.arcade.collide(enemies);

			if (cursors.up.isDown)
			{
				this.game.physics.arcade.accelerationFromRotation(sprite.rotation, 200, sprite.body.acceleration);
			}
			else
			{
				sprite.body.acceleration.set(0);
			}

			if (cursors.left.isDown)
			{
				sprite.body.angularVelocity = -300;
			}
			else if (cursors.right.isDown)
			{
				sprite.body.angularVelocity = 300;
			}
			else
			{
				sprite.body.angularVelocity = 0;
			}

			this.screenWrap(sprite);

		},

		screenWrap: function(sprite) {

			if (sprite.x < 0)
			{
				sprite.x = this.game.width;
			}
			else if (sprite.x > this.game.width)
			{
				sprite.x = 0;
			}

			if (sprite.y < 0)
			{
				sprite.y = this.game.height;
			}
			else if (sprite.y > this.game.height)
			{
				sprite.y = 0;
			}

		},

	    createBaddie: function() {

			if(numEnemies < maxEnemies){
			
			    if(numEnemies % 4 === 0){
					x = 400;
					y = 1;
				}
				
				else if(numEnemies % 3 === 0){
					x = 800;
					y = 300;
				}
				
				else if(numEnemies % 2 === 0){
					x = 400;
					y = 600;
				}
				
				else {
					x = 1;
					y = 300;
				}
				
				//enemies.create(360 + Math.random() * 200, 120 + Math.random() * 200,'baddie');
				var e = enemies.create(x, y, 'baddie');
				e.name = "enemy" + numEnemies;
				//  This gets it moving
				e.body.velocity.x = this.game.rnd.integerInRange(-200, 200);
				e.body.velocity.y = this.game.rnd.integerInRange(-200, 0);

				//  This makes the game world bounce-able
				e.body.collideWorldBounds = true;

				//  This sets the image bounce energy for the horizontal 
				//  and vertical vectors (as an x,y point). "1" is 100% energy return
				e.body.bounce.setTo(1, 1);
				
				numEnemies++;
			}


		},

		render: function() {
		
		
		},
		
		
		 spriteEnemyCollisionHandler: function(sprite, enemy){
			
			spriteExplosion.reset(sprite.body.x, sprite.body.y);
			spriteExplosion.play('kaboom', 30, false, true);
			
			sprite.kill();
			
			timeLasted = this.game.time.elapsedSince(gameStartTime);
			timeLasted = Math.round(timeLasted / 1000 * 100) / 100;

			
			this.game.state.start("GameOver",true,false, timeLasted);
		
		},
		
		updateCounter: function() {

			counter++;
			counterText.setText('Survival Time: ' + counter + ' seconds');
			

		}

}