<script lang="ts" >
export default {
  alanComponentName: "YuanWar",
};
</script>
<script setup name="YuanWar" lang="ts" >
import { onMounted } from 'vue';
const props = defineProps({
	width: {
		type: Number,
		default: () => 800,
	},
	height: {
		type: Number,
		default: () => 800,
	},
});

onMounted(() => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  const WIDTH = props.width;
  const HEIGHT = props.height;
  canvas.height = HEIGHT;
  canvas.width = WIDTH;
  interface Circle {
    x: number;
    y: number;
    radius: number;
  }
  const intersectionDetection = (circle: Circle, anotherCircle: Circle) => {
    const distance = Math.sqrt(Math.pow(circle.x - anotherCircle.x, 2) + Math.pow(circle.y - anotherCircle.y, 2));
    return distance < circle.radius + anotherCircle.radius;
  };

  function drawCircle(cx: number, cy: number, radius: number, color: string, shadow?: boolean) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.shadowColor = shadow ? color : '';
    ctx.shadowBlur = shadow ? radius : 0;
    ctx.fillStyle = color;
    ctx.fill();
  }

  class King {
    hp: number;
    x: number;
    y: number;
    color: string;
    constructor() {
      this.hp = 100;
      this.x = 200;
      this.y = 200;
      this.color = 'purple';
    }
    draw() {
      drawCircle(this.x, this.y, 16, this.color, true);
    }
  }

  class Bullet {
    damage: number;
    x: number;
    y: number;
    speed: number;
    state: number;
    color: string;
    angle: number;
    radius: number;
    constructor(angle: number) {
      this.angle = angle;
      this.damage = 3;
      this.x = 200;
      this.y = 200;
      this.speed = 4;
      this.state = 1;
      this.color = 'yellow';
      this.radius = 4;
    }
    move() {
      this.x += Math.cos((this.angle * Math.PI) / 180) * this.speed;
      this.y += Math.sin((this.angle * Math.PI) / 180) * this.speed;
    }
    draw() {
      if (!this.state) return;
      drawCircle(this.x, this.y, this.radius, this.color, true);
    }
    intersectionDetection(enemies: Enemy[]) {
      const intersectionEnemy = enemies.find(enemy => {
        return enemy.state && intersectionDetection(enemy, this);
      });
      if (intersectionEnemy) {
        this.state = 0;
        intersectionEnemy.hurt(this);
      }
    }
  }

  class Enemy {
    x: number;
    y: number;
    speed: number;
    color: string;
    state: number;
    radius: number;
    hp: number;
    constructor() {
      this.x = -10;
      this.y = 200;
      this.speed = 0.2;
      this.color = 'red';
      this.state = 1;
      this.radius = 6;
      this.hp = 3;
    }
    draw() {
      if (!this.state) return;
      drawCircle(this.x, this.y, this.radius, this.color, true);
    }
    move() {
      this.x += this.speed;
    }
    hurt(bullet: Bullet) {
      this.hp -= bullet.damage;
      if (this.hp <= 0) {
        this.state = 0;
      }
    }
  }
  const computeAngle = (x: number, y: number) => {
    const distance = Math.sqrt(x * x + y * y);
    const angle = (Math.asin(y / distance) * 180) / Math.PI;
    return +(x > 0 ? angle : 180 - angle).toFixed(2);
  };
  class Mouse {
    angle: number;
    x: number;
    y: number;
    moveHandler: (e: MouseEvent) => void;
    constructor() {
      this.angle = 0;
      this.x = 0;
      this.y = 0;
      this.moveHandler = this._moveHandler.bind(this);
    }
    _moveHandler(e: MouseEvent) {
      const clientRect = canvas.getClientRects()[0];
      const x = e.pageX - clientRect?.x;
      const y = e.pageY - clientRect?.y;
      this.x = x;
      this.y = y;
      this.angle = computeAngle(x - 200, y - 200);
    }
    on() {
      document.addEventListener('mousemove', this.moveHandler);
    }
    off() {
      document.removeEventListener('mousemove', this.moveHandler);
    }
  }
  const BULLET_CD = 30;
  const ENEMY_CD = 300;
  const game = {
    bulletCD: 0,
    enemyCD: 0,
    start() {
      this.king = new King();
      this.enemies = [];
      this.bullets = [];
      this.mouse = new Mouse();
      this.mouse.on();
      this.loop();
    },
    loop() {
      requestAnimationFrame(() => this.loop());
      this.draw();
      this.move();
      this.intersectionDetection();
      this.cd();
    },
    cd() {
      if (this.bulletCD-- < 1) {
        this.bullets.push(new Bullet(this.mouse.angle));
        this.bulletCD = BULLET_CD;
      }
      if (this.enemyCD-- < 1) {
        this.enemies.push(new Enemy());
        this.enemyCD = ENEMY_CD;
      }
    },
    intersectionDetection() {
      this.bullets.forEach(bullet => {
        bullet.intersectionDetection(this.enemies);
      });
    },
    draw() {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      this.king.draw();
      this.enemies.forEach(enemy => enemy.draw());
      this.bullets.forEach(bullet => bullet.draw());
    },
    move() {
      this.enemies.forEach(enemy => enemy.move());
      this.bullets.forEach(bullet => bullet.move());
    }
  };
  game.start()
})
</script>
<template>
  <canvas id='canvas'></canvas>
</template>
