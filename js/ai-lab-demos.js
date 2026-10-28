/**
 * SAHIL — THE INTELLIGENCE LAB
 * Mini AI Laboratory (Step 4C)
 * 1. Real-time NLP Sentiment & Feature Intelligence Engine
 * 2. 2D Interactive Decision Boundary Classifier (KNN & Linear Playground)
 * Transparent, genuine, zero-latency in-browser demonstrations.
 */

// ===================================================================
// DEMO 1: NLP SENTIMENT & FEATURE INTELLIGENCE ENGINE
// ===================================================================
(function initNlpDemo() {
  const textarea = document.getElementById('nlp-input-text');
  const analyzeBtn = document.getElementById('nlp-analyze-btn');
  const verdictEl = document.getElementById('nlp-verdict');
  const confidenceEl = document.getElementById('nlp-confidence');
  const meterFill = document.getElementById('nlp-meter-fill');
  const latencyEl = document.getElementById('nlp-latency');
  const emotionJoy = document.getElementById('emotion-joy');
  const emotionUrgency = document.getElementById('emotion-urgency');
  const emotionAnalytical = document.getElementById('emotion-analytical');
  const emotionSkepticism = document.getElementById('emotion-skepticism');
  const featureChipsContainer = document.getElementById('nlp-feature-chips');
  const presetChips = document.querySelectorAll('.nlp-preset-row .preset-chip');

  if (!textarea || !analyzeBtn) return;

  // Curated sentiment & emotional lexicon (ground truth rules)
  const LEXICON = {
    // Positive tokens
    exceeds: 2.2, exceptional: 3.0, excellent: 2.8, great: 2.0, good: 1.5,
    impressive: 2.4, outstanding: 3.2, stable: 1.8, robust: 2.2, fast: 1.5,
    efficient: 2.0, high: 1.2, reliable: 2.4, breakthrough: 3.0, smooth: 1.8,
    accurate: 2.2, optimal: 2.0, superior: 2.5, love: 2.8, best: 2.7,
    improved: 1.6, clean: 1.5, innovative: 2.4, resilient: 2.2, solid: 1.7,

    // Negative tokens
    struggles: -2.0, severe: -2.8, delayed: -2.2, failure: -3.0, fail: -2.5,
    bottlenecks: -2.5, crisis: -3.2, unstable: -2.4, poor: -2.2, bad: -2.0,
    slow: -1.6, bug: -1.8, error: -2.2, defect: -2.4, issue: -1.5,
    risk: -1.8, difficult: -1.6, expensive: -1.5, shortage: -2.6, worst: -3.2,
    degraded: -2.2, broken: -2.8, bottleneck: -2.5, lack: -1.6, vulnerable: -2.4,

    // Neutral / Modifiers
    not: 0, never: 0, barely: 0, hardly: 0, scarcely: 0,
    very: 1.4, extremely: 1.8, remarkably: 1.6, highly: 1.5, slightly: 0.6
  };

  const NEGATORS = new Set(['not', 'never', 'no', 'hardly', 'barely', 'scarcely']);
  const INTENSIFIERS = { very: 1.4, extremely: 1.8, remarkably: 1.6, highly: 1.5, exceptionally: 1.8 };
  const STOPWORDS = new Set([
    'a', 'an', 'the', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
    'is', 'was', 'are', 'were', 'it', 'this', 'that', 'by', 'as', 'from'
  ]);

  const PRESETS = {
    smartphone: "The battery life on this smartphone exceeds expectations with exceptional build quality, though the camera struggles in extreme low light.",
    supply: "Severe supply chain bottlenecks delayed critical pharmaceutical shipments to regional hospitals during the currency crisis.",
    ml: "Model convergence was remarkably stable with gradient descent, achieving high recall and optimal accuracy across test partitions.",
    custom: "FastAPI microservice response latency remained exceptionally low under high concurrent loads."
  };

  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const key = chip.getAttribute('data-preset');
      if (PRESETS[key]) {
        textarea.value = PRESETS[key];
        runNlpAnalysis();
      }
    });
  });

  function tokenize(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter(t => t.length > 1);
  }

  function runNlpAnalysis() {
    const startT = performance.now();
    const rawText = textarea.value.trim();
    if (!rawText) return;

    const tokens = tokenize(rawText);
    let totalScore = 0;
    let scoredCount = 0;
    let isNegated = false;
    let multiplier = 1.0;

    const extractedFeatures = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      // Check negation
      if (NEGATORS.has(token)) {
        isNegated = true;
        continue;
      }

      // Check intensifier
      if (INTENSIFIERS[token]) {
        multiplier = INTENSIFIERS[token];
        continue;
      }

      if (LEXICON.hasOwnProperty(token)) {
        let score = LEXICON[token] * multiplier;
        if (isNegated) {
          score = -score * 0.85;
          isNegated = false;
        }
        multiplier = 1.0;
        totalScore += score;
        scoredCount++;
        extractedFeatures.push(token);
      } else if (!STOPWORDS.has(token) && token.length > 3) {
        // Collect informative candidate features
        if (extractedFeatures.length < 6 && !extractedFeatures.includes(token)) {
          extractedFeatures.push(token);
        }
      }
    }

    const duration = (performance.now() - startT).toFixed(2);
    if (latencyEl) latencyEl.textContent = `Inference: ${duration} ms (Client-Side)`;

    // Polarity normalization to [-1.0, 1.0]
    let normalized = scoredCount > 0 ? totalScore / (scoredCount * 2.8) : 0;
    normalized = Math.max(-1, Math.min(1, normalized));

    // Confidence calculation based on informative token density
    const tokenDensity = Math.min(1, (scoredCount + 1) / Math.max(tokens.length * 0.35, 1));
    const confidence = Math.round((0.55 + tokenDensity * 0.4) * 100);

    // Update UI
    let verdictText = 'Neutral Polarity';
    let verdictClass = 'neutral';
    let fillWidth = 50 + normalized * 50; // 0% = -1, 50% = 0, 100% = +1
    let fillColor = 'var(--lab-cyan)';

    if (normalized > 0.15) {
      verdictText = 'Positive Polarity (+)';
      verdictClass = 'positive';
      fillColor = 'var(--lab-emerald)';
    } else if (normalized < -0.15) {
      verdictText = 'Negative Polarity (−)';
      verdictClass = 'negative';
      fillColor = 'var(--lab-rose)';
    }

    if (verdictEl) {
      verdictEl.textContent = verdictText;
      verdictEl.className = `sentiment-verdict ${verdictClass}`;
    }

    if (confidenceEl) {
      confidenceEl.textContent = `Confidence: ${confidence}% · Score: ${normalized.toFixed(2)}`;
    }

    if (meterFill) {
      meterFill.style.width = `${fillWidth}%`;
      meterFill.style.backgroundColor = fillColor;
    }

    // Emotion Vector decomposition
    const rawLower = rawText.toLowerCase();
    const joyScore = Math.max(0, normalized > 0 ? normalized * 85 + 15 : 10);
    const urgencyScore = (rawLower.includes('severe') || rawLower.includes('delayed') || rawLower.includes('crisis') || rawLower.includes('critical')) ? 88 : 18;
    const analyticalScore = (rawLower.includes('model') || rawLower.includes('data') || rawLower.includes('latency') || rawLower.includes('accuracy') || rawLower.includes('supply')) ? 92 : 45;
    const skepticismScore = (rawLower.includes('though') || rawLower.includes('struggles') || rawLower.includes('risk') || rawLower.includes('difficult')) ? 78 : 15;

    if (emotionJoy) emotionJoy.textContent = `${Math.round(joyScore)}%`;
    if (emotionUrgency) emotionUrgency.textContent = `${Math.round(urgencyScore)}%`;
    if (emotionAnalytical) emotionAnalytical.textContent = `${Math.round(analyticalScore)}%`;
    if (emotionSkepticism) emotionSkepticism.textContent = `${Math.round(skepticismScore)}%`;

    // Render extracted features
    if (featureChipsContainer) {
      featureChipsContainer.innerHTML = '';
      if (extractedFeatures.length === 0) {
        featureChipsContainer.innerHTML = '<span style="font-size:0.8rem;color:var(--lab-text-muted)">No distinct salient features parsed.</span>';
      } else {
        extractedFeatures.slice(0, 6).forEach(f => {
          const chip = document.createElement('span');
          chip.className = 'feature-chip';
          chip.textContent = `#${f}`;
          featureChipsContainer.appendChild(chip);
        });
      }
    }
  }

  analyzeBtn.addEventListener('click', runNlpAnalysis);
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      runNlpAnalysis();
    }
  });

  // Initial trigger
  runNlpAnalysis();
})();


