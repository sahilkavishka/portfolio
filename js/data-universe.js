/**
 * SAHIL KAVISHKA — DATA INTELLIGENCE STUDIO
 * Interactive Scientific Knowledge Graph (13 Connected Nodes)
 * End-to-end data science lifecycle: from Mathematics to Edge Robotics.
 */

(function initDataUniverse() {
  const UNIVERSE_DATA = {
    math: {
      id: 'math',
      title: 'Mathematics & Statistics',
      tag: 'THEORETICAL FOUNDATION',
      desc: 'Formulating rigorous mathematical frameworks: linear algebra, matrix decompositions (SVD, PCA), multivariable calculus, probability theory, hypothesis testing, and Bayesian inferential reasoning.',
      stack: ['Probability Distributions', 'Linear Algebra', 'Multivariable Calculus', 'Hypothesis Testing', 'Bayesian Inference', 'Markov Chains'],
      projects: [
        { name: 'MSFT Stock Stochastic Study', status: '40-Year Distribution & Monte Carlo', filter: 'data' },
        { name: 'Clinical Stacking Ensemble', status: 'Platt Calibration & Probability Mapping', filter: 'ai' }
      ]
    },
    ingest: {
      id: 'ingest',
      title: 'Data Collection & Ingestion',
      tag: 'DATA ACQUISITION',
      desc: 'Engineering robust data extraction pipelines: automated web scraping, RESTful API pagination, telemetry polling, and high-throughput data extraction across heterogeneous sources.',
      stack: ['BeautifulSoup', 'Requests', 'Selenium', 'REST APIs', 'YouTube Data API v3', 'Job Board Scraping'],
      projects: [
        { name: 'Sri Lanka Tech Market Scraper', status: 'Automated Job Board Pipeline', filter: 'data' },
        { name: 'EdTech Market Pipeline', status: 'Published Kaggle Master Dataset (10.0)', filter: 'data' }
      ]
    },
    cleaning: {
      id: 'cleaning',
      title: 'Data Cleaning & Preprocessing',
      tag: 'DATA CURATION & QUALITY',
      desc: 'Developing deterministic data sanitization: missing value imputation strategies, outlier detection via Tukey IQR and Z-scores, schema normalization, and categorical encoding.',
      stack: ['Pandas', 'NumPy', 'Missingno', 'Tukey IQR', 'RobustScaler', 'One-Hot & Target Encoding'],
      projects: [
        { name: 'CropSafe AI Lab Harmonization', status: '2,002 Empirical Lab Certificates', filter: 'ai' },
        { name: 'Pharma Supply Data Sanitization', status: 'Star Schema Foreign Exchange Cleaning', filter: 'data' }
      ]
    },
    eda: {
      id: 'eda',
      title: 'Exploratory Data Analysis',
      tag: 'PATTERN DISCOVERY',
      desc: 'Uncovering latent empirical patterns: correlation matrices, multivariate feature distributions, density estimation, interaction effects, and statistical hypothesis verification.',
      stack: ['Seaborn', 'Matplotlib', 'Plotly', 'Pairplots', 'Correlation Matrices', 'Kernel Density (KDE)'],
      projects: [
        { name: 'Interactive EDA Lab', status: 'Live Client-Side Profiling Engine', filter: 'all' },
        { name: 'Ceylon Tourism Economic Study', status: 'Macroeconomic Sensitivity & Seasonality', filter: 'data' }
      ]
    },
    feature: {
      id: 'feature',
      title: 'Feature Engineering',
      tag: 'SIGNAL SYNTHESIS',
      desc: 'Synthesizing high-predictive signals: domain-specific ratios, temporal lag features, rolling window aggregates, polynomial interactions, and recursive feature elimination.',
      stack: ['Feature Scaling', 'Interaction Terms', 'Lag Operators', 'Rolling Aggregates', 'Recursive Feature Elimination'],
      projects: [
        { name: 'Clinical Risk Biomarkers', status: 'Kaggle Rank #3 🥉 Engineered Predictors', filter: 'ai' },
        { name: 'CropSafe Degradation Indices', status: 'NPK Moisture Ratio Synthesizer', filter: 'ai' }
      ]
    },
    ml: {
      id: 'ml',
      title: 'Machine Learning',
      tag: 'PREDICTIVE ENSEMBLES',
      desc: 'Designing supervised, ensemble, and gradient-boosted algorithms (LightGBM, XGBoost, CatBoost) with strict cross-validation, hyperparameter tuning, and threshold calibration.',
      stack: ['Scikit-learn', 'LightGBM', 'XGBoost', 'CatBoost', 'Stratified K-Fold', 'Ensemble Stacking'],
      projects: [
        { name: 'CropSafe AI Classifier', status: 'LightGBM 94.6% Accuracy & Loss Regressors', filter: 'ai' },
        { name: 'Clinical Readmission Stacking', status: 'Global Rank #3 🥉 Lasso Meta-Learner', filter: 'ai' },
        { name: 'Tech Salary Predictor', status: 'Random Forest Compensation Benchmark', filter: 'data' }
      ]
    },
    dl: {
      id: 'dl',
      title: 'Deep Learning',
      tag: 'NEURAL REPRESENTATIONS',
      desc: 'Architecting deep residual backbones, transformer fine-tuning, and compound loss functions (Charbonnier + D-SSIM) for high-fidelity restoration and nuanced classification.',
      stack: ['PyTorch', 'NAFNet-APEX', 'Hugging Face', 'BERT', 'CUDA', 'Backbone Fine-Tuning'],
      projects: [
        { name: 'Hybrid Image Denoising', status: 'IEEE Mora SP Cup 2026 (32.42 dB PSNR)', filter: 'cv' },
        { name: 'AI Review Insight', status: 'Fine-Tuned BERT vs ML', filter: 'nlp' }
      ]
    },
    nlp: {
      id: 'nlp',
      title: 'Natural Language Processing',
      tag: 'LANGUAGE & SEMANTICS',
      desc: 'Building end-to-end NLP pipelines: lexical tokenization, TF-IDF scoring, VADER sentiment annotation, transformer fine-tuning, and real-time browser extension triage.',
      stack: ['Transformers', 'BERT', 'PyTorch', 'NLTK', 'FastAPI', 'Chrome Extension V3'],
      projects: [
        { name: 'AI Review Insight', status: 'Daraz Chrome Extension V3', filter: 'nlp' },
        { name: 'Mini AI Laboratory NLP Engine', status: 'In-Browser Lexical Decomposition', filter: 'all' }
      ]
    },
    cv: {
      id: 'cv',
      title: 'Computer Vision',
      tag: 'VISUAL INTELLIGENCE',
      desc: 'Investigating low-light sensor restoration, defect pixel suppression, spatial raycasting, and architectural floor-plan parsing across digital sensors and 3D web environments.',
      stack: ['OpenCV', 'Scikit-Image', 'NAFNet', 'Three.js / WebGL', 'Spatial Raycasting', 'Classical DSP'],
      projects: [
        { name: 'Hybrid Low-Light Denoising', status: 'NAFNet + Classical DSP (SP Cup)', filter: 'cv' },
        { name: 'Sinharaja 3D Survival', status: 'Raycasting & Procedural Visuals', filter: 'cv' },
        { name: 'ITEX 2.0 Live Gesture AI', status: 'Live Computer Vision Demonstration', filter: 'all' }
      ]
    },
    genai: {
      id: 'genai',
      title: 'Generative AI & LLMs',
      tag: 'FOUNDATION MODELS & AGENTS',
      desc: 'Orchestrating frontier LLM APIs, retrieval-augmented grounding, multimodal reasoning, voice assistants, and structured JSON tool-calling pipelines.',
      stack: ['Google Gemini API', 'Function Calling', 'Multimodal Prompting', 'Structured Outputs', 'Context Grounding'],
      projects: [
        { name: 'SmartBuild AI Architecture', status: 'Gemini CAD Floor Plan Copilot', filter: 'ai' },
        { name: 'Salonora AI Platform', status: 'Gemini Multimodal Voice & Vision', filter: 'web' }
      ]
    },
    viz: {
      id: 'viz',
      title: 'Data Visualization & Storytelling',
      tag: 'SCIENTIFIC VISUALIZATION',
      desc: 'Engineering interactive scientific charts, high-DPI HTML5 canvases, and enterprise Power BI Star Schema dimensional dashboards with advanced DAX measures.',
      stack: ['Power BI', 'Advanced DAX', 'Plotly.js', 'HTML5 Canvas', 'Star Schema', 'ArcGIS Maps'],
      projects: [
        { name: 'Data Visualization Studio', status: 'Interactive Multi-Chart Scientific Suite', filter: 'all' },
        { name: 'Medicine Supply Chain BI', status: 'LKR 57.72B Import Star Schema', filter: 'data' },
        { name: 'Champions Trophy Dashboard', status: 'Power BI Historical Sports Analytics', filter: 'data' }
      ]
    },
    systems: {
      id: 'systems',
      title: 'Systems & Full-Stack Web',
      tag: 'PRODUCTION DEPLOYMENT',
      desc: 'Engineering robust, production-grade microservices and responsive frontends: FastAPI backends, Django relational platforms, Docker containers, and 60 FPS Three.js rendering.',
      stack: ['FastAPI', 'Django', 'Docker', 'PostgreSQL / MySQL', 'Three.js', 'Bootstrap 5'],
      projects: [
        { name: 'MatchPoint Sports Management', status: 'Django/MySQL Role-Based System', filter: 'web' },
        { name: 'Sinharaja 3D Survival Engine', status: 'Three.js WebGL 60 FPS Game Engine', filter: 'cv' }
      ]
    },
    robotics: {
      id: 'robotics',
      title: 'Intelligent Systems & Edge IoT',
      tag: 'PHYSICAL COMPUTING',
      desc: 'Deploying microcontroller telemetry, tactile sensor interaction, real-time input/output loops, and exploring edge machine learning on physical hardware.',
      stack: ['BBC Micro:bit', 'Sensors & Actuators', 'Embedded Python', 'GPIO Telemetry', 'Edge Inference'],
      projects: [
        { name: 'HOPE 2.0 STEM Outreach', status: 'BBC Micro:bit School Workshops', filter: 'all' },
        { name: 'Physical Computing Lab', status: 'Hardware Interaction Loops', filter: 'all' }
      ]
    }
  };

  // 13-Node Circular Coordinates (Radius = 185px, Center = 290, 240)
  const NODE_KEYS = Object.keys(UNIVERSE_DATA);
  const cx = 290, cy = 240, r = 182;
  const NODES = NODE_KEYS.map((k, idx) => {
    const angle = (idx / NODE_KEYS.length) * 2 * Math.PI - Math.PI / 2;
    return {
      id: k,
      x: Math.round(cx + r * Math.cos(angle)),
      y: Math.round(cy + r * Math.sin(angle)),
      label: UNIVERSE_DATA[k].title,
      short: UNIVERSE_DATA[k].title
    };
  });

  // Interconnected lifecycle conduits
  const EDGES = [
    // Lifecycle Sequence Ring
    ['math', 'ingest'],
    ['ingest', 'cleaning'],
    ['cleaning', 'eda'],
    ['eda', 'feature'],
    ['feature', 'ml'],
    ['ml', 'dl'],
    ['dl', 'nlp'],
    ['nlp', 'cv'],
    ['cv', 'genai'],
    ['genai', 'viz'],
    ['viz', 'systems'],
    ['systems', 'robotics'],
    ['robotics', 'math'],
    // Crucial Cross-Conduits
    ['math', 'ml'],
    ['math', 'dl'],
    ['eda', 'viz'],
    ['feature', 'dl'],
    ['ml', 'systems'],
    ['dl', 'cv'],
    ['nlp', 'genai'],
    ['genai', 'systems'],
    ['viz', 'eda'],
    ['systems', 'robotics']
  ];

  const svg = document.getElementById('universe-svg');
  if (!svg) return;

  const panelTag = document.getElementById('universe-telemetry-tag');
  const panelTitle = document.getElementById('universe-telemetry-title');
  const panelDesc = document.getElementById('universe-telemetry-desc');
  const panelStack = document.getElementById('universe-telemetry-stack');
  const panelProjects = document.getElementById('universe-telemetry-projects');
  const filterBtn = document.getElementById('universe-filter-projects-btn');

  let activeDomainId = 'ml';

  function renderGraph() {
    svg.innerHTML = '';
    const center = { x: 290, y: 240 };

    // SVG Defs
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#00e5ff" stop-opacity="0.32"/>
        <stop offset="100%" stop-color="#00e5ff" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="nodeActiveGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#00e5ff" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="#2979ff" stop-opacity="0.2"/>
      </radialGradient>
      <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    `;
    svg.appendChild(defs);

    // Orbit Ring Guide
    const orbit = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    orbit.setAttribute('cx', center.x);
    orbit.setAttribute('cy', center.y);
    orbit.setAttribute('r', r.toString());
    orbit.setAttribute('fill', 'none');
    orbit.setAttribute('stroke', 'rgba(0, 229, 255, 0.08)');
    orbit.setAttribute('stroke-width', '1');
    orbit.setAttribute('stroke-dasharray', '3 6');
    svg.appendChild(orbit);

    // Central Core Hub
    const hubGlow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    hubGlow.setAttribute('cx', center.x);
    hubGlow.setAttribute('cy', center.y);
    hubGlow.setAttribute('r', '55');
    hubGlow.setAttribute('fill', 'url(#centerGlow)');
    svg.appendChild(hubGlow);

    const hubCore = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    hubCore.setAttribute('cx', center.x);
    hubCore.setAttribute('cy', center.y);
    hubCore.setAttribute('r', '22');
    hubCore.setAttribute('fill', '#050811');
    hubCore.setAttribute('stroke', '#00e5ff');
    hubCore.setAttribute('stroke-width', '1.5');
    svg.appendChild(hubCore);

    const hubText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    hubText.setAttribute('x', center.x);
    hubText.setAttribute('y', center.y + 4);
    hubText.setAttribute('text-anchor', 'middle');
    hubText.setAttribute('fill', '#00e5ff');
    hubText.setAttribute('font-size', '9');
    hubText.setAttribute('font-family', 'monospace');
    hubText.setAttribute('font-weight', 'bold');
    hubText.textContent = 'DATA·AI';
    svg.appendChild(hubText);

    // Draw Edges (Conduits)
    const nodeMap = {};
    NODES.forEach(n => { nodeMap[n.id] = n; });

    EDGES.forEach(([fromId, toId]) => {
      const from = nodeMap[fromId];
      const to = nodeMap[toId];
      if (!from || !to) return;

      const isConnectedToActive = (fromId === activeDomainId || toId === activeDomainId);

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', from.x);
      line.setAttribute('y1', from.y);
      line.setAttribute('x2', to.x);
      line.setAttribute('y2', to.y);
      line.setAttribute('stroke', isConnectedToActive ? '#00e5ff' : 'rgba(255, 255, 255, 0.08)');
      line.setAttribute('stroke-width', isConnectedToActive ? '2' : '1');
      if (isConnectedToActive) {
        line.setAttribute('filter', 'url(#glowFilter)');
      }
      svg.appendChild(line);
    });

    // Draw Radial Conduits from Hub to Active Node
    const activeNode = nodeMap[activeDomainId];
    if (activeNode) {
      const radialBeam = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      radialBeam.setAttribute('x1', center.x);
      radialBeam.setAttribute('y1', center.y);
      radialBeam.setAttribute('x2', activeNode.x);
      radialBeam.setAttribute('y2', activeNode.y);
      radialBeam.setAttribute('stroke', '#00e5ff');
      radialBeam.setAttribute('stroke-width', '2');
      radialBeam.setAttribute('stroke-dasharray', '4 4');
      radialBeam.setAttribute('filter', 'url(#glowFilter)');
      svg.appendChild(radialBeam);
    }

    // Draw Nodes
    NODES.forEach(n => {
      const isActive = n.id === activeDomainId;
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.style.cursor = 'pointer';
      g.setAttribute('role', 'button');
      g.setAttribute('aria-label', `Select ${n.label} domain`);
      g.setAttribute('tabindex', '0');

      if (isActive) {
        const glowCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        glowCircle.setAttribute('cx', n.x);
        glowCircle.setAttribute('cy', n.y);
        glowCircle.setAttribute('r', '20');
        glowCircle.setAttribute('fill', 'url(#nodeActiveGlow)');
        glowCircle.setAttribute('filter', 'url(#glowFilter)');
        g.appendChild(glowCircle);
      }

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', n.x);
      circle.setAttribute('cy', n.y);
      circle.setAttribute('r', isActive ? '12' : '9');
      circle.setAttribute('fill', isActive ? '#00e5ff' : '#0b1220');
      circle.setAttribute('stroke', isActive ? '#ffffff' : '#2979ff');
      circle.setAttribute('stroke-width', isActive ? '2.5' : '1.5');
      g.appendChild(circle);

      // Label Positioning
      const angle = Math.atan2(n.y - center.y, n.x - center.x);
      const labelDist = isActive ? 24 : 18;
      const lx = n.x + labelDist * Math.cos(angle);
      const ly = n.y + labelDist * Math.sin(angle) + 4;
      const textAnchor = Math.abs(Math.cos(angle)) < 0.2 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end';

      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', lx);
      label.setAttribute('y', ly);
      label.setAttribute('text-anchor', textAnchor);
      label.setAttribute('fill', isActive ? '#00e5ff' : '#94a3b8');
      label.setAttribute('font-size', isActive ? '11' : '9.5');
      label.setAttribute('font-family', 'Inter, system-ui, sans-serif');
      label.setAttribute('font-weight', isActive ? 'bold' : 'normal');
      label.textContent = n.short;
      g.appendChild(label);

      // Node Interaction
      const activate = () => {
        activeDomainId = n.id;
        renderGraph();
        updateTelemetryPanel(n.id);
      };

      g.addEventListener('click', activate);
      g.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });

      svg.appendChild(g);
    });
  }

  function updateTelemetryPanel(domainId) {
    const data = UNIVERSE_DATA[domainId];
    if (!data) return;

    if (panelTag) panelTag.textContent = data.tag;
    if (panelTitle) panelTitle.textContent = data.title;
    if (panelDesc) panelDesc.textContent = data.desc;

    if (panelStack) {
      panelStack.innerHTML = '';
      data.stack.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'stack-pill mono';
        span.textContent = tech;
        panelStack.appendChild(span);
      });
    }

    if (panelProjects) {
      panelProjects.innerHTML = '';
      data.projects.forEach(proj => {
        const item = document.createElement('div');
        item.className = 'universe-project-item';
        item.innerHTML = `
          <div class="upi-title">${proj.name}</div>
          <div class="upi-status mono">${proj.status}</div>
        `;
        item.addEventListener('click', () => {
          const filterBtn = document.querySelector(`.filter-btn[data-filter="${proj.filter}"]`);
          if (filterBtn) {
            filterBtn.click();
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }
        });
        panelProjects.appendChild(item);
      });
    }

    if (filterBtn) {
      const activeFilter = data.projects[0]?.filter || 'all';
      filterBtn.dataset.targetFilter = activeFilter;
      filterBtn.onclick = () => {
        const btn = document.querySelector(`.filter-btn[data-filter="${activeFilter}"]`);
        if (btn) btn.click();
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      };
    }
  }

  renderGraph();
  updateTelemetryPanel(activeDomainId);
})();
