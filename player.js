class Player {
    constructor(game) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./Kirby2.png")
        this.animations = {
            "idle": new Animator(this.spritesheet, 7, 10, 22, 20, 1, 0.2, false, false),
            "walk-right": new Animator(this.spritesheet, 253, 10, 22, 20, 10, 0.1, false, true),
            "walk-left": new Animator(this.spritesheet, 253, 10, 22, 20, 10, 0.1, false, true),
            "duck": new Animator(this.spritesheet, 31, 10, 26, 20, 1, 0.2, false, false),
            "jump-right": new Animator(this.spritesheet, 720, 8, 21, 21, 1, 0.2, false, false),
            "jump-left": new Animator(this.spritesheet, 720, 8, 21, 21, 1, 0.2, false, false)
        };

        this.x = 500;
        this.y = 500;
        this.speed = 0;
        this.jump = 0;

        this.velocity = { x : 0, y : 0};
        this.fallAcc = 562.5;
    };

    update() {
        // this.x += this.speed * this.game.clockTick;
        // if (this.x > 1024) this.x = 0;

        // this.y += this.jump * this.game.clockTick;
        // const keys = this.game.keys;
        
        // this.animator = this.animations["idle"];
        // this.speed = 0;
        // this.jump = 0;

        // if (keys["w"] || keys["ArrowUp"]) {
        //     this.animator = this.animations["jump"]; 
        //     this.jump = -100;
        // }
        // if (keys["s"] || keys["ArrowDown"]) this.animator = this.animations["duck"]; 
        // if (keys["a"] || keys["ArrowLeft"]) {
        //     this.animator = this.animations["walk-left"];
        //     this.speed = -100;
        // } 
        // if (keys["d"] || keys["ArrowRight"]) {
        //     this.animator = this.animations["walk-right"];
        //     this.speed = 100;
        // }
        const TICK = this.game.clockTick;
        const keys = this.game.keys;

        // --- Horizontal movement ---
        this.speed = 0;
        if (keys["a"] || keys["ArrowLeft"]) {
            this.speed = -250;
            this.animator = this.animations["walk-left"];
        } else if (keys["d"] || keys["ArrowRight"]) {
            this.speed = 250;
            this.animator = this.animations["walk-right"];
        } else {
            this.animator = this.animations["idle"];
        }

        this.x += this.speed * TICK;
        if (this.x > 1024) this.x = 0;
        if (this.x < 0) this.x = 1024;

        // --- Ground check ---
        const groundY = 500;
        const onGround = this.y >= groundY;

        // --- Jump input ---
        if ((keys["w"] || keys["ArrowUp"]) && onGround) {
            this.velocity.y = -500; // jump impulse
        }

        // --- Gravity ---
        this.velocity.y += this.fallAcc * TICK;
        this.y += this.velocity.y * TICK;

        // --- Ground collision ---
        if (this.y > groundY) {
            this.y = groundY;
            this.velocity.y = 0;
        }

        // --- Jump animation ---
        if (!onGround) {
            if (keys["a"] || keys["ArrowLeft"]) {
                this.animator = this.animations["jump-left"];
            } else {
                this.animator = this.animations["jump-right"];
            }
        }

        // --- Duck ---
        if (keys["s"] || keys["ArrowDown"]) {
            this.animator = this.animations["duck"];
        }
    }

    draw(ctx) {
        if (this.animator == this.animations["walk-left"]) {
            ctx.save();
            ctx.scale(-1, 1);
            this.animator.drawFrame(this.game.clockTick, ctx, -(this.x) - 100, this.y);
            ctx.restore();
        } else if (this.animator == this.animations["jump-left"]) {
            ctx.save();
            ctx.scale(-1, 1);
            this.animator.drawFrame(this.game.clockTick, ctx, -(this.x) - 100, this.y);
            ctx.restore();
        } else {
            this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
    };
}