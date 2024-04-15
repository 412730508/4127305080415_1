let bg = ["#FAEBCD"];
let c = ["#E06A4E", "#DEB853", "#789F8A", "#5A3D2B"];

let patterns = [];
let cols = 6;
let rows = 6;
let cellW, cellH;
let n = 72;

class Pattern {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.originalX = x;
    this.originalY = y;
    this.speedX = 3; // X 方向的移動速度
    this.speedY = 0; // Y 方向的移動速度
    this.gravity = 0.1; // 重力加速度
    this.bounce = 0.8; // 反彈係數
  }

  draw() {
    fill(random(c));
    for (let r = 0; r < 360; r += n) {
      let d = cellW / random(8, 12);
      push();
      translate(this.x + cellW / 2, this.y + cellH / 2);
      rotate(this.rotation + r);
      noStroke();
      circle(-d * 1.5, -d * 1.5, d * 3);
      circle(-d * 5, -d * 5, d * 1.5);
      stroke("#5A3D2B");
      strokeWeight(2);
      drawingContext.setLineDash([3, 6]);
      beginShape();
      vertex(0, 0);
      vertex(-d, -d);
      line(0, 0, -d, -d * 2);
      line(0, 0, -d * 2, -d);
      line(0, 0, -d * 5, -d * 5);
      endShape();
      pop();
    }
  }

  update() {
    // 模擬重力影響，增加垂直速度
    this.speedY += this.gravity;
    // 更新圖案位置
    this.x += this.speedX;
    this.y += this.speedY;

    // 如果圖案碰到畫布左右邊界，反彈
    if (this.x + cellW / 2 > width || this.x - cellW / 2 < 0) {
      this.speedX *= -this.bounce; // 反彈
    }

    // 如果圖案碰到畫布底部，反彈並減少速度
    if (this.y + cellH / 2 > height) {
      this.speedY *= -this.bounce; // 反彈
      this.y = height - cellH / 2; // 將圖案放置在畫布底部
    }
  }

  resetPosition() {
    // 將位置重設為原始位置
    this.x = this.originalX;
    this.y = this.originalY;
    this.speedY = 0; // 重設垂直速度
  }
}

function setup() {
  createCanvas(390, 390);
  angleMode(DEGREES);
  background(bg);
  cellW = width / cols;
  cellH = height / rows;

  // 創建多個 Pattern 物件並將其存儲在 patterns 陣列中
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      patterns.push(new Pattern(i * cellW, j * cellH));
    }
  }
}

function draw() {
  background(bg);
  
  // 更新並繪製每個 Pattern 物件
  for (let pattern of patterns) {
    pattern.update();
    pattern.draw();
  }
}

function mouseClicked() {
  // 當點擊時，將所有圖案的位置重設為原始位置
  for (let pattern of patterns) {
    pattern.resetPosition();
  }
}
