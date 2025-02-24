class AttackText {
    constructor(x, y, text, color) {
        // Position
        this.layer = 1;
        this.x = x;
        this.y = y;
        this.text = text;
        this.alpha = .7;
        this.color = color;

        // Animation properties
    }

    update() {
        this.y -= 1;
        this.alpha -= 0.04;
        if (this.alpha < 0) {
            this.removeFromWorld = true;
        }
    }

    draw(ctx) {
        // Save context state
        ctx.save();
        
        // Set transparency
        ctx.globalAlpha = this.alpha;

        ctx.font = "30px calibri";
        ctx.textAlign = "center";
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);


        // Restore context state
        ctx.restore();

        // Draw scene-specific HUD elements

    }


}