class GameObject {
    constructor(sprite, x, y, layer, width, height, totalFrames) {
        // Position
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.layer = layer;
        this.width = width;
        this.height = height;

        // Animation properties
        this.animate = new Animator(ASSET_MANAGER.getAsset(sprite), 0, 0, width, height, totalFrames, 0.15);
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

        this.animate.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);

        // Draw background image scaled to canvas size
        /*
        const image = ASSET_MANAGER.getAsset(this.sprite);
        ctx.drawImage(
            image,
            this.x,
            this.y,
            this.width,
            this.height
        );
        */

        // Restore context state
        ctx.restore();

        // Draw scene-specific HUD elements

    }

    changeSprite(sprite) {
        this.sprite = sprite;
    }

}