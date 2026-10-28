/**
 * SAHIL — THE INTELLIGENCE LAB
 * Main Coordinator & Interactive Systems
 * ML Lifecycle Stepper, Project Explorer Filtering, Deep-Dive Modal,
 * Command Palette, Timezone Telemetry, and Accessibility Helpers.
 */

// ===================================================================
// STEP 4D: MACHINE LEARNING LIFECYCLE CONTROLLER
// ===================================================================
const ML_LIFECYCLE_STAGES = [
  {
    step: '01',
    name: 'Problem Formulation',
    tag: 'STAGE 01 // OBJECTIVE MAPPING',
    heading: 'Translating Real Constraints Into Quantifiable Loss Functions',
    narrative: 'Every AI project in the lab starts not with a model, but with defining the decision boundary and performance metrics that matter. We map business, financial, or engineering bottlenecks into mathematical optimization objectives.',
    caseTag: 'REAL CASE STUDY · SMARTBUILD AI',
    caseText: 'In residential construction, material costs differ drastically across Sri Lanka’s 25 districts due to distance from Colombo supply ports. Rather than optimizing a generic national mean squared error, we partitioned regional error thresholds to prevent drastic under-bidding on cement and steel.',
    codeFilename: 'objective_formulation.py',
    codeSnippet: `# Define loss penalty with asymmetric under-estimation risk
def custom_construction_loss(y_true, y_pred):
    residuals = y_true - y_pred
    # Under-estimating construction cost is 2.5x more punitive for homebuilders
    penalty = np.where(residuals > 0, residuals * 2.5, np.abs(residuals))
    return np.mean(penalty ** 2)`
  },
  {
    step: '02',
    name: 'Data Ingestion',
    tag: 'STAGE 02 // MULTI-SOURCE TELEMETRY',
    heading: 'Automated Harvesting, Scraping & Multi-Source Auditing',
    narrative: 'Data rarely arrives clean. We engineer pipelines that collect data from APIs, scrape unstructured web resources (e.g. GSMArena reviews), and ingest governmental supply registries into structured staging schemas.',
    caseTag: 'REAL CASE STUDY · EDTECH & REVIEWS',
    caseText: 'Engineered an automated data pipeline using the YouTube Data API v3 to track view velocity, channel authority, and engagement metrics across Sri Lankan educational creators, feeding an automated reporting warehouse.',
    codeFilename: 'telemetry_ingestion.py',
    codeSnippet: `# YouTube API v3 automated channel telemetry extraction
async def fetch_channel_velocity(channel_id: str, api_key: str):
    url = f"https://www.googleapis.com/youtube/v3/channels?part=statistics&id={channel_id}&key={api_key}"
    async with httpx.AsyncClient() as client:
        res = await client.get(url)
        stats = res.json()["items"][0]["statistics"]
        return {
            "channel_id": channel_id,
            "views": int(stats["viewCount"]),
            "subscribers": int(stats["subscriberCount"]),
            "video_count": int(stats["videoCount"])
        }`
  },
  {
    step: '03',
    name: 'Preprocessing',
    tag: 'STAGE 03 // DATA HYGIENE & NORMALIZATION',
    heading: 'Cleaning, Imputation & Macroeconomic Shocks Alignment',
    narrative: 'Raw data contains noise, missing intervals, and anomalies. We audit distributions, handle null records with domain-specific imputation, and align divergent timelines into unified temporal dimensions.',
    caseTag: 'REAL CASE STUDY · MEDICINE SUPPLY CHAIN BI',
    caseText: 'During Sri Lanka’s 2022 economic crisis, hospital stockouts surged alongside rapid USD/LKR depreciation. Aligning three disparate public health datasets onto a single harmonized date and district key was essential before any modeling could begin.',
    codeFilename: 'crisis_data_alignment.py',
    codeSnippet: `# Harmonize date dimensions and forward-fill currency shock values
def align_supply_time_series(df_hospital, df_forex):
    df_merged = pd.merge(df_hospital, df_forex, on="record_date", how="left")
    # Forward-fill weekend forex rates to match daily hospital stock records
    df_merged["usd_lkr_rate"] = df_merged["usd_lkr_rate"].ffill()
    df_merged["stockout_flag"] = (df_merged["days_of_supply"] < 3).astype(int)
    return df_merged`
  },
  {
    step: '04',
    name: 'Feature Engineering',
    tag: 'STAGE 04 // LATENT FEATURE EXTRACTION',
    heading: 'Transforming Raw Variables Into Discriminative Vectors',
    narrative: 'Model accuracy is bound by feature quality. We engineer non-linear combinations, distance-to-hub metrics, TF-IDF lexical distributions, and time-decay velocity features that expose latent patterns.',
    caseTag: 'REAL CASE STUDY · CHURN & NLP ENGINES',
    caseText: 'In customer churn modeling, raw usage count was weak; transforming it into a rolling 30-day velocity drop ratio provided an 18% lift in tree split purity for tree-based ensemble classifiers.',
    codeFilename: 'feature_engineering.py',
    codeSnippet: `# Calculate consumption acceleration and drop-off ratios
def engineer_churn_features(df):
    df["usage_velocity_30d"] = df["usage_current_month"] / (df["usage_prior_month"] + 1e-5)
    df["ticket_escalation_ratio"] = df["high_priority_tickets"] / (df["total_tickets"] + 1)
    df["is_declining_user"] = (df["usage_velocity_30d"] < 0.65).astype(int)
    return df`
  },
  {
    step: '05',
    name: 'Model Architecture',
    tag: 'STAGE 05 // ALGORITHM SELECTION',
    heading: 'Ensembles vs. Deep Transformers — Benchmarking Trade-offs',
    narrative: 'We avoid default assumptions. Instead, we benchmark lightweight classical models (Logistic Regression, Random Forest, XGBoost) against fine-tuned deep learning architectures (PyTorch BERT).',
    caseTag: 'REAL CASE STUDY · ML VS. BERT SENTIMENT',
    caseText: 'Compared traditional classifiers against fine-tuned BERT on scraped GSMArena reviews. Classical ML delivered sub-5ms inference suitable for real-time Chrome extensions, while BERT excelled on ambiguous nuanced reviews.',
    codeFilename: 'model_benchmark.py',
    codeSnippet: `# XGBoost Regressor with early stopping on regional price variance
xgb_model = xgb.XGBRegressor(
    n_estimators=600,
    learning_rate=0.03,
    max_depth=5,
    subsample=0.85,
    colsample_bytree=0.8,
    eval_metric="rmse"
)
xgb_model.fit(X_train, y_train, eval_set=[(X_val, y_val)], verbose=False)`
  },
  {
    step: '06',
    name: 'Validation & Evaluation',
    tag: 'STAGE 06 // ERROR ANALYSIS & RIGOR',
    heading: 'Beyond Accuracy — Precision, Recall, Residuals & Bias',
    narrative: 'A single accuracy figure hides blind spots. We audit confusion matrices, evaluate stratified k-fold splits, examine residual distributions, and test models against out-of-distribution edge cases.',
    caseTag: 'REAL CASE STUDY · RESOLVEAI & BANKING DSR',
    caseText: 'In ResoveAI telecom triage, false negatives on urgent connectivity tickets carried heavy customer churn penalties. We calibrated probability thresholds to maximize recall on critical categories.',
    codeFilename: 'validation_audit.py',
    codeSnippet: `# Threshold calibration for high-recall operational constraint
from sklearn.metrics import classification_report, precision_recall_curve

precisions, recalls, thresholds = precision_recall_curve(y_true, y_probs)
# Select lowest threshold where recall exceeds 95%
optimal_threshold = thresholds[np.argmax(recalls >= 0.95)]
y_pred_calibrated = (y_probs >= optimal_threshold).astype(int)`
  },
  {
    step: '07',
    name: 'Deployment & Telemetry',
    tag: 'STAGE 07 // SERVING & CONTINUOUS MONITORING',
    heading: 'Shipping Fast, Containerized Inference to Real Users',
    narrative: 'A model is only valuable when integrated into a production surface. We containerize models with Docker, serve endpoints with FastAPI, and package client interfaces (web apps, Chrome extensions, BI dashboards).',
    caseTag: 'REAL CASE STUDY · EXTENSION & FASTAPI',
    caseText: 'Shipped a live Chrome extension that runs sentiment analysis on Daraz.lk reviews in real time, communicating with a lightweight FastAPI inference backend running sub-50ms inference.',
    codeFilename: 'fastapi_inference_service.py',
    codeSnippet: `# Lightweight FastAPI inference endpoint
@app.post("/api/v1/predict/sentiment")
async def predict_sentiment(payload: ReviewPayload):
    tokens = preprocess_text(payload.text)
    prediction = inference_engine.predict(tokens)
    return {
        "polarity": prediction.score,
        "label": prediction.label,
        "latency_ms": prediction.duration_ms
    }`
  }
];

