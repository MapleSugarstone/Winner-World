const gameEngine = new GameEngine();

let currentMusic = null;
let scene = "MainMenu";
let highscore = 0;
let score = 0;
let rounds = 0;
let mute = false;
interactionDone = false;

const sceneManager = new SceneManager();
//const soundEngine = new SoundEngine();
let blueTeam = [];
let redTeam = [];

const ASSET_MANAGER = new AssetManager();

// Menu Assets
ASSET_MANAGER.queueDownload("./Backgrounds/MainMenu.png");
ASSET_MANAGER.queueDownload("./Backgrounds/BattleBackground.png");
ASSET_MANAGER.queueDownload("./Backgrounds/FadeScreen.png");

// Buttons
ASSET_MANAGER.queueDownload("./UI_Assets/StartButton1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/StartButton2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/Blue1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/Blue2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/Red1.png");
ASSET_MANAGER.queueDownload("./UI_Assets/Red2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/Continue.png");
ASSET_MANAGER.queueDownload("./UI_Assets/Continue2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/Restart.png");
ASSET_MANAGER.queueDownload("./UI_Assets/Restart2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/ContinueMore.png");
ASSET_MANAGER.queueDownload("./UI_Assets/ContinueMore2.png");

ASSET_MANAGER.queueDownload("./UI_Assets/Topbar.png");

ASSET_MANAGER.queueDownload("./UI_Assets/Mute.png");
ASSET_MANAGER.queueDownload("./UI_Assets/Mute2.png");
ASSET_MANAGER.queueDownload("./UI_Assets/NoWon.png");
ASSET_MANAGER.queueDownload("./UI_Assets/BlueWon.png");
ASSET_MANAGER.queueDownload("./UI_Assets/RedWon.png");
ASSET_MANAGER.queueDownload("./UI_Assets/outLost.png");
ASSET_MANAGER.queueDownload("./UI_Assets/outWon.png");
ASSET_MANAGER.queueDownload("./UI_Assets/outDraw.png");

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

// Sounds
ASSET_MANAGER.queueAudioDownload("./Sounds/saladik.mp3");
ASSET_MANAGER.queueAudioDownload("./Sounds/drum.wav");
ASSET_MANAGER.queueAudioDownload("./Sounds/win.wav");
ASSET_MANAGER.queueAudioDownload("./Sounds/lose.wav");

class GameState {
    constructor() {
        this.inGame = false;
        this.paused = false;
        this.gameOver = false;
    }
}

const gameState = new GameState();

document.addEventListener('click', function onClick() {
    if (!interactionDone) {
        // Only run once when the user clicks
        currentMusic = ASSET_MANAGER.getAsset("./Sounds/saladik.mp3");
        currentMusic.preload = 'auto';
        currentMusic.volume = 0.2;
        currentMusic.loop = true;
        
        // Play the music
        currentMusic.play();

        // Mark that the user interaction has occurred
        interactionDone = true;

        // Optionally, if you want the event listener to be removed after the first interaction
        document.removeEventListener('click', onClick);
    }
});
    
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
