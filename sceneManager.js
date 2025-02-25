const WINS_THRESHOLD = 10;
const STARTING_GOLD = 11;
const STARTING_LIVES = 5;
const BUY_COST = 3;
const UPGRADE_COST = 5;
const ROLL_COST = 1;
const SELL_PRICE = 1;
let tempRedButton = null;
let tempBlueButton = null;
let tempTopBar = null;
class SceneManager {
    constructor() {
        this.voting = null;
        this.result = "draw";
        this.waitTimer = 0;
        this.playerOutcome = null;
        
        
        


        // Game state
       
    }

    

    update() {
        if (scene === "MainMenu") {
            if (score > highscore) {
                highscore = score;
            }
            
            rounds = 0;
            score = 0;
            this.clearEntities();
            gameEngine.addEntity(new GameObject("./Backgrounds/MainMenu.png", 0, 0, 0, 800, 600, 3));
            gameEngine.addEntity(new Button(300, 430, "./UI_Assets/StartButton1.png", 230, 106, "./UI_Assets/StartButton2.png", () => { 
                scene = "Fight";
            }));
            gameEngine.addEntity(new Button(650, 40, "./UI_Assets/Mute.png", 129, 77, "./UI_Assets/Mute2.png", () => {
                if (mute) {
                    currentMusic.volume = 0.2
                } else {
                    currentMusic.volume = 0
                }
            }));
            gameEngine.addEntity(new TextO("Highscore: " + highscore, 400, 200, "calibri", 40, "black", 0, 1, "center"));
            gameEngine.addEntity(new FadeScreen());
            scene = "LoadedMainMenu"

        } else if (scene === "Fight") {
            rounds++;
            this.clearEntities();
            tempTopBar = new TopBar("./UI_Assets/Topbar.png", 800, 95);
            tempRedButton = new Button(50, 430, "./UI_Assets/Red1.png", 289, 131, "./UI_Assets/Red2.png", () => { 
                this.voting = "red";
                scene = "Duking";
            });
            tempBlueButton = new Button(450, 430, "./UI_Assets/Blue1.png", 289, 131, "./UI_Assets/Blue2.png", () => { 
                this.voting = "blue";
                scene = "Duking";
            })
            gameEngine.addEntity(new GameObject("./Backgrounds/BattleBackground.png", 0, 0, 0, 800, 600, 3));
            gameEngine.addEntity(tempTopBar);
            gameEngine.addEntity(tempBlueButton);
            gameEngine.addEntity(tempRedButton);
            gameEngine.addEntity(new FadeScreen());
            this.randomizeTeams();

            scene = "LoadedFight"

        } else if (scene === "Duking") {
            tempBlueButton.removeFromWorld = "true";
            tempRedButton.removeFromWorld = "true";
            tempTopBar.removeFromWorld = "true";
            scene = "loadedDuking";

        } else if (scene === "loadedDuking") {
            [...redTeam, ...blueTeam].forEach(unit => {
                unit.paused = false;
            })
            blueTeam = blueTeam.filter(item => item.hp > 0);
            redTeam = redTeam.filter(item => item.hp > 0);
            if (redTeam.length == 0 && blueTeam.length == 0) {
                this.waitTimer = gameEngine.timestamp/10000 + 0.1;
                scene = "end";
                this.result = "NoWon";
                this.playerOutcome = "Draw";
            } else if (redTeam.length == 0) {
                this.waitTimer = gameEngine.timestamp/10000 + 0.1;
                scene = "end";
                this.result = "BlueWon";
                if (this.voting == "blue") {
                    this.playerOutcome = "Won";
                } else {
                    this.playerOutcome = "Lost";
                }
            } else if (blueTeam.length == 0) {
                this.waitTimer = gameEngine.timestamp/10000 + 0.1;
                scene = "end";
                this.result = "RedWon";
                if (this.voting == "red") {
                    this.playerOutcome = "Won";
                } else {
                    this.playerOutcome = "Lost";
                }
            }
            
        } else if (scene === "end") {
            if (this.waitTimer < (gameEngine.timestamp/10000)) {
                gameEngine.addEntity(new GameObject("./UI_Assets/" + this.result + ".png", 0, 0, 2, 800, 600, 1));
                gameEngine.addEntity(new GameObject("./UI_Assets/out" + this.playerOutcome + ".png", 0, 0, 3, 800, 600, 1));
                if (this.playerOutcome == "Won") {
                    gameEngine.addEntity(new Button(300, 430, "./UI_Assets/Continue.png", 230, 106, "./UI_Assets/Continue2.png", () => { 
                        scene = "Fight";
                        score++;
                    }));
                } else if (this.playerOutcome == "Lost") {
                    gameEngine.addEntity(new Button(300, 430, "./UI_Assets/Restart.png", 230, 106, "./UI_Assets/Restart2.png", () => { 
                        scene = "MainMenu";
                    }));
                } else if (this.playerOutcome == "Draw") {
                    gameEngine.addEntity(new Button(300, 430, "./UI_Assets/ContinueMore.png", 230, 106, "./UI_Assets/ContinueMore2.png", () => { 
                        scene = "Fight";
                        score++;
                    }));                
                }
                scene = "continue?"

            } else if (scene == "LoadedMainMenu") {
                currentMusic.play();
            }

        }


             
    }

    randomizeTeams() {
        blueTeam = [];
        redTeam = [];
        for (let i = 0; i < 2+rounds; i++) {
            const tempUnit = new Unit(this.ranomdInt(50, 300), this.ranomdInt(10, 400), this.ranomdInt(1, 4), "red");
            redTeam.push(tempUnit);
            gameEngine.addEntity(tempUnit);
        }
        for (let i = 0; i < 2+rounds; i++) {
            const tempUnit = new Unit(this.ranomdInt(500, 750), this.ranomdInt(10, 400), this.ranomdInt(1, 4), "blue");
            blueTeam.push(tempUnit);
            gameEngine.addEntity(tempUnit);
        }
            
    }


    clearEntities() {
        gameEngine.entities = [];
    }

    ranomdInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }


}

    