(function initLifecycleStepper() {
  const stepperTabsWrap = document.getElementById('lifecycle-stepper-tabs');
  const tagEl = document.getElementById('lifecycle-display-tag');
  const headingEl = document.getElementById('lifecycle-display-heading');
  const narrativeEl = document.getElementById('lifecycle-display-narrative');
  const caseTagEl = document.getElementById('lifecycle-case-tag');
  const caseTextEl = document.getElementById('lifecycle-case-text');
  const filenameEl = document.getElementById('lifecycle-code-filename');
  const snippetEl = document.getElementById('lifecycle-code-snippet');

  if (!stepperTabsWrap) return;

  stepperTabsWrap.innerHTML = '';
  ML_LIFECYCLE_STAGES.forEach((stage, idx) => {
    const tab = document.createElement('button');
    tab.className = 'lifecycle-step-tab';
    tab.setAttribute('type', 'button');
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
    tab.setAttribute('data-index', idx);
    tab.innerHTML = `
      <span class="step-tab-num mono">${stage.step} //</span>
      <span class="step-tab-name">${stage.name}</span>
    `;

    tab.addEventListener('click', () => {
      document.querySelectorAll('.lifecycle-step-tab').forEach(t => t.setAttribute('aria-selected', 'false'));
      tab.setAttribute('aria-selected', 'true');
      displayStage(stage);
    });

    stepperTabsWrap.appendChild(tab);
  });

  function displayStage(stage) {
    if (tagEl) tagEl.textContent = stage.tag;
    if (headingEl) headingEl.textContent = stage.heading;
    if (narrativeEl) narrativeEl.textContent = stage.narrative;
    if (caseTagEl) caseTagEl.textContent = stage.caseTag;
    if (caseTextEl) caseTextEl.textContent = stage.caseText;
    if (filenameEl) filenameEl.textContent = stage.codeFilename;
    if (snippetEl) snippetEl.textContent = stage.codeSnippet;
  }

  // Initial stage
  displayStage(ML_LIFECYCLE_STAGES[0]);
})();


