class GameObject {
    constructor(sprite) {
        // Position
        this.x = 0;
        this.y = 0;
        this.sprite = sprite;

        // Animation properties
    }

    update() {
        // Handle fade in/out animation
        if (this.fadeIn) {
            this.alpha = Math.min(1, this.alpha + this.fadeSpeed);
        } else {
            this.alpha = Math.max(0, this.alpha - this.fadeSpeed);
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