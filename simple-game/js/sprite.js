(function() {
    'use strict';
    class Sprite {
        constructor(spriteImg, pos, size, speed, framesNum, once) {
            this.spriteImg = spriteImg;
            this.pos = pos;
            this.size = size;
            this.speed = speed || 0;
            this.framesNum = framesNum;
            this.index = 0;
            this.once = once;
        }

        update(dt) {
            this.index += this.speed * dt;
        }

        render(ctx) {
            let steps = 0;

            if (this.speed > 0) {
                let flooredIndex = Math.floor(this.index);
                steps = flooredIndex % this.framesNum;

                if(this.once && flooredIndex >= this.framesNum) {
                    this.done = true;
                    return;
                }
            }


            let x = this.pos[0] + this.size[0] * steps;
            let y = this.pos[1];

            ctx.drawImage(this.spriteImg,
                          x, y,
                          this.size[0], this.size[1],
                          0, 0,
                          this.size[0], this.size[1]);
        }
    }

    window.Sprite = Sprite;    
})();