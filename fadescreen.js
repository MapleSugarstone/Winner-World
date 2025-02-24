class FadeScreen {
    constructor() {
        // Position
        this.layer = 99;
        this.x = 0;
        this.y = 0;
        this.sprite = "./Backgrounds/FadeScreen.png";

        // Animation properties
        this.alpha = 1;
        this.fadeIn = false;
        this.fadeSpeed = 0.05;
    }

    update() {
        // Handle fade in/out animation
        if (this.fadeIn) {
            this.alpha = Math.min(1, this.alpha + this.fadeSpeed);
        } else {
            this.alpha = Math.max(0, this.alpha - this.fadeSpeed);
        }
        if (this.alpha < 0) {
            this.removeFromWorld = true;
        }
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
            ctx.canvas.width,
            ctx.canvas.height
        );

        // Restore context state
        ctx.restore();

        // Draw scene-specific HUD elements

    }

    changeSprite(sprite) {
        this.sprite = sprite;
    }

}