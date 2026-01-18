class Player {
    constructor(game) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./Kirby.png")
        this.animations = {
            "idle": new Animator(this.spritesheet, 7, 10, 22, 20, 1, 0.2, false, false),
            "walk-right": new Animator(this.spritesheet, 253, 10, 22, 20, 10, 0.2, false, true),
            "walk-left": new Animator(this.spritesheet, 253, 10, 22, 20, 10, 0.2, true, true),
            "duck": new Animator(this.spritesheet, 31, 10, 26, 20, 1, 0.2, false, false),
            "jump": new Animator(this.spritesheet, 31, 10, 26, 20, 1, 0.2, false, false)
        };

        this.animator = this.animations["idle"]

        this.x = 500;
        this.y = 500;
        this.speed = 0;
    };

    update() {
        this.x += this.speed * this.game.clockTick;
        if (this.x > 1024) this.x = 0

        const keys = this.game.keys;
        
        if (keys["w"] || keys["ArrowUp"]) this.animator = this.animations["jump"];
        if (keys["s"] || keys["ArrowDown"]) this.animator = this.animations["duck"];
        if (keys["a"] || keys["ArrowLeft"]) this.animator = this.animations["walk-left"];
        if (keys["d"] || keys["ArrowRight"]) this.animator = this.animations["walk-right"];
    };

    draw(ctx) {
        
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    };
}