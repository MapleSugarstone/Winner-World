class Button {
    constructor(x, y, sprite, width, height, hoversprite, method) {
        this.layer = 1;
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.width = width;
        this.height = height;
        this.hoversprite = hoversprite;
        this.truesprite = sprite;
        this.method = method;

        // Visual state
        this.hovering = false;
        this.clicking = false;
        this.scale = 1;
        this.baseY = y;
        
        // Animation properties
        this.hoverScale = 1.05;
        this.clickScale = 0.95;
        this.scaleSpeed = 0.1;
        this.bobAmount = 3;
        this.bobSpeed = 0.003;
        
        // Particle effects
    }

    update() {
        // Check mouse interaction
        this.hovering = this.checkOverlap(gameEngine.mouse?.x, gameEngine.mouse?.y);
        this.truesprite = this.hovering ? this.hoversprite : this.sprite;

        // Handle click
        if (this.checkOverlap(gameEngine.click?.x, gameEngine.click?.y) && gameEngine.clickProcessed && this.hovering) {
            gameEngine.clickProcessed = false;
            this.clicking = true;
            this.method();
            
            // Add click particles

            
            // Reset clicking state after animation
            setTimeout(() => this.clicking = false, 100);
        }

    }

    draw(ctx) {
        ctx.save();

        // Apply scale transform
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        ctx.translate(centerX, centerY);
        ctx.scale(this.scale, this.scale);
        ctx.translate(-centerX, -centerY);

        // Draw the button
        ctx.drawImage(
            ASSET_MANAGER.getAsset(this.truesprite),
            this.x,
            this.y,
            this.width,
            this.height
        );


        ctx.restore();
    }

    checkOverlap(x, y) {
        if (!x || !y) return false;
        
        const scaledWidth = this.width * this.scale;
        const scaledHeight = this.height * this.scale;
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        
        return x >= centerX - scaledWidth/2 && 
               x <= centerX + scaledWidth/2 && 
               y >= centerY - scaledHeight/2 && 
               y <= centerY + scaledHeight/2;
    }


}