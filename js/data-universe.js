/**
 * SAHIL KAVISHKA — THE INTELLIGENCE LAB 2.0
 * Interactive Technology Universe (10 Connected Domains)
 * Connected SVG knowledge graph linking Sahil's technical domains and verified projects.
 */

(function initDataUniverse() {
  const UNIVERSE_DATA = {
    ai: {
      id: 'ai',
      title: 'Artificial Intelligence',
      tag: 'COGNITIVE ARCHITECTURES',
      desc: 'Developing agentic workflows, multimodal generative systems, and automated decision engines that bridge mathematical algorithms with real-world client workflows.',
      stack: ['Gemini API', 'PyTorch', 'FastAPI', 'Agentic Systems', 'Deterministic Fail-safes'],
      projects: [
        { name: 'SmartBuild AI (Flagship)', status: 'Active Lab Build · 25 Districts', filter: 'ai' },
        { name: 'ResolvAI Copilot', status: 'Hutch AI Hackathon · FastAPI', filter: 'collab' },
        { name: 'Salonora AI Platform', status: 'Gemini AI Voice & Vision', filter: 'web' }
      ]
    },
    ml: {
      id: 'ml',
      title: 'Machine Learning',
      tag: 'PREDICTIVE MODELING',
      desc: 'Designing supervised, ensemble, and gradient-boosted algorithms (XGBoost, LightGBM, CatBoost) with strict cross-validation, threshold calibration, and fairness audits.',
      stack: ['Scikit-learn', 'XGBoost', 'LightGBM', 'CatBoost', 'Stratified K-Fold', 'Threshold Calibration'],
      projects: [
        { name: 'CropSafe AI (Capstone)', status: 'LightGBM 94.6% Accuracy', filter: 'ai' },
        { name: 'Clinical Readmission Predictor', status: 'Global Rank #3 🥉 Stacking', filter: 'ai' },
        { name: 'Ceylon Tourism Forecast', status: 'Random Forest Macro Regressor', filter: 'data' }
      ]
    },
    dl: {
      id: 'dl',
      title: 'Deep Learning',
      tag: 'NEURAL REPRESENTATIONS',
      desc: 'Architecting deep residual backbones, transformer fine-tuning, and compound loss functions (Charbonnier + D-SSIM) for high-fidelity restoration and nuanced classification.',
      stack: ['PyTorch', 'NAFNet-APEX', 'Hugging Face', 'BERT', 'CUDA', 'Backbone Fine-Tuning'],
      projects: [
        { name: 'Hybrid Image Denoising', status: 'IEEE Mora SP Cup 2026', filter: 'cv' },
        { name: 'Clinical Readmission Predictor', status: 'Multi-Model Ensembles', filter: 'ai' },
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
        { name: 'ResolvAI Telecom Triage', status: 'Multi-Source Resolution', filter: 'collab' }
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
        { name: 'CropSafe AI Vision', status: 'Agricultural Anomaly Detection', filter: 'ai' },
        { name: 'Sinharaja 3D Survival', status: 'Raycasting & Procedural Visuals', filter: 'cv' }
      ]
    },
    robotics: {
      id: 'robotics',
      title: 'Robotics',
      tag: 'AUTONOMOUS SYSTEMS',
      desc: 'Advancing from physical computing microcontrollers to autonomous sensor loops, edge AI inference, and future Robot Operating System (ROS) node communication.',
      stack: ['BBC Micro:bit', 'Sensors & Actuators', 'Embedded Python', 'ROS (Roadmap)', 'Edge Inference'],
      projects: [
        { name: 'HOPE 2.0 Micro:bit Sessions', status: 'IEEE WIE STEM Outreach', filter: 'all' },
        { name: 'Robotics & Edge Sensor Roadmap', status: 'Active Research Horizon', filter: 'all' }
      ]
    },
    iot: {
      id: 'iot',
      title: 'Internet of Things (IoT)',
      tag: 'CONNECTED SENSORS',
      desc: 'Deploying microcontroller telemetry, tactile sensor interaction, real-time input/output loops, and environmental monitoring grids.',
      stack: ['BBC Micro:bit', 'MicroPython', 'GPIO Telemetry', 'Sensor Matrices', 'MQTT / WebSockets'],
      projects: [
        { name: 'Physical Computing Lab', status: 'Hardware Interaction Loops', filter: 'all' },
        { name: 'Sensor Telemetry Horizon', status: 'Microcontroller Roadmap', filter: 'all' }
      ]
    },
    web: {
      id: 'web',
      title: 'Web Development',
      tag: 'SYSTEMS ARCHITECTURE',
      desc: 'Engineering responsive, high-performance web applications, 3D WebGL environments (60 FPS Three.js), and REST microservices backed by Django, FastAPI, and PHP/MySQL.',
      stack: ['FastAPI', 'Django', 'Three.js / WebGL', 'React.js', 'JavaScript (ES6+)', 'Docker'],
      projects: [
        { name: 'Sinharaja 3D WebGL', status: '60 FPS Browser Game Engine', filter: 'cv' },
        { name: 'Sports Manager', status: 'Django/MySQL Role-Based Suite', filter: 'web' },
        { name: 'Salonora AI Platform', status: 'Full-Stack PHP/MySQL + Gemini', filter: 'web' }
      ]
    },
    da: {
      id: 'da',
      title: 'Data Analytics',
      tag: 'DECISION INTELLIGENCE',
      desc: 'Structuring enterprise Star Schema dimensional models, advanced DAX measures, and interactive C-Level dashboards to model crisis supply shocks and sports performance.',
      stack: ['Power BI', 'Star Schema', 'Advanced DAX', 'SQL', 'ArcGIS Maps', 'Plotly.js'],
      projects: [
        { name: 'Medicine Supply Chain BI', status: 'Star Schema · 2020–2026', filter: 'data' },
        { name: 'ICC Champions Historical BI', status: '27-Year Sports Analytics', filter: 'data' },
        { name: 'EdTech Market Pipeline', status: 'YouTube API Automation', filter: 'data' }
      ]
    },
    ds: {
      id: 'ds',
      title: 'Data Science',
      tag: 'STATISTICAL EXPLORATION',
      desc: 'Extracting empirical ground truths from noisy multi-source datasets: stochastic modeling, Markov regime switching, Monte Carlo simulations, and macro-financial analytics.',
      stack: ['Python', 'Pandas', 'NumPy', 'SciPy', 'Monte Carlo', 'Biostatistics'],
      projects: [
        { name: 'CropSafe AI Dataset', status: '2,002 Empirical Lab Certificates', filter: 'ai' },
        { name: 'Microsoft Stock Probability', status: '40-Year Stochastic Study', filter: 'data' },
        { name: 'Ceylon Tourism Predictor', status: 'Macroeconomic Sensitivity', filter: 'data' }
      ]
    }
  };

  // Node positions on 580x480 SVG coordinate canvas (Symmetrical 10-node orbital ring)
  const NODES = [
    { id: 'ai',       x: 290, y: 65,  label: 'Artificial Intelligence',    short: 'AI / Agents' },
    { id: 'ml',       x: 393, y: 98,  label: 'Machine Learning',           short: 'Machine Learning' },
    { id: 'dl',       x: 456, y: 186, label: 'Deep Learning',              short: 'Deep Learning' },
    { id: 'nlp',      x: 456, y: 294, label: 'Natural Language Processing', short: 'NLP & LLMs' },
    { id: 'cv',       x: 393, y: 382, label: 'Computer Vision',            short: 'Computer Vision' },
    { id: 'robotics', x: 290, y: 415, label: 'Robotics',                   short: 'Robotics' },
    { id: 'iot',      x: 187, y: 382, label: 'Internet of Things',         short: 'IoT / Sensors' },
    { id: 'web',      x: 124, y: 294, label: 'Web Development',            short: 'Web Platforms' },
    { id: 'da',       x: 124, y: 186, label: 'Data Analytics',             short: 'Data Analytics' },
    { id: 'ds',       x: 187, y: 98,  label: 'Data Science',               short: 'Data Science' }
  ];

  // Interconnected network conduits (Perimeter Ring + Synergistic Cross-Conduits)
  const EDGES = [
    // Perimeter Ring
    ['ai', 'ml'],
    ['ml', 'dl'],
    ['dl', 'nlp'],
    ['nlp', 'cv'],
    ['cv', 'robotics'],
    ['robotics', 'iot'],
    ['iot', 'web'],
    ['web', 'da'],
    ['da', 'ds'],
    ['ds', 'ai'],
    // Core Cross Conduits
    ['ai', 'dl'],
    ['ai', 'nlp'],
    ['ai', 'cv'],
    ['ml', 'ds'],
    ['ml', 'da'],
    ['dl', 'cv'],
    ['cv', 'robotics'],
    ['iot', 'robotics'],
    ['web', 'ai'],
    ['ds', 'da'],
    ['web', 'cv']
  ];

  const svg = document.getElementById('universe-svg');
  if (!svg) return;

  const panelTag = document.getElementById('universe-telemetry-tag');
  const panelTitle = document.getElementById('universe-telemetry-title');
  const panelDesc = document.getElementById('universe-telemetry-desc');
  const panelStack = document.getElementById('universe-telemetry-stack');
  const panelProjects = document.getElementById('universe-telemetry-projects');
  const filterBtn = document.getElementById('universe-filter-projects-btn');

  let activeDomainId = 'ai';

  function renderGraph() {
    svg.innerHTML = '';
    const center = { x: 290, y: 240 };

    // SVG Defs: Gradients and glow filters
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.32"/>
        <stop offset="100%" stop-color="#00f0ff" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="nodeActiveGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.2"/>
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
    orbit.setAttribute('r', '175');
    orbit.setAttribute('fill', 'none');
    orbit.setAttribute('stroke', 'rgba(56, 189, 248, 0.08)');
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

    const hubCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    hubCircle.setAttribute('cx', center.x);
    hubCircle.setAttribute('cy', center.y);
    hubCircle.setAttribute('r', '24');
    hubCircle.setAttribute('fill', '#070d1d');
    hubCircle.setAttribute('stroke', '#00f0ff');
    hubCircle.setAttribute('stroke-width', '2');
    hubCircle.setAttribute('filter', 'url(#glowFilter)');
    svg.appendChild(hubCircle);

    const hubLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    hubLabel.setAttribute('x', center.x);
    hubLabel.setAttribute('y', center.y + 4);
    hubLabel.setAttribute('text-anchor', 'middle');
    hubLabel.setAttribute('fill', '#00f0ff');
    hubLabel.setAttribute('font-family', 'var(--lab-font-mono)');
    hubLabel.setAttribute('font-size', '9');
    hubLabel.setAttribute('font-weight', '700');
    hubLabel.textContent = 'CORE';
    svg.appendChild(hubLabel);

    // Edges Group
    const edgesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    edgesGroup.setAttribute('id', 'universe-edges-group');

    EDGES.forEach(([fromId, toId]) => {
      const fromNode = NODES.find(n => n.id === fromId);
      const toNode = NODES.find(n => n.id === toId);
      if (!fromNode || !toNode) return;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', fromNode.x);
      line.setAttribute('y1', fromNode.y);
      line.setAttribute('x2', toNode.x);
      line.setAttribute('y2', toNode.y);
      line.setAttribute('class', 'universe-edge');
      line.setAttribute('data-from', fromId);
      line.setAttribute('data-to', toId);
      edgesGroup.appendChild(line);
    });
    svg.appendChild(edgesGroup);

    // Nodes
    NODES.forEach(n => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'universe-node');
      g.setAttribute('data-id', n.id);
      g.setAttribute('tabindex', '0');
      g.setAttribute('role', 'button');
      g.setAttribute('aria-label', `Domain: ${n.label}`);
      g.style.transformOrigin = `${n.x}px ${n.y}px`;

      // Outer ring
      const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      ring.setAttribute('cx', n.x);
      ring.setAttribute('cy', n.y);
      ring.setAttribute('r', '20');
      ring.setAttribute('fill', '#070d1d');
      ring.setAttribute('stroke', 'rgba(56, 189, 248, 0.35)');
      ring.setAttribute('stroke-width', '1.5');
      ring.setAttribute('class', 'node-ring');
      g.appendChild(ring);

      // Inner dot
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', n.x);
      dot.setAttribute('cy', n.y);
      dot.setAttribute('r', '6');
      dot.setAttribute('fill', '#00f0ff');
      dot.setAttribute('class', 'node-dot');
      g.appendChild(dot);

      // Text label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', n.x);
      text.setAttribute('y', n.y + 32);
      text.textContent = n.short;
      g.appendChild(text);

      g.addEventListener('click', () => selectDomain(n.id));
      g.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectDomain(n.id);
        }
      });

      svg.appendChild(g);
    });

    updateVisualSelection();
  }

  function selectDomain(id) {
    if (!UNIVERSE_DATA[id]) return;
    activeDomainId = id;
    updateVisualSelection();
    updateTelemetryPanel(id);
  }

  function updateVisualSelection() {
    const nodes = svg.querySelectorAll('.universe-node');
    nodes.forEach(node => {
      const isSelected = node.getAttribute('data-id') === activeDomainId;
      node.classList.toggle('active-node', isSelected);
      const ring = node.querySelector('.node-ring');
      const dot = node.querySelector('.node-dot');
      if (isSelected) {
        ring.setAttribute('stroke', '#00f0ff');
        ring.setAttribute('stroke-width', '2.5');
        ring.setAttribute('filter', 'url(#glowFilter)');
        dot.setAttribute('r', '8');
      } else {
        ring.setAttribute('stroke', 'rgba(56, 189, 248, 0.35)');
        ring.setAttribute('stroke-width', '1.5');
        ring.removeAttribute('filter');
        dot.setAttribute('r', '6');
      }
    });

    // Update connected edges
    const edges = svg.querySelectorAll('.universe-edge');
    edges.forEach(edge => {
      const from = edge.getAttribute('data-from');
      const to = edge.getAttribute('data-to');
      const isConnected = from === activeDomainId || to === activeDomainId;
      edge.classList.toggle('active-edge', isConnected);
    });
  }

  function updateTelemetryPanel(id) {
    const data = UNIVERSE_DATA[id];
    if (!data) return;

    if (panelTag) panelTag.textContent = data.tag;
    if (panelTitle) panelTitle.textContent = data.title;
    if (panelDesc) panelDesc.textContent = data.desc;

    if (panelStack) {
      panelStack.innerHTML = '';
      data.stack.forEach(tech => {
        const pill = document.createElement('span');
        pill.className = 'telemetry-tag-pill';
        pill.textContent = tech;
        panelStack.appendChild(pill);
      });
    }

    if (panelProjects) {
      panelProjects.innerHTML = '';
      data.projects.forEach(proj => {
        const item = document.createElement('div');
        item.className = 'telemetry-project-item';
        item.innerHTML = `<span>${proj.name}</span><span class="status-indicator">${proj.status}</span>`;
        item.addEventListener('click', () => {
          jumpToExplorer(proj.filter);
        });
        panelProjects.appendChild(item);
      });
    }

    if (filterBtn) {
      filterBtn.onclick = () => {
        let filterKey = 'all';
        if (id === 'ai' || id === 'ml' || id === 'dl') filterKey = 'ai';
        else if (id === 'nlp') filterKey = 'nlp';
        else if (id === 'cv') filterKey = 'cv';
        else if (id === 'web') filterKey = 'web';
        else if (id === 'da' || id === 'ds') filterKey = 'data';
        jumpToExplorer(filterKey);
      };
    }
  }

  function jumpToExplorer(filterKey) {
    const explorerSec = document.getElementById('projects');
    if (!explorerSec) return;

    explorerSec.scrollIntoView({ behavior: 'smooth' });

    // Activate tab in Project Explorer
    const targetTab = document.querySelector(`.filter-btn[data-filter="${filterKey}"]`);
    if (targetTab) {
      targetTab.click();
    }
  }

  renderGraph();
  updateTelemetryPanel(activeDomainId);
})();
