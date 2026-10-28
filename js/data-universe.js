/**
 * SAHIL — THE INTELLIGENCE LAB
 * Interactive Data Universe (Step 4A)
 * Connected SVG knowledge graph linking Sahil's technical domains and verified projects.
 */

(function initDataUniverse() {
  const UNIVERSE_DATA = {
    ai: {
      id: 'ai',
      title: 'Artificial Intelligence',
      tag: 'COGNITIVE ARCHITECTURES',
      desc: 'Developing agentic systems, generative intelligence, and automated decision engines that bridge mathematical models with real-world client workflows.',
      stack: ['Gemini API', 'PyTorch', 'FastAPI', 'Agentic Workflows', 'Computer Vision'],
      projects: [
        { name: 'SmartBuild AI (Flagship)', status: 'In Progress · 25 Districts', filter: 'ai' },
        { name: 'codeXsabra — ResoveAI', status: 'Hutch AI Hackathon · FastAPI', filter: 'collab' }
      ]
    },
    ml: {
      id: 'ml',
      title: 'Machine Learning',
      tag: 'PREDICTIVE MODELING',
      desc: 'Designing robust supervised and ensemble algorithms — from gradient boosting (XGBoost) for regional cost estimation to tree-based customer churn classifiers.',
      stack: ['Scikit-learn', 'XGBoost', 'Random Forest', 'Cross-Validation', 'Hyperparameter Tuning'],
      projects: [
        { name: 'SmartBuild AI', status: 'CIDA Price Forecasting', filter: 'ai' },
        { name: 'AWS Customer Churn Predictor', status: 'Ensemble Modeling', filter: 'collab' },
        { name: 'Sports Tournaments System', status: 'Match Outcome Model', filter: 'ai' }
      ]
    },
    ds: {
      id: 'ds',
      title: 'Data Science',
      tag: 'STATISTICAL EXPLORATION',
      desc: 'Investigating complex distributions, feature correlation matrices, and exploratory pipelines to extract actionable ground truths from noisy multi-source datasets.',
      stack: ['Python', 'Pandas', 'NumPy', 'Jupyter', 'Scipy', 'Seaborn'],
      projects: [
        { name: 'Sri Lanka Medicine Supply Chain', status: 'Crisis Timeline Modeling', filter: 'data' },
        { name: 'SL Sports Analytics', status: 'Open Data Platform', filter: 'data' }
      ]
    },
    nlp: {
      id: 'nlp',
      title: 'Natural Language Processing',
      tag: 'LANGUAGE & SEMANTICS',
      desc: 'Architecting end-to-end NLP pipelines: tokenization, TF-IDF lexical scoring, BERT transformer fine-tuning, and live e-commerce review sentiment parsing.',
      stack: ['Hugging Face', 'BERT', 'PyTorch', 'NLTK', 'FastAPI', 'Chrome Extension API'],
      projects: [
        { name: 'Smartphone Review Sentiment', status: 'ML vs. BERT + Extension', filter: 'nlp' },
        { name: 'codeXsabra — ResoveAI', status: 'Automated Query Triage', filter: 'collab' }
      ]
    },
    bi: {
      id: 'bi',
      title: 'Data Analytics & BI',
      tag: 'DECISION INTELLIGENCE',
      desc: 'Structuring dimensional data warehouses (Star Schema) and interactive executive dashboards to track supply chain bottlenecks, currency shocks, and educational metrics.',
      stack: ['Power BI', 'Star Schema', 'SQL', 'PostgreSQL', 'YouTube API v3', 'DAX'],
      projects: [
        { name: 'Medicine Supply Chain BI', status: 'Star Schema · 2020-2026', filter: 'data' },
        { name: 'EdTech Market Pipeline', status: 'YouTube API Automation', filter: 'data' },
        { name: 'Math Quiz Analytics', status: 'Cohort Learning Dashboard', filter: 'data' }
      ]
    },
    web: {
      id: 'web',
      title: 'Web Development',
      tag: 'ENGINEERED PLATFORMS',
      desc: 'Engineering scalable, accessible web architectures, REST APIs, and 3D architectural studios (Three.js) backed by robust Django and FastAPI microservices.',
      stack: ['FastAPI', 'Django', 'Three.js', 'JavaScript (ES6+)', 'MySQL', 'Docker'],
      projects: [
        { name: 'Sports Tournaments System', status: 'Role-Based Architecture', filter: 'web' },
        { name: 'SmartBuild AI 3D Studio', status: 'Three.js CAD Generation', filter: 'ai' },
        { name: 'Salon Booking Platform', status: 'Full-Stack PHP/MySQL', filter: 'web' }
      ]
    },
    iot: {
      id: 'iot',
      title: 'Robotics & IoT Exploration',
      tag: 'PHYSICAL COMPUTING',
      desc: 'Exploring sensor telemetry, edge inference, and microcontrollers — originating from hands-on BBC Micro:bit trainer sessions toward autonomous sensor networks.',
      stack: ['BBC Micro:bit', 'Sensors & Actuators', 'Embedded Python', 'ROS (Roadmap)', 'Edge AI'],
      projects: [
        { name: 'HOPE 2.0 Physical Computing', status: 'IEEE Micro:bit STEM Outreach', filter: 'all' },
        { name: 'Robotics & Edge Sensor Horizon', status: 'Active Research Roadmap', filter: 'all' }
      ]
    }
  };

  // Node positions on 540x440 SVG coordinate canvas
  const NODES = [
    { id: 'ai',  x: 270, y: 75,  label: 'Artificial Intelligence', short: 'AI / Agents' },
    { id: 'ml',  x: 430, y: 135, label: 'Machine Learning',        short: 'Machine Learning' },
    { id: 'nlp', x: 450, y: 285, label: 'Natural Language Processing', short: 'NLP & LLMs' },
    { id: 'iot', x: 340, y: 390, label: 'Robotics & IoT',          short: 'Robotics & IoT' },
    { id: 'web', x: 190, y: 390, label: 'Web Development',         short: 'Web Platforms' },
    { id: 'bi',  x: 90,  y: 285, label: 'Data Analytics & BI',     short: 'Data & BI' },
    { id: 'ds',  x: 110, y: 135, label: 'Data Science',            short: 'Data Science' }
  ];

  // Interconnected network conduits (graph topology)
  const EDGES = [
    ['ai', 'ml'],
    ['ml', 'ds'],
    ['ml', 'nlp'],
    ['ai', 'nlp'],
    ['ds', 'bi'],
    ['bi', 'web'],
    ['web', 'ai'],
    ['web', 'iot'],
    ['ds', 'iot'],
    ['ml', 'bi']
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
    const center = { x: 270, y: 235 };

    // SVG Defs: Gradients and glow filters
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#00f0ff" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="nodeActiveGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.2"/>
      </radialGradient>
      <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3.5" result="blur" />
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

    // Central Core Glow & Hub
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

    // Edges
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
      ring.setAttribute('r', '22');
      ring.setAttribute('fill', '#070d1d');
      ring.setAttribute('stroke', 'rgba(56, 189, 248, 0.35)');
      ring.setAttribute('stroke-width', '1.5');
      ring.setAttribute('class', 'node-ring');
      g.appendChild(ring);

      // Inner dot
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', n.x);
      dot.setAttribute('cy', n.y);
      dot.setAttribute('r', '7');
      dot.setAttribute('fill', '#00f0ff');
      dot.setAttribute('class', 'node-dot');
      g.appendChild(dot);

      // Text label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', n.x);
      text.setAttribute('y', n.y + 36);
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
        dot.setAttribute('r', '9');
      } else {
        ring.setAttribute('stroke', 'rgba(56, 189, 248, 0.35)');
        ring.setAttribute('stroke-width', '1.5');
        ring.removeAttribute('filter');
        dot.setAttribute('r', '7');
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
        jumpToExplorer(id === 'iot' ? 'all' : (id === 'ds' || id === 'bi' ? 'data' : id));
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
