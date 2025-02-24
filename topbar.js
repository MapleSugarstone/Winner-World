class TopBar {
    constructor(sprite, width, height) {
        // Position
        this.layer = 1;
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.alpha = .7;

        // Animation properties
    }

    update() {
        // Handle fade in/out animation

    }

    draw(ctx) {
        // Save context state
        ctx.save();
        
        // Set transparency
        ctx.globalAlpha = this.alpha;

        // Draw background image scaled to canvas size
        const image = ASSET_MANAGER.getAsset(this.sprite);
        ctx.drawImage(
            image,
            this.x,
            this.y,
            this.width,
            this.height
        );
        ctx.globalAlpha = 1;
        ctx.font = "50px calibri";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText("Vote which team you think will win!", this.x + this.width/2, this.y + this.height - 50);
        ctx.font = "40px calibri";
        ctx.fillText("Score: " + score, this.x + this.width/2, this.y + this.height-10);

        // Restore context state
        ctx.restore();

        // Draw scene-specific HUD elements

    }

    changeSprite(sprite) {
        this.sprite = sprite;
    }

}