class Projectile {

    constructor(x, y, sprite, radius, enemyTeam, damage, pspeed, target, width, height) {
        this.x = x;
        this.y = y;
        this.enemyTeam = enemyTeam;
        this.sprite = sprite;
        this.width = width;
        this.height = height;
        this.damage = damage;
        const deltaX = target.x - this.x;
        const deltaY = target.y - this.y;
        this.angle = Math.atan2(deltaY, deltaX); // angle in radians
        this.velocityX = Math.cos(this.angle) * pspeed;
        this.velocityY = Math.sin(this.angle) * pspeed;
        this.alpha = 1;

        this.alive = true;
        this.radius = radius;

        
    }

    update() {
        this.rotation++;

        if (this.alive) {
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Cleanup targets
        this.enemyTeam = this.enemyTeam.filter(item => item.hp > 0);

        // Find Target
        this.enemyTeam.forEach(unit => {
            if (unit) {
                const distX = this.x - unit.x;
                const distY = this.y - unit.y;
                const distance = Math.sqrt(distX * distX + distY * distY);
                if (distance < this.radius && scene == "loadedDuking") {
                    if (this.ranomdInt(0, 100) > unit.dodgeChance) {
                    unit.hp -= this.damage;
                    unit.damage += this.damage/2;
                    gameEngine.addEntity(new AttackText(unit.x, unit.y+10, "" + -1*this.damage, "black"));
                    } else {
                        gameEngine.addEntity(new AttackText(this.x, this.y+10, "MISS", "red"));
                    }
                    
                    this.alive = false;
                    return;
                } 
            }

        })
    
        } else {
            this.alpha -= 0.05;
            if (this.alpha < 0) {
                this.removeFromWorld = true;
            } 
        }
    }

    draw(ctx) {
        ctx.save();

        // Apply scale transform
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        ctx.translate(centerX, centerY);

        ctx.scale(this.scale, this.scale);
        ctx.rotate(this.rotation);
        ctx.translate(-centerX, -centerY);
        ctx.globalAlpha = this.alpha;

        ctx.drawImage(
            ASSET_MANAGER.getAsset(this.sprite),
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

    ranomdInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }


}