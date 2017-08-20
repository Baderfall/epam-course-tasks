(function() {
    'use strict';
    const body = document.body;
    const canvas = document.createElement('canvas');
    canvas.width = body.clientWidth;
    canvas.height = body.clientHeight - 5;
    const context = canvas.getContext('2d');
    context.fillStyle = "rgba(0, 0, 0, 0)";
    document.body.appendChild(canvas);

    const spriteMap = new Image();
    spriteMap.src = 'img/sprite-map.png';
    
    const player = {
        pos: [0, 0],
        sprite: new Sprite(spriteMap, [0, 0], [135, 135], 16, 4),
        cutForCollision: [5, 40, 5, 25] // cut all whitespaces from sprite image in order [left, top, right, bottom], used in checkCollisions()
    };

    let enemies = [];
    let coins = [];
    let hearts = [];
    let poofs = [];
    let gameTime;
    let lastTime;
    let isGameOver;
    const pressedKeys = new Set();
    
    const scoreEl = document.querySelector('#score');
    let score;
    const livesEl = document.querySelector('#lives');
    let lives;
    
    // all game params
    const playerSpeed = 400;
    const enemySpeed = 400;
    const coinSpeed = 50;
    const heartSpeed = 50;
    const enemyGenerationChance = () => Math.random() * 200 < Math.sqrt(gameTime);
    const coinGenerationChance = () => Math.random() > 0.997;
    const heartGenerationChance = () => Math.random() > 0.999;

    document.addEventListener('keydown', function(event) {
        pressedKeys.add(event.keyCode);
    });

    document.addEventListener('keyup', function(event) {
        pressedKeys.delete(event.keyCode);
    });

    spriteMap.onload = function() {
        document.addEventListener('keypress', startOnEnter);
    };

    function startOnEnter() {
        if (pressedKeys.has(13)) {
            reset();
            lastTime = Date.now();
            mainLoop();
        }
    }
    
    function reset() {
        document.removeEventListener('keypress', startOnEnter);
        document.querySelector('#game-msg').style.display = 'none';

        isGameOver = false;
        score = 0;
        lives = 3;
        gameTime = 0;
        enemies = [];
        coins = [];
        hearts = [];
        poofs = [];

        player.pos = [50, canvas.height / 2 - player.sprite.size[1] / 2];
    }
    
    function mainLoop() {
        let now = Date.now();
        let dt = (now - lastTime) / 1000;
        update(dt);
        render();

        lastTime = now;
        window.requestAnimationFrame(mainLoop);
    }
    
    function update(dt) {
        gameTime += dt;

        handleInput(dt);
        updateEntities(dt);

        if (!isGameOver) {
            addNewItems();
        }

        checkCollisions();
    }
    
    function handleInput(dt) {
        if(pressedKeys.has(40) || pressedKeys.has(83)) {
            player.pos[1] += playerSpeed * dt;
        }

        if(pressedKeys.has(38) || pressedKeys.has(87)) {
            player.pos[1] -= playerSpeed * dt;
        }

        if(pressedKeys.has(37) || pressedKeys.has(65)) {
            player.pos[0] -= playerSpeed * dt;
        }

        if(pressedKeys.has(39) || pressedKeys.has(68)) {
            player.pos[0] += playerSpeed * dt;
        }
    }
    
    function updateEntities(dt) {
        player.sprite.update(dt);

        for(let i = 0; i < enemies.length; i++) {
            enemies[i].pos[0] -= Math.cos(enemies[i].angle) * enemySpeed * dt;
            enemies[i].pos[1] -= Math.sin(enemies[i].angle) * enemySpeed * dt;
            enemies[i].sprite.update(dt);

            if(enemies[i].pos[0] + enemies[i].sprite.size[0] < 0) {
                enemies.splice(i, 1);
                i--;
            }
        }

        for(let i = 0; i < coins.length; i++) {
            coins[i].pos[0] -= coinSpeed * dt;
            coins[i].sprite.update(dt);

            if(coins[i].pos[0] + coins[i].sprite.size[0] < 0) {
                coins.splice(i, 1);
                i--;
            }
        }

        for(let i = 0; i < hearts.length; i++) {
            hearts[i].pos[0] -= heartSpeed * dt;
            hearts[i].sprite.update(dt);

            if(hearts[i].pos[0] + hearts[i].sprite.size[0] < 0) {
                hearts.splice(i, 1);
                i--;
            }
        }

        for(let i = 0; i < poofs.length; i++) {
            poofs[i].sprite.update(dt);

            if(poofs[i].sprite.done) {
                poofs.splice(i, 1);
                i--;
            }
        }
    }

    function addNewItems() {
        if(enemyGenerationChance()) {
            let playerCenterPosition;
            let distanceToPlayerX;
            let distanceToPlayerY;
            
            const enemy = {
                pos: [canvas.width, Math.random() * (canvas.height)],
                sprite: new Sprite(spriteMap, [0, 135], [50, 50]),
                cutForCollision: [4, 11, 10, 5]
            };

            playerCenterPosition = [player.pos[0] + player.sprite.size[0] / 2,
            player.pos[1] + player.sprite.size[1] / 2];
            distanceToPlayerX = enemy.pos[0] - playerCenterPosition[0];
            distanceToPlayerY = enemy.pos[1] - playerCenterPosition[1];
            
            enemy.angle = Math.atan2(distanceToPlayerY, distanceToPlayerX);
            
            enemies.push(enemy);
        }

        if(coinGenerationChance()) {
            coins.push({
                pos: [canvas.width, Math.random() * (canvas.height - 40)],
                sprite: new Sprite(spriteMap, [0, 185], [44, 40], 16, 10),
                cutForCollision: [4, 5, 4, 5]
            });
        }

        if(heartGenerationChance()) {
            hearts.push({
                pos: [canvas.width, Math.random() * (canvas.height - 40)],
                sprite: new Sprite(spriteMap, [0, 225], [40, 40]),
                cutForCollision: [5, 5, 5, 7]
            });
        }
    }
    
    function checkCollisions() {
        checkPlayerBounds();

        for (let i = 0; i < enemies.length; i++) {
            if (objectsCollision(enemies[i], player)) {
                poofs.push({
                    pos: [enemies[i].pos[0] - enemies[i].sprite.size[0], enemies[i].pos[1]],
                    sprite: new Sprite(spriteMap, [0, 265], [80, 80], 16, 5, true)
                });
                getDamage();
                enemies.splice(i, 1);
                i--;
            }
        }

        for (let i = 0; i < coins.length; i++) {
            if (objectsCollision(coins[i], player)) {
                coins.splice(i, 1);
                i--;
                score++;
            }
        }

        for (let i = 0; i < hearts.length; i++) {
            if (objectsCollision(hearts[i], player)) {
                hearts.splice(i, 1);
                i--;
                lives++;
            }
        }
    }
    
    function objectsCollision(obj1, obj2) {
        return collides(obj1.pos[0] + obj1.cutForCollision[0],
                        obj1.pos[1] + obj1.cutForCollision[1],
                        obj1.pos[0] + obj1.sprite.size[0] - obj1.cutForCollision[2],
                        obj1.pos[1] + obj1.sprite.size[1] - obj1.cutForCollision[3],
                        obj2.pos[0] + obj2.cutForCollision[0],
                        obj2.pos[1] + obj2.cutForCollision[1],
                        obj2.pos[0] + obj2.sprite.size[0] - obj2.cutForCollision[2],
                        obj2.pos[1] + obj2.sprite.size[1] - obj2.cutForCollision[3]);
    }
    
    function collides(x, y, r, b, x2, y2, r2, b2) {
        return !(r <= x2 || x > r2 || b <= y2 || y > b2);
    }
    
    function checkPlayerBounds() {
        if (player.pos[0] < 0) {
            player.pos[0] = 0;
        }
        else if(player.pos[0] > canvas.width - player.sprite.size[0]) {
            player.pos[0] = canvas.width - player.sprite.size[0];
        }

        if(player.pos[1] < 0) {
            player.pos[1] = 0;
        }
        else if(player.pos[1] > canvas.height - player.sprite.size[1]) {
            player.pos[1] = canvas.height - player.sprite.size[1];
        }
    }
    
    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillRect(0, 0, canvas.width, canvas.height);

        if (!isGameOver) {
            renderEntity(player);
        }

        renderEntities(enemies);
        renderEntities(coins);
        renderEntities(hearts);
        renderEntities(poofs);

        scoreEl.textContent = score;
        livesEl.textContent = lives;
    }
    
    function renderEntities(arr) {
        for (let i = 0; i < arr.length; i++) {
            renderEntity(arr[i]);
        }
    }
    
    function renderEntity(entity) {
        context.save();
        context.translate(entity.pos[0], entity.pos[1]);
        entity.sprite.render(context);
        context.restore();
    }
    
    function getDamage() {
        lives--;
        if (lives <= 0) {
            gameOver();
            lives = 0; // shouldn't be negative
        }
    }
    
    function gameOver() {
        isGameOver = true;
        let finalScore = score;

        document.querySelector('#game-msg').style.display = 'block';
        document.querySelector('#game-msg h1').textContent = 'GAME OVER';
        document.querySelector('#game-msg h2').textContent = `Your score: ${finalScore}`;
        document.querySelector('#game-msg p').textContent = 'press enter to play again...';
        document.addEventListener('keypress', startOnEnter);
    }
})();