// 
// 

var game = {
	characters: {
		mario: {
			name: "Mario",
			healthPoints: 120,
			currentHP: 120,
			attackPower: 8,
			counterAttackPower: 8,
			isAlive: true,
			div: "#marioHP",
			button: '<button class="img" id="mario img" value="mario"><p style="text-align: center;">Mario</p><img src="assets/img/mario.png"><p id="marioHP" style="text-align: center;">120</p></button>'
		},
		luigi: {
			name: "Luigi",
			healthPoints: 100,
			currentHP: 100,
			attackPower: 5,
			counterAttackPower: 5,
			isAlive: true,
			div: "#luigiHP",
			button: '<button class="img" id="luigi img" value="luigi"><p style="text-align: center;">Luigi</p><img src="assets/img/luigi.png"><p id="luigiHP" style="text-align: center;">100</p></button>'
		},
		peach: {
			name: "Peach",
			healthPoints: 150,
			currentHP: 150,
			attackPower: 20,
			counterAttackPower: 20,
			isAlive: true,
			div: "#peachHP",
			button: '<button class="img" id="peach img" value="peach"><p style="text-align: center;">Peach</p><img src="assets/img/peach.png"><p id="peachHP" style="text-align: center;">150</p></button>'
		},
		toad: {
			name: "Toad",
			healthPoints: 180,
			currentHP: 180,
			attackPower: 25,
			counterAttackPower: 25,
			isAlive: true,
			div: "#toadHP",
			button: '<button class="img" id="toad img" value="toad"><p style="text-align: center;">Toad</p><img src="assets/img/toad.png"><p id="toadHP" style="text-align: center;">180</p></button>'
		}
	},

	yourCharacter: null,
	selectedEnemy: null,
	availableEnemies: ["mario", "luigi", "peach", "toad"],
	enemiesDefeated: [],
	isReady: false,
	
	// Checks if you have selected a character or an enemy and sets the game as ready
	setupGame: function(name) {

		if(this.yourCharacter === null) {
			this.yourCharacter = name;
			console.log(this.yourCharacter);
			this.moveEnemies(name);
		}
		else {
			this.selectedEnemy = name;
			this.moveDefender(name);
			console.log(this.selectedEnemy);
		}

		if(this.yourCharacter != null && this.selectedEnemy != null) {
			this.isReady = true;
		}

		
	},

	// Moves the image buttons when character is selected
	moveEnemies: function(name) {
		$('#first').html('<div></div>');

		$('#yourCharacter').append(this.characters[this.yourCharacter].button);

		this.availableEnemies.splice(this.availableEnemies.indexOf(name), 1);
		console.log(this.availableEnemies);
		for (var i = 0; i < this.availableEnemies.length; i++) {
			console.log(this.availableEnemies[i]);
			$('#enemies').append(this.characters[this.availableEnemies[i]].button);
		}
	},

	moveDefender: function(name) {
		$('#defender').append(this.characters[this.selectedEnemy].button);
	},

	// Plays out an attack when the button is pressed
	attack: function () {
		if(this.isReady) {
			this.characters[this.selectedEnemy].currentHP -= this.characters[this.yourCharacter].attackPower;
			this.characters[this.yourCharacter].attackPower += this.characters[this.yourCharacter].counterAttackPower;
			$(this.characters[this.selectedEnemy].div).html(this.characters[this.selectedEnemy].currentHP);

			if(!(this.characters[this.selectedEnemy].currentHP <= 0)) {
					this.attackEnemy();
			}
			else if(this.characters[this.yourCharacter].currentHP <= 0) {
					this.youLose();
			}
			else {
				this.beatEnemy();
			}
		}	
		
	},

	// If the enemy is still alive, we can attack
	attackEnemy: function () {
		this.characters[this.yourCharacter].currentHP -= this.characters[this.selectedEnemy].counterAttackPower;
		$(this.characters[this.yourCharacter].div).html(this.characters[this.yourCharacter].currentHP);
		console.log(this.characters[this.yourCharacter].attackPower);
		$('#message').html("<p>You attacked " + this.characters[this.selectedEnemy].name + " for " + this.characters[this.yourCharacter].attackPower + " damage.</p><p>" + this.characters[this.selectedEnemy].name + " attacked you back with " + this.characters[this.selectedEnemy].counterAttackPower + " damage.</p>");
		if(this.characters[this.selectedEnemy].currentHP <= 0) {
			isReady = false;
		}
	},

	// If the enemy id defeated this code will execute
	beatEnemy: function() {
		this.enemiesDefeated.push(this.selectedEnemy);
		if(this.enemiesDefeated.length !== 3) {
			$('#restart').show();
			$('#message').html("<p>You have defeated " + this.characters[this.selectedEnemy].name + ". You can choose to fight another defender.</p>");
		}
		else {
			$('#message').html("<p>YOU WON!!! GAME OVER!!</p>");
		}
		
		this.isReady = false;
	},

	// If you lose, this code will execute
	youLose: function () {
			$('#message').html("<p>You have been defeated... GAME OVER!!!</p>");
			this.isReady = false;
			return true;
	},

	// When the restart button is pressed, we reset all of our initial values
	restartGame: function () {

		this.characters.mario.currentHP = this.characters.mario.healthPoints;
		this.characters.luigi.currentHP = this.characters.luigi.healthPoints;
		this.characters.peach.currentHP = this.characters.peach.healthPoints;
		this.characters.toad.currentHP = this.characters.toad.healthPoints;

		$(this.characters.mario.div).html(this.characters.mario.healthPoints);
		$(this.characters.luigi.div).html(this.characters.luigi.healthPoints);
		$(this.characters.peach.div).html(this.characters.peach.healthPoints);
		$(this.characters.toad.div).html(this.characters.toad.healthPoints);
		$('#message').html(" ");

		this.characters[this.yourCharacter].attackPower = this.characters[this.yourCharacter].counterAttackPower;
		this.yourCharacter = null;
		this.selectedEnemy = null;
		this.defeatedEnemies = [];
		this.isReady = false;

		$('#restart').hide();

	}

};


$(document).ready(function() {

	// hides the restart button until the game is over
	$('#restart').hide();

	// character buttons
	$('.img').on('click', function() {
		game.setupGame(this.value);	
 	});

	// attack button
 	$('#attack').on('click', function() {
 		game.attack(game.yourCharacter, game.selectedEnemy);
 	});

 	// restart button
 	$('#restart').on('click', function() {
 		game.restartGame(game.yourCharacter, game.selectedEnemy);
 	});

});