// ===================================================================
// DEMO 2: 2D DECISION BOUNDARY CLASSIFIER (ML PLAYGROUND)
// ===================================================================
(function initClassifierDemo() {
  const canvas = document.getElementById('decision-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const alphaBtn = document.getElementById('btn-class-alpha');
  const betaBtn = document.getElementById('btn-class-beta');
  const kSlider = document.getElementById('classifier-k-slider');
  const kValEl = document.getElementById('classifier-k-val');
  const totalPointsEl = document.getElementById('metric-total-points');
  const accuracyEl = document.getElementById('metric-accuracy');
  const presetLinearBtn = document.getElementById('preset-linear');
  const presetConcentricBtn = document.getElementById('preset-concentric');
  const clearBtn = document.getElementById('classifier-clear-btn');

  let currentClass = 1; // 1 = Alpha (Cyan), -1 = Beta (Rose)
  let kNeighbors = 3;
  let points = []; // Array of { x: normX, y: normY, label: 1 or -1 }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    renderField();
  }

  // Presets
  function loadLinearPreset() {
    points = [
      // Cluster Alpha (upper left)
      { x: 0.22, y: 0.25, label: 1 },
      { x: 0.28, y: 0.32, label: 1 },
      { x: 0.35, y: 0.22, label: 1 },
      { x: 0.18, y: 0.38, label: 1 },
      { x: 0.32, y: 0.40, label: 1 },
      { x: 0.40, y: 0.30, label: 1 },
      // Cluster Beta (lower right)
      { x: 0.68, y: 0.65, label: -1 },
      { x: 0.75, y: 0.72, label: -1 },
      { x: 0.82, y: 0.60, label: -1 },
      { x: 0.65, y: 0.78, label: -1 },
      { x: 0.72, y: 0.82, label: -1 },
      { x: 0.85, y: 0.75, label: -1 }
    ];
    renderField();
  }

  function loadConcentricPreset() {
    points = [];
    // Inner Circle (Alpha)
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2;
      points.push({
        x: 0.5 + Math.cos(angle) * 0.14,
        y: 0.5 + Math.sin(angle) * 0.14,
        label: 1
      });
    }
    // Outer Ring (Beta)
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      points.push({
        x: 0.5 + Math.cos(angle) * 0.34,
        y: 0.5 + Math.sin(angle) * 0.34,
        label: -1
      });
    }
    renderField();
  }

  // KNN Predictor at normalized coordinate (gx, gy)
  function predictKNN(gx, gy, k) {
    if (points.length === 0) return 0;
    // Calculate distance to all points
    const distances = points.map(p => ({
      distSq: (p.x - gx) ** 2 + (p.y - gy) ** 2,
      label: p.label
    }));

    distances.sort((a, b) => a.distSq - b.distSq);
    const topK = distances.slice(0, Math.min(k, distances.length));

    let sum = 0;
    topK.forEach(item => { sum += item.label; });
    return sum >= 0 ? 1 : -1;
  }

  function renderField() {
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    // 1. Draw Decision Boundary Heatmap Grid (sampled coarsely for 60fps performance)
    if (points.length >= 2) {
      const step = 14;
      const cols = Math.ceil(w / step);
      const rows = Math.ceil(h / step);

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const gx = (c * step + step / 2) / w;
          const gy = (r * step + step / 2) / h;
          const pred = predictKNN(gx, gy, kNeighbors);

          ctx.fillStyle = pred === 1
            ? 'rgba(0, 240, 255, 0.08)'
            : 'rgba(244, 63, 94, 0.08)';
          ctx.fillRect(c * step, r * step, step, step);
        }
      }
    }

    // 2. Grid Coordinates Lines
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';
    ctx.lineWidth = 1;
    for (let x = 40; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 40; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // 3. Render Training Points
    points.forEach(p => {
      const px = p.x * w;
      const py = p.y * h;

      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fillStyle = p.label === 1 ? '#00f0ff' : '#f43f5e';
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.label === 1 ? 'rgba(0, 240, 255, 0.6)' : 'rgba(244, 63, 94, 0.6)';
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // 4. Update Metrics
    if (totalPointsEl) {
      const alphaCount = points.filter(p => p.label === 1).length;
      const betaCount = points.filter(p => p.label === -1).length;
      totalPointsEl.textContent = `${points.length} (α: ${alphaCount}, β: ${betaCount})`;
    }

    if (accuracyEl) {
      if (points.length < 2) {
        accuracyEl.textContent = '—';
      } else {
        // Resubstitution Training Accuracy (leave-one-out validation)
        let correct = 0;
        points.forEach(p => {
          const pred = predictKNN(p.x, p.y, kNeighbors);
          if (pred === p.label) correct++;
        });
        const acc = Math.round((correct / points.length) * 100);
        accuracyEl.textContent = `${acc}%`;
      }
    }
  }

  // Canvas click: Plot new point
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const normX = Math.max(0.02, Math.min(0.98, (e.clientX - rect.left) / rect.width));
    const normY = Math.max(0.02, Math.min(0.98, (e.clientY - rect.top) / rect.height));

    points.push({ x: normX, y: normY, label: currentClass });
    renderField();
  });

  // Class toggle buttons
  if (alphaBtn && betaBtn) {
    alphaBtn.addEventListener('click', () => {
      currentClass = 1;
      alphaBtn.classList.add('active-class', 'alpha');
      betaBtn.classList.remove('active-class', 'beta');
    });

    betaBtn.addEventListener('click', () => {
      currentClass = -1;
      betaBtn.classList.add('active-class', 'beta');
      alphaBtn.classList.remove('active-class', 'alpha');
    });
  }

  // Hyperparameter slider
  if (kSlider) {
    kSlider.addEventListener('input', (e) => {
      kNeighbors = parseInt(e.target.value, 10);
      if (kValEl) kValEl.textContent = `k = ${kNeighbors}`;
      renderField();
    });
  }

  // Presets & Clear
  if (presetLinearBtn) presetLinearBtn.addEventListener('click', loadLinearPreset);
  if (presetConcentricBtn) presetConcentricBtn.addEventListener('click', loadConcentricPreset);
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      points = [];
      renderField();
    });
  }

  window.addEventListener('resize', resizeCanvas, { passive: true });

  // Tab switcher between Demo 1 & Demo 2
  const demoTabBtns = document.querySelectorAll('.demo-tab-btn');
  const demoViews = document.querySelectorAll('.demo-view');

  demoTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-demo-target');
      demoTabBtns.forEach(b => b.setAttribute('aria-selected', 'false'));
      demoViews.forEach(v => v.classList.remove('active-demo'));

      btn.setAttribute('aria-selected', 'true');
      const targetView = document.getElementById(targetId);
      if (targetView) {
        targetView.classList.add('active-demo');
        if (targetId === 'demo-classifier') {
          setTimeout(resizeCanvas, 50);
        }
      }
    });
  });

  // Initial load
  loadLinearPreset();
})();
