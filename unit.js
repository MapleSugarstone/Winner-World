class Unit {
    constructor(x, y, job, team) {
        // Position
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.velocityY = 0;
        this.velocityX = 0;
        this.ATKCD = 0;
        this.trueDirection = 0;
        this.width = 128;
        this.height = 128;
        this.alpha = 1;
        this.paused = true;
        this.aiType = "Normal";
        
        if (team == "blue") {
            this.teamC = "b";
            this.direction = 270;
            this.enemyTeam = redTeam;
            this.allyTeam = blueTeam;
        } else {
            this.teamC = "r";
            this.direction = 90;
            this.enemyTeam = blueTeam;
            this.allyTeam = redTeam;
        }
        this.getUnitInfo(job);
        this.maxHP = this.hp;
        this.currentTarget = null;
        this.currentState = "searching";
        this.animator = new UnitAnimator(this);


        // Animation properties
    }

    update() {
        if (this.hp > 0) {
            this.collide();
            if (!this.paused) {
                this.ATKCD--;
                this.determineState();
                this.action();
            }
        } else {
            this.alpha -= 0.05;
            this.allyTeam = this.allyTeam.filter(item => item !== this);
            if (this.alpha < 0) {
                this.removeFromWorld = true;
        }
    }


    }

    draw(ctx) {
        // Get current animation state (position, rotation, scale)
        let animState = this.animator.getDrawPosition();

        // Save context state
        ctx.save();
        
        // Set transparency
        ctx.globalAlpha = this.alpha;

        const image = ASSET_MANAGER.getAsset(this.sprite);

         
        // Calculate center point for transformations
        const centerX = this.x + this.width/2;
        const centerY = this.y + this.height/2;
        
        // Apply transformations around center point
        ctx.translate(centerX, centerY);
        ctx.rotate(animState.rotation * Math.PI/180);
        ctx.scale(animState.scale, animState.scale);


        
        // Flip sprite if facing left
        if (this.direction > 180) {
            ctx.scale(-1, 1);
            ctx.translate(this.width, 0);

        }
        
        // Move back to top-left for drawing
        //ctx.translate(0, 10);
        ctx.translate(-this.width, -this.height);

        ctx.drawImage(
            image,
            0,
            0,
            this.width,
            this.height
        );
        
        // Restore context state
        ctx.restore();
        
        //ctx.translate(centerX, centerY);
        const hr = this.hp > 0 ? this.hp / this.maxHP : 0;


        ctx.fillStyle = "black"
        ctx.beginPath();
        ctx.roundRect(this.x-16, this.y + 45, 30, 5, 30);
        ctx.fill();

        ctx.fillStyle = hr > 0.7 ? "green" : hr > 0.4 ? "orange" : "red";
        ctx.beginPath();
        ctx.roundRect(this.x-16, this.y + 45, 30 * hr, 5, 30);
        ctx.fill();

        /*
        ctx.fillStyle = "black"
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, 5, 5, 5);
        ctx.fill();
        */
        //ctx.restore();
        

    }

    changeSprite(sprite) {
        this.sprite = sprite;
    }

    getUnitInfo(job) {
        this.sprite = "./Units/Unit" + job + this.teamC + ".png";
        if (job == 1) {
            
            this.hp = 100;
            this.lowDamage = 35;
            this.highDamage = 45;
            this.lowATKCD = 30;
            this.highATKCD = 40;
            this.dodgeChance = 25;
            this.attackRange = 65;
            this.movementSpeed = 5;
            this.attackType = "melee";


        } else if (job == 2) {
            this.hp = 170;
            this.lowDamage = 20;
            this.highDamage = 40;
            this.lowATKCD = 20;
            this.highATKCD = 40;
            this.dodgeChance = 0;
            this.attackRange = 65;
            this.movementSpeed = 2;
            this.attackType = "melee";

        } else if (job == 3) {
            this.hp = 60;
            this.lowDamage = 10;
            this.highDamage = 60;
            this.lowATKCD = 10;
            this.highATKCD = 40;
            this.dodgeChance = 50;
            this.attackRange = 40;
            this.movementSpeed = 8;
            this.attackType = "melee";


        } else if (job == 4) {
            this.hp = 75
            this.lowDamage = 10;
            this.highDamage = 60;
            this.lowATKCD = 30;
            this.highATKCD = 50;
            this.dodgeChance = 10;
            this.attackRange = 180;
            this.movementSpeed = 1;
            this.attackType = "ranged";
            this.projectileSpeed = 10;
            this.projectileSprite = "./Units/Projectile1" + this.teamC + ".png";
            this.radius = 32;
            this.pw = 31;
            this.ph = 32;
            this.aiType = "StayAway";


        }

    }

    angle(x, y, x2, y2) {
        return 
    }

    collide() {
        const otherUnits = [...redTeam, ...blueTeam].filter(item => item !== this);
        otherUnits.forEach(unit => {
            if (unit) {
                const distX = this.x - unit.x;
                const distY = this.y - unit.y;
                const distance = Math.sqrt(distX * distX + distY * distY);

                // If distance is very small (close), apply repulsion
                if (distance < 35) {
                // Calculate the repulsive force using an inverse-square law (diminishing returns)
                const force = (35 - distance) / 15;  // Force strength, decreases with distance

                // Normalize the direction of the repulsive force
                const normX = distX / distance;
                const normY = distY / distance;

                // Apply the repulsion force (we multiply the normalized direction by force)
                this.dx += normX * force;
                this.dy += normY * force;
                }
            }
        })

        if (this.dy > 10) {
            this.dy = 10;
        }
        if (this.dy < -10) {
            this.dy = -10;
        }

        if (this.dx > 10) {
            this.dx = 10;
        }
        if (this.dx < -10) {
            this.dx = -10;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.dy /= 1.2;
        this.dx /= 1.2;
        if (this.x > 775) {
            this.x = 775;
        }
        if (this.x < 25) {
            this.x = 25;
        }
        if (this.y < 50) {
            this.y = 50;
        }
        if (this.y > 550) {
            this.y = 550;
        }
    }

    action() {
        if (this.currentState == "searching") {

            // Cleanup targets
            this.enemyTeam = this.enemyTeam.filter(item => item.hp > 0);
            if (this.enemyTeam.length == 0) {
                
                this.currentState = "none"
                this.paused = true;
                this.velocityX = 0;
                this.velocityY = 0;
                return;
            }

            // Find Target
            let minDistance = 99999;
            this.enemyTeam.forEach(unit => {
                if (unit) {
                    const distX = this.x - unit.x;
                    const distY = this.y - unit.y;
                    const distance = Math.sqrt(distX * distX + distY * distY);
    
                    
                    if (distance < minDistance) {
                        minDistance = distance;
                        this.currentTarget = unit;
                    } 
                }
                
            })

            const deltaX = this.currentTarget.x - this.x;
            const deltaY = this.currentTarget.y - this.y;

            // Calculate the distance between the two units
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            const angle = Math.atan2(deltaY, deltaX); // angle in radians
            this.trueDirection = angle;
            
            let angleInDegrees = (angle * 180 / Math.PI) + 90;

            // Ensure the angle is within the 0-360 range
            if (angleInDegrees < 0) {
                angleInDegrees += 360;
            } else if (angleInDegrees >= 360) {
                angleInDegrees -= 360;
            }
            this.direction = angleInDegrees;
            
            // Set the velocity based on the speed and angle using trigonometry
            // Don't keep moving if within attack range
            if (distance > this.attackRange-5) {
                this.velocityX = Math.cos(angle) * this.movementSpeed;
                this.velocityY = Math.sin(angle) * this.movementSpeed;
            } else {
                this.velocityX /= 1.4;
                this.velocityY /= 1.4;
            }

            if (distance < this.attackRange) {
                if (this.ATKCD < 0) {
                    const DMG = this.ranomdInt(this.lowDamage, this.highDamage);
                    
                        if (this.attackType == "ranged") {

                            let displacement = 0;
                            if (this.direction > 180) {
                                displacement = -50;
                            } else {
                                displacement = 50;
                            }

                            gameEngine.addEntity(new Projectile(this.x+displacement, this.y-20, this.projectileSprite, this.radius,
                                                this.enemyTeam, DMG, this.projectileSpeed, this.currentTarget, this.pw, this.ph));
                        } else {
                            if (this.ranomdInt(0, 100) > this.currentTarget.dodgeChance) {
                                this.currentTarget.hp -= DMG;
                                gameEngine.addEntity(new AttackText(this.currentTarget.x, this.currentTarget.y+10, "" + -1*DMG, "black"));
                            } else {
                                gameEngine.addEntity(new AttackText(this.x, this.y+10, "MISS", "red"));
                            }
                        }
                    this.ATKCD = this.ranomdInt(this.lowATKCD, this.highATKCD);
                    }
                }
            }
    }


    determineState() {
        return;
    }

    ranomdInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }


}