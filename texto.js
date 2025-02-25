class TextO {
    constructor(text, x, y, font, size, color, layer, alpha, align) {
        // Position
        this.text = text;
        this.font = font;
        this.size = size;
        this.color = color;
        this.layer = layer;
        this.x = x;
        this.y = y;
        this.alpha = alpha;
        this.align = align;

        // Animation properties
    }

    update() {
        // Handle fade in/out animation

    }

    draw(ctx) {

        // Save context state
        ctx.save();

        ctx.globalAlpha = this.alpha;
        ctx.textAlign = this.align;
        ctx.fillStyle = this.color;
        ctx.font = this.size + "px " + this.font;
        ctx.fillText(this.text, this.x, this.y);
        
          
        // Restore
        ctx.restore();
        
    }

}