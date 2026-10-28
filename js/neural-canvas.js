/**
 * SAHIL — THE INTELLIGENCE LAB
 * Interactive Neural Synapse Canvas
 * Responsive, GPU-efficient particle network reacting to pointer physics.
 */

(function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationId = null;
  let isVisible = true;

  const pointer = {
    x: -9999,
    y: -9999,
    radius: 140,
    active: false
  };

  let particles = [];

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    initParticles();
    if (prefersReducedMotion) {
      drawStatic();
    }
  }

  function initParticles() {
    particles = [];
    // Scale count with screen area: ~40 on mobile, ~85 on desktop
    const count = Math.floor(Math.max(30, Math.min(95, (width * height) / 12000)));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: Math.random() * 1.8 + 1.2,
        color: Math.random() > 0.3 ? 'rgba(0, 240, 255, 0.75)' : 'rgba(129, 140, 248, 0.75)',
        alpha: Math.random() * 0.6 + 0.3,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }
  }

  function drawStatic() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.18 * (1 - dist / 100)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function tick(timestamp) {
    if (!isVisible) {
      animationId = null;
      return;
    }

    ctx.clearRect(0, 0, width, height);

    const time = timestamp * 0.002;
    const connectionDist = width < 768 ? 85 : 120;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Physics update
      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges smoothly
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;

      // Pointer physics: gentle synaptic acceleration
      if (pointer.active) {
        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < pointer.radius && dist > 1) {
          const force = (1 - dist / pointer.radius) * 0.015;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;

          // Drag to avoid wild explosion
          p.vx *= 0.98;
          p.vy *= 0.98;
        }
      }

      // Draw node with subtle sine pulse
      const pulse = Math.sin(time + p.pulseOffset) * 0.4 + 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(0, 240, 255, 0.4)';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Inter-particle filaments
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < connectionDist) {
          const lineAlpha = (1 - dist / connectionDist) * 0.22;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Pointer synapse connection
      if (pointer.active) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < pointer.radius) {
          const probeAlpha = (1 - dist / pointer.radius) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${probeAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(tick);
  }

  function startAnimation() {
    if (prefersReducedMotion) {
      drawStatic();
      return;
    }
    if (!animationId && isVisible) {
      animationId = requestAnimationFrame(tick);
    }
  }

  function stopAnimation() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  // Pointer event listeners
  function onPointerMove(e) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    pointer.active = true;
  }

  function onPointerLeave() {
    pointer.active = false;
    pointer.x = -9999;
    pointer.y = -9999;
  }

  window.addEventListener('resize', resize, { passive: true });
  canvas.addEventListener('mousemove', onPointerMove, { passive: true });
  canvas.addEventListener('mouseleave', onPointerLeave, { passive: true });
  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      pointer.x = touch.clientX - rect.left;
      pointer.y = touch.clientY - rect.top;
      pointer.active = true;
    }
  }, { passive: true });
  canvas.addEventListener('touchend', onPointerLeave, { passive: true });

  // IntersectionObserver: pause when hero is off-screen
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startAnimation();
        } else {
          stopAnimation();
        }
      });
    }, { threshold: 0.05 });
    observer.observe(canvas.parentElement || canvas);
  }

  resize();
  startAnimation();
})();