// ===================================================================
// STEP 4B: EXPERIMENTAL PROJECT EXPLORER & DEEP DIVE MODAL
// ===================================================================
const DETAILED_PROJECTS = {
  'smartbuild-ai': {
    title: 'SmartBuild AI — Construction Intelligence Platform',
    category: 'AI & MACHINE LEARNING · FLAGSHIP',
    status: 'IN PROGRESS · 25 DISTRICTS',
    problem: 'Residential home builders in Sri Lanka suffer from unpredictable material price inflation, manual quantity surveying discrepancies, and high loan rejection rates due to misaligned debt-service-ratio (DSR) documentation.',
    approach: 'Engineered an integrated AI architecture combining: 1) A 2D/3D procedural architectural studio in Three.js, 2) A computer-vision floor-plan analyzer, 3) CIDA-indexed Bill of Quantities (BoQ) with XGBoost price forecasting across all 25 districts, and 4) A bilingual (Sinhala/English) civil engineering consultant powered by Gemini API.',
    stack: 'Python, FastAPI, XGBoost, Three.js, TailwindCSS, Gemini API, Docker',
    contribution: 'Architected the core system, built the XGBoost regional price forecasting model, and implemented the multi-bank 45% DSR loan eligibility matrix comparing BOC, Commercial Bank, HNB, Sampath, and NSB.',
    results: 'Model accounts for regional port distance non-linearities across all 25 administrative districts; currently testing CV floor-plan wall detection.',
    github: 'https://github.com/sahilkavishka/smartbuild_ai',
    live: null
  },
  'resove-ai': {
    title: 'codeXsabra — ResoveAI',
    category: 'NLP & TEAM COLLABORATION · HACKATHON',
    status: 'COMPLETED · HUTCH AI FINALIST',
    problem: 'Telecom customer support desks face immense ticket triage bottlenecks when routing multilingual, non-standard customer inquiries across billing, network outages, and technical complaints.',
    approach: 'Constructed an automated NLP triage microservice with text preprocessing, TF-IDF / PyTorch token categorization, priority urgency scoring, and automated routing exposed via FastAPI endpoints.',
    stack: 'NLP, FastAPI, PyTorch, Scikit-Learn, Hutch AI, Python',
    contribution: 'Led the NLP text categorization engine, feature pipeline, and FastAPI inference microservice integration within the hackathon team.',
    results: 'Delivered rapid categorization of simulated telecom inquiry datasets with real-time routing recommendations.',
    github: 'https://github.com/kavishanimsara/codeXsabra-ResoveAI',
    live: null
  },
  'aws-churn': {
    title: 'AWS Customer Churn Predictor',
    category: 'DATA SCIENCE & CLOUD ML · COLLABORATIVE',
    status: 'COMPLETED · CLOUD READY',
    problem: 'Telecom and SaaS providers lose significant annual recurring revenue when at-risk accounts are identified too late to intervene effectively.',
    approach: 'Engineered an end-to-end cloud-native predictive pipeline utilizing data cleansing, feature transformation (usage velocity), tree-based ensemble models (XGBoost, Random Forest), and AWS-compatible Flask serving.',
    stack: 'AWS, Python, XGBoost, Flask, Scikit-Learn, Random Forest',
    contribution: 'Feature engineering, model hyperparameter tuning, cross-validation benchmarking between Random Forest and XGBoost, and cloud deployment pipelines.',
    results: 'Demonstrated substantial accuracy improvement over baseline models via rolling consumption velocity features.',
    github: 'https://github.com/Dilharajay/churn_predictor',
    live: null
  },
  'sports-tournaments': {
    title: 'Sports Tournaments Management & Prediction System',
    category: 'FULL-STACK WEB & ML',
    status: 'ACTIVE · WEBSOCKET UPGRADE',
    problem: 'Sports leagues struggle with fragmented tournament coordination — managing fixtures, multi-role participant permissions, live scores, and spectator engagement on one platform.',
    approach: 'Developed a comprehensive role-based web platform (organizers, players, spectators) with Django and MySQL, integrating an ML match-outcome prediction model exposed over a REST API.',
    stack: 'Django, MySQL, Scikit-learn, JavaScript (ES6+), AJAX, Python',
    contribution: 'Solo full-stack engineering: schema design, multi-role permission enforcement at the API layer, prediction model training, and ongoing migration from AJAX polling to WebSockets.',
    results: 'Successfully handled tournament fixtures and match prediction data with verified permission separation.',
    github: 'https://github.com/sahilkavishka?tab=repositories&q=tournament',
    live: null
  },
  'sentiment-nlp': {
    title: 'Smartphone Review Sentiment: Classic ML vs. BERT',
    category: 'NLP & DEEP LEARNING',
    status: 'COMPLETED · SHIPPED EXTENSION',
    problem: 'Understanding whether complex deep learning architectures (BERT) justify their inference latency over traditional ML models when scoring e-commerce customer product reviews.',
    approach: 'Scraped GSMArena reviews, trained and benchmarked Naive Bayes, SVM, and Random Forest against fine-tuned BERT (PyTorch / Hugging Face). Packaged the model into a live Chrome extension that evaluates Daraz.lk reviews in the user’s browser.',
    stack: 'PyTorch, Hugging Face, Scikit-learn, NLTK, FastAPI, Chrome Extension API',
    contribution: 'End-to-end architecture: dataset harvesting, model training and benchmarking, FastAPI inference backend, and Chrome Manifest V3 extension development.',
    results: 'Shipped a working Chrome extension; established that classic ML achieves sub-10ms latency for real-time browser triage while BERT delivers superior accuracy on ambiguous syntax.',
    github: 'https://github.com/sahilkavishka/mini-NLP-project',
    live: null
  },
  'medicine-supply': {
    title: 'Sri Lanka Medicine Supply Chain BI',
    category: 'DATA SCIENCE & ANALYTICS',
    status: 'COMPLETED · STAR SCHEMA',
    problem: 'The 2022 Sri Lankan economic crisis severely strained pharmaceutical supply lines, creating acute hospital stockouts compounded by volatile USD/LKR currency exchange rates.',
    approach: 'Engineered a dimensional data warehouse using a Star Schema, harmonizing three inconsistent governmental and public records onto a single date/district dimension, paired with an executive Power BI analytics dashboard.',
    stack: 'Power BI, Python, Star Schema, SQL, Pandas',
    contribution: 'Data hygiene pipelines in Python, dimensional star schema architecture, and interactive Power BI drill-down dashboards spanning 2020 through 2026.',
    results: 'Unified divergent data sources to isolate critical correlation periods between currency devaluation and regional hospital stockout spikes.',
    github: 'https://github.com/sahilkavishka/SL_Medicine_Supply_Chain',
    live: null
  },
  'edtech-pipeline': {
    title: 'EdTech Market Intelligence Pipeline',
    category: 'DATA ENGINEERING & ANALYTICS',
    status: 'COMPLETED · AUTOMATED',
    problem: 'Educational content providers lack structured visibility into market engagement velocity, channel authority, and audience retention patterns in regional digital education.',
    approach: 'Constructed an automated data pipeline querying the YouTube Data API v3 to harvest metrics on view velocity, channel authority, and topic traction, persisting structured outputs into Power BI dashboards.',
    stack: 'Python, YouTube API v3, Pandas, Power BI',
    contribution: 'Automated data engineering pipeline, scheduled refresh jobs, engagement velocity calculations, and Power BI report design.',
    results: 'Replaced manual metric tracking with an automated pipeline highlighting high-velocity regional educational topics.',
    github: 'https://github.com/sahilkavishka/-EdTech-Analytics',
    live: null
  },
  'quiz-analytics': {
    title: 'Math Quiz Analytics Dashboard',
    category: 'DATA ANALYTICS & WEB',
    status: 'COMPLETED',
    problem: 'Raw exam percentages obscure specific learning deficiencies, preventing educators from identifying precise skill gaps across student cohorts.',
    approach: 'Created an educator analytics platform for timed quizzes featuring cohort distribution analysis, skill-gap detection by mathematical topic, and real-time student leaderboards.',
    stack: 'HTML5/CSS3, JavaScript, Plotly.js, SQL, Python',
    contribution: 'Built topic breakdown algorithms, cohort visualization metrics using Plotly, and educator reporting views.',
    results: 'Enabled educators to diagnose whether poor quiz scores stemmed from algebra vs. geometry deficits rather than simple aggregate percentages.',
    github: 'https://github.com/sahilkavishka?tab=repositories&q=quiz',
    live: null
  },
  'salon-system': {
    title: 'Salon Booking & Management System',
    category: 'FULL-STACK WEB',
    status: 'COMPLETED · PRODUCTION',
    problem: 'Small salon businesses frequently struggle with appointment double-booking, manual client records, and lack of administrative overview.',
    approach: 'Built a full-stack appointment scheduling and client management system with role separation for administrators and customers, backed by relational MySQL schemas.',
    stack: 'PHP, MySQL, JavaScript, HTML5/CSS3',
    contribution: 'Solo full-stack development: database normalization, session authentication, calendar booking logic, and administration dashboard.',
    results: 'Successfully deployed and utilized for managing real small-business appointment workflows.',
    github: 'https://github.com/sahilkavishka/salon',
    live: null
  },
  'sl-sports-analytics': {
    title: 'SL Sports Analytics Platform',
    category: 'DATA SCIENCE & OPEN DATA',
    status: 'PLANNING · OPEN SOURCE',
    problem: 'Sri Lankan athletic and sports statistics largely remain trapped inside broadcast graphics rather than being organized into accessible open-source datasets for researchers.',
    approach: 'Designing an open Sri Lankan sports repository with standardized schemas, statistical exploration notebooks, and baseline prediction models.',
    stack: 'Python, Pandas, Plotly, Open Data Standards',
    contribution: 'Project conceptualization, schema definition, and data scraping roadmap.',
    results: 'Repository initialized for community data curation and predictive modeling benchmarks.',
    github: 'https://github.com/sahilkavishka',
    live: null
  }
};

