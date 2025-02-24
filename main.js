const gameEngine = new GameEngine();
let scene = "MainMenu";

const sceneManager = new SceneManager();
let score = 0;
let blueTeam = [];
let redTeam = [];

const ASSET_MANAGER = new AssetManager();

// Menu Assets
ASSET_MANAGER.queueDownload("./Backgrounds/MainMenu.png");
ASSET_MANAGER.queueDownload("./Backgrounds/BattleBackground.png");
ASSET_MANAGER.queueDownload("./Backgrounds/FadeScreen.png");
ASSET_MANAGER.queueDownload("./UI_Assets/StartButton1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/StartButton2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/Blue1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/Blue2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/Red1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/Red2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/Topbar.png");

// Unit Assets
ASSET_MANAGER.queueDownload("./Units/Unit1r.png");
ASSET_MANAGER.queueDownload("./Units/Unit2r.png");
ASSET_MANAGER.queueDownload("./Units/Unit3r.png");
ASSET_MANAGER.queueDownload("./Units/Unit4r.png");
ASSET_MANAGER.queueDownload("./Units/Projectile1r.png");

ASSET_MANAGER.queueDownload("./Units/Unit1b.png");
ASSET_MANAGER.queueDownload("./Units/Unit2b.png");
ASSET_MANAGER.queueDownload("./Units/Unit3b.png");
ASSET_MANAGER.queueDownload("./Units/Unit4b.png");
ASSET_MANAGER.queueDownload("./Units/Projectile1b.png");

class GameState {
    constructor() {
        this.inGame = false;
        this.paused = false;
        this.gameOver = false;
    }
}

const gameState = new GameState();

ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false; // Disable image smoothing for pixel art

   
    // Add UI elements


    // Initialize game
    gameEngine.init(ctx);
    gameEngine.start();
});

// Add keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        gameState.paused = !gameState.paused;
    }
});

// Prevent right-click context menu
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});