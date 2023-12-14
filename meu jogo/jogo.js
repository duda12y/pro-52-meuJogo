var playerBlock = {x: 10, y: 10, width: 20, height: 20};
var movingBlocks = [];
var score = 0;

function updateGameArea() {
    clearCanvas();
    score++;
    if (score % 100 == 0) {
        var newBlock = {x: 300, y: Math.random() * 280, width: 20, height: 20};
        movingBlocks.push(newBlock);
    }
    for (var i = 0; i < movingBlocks.length; i++) {
        drawBlock(movingBlocks[i], 'red');
        movingBlocks[i].x -= 2;
        if (collision(playerBlock, movingBlocks[i])) {
            gameOver();
            return;
        }
    }
    drawBlock(playerBlock, 'green');
    drawScore();
    window.requestAnimationFrame(updateGameArea);
}

function drawBlock(block, color) {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(block.x, block.y, block.width, block.height);
}

function clearCanvas() {
    ctx = myGameArea.context;
    ctx.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
}

function collision(block1, block2) {
    return !(block1.y + block1.height < block2.y ||
             block1.y > block2.y + block2.height ||
             block1.x + block1.width < block2.x ||
             block1.x > block2.x + block2.width);
}

function gameOver() {
    ctx = myGameArea.context;
    ctx.font = '30px Arial';
    ctx.fillText('Game Over', 100, 150);
}

function drawScore() {
    ctx = myGameArea.context;
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 10, 20);
}

window.onload = function() {
    myGameArea.start();
    window.requestAnimationFrame(updateGameArea);
}
