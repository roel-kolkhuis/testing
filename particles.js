window.onload = function () {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var particles = [];
  var particleCount = 100;
  var particleRadius = 5;
  var colors = ["#E71D36", "#FF9F1C", "#F2D600", "#1B998B"];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function Particle(x, y, vx, vy, color, radius) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.color = color;
      this.radius = radius;
  }

  Particle.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
  };

  Particle.prototype.update = function () {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.vx = -this.vx;
      }
      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.vy = -this.vy;
      }
  };

  for (var i = 0; i < particleCount; i++) {
      var x = Math.random() * canvas.width;
      var y = Math.random() * canvas.height;
      var vx = Math.random() * 4 - 2;
      var vy = Math.random() * 4 - 2;
      var color = colors[Math.floor(Math.random() * colors.length)];
      var radius = particleRadius;
      particles.push(new Particle(x, y, vx, vy, color, radius));
  }

  function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < particleCount; i++) {
          particles[i].update();
          particles[i].draw();
      }
  }

  animate();
};
