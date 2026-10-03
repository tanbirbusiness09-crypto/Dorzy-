const CELL_SIZE = 55;
const INFLUENCE_RADIUS = 260;
const MAX_WARP = 24;
const DOT_SPACING = 28;
const LERP_SPEED = 0.08;
const LINE_BASE = { r: 255, g: 255, b: 255, a: 0.13 };
const NODE_BASE_RADIUS = 1.8;
const NODE_ACTIVE_RADIUS = 3.2;
const RIPPLE_SPEED = 400;
const RIPPLE_FADE = 1.2;
const RIPPLE_WAVE = 55;

const THEME = {
  lineActive: { r: 201, g: 162, b: 74, a: 0.9 },
  nodeActive: { r: 232, g: 208, b: 138, a: 1 },
  glow: "201,162,74",
  ripple: "61,180,120",
};

const UI_SELECTOR =
  "a, button, select, input, textarea, label, [role='button'], [contenteditable='true']";

function lerpN(a, b, t) {
  return a + (b - a) * t;
}

function lerpColor(base, active, t) {
  const r = Math.round(lerpN(base.r, active.r, t));
  const g = Math.round(lerpN(base.g, active.g, t));
  const b = Math.round(lerpN(base.b, active.b, t));
  const a = lerpN(base.a, active.a, t);
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

function warpedPoint(gx, gy, col, row, mouse, ripples, cols, rows) {
  const edgeMargin = 1.5;
  const colPin = Math.min(col / edgeMargin, (cols - 1 - col) / edgeMargin, 1);
  const rowPin = Math.min(row / edgeMargin, (rows - 1 - row) / edgeMargin, 1);
  const pinFactor = colPin * colPin * rowPin * rowPin;

  const dx = gx - mouse.x;
  const dy = gy - mouse.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  const proximity = Math.max(0, 1 - dist / INFLUENCE_RADIUS) * pinFactor;

  let rx = 0;
  let ry = 0;
  for (const r of ripples) {
    const rdx = gx - r.x;
    const rdy = gy - r.y;
    const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
    const diff = rdist - r.radius;
    if (Math.abs(diff) < RIPPLE_WAVE) {
      const strength =
        (1 - Math.abs(diff) / RIPPLE_WAVE) * r.opacity * 18 * pinFactor;
      const angle = Math.atan2(rdy, rdx);
      const sign = diff < 0 ? -1 : 1;
      rx += Math.cos(angle) * strength * sign * -1;
      ry += Math.sin(angle) * strength * sign * -1;
    }
  }

  if (dist < INFLUENCE_RADIUS && dist > 0 && pinFactor > 0) {
    const t = dist / INFLUENCE_RADIUS;
    const eased = t < 0.01 ? 0 : (1 - t) * (1 - t) * Math.min(1, dist / 60);
    const warpAmt = eased * MAX_WARP * pinFactor;
    const angle = Math.atan2(dy, dx);
    return {
      pt: {
        x: gx - Math.cos(angle) * warpAmt + rx,
        y: gy - Math.sin(angle) * warpAmt + ry,
      },
      proximity,
    };
  }

  return { pt: { x: gx + rx, y: gy + ry }, proximity };
}

export function initKineticGrid(container) {
  if (!container || !container.appendChild) return () => {};

  const canvas = document.createElement("canvas");
  canvas.className = "bg__canvas";
  canvas.setAttribute("aria-hidden", "true");
  container.prepend(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return () => canvas.remove();
  }

  const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);

  const mouse = { x: -9999, y: -9999 };
  const target = { x: -9999, y: -9999 };
  const ripples = [];
  const size = { w: 0, h: 0 };
  let raf = 0;

  const setSize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    size.w = w;
    size.h = h;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = (now) => {
    const W = size.w;
    const H = size.h;
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "rgba(255,255,255,0.05)";
    for (let x = DOT_SPACING / 2; x < W; x += DOT_SPACING) {
      for (let y = DOT_SPACING / 2; y < H; y += DOT_SPACING) {
        ctx.beginPath();
        ctx.arc(x, y, 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = ripples.length - 1; i >= 0; i -= 1) {
      const r = ripples[i];
      const age = (now - r.born) / 1000;
      r.radius = Math.max(0, age * RIPPLE_SPEED);
      r.opacity = Math.max(0, 1 - age * RIPPLE_FADE);
      if (r.opacity <= 0) ripples.splice(i, 1);
    }

    const cols = Math.max(2, Math.ceil(W / CELL_SIZE)) + 1;
    const rows = Math.max(2, Math.ceil(H / CELL_SIZE)) + 1;
    const cellW = W / (cols - 1);
    const cellH = H / (rows - 1);

    const pts = [];
    const prox = [];

    for (let row = 0; row < rows; row += 1) {
      pts[row] = [];
      prox[row] = [];
      for (let col = 0; col < cols; col += 1) {
        const result = warpedPoint(
          col * cellW,
          row * cellH,
          col,
          row,
          mouse,
          ripples,
          cols,
          rows,
        );
        pts[row][col] = result.pt;
        prox[row][col] = result.proximity;
      }
    }

    const drawSeg = (p1, p2, pr1, pr2) => {
      const t = smoothstep((pr1 + pr2) / 2);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = lerpColor(LINE_BASE, THEME.lineActive, t);
      ctx.lineWidth = lerpN(0.8, 1.5, t);
      ctx.stroke();
    };

    ctx.lineCap = "butt";

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols - 1; col += 1) {
        drawSeg(pts[row][col], pts[row][col + 1], prox[row][col], prox[row][col + 1]);
      }
    }

    for (let col = 0; col < cols; col += 1) {
      for (let row = 0; row < rows - 1; row += 1) {
        drawSeg(pts[row][col], pts[row + 1][col], prox[row][col], prox[row + 1][col]);
      }
    }

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const p = pts[row][col];
        const t = smoothstep(prox[row][col]);
        const r = lerpN(NODE_BASE_RADIUS, NODE_ACTIVE_RADIUS, t);

        if (t > 0.3) {
          const glowR = r + lerpN(0, 6, (t - 0.3) / 0.7);
          const grd = ctx.createRadialGradient(p.x, p.y, r * 0.5, p.x, p.y, glowR);
          grd.addColorStop(0, `rgba(${THEME.glow},${(t * 0.3).toFixed(3)})`);
          grd.addColorStop(1, `rgba(${THEME.glow},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = lerpColor({ r: 255, g: 255, b: 255, a: 0.2 }, THEME.nodeActive, t);
        ctx.fill();
      }
    }

    for (const r of ripples) {
      ctx.beginPath();
      ctx.arc(r.x, r.y, Math.max(0, r.radius), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${THEME.ripple},${(r.opacity * 0.28).toFixed(3)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  };

  const animate = (now) => {
    mouse.x = lerpN(mouse.x, target.x, LERP_SPEED);
    mouse.y = lerpN(mouse.y, target.y, LERP_SPEED);
    draw(now);
    raf = window.requestAnimationFrame(animate);
  };

  const stop = () => {
    if (raf) window.cancelAnimationFrame(raf);
    raf = 0;
  };

  const start = () => {
    stop();
    if (document.hidden || reduceQuery.matches) return;
    raf = window.requestAnimationFrame(animate);
  };

  const onResize = () => {
    setSize();
    if (reduceQuery.matches) draw(performance.now());
  };

  const onPointerMove = (e) => {
    target.x = e.clientX;
    target.y = e.clientY;
  };

  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    if (e.target && e.target.closest && e.target.closest(UI_SELECTOR)) return;
    ripples.push({
      x: e.clientX,
      y: e.clientY,
      radius: 0,
      opacity: 1,
      born: performance.now(),
    });
  };

  const onVisibility = () => {
    if (document.hidden) stop();
    else start();
  };

  const onMotionChange = () => {
    if (reduceQuery.matches) {
      stop();
      mouse.x = -9999;
      mouse.y = -9999;
      draw(performance.now());
    } else {
      start();
    }
  };

  let resizeFrame = 0;
  const onResizeQueued = () => {
    if (resizeFrame) return;
    resizeFrame = window.requestAnimationFrame(() => {
      resizeFrame = 0;
      onResize();
    });
  };

  setSize();
  draw(performance.now());
  start();

  window.addEventListener("resize", onResizeQueued);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerdown", onPointerDown);
  document.addEventListener("visibilitychange", onVisibility);
  if (typeof reduceQuery.addEventListener === "function") {
    reduceQuery.addEventListener("change", onMotionChange);
  }

  return () => {
    stop();
    if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
    window.removeEventListener("resize", onResizeQueued);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerdown", onPointerDown);
    document.removeEventListener("visibilitychange", onVisibility);
    if (typeof reduceQuery.removeEventListener === "function") {
      reduceQuery.removeEventListener("change", onMotionChange);
    }
    canvas.remove();
  };
}
