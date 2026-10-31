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
  'cropsafe-ai': {
    title: 'CropSafe AI — National Fertilizer Quality Intelligence & Loss Forecasting Platform',
    category: 'CAPSTONE PROJECT · AI & AGRI-TECH',
    status: 'COMPLETED · FINAL YEAR CAPSTONE II (DS3206 / DS4105)',
    problem: 'Counterfeit and adulterated agricultural fertilizer inputs threaten food security in Sri Lanka. Substandard blends containing heavy inert fillers or excessive moisture cause smallholder farmers to suffer harvest deficits exceeding 20% and severe financial losses.',
    approach: 'Ground-truthed on 2,002 empirical laboratory test certificates across all 9 provinces of Sri Lanka. Built: 1) Champion Adulterant Classifier (LightGBM) achieving 94.6% Test Accuracy with sub-2ms inference, 2) Dual Harvest & Economic Loss Regressors (Gradient Boosting, R² > 0.96) computing farm-level yield deficits (%) and monetary damage (LKR/ha), 3) Chemical & Price Anomaly Detection (Isolation Forest & LOF) flagging uncatalogued chemical compositions and black-market price arbitrage (>15% markup), and 4) Regional Demand Forecaster predicting seasonal fertilizer requisition (in Metric Tons).',
    stack: 'Python, LightGBM, Scikit-Learn, Streamlit, Plotly, Pandas, NumPy, Isolation Forest',
    contribution: 'End-to-end research, dataset curation of 2,002 certificates across 9 provinces, multi-model evaluation, feature engineering, and provincial GIS decision engine.',
    results: '94.6% Test Accuracy on fertilizer authenticity classification; R² > 0.96 on crop yield loss estimation; deployed interactive Streamlit decision dashboard.',
    github: 'https://github.com/sahilkavishka',
    live: null
  },
  'sinharaja-expedition': {
    title: 'Sinharaja — The Lost Expedition: 3D Tactical Survival Game',
    category: '3D COMPUTER GRAPHICS & WEBGL',
    status: 'ACTIVE RELEASE · 60 FPS BROWSER ENGINE',
    problem: 'Traditional educational and cultural simulation games rely on heavy desktop executables and bulky game engines (Unity/Unreal), preventing instant zero-install browser accessibility for regional environmental education.',
    approach: 'Built a browser-based, First-Person 3D Tactical Survival & Forensic Mystery Game entirely from scratch using React and Three.js (WebGL) running smoothly at 60 FPS without external game engines. Features custom procedural textures, dynamic lighting (Flashlight & UV beam), AABB/Raycasting collision physics, real-time leech blood loss & salt remediation, hypothermia management, toxic sulfur gas vents with gas mask mechanics, endemic wildlife photography with forensic field journal, procedural Web Audio API synthesis, and real-time English/Sinhala localization.',
    stack: 'React.js, Three.js, WebGL, Web Audio API, JavaScript (ES6+), HTML5, CSS3',
    contribution: 'Engineered custom procedural 3D terrain, collision physics, survival mechanics, Web Audio sound synthesis, forensic journal, and bilingual localization.',
    results: 'Smooth 60 FPS performance entirely client-side in standard web browsers; open source repository on GitHub.',
    github: 'https://github.com/sahilkavishka/sinharaja',
    live: null
  },
  'nexus-hospital-readmission': {
    title: 'Trustworthy AI: Clinical 30-Day Hospital Readmission Predictor',
    category: 'HEALTHCARE AI & BIOSTATISTICS',
    status: 'GLOBAL RANK #3 🥉 · ML & AI NEXUS 2026 HACKATHON',
    problem: 'Black-box clinical machine learning models frequently exhibit catastrophic probability miscalibration, algorithmic bias across demographic strata, and tail log-loss penalties when predicting 30-day unplanned hospital readmissions.',
    approach: 'Engineered a statistically calibrated, trustworthy AI pipeline for Team CodeWave (Aradhya Jayawardane, Sarasi Rajarathna, Pooja Anbalagan, Sahil Kavishka): 1) Evidence-based clinical feature engineering (AKI, severe anemia, cardiorenal syndrome, polypharmacy), 2) Tri-model stacking ensemble blending CatBoost (depth=5), LightGBM (leaf-wise max_depth=4), and Lasso Logistic Regression via SLSQP constrained optimization, 3) Platt Sigmoid calibration (slope ~0.99) bounding probabilities [0.0248, 0.7280], 4) Subgroup fairness audit across sex (ΔAUC = 0.0024) and hospital tiers, and 5) Selective classification using Shannon Entropy to defer ambiguous cases (top 10%) for clinical review.',
    stack: 'Python, CatBoost, LightGBM, Scikit-learn, Pandas, Kaggle, Biostatistics, Platt Scaling',
    contribution: 'Feature engineering on physiological risk markers, ensemble blending optimization, probability calibration, fairness auditing, and 2-page Model Trust Card authoring.',
    results: 'Secured 3rd Place globally on Kaggle Leaderboard (0.33400); 5-fold CV log loss: 0.3490 ± 0.0055, Brier Score: 0.1021, ROC-AUC: 0.6932.',
    github: 'https://github.com/sahilkavishka',
    live: null
  },
  'mora-sp-cup-denoise': {
    title: 'Hybrid Dual-Engine Low-Light Image Denoising (Mora SP Cup 2026)',
    category: 'COMPUTER VISION & SIGNAL PROCESSING',
    status: 'COMPETITION SUBMISSION · TEAM ZENTRIX',
    problem: 'Low-light smartphone sensors suffer from extreme analog/digital gain, introducing heavy Poisson photon-shot noise, Gaussian read noise, CFA chromatic blotching, and dark-current hot pixels.',
    approach: 'Formulated a novel Hybrid Dual-Engine Restoration Framework for Team Zentrix (Savindi Hewage, Kavisha Nimsara, Sahil Kavishka): Engine A (7-Stage Classical DSP Pipeline for CPU execution: Adaptive Rank-Order Defect Pixel Suppression, Anisotropic Diffusion, Dual-Basis DWT BayesShrink, NLM Patch-based filtering, CIE-LAB & YCrCb decoupled smoothing, Guided Filtering, Multi-scale Laplacian detail fusion) achieving +71.2% over baseline in 3.4s; Engine B (Deep Residual Backbone NAFNet-APEX v10 with 86.49M parameters, SimpleGate + SCA, compound Charbonnier + D-SSIM loss, EMA β=0.9995, and 8-fold test-time augmentation).',
    stack: 'PyTorch, Python, NAFNet, OpenCV, Scikit-Image, Classical DSP, CUDA',
    contribution: 'Architected classical DSP smoothing filters, assisted in NAFNet loss formulation, evaluated PSNR/SSIM metrics, and verified offline CPU fallback.',
    results: 'Achieved 32.42 dB PSNR and 0.9205 SSIM; Composite Score: 0.6863 (+160.6% relative gain over competition baseline).',
    github: 'https://github.com/sahilkavishka',
    live: null
  },
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
    title: 'ResolvAI — Multi-Source Resolution Copilot (IgnitX Hutch Hackathon 2026)',
    category: 'NLP & TELECOM AI · HACKATHON',
    status: 'COMPLETED · CODE X SABRA',
    problem: 'Telecom customer support desks face immense ticket triage bottlenecks when resolving complex billing discrepancies and customer complaints across multiple divergent channels.',
    approach: 'Developed as a team for IgnitX – Hutch Hackathon 2026 (organized by Hutch Sri Lanka). ResolvAI combines rule-based validation with AI-generated insights to make telecom complaint handling transparent, explainable, and automated.',
    stack: 'Python, FastAPI, Scikit-learn, NLP, Rule Engine, REST APIs',
    contribution: 'Responsible for Backend API Integration and Frontend UI, connecting core system components to support seamless communication between the rule engine, AI engine, and user interface.',
    results: 'Structured data flow enabling real-time resolution recommendation and explainable billing discrepancy verification.',
    github: 'https://github.com/kavishanimsara/codeXsabra-ResoveAI',
    live: null
  },
  'salonora': {
    title: 'Salonora — AI-Powered Salon Discovery & Appointment Management Platform',
    category: 'FULL-STACK WEB & AI AGENT',
    status: 'COMPLETED · OPEN SOURCE',
    problem: 'Finding the right personal aesthetic and coordinating salon appointments is often tedious for clients, while salon owners struggle with fragmented booking books, no-shows, and manual reception desks.',
    approach: 'Engineered a modern, AI-enhanced salon platform featuring: 1) AI Style & Beauty Studio integrated with Google Gemini AI for personalized hair styling, skincare recommendations, and real-time voice narration, 2) Real-time booking & scheduling matching clients with specialized stylists, 3) Digital QR Check-In Pass for frictionless contact-free salon reception check-in, 4) Role-Based Access Control (RBAC) with dedicated portals for salon owners and customers, 5) GPS distance sorting for nearby salons, and 6) Glassmorphism UI with light/dark theme switching.',
    stack: 'PHP (MVC Architecture), MySQL, Google Gemini API, JavaScript, HTML5, CSS3, PDO',
    contribution: 'Full-stack architecture, Gemini AI integration, QR pass generation, database schema design with parameterized PDO queries, and CSRF protection.',
    results: 'Deployed full-stack application supporting automated booking workflows, style consultations, and secure multi-role administrative portals.',
    github: 'https://github.com/sahilkavishka/salon',
    live: null
  },
  'ceylon-forecast': {
    title: 'Ceylon Forecast Engine — Sri Lanka Tourism Trend Predictor',
    category: 'PREDICTIVE ML & DATA SCIENCE',
    status: 'COMPLETED · KAGGLE & STREAMLIT',
    problem: 'Tourism is a cornerstone of Sri Lanka\'s economy, but stakeholder decision-making has historically remained reactive rather than proactive during macroeconomic disruptions and seasonal volatility.',
    approach: 'Evaluated multiple regression algorithms to forecast monthly tourist arrivals. Random Forest Regression delivered highest accuracy in capturing non-linear arrival patterns. Integrated macroeconomic indicators (LKR/USD exchange rates, Consumer Price Index inflation) to analyze traveler elasticity, discovering origin country and seasonal cyclicality as primary drivers. Deployed on Streamlit with interactive "What-If" scenario simulations and sensitivity heatmaps.',
    stack: 'Python, Pandas, Scikit-Learn, Plotly, Streamlit, Random Forest Regressor',
    contribution: 'Data collection, feature engineering of macroeconomic indicators, model benchmarking, and interactive Streamlit simulation dashboard.',
    results: 'Published open-source predictive tool with live what-if macro sensitivity sliders and seasonal heatmaps.',
    github: 'https://github.com/sahilkavishka',
    live: null
  },
  'salary-predictor-2025': {
    title: 'Sri Lanka Salary Predictor 2025',
    category: 'MACHINE LEARNING & WEB APP',
    status: 'COMPLETED · OPEN SOURCE',
    problem: 'Sri Lankan IT, engineering, and data science professionals often lack transparent, ground-truthed data on market-rate compensation across varying cities and experience levels.',
    approach: 'Trained a Random Forest model on modern Sri Lankan job market salary records. Developed an interactive Streamlit & Plotly web app allowing users to estimate monthly/annual earnings based on role, experience, industry sector, and geographical location (Colombo, Kandy, Galle, etc.) with instant downloadable report summaries.',
    stack: 'Python, Scikit-Learn, Streamlit, Plotly, Pandas',
    contribution: 'End-to-end dataset cleaning, model training, cross-validation, and Streamlit user interface.',
    results: 'Interactive estimator enabling transparent compensation benchmarks across Sri Lankan tech roles.',
    github: 'https://github.com/sahilkavishka',
    live: null
  },
  'sentiment-nlp': {
    title: 'AI Review Insight: Daraz Chrome Extension & BERT vs. Classic ML',
    category: 'NLP & DEEP LEARNING',
    status: 'COMPLETED · SHIPPED EXTENSION',
    problem: 'E-commerce buyers spend hours reading hundreds of contradictory product reviews. Standard sentiment tools fail to extract aspect-specific insights (battery, camera, build quality).',
    approach: 'Scraped thousands of smartphone reviews from GSMArena, implemented VADER automated annotation, and benchmarked Naive Bayes, SVM, and Random Forest against fine-tuned BERT (bert-base-uncased) with a custom WeightedTrainer. Packaged the system into the AI Review Insight Chrome Extension V3 featuring deep DOM lazy-load scanning on Daraz.lk, aspect-based sentiment extraction into distinct PROS and CONS tags, and SVG progress charts.',
    stack: 'PyTorch, Hugging Face Transformers, Scikit-learn, NLTK, FastAPI, Chrome Extension V3',
    contribution: 'Scraping pipeline, BERT fine-tuning, FastAPI microservice, and native Daraz-themed Chrome Extension UI.',
    results: 'Shipped working Chrome Extension extracting pros/cons in real-time from live Daraz e-commerce listings.',
    github: 'https://github.com/sahilkavishka/mini-NLP-project',
    live: null
  },
  'medicine-supply': {
    title: 'Sri Lanka Pharmaceutical Supply Chain C-Level Analytics & Simulation (2020–2026)',
    category: 'DATA WAREHOUSING & POWER BI',
    status: 'COMPLETED · ENTERPRISE BI',
    problem: 'Severe currency devaluation and import restrictions during Sri Lanka\'s 2022 economic shock created acute hospital stockouts across essential drugs (e.g. Atorvastatin, Omeprazole).',
    approach: 'Designed an enterprise-grade C-Level Power BI Analytics & Simulation Platform. Modeled LKR 57.72B in total import costs and 55.40M quantities across 2020–2026. Architected an automated Star Schema (Fact_Imports, Dim_Drugs, Dim_Suppliers, Dim_Time), built advanced DAX simulation measures for a dynamic +35% crisis cost surge, integrated ArcGIS live mapping for global supplier tracking, and evaluated local manufacturing resilience.',
    stack: 'Power BI Desktop, Advanced DAX, Star Schema Modeling, Python, SQL, ArcGIS Maps',
    contribution: 'Dimensional data modeling, star schema architecture, advanced DAX simulation formulas, and 3-page executive dashboard suite.',
    results: 'Published Kaggle dataset and open-source project visualizing correlation between currency rates and hospital medicine availability.',
    github: 'https://github.com/sahilkavishka/SL_Medicine_Supply_Chain',
    live: null
  },
  'edtech-pipeline': {
    title: 'Sri Lankan EdTech Market Intelligence Engine',
    category: 'DATA ENGINEERING & PIPELINES',
    status: 'COMPLETED · OPEN DATASET',
    problem: 'Educators and creators lack structured visibility into what drives viewer virality and educational content engagement across Sri Lanka.',
    approach: 'Constructed an end-to-end data pipeline harvesting ~894+ unique video and channel records via YouTube Data API v3. Engineered features: Content Velocity (Views/Day), Viral Multiplier, Engagement Rate %, NLP-based Medium Detection (Sinhala/English), and behavioral performance tiers. Visualized via custom dark-themed statistical suites.',
    stack: 'Python, YouTube Data API v3, Pandas, Seaborn, Matplotlib, Power BI',
    contribution: 'Data extraction pipeline, regex NLP categorization (A/L, O/L, Revision), and published open Kaggle dataset.',
    results: 'Published master dataset and analytics suite tracking regional educational content virality.',
    github: 'https://github.com/sahilkavishka/-EdTech-Analytics',
    live: null
  },
  'msft-probability': {
    title: 'Microsoft Stock Analysis Using Probability Theory (1986–2025)',
    category: 'STOCHASTIC MODELING & STATISTICS',
    status: 'COMPLETED · 40-YEAR STUDY',
    problem: 'Financial markets exhibit non-normal fat-tailed return behavior and volatility clustering that simple linear models fail to capture.',
    approach: 'Deep-dive analytical study analyzing nearly 40 years of daily Microsoft stock data. Fitted theoretical distributions (Normal, Log-Normal, Student\'s t), calculated empirical probabilities, modeled Markov state transitions between bull/bear regimes, applied Bayesian reasoning for volatility inference, and executed Monte Carlo simulations alongside VaR and CVaR risk metrics.',
    stack: 'Python, NumPy, Pandas, Matplotlib, Seaborn, SciPy, Stochastic Calculus',
    contribution: 'Statistical distribution fitting, Markov transition matrix formulation, Bayesian volatility estimation, and Monte Carlo trajectory simulation.',
    results: 'Identified regime-switching momentum patterns and quantified extreme downside risk metrics across four decades of market history.',
    github: 'https://github.com/sahilkavishka',
    live: null
  },
  'icc-champions-trophy': {
    title: 'ICC Champions Trophy Historical Insights Dashboard (1998–2025)',
    category: 'SPORTS ANALYTICS & POWER BI',
    status: 'COMPLETED · INTERACTIVE BI',
    problem: 'Sports enthusiasts and broadcasters struggle to evaluate historical tournament dominance, head-to-head dynamics, and venue performance over multi-decade spans.',
    approach: 'Constructed an end-to-end Power BI dashboard analyzing historical match records from 1998 to 2025. Built dynamic DAX measures for an Overall Dominance Tracker, an automated Head-to-Head Dominator KPI card, a multi-decade Team Batting Strength trend line, a Player of the Match leaderboard, and an interactive Venue Popularity treemap.',
    stack: 'Power BI Desktop, DAX Logic, Data Modeling, Sports Analytics',
    contribution: 'Data hygiene, DAX metric engineering, hierarchical data modeling, and user-centric dashboard UI.',
    results: 'Interactive dashboard delivering sub-second slice-and-dice insights across 27 years of international tournament cricket.',
    github: 'https://github.com/sahilkavishka',
    live: null
  },
  'sports-tournaments': {
    title: 'MatchPoint — Full-Stack Sports Tournaments Platform',
    category: 'FULL-STACK WEB & ML',
    status: 'ACTIVE · PRODUCTION',
    problem: 'Sports tournament organizers, teams, and fans lack a unified platform for fixture scheduling, team registrations, score reporting, and interactive match predictions.',
    approach: 'Engineered a full-stack platform using Django and MySQL with role-based access control, OTP-based secure authentication, dynamic tournament search/filtering, and interactive engagement features (likes and comments) for teams and spectators.',
    stack: 'Python, Django, JavaScript, HTML5, CSS3, Bootstrap, MySQL, SQLite',
    contribution: 'Full-stack engineering: schema design, OTP verification system, RBAC authorization, and match prediction integration.',
    results: 'Operational multi-role tournament management suite with secure role segmentation.',
    github: 'https://github.com/sahilkavishka',
    live: null
  },
  'quiz-analytics': {
    title: 'Math Quiz Analytics Dashboard',
    category: 'DATA ANALYTICS & WEB',
    status: 'COMPLETED · EDUCATIONAL SUITE',
    problem: 'Standard timed quiz systems display raw percentage scores, hiding granular topic-level deficits and preventing educators from delivering targeted remediation.',
    approach: 'Constructed an educator dashboard analyzing timed quiz submissions. Built cohort score distributions, automated skill-gap detection by topic (algebra vs geometry), and student leaderboard rankings using Plotly.js.',
    stack: 'HTML5/JS, Plotly.js, SQL, Python',
    contribution: 'Topic breakdown algorithms, cohort visualization metrics, and educator summary views.',
    results: 'Enabled educators to diagnose exact conceptual deficiencies rather than relying on aggregate marks.',
    github: 'https://github.com/sahilkavishka',
    live: null
  },
  'data-mining-rules': {
    title: 'Market Basket & Association Rule Mining Pipeline',
    category: 'DATA MINING & TRANSACTIONS',
    status: 'RESEARCH & PRODUCTION PIPELINE',
    problem: 'Retail transaction datasets contain thousands of item combinations, making it difficult to uncover consumer co-purchasing affinities and high-value bundle recommendations manually.',
    approach: 'Implemented an algorithmic association rule mining pipeline in Python 3.13 using MLxtend. Extracted frequent itemsets via Apriori and computed high-lift association rules with confidence threshold >= 0.70 to discover strong antecedent-consequent purchasing signals.',
    stack: 'Python 3.13, MLxtend, Apriori Algorithm, Pandas, NumPy, Jupyter Notebook',
    contribution: 'Designed the end-to-end transaction ETL pipeline, metric threshold calibration (support, confidence, lift), and actionable association rule extraction.',
    results: 'Extracted high-confidence rules (confidence > 0.70, lift up to 1.71) identifying strong complementary product demand for inventory and bundling optimization.',
    github: 'https://github.com/sahilkavishka',
    live: null
  },
  'aws-churn': {
    title: 'AWS Customer Churn Predictor',
    category: 'DATA SCIENCE & CLOUD ML',
    status: 'COMPLETED · CLOUD READY',
    problem: 'Telecom and enterprise service providers incur severe revenue losses when customer churn is discovered reactively rather than proactively.',
    approach: 'Developed a cloud-integrated predictive pipeline utilizing usage velocity features, ensemble tree algorithms (XGBoost, Random Forest), and containerized Flask microservice deployment.',
    stack: 'AWS, Python, XGBoost, Flask, Scikit-Learn, Random Forest',
    contribution: 'Feature engineering on rolling consumption metrics, model benchmarking, and Flask deployment scripts.',
    results: 'Substantial accuracy gains over linear baselines through velocity feature extraction.',
    github: 'https://github.com/Dilharajay/churn_predictor',
    live: null
  },
  'smartbuild-agentic': {
    title: 'Field Note: What "Agentic" Actually Means in a Construction Estimator',
    category: 'RESEARCH DISPATCH // ARCHITECTURE',
    status: 'TECHNICAL FIELD NOTE 01',
    problem: 'When building an automated construction cost & loan advisory engine, naive LLM implementations attempt to compute complex financial schedules and material costs inside an open-ended conversational prompt, causing catastrophic hallucination in critical budget figures.',
    approach: 'Decoupled into strict deterministic microservices: financial underwriting runs on a 45% Debt-Service Ratio matrix and S-curve cash flows; material forecasting runs on an XGBoost regressor; and the Gemini AI agent acts exclusively as a bilingual civil engineering explanation layer referencing verified structured outputs.',
    stack: 'FastAPI, Gemini API, Python, XGBoost, Docker, REST Protocol',
    contribution: 'Architectural separation of concerns, prompt grounding protocols, and fail-safe deterministic fallbacks.',
    results: 'Eliminated calculation variance; guaranteed 100% compliance with banking Debt-Service guidelines while retaining natural conversational explanation.',
    github: 'https://github.com/sahilkavishka/smartbuild_ai',
    live: null
  },
  'sentiment-benchmarks': {
    title: 'Field Note: Classic ML vs. Fine-Tuned BERT on 10,000+ Reviews',
    category: 'RESEARCH DISPATCH // NLP BENCHMARKS',
    status: 'TECHNICAL FIELD NOTE 02',
    problem: 'Transformer architectures like BERT offer state-of-the-art semantic comprehension but incur substantial GPU memory footprints and 150ms+ inference latency, making direct deployment on edge devices or lightweight browser extensions prohibitively expensive.',
    approach: 'Evaluated TF-IDF + Logistic Regression, Random Forest, and fine-tuned BERT across scraped GSMArena device reviews. Benchmarked inference latency, F1-macro scores on colloquial expressions, and memory footprints to define when transformer overhead is mathematically justified.',
    stack: 'PyTorch, Hugging Face Transformers, Scikit-learn, FastAPI, Chrome Extension',
    contribution: 'Scraping pipeline, data cleaning, transformer fine-tuning, latency benchmarking, and Chrome extension delivery.',
    results: 'Demonstrated that classic ensembles achieve within 3.2% of transformer accuracy on unambiguous reviews at 1/14th the latency, whereas BERT proved necessary for negation-dense sentences.',
    github: 'https://github.com/sahilkavishka/mini-NLP-project',
    live: null
  },
  'medicine-starschema': {
    title: 'Field Note: Designing a Star Schema to Survive Hospital Emergency Queries',
    category: 'RESEARCH DISPATCH // DATA WAREHOUSING',
    status: 'TECHNICAL FIELD NOTE 03',
    problem: 'During macroeconomic disruptions and currency volatility in Sri Lanka, pharmaceutical supply chains faced multi-district stockouts. Disjointed Excel records and disparate import databases prevented healthcare planners from spotting shortages before clinics ran empty.',
    approach: 'Constructed an automated dimensional Star Schema with fact tables capturing import volumes, foreign exchange fluctuations (USD/LKR), and hospital demand velocity across all administrative provinces.',
    stack: 'Power BI, Python, Star Schema Modeling, SQL, ETL Pipelines',
    contribution: 'Data modeling, schema design, currency volatility normalization, and executive dashboard development.',
    results: 'Reduced critical reporting queries from hours across multiple spreadsheets to interactive sub-second slice-and-dice visualizations in Power BI.',
    github: 'https://github.com/sahilkavishka/SL_Medicine_Supply_Chain',
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

  document.querySelectorAll('[data-inspect-id], [data-dispatch-id]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const id = trigger.getAttribute('data-inspect-id') || trigger.getAttribute('data-dispatch-id');
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

  // Field Operations Photo Lightbox Modal
  const galleryOverlay = document.getElementById('gallery-lightbox-overlay');
  const galleryImg = document.getElementById('lightbox-img');
  const galleryTitle = document.getElementById('lightbox-title');
  const galleryLoc = document.getElementById('lightbox-loc');
  const galleryDesc = document.getElementById('lightbox-desc');
  const galleryClose = document.getElementById('lightbox-close-btn');

  function openLightbox(src, title, loc, desc) {
    if (!galleryOverlay) return;
    if (galleryImg) galleryImg.src = src;
    if (galleryTitle) galleryTitle.textContent = title;
    if (galleryLoc) galleryLoc.textContent = loc;
    if (galleryDesc) galleryDesc.textContent = desc;
    galleryOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!galleryOverlay) return;
    galleryOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-gallery-src]').forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-gallery-src');
      const title = card.getAttribute('data-gallery-title') || '';
      const loc = card.getAttribute('data-gallery-loc') || '';
      const desc = card.getAttribute('data-gallery-desc') || '';
      openLightbox(src, title, loc, desc);
    });
  });

  if (galleryClose) galleryClose.addEventListener('click', closeLightbox);
  if (galleryOverlay) {
    galleryOverlay.addEventListener('click', (e) => {
      if (e.target === galleryOverlay) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && galleryOverlay && galleryOverlay.classList.contains('open')) {
      closeLightbox();
    }
  });

  // Project Video Demonstration Lightbox Modal
  const videoOverlay = document.getElementById('video-modal-overlay');
  const videoPlayer = document.getElementById('lab-video-player');
  const videoSource = document.getElementById('lab-video-source');
  const videoTitle = document.getElementById('video-modal-title');
  const videoClose = document.getElementById('video-modal-close-btn');

  function openVideoModal(src, title) {
    if (!videoOverlay || !videoPlayer) return;
    if (videoTitle) videoTitle.textContent = title || 'Project Demonstration Video';
    if (videoSource) videoSource.src = src;
    videoPlayer.load();
    videoOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    videoPlayer.play().catch(() => {});
  }

  function closeVideoModal() {
    if (!videoOverlay || !videoPlayer) return;
    videoPlayer.pause();
    videoOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-video-src]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const src = btn.getAttribute('data-video-src');
      const title = btn.getAttribute('data-video-title');
      openVideoModal(src, title);
    });
  });

  if (videoClose) videoClose.addEventListener('click', closeVideoModal);
  if (videoOverlay) {
    videoOverlay.addEventListener('click', (e) => {
      if (e.target === videoOverlay) closeVideoModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoOverlay && videoOverlay.classList.contains('open')) {
      closeVideoModal();
    }
  });

  // Expedition Category Filtering
  const expFilterBtns = document.querySelectorAll('[data-exp-filter]');
  const expCards = document.querySelectorAll('.expeditions-gallery-grid .expedition-card');

  if (expFilterBtns.length > 0) {
    expFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        expFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-exp-filter');

        expCards.forEach(card => {
          const category = card.getAttribute('data-exp-category') || '';
          if (filter === 'all' || category === filter) {
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
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
        await navigator.clipboard.writeText('https://sahilkavishka.me/');
        showToast('Portfolio URL copied to clipboard (sahilkavishka.me)');
      } catch (err) {
        showToast('URL: sahilkavishka.me');
      }
    });
  }

  // Hero Download CV Button
  const heroCvBtn = document.getElementById('hero-cv-btn');
  if (heroCvBtn) {
    heroCvBtn.addEventListener('click', () => {
      showToast('Initiating download: Sahil_Kavishka_CV.pdf');
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
        'TITLE:BSc (Hons) Data Science Undergraduate & AI Developer',
        'ORG:Department of Data Science, Faculty of Computing, Sabaragamuwa University of Sri Lanka',
        'TEL;TYPE=CELL,VOICE:+94705739193',
        'EMAIL;TYPE=PREF,INTERNET:sahilkavishka428@gmail.com',
        'EMAIL;TYPE=ACADEMIC,INTERNET:22cds0428@ms.sab.ac.lk',
        'URL:https://sahilkavishka.me/',
        'URL;TYPE=GitHub:https://github.com/sahilkavishka',
        'URL;TYPE=LinkedIn:https://www.linkedin.com/in/sahilkavishka',
        'URL;TYPE=Kaggle:https://www.kaggle.com/sahilkavishkakumara',
        'ADR;TYPE=HOME:;;Pahamunegama, Galadivulwewa, Nochchiyagama;Anuradhapura;;50200;Sri Lanka',
        'NOTE:BSc (Hons) Data Science at SUSL. Secretary of Society of Computer Sciences. Exploring AI, Machine Learning, Computer Vision, and Intelligent Systems.',
        'BDAY:--1203',
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

  // Mobile Navigation Drawer Toggle & Accessibility
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const primaryNav = document.getElementById('primary-nav');
  if (mobileMenuBtn && primaryNav) {
    const toggleMobileMenu = (force) => {
      const isOpen = typeof force === 'boolean' ? force : !mobileMenuBtn.classList.contains('menu-open');
      mobileMenuBtn.classList.toggle('menu-open', isOpen);
      primaryNav.classList.toggle('menu-open', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Close when clicking nav links or dropdown links
    primaryNav.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => toggleMobileMenu(false));
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!primaryNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        toggleMobileMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('menu-open')) {
        toggleMobileMenu(false);
        mobileMenuBtn.focus();
      }
    });
  }

  // Navigation Dropdown Interaction (Touch / Mobile Friendly)
  const dropdownItem = document.querySelector('.nav-dropdown-item');
  const dropdownTrigger = document.querySelector('.nav-dropdown-trigger');
  if (dropdownItem && dropdownTrigger) {
    dropdownTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = dropdownItem.classList.toggle('dropdown-open');
      dropdownTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
      if (!dropdownItem.contains(e.target)) {
        dropdownItem.classList.remove('dropdown-open');
        dropdownTrigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // State-Aware Sticky Header Fallback (Modern Web Guidance polyfill pattern)
  const siteHeader = document.getElementById('site-header');
  if (siteHeader) {
    const updateStuckState = () => {
      siteHeader.classList.toggle('is-stuck', window.scrollY > 10);
    };
    window.addEventListener('scroll', updateStuckState, { passive: true });
    updateStuckState();
  }

  // Scroll-Spy for Navigation Links (Supports Core Links & Dropdown Items)
  const navLinks = document.querySelectorAll('.lab-nav .nav-link[href^="#"], .nav-dropdown-menu .dropdown-link[href^="#"]');
  const sections = Array.from(navLinks).map(link => {
    const targetId = link.getAttribute('href');
    return targetId && targetId !== '#top' ? document.querySelector(targetId) : null;
  }).filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          let activeInsideDropdown = false;
          navLinks.forEach(link => {
            const isMatch = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active-link', isMatch);
            if (isMatch && link.classList.contains('dropdown-link')) {
              activeInsideDropdown = true;
            }
          });
          if (dropdownTrigger) {
            dropdownTrigger.classList.toggle('active-link', activeInsideDropdown);
          }
        }
      });
    }, { rootMargin: '-30% 0px -50% 0px', threshold: 0 });

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
    { title: 'Download Curriculum Vitae (CV / Resume)', sub: 'Official verified PDF document (Sahil_Kavishka_CV.pdf)', tag: 'PDF', action: () => { const a = document.createElement('a'); a.href = './Sahil_Kavishka_CV.pdf'; a.download = 'Sahil_Kavishka_CV.pdf'; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.click(); showToast('Downloading Sahil Kavishka CV (PDF)...'); } },
    { title: 'Interactive Data Universe', sub: 'Explore connections between technical domains', tag: 'NAV', action: () => document.getElementById('universe').scrollIntoView({ behavior: 'smooth' }) },
    { title: 'Experimental Project Explorer', sub: 'Filter and inspect verified technical systems', tag: 'NAV', action: () => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }) },
    { title: 'SmartBuild AI (Flagship Project)', sub: 'Three.js 2D/3D CAD & XGBoost price forecasting', tag: 'INSPECT', action: () => window.open('https://github.com/sahilkavishka/smartbuild_ai', '_blank') },
    { title: 'Mini AI Laboratory — NLP Engine', sub: 'Test in-browser text sentiment and emotion vectors', tag: 'DEMO', action: () => document.getElementById('laboratory').scrollIntoView({ behavior: 'smooth' }) },
    { title: 'Mini AI Laboratory — 2D Classifier', sub: 'Plot coordinates and inspect ML decision boundaries', tag: 'DEMO', action: () => { document.getElementById('laboratory').scrollIntoView({ behavior: 'smooth' }); document.querySelector('[data-demo-target="demo-classifier"]').click(); } },
    { title: 'Inside the Model (ML Lifecycle)', sub: 'Explore stages from problem formulation to serving', tag: 'LIFECYCLE', action: () => document.getElementById('lifecycle').scrollIntoView({ behavior: 'smooth' }) },
    { title: 'Exploration Log & Robotics Roadmap', sub: 'Current experiments and physical computing goals', tag: 'NAV', action: () => document.getElementById('log').scrollIntoView({ behavior: 'smooth' }) },
    { title: 'About Sahil & Capabilities', sub: 'Data science undergraduate background and tools', tag: 'NAV', action: () => document.getElementById('about').scrollIntoView({ behavior: 'smooth' }) },
    { title: 'Engineering Journey Timeline', sub: 'Full-stack web to predictive data science & AI platforms', tag: 'NAV', action: () => document.querySelector('.journey-timeline')?.scrollIntoView({ behavior: 'smooth' }) },
    { title: 'Workstation Toolkit', sub: 'Daily operational software, IDEs, and tools', tag: 'NAV', action: () => document.querySelector('.toolkit-grid')?.scrollIntoView({ behavior: 'smooth' }) },
    { title: 'Research Dispatches & Notes', sub: 'Technical field notes on architecture and benchmarks', tag: 'NAV', action: () => document.getElementById('dispatches')?.scrollIntoView({ behavior: 'smooth' }) },
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
