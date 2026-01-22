class Player {
    constructor(game) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./Kirby2.png")
        this.animations = {
            "idle": new Animator(this.spritesheet, 7, 10, 22, 20, 1, 0.2, false, false),
            "walk-right": new Animator(this.spritesheet, 253, 10, 22, 20, 10, 0.2, false, true),
            "walk-left": new Animator(this.spritesheet, 253, 10, 22, 20, 10, 0.2, false, true),
            "duck": new Animator(this.spritesheet, 31, 10, 26, 20, 1, 0.2, false, false),
            "jump": new Animator(this.spritesheet, 31, 10, 26, 20, 1, 0.2, false, false)
        };

        this.x = 500;
        this.y = 500;
        this.speed = 0;
        this.jump = 0;
    };

    update() {
        this.x += this.speed * this.game.clockTick;
        if (this.x > 1024) this.x = 0;

        this.y += this.jump * this.game.clockTick;
        const keys = this.game.keys;
        
        this.animator = this.animations["idle"];
        this.speed = 0;
        this.jump = 0;

        if (keys["w"] || keys["ArrowUp"]) {
            this.animator = this.animations["jump"]; 
            this.jump = -100;
        }
        if (keys["s"] || keys["ArrowDown"]) this.animator = this.animations["duck"]; 
        if (keys["a"] || keys["ArrowLeft"]) {
            this.animator = this.animations["walk-left"];
            this.speed = -100;
        } 
        if (keys["d"] || keys["ArrowRight"]) {
            this.animator = this.animations["walk-right"];
            this.speed = 100;
        }
    }

    draw(ctx) {
        if (this.animator == this.animations["walk-left"]) {
            ctx.save();
            ctx.scale(-1, 1);
            this.animator.drawFrame(this.game.clockTick, ctx, -(this.x) - 22, this.y);
            ctx.restore();
        } else {
            this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
    };
}