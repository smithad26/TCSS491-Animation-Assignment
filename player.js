class Player {
    constructor(game) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./Kirby.png")
        this.animations = {
            "idle": new Animator(this.spritesheet, 7, 10, 22, 20, 1, 0.2, false, false),
            "walk-right": new Animator(this.spritesheet, 253, 10, 22, 20, 4, 0.2, false, true),
            "walk-left": new Animator(this.spritesheet, 253, 10, 22, 20, 10, 0.2, false, true),
            "duck": new Animator(this.spritesheet, 31, 10, 26, 20, 1, 0.2, false, false)
        };

        this.animator = this.animations["walk-right"]

        this.x = 0;
        this.y = 0;
        this.speed = 0;
    };

    update() {
        this.x += this.speed * this.game.clockTick;
        if (this.x > 1024) this.x = 0
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    };
}