(function initProjectExplorer() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('project-search');
  const cards = document.querySelectorAll('.project-card');
  const noResultsMsg = document.getElementById('no-projects-msg');

  let activeFilter = 'all';

  function applyFilters() {
    const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach(card => {
      const cats = (card.getAttribute('data-category') || '').split(' ');
      const text = card.textContent.toLowerCase();

      const matchesCat = activeFilter === 'all' || cats.includes(activeFilter);
      const matchesSearch = !query || text.includes(query);

      const isVisible = matchesCat && matchesSearch;
      card.classList.toggle('hide', !isVisible);
      if (isVisible) visibleCount++;
    });

    if (noResultsMsg) {
      noResultsMsg.classList.toggle('show', visibleCount === 0);
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      activeFilter = btn.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  // Project Inspection Modal (Deep Dive)
  const modalOverlay = document.getElementById('project-modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalCat = document.getElementById('modal-cat');
  const modalProblem = document.getElementById('modal-problem');
  const modalApproach = document.getElementById('modal-approach');
  const modalStack = document.getElementById('modal-stack');
  const modalContribution = document.getElementById('modal-contribution');
  const modalResults = document.getElementById('modal-results');
  const modalGithubLink = document.getElementById('modal-github-link');

  function openInspectionModal(projectId) {
    const data = DETAILED_PROJECTS[projectId];
    if (!data || !modalOverlay) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalCat) modalCat.textContent = `${data.category} · [${data.status}]`;
    if (modalProblem) modalProblem.textContent = data.problem;
    if (modalApproach) modalApproach.textContent = data.approach;
    if (modalStack) modalStack.textContent = data.stack;
    if (modalContribution) modalContribution.textContent = data.contribution;
    if (modalResults) modalResults.textContent = data.results;

    if (modalGithubLink) {
      modalGithubLink.href = data.github;
      modalGithubLink.style.display = data.github ? 'inline-flex' : 'none';
    }

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeInspectionModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-inspect-id]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const id = trigger.getAttribute('data-inspect-id');
      openInspectionModal(id);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeInspectionModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeInspectionModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeInspectionModal();
    }
  });
})();


