/**
 * SAHIL KAVISHKA — DATA INTELLIGENCE STUDIO
 * UI Visualizer Controllers, High-DPI Canvas Charts & Interactive Playgrounds
 */

(function () {
  'use strict';

  // Wait for DOM & DataScienceStudio
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.DataScienceStudio) return;

    initStudioTabs();
    initDataVizStudio();
    initMLPlayground();
    initEDALab();
    initDataStories();
    initResearchBenchmarks();
    // Trigger canvas redraw on tab changes
    document.querySelectorAll('.demo-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 60);
      });
    });
  });

  // ===================================================================
  // 1. DATA VISUALIZATION STUDIO CONTROLLER
  // ===================================================================
  function initDataVizStudio() {
    const datasetSelect = document.getElementById('viz-dataset-select');
    const chartTypeSelect = document.getElementById('viz-chart-type');
    const xAxisSelect = document.getElementById('viz-x-axis');
    const yAxisSelect = document.getElementById('viz-y-axis');
    const canvas = document.getElementById('viz-studio-canvas');
    const statN = document.getElementById('viz-stat-n');
    const statMean = document.getElementById('viz-stat-mean');
    const statMedian = document.getElementById('viz-stat-median');
    const statStd = document.getElementById('viz-stat-std');
    const statCorr = document.getElementById('viz-stat-corr');
    const statSkew = document.getElementById('viz-stat-skew');
    const insightText = document.getElementById('viz-dynamic-insight');

    if (!canvas || !datasetSelect) return;
    const ctx = canvas.getContext('2d');

    function populateAxisSelectors() {
      const currentDataset = window.DataScienceStudio.DATASETS[datasetSelect.value];
      if (!currentDataset) return;

      const numCols = currentDataset.columns.filter(c => c.type === 'numeric');
      
      xAxisSelect.innerHTML = '';
      yAxisSelect.innerHTML = '';

      numCols.forEach((col, idx) => {
        const optX = document.createElement('option');
        optX.value = col.name;
        optX.textContent = col.label;
        if (idx === 0) optX.selected = true;
        xAxisSelect.appendChild(optX);

        const optY = document.createElement('option');
        optY.value = col.name;
        optY.textContent = col.label;
        if (idx === 1 || (idx === 0 && numCols.length === 1)) optY.selected = true;
        yAxisSelect.appendChild(optY);
      });
    }

    function renderCurrentVisualization() {
      const datasetKey = datasetSelect.value;
      const chartType = chartTypeSelect.value;
      const dataset = window.DataScienceStudio.DATASETS[datasetKey];
      if (!dataset) return;

      const xCol = xAxisSelect.value;
      const yCol = yAxisSelect.value;
      const xColDef = dataset.columns.find(c => c.name === xCol) || dataset.columns[0];
      const yColDef = dataset.columns.find(c => c.name === yCol) || dataset.columns[1];

      const xVals = dataset.data.map(d => d[xCol]).filter(v => typeof v === 'number');
      const yVals = dataset.data.map(d => d[yCol]).filter(v => typeof v === 'number');

      // Update Statistical Indicators
      const MS = window.DataScienceStudio.MathStats;
      if (statN) statN.textContent = xVals.length;
      if (statMean) statMean.textContent = `${MS.mean(yVals).toFixed(1)} ${yColDef.unit || ''}`;
      if (statMedian) statMedian.textContent = `${MS.median(yVals).toFixed(1)} ${yColDef.unit || ''}`;
      if (statStd) statStd.textContent = `±${MS.stdDev(yVals).toFixed(1)}`;
      if (statSkew) statSkew.textContent = `${MS.skewness(yVals).toFixed(2)}`;
      
      const corr = MS.pearsonCorrelation(xVals, yVals);
      if (statCorr) {
        statCorr.textContent = `r = ${corr}`;
        statCorr.className = Math.abs(corr) > 0.6 ? 'mono stat-highlight positive' : 'mono stat-highlight';
      }

      if (insightText) {
        const relStrength = Math.abs(corr) > 0.75 ? 'very strong' : Math.abs(corr) > 0.4 ? 'moderate' : 'weak';
        const direction = corr > 0 ? 'positive' : 'inverse';
        insightText.textContent = `Observed ${relStrength} ${direction} correlation (r = ${corr}) between ${xColDef.label} and ${yColDef.label} across ${xVals.length} empirical records.`;
      }

      // Prepare Canvas (High-DPI crisp rendering)
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const parentW = canvas.parentElement ? canvas.parentElement.clientWidth : 700;
      const w = rect.width > 0 ? rect.width : (parentW || 700);
      const h = rect.height > 0 ? rect.height : 420;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.resetTransform && ctx.resetTransform();
      ctx.scale(dpr, dpr);
      const pad = { top: 40, right: 30, bottom: 50, left: 65 };
      const plotW = w - pad.left - pad.right;
      const plotH = h - pad.top - pad.bottom;

      ctx.clearRect(0, 0, w, h);

      // Background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = pad.top + (plotH / 5) * i;
        ctx.beginPath();
        ctx.moveTo(pad.left, y);
        ctx.lineTo(w - pad.right, y);
        ctx.stroke();

        const x = pad.left + (plotW / 5) * i;
        ctx.beginPath();
        ctx.moveTo(x, pad.top);
        ctx.lineTo(x, h - pad.bottom);
        ctx.stroke();
      }

      if (chartType === 'scatter') {
        drawScatterPlot(ctx, xVals, yVals, dataset.data, xCol, yCol, xColDef, yColDef, pad, plotW, plotH, w, h);
      } else if (chartType === 'trend') {
        drawTrendPlot(ctx, xVals, yVals, xColDef, yColDef, pad, plotW, plotH, w, h);
      } else if (chartType === 'histogram') {
        drawHistogram(ctx, yVals, yColDef, pad, plotW, plotH, w, h);
      } else if (chartType === 'box') {
        drawBoxPlot(ctx, yVals, yColDef, pad, plotW, plotH, w, h);
      } else if (chartType === 'heatmap') {
        drawHeatmap(ctx, dataset, pad, plotW, plotH, w, h);
      }
    }

    // Chart Render Helpers
    function drawScatterPlot(ctx, xVals, yVals, rawData, xCol, yCol, xColDef, yColDef, pad, plotW, plotH, w, h) {
      const minX = Math.min(...xVals);
      const maxX = Math.max(...xVals);
      const minY = Math.min(...yVals);
      const maxY = Math.max(...yVals);
      const spanX = maxX - minX || 1;
      const spanY = maxY - minY || 1;

      // OLS Regression Trendline
      const reg = window.DataScienceStudio.MathStats.linearRegression(xVals, yVals);
      const x1 = pad.left;
      const y1 = h - pad.bottom - ((reg.predict(minX) - minY) / spanY) * plotH;
      const x2 = pad.left + plotW;
      const y2 = h - pad.bottom - ((reg.predict(maxX) - minY) / spanY) * plotH;

      ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, Math.max(pad.top, Math.min(h - pad.bottom, y1)));
      ctx.lineTo(x2, Math.max(pad.top, Math.min(h - pad.bottom, y2)));
      ctx.stroke();
      ctx.setLineDash([]);

      // Scatter Points
      rawData.forEach(d => {
        const vx = d[xCol];
        const vy = d[yCol];
        if (typeof vx !== 'number' || typeof vy !== 'number') return;
        const px = pad.left + ((vx - minX) / spanX) * plotW;
        const py = h - pad.bottom - ((vy - minY) / spanY) * plotH;

        // Glow
        const radGrad = ctx.createRadialGradient(px, py, 1, px, py, 8);
        radGrad.addColorStop(0, 'rgba(0, 229, 255, 0.9)');
        radGrad.addColorStop(1, 'rgba(41, 121, 255, 0)');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();

        // Core Point
        ctx.fillStyle = '#00e5ff';
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Axis labels
      drawAxes(ctx, pad, plotW, plotH, w, h, xColDef.label, yColDef.label, minX, maxX, minY, maxY);
    }

    function drawTrendPlot(ctx, xVals, yVals, xColDef, yColDef, pad, plotW, plotH, w, h) {
      const minX = Math.min(...xVals);
      const maxX = Math.max(...xVals);
      const minY = Math.min(...yVals);
      const maxY = Math.max(...yVals);
      const spanX = maxX - minX || 1;
      const spanY = maxY - minY || 1;

      // Sort points by X
      const pairs = xVals.map((x, i) => ({ x, y: yVals[i] })).sort((a, b) => a.x - b.x);

      // Area fill
      ctx.beginPath();
      ctx.moveTo(pad.left, h - pad.bottom);
      pairs.forEach(p => {
        const px = pad.left + ((p.x - minX) / spanX) * plotW;
        const py = h - pad.bottom - ((p.y - minY) / spanY) * plotH;
        ctx.lineTo(px, py);
      });
      ctx.lineTo(pad.left + plotW, h - pad.bottom);
      ctx.closePath();
      const fillGrad = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom);
      fillGrad.addColorStop(0, 'rgba(0, 229, 255, 0.25)');
      fillGrad.addColorStop(1, 'rgba(0, 229, 255, 0.01)');
      ctx.fillStyle = fillGrad;
      ctx.fill();

      // Line
      ctx.beginPath();
      pairs.forEach((p, idx) => {
        const px = pad.left + ((p.x - minX) / spanX) * plotW;
        const py = h - pad.bottom - ((p.y - minY) / spanY) * plotH;
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      drawAxes(ctx, pad, plotW, plotH, w, h, xColDef.label, yColDef.label, minX, maxX, minY, maxY);
    }

    function drawHistogram(ctx, vals, colDef, pad, plotW, plotH, w, h) {
      const min = Math.min(...vals);
      const max = Math.max(...vals);
      const binsCount = 8;
      const binWidth = (max - min) / binsCount || 1;
      const bins = new Array(binsCount).fill(0);

      vals.forEach(v => {
        const b = Math.min(binsCount - 1, Math.floor((v - min) / binWidth));
        bins[b]++;
      });

      const maxFreq = Math.max(...bins, 1);
      const barPlotW = plotW / binsCount;

      bins.forEach((freq, idx) => {
        const barH = (freq / maxFreq) * plotH;
        const bx = pad.left + idx * barPlotW + 4;
        const by = h - pad.bottom - barH;
        const barActualW = barPlotW - 8;

        const grad = ctx.createLinearGradient(0, by, 0, h - pad.bottom);
        grad.addColorStop(0, 'rgba(0, 229, 255, 0.85)');
        grad.addColorStop(1, 'rgba(41, 121, 255, 0.3)');
        ctx.fillStyle = grad;
        ctx.fillRect(bx, by, barActualW, barH);

        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 1;
        ctx.strokeRect(bx, by, barActualW, barH);

        // Value text
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        if (freq > 0) ctx.fillText(freq, bx + barActualW / 2, by - 6);
      });

      drawAxes(ctx, pad, plotW, plotH, w, h, `${colDef.label} (Bins)`, 'Observation Frequency', min, max, 0, maxFreq);
    }

    function drawBoxPlot(ctx, vals, colDef, pad, plotW, plotH, w, h) {
      const q = window.DataScienceStudio.MathStats.quantiles(vals);
      const min = q.min;
      const max = q.max;
      const span = max - min || 1;

      const toY = val => h - pad.bottom - ((val - min) / span) * plotH;

      const cx = pad.left + plotW / 2;
      const bw = 100;

      // Whiskers line
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, toY(q.lowerFence > min ? q.lowerFence : min));
      ctx.lineTo(cx, toY(q.q1));
      ctx.moveTo(cx, toY(q.q3));
      ctx.lineTo(cx, toY(q.upperFence < max ? q.upperFence : max));
      ctx.stroke();

      // Whisker caps
      ctx.beginPath();
      ctx.moveTo(cx - 30, toY(q.lowerFence > min ? q.lowerFence : min));
      ctx.lineTo(cx + 30, toY(q.lowerFence > min ? q.lowerFence : min));
      ctx.moveTo(cx - 30, toY(q.upperFence < max ? q.upperFence : max));
      ctx.lineTo(cx + 30, toY(q.upperFence < max ? q.upperFence : max));
      ctx.stroke();

      // Box (Q1 to Q3)
      const topY = toY(q.q3);
      const boxHeight = toY(q.q1) - topY;
      const grad = ctx.createLinearGradient(0, topY, 0, topY + boxHeight);
      grad.addColorStop(0, 'rgba(0, 229, 255, 0.35)');
      grad.addColorStop(1, 'rgba(41, 121, 255, 0.2)');
      ctx.fillStyle = grad;
      ctx.fillRect(cx - bw / 2, topY, bw, boxHeight);
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - bw / 2, topY, bw, boxHeight);

      // Median line
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - bw / 2, toY(q.median));
      ctx.lineTo(cx + bw / 2, toY(q.median));
      ctx.stroke();

      // Outliers
      vals.filter(v => v < q.lowerFence || v > q.upperFence).forEach(outlier => {
        const oy = toY(outlier);
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(cx, oy, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.stroke();
      });

      // Labels on box
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`Q3: ${q.q3}`, cx + bw / 2 + 15, toY(q.q3) + 4);
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`Median: ${q.median}`, cx + bw / 2 + 15, toY(q.median) + 4);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`Q1: ${q.q1}`, cx + bw / 2 + 15, toY(q.q1) + 4);
      ctx.fillText(`IQR: ${q.iqr}`, cx + bw / 2 + 15, toY(q.median) + 20);

      drawAxes(ctx, pad, plotW, plotH, w, h, 'Distribution Quartiles', colDef.label, 0, 1, min, max);
    }

    function drawHeatmap(ctx, dataset, pad, plotW, plotH, w, h) {
      const numCols = dataset.columns.filter(c => c.type === 'numeric');
      const n = numCols.length;
      if (n < 2) return;

      const cellSize = Math.min(plotW, plotH) / n;
      const startX = pad.left + (plotW - cellSize * n) / 2;
      const startY = pad.top + (plotH - cellSize * n) / 2;

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const v1 = dataset.data.map(d => d[numCols[i].name]);
          const v2 = dataset.data.map(d => d[numCols[j].name]);
          const r = i === j ? 1.0 : window.DataScienceStudio.MathStats.pearsonCorrelation(v1, v2);

          const cellX = startX + j * cellSize;
          const cellY = startY + i * cellSize;

          // Color calculation
          let fill = 'rgba(255, 255, 255, 0.05)';
          if (r > 0) {
            fill = `rgba(0, 229, 255, ${Math.max(0.1, r * 0.85)})`;
          } else {
            fill = `rgba(239, 68, 68, ${Math.max(0.1, Math.abs(r) * 0.85)})`;
          }

          ctx.fillStyle = fill;
          ctx.fillRect(cellX + 2, cellY + 2, cellSize - 4, cellSize - 4);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.strokeRect(cellX + 2, cellY + 2, cellSize - 4, cellSize - 4);

          ctx.fillStyle = '#ffffff';
          ctx.font = '11px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(r.toFixed(2), cellX + cellSize / 2, cellY + cellSize / 2 + 4);
        }

        // Header labels
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(numCols[i].name.split('_')[0], startX + i * cellSize + cellSize / 2, startY - 8);
        ctx.textAlign = 'right';
        ctx.fillText(numCols[i].name.split('_')[0], startX - 8, startY + i * cellSize + cellSize / 2 + 4);
      }
    }

    function drawAxes(ctx, pad, plotW, plotH, w, h, labelX, labelY, minX, maxX, minY, maxY) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(pad.left, pad.top);
      ctx.lineTo(pad.left, h - pad.bottom);
      ctx.lineTo(w - pad.right, h - pad.bottom);
      ctx.stroke();

      // Axis Titles
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(labelX, pad.left + plotW / 2, h - 12);

      ctx.save();
      ctx.translate(18, pad.top + plotH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(labelY, 0, 0);
      ctx.restore();

      // Tick values
      ctx.font = '10px monospace';
      ctx.fillStyle = '#64748b';
      ctx.textAlign = 'center';
      ctx.fillText(minX.toFixed(1), pad.left, h - pad.bottom + 16);
      ctx.fillText(maxX.toFixed(1), pad.left + plotW, h - pad.bottom + 16);

      ctx.textAlign = 'right';
      ctx.fillText(minY.toFixed(1), pad.left - 8, h - pad.bottom);
      ctx.fillText(maxY.toFixed(1), pad.left - 8, pad.top + 8);
    }

    // Event Listeners
    datasetSelect.addEventListener('change', () => {
      populateAxisSelectors();
      renderCurrentVisualization();
    });

    chartTypeSelect.addEventListener('change', renderCurrentVisualization);
    xAxisSelect.addEventListener('change', renderCurrentVisualization);
    yAxisSelect.addEventListener('change', renderCurrentVisualization);
    window.addEventListener('resize', renderCurrentVisualization);

    // Initial populate & render
    populateAxisSelectors();
    renderCurrentVisualization();
  }

  // ===================================================================
  // 2. MACHINE LEARNING PLAYGROUND CONTROLLER (7 ALGORITHMS)
  // ===================================================================
  function initMLPlayground() {
    const canvas = document.getElementById('ml-playground-canvas');
    const algoTabs = document.querySelectorAll('.ml-algo-tab-btn');
    const datasetShapeBtn = document.querySelectorAll('.ml-data-shape-btn');
    const paramKSlider = document.getElementById('param-k-neighbors');
    const paramDepthSlider = document.getElementById('param-max-depth');
    const paramTreesSlider = document.getElementById('param-num-trees');
    const paramNoiseSlider = document.getElementById('param-noise-level');
    const resetDataBtn = document.getElementById('ml-reset-data-btn');
    const trainStepBtn = document.getElementById('ml-train-step-btn');
    const mathFormulaEl = document.getElementById('ml-math-formula');
    const metricPrimary = document.getElementById('ml-metric-primary');
    const metricSecondary = document.getElementById('ml-metric-secondary');
    const algoDesc = document.getElementById('ml-algo-description');

    if (!canvas || algoTabs.length === 0) return;
    const ctx = canvas.getContext('2d');

    let currentAlgo = 'knn';
    let currentShape = 'blobs';
    let noise = 0.15;
    let points = [];
    let trainedModel = null;
    let kValue = 3;
    let maxDepth = 3;
    let numTrees = 5;

    const ALGO_METADATA = {
      linear_reg: {
        title: 'Ordinary Least Squares (OLS) Linear Regression',
        formula: 'y = m·x + b \\quad | \\quad \\min \\sum (y_i - (m·x_i + b))^2',
        desc: 'Calculates the optimal hyperplane minimizing mean squared error (MSE) between real observations and continuous predictions.',
        primaryLabel: 'R² Score (Goodness of Fit)',
        secondaryLabel: 'Mean Squared Error (MSE)'
      },
      logistic_reg: {
        title: 'Binary Logistic Regression',
        formula: 'P(y=1|x) = \\sigma(w^T x + b) = \\frac{1}{1 + e^{-(w_1 x + w_2 y + b)}}',
        desc: 'Learns a linear decision frontier passing coordinates through a sigmoid function to yield continuous probability estimates.',
        primaryLabel: 'Classification Accuracy',
        secondaryLabel: 'Log-Loss Entropy'
      },
      knn: {
        title: 'K-Nearest Neighbors (KNN) Spatial Classifier',
        formula: 'd(p, q) = \\sqrt{(p_x - q_x)^2 + (p_y - q_y)^2} \\quad | \\quad \\hat{y} = \\text{mode}(y_{1..k})',
        desc: 'Non-parametric lazy learner classifying arbitrary query coordinates based on the majority vote of the K nearest spatial points.',
        primaryLabel: 'Classification Accuracy',
        secondaryLabel: 'Decision Boundary Resolution'
      },
      decision_tree: {
        title: 'CART Decision Tree Classifier',
        formula: 'Gini = 1 - \\sum_{i=1}^C p_i^2 \\quad | \\quad \\Delta Gini = G(parent) - \\sum \\frac{N_j}{N} G(child_j)',
        desc: 'Recursively partitions feature space using axis-aligned orthogonal splits that maximize Gini impurity reduction.',
        primaryLabel: 'Leaf Purity (1 - Avg Gini)',
        secondaryLabel: 'Tree Depth & Node Count'
      },
      random_forest: {
        title: 'Random Forest Ensemble (Bagging Trees)',
        formula: '\\hat{y} = \\text{round}\\left(\\frac{1}{B} \\sum_{b=1}^B T_b(x)\\right)',
        desc: 'Combines multiple decorrelated decision trees trained on bootstrap samples with majority voting to drastically suppress variance.',
        primaryLabel: 'Ensemble Consensus Acc',
        secondaryLabel: 'Active Estimator Count'
      },
      kmeans: {
        title: 'K-Means Lloyd Clustering Algorithm',
        formula: 'J = \\sum_{j=1}^k \\sum_{x \\in S_j} ||x - \\mu_j||^2',
        desc: 'Unsupervised partitioning algorithm iterating between Voronoi centroid assignment and geometric mean relocation.',
        primaryLabel: 'Cluster Inertia (WCSS)',
        secondaryLabel: 'Active Centroids (k)'
      }
    };

    function generateData() {
      const shapeType = currentAlgo === 'linear_reg' ? 'linear_reg' : currentShape;
      points = window.DataScienceStudio.MLPlayground.generatePoints(shapeType, 60, noise);
      retrainAndRender();
    }

    function retrainAndRender() {
      const MLP = window.DataScienceStudio.MLPlayground;
      const MS = window.DataScienceStudio.MathStats;

      if (currentAlgo === 'linear_reg') {
        const xArr = points.map(p => p.x);
        const yArr = points.map(p => p.y);
        trainedModel = MS.linearRegression(xArr, yArr);
        if (metricPrimary) metricPrimary.textContent = `R²: ${trainedModel.r2}`;
        if (metricSecondary) metricSecondary.textContent = `MSE: ${trainedModel.mse}`;
      } else if (currentAlgo === 'logistic_reg') {
        trainedModel = MLP.trainLogisticRegression(points, 80, 0.15);
        let correct = 0;
        points.forEach(p => {
          if (trainedModel.predict(p.x, p.y).label === p.label) correct++;
        });
        const acc = Number(((correct / points.length) * 100).toFixed(1));
        if (metricPrimary) metricPrimary.textContent = `Accuracy: ${acc}%`;
        if (metricSecondary) metricSecondary.textContent = `Loss: ${(1 - acc / 100).toFixed(3)}`;
      } else if (currentAlgo === 'knn') {
        trainedModel = { predict: (x, y) => MLP.predictKNN(x, y, points, kValue) };
        let correct = 0;
        points.forEach(p => {
          if (trainedModel.predict(p.x, p.y).label === p.label) correct++;
        });
        const acc = Number(((correct / points.length) * 100).toFixed(1));
        if (metricPrimary) metricPrimary.textContent = `Accuracy: ${acc}%`;
        if (metricSecondary) metricSecondary.textContent = `K: ${kValue} neighbors`;
      } else if (currentAlgo === 'decision_tree') {
        trainedModel = MLP.trainDecisionTree(points, maxDepth);
        let correct = 0;
        points.forEach(p => {
          if (trainedModel.predict(p.x, p.y).label === p.label) correct++;
        });
        const acc = Number(((correct / points.length) * 100).toFixed(1));
        if (metricPrimary) metricPrimary.textContent = `Accuracy: ${acc}%`;
        if (metricSecondary) metricSecondary.textContent = `Max Depth: ${maxDepth}`;
      } else if (currentAlgo === 'random_forest') {
        trainedModel = MLP.trainRandomForest(points, numTrees, maxDepth);
        let correct = 0;
        points.forEach(p => {
          if (trainedModel.predict(p.x, p.y).label === p.label) correct++;
        });
        const acc = Number(((correct / points.length) * 100).toFixed(1));
        if (metricPrimary) metricPrimary.textContent = `Accuracy: ${acc}%`;
        if (metricSecondary) metricSecondary.textContent = `Forest: ${numTrees} trees`;
      } else if (currentAlgo === 'kmeans') {
        trainedModel = MLP.runKMeans(points, kValue, 12);
        if (metricPrimary) metricPrimary.textContent = `Inertia: ${trainedModel.inertia}`;
        if (metricSecondary) metricSecondary.textContent = `Clusters: ${kValue} centroids`;
      }

      renderCanvas();
    }

    function renderCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const parentW = canvas.parentElement ? canvas.parentElement.clientWidth : 700;
      const w = rect.width > 0 ? rect.width : (parentW || 700);
      const h = rect.height > 0 ? rect.height : 420;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.resetTransform && ctx.resetTransform();
      ctx.scale(dpr, dpr);

      ctx.clearRect(0, 0, w, h);

      // 1. Render Decision Field / Voronoi background
      if (trainedModel && currentAlgo !== 'linear_reg') {
        const step = 8;
        for (let py = 0; py < h; py += step) {
          for (let px = 0; px < w; px += step) {
            const normX = px / w;
            const normY = py / h;
            
            if (currentAlgo === 'kmeans') {
              let minD = Infinity;
              let bestC = 0;
              trainedModel.centroids.forEach((cent, cIdx) => {
                const d = Math.hypot(normX - cent.x, normY - cent.y);
                if (d < minD) {
                  minD = d;
                  bestC = cIdx;
                }
              });
              const hue = (bestC * 120) % 360;
              ctx.fillStyle = `hsla(${hue}, 80%, 40%, 0.12)`;
              ctx.fillRect(px, py, step, step);
            } else {
              const res = trainedModel.predict(normX, normY);
              const prob = res.probability !== undefined ? res.probability : (res.label === 1 ? 0.9 : 0.1);
              if (prob > 0.5) {
                ctx.fillStyle = `rgba(0, 229, 255, ${Math.min(0.28, (prob - 0.5) * 0.5 + 0.05)})`;
              } else {
                ctx.fillStyle = `rgba(168, 85, 247, ${Math.min(0.28, (0.5 - prob) * 0.5 + 0.05)})`;
              }
              ctx.fillRect(px, py, step, step);
            }
          }
        }
      }

      // 2. Linear Regression Best-fit line
      if (currentAlgo === 'linear_reg' && trainedModel) {
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, h - trainedModel.predict(0) * h);
        ctx.lineTo(w, h - trainedModel.predict(1) * h);
        ctx.stroke();

        // Draw residuals
        points.forEach(p => {
          const px = p.x * w;
          const py = h - p.y * h;
          const predY = h - trainedModel.predict(p.x) * h;
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px, predY);
          ctx.stroke();
        });
      }

      // 3. Render Data Points
      points.forEach((p, idx) => {
        const px = p.x * w;
        const py = currentAlgo === 'linear_reg' ? h - p.y * h : p.y * h;

        let color = p.label === 1 ? '#00e5ff' : '#a855f7';
        if (currentAlgo === 'kmeans' && trainedModel) {
          const c = trainedModel.assignments[idx] || 0;
          color = `hsl(${(c * 120) % 360}, 85%, 60%)`;
        }

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // 4. Render Centroids for K-Means
      if (currentAlgo === 'kmeans' && trainedModel) {
        trainedModel.centroids.forEach((cent, cIdx) => {
          const cx = cent.x * w;
          const cy = cent.y * h;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(cx, cy, 9, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `hsl(${(cIdx * 120) % 360}, 90%, 50%)`;
          ctx.beginPath();
          ctx.arc(cx, cy, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 2;
          ctx.stroke();
        });
      }
    }

    // Canvas click to add points
    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) / rect.width;
      const clickY = (e.clientY - rect.top) / rect.height;

      if (currentAlgo === 'linear_reg') {
        points.push({ x: clickX, y: 1 - clickY, label: 0 });
      } else {
        const newLabel = e.shiftKey ? 1 : 0;
        points.push({ x: clickX, y: clickY, label: newLabel });
      }
      retrainAndRender();
    });

    // Algo Tab switching
    algoTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        algoTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentAlgo = tab.dataset.algo;

        const meta = ALGO_METADATA[currentAlgo] || ALGO_METADATA.knn;
        if (mathFormulaEl) mathFormulaEl.textContent = meta.formula;
        if (algoDesc) algoDesc.textContent = meta.desc;

        generateData();
      });
    });

    // Dataset shape switching
    datasetShapeBtn.forEach(btn => {
      btn.addEventListener('click', () => {
        datasetShapeBtn.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentShape = btn.dataset.shape;
        generateData();
      });
    });

    // Param sliders
    if (paramKSlider) {
      paramKSlider.addEventListener('input', (e) => {
        kValue = parseInt(e.target.value, 10);
        document.getElementById('param-k-val').textContent = kValue;
        retrainAndRender();
      });
    }

    if (paramDepthSlider) {
      paramDepthSlider.addEventListener('input', (e) => {
        maxDepth = parseInt(e.target.value, 10);
        document.getElementById('param-depth-val').textContent = maxDepth;
        retrainAndRender();
      });
    }

    if (paramTreesSlider) {
      paramTreesSlider.addEventListener('input', (e) => {
        numTrees = parseInt(e.target.value, 10);
        document.getElementById('param-trees-val').textContent = numTrees;
        retrainAndRender();
      });
    }

    if (paramNoiseSlider) {
      paramNoiseSlider.addEventListener('input', (e) => {
        noise = parseFloat(e.target.value);
        document.getElementById('param-noise-val').textContent = noise.toFixed(2);
        generateData();
      });
    }

    if (resetDataBtn) resetDataBtn.addEventListener('click', generateData);
    if (trainStepBtn) trainStepBtn.addEventListener('click', retrainAndRender);

    window.addEventListener('resize', renderCanvas);

    // Initial load
    generateData();
  }

  // ===================================================================
  // 3. EXPLORATORY DATA ANALYSIS (EDA) LAB CONTROLLER
  // ===================================================================
  function initEDALab() {
    const datasetSelect = document.getElementById('eda-dataset-select');
    const edaRowsCount = document.getElementById('eda-rows-count');
    const edaColsCount = document.getElementById('eda-cols-count');
    const edaNumericCount = document.getElementById('eda-numeric-count');
    const edaCategCount = document.getElementById('eda-categ-count');
    const edaTableBody = document.getElementById('eda-summary-table-body');
    const edaInsightContainer = document.getElementById('eda-insights-container');
    const edaMissingMatrix = document.getElementById('eda-missing-matrix');

    if (!datasetSelect) return;

    function renderEDA() {
      const datasetKey = datasetSelect.value;
      const profile = window.DataScienceStudio.EDAProfiler.profileDataset(datasetKey);
      if (!profile) return;

      if (edaRowsCount) edaRowsCount.textContent = profile.rows;
      if (edaColsCount) edaColsCount.textContent = profile.cols;

      let numCount = 0, catCount = 0;
      Object.values(profile.columnStats).forEach(s => {
        if (s.type === 'numeric') numCount++;
        else catCount++;
      });

      if (edaNumericCount) edaNumericCount.textContent = numCount;
      if (edaCategCount) edaCategCount.textContent = catCount;

      // Render Summary Table
      if (edaTableBody) {
        edaTableBody.innerHTML = '';
        Object.entries(profile.columnStats).forEach(([colName, stats]) => {
          const tr = document.createElement('tr');
          if (stats.type === 'numeric') {
            tr.innerHTML = `
              <td><strong>${stats.label}</strong> <span class="mono" style="font-size:0.75rem;color:var(--lab-cyan)">[float64]</span></td>
              <td class="mono">${stats.count}</td>
              <td class="mono">${stats.mean} ${stats.unit}</td>
              <td class="mono">±${stats.std}</td>
              <td class="mono">${stats.quantiles.min}</td>
              <td class="mono">${stats.quantiles.median}</td>
              <td class="mono">${stats.quantiles.max}</td>
              <td class="mono">${stats.quantiles.iqr}</td>
              <td class="mono" style="color:${stats.outliers.length > 0 ? '#ef4444' : 'var(--lab-emerald)'}">
                ${stats.outliers.length > 0 ? `${stats.outliers.length} detected` : 'None (0)'}
              </td>
            `;
          } else {
            tr.innerHTML = `
              <td><strong>${stats.label}</strong> <span class="mono" style="font-size:0.75rem;color:var(--lab-violet)">[category]</span></td>
              <td class="mono">${profile.rows}</td>
              <td class="mono" colspan="6">Cardinality: ${stats.distinctCount} unique classes</td>
              <td class="mono" style="color:var(--lab-emerald)">0% Missing</td>
            `;
          }
          edaTableBody.appendChild(tr);
        });
      }

      // Render Missingness Integrity Bars
      if (edaMissingMatrix) {
        edaMissingMatrix.innerHTML = '';
        const dataset = window.DataScienceStudio.DATASETS[datasetKey];
        dataset.columns.forEach(col => {
          const colWrap = document.createElement('div');
          colWrap.className = 'missing-col-indicator';
          colWrap.innerHTML = `
            <div class="col-head mono">${col.name}</div>
            <div class="integrity-bar"><div class="fill" style="width: 100%;"></div></div>
            <div class="pct mono">100% Valid</div>
          `;
          edaMissingMatrix.appendChild(colWrap);
        });
      }

      // Render Narrative Insights
      if (edaInsightContainer) {
        edaInsightContainer.innerHTML = '';
        profile.insights.forEach(item => {
          const card = document.createElement('div');
          card.className = 'eda-insight-card';
          card.innerHTML = `
            <span class="insight-badge mono">${item.badge}</span>
            <p class="insight-text">${item.text}</p>
          `;
          edaInsightContainer.appendChild(card);
        });
      }
    }

    datasetSelect.addEventListener('change', renderEDA);
    renderEDA();
  }

  // ===================================================================
  // 4. DATA STORIES FROM SRI LANKA
  // ===================================================================
  function initDataStories() {
    const storyTabs = document.querySelectorAll('.data-story-tab');
    const storyPanels = document.querySelectorAll('.data-story-panel');

    if (storyTabs.length === 0) return;

    storyTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        storyTabs.forEach(t => t.classList.remove('active'));
        storyPanels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const target = tab.dataset.story;
        const panel = document.getElementById(`story-${target}`);
        if (panel) panel.classList.add('active');
      });
    });
  }

  // ===================================================================
  // 5. RESEARCH & MODEL EXPERIMENTS BENCHMARKS
  // ===================================================================
  function initResearchBenchmarks() {
    const metricFilterBtns = document.querySelectorAll('.research-metric-btn');
    const expCards = document.querySelectorAll('.experiment-benchmark-card');

    if (metricFilterBtns.length === 0) return;

    metricFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        metricFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const metric = btn.dataset.metric;

        expCards.forEach(card => {
          const cardMetrics = card.dataset.metrics || '';
          if (metric === 'all' || cardMetrics.includes(metric)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

})();

  // Studio Tab Switching Controller
  function initStudioTabs() {
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
          setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
          }, 60);
        }
      });
    });
  }
