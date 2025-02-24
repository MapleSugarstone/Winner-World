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
        
        
        


        // Game state
       
    }

    update() {
        if (scene === "MainMenu") {
            score = 0;
            this.clearEntities();
            gameEngine.addEntity(new GameObject("./Backgrounds/MainMenu.png"));
            gameEngine.addEntity(new Button(300, 430, "./UI_Assets/StartButton1.png", 230, 106, "./UI_Assets/StartButton2.png", () => { 
                scene = "Fight";
            }));
            gameEngine.addEntity(new FadeScreen());
            scene = "LoadedMainMenu"

        } else if (scene === "Fight") {
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
            gameEngine.addEntity(new GameObject("./Backgrounds/BattleBackground.png"));
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
        }


             
    }

    randomizeTeams() {
        for (let i = 0; i < 5; i++) {
            const tempUnit = new Unit(this.ranomdInt(50, 300), this.ranomdInt(10, 240), this.ranomdInt(1, 3), "red");
            redTeam.push(tempUnit);
            gameEngine.addEntity(tempUnit);
        }
        for (let i = 0; i < 5; i++) {
            const tempUnit = new Unit(this.ranomdInt(500, 750), this.ranomdInt(10, 240), this.ranomdInt(1, 3), "blue");
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

    