// ===================================================================
// COMMAND PALETTE, SHORTCUTS, THEME & SYSTEM UTILITIES
// ===================================================================
(function initSystemUtilities() {
  const root = document.documentElement;

  // Day/Night Theme Persistence
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('sahil-lab-theme');
  if (savedTheme === 'day') {
    root.setAttribute('data-theme', 'day');
    if (themeToggle) themeToggle.textContent = '◑';
  } else if (!savedTheme && window.matchMedia('(prefers-color-scheme: light)').matches) {
    root.setAttribute('data-theme', 'day');
    if (themeToggle) themeToggle.textContent = '◑';
  }

  function toggleTheme() {
    const isDay = root.getAttribute('data-theme') === 'day';
    if (isDay) {
      root.removeAttribute('data-theme');
      localStorage.setItem('sahil-lab-theme', 'night');
      if (themeToggle) themeToggle.textContent = '◐';
      showToast('Theme: Dark Research Environment');
    } else {
      root.setAttribute('data-theme', 'day');
      localStorage.setItem('sahil-lab-theme', 'day');
      if (themeToggle) themeToggle.textContent = '◑';
      showToast('Theme: Technical Daylight Mode');
    }
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  // Sinhala / English Toggle
  const langToggle = document.getElementById('lang-toggle');
  let currentLang = localStorage.getItem('sahil-lab-lang') || 'en';

  function applyLanguage(lang) {
    currentLang = lang;
    root.setAttribute('lang', lang);
    document.querySelectorAll('[data-en][data-si]').forEach(el => {
      el.innerHTML = lang === 'si' ? el.getAttribute('data-si') : el.getAttribute('data-en');
    });
    if (langToggle) {
      langToggle.textContent = lang === 'si' ? 'සිං' : 'EN';
      langToggle.setAttribute('title', lang === 'si' ? 'Switch to English' : 'Switch to Sinhala');
    }
    localStorage.setItem('sahil-lab-lang', lang);
  }

  applyLanguage(currentLang);
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      applyLanguage(currentLang === 'si' ? 'en' : 'si');
      showToast(`Language: ${currentLang === 'si' ? 'සිංහල (Sinhala)' : 'English'}`);
    });
  }

  // Toast System
  const toastRegion = document.getElementById('toast-region');
  function showToast(msg) {
    if (!toastRegion) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="color:var(--lab-cyan);font-family:var(--lab-font-mono)">[SYS]</span> <span>${msg}</span>`;
    toastRegion.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }
  window.showLabToast = showToast;

  // Copy Email Address
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('sahilkavishka428@gmail.com');
        showToast('Email copied to clipboard (sahilkavishka428@gmail.com)');
      } catch (err) {
        showToast('Contact: sahilkavishka428@gmail.com');
      }
    });
  }

  // Copy Portfolio URL
  const copyUrlBtn = document.getElementById('copy-url-btn');
  if (copyUrlBtn) {
    copyUrlBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('https://sahilkavishka.github.io/portfolio/');
        showToast('Portfolio URL copied to clipboard');
      } catch (err) {
        showToast('URL: sahilkavishka.github.io/portfolio/');
      }
    });
  }

  // Export vCard (.vcf)
  const saveContactBtn = document.getElementById('save-vcard-btn');
  if (saveContactBtn) {
    saveContactBtn.addEventListener('click', () => {
      const vcard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'N:Kavishka;Sahil;;;',
        'FN:Sahil Kavishka',
        'TITLE:BSc (Hons) Data Science Undergraduate',
        'ORG:Sabaragamuwa University of Sri Lanka',
        'EMAIL;TYPE=INTERNET:sahilkavishka428@gmail.com',
        'URL:https://sahilkavishka.github.io/portfolio/',
        'URL;TYPE=GitHub:https://github.com/sahilkavishka',
        'URL;TYPE=LinkedIn:https://www.linkedin.com/in/sahilkavishka',
        'ADR;TYPE=WORK:;;Anuradhapura;;;;Sri Lanka',
        'NOTE:Exploring AI, machine learning, language, and intelligent systems.',
        'END:VCARD'
      ].join('\n');

      const blob = new Blob([vcard], { type: 'text/vcard' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sahil-kavishka.vcf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast('Contact card (vCard) exported');
    });
  }

  // Quick Message Form -> Mailto
  const contactForm = document.getElementById('quick-msg-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('msg-name').value.trim();
      const reason = document.getElementById('msg-reason').value;
      const body = document.getElementById('msg-body').value.trim();
      if (!name || !body) return;

      const subject = encodeURIComponent(`[Intelligence Lab] Inquiry: ${reason} from ${name}`);
      const mailBody = encodeURIComponent(`${body}\n\n— Sent by ${name} via Intelligence Lab`);
      window.location.href = `mailto:sahilkavishka428@gmail.com?subject=${subject}&body=${mailBody}`;
      showToast('Opening default email client…');
    });
  }

  // Live Local Clocks (Anuradhapura, Sri Lanka GMT+5:30)
  const heroClock = document.getElementById('hero-clock');
  const footerClock = document.getElementById('footer-clock');

  function updateClocks() {
    try {
      const fmt = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Colombo',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      const nowStr = fmt.format(new Date());
      if (heroClock) heroClock.textContent = `${nowStr} (GMT+5:30)`;
      if (footerClock) footerClock.textContent = `${nowStr} (Asia/Colombo)`;
    } catch (e) {
      /* fallback */
    }
  }
  updateClocks();
  setInterval(updateClocks, 1000);

  // Scroll Progress & Back to Top
  const progressBar = document.getElementById('lab-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const maxScroll = h.scrollHeight - h.clientHeight;

    if (progressBar) {
      progressBar.style.width = maxScroll > 0 ? `${(scrolled / maxScroll) * 100}%` : '0%';
    }

    if (backToTopBtn) {
      backToTopBtn.classList.toggle('show', scrolled > 500);
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Scroll-Spy for Navigation Links
  const navLinks = document.querySelectorAll('.lab-nav .nav-link[href^="#"]');
  const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active-link', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    sections.forEach(sec => observer.observe(sec));
  }

  // Reveal-On-Scroll Animations
  const revealElements = document.querySelectorAll('.reveal-up');
  if ('IntersectionObserver' in window && revealElements.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('in'));
  }

  // Dynamic GitHub Repos Count
  fetch('https://api.github.com/users/sahilkavishka')
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(data => {
      if (data && typeof data.public_repos === 'number') {
        const repoEls = document.querySelectorAll('.github-repo-count');
        repoEls.forEach(el => { el.textContent = data.public_repos; });
      }
    })
    .catch(() => { /* preserve static fallback */ });

  // Command Palette (Ctrl+K)
  const paletteOverlay = document.getElementById('palette-overlay');
  const paletteInput = document.getElementById('palette-input');
  const paletteList = document.getElementById('palette-list');
  const paletteOpenBtns = document.querySelectorAll('.palette-trigger');

  const PALETTE_ENTRIES = [
    { title: 'Interactive Data Universe', sub: 'Explore connections between technical domains', tag: 'NAV', action: () => document.getElementById('universe').scrollIntoView({ behavior: 'smooth' }) },
    { title: 'Experimental Project Explorer', sub: 'Filter and inspect verified technical systems', tag: 'NAV', action: () => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }) },
    { title: 'SmartBuild AI (Flagship Project)', sub: 'Three.js 2D/3D CAD & XGBoost price forecasting', tag: 'INSPECT', action: () => window.open('https://github.com/sahilkavishka/smartbuild_ai', '_blank') },
    { title: 'Mini AI Laboratory — NLP Engine', sub: 'Test in-browser text sentiment and emotion vectors', tag: 'DEMO', action: () => document.getElementById('laboratory').scrollIntoView({ behavior: 'smooth' }) },
    { title: 'Mini AI Laboratory — 2D Classifier', sub: 'Plot coordinates and inspect ML decision boundaries', tag: 'DEMO', action: () => { document.getElementById('laboratory').scrollIntoView({ behavior: 'smooth' }); document.querySelector('[data-demo-target="demo-classifier"]').click(); } },
    { title: 'Inside the Model (ML Lifecycle)', sub: 'Explore stages from problem formulation to serving', tag: 'LIFECYCLE', action: () => document.getElementById('lifecycle').scrollIntoView({ behavior: 'smooth' }) },
    { title: 'Exploration Log & Robotics Roadmap', sub: 'Current experiments and physical computing goals', tag: 'NAV', action: () => document.getElementById('log').scrollIntoView({ behavior: 'smooth' }) },
    { title: 'About Sahil & Capabilities', sub: 'Data science undergraduate background and tools', tag: 'NAV', action: () => document.getElementById('about').scrollIntoView({ behavior: 'smooth' }) },
    { title: 'Toggle Dark / Day Theme', sub: 'Switch visual appearance', tag: 'THEME', action: toggleTheme },
    { title: 'Switch Language (English / සිංහල)', sub: 'Toggle bilingual hero text', tag: 'LANG', action: () => langToggle && langToggle.click() },
    { title: 'Export Contact Card (vCard)', sub: 'Download sahil-kavishka.vcf', tag: 'EXPORT', action: () => saveContactBtn && saveContactBtn.click() },
    { title: 'Copy Direct Email Address', sub: 'sahilkavishka428@gmail.com', tag: 'COPY', action: () => copyEmailBtn && copyEmailBtn.click() },
    { title: 'GitHub Profile', sub: 'github.com/sahilkavishka', tag: 'EXT', action: () => window.open('https://github.com/sahilkavishka', '_blank') },
    { title: 'LinkedIn Profile', sub: 'linkedin.com/in/sahilkavishka', tag: 'EXT', action: () => window.open('https://www.linkedin.com/in/sahilkavishka', '_blank') },
    { title: 'Kaggle Profile', sub: 'kaggle.com/sahilkavishkakumara', tag: 'EXT', action: () => window.open('https://www.kaggle.com/sahilkavishkakumara', '_blank') }
  ];

  let filteredPalette = [...PALETTE_ENTRIES];
  let activeIndex = 0;

  function renderPalette() {
    if (!paletteList) return;
    const q = (paletteInput ? paletteInput.value : '').trim().toLowerCase();
    filteredPalette = PALETTE_ENTRIES.filter(e => !q || e.title.toLowerCase().includes(q) || e.sub.toLowerCase().includes(q));
    activeIndex = 0;

    paletteList.innerHTML = '';
    if (filteredPalette.length === 0) {
      paletteList.innerHTML = '<div style="padding:1.5rem;text-align:center;color:var(--lab-text-muted);font-size:0.9rem">No matching commands found.</div>';
      return;
    }

    filteredPalette.forEach((item, i) => {
      const row = document.createElement('div');
      row.className = `palette-row ${i === 0 ? 'active' : ''}`;
      row.innerHTML = `
        <div>
          <div class="pi-title">${item.title}</div>
          <div class="pi-sub">${item.sub}</div>
        </div>
        <span class="pi-tag">${item.tag}</span>
      `;
      row.addEventListener('click', () => {
        closePalette();
        item.action();
      });
      paletteList.appendChild(row);
    });
  }

  function openPalette() {
    if (!paletteOverlay) return;
    paletteOverlay.classList.add('open');
    if (paletteInput) {
      paletteInput.value = '';
      renderPalette();
      setTimeout(() => paletteInput.focus(), 20);
    }
  }

  function closePalette() {
    if (paletteOverlay) paletteOverlay.classList.remove('open');
  }

  paletteOpenBtns.forEach(btn => btn.addEventListener('click', openPalette));
  if (paletteOverlay) {
    paletteOverlay.addEventListener('click', (e) => {
      if (e.target === paletteOverlay) closePalette();
    });
  }

  if (paletteInput) {
    paletteInput.addEventListener('input', renderPalette);
    paletteInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, filteredPalette.length - 1);
        updateActivePaletteRow();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, 0);
        updateActivePaletteRow();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredPalette[activeIndex]) {
          closePalette();
          filteredPalette[activeIndex].action();
        }
      } else if (e.key === 'Escape') {
        closePalette();
      }
    });
  }

  function updateActivePaletteRow() {
    const rows = paletteList.querySelectorAll('.palette-row');
    rows.forEach((r, idx) => {
      r.classList.toggle('active', idx === activeIndex);
    });
  }

  // Global Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    const tag = (document.activeElement && document.activeElement.tagName) || '';
    const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';

    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      paletteOverlay && paletteOverlay.classList.contains('open') ? closePalette() : openPalette();
    } else if (e.key === '/' && !isTyping) {
      e.preventDefault();
      const projSearch = document.getElementById('project-search');
      if (projSearch) {
        projSearch.focus();
        projSearch.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else if (e.key === 'Escape') {
      closePalette();
    }
  });
})();
