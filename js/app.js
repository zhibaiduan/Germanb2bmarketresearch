(function () {
  'use strict';

  /* ─── State ───────────────────────────────────────────────────── */
  let current = 0;
  let lang = 'en';
  let busy = false;
  let touchX0 = 0;
  let touchY0 = 0;
  let interactiveEventsBound = false;
  const UI_STRINGS = {
    en: {
      takeaway: 'Takeaway',
      conclusion: 'Conclusion',
      insight: 'Insight',
      questions: 'Questions',
      implication: 'Implication',
      visibleBudgetFlow: 'Visible budget flow',
      controlLayer: 'Control layer',
      moreClosed: 'More closed',
      moreOpen: 'More open',
      demand: 'Demand',
      delivery: 'Delivery',
      gap: 'Gap',
      press: 'Press',
      swipe: 'or swipe to navigate',
    },
    de: {
      takeaway: 'Kernaussage',
      conclusion: 'Fazit',
      insight: 'Erkenntnis',
      questions: 'Leitfragen',
      implication: 'Implikation',
      visibleBudgetFlow: 'Sichtbarer Budgetfluss',
      controlLayer: 'Kontrollebene',
      moreClosed: 'Stärker geschlossen',
      moreOpen: 'Stärker offen',
      demand: 'Nachfrage',
      delivery: 'Leistungserbringung',
      gap: 'Lücke',
      press: 'Mit',
      swipe: 'oder per Wischen navigieren',
    },
    zh: {
      takeaway: '结论',
      conclusion: '总结',
      insight: '洞察',
      questions: '关键问题',
      implication: '延伸含义',
      visibleBudgetFlow: '可见预算流向',
      controlLayer: '控制层',
      moreClosed: '更封闭',
      moreOpen: '更开放',
      demand: '需求侧',
      delivery: '交付侧',
      gap: '断层',
      press: '按',
      swipe: '或滑动翻页',
    },
  };

  const byId = id => document.getElementById(id);
  const chapterMap = Object.fromEntries(CHAPTERS.map(c => [c.id, c]));

  /* ─── DOM refs ────────────────────────────────────────────────── */
  const deck           = byId('deck');
  const hud            = byId('hud');
  const ctrlBar        = document.querySelector('.controls');
  const hudChapter     = byId('hudChapter');
  const hudCount       = byId('hudCount');
  const prevBtn        = byId('prevBtn');
  const nextBtn        = byId('nextBtn');
  const ctrlChapterCount = byId('ctrlChapterCount');
  const ctrlChapterRail  = byId('ctrlChapterRail');
  const menuBtn        = byId('menuBtn');
  const chapterNav     = byId('chapterNav');
  const chapterNavList = byId('chapterNavList');
  const overlay        = byId('overlay');
  const navExpanded    = new Set();

  /* ─── Helpers ─────────────────────────────────────────────────── */
  function ch(id)      { return chapterMap[id] || {}; }
  function c(slideId)  { return ((CONTENT[lang] && CONTENT[lang][slideId]) || (CONTENT.en && CONTENT.en[slideId]) || {}); }
  function esc(s)      { return String(s).replace(/&(?![a-z]+;)/g, '&amp;'); }
  function stripTags(s){ return String(s || '').replace(/<[^>]*>/g, '').trim(); }
  function t(key)      {
    const dict = UI_STRINGS[lang] || UI_STRINGS.en;
    return dict[key] || UI_STRINGS.en[key] || key;
  }

  const NAV_LABELS = {
    'deck-cover': 'Cover',
    'research-intro': 'What to Expect',
    'part1-entry': 'Part 1 Cover',
    'p1-question': 'Observed Phenomena',
    'p1-compare': 'Why Germany Looks Different',
    'p1-reframe': 'What This Is Not',
    'p1-argument': 'Core Argument',
    'p1-mechanism': 'Structural Constraints',
    'p1-framework': 'Part 1 Summary',
    'part2-entry': 'Part 2 Cover',
    'p2-a1': 'Who Are the Buyers?',
    'p2-a2': 'Where Demand Comes From',
    'p2-a3': 'How Demand Is Structured',
    'p2-a4': 'How Demand Is Served',
    'p2-a5': 'Who Are the Players?',
    'p2-a6': 'Competitive Dynamics',
    'p2-a7': 'Who Makes the Decision?',
    'p2-a8': 'How the Buying Process Works',
    'p2-a9': 'How Trust Is Established',
    'p2-summary': 'Part 2 Summary',
    'part3-entry': 'Part 3 Cover',
    'p3-e0': 'Assessment Framework',
    'p3-seg1-automation': 'Process Automation',
    'p3-seg2-vertical': 'Vertical Software',
    'p3-seg3-ai': 'AI Application Layer',
    'p3-e4-summary': 'Summary Assessment',
    'final-summary':  'Findings & Implications',
  };

  function slideNavLabel(slide) {
    if (NAV_LABELS[slide.id]) return NAV_LABELS[slide.id];
    const data = c(slide.id);
    return stripTags(data.label || data.title || slide.id);
  }

  function chapterGroups() {
    const intros = SLIDES
      .map((slide, index) => ({ slide, index }))
      .filter(({ slide }) => slide.type === 'chapter-intro');

    return intros.map(({ slide, index }, introIndex) => {
      const nextIntroIndex = intros[introIndex + 1]?.index ?? SLIDES.length;
      const subSlides = SLIDES
        .slice(index + 1, nextIntroIndex)
        .map((item, itemOffset) => ({ item, absoluteIndex: index + 1 + itemOffset }))
        .filter(({ item }) => item.chapter === slide.chapter);

      return {
        chapterId: slide.chapter,
        firstIndex: index,
        slides: subSlides.map(({ item, absoluteIndex }) => ({
          index: absoluteIndex,
          id: item.id,
        })),
      };
    });
  }

  function navGroups() {
    const firstIntroIndex = SLIDES.findIndex(slide => slide.type === 'chapter-intro');
    const groups = [];

    if (firstIntroIndex > 0) {
      groups.push({
        id: 'cover',
        number: '00',
        label: 'Cover & What to Expect',
        color: '#9CA3AF',
        firstIndex: 0,
        slides: SLIDES.slice(0, firstIntroIndex).map((slide, index) => ({
          index,
          id: slide.id,
          label: slideNavLabel(slide),
        })),
      });
    }

    const intros = SLIDES
      .map((slide, index) => ({ slide, index }))
      .filter(({ slide }) => slide.type === 'chapter-intro');

    const coveredChapters = new Set();

    intros.forEach(({ slide, index }, introIndex) => {
      const nextIntroIndex = intros[introIndex + 1]?.index ?? SLIDES.length;
      const chapter = ch(slide.chapter);
      coveredChapters.add(slide.chapter);
      groups.push({
        id: slide.chapter,
        number: chapter.number || String(introIndex + 1).padStart(2, '0'),
        label: chapter.label || slideNavLabel(slide),
        color: chapter.color || '#fff',
        firstIndex: index,
        // Only include slides that belong to this chapter
        slides: SLIDES.slice(index, nextIntroIndex)
          .map((item, offset) => ({
            index: index + offset,
            id: item.id,
            label: slideNavLabel(item),
            chapter: item.chapter,
          }))
          .filter(s => s.chapter === slide.chapter),
      });
    });

    // Collect slides in chapters that have no chapter-intro (e.g. 'entry')
    const ungroupedByChapter = {};
    SLIDES.forEach((slide, index) => {
      if (!coveredChapters.has(slide.chapter) && slide.chapter !== 'cover') {
        if (!ungroupedByChapter[slide.chapter]) ungroupedByChapter[slide.chapter] = [];
        ungroupedByChapter[slide.chapter].push({ index, id: slide.id, label: slideNavLabel(slide) });
      }
    });

    Object.entries(ungroupedByChapter).forEach(([chapterId, slides]) => {
      const chapter = ch(chapterId);
      groups.push({
        id: chapterId,
        number: chapter.number || '',
        label: chapter.label || chapterId,
        color: chapter.color || '#fff',
        firstIndex: slides[0].index,
        slides,
      });
    });

    return groups;
  }

  /* ─── Render ──────────────────────────────────────────────────── */
  function renderAll() {
    deck.innerHTML = '';
    SLIDES.forEach((slide, i) => {
      const el = document.createElement('section');
      el.className = 'slide';
      el.dataset.index = i;
      el.innerHTML = buildHTML(slide);
      deck.appendChild(el);
    });
    const slides = deck.querySelectorAll('.slide');
    slides.forEach((slideEl, index) => {
      slideEl.classList.toggle('active', index === current);
      slideEl.classList.remove('leaving');
    });
    attachInteractiveEvents();
    buildNav();
    buildControlRail();
    syncUI(current, false);
  }

  function buildHTML(slide) {
    const data = c(slide.id);
    switch (slide.type) {
      case 'cover':         return htmlCover(data);
      case 'problem-space': return htmlProblemSpace(data);
      case 'logic-chain':   return htmlLogicChain(data);
      case 'demand-orbit':  return htmlDemandOrbit(data);
      case 'metric-strip':  return htmlMetricStrip(data);
      case 'equation-break': return htmlEquationBreak(data);
      case 'assembly-stack': return htmlAssemblyStack(data);
      case 'converging-arrows': return htmlConvergingArrows(data);
      case 'bridge-diagram': return htmlBridgeDiagram(data);
      case 'transition-chain': return htmlTransitionChain(data);
      case 'filter-funnel': return htmlFilterFunnel(data);
      case 'vertical-contrast': return htmlVerticalContrast(data);
      case 'reading-path':  return htmlReadingPath(data);
      case 'thesis-opener': return htmlThesisOpener(data);
      case 'observation-wall': return htmlObservationWall(data);
      case 'turning-point': return htmlTurningPoint(data);
      case 'minimal-arrow': return htmlMinimalArrow(data);
      case 'constraint-clusters': return htmlConstraintClusters(data);
      case 'logic-shift':   return htmlLogicShift(data);
      case 'research-overview':  return htmlResearchOverview(data);
      case 'refutation-frame':   return htmlRefutationFrame(data);
      case 'phenomena-question': return htmlPhenomenaQuestion(data);
      case 'market-gap':         return htmlMarketGap(data);
      case 'market-compare':     return htmlMarketCompare(data);
      case 'core-argument':      return htmlCoreArgument(data);
      case 'dual-cascade':       return htmlDualCascade(data);
      case 'framework-summary':  return htmlFrameworkSummary(data);
      case 'demand-origin':      return htmlDemandOrigin(data);
      case 'customer-segments':  return htmlCustomerSegments(data);
      case 'market-segments':   return htmlMarketSegments(data);
      case 'delivery-modes':    return htmlDeliveryModes(data);
      case 'player-ecosystem':  return htmlPlayerEcosystem(data);
      case 'competitive-dynamics': return htmlCompetitiveDynamics(data);
      case 'buying-decision':   return htmlBuyingDecision(data);
      case 'buying-process':    return htmlBuyingProcess(data);
      case 'trust-establishment': return htmlTrustEstablishment(data);
      case 'part2-summary':    return htmlPart2Summary(data);
      case 'opportunity-assessment': return htmlOpportunityAssessment(data);
      case 'segment-deep-dive': return htmlSegmentDeepDive(data, slide.id);
      case 'summary-assessment': return htmlSummaryAssessment(data);
      case 'closing-statement': return htmlClosingStatement(data);
      case 'final-summary':    return htmlFinalSummary(data);
      case 'foreword':      return htmlForeword(data);
      case 'framing-grid':  return htmlFramingGrid(data);
      case 'chapter-intro': return htmlChapterIntro(data, ch(slide.chapter));
      case 'chapter-cover': return htmlChapterCover(data, ch(slide.chapter));
      case 'text-focus':    return htmlTextFocus(data);
      case 'flowchart':     return htmlFlowchart(data);
      case 'demand-grid':   return htmlDemandGrid(data);
      case 'stat-compare':  return htmlStatCompare(data);
      case 'stack-layers':  return htmlStackLayers(data);
      case 'supply-map':    return htmlSupplyMap(data);
      case 'value-flow':    return htmlValueFlow(data);
      case 'proof-cards':   return htmlProofCards(data);
      case 'insight-sequence': return htmlInsightSequence(data);
      case 'sequence-rail': return htmlInsightSequence(data);
      case 'causal-chain': return htmlCausalChain(data);
      case 'contrast-frame': return htmlContrastFrame(data);
      case 'flow-path': return htmlFlowPath(data);
      case 'field-map':     return htmlFieldMap(data);
      case 'layered-stack': return htmlLayeredStack(data);
      case 'mismatch-map': return htmlMismatchMap(data);
      case 'opportunity-ladder': return htmlOpportunityLadder(data);
      case 'role-lanes':    return htmlRoleLanes(data);
      case 'summary-grid':  return htmlSummaryGrid(data);
      default:              return `<div style="padding:48px;color:var(--t3)">${slide.id}</div>`;
    }
  }

  /* ─── Slide templates ─────────────────────────────────────────── */

  function takeawayHTML(text) {
    return summaryHTML(text, t('takeaway'), 'takeaway');
  }

  function summaryHTML(text, label, className = '') {
    if (!text) return '';
    return `
      <div class="summary-block${className ? ` ${className}` : ''}">
        <span class="summary-block-label">${label || t('conclusion')}</span>
        <div class="summary-block-text">${text}</div>
      </div>`;
  }

  function questionHTML(text) {
    if (!text) return '';
    return `<p class="s-question">${text}</p>`;
  }

  function htmlCover(d) {
    const bullets = (d.bullets || []).map(item =>
      `<li class="cover-bullet">${item}</li>`
    ).join('');
    return `
    <div class="s-cover">
      <div class="cover-watermark">DACH</div>
      <div class="cover-meta">${d.meta || ''}</div>
      <h1 class="cover-title">${d.title || ''}</h1>
      <p class="cover-subtitle">${d.subtitle || ''}</p>
      ${d.body ? `<p class="cover-body">${d.body}</p>` : ''}
      ${bullets ? `<ul class="cover-bullets">${bullets}</ul>` : ''}
      ${d.audience ? `<p class="cover-audience">${d.audience}</p>` : ''}
      <div class="cover-hint">
        <svg width="28" height="10" viewBox="0 0 28 10" fill="none">
          <path d="M0 5h24M20 1l4 4-4 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        &nbsp;${t('press')}&nbsp;<kbd style="font-family:var(--mono);border:1px solid var(--t4);border-radius:3px;padding:1px 5px;font-size:9px">→</kbd>&nbsp;${t('swipe')}
      </div>
    </div>`;
  }

  function htmlProblemSpace(d) {
    const items = (d.items || []).map(item => `
      <li class="ps-item">
        <span class="ps-check" aria-hidden="true"></span>
        <span class="ps-text">${item}</span>
      </li>`).join('');
    return `
    <div class="s-problem-space">
      <div class="ps-left">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="ps-right">
        <div class="ps-label">${d.listLabel || 'Key questions'}</div>
        <ul class="ps-list">${items}</ul>
      </div>
      ${takeawayHTML(d.takeaway)}
    </div>`;
  }

  function htmlLogicChain(d) {
    const nodes = (d.nodes || []).map((item, index) => `
      <div class="lc-node">
        <div class="lc-num">${String(index + 1).padStart(2, '0')}</div>
        <div class="lc-term">${(item.term || '').replace(/\n/g, '<br>')}</div>
        ${item.note ? `<div class="lc-note">${item.note}</div>` : ''}
      </div>`).join('<div class="lc-arrow" aria-hidden="true">→</div>');
    return `
    <div class="s-logic-chain">
      <div class="lc-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="lc-track">${nodes}</div>
      ${takeawayHTML(d.takeaway)}
    </div>`;
  }

  function htmlDemandOrbit(d) {
    const items = (d.items || []).map((item, index) => `
      <div class="do-node do-node--${index + 1}">
        <div class="do-term">${item.term || ''}</div>
        ${item.note ? `<div class="do-note">${item.note}</div>` : ''}
      </div>`).join('');
    return `
    <div class="s-demand-orbit">
      <div class="do-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="do-stage">
        <div class="do-core">${d.core || 'Demand'}</div>
        ${items}
      </div>
      ${takeawayHTML(d.takeaway)}
    </div>`;
  }

  function htmlMetricStrip(d) {
    const items = (d.items || []).map(item => `
      <div class="ms-item${item.emphasis ? ' ms-item--emphasis' : ''}">
        <div class="ms-value">${item.value || ''}</div>
        <div class="ms-label">${item.label || ''}</div>
        <div class="ms-note">${item.note || ''}</div>
      </div>`).join('');
    const noteHTML = d.note ? `<div class="text-note"><span class="text-note-icon">※</span><span class="text-note-text">${d.note}</span></div>` : '';
    return `
    <div class="s-metric-strip">
      <div class="ms-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="ms-grid">${items}</div>
      ${takeawayHTML(d.takeaway)}
      ${noteHTML}
    </div>`;
  }

  function htmlEquationBreak(d) {
    return `
    <div class="s-equation-break">
      <div class="eq-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="eq-main">
        <div class="eq-side">${d.left || ''}</div>
        <div class="eq-symbol">${d.symbol || '≠'}</div>
        <div class="eq-side eq-side--target">${d.right || ''}</div>
      </div>
      ${takeawayHTML(d.takeaway)}
    </div>`;
  }

  function htmlAssemblyStack(d) {
    const layers = (d.layers || []).map(item => `
      <div class="as-layer as-layer--${item.id || 'layer'}">
        <div class="as-label">${item.label || ''}</div>
        <div class="as-term">${item.term || ''}</div>
        <div class="as-note">${item.note || ''}</div>
      </div>`).join('');
    return `
    <div class="s-assembly-stack">
      <div class="as-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="as-layout">
        <div class="as-stack">${layers}</div>
        <div class="as-formula">${d.formula || ''}</div>
      </div>
      ${takeawayHTML(d.takeaway)}
    </div>`;
  }

  function htmlConvergingArrows(d) {
    const items = (d.items || []).map(item => `
      <div class="ca-spoke ca-spoke--${item.id || 'spoke'}">
        <div class="ca-term">${item.term || ''}</div>
        <div class="ca-note">${item.note || ''}</div>
      </div>`).join('');
    return `
    <div class="s-converging-arrows">
      <div class="ca-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="ca-diagram">
        ${items}
        <div class="ca-center">${d.center || 'Hybrid'}</div>
      </div>
      ${takeawayHTML(d.takeaway)}
    </div>`;
  }

  function htmlBridgeDiagram(d) {
    const pillars = (d.items || []).map(item => `
      <div class="bd-pillar">
        <div class="bd-term">${item.term || ''}</div>
        <div class="bd-note">${item.note || ''}</div>
      </div>`).join('');
    return `
    <div class="s-bridge-diagram">
      <div class="bd-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="bd-structure">
        <div class="bd-top">${d.top || ''}</div>
        <div class="bd-bridge">
          <div class="bd-center">${d.center || 'Services'}</div>
          <div class="bd-pillars">${pillars}</div>
        </div>
        <div class="bd-bottom">${d.bottom || ''}</div>
      </div>
      ${takeawayHTML(d.takeaway)}
    </div>`;
  }

  function htmlTransitionChain(d) {
    const header = `
      <div class="tc-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>`;

    if (d.cascade) {
      const outcomes = (d.items || []).map(item => `
        <div class="tc-outcome">
          <span class="tc-outcome-arrow" aria-hidden="true">→</span>
          <span class="tc-outcome-term">${item.term || ''}</span>
        </div>`).join('');
      return `
      <div class="s-transition-chain">
        ${header}
        <div class="tc-cascade">
          <div class="tc-source">${d.source || ''}</div>
          <div class="tc-cascade-down" aria-hidden="true">↓</div>
          <div class="tc-outcomes">${outcomes}</div>
        </div>
        ${d.reinforcement ? `<p class="tc-reinforcement">${d.reinforcement}</p>` : ''}
        ${takeawayHTML(d.takeaway)}
      </div>`;
    }

    const items = (d.items || []).map(item => `
      <div class="tc-node${item.highlight ? ' tc-node--highlight' : ''}">
        <div class="tc-term">${item.term || ''}</div>
        ${item.note ? `<div class="tc-note">${item.note}</div>` : ''}
      </div>`).join('<div class="tc-arrow" aria-hidden="true">→</div>');
    return `
    <div class="s-transition-chain">
      ${header}
      <div class="tc-track">${items}</div>
      ${takeawayHTML(d.takeaway)}
    </div>`;
  }

  function htmlFilterFunnel(d) {
    const items = (d.items || []).map((item, index) => `
      <div class="ff-stage ff-stage--${index + 1}">
        <div class="ff-term">${item.term || ''}</div>
        ${item.note ? `<div class="ff-note">${item.note}</div>` : ''}
      </div>`).join('');
    return `
    <div class="s-filter-funnel">
      <div class="ff-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="ff-funnel">
        ${items}
      </div>
      ${takeawayHTML(d.takeaway)}
    </div>`;
  }

  function htmlVerticalContrast(d) {
    return `
    <div class="s-vertical-contrast">
      <div class="vc-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="vc-stack">
        <div class="vc-panel">
          <div class="vc-label">${d.topLabel || ''}</div>
          <div class="vc-term">${d.topTerm || ''}</div>
        </div>
        <div class="vc-divider">${d.divider || 'vs'}</div>
        <div class="vc-panel vc-panel--emphasis">
          <div class="vc-label">${d.bottomLabel || ''}</div>
          <div class="vc-term">${d.bottomTerm || ''}</div>
        </div>
      </div>
      ${takeawayHTML(d.takeaway)}
    </div>`;
  }

  function htmlObservationWall(d) {
    // Layered mode: two structured columns (Delivery / Adoption)
    if (d.layers) {
      const cols = d.layers.map(layer => {
        const items = layer.items.map(item => `
          <div class="ow-item">
            <div class="ow-term">${item.term || ''}</div>
            ${item.note ? `<div class="ow-note">${item.note}</div>` : ''}
          </div>`).join('');
        return `
          <div class="ow-layer">
            <div class="ow-layer-label">${layer.label || ''}</div>
            <div class="ow-layer-items">${items}</div>
          </div>`;
      }).join('');
      return `
      <div class="s-observation-wall">
        <div class="ow-header">
          <div class="s-eyebrow">${d.eyebrow || ''}</div>
          ${questionHTML(d.question)}
          <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        </div>
        <div class="ow-layers">${cols}</div>
        ${takeawayHTML(d.takeaway)}
      </div>`;
    }
    // Original scattered-wall mode
    const items = (d.items || []).map(item => `
      <div class="ow-item">
        <div class="ow-term">${item.term || ''}</div>
        ${item.note ? `<div class="ow-note">${item.note}</div>` : ''}
      </div>`).join('');
    return `
    <div class="s-observation-wall">
      <div class="ow-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="ow-wall">${items}</div>
      ${takeawayHTML(d.takeaway)}
    </div>`;
  }

  function htmlTurningPoint(d) {
    const evidence = (d.evidence || []).map(item => `
      <div class="tp-evidence-item">
        <div class="tp-evidence-term">${item.term || ''}</div>
        <div class="tp-evidence-note">${item.note || ''}</div>
      </div>`).join('');
    return `
    <div class="s-turning-point">
      <div class="tp-top">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.lead ? `<p class="s-body">${d.lead}</p>` : ''}
      </div>
      <div class="tp-statement">${d.statement || ''}</div>
      ${evidence ? `<div class="tp-evidence">${evidence}</div>` : ''}
      ${d.bridge ? `<div class="tp-bridge">${d.bridge}</div>` : ''}
      ${takeawayHTML(d.takeaway)}
    </div>`;
  }

  function htmlMinimalArrow(d) {
    const compactNote = d.noteLine ? `<div class="ma-note-line">${d.noteLine}</div>` : '';
    const sectionLabel = d.sectionLabel ? `<div class="ma-section-label">${d.sectionLabel}</div>` : '';
    return `
    <div class="s-minimal-arrow${d.sectionCover ? ' s-minimal-arrow--section' : ''}">
      <div class="ma-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${sectionLabel}
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      ${d.noteLine ? compactNote : `
      <div class="ma-main">
        <div class="ma-term">${d.leftTerm || ''}</div>
        <div class="ma-arrow" aria-hidden="true">→</div>
        <div class="ma-term">${d.rightTerm || ''}</div>
      </div>`}
      ${d.caption ? `<div class="ma-caption">${d.caption}</div>` : ''}
      ${takeawayHTML(d.takeaway)}
    </div>`;
  }

  function htmlConstraintClusters(d) {
    // Three-cluster mode: each cluster has a label + 2 sub-items
    if (d.clusters) {
      const clusters = d.clusters.map(cluster => {
        const items = cluster.items.map(item => `
          <div class="kc-sub-item">
            <div class="kc-sub-term">${item.term || ''}</div>
            ${item.note ? `<div class="kc-sub-note">${item.note}</div>` : ''}
          </div>`).join('');
        return `
          <div class="kc-cluster">
            <div class="kc-cluster-label">${cluster.label || ''}</div>
            <div class="kc-cluster-items">${items}</div>
          </div>`;
      }).join('');
      return `
      <div class="s-constraint-clusters">
        <div class="kc-header">
          <div class="s-eyebrow">${d.eyebrow || ''}</div>
          ${questionHTML(d.question)}
          <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        </div>
        <div class="kc-clusters">${clusters}</div>
        ${d.reinforcement ? `<p class="kc-reinforcement">${d.reinforcement}</p>` : ''}
      </div>`;
    }
    // Original flat-items mode
    const items = (d.items || []).map(item => `
      <div class="kc-item${item.featured ? ' kc-item--featured' : ''}">
        <div class="kc-term">${item.term || ''}</div>
        ${item.note ? `<div class="kc-note">${item.note}</div>` : ''}
      </div>`).join('');
    return `
    <div class="s-constraint-clusters">
      <div class="kc-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="kc-grid">${items}</div>
      ${takeawayHTML(d.takeaway)}
    </div>`;
  }

  function htmlLogicShift(d) {
    // Mechanisms mode: each constraint maps to two behavioral outcomes
    if (d.mechanisms) {
      const rows = d.mechanisms.map(m => {
        const outcomes = (m.outcomes || []).map(o =>
          `<div class="mech-outcome">${o}</div>`).join('');
        return `
          <div class="mech-row">
            <div class="mech-source">${m.source || ''}</div>
            <div class="mech-arrow" aria-hidden="true">→</div>
            <div class="mech-outcomes">${outcomes}</div>
          </div>`;
      }).join('');
      return `
      <div class="s-logic-shift">
        <div class="shift-header">
          <div class="s-eyebrow">${d.eyebrow || ''}</div>
          ${questionHTML(d.question)}
          <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        </div>
        <div class="mech-rows">${rows}</div>
        ${takeawayHTML(d.takeaway)}
      </div>`;
    }
    // Original shifts mode
    const shifts = (d.shifts || []).map(item => `
      <div class="shift-row">
        <div class="shift-side">${item.from || ''}</div>
        <div class="shift-arrow" aria-hidden="true">→</div>
        <div class="shift-side shift-side--target">${item.to || ''}</div>
        ${item.note ? `<div class="shift-note">${item.note}</div>` : ''}
      </div>`).join('');
    return `
    <div class="s-logic-shift">
      <div class="shift-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="shift-rows">${shifts}</div>
      ${takeawayHTML(d.takeaway)}
    </div>`;
  }

  function htmlReadingPath(d) {
    const steps = (d.steps || []).map((item, index) => `
      <div class="rp-step">
        <div class="rp-step-top">
          <div class="rp-step-num">${item.label || String(index + 1).padStart(2, '0')}</div>
          <div class="rp-step-line"></div>
        </div>
        <div class="rp-step-title">${item.title || ''}</div>
        <div class="rp-step-desc">${item.desc || ''}</div>
      </div>`).join('');
    return `
    <div class="s-reading-path">
      <div class="rp-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.intro ? `<p class="s-body">${d.intro}</p>` : ''}
      </div>
      <div class="rp-track">${steps}</div>
      ${takeawayHTML(d.takeaway)}
    </div>`;
  }

  function htmlThesisOpener(d) {
    const pillars = (d.pillars || []).map(item => `
      <div class="to-pill">
        <div class="to-pill-label">${item.label || ''}</div>
        <div class="to-pill-title">${item.title || ''}</div>
        <div class="to-pill-desc">${item.desc || ''}</div>
      </div>`).join('');
    return `
    <div class="s-thesis-opener">
      <div class="to-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.intro ? `<p class="s-body">${d.intro}</p>` : ''}
      </div>
      <div class="to-thesis">${d.thesis || ''}</div>
      <div class="to-pillars">${pillars}</div>
      ${takeawayHTML(d.takeaway)}
    </div>`;
  }

  function htmlFinalSummary(d) {
    const findingsHTML = (d.findings || []).map(f => `
      <div class="fsum-finding">
        <div class="fsum-finding-meta">
          <span class="fsum-finding-tag fsum-finding-tag--${f.tagColor || 'blue'}">${f.tag}</span>
          <span class="fsum-finding-heading">${f.heading}</span>
        </div>
        <div class="fsum-finding-body">${f.body}</div>
      </div>`).join('');

    const audiencesHTML = (d.audiences || []).map(a => `
      <div class="fsum-aud">
        <div class="fsum-aud-tag">${a.tag}</div>
        <div class="fsum-aud-body">${a.body}</div>
      </div>`).join('');

    return `
    <div class="s-final-summary">
      <div class="fsum-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        <div class="fsum-synopsis">${d.synopsis || ''}</div>
      </div>
      <div class="fsum-body">
        <div class="fsum-col">
          <div class="fsum-col-label">${d.findingsLabel || ''}</div>
          ${findingsHTML}
        </div>
        <div class="fsum-col">
          <div class="fsum-col-label">${d.implicationsLabel || ''}</div>
          ${audiencesHTML}
        </div>
      </div>
    </div>`;
  }

  function htmlClosingStatement(d) {
    const principles = (d.principles || []).map(item => `
      <div class="cs-principle">
        <div class="cs-principle-label">${item.label || ''}</div>
        <div class="cs-principle-title">${item.title || ''}</div>
        <div class="cs-principle-desc">${item.desc || ''}</div>
      </div>`).join('');
    return `
    <div class="s-closing-statement">
      <div class="cs-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.intro ? `<p class="s-body">${d.intro}</p>` : ''}
      </div>
      <div class="cs-statement">${d.statement || ''}</div>
      <div class="cs-principles">${principles}</div>
      ${takeawayHTML(d.takeaway)}
    </div>`;
  }

  function htmlForeword(d) {
    const auds = (d.audiences || []).map(a => `
      <div class="aud-card">
        <div class="aud-label">${a.label}</div>
        <div class="aud-desc">${a.desc}</div>
      </div>`).join('');
    return `
    <div class="s-foreword">
      <div class="s-eyebrow">${d.eyebrow || ''}</div>
      <h2 class="s-title">${d.title || ''}</h2>
      <blockquote class="foreword-quote">${d.quote || ''}</blockquote>
      <p class="foreword-body">${d.body || ''}</p>
      <div class="foreword-audiences">${auds}</div>
    </div>`;
  }

  function htmlChapterIntro(d, chapter) {
    const items = (d.chain || []).map(item => `
      <div class="ch-intro-item">
        <div class="ch-intro-item-num">${item.num || ''}</div>
        <div class="ch-intro-item-title">${item.title || ''}</div>
        <div class="ch-intro-item-desc">${item.desc || ''}</div>
      </div>`).join('');
    const noteHTML = d.note ? `
      <div class="ch-intro-note">${d.note}</div>` : '';
    return `
    <div class="s-ch-intro">
      <div class="ch-intro-bg-num">${chapter.number || ''}</div>
      <div class="ch-intro-tag">${d.tag || ''}</div>
      <h2 class="ch-intro-title">${(d.title || '').replace(/\n/g, '<br>')}</h2>
      <p class="ch-intro-sub">${d.subtitle || ''}</p>
      <div class="ch-intro-chain-label">${d.chainLabel || 'Research chain'}</div>
      <div class="ch-intro-chain">${items}</div>
      ${noteHTML}
      <div class="ch-intro-bar"></div>
    </div>`;
  }

  function htmlFramingGrid(d) {
    const rowsHTML = (d.rows || []).map(row => {
      const chapters = (row.chapters || []).map(ch =>
        `<li class="fg-chapter">${ch}</li>`
      ).join('');
      const topics = (row.topics || []).map(topic =>
        `<li class="fg-topic">${topic}</li>`
      ).join('');
      return `
      <div class="fg-row">
        <div class="fg-row-left">
          <div class="fg-row-label">${row.label || ''}</div>
          <div class="fg-row-title">${row.title || ''}</div>
          ${chapters ? `<ul class="fg-chapters">${chapters}</ul>` : ''}
        </div>
        <div class="fg-row-mid">${row.body || ''}</div>
        <div class="fg-row-right">
          <div class="fg-row-q-label">${t('questions')}</div>
          <ul class="fg-topics">${topics}</ul>
        </div>
      </div>`;
    }).join('');

    return `
    <div class="s-framing-grid">
      <div class="fg-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.intro ? `<p class="s-body" style="max-width:700px">${d.intro}</p>` : ''}
      </div>
      <div class="fg-rows">${rowsHTML}</div>
    </div>`;
  }

  function htmlChapterCover(d, chapter) {
    const lines = (d.title || '').split('\n').join('<br>');
    const metaHTML = d.meta ? `<div class="ch-cover-meta">${d.meta}</div>` : '';
    const bodyHTML = d.body ? `<p class="ch-cover-body">${d.body}</p>` : '';
    const itemsHTML = (d.coverItems || []).length ? `
      <div class="ch-cover-items">
        ${(d.coverItems || []).map(item => `
          <div class="ch-cover-item">
            <div class="ch-cover-item-label">${item.label || ''}</div>
            <div class="ch-cover-item-value">${item.value || ''}</div>
          </div>`).join('')}
      </div>` : '';
    return `
    <div class="s-ch-cover${d.homeCover ? ' s-ch-cover--home' : ''}">
      <div class="ch-cover-bg-num">${chapter.number || ''}</div>
      ${metaHTML}
      <div class="ch-cover-tag">
        <span class="ch-cover-tag-label">Chapter</span>
        <span class="ch-cover-tag-num">${chapter.number || ''}</span>
      </div>
      <h2 class="ch-cover-title">${lines}</h2>
      <p class="ch-cover-sub">${d.subtitle || ''}</p>
      ${bodyHTML}
      ${itemsHTML}
      <div class="ch-cover-bar"></div>
    </div>`;
  }

  function htmlTextFocus(d) {
    const noteHTML = d.note ? `
      <div class="text-note">
        <span class="text-note-icon">※</span>
        <span class="text-note-text">${d.note}</span>
      </div>` : '';
    return `
    <div class="s-text-focus">
      <div class="s-eyebrow">${d.eyebrow || ''}</div>
      <h2 class="s-title">${(d.title || '').replace(/\n/g, '<br>')}</h2>
      <p class="s-body">${d.body || ''}</p>
      ${takeawayHTML(d.takeaway)}
      ${noteHTML}
    </div>`;
  }

  function htmlFlowchart(d) {
    const nodes = d.nodes || [];

    function nodeHTML(n) {
      return `
        <div class="fc-node" data-node-id="${n.id}"
             style="--nc:${n.color}"
             role="button" tabindex="0"
             aria-label="${n.label}">
          <div class="fc-n-num">${n.num}</div>
          <div class="fc-n-label">${n.label}</div>
          <div class="fc-n-sub">${n.sub}</div>
        </div>`;
    }

    const arrowSVG = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;

    const top = nodes.slice(0, 3);
    const bot = nodes.slice(3, 5);

    const topRow = top.map((n, i) => {
      const arrow = i < top.length - 1
        ? `<div class="fc-arrow">${arrowSVG}</div>` : '';
      return `<div class="fc-node-wrap">${nodeHTML(n)}</div>${arrow}`;
    }).join('');

    const botRow = bot.map(n =>
      `<div class="fc-node-wrap">${nodeHTML(n)}</div>`
    ).join('');

    return `
    <div class="s-flowchart">
      <div class="s-flowchart-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
      </div>
      <div class="fc-layout">
        <div class="fc-row-top">${topRow}</div>
        <div class="fc-bridge">
          <div class="fc-bridge-vline"></div>
          <div class="fc-bridge-pill">↓&nbsp;&nbsp;Reverse Engineering&nbsp;&nbsp;↓</div>
          <div class="fc-bridge-vline"></div>
        </div>
        <div class="fc-row-bottom">${botRow}</div>
      </div>
      <div class="fc-detail" id="fcDetail">
        <span class="fc-detail-hint">${d.hint || 'Hover a node to explore'}</span>
      </div>
    </div>`;
  }

  /* ─── Slide: DEMAND GRID ──────────────────────────────────────── */
  function htmlDemandGrid(d) {
    const cards = (d.categories || []).map(cat => `
      <div class="dg-card" data-cat-num="${cat.num}" role="button" tabindex="0" aria-label="${cat.label}">
        <div class="dg-card-top">
          <div class="dg-num">${cat.num}</div>
          ${cat.marker ? `<div class="dg-marker">${cat.marker}</div>` : ''}
        </div>
        <div class="dg-label">${cat.label}</div>
        <div class="dg-problem">${cat.problem || ''}</div>
        <div class="dg-tag">${cat.metric || cat.tag || ''}</div>
      </div>`).join('');
    return `
    <div class="s-demand-grid">
      <div class="s-dg-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.intro ? `<p class="s-body" style="margin-top:12px">${d.intro}</p>` : ''}
      </div>
      <div class="dg-grid">${cards}</div>
    </div>`;
  }

  /* ─── Slide: STAT COMPARE ──────────────────────────────────────── */
  function htmlStatCompare(d) {
    const noteHTML = d.note ? `<div class="text-note"><span class="text-note-icon">※</span><span class="text-note-text">${d.note}</span></div>` : '';
    const blockHTML = s => `
      <div class="sc-block sc-block--${s.tone || 'secondary'}">
        <div class="sc-value">${s.value || ''}</div>
        <div class="sc-label">${s.label || ''}</div>
        <div class="sc-sub">${s.sub || ''}</div>
      </div>`;
    return `
    <div class="s-stat-compare">
      <div class="s-eyebrow">${d.eyebrow || ''}</div>
      <h2 class="s-title">${d.title || ''}</h2>
      <div class="sc-row">
        ${blockHTML(d.statA || {})}
        <div class="sc-sep"></div>
        ${blockHTML(d.statB || {})}
      </div>
      <p class="s-body" style="max-width:600px">${d.body || ''}</p>
      ${takeawayHTML(d.takeaway)}
      ${noteHTML}
    </div>`;
  }

  /* ─── Slide: STACK LAYERS ──────────────────────────────────────── */
  function htmlStackLayers(d) {
    const noteHTML = d.note ? `<div class="text-note"><span class="text-note-icon">※</span><span class="text-note-text">${d.note}</span></div>` : '';
    const layersHTML = (d.layers || []).map(l => `
      <div class="sl-layer${l.dominant ? ' sl-layer--dominant' : ''}">
        <div class="sl-top">
          <div class="sl-left">
            <div class="sl-label">${l.label}</div>
            <div class="sl-share">${l.share}</div>
          </div>
          <div class="sl-right">
            <div class="sl-bar-track"><div class="sl-bar" style="width:${l.bar || 0}%"></div></div>
            <div class="sl-rate">${l.rate}</div>
          </div>
        </div>
        ${l.desc ? `<div class="sl-desc">${l.desc}</div>` : ''}
      </div>`).join('');
    return `
    <div class="s-stack-layers">
      <div class="sl-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="sl-stack">${layersHTML}</div>
      ${takeawayHTML(d.takeaway)}
      ${noteHTML}
    </div>`;
  }

  function htmlCausalChain(d) {
    const steps = (d.steps || []).map((item, index) => `
      <div class="cc-node">
        <div class="cc-step">${item.step || String(index + 1).padStart(2, '0')}</div>
        <div class="cc-label">${item.label || ''}</div>
        <div class="cc-title">${item.title || ''}</div>
        <div class="cc-detail">${item.detail || ''}</div>
      </div>`).join('<div class="cc-arrow" aria-hidden="true">→</div>');
    const noteHTML = d.note ? `<div class="text-note"><span class="text-note-icon">※</span><span class="text-note-text">${d.note}</span></div>` : '';
    return `
    <div class="s-causal-chain">
      <div class="cc-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="cc-chain">${steps}</div>
      ${takeawayHTML(d.takeaway)}
      ${noteHTML}
    </div>`;
  }

  function htmlContrastFrame(d) {
    const left = d.left || {};
    const right = d.right || {};
    const pointsHTML = points => (points || []).map(point => `<li>${point}</li>`).join('');
    const noteHTML = d.note ? `<div class="text-note"><span class="text-note-icon">※</span><span class="text-note-text">${d.note}</span></div>` : '';
    return `
    <div class="s-contrast-frame">
      <div class="cf-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="cf-main">
        <div class="cf-side">
          <div class="cf-label">${left.label || ''}</div>
          <div class="cf-title">${left.title || ''}</div>
          <ul class="cf-points">${pointsHTML(left.points)}</ul>
        </div>
        <div class="cf-divider" aria-hidden="true">vs</div>
        <div class="cf-side cf-side--actual">
          <div class="cf-label">${right.label || ''}</div>
          <div class="cf-title">${right.title || ''}</div>
          <ul class="cf-points">${pointsHTML(right.points)}</ul>
        </div>
      </div>
      ${takeawayHTML(d.takeaway)}
      ${noteHTML}
    </div>`;
  }

  function htmlFlowPath(d) {
    const steps = (d.steps || []).map(step => `
      <div class="fp-step">
        <div class="fp-dot"></div>
        <div class="fp-label">${step.label || ''}</div>
        <div class="fp-title">${step.title || ''}</div>
        <div class="fp-detail">${step.detail || ''}</div>
      </div>`).join('<div class="fp-arrow" aria-hidden="true">→</div>');
    const noteHTML = d.note ? `<div class="text-note"><span class="text-note-icon">※</span><span class="text-note-text">${d.note}</span></div>` : '';
    return `
    <div class="s-flow-path">
      <div class="fp-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="fp-flow">${steps}</div>
      <div class="fp-phase">
        <div class="fp-phase-label">${d.phaseLabel || 'Flow'}</div>
        <div class="fp-phase-text">${d.phaseText || ''}</div>
      </div>
      ${takeawayHTML(d.takeaway)}
      ${noteHTML}
    </div>`;
  }

  /* ─── Slide: SUPPLY MAP ────────────────────────────────────────── */
  function htmlSupplyMap(d) {
    const noteHTML = d.note ? `<div class="text-note"><span class="text-note-icon">※</span><span class="text-note-text">${d.note}</span></div>` : '';
    const tiersHTML = (d.tiers || []).map(t => `
      <div class="sm-tier" data-tier-id="${t.id}" role="button" tabindex="0">
        <div class="sm-left">
          <div class="sm-num">${t.num}</div>
          <div class="sm-info">
            <div class="sm-label">${t.label}</div>
            <div class="sm-sub">${t.sub}</div>
          </div>
        </div>
        <div class="sm-bar-track"><div class="sm-bar" style="width:${t.bar || 0}%"></div></div>
        <div class="sm-players">${(t.players || []).map(p => `<span class="sm-pill">${p}</span>`).join('')}</div>
      </div>`).join('');
    return `
    <div class="s-supply-map">
      <div class="sm-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
      </div>
      <div class="sm-tiers">${tiersHTML}</div>
      <div class="sm-detail" id="smDetail">
        <span class="sm-detail-hint">${d.hint || 'Hover a tier'}</span>
      </div>
      ${takeawayHTML(d.takeaway)}
      ${noteHTML}
    </div>`;
  }

  function htmlProofCards(d) {
    const cards = (d.cards || []).map(card => `
      <div class="pc-card">
        <div class="pc-label">${card.label || ''}</div>
        <div class="pc-title">${card.title || ''}</div>
        <div class="pc-body">${card.body || ''}</div>
      </div>`).join('');
    const noteHTML = d.note ? `
      <div class="text-note">
        <span class="text-note-icon">※</span>
        <span class="text-note-text">${d.note}</span>
      </div>` : '';
    return `
    <div class="s-proof-cards">
      <div class="pc-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="pc-grid">${cards}</div>
      ${takeawayHTML(d.takeaway)}
      ${noteHTML}
    </div>`;
  }

  function htmlSummaryGrid(d) {
    const items = (d.items || []).map(item => `
      <div class="sum-card">
        <div class="sum-label">${item.label || ''}</div>
        <div class="sum-title">${item.title || ''}</div>
        <div class="sum-desc">${item.desc || ''}</div>
      </div>`).join('');
    return `
    <div class="s-summary-grid">
      <div class="sum-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.intro ? `<p class="s-body">${d.intro}</p>` : ''}
      </div>
      <div class="sum-grid">${items}</div>
      ${takeawayHTML(d.takeaway)}
    </div>`;
  }

  function htmlInsightSequence(d) {
    const rows = (d.insights || []).map(item => `
      <div class="is-row">
        <div class="is-rail">
          <div class="is-num">${item.num || ''}</div>
          <div class="is-node"></div>
        </div>
        <div class="is-main">
          <div class="is-label">${item.label || ''}</div>
          <div class="is-title">${item.title || ''}</div>
          <div class="is-body">${item.body || ''}</div>
        </div>
      </div>`).join('');
    const implicationHTML = d.implication ? `
      <div class="is-implication">
        <div class="is-implication-label">${d.implicationLabel || t('implication')}</div>
        <div class="is-implication-text">${d.implication}</div>
      </div>` : '';
    const noteHTML = d.note ? `
      <div class="text-note">
        <span class="text-note-icon">※</span>
        <span class="text-note-text">${d.note}</span>
      </div>` : '';
    return `
    <div class="s-insight-sequence">
      <div class="is-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="is-rows">${rows}</div>
      ${takeawayHTML(d.takeaway)}
      ${implicationHTML}
      ${noteHTML}
    </div>`;
  }

  function htmlFieldMap(d) {
    const zones = (d.zones || []).map(zone => `
      <div class="fm-zone${zone.wedge ? ' fm-zone--wedge' : ''}">
        <div class="fm-zone-head">
          <div class="fm-zone-label">${zone.label || ''}</div>
          <div class="fm-zone-position">${zone.position || ''}</div>
        </div>
        <div class="fm-zone-detail">${zone.detail || ''}</div>
        <div class="fm-zone-players">
          ${(zone.players || []).map(player => `<span class="fm-pill">${player}</span>`).join('')}
        </div>
      </div>`).join('');
    const noteHTML = d.note ? `
      <div class="text-note">
        <span class="text-note-icon">※</span>
        <span class="text-note-text">${d.note}</span>
      </div>` : '';
    return `
    <div class="s-field-map">
      <div class="fm-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="fm-scale">
        <span>${t('moreClosed')}</span>
        <div class="fm-scale-line"></div>
        <span>${t('moreOpen')}</span>
      </div>
      <div class="fm-field">
        ${zones}
      </div>
      ${takeawayHTML(d.takeaway)}
      ${noteHTML}
    </div>`;
  }

  function htmlLayeredStack(d) {
    const layers = (d.layers || []).map(layer => `
      <div class="ls-band" style="width:${layer.width || 100}%">
        <div class="ls-band-head">
          <div class="ls-band-label">${layer.label || ''}</div>
          <div class="ls-band-title">${layer.title || ''}</div>
        </div>
        <div class="ls-band-detail">${layer.detail || ''}</div>
        <div class="ls-band-players">${(layer.players || []).map(player => `<span class="ls-pill">${player}</span>`).join('')}</div>
      </div>`).join('');
    const noteHTML = d.note ? `<div class="text-note"><span class="text-note-icon">※</span><span class="text-note-text">${d.note}</span></div>` : '';
    return `
    <div class="s-layered-stack">
      <div class="ls-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="ls-stack">${layers}</div>
      ${takeawayHTML(d.takeaway)}
      ${noteHTML}
    </div>`;
  }

  function htmlMismatchMap(d) {
    const demand = (d.demand || []).map(item => `<li class="mm-item">${item}</li>`).join('');
    const delivery = (d.delivery || []).map(item => `<li class="mm-item">${item}</li>`).join('');
    const noteHTML = d.note ? `<div class="text-note"><span class="text-note-icon">※</span><span class="text-note-text">${d.note}</span></div>` : '';
    return `
    <div class="s-mismatch-map">
      <div class="mm-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="mm-top">
        <div class="mm-zone-label">${t('demand')}</div>
        <ul class="mm-list">${demand}</ul>
      </div>
      <div class="mm-gap">
        <div class="mm-gap-label">${d.gapLabel || t('gap')}</div>
        <div class="mm-gap-title">${d.gapTitle || ''}</div>
        <div class="mm-gap-body">${d.gapBody || ''}</div>
      </div>
      <div class="mm-bottom">
        <div class="mm-zone-label">${t('delivery')}</div>
        <ul class="mm-list">${delivery}</ul>
      </div>
      ${takeawayHTML(d.takeaway)}
      ${noteHTML}
    </div>`;
  }

  function htmlValueFlow(d) {
    const splits = (d.splits || []).map(item => `
      <div class="vf-band${item.dominant ? ' vf-band--dominant' : ''}">
        <div class="vf-band-top">
          <div class="vf-band-label">${item.label || ''}</div>
          <div class="vf-band-share">${item.share || ''}</div>
        </div>
        <div class="vf-band-sub">${item.sub || ''}</div>
        ${item.growth ? `<div class="vf-band-growth">${item.growth}</div>` : ''}
        <div class="vf-band-note">${item.note || ''}</div>
      </div>`).join('');
    const control = d.control || {};
    const noteHTML = d.note ? `
      <div class="text-note">
        <span class="text-note-icon">※</span>
        <span class="text-note-text">${d.note}</span>
      </div>` : '';
    return `
    <div class="s-value-flow">
      <div class="vf-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="vf-layout">
        <div class="vf-left">
          <div class="vf-label">${t('visibleBudgetFlow')}</div>
          <div class="vf-bands">${splits}</div>
        </div>
        <div class="vf-right">
          <div class="vf-label">${t('controlLayer')}</div>
          <div class="vf-control">
            <div class="vf-control-head">${control.label || ''}</div>
            <div class="vf-control-title">${control.title || ''}</div>
            <div class="vf-control-body">${control.body || ''}</div>
          </div>
        </div>
      </div>
      ${takeawayHTML(d.takeaway)}
      ${noteHTML}
    </div>`;
  }

  function htmlOpportunityLadder(d) {
    const rows = (d.opportunities || []).map(item => `
      <div class="ol-row ol-row--${item.priority || 'medium'}">
        <div class="ol-rank">${item.rank || ''}</div>
        <div class="ol-main">
          <div class="ol-head">
            <div class="ol-label">${item.label || ''}</div>
            <div class="ol-fit">${item.fit || ''}</div>
          </div>
          <div class="ol-title">${item.title || ''}</div>
          <div class="ol-body">${item.body || ''}</div>
          <div class="ol-route">${item.route || ''}</div>
        </div>
      </div>`).join('');
    const noteHTML = d.note ? `
      <div class="text-note">
        <span class="text-note-icon">※</span>
        <span class="text-note-text">${d.note}</span>
      </div>` : '';
    return `
    <div class="s-opportunity-ladder">
      <div class="ol-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="ol-rows">${rows}</div>
      ${takeawayHTML(d.takeaway)}
      ${noteHTML}
    </div>`;
  }

  function htmlRoleLanes(d) {
    const headers = (d.headers || []).map(h => `<div class="rl-head-cell">${h}</div>`).join('');
    const lanes = (d.lanes || []).map(lane => `
      <div class="rl-row${lane.highlight ? ' rl-row--highlight' : ''}">
        <div class="rl-cell rl-cell--label">
          <div class="rl-label">${lane.label || ''}</div>
          <div class="rl-sub">${lane.sub || ''}</div>
        </div>
        <div class="rl-cell">${lane.roles || ''}</div>
        <div class="rl-cell">${lane.hiring || ''}</div>
        <div class="rl-cell">${lane.language || ''}</div>
        <div class="rl-cell">${lane.salary || ''}</div>
      </div>`).join('');
    const noteHTML = d.note ? `
      <div class="text-note">
        <span class="text-note-icon">※</span>
        <span class="text-note-text">${d.note}</span>
      </div>` : '';
    return `
    <div class="s-role-lanes">
      <div class="rl-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        ${questionHTML(d.question)}
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        ${d.body ? `<p class="s-body">${d.body}</p>` : ''}
      </div>
      <div class="rl-table">
        <div class="rl-head">${headers}</div>
        <div class="rl-body">${lanes}</div>
      </div>
      ${takeawayHTML(d.takeaway)}
      ${noteHTML}
    </div>`;
  }

  /* ─── Part 1 slide renderers ──────────────────────────────────── */

  function htmlRefutationFrame(d) {
    const cards = (d.rejections || []).map(r => `
      <div class="rf-card">
        <div class="rf-card-claim">${r.claim || ''}</div>
        <div class="rf-card-evidence">${r.argument || ''}</div>
      </div>`).join('');
    return `
    <div class="s-refutation-frame">
      <div class="rf-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
      </div>
      <div class="rf-cards">${cards}</div>
      ${summaryHTML(d.conclusion, d.conclusionLabel || t('conclusion'), 'rf-conclusion')}
      ${d.note ? `<div class="text-note"><span class="text-note-icon">※</span><span class="text-note-text">${d.note}</span></div>` : ''}
    </div>`;
  }

  function htmlResearchOverview(d) {
    const outcomes = (d.outcomes || []).map(o => `
      <div class="ro-outcome">
        <span class="ro-outcome-num">${o.num || ''}</span>
        <div class="ro-outcome-body">
          <div class="ro-outcome-title">${o.title || ''}</div>
          <div class="ro-outcome-desc">${o.desc || ''}</div>
        </div>
      </div>`).join('');
    const notes = (d.notes || []).map(n => `
      <div class="ro-note">
        <span class="ro-note-icon" aria-hidden="true">${n.icon || '◈'}</span>
        <p class="ro-note-text">${n.text || ''}</p>
      </div>`).join('');
    return `
    <div class="s-research-overview">
      <div class="ro-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
      </div>
      <div class="ro-body">
        <div class="ro-outcomes-col">
          ${d.outcomeLabel ? `<div class="ro-col-label">${d.outcomeLabel}</div>` : ''}
          <div class="ro-outcomes">${outcomes}</div>
        </div>
        <div class="ro-notes-col">${notes}</div>
      </div>
    </div>`;
  }

  function htmlMarketGap(d) {
    const gapsHTML = (d.gaps || []).map(gap => {
      const rowsHTML = (gap.rows || []).map(row => `
        <div class="mgap-row${row.de ? ' mgap-row--de' : ''}">
          <div class="mgap-market">${row.market}</div>
          <div class="mgap-value">${row.value}</div>
          <div class="mgap-sub">${row.sub || ''}</div>
        </div>`).join('');
      return `
      <div class="mgap-card">
        <div class="mgap-card-head">
          <span class="mgap-num">${gap.num}</span>
          <span class="mgap-label">${gap.label}</span>
        </div>
        <div class="mgap-table">${rowsHTML}</div>
        ${gap.insight ? `<div class="mgap-insight">${gap.insight}</div>` : ''}
      </div>`;
    }).join('');
    return `
    <div class="s-market-gap">
      <div class="mgap-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
      </div>
      <div class="mgap-grid">${gapsHTML}</div>
      ${d.hook ? `<div class="mgap-hook">${d.hook}</div>` : ''}
    </div>`;
  }

  function htmlPhenomenaQuestion(d) {
    const cards = (d.phenomena || []).map(p => `
      <div class="pq-card">
        <div class="pq-card-kw">${p.keyword || ''}</div>
        <div class="pq-card-note">${p.note || ''}</div>
      </div>`).join('');
    const stats = (d.stats || []).map(s => `
      <div class="pq-stat">
        <div class="pq-stat-value">${s.value || ''}</div>
        <div class="pq-stat-label">${s.label || ''}</div>
      </div>`).join('');
    return `
    <div class="s-phenomena-question">
      <div class="pq-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
      </div>
      <div class="pq-grid">${cards}</div>
      ${stats ? `<div class="pq-stats">${stats}</div>` : ''}
      <div class="pq-question">${d.question || ''}</div>
      ${d.note ? `<div class="text-note"><span class="text-note-icon">※</span><span class="text-note-text">${d.note}</span></div>` : ''}
    </div>`;
  }

  function htmlMarketCompare(d) {
    const headerRow = `
      <div class="mc-cell mc-cell--corner"></div>
      <div class="mc-cell mc-cell--head">🇺🇸 United States</div>
      <div class="mc-cell mc-cell--head">🇨🇳 China</div>
      <div class="mc-cell mc-cell--head mc-cell--de">🇩🇪 Germany</div>`;
    const rows = (d.rows || []).map(row => `
      <div class="mc-cell mc-cell--label">${row.label || ''}</div>
      <div class="mc-cell">${row.us || ''}</div>
      <div class="mc-cell">${row.cn || ''}</div>
      <div class="mc-cell mc-cell--de">${row.de || ''}</div>`).join('');
    return `
    <div class="s-market-compare">
      <div class="mc-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
      </div>
      <div class="mc-table">${headerRow}${rows}</div>
      ${summaryHTML(d.conclusion, d.conclusionLabel || t('conclusion'), 'mc-conclusion')}
      ${d.note ? `<div class="text-note"><span class="text-note-icon">※</span><span class="text-note-text">${d.note}</span></div>` : ''}
    </div>`;
  }

  function htmlCoreArgument(d) {
    const bullets = (d.bullets || []).map(b => `
      <div class="carg-bullet">
        <span class="carg-bullet-label">${b.label || ''}</span>
        <span class="carg-bullet-note">${b.note || ''}</span>
      </div>`).join('');
    return `
    <div class="s-core-argument">
      <div class="carg-top">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
      </div>
      <div class="carg-layout">
        ${bullets ? `<div class="carg-core">${`<div class="carg-bullets">${bullets}</div>`}</div>` : ''}
        ${(d.lead || d.quote) ? `
          <div class="carg-evidence">
            ${d.lead ? `<div class="carg-evidence-card carg-evidence-card--lead">${d.lead}</div>` : ''}
            ${d.quote ? `<blockquote class="carg-quote carg-evidence-card">${d.quote}</blockquote>` : ''}
          </div>` : ''}
      </div>
      ${summaryHTML(d.statement, d.statementLabel || t('conclusion'), 'carg-statement')}
      ${d.note ? `<div class="text-note"><span class="text-note-icon">※</span><span class="text-note-text">${d.note}</span></div>` : ''}
    </div>`;
  }

  function htmlDualCascade(d) {
    const constraints = (d.constraints || []).map(c => `
      <div class="dcas-node">
        <div class="dcas-node-label">${c.label || ''}</div>
        <div class="dcas-node-note">${c.note || ''}</div>
      </div>`).join('');
    const arrowCols = (d.constraints || []).map(() =>
      `<div class="dcas-col-arrow" aria-hidden="true">↓</div>`).join('');
    const behaviorCols = (d.behaviors || []).map(b => `
      <div class="dcas-beh-col">
        <div class="dcas-beh-text">${b}</div>
      </div>`).join('');
    return `
    <div class="s-dual-cascade">
      <div class="dcas-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
      </div>
      <div class="dcas-diagram">
        <div class="dcas-source">
          <div class="dcas-source-label">${d.source || ''}</div>
          ${d.sourceSub ? `<div class="dcas-source-sub">${d.sourceSub}</div>` : ''}
        </div>
        <div class="dcas-down-arrow" aria-hidden="true">↓</div>
        <div class="dcas-layer dcas-layer--constraints">${constraints}</div>
        <div class="dcas-arrow-row" aria-hidden="true">${arrowCols}</div>
        <div class="dcas-layer dcas-layer--behaviors">${behaviorCols}</div>
      </div>
      ${summaryHTML(d.synthesis, d.synthesisLabel || t('insight'), 'dcas-synthesis')}
    </div>`;
  }

  function htmlFrameworkSummary(d) {
    if (d.findings && d.findings.length) {
      const findingsHTML = d.findings.map(item => `
        <article class="fsm-takeaway-item">
          <div class="fsm-takeaway-num">${item.num || ''}</div>
          <div class="fsm-takeaway-main">
            <div class="fsm-takeaway-title">${item.title || ''}</div>
            ${item.body ? `<div class="fsm-takeaway-body">${item.body}</div>` : ''}
            ${(item.lines || []).length ? `
              <div class="fsm-takeaway-lines">
                ${(item.lines || []).map(line => `<div class="fsm-takeaway-line">${line}</div>`).join('')}
              </div>` : ''}
          </div>
        </article>`).join('');

      return `
      <div class="s-framework-summary s-framework-summary--takeaway">
        <div class="fsm-header">
          <div class="s-eyebrow">${d.eyebrow || ''}</div>
          <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
        </div>
        <div class="fsm-takeaway-list">${findingsHTML}</div>
        ${summaryHTML(d.transition, d.transitionLabel || t('conclusion'), 'fsm-transition')}
        ${d.note ? `<div class="text-note"><span class="text-note-icon">※</span><span class="text-note-text">${d.note}</span></div>` : ''}
      </div>`;
    }

    const modelBoxes = (d.model || []).map((m, i) => {
      const arrow = i < (d.model.length - 1)
        ? `<div class="fsm-arrow" aria-hidden="true">↓</div>` : '';
      return `
        <div class="fsm-box${i === 1 ? ' fsm-box--mid' : ''}">
          <div class="fsm-box-label">${m.label || ''}</div>
          <div class="fsm-box-sub">${m.sub || ''}</div>
        </div>${arrow}`;
    }).join('');
    const examples = (d.examples || []).map(ex => `
      <div class="fsm-ex-row">
        <div class="fsm-ex-q">${ex.phenomenon || ''}</div>
        <div class="fsm-ex-a">${ex.explanation || ''}</div>
      </div>`).join('');
    const principles = (d.principles || []).map((p, i) => `
      <div class="fsm-principle">
        <span class="fsm-p-num">${String(i + 1).padStart(2, '0')}</span>
        <span class="fsm-p-text">${p}</span>
      </div>`).join('');
    return `
    <div class="s-framework-summary">
      <div class="fsm-header">
        <div class="s-eyebrow">${d.eyebrow || ''}</div>
        <h2 class="s-title" style="margin-top:8px">${d.title || ''}</h2>
      </div>
      <div class="fsm-body">
        <div class="fsm-model">${modelBoxes}</div>
        <div class="fsm-right">
          ${examples ? `<div class="fsm-examples">${examples}</div>` : ''}
          ${principles ? `<div class="fsm-principles">${principles}</div>` : ''}
        </div>
      </div>
      ${summaryHTML(d.transition, d.transitionLabel || t('conclusion'), 'fsm-transition')}
      ${d.note ? `<div class="text-note"><span class="text-note-icon">※</span><span class="text-note-text">${d.note}</span></div>` : ''}
    </div>`;
  }

  function htmlDemandOrigin(d) {
    const demands = (d.demands || []).map(item => `
      <div class="dori-card">
        <div class="dori-card-top">
          <span class="dori-card-num">${item.num}</span>
        </div>
        <div class="dori-card-body">
          <div class="dori-card-title">${item.title}</div>
          ${(item.origin || item.focus) ? `
            <div class="dori-card-meta">
              ${item.origin ? `
                <div class="dori-card-meta-item">${item.origin}</div>` : ''}
              ${item.focus ? `
                <div class="dori-card-meta-item">${item.focus}</div>` : ''}
            </div>` : ''}
          <div class="dori-card-section">
            <div class="dori-card-desc">${item.characteristics || item.note || ''}</div>
          </div>
        </div>
      </div>`).join('');

    return `
    <div class="s-demand-origin">
      <div class="dori-header">
        ${d.label ? `<div class="dori-label">${d.label}</div>` : ''}
        <h2 class="dori-title">${d.title || ''}</h2>
        ${d.intro ? `<p class="dori-intro">${d.intro}</p>` : ''}
      </div>

      <div class="dori-block">
        <div class="dori-block-head">
          <div class="dori-block-title">${d.demandsTitle || 'Six Demand Categories'}</div>
        </div>
        <div class="dori-cards">${demands}</div>
      </div>

      ${summaryHTML(d.conclusion, d.insightLabel || t('insight'), 'dori-conclusion')}
      ${d.note ? `<div class="text-note"><span class="text-note-icon">※</span><span class="text-note-text">${d.note}</span></div>` : ''}
    </div>`;
  }

  function htmlCustomerSegments(d) {
    const segmentsHTML = (d.segments || []).map(segment => {
      const factsHTML = (segment.facts || []).map(fact => `
        <div class="cseg-fact">
          <div class="cseg-fact-label">${fact.label || ''}</div>
          <div class="cseg-fact-value">${fact.value || ''}</div>
        </div>`).join('');

      return `
        <article class="cseg-card${segment.highlight ? ' cseg-card--highlight' : ''}">
          <div class="cseg-card-top">
            <div>
              <div class="cseg-card-title">${segment.title || ''}</div>
              <div class="cseg-card-sub">${segment.sub || ''}</div>
            </div>
            ${segment.badge ? `<div class="cseg-card-badge">${segment.badge}</div>` : ''}
          </div>
          ${segment.summary ? `<div class="cseg-card-summary">${segment.summary}</div>` : ''}
          <div class="cseg-facts">${factsHTML}</div>
        </article>`;
    }).join('');

    const headers = d.industryHeaders || [];
    const industryHeaderHTML = headers.length ? `
      <div class="cseg-table-head">
        ${headers.map(label => `<div class="cseg-table-cell cseg-table-cell--head">${label}</div>`).join('')}
      </div>` : '';
    const industryRowsHTML = (d.industryRows || []).map(row => `
      <div class="cseg-table-row">
        <div class="cseg-table-cell cseg-table-cell--industry">${row.industry || ''}</div>
        <div class="cseg-table-cell">${row.demand || ''}</div>
        <div class="cseg-table-cell">${row.factor || ''}</div>
      </div>`).join('');

    const industryContent = `
      <div class="cseg-industry">
        <div class="cseg-industry-copy">
          <div class="cseg-section-label">${d.industryTitle || ''}</div>
          ${d.industryIntro ? `<div class="cseg-section-text">${d.industryIntro}</div>` : ''}
        </div>
        <div class="cseg-table">
          ${industryHeaderHTML}
          ${industryRowsHTML}
        </div>
      </div>`;

    const industryBlock = d.industryDetailsTitle ? `
      <details class="cseg-details">
        <summary class="cseg-details-summary">
          <span class="cseg-details-copy">
            <span class="cseg-details-title">${d.industryDetailsTitle}</span>
            ${d.industryDetailsPreview ? `<span class="cseg-details-preview">${d.industryDetailsPreview}</span>` : ''}
          </span>
          <span class="cseg-details-icon" aria-hidden="true">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </summary>
        <div class="cseg-details-body">${industryContent}</div>
      </details>` : industryContent;

    return `
    <div class="s-customer-segments">
      <div class="cseg-header">
        ${d.eyebrow ? `<div class="s-eyebrow">${d.eyebrow}</div>` : ''}
        ${d.label ? `<div class="cseg-label">${d.label}</div>` : ''}
        <h2 class="s-title cseg-title">${d.title || ''}</h2>
        ${d.intro ? `<p class="s-body cseg-intro">${d.intro}</p>` : ''}
      </div>

      <div class="cseg-grid">${segmentsHTML}</div>

      ${industryBlock}

      ${summaryHTML(d.insight, d.insightLabel || t('insight'), 'cseg-insight')}
    </div>`;
  }

  function htmlMarketSegments(d) {
    const legendHTML = (d.legend || []).map(item => `
      <div class="mseg-legend-item">
        <span class="mseg-legend-dot mseg-legend-dot--${item.tone || 'default'}"></span>
        <span class="mseg-legend-label">${item.label || ''}</span>
      </div>`).join('');

    const quadrantHTML = (d.quadrants || []).map(item => `
      <div class="mseg-quadrant mseg-quadrant--${item.pos}"${item.posStyle ? ` style="${item.posStyle}"` : ''}>${item.label}</div>
    `).join('');

    const nodes = (d.segments || []).map(seg => {
      const toneClass = seg.tone ? ` mseg-bubble--${seg.tone}` : '';
      const labelLines = (seg.label || '').split('\n').join('<br>');
      const style = [
        `left:${seg.x}%`,
        `bottom:${seg.y}%`,
        seg.width ? `--mseg-bubble-w:${seg.width}px` : '',
        seg.height ? `--mseg-bubble-h:${seg.height}px` : '',
        seg.color ? `--mseg-bubble-accent:${seg.color}` : '',
        seg.fill ? `--mseg-bubble-fill:${seg.fill}` : '',
      ].filter(Boolean).join(';');
      return `
        <div class="mseg-bubble${toneClass}" style="${style}">
          <div class="mseg-bubble-title">${labelLines}</div>
          ${seg.sub ? `<div class="mseg-bubble-sub">${seg.sub}</div>` : ''}
          ${seg.note ? `<div class="mseg-bubble-note">${seg.note}</div>` : ''}
        </div>`;
    }).join('');

    const cloud = d.cloud ? `
      <div class="mseg-cloud-zone" style="left:${d.cloud.x}%;bottom:${d.cloud.y}%;width:${d.cloud.w}%;height:${d.cloud.h}%">
        <span class="mseg-cloud-label">${d.cloud.label}</span>
        ${d.cloud.sub ? `<span class="mseg-cloud-sub">${d.cloud.sub}</span>` : ''}
      </div>` : '';

    const cloudPanel = d.cloudPanel ? `
      <div class="mseg-cloud-panel">
        <div class="mseg-cloud-panel-title">${d.cloudPanel.title || ''}</div>
        <div class="mseg-cloud-panel-body">${d.cloudPanel.body || ''}</div>
        ${d.cloudPanel.examples ? `<div class="mseg-cloud-panel-examples">${d.cloudPanel.examples}</div>` : ''}
      </div>` : '';

    const readingHTML = (d.readingBlocks || []).map(block => `
      <div class="mseg-reading-card">
        <div class="mseg-reading-title">${block.title || ''}</div>
        <div class="mseg-reading-body">${block.body || ''}</div>
      </div>`).join('');

    const marketContextHTML = d.marketContext ? `
      <div class="mseg-market-context">
        <div class="mseg-market-context-label">${d.marketContext.label || ''}</div>
        <div class="mseg-market-context-body">${d.marketContext.body || ''}</div>
      </div>` : '';

    const scopeNotesHTML = (d.scopeNotes || []).map(item => `
      <div class="mseg-scope-row">
        <div class="mseg-scope-name">${item.name || ''}</div>
        <div class="mseg-scope-body">${item.body || ''}</div>
      </div>`).join('');

    const tableRows = (d.table || []).map(row => `
      <div class="mseg-row">
        <div class="mseg-row-name">
          <span class="mseg-row-num">${row.num || ''}</span>
          <span>${row.name}</span>
        </div>
        <div class="mseg-row-cell">${row.size}</div>
        <div class="mseg-row-cell">${row.growth}</div>
        <div class="mseg-row-cell">${row.competition}</div>
        <div class="mseg-row-cell">${row.entry}</div>
        <div class="mseg-row-cell mseg-row-cell--opp">${row.opp}</div>
      </div>`).join('');

    const supportTable = `
      <div class="mseg-table-block">
        <div class="mseg-support-label">Segment comparison</div>
        <div class="mseg-table">
          <div class="mseg-row mseg-row--head">
            <div class="mseg-row-name"></div>
            <div class="mseg-row-cell">${(d.tableHeaders || [])[0] || 'Market size'}</div>
            <div class="mseg-row-cell">${(d.tableHeaders || [])[1] || 'Growth'}</div>
            <div class="mseg-row-cell">${(d.tableHeaders || [])[2] || 'Competition'}</div>
            <div class="mseg-row-cell">${(d.tableHeaders || [])[3] || 'Entry difficulty'}</div>
            <div class="mseg-row-cell mseg-row-cell--opp">${(d.tableHeaders || [])[4] || 'Opportunity type'}</div>
          </div>
          ${tableRows}
        </div>
      </div>`;

    const scopeBlock = scopeNotesHTML ? `
      <details class="mseg-details">
        <summary class="mseg-details-summary">
          <span class="mseg-details-copy">
            <span class="mseg-details-title">${d.scopeTitle || 'How to read the segment numbers'}</span>
            <span class="mseg-details-preview">Open the assumptions behind segment sizing and budget logic.</span>
          </span>
          <span class="mseg-details-icon" aria-hidden="true">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </summary>
        <div class="mseg-details-body">
          <div class="mseg-scope-list">${scopeNotesHTML}</div>
        </div>
      </details>` : '';

    return `
    <div class="s-market-segments">
      <div class="mseg-header">
        ${d.label ? `<div class="cseg-label">${d.label}</div>` : ''}
        <h2 class="mseg-title">${d.title || ''}</h2>
        ${d.intro ? `<p class="dori-intro">${d.intro}</p>` : ''}
      </div>

      <div class="mseg-main">
        <div class="mseg-core">
          <div class="mseg-visual-panel">
            <div class="mseg-panel-label">Market map</div>
            <div class="mseg-chart-wrap">
              <div class="mseg-axis-y">
                <span class="mseg-axis-end">${d.axisYHigh || 'Mature'}</span>
                <span class="mseg-axis-y-label">${d.axisY || ''}</span>
                <span class="mseg-axis-end">${d.axisYLow || 'Emerging'}</span>
              </div>
              <div class="mseg-chart-col">
                <div class="mseg-chart">
                  ${quadrantHTML}
                  ${cloud}
                  ${nodes}
                </div>
                <div class="mseg-axis-x">
                  <span class="mseg-axis-end">${d.axisXLeft || ''}</span>
                  <span class="mseg-axis-end">${d.axisXRight || ''}</span>
                </div>
              </div>
            </div>
            ${legendHTML ? `<div class="mseg-legend">${legendHTML}</div>` : ''}
          </div>

          ${supportTable}
        </div>

        <aside class="mseg-side">
          ${marketContextHTML}
          ${cloudPanel}
          ${readingHTML ? `<div class="mseg-reading">${readingHTML}</div>` : ''}
          ${scopeBlock}
        </aside>
      </div>

      ${summaryHTML(d.conclusion, d.insightLabel || t('insight'), 'mseg-conclusion')}

      ${d.note ? `<div class="text-note"><span class="text-note-icon">※</span><span class="text-note-text">${d.note}</span></div>` : ''}
    </div>`;
  }

  function htmlDeliveryModes(d) {
    const modesHTML = (d.modes || []).map(mode => `
      <article class="dm-card${mode.highlight ? ' dm-card--highlight' : ''}">
        <div class="dm-card-top">
          <div class="dm-card-label">${mode.label || ''}</div>
          ${mode.badge ? `<div class="dm-card-badge">${mode.badge}</div>` : ''}
        </div>
        <div class="dm-card-title">${mode.title || ''}</div>
        <div class="dm-card-sub">${mode.sub || ''}</div>
        <div class="dm-card-body">${mode.body || ''}</div>
        <ul class="dm-points">
          ${(mode.points || []).map(point => `<li>${point}</li>`).join('')}
        </ul>
      </article>`).join('');

    const whyRowsHTML = (d.whyRows || []).map(row => `
      <div class="dm-why-row">
        <div class="dm-why-constraint">${row.constraint || ''}</div>
        <div class="dm-why-impact">${row.impact || ''}</div>
      </div>`).join('');

    const compareRowsHTML = (d.compareRows || []).map(row => `
      <div class="dm-compare-row">
        <div class="dm-compare-cell dm-compare-cell--name">${row.name || ''}</div>
        <div class="dm-compare-cell">${row.customer || ''}</div>
        <div class="dm-compare-cell">${row.margin || ''}</div>
        <div class="dm-compare-cell">${row.scalability || ''}</div>
        <div class="dm-compare-cell">${row.barrier || ''}</div>
        <div class="dm-compare-cell">${row.cycle || ''}</div>
        <div class="dm-compare-cell dm-compare-cell--examples">${row.examples || ''}</div>
      </div>`).join('');

    return `
    <div class="s-delivery-modes">
      <div class="dm-header">
        ${d.label ? `<div class="cseg-label">${d.label}</div>` : ''}
        <h2 class="mseg-title">${d.title || ''}</h2>
        ${d.intro ? `<p class="dori-intro">${d.intro}</p>` : ''}
      </div>

      <div class="dm-grid">${modesHTML}</div>

      <details class="dm-details">
        <summary class="dm-summary">
          <span class="dm-summary-copy">
            <span class="dm-summary-title">${d.whyTitle || 'Why service weight is high'}</span>
            ${d.whyPreview ? `<span class="dm-summary-preview">${d.whyPreview}</span>` : ''}
          </span>
          <span class="dm-summary-icon" aria-hidden="true">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </summary>
        <div class="dm-why">
          <div class="dm-why-head">
            <div class="dm-why-col">Constraint</div>
            <div class="dm-why-col">Impact on delivery mode</div>
          </div>
          ${whyRowsHTML}
        </div>
        ${d.whyConclusion ? `<div class="dm-why-conclusion">${d.whyConclusion}</div>` : ''}
      </details>

      <details class="dm-details">
        <summary class="dm-summary">
          <span class="dm-summary-copy">
            <span class="dm-summary-title">${d.compareTitle || 'Mode comparison'}</span>
            ${d.comparePreview ? `<span class="dm-summary-preview">${d.comparePreview}</span>` : ''}
          </span>
          <span class="dm-summary-icon" aria-hidden="true">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </summary>
        <div class="dm-compare">
          <div class="dm-compare-row dm-compare-row--head">
            <div class="dm-compare-cell dm-compare-cell--name"></div>
            ${(d.compareHeaders || []).map(header => `<div class="dm-compare-cell">${header}</div>`).join('')}
          </div>
          ${compareRowsHTML}
        </div>
      </details>
    </div>`;
  }

  function htmlPlayerEcosystem(d) {
    const playersHTML = (d.players || []).map(player => `
      <article class="pe-card${player.highlight ? ' pe-card--highlight' : ''}">
        <div class="pe-card-top">
          <div class="pe-card-label">${player.label || ''}</div>
          ${player.badge ? `<div class="pe-card-badge">${player.badge}</div>` : ''}
        </div>
        <div class="pe-card-title">${player.title || ''}</div>
        ${player.companies ? `<div class="pe-card-companies">${player.companies}</div>` : ''}
        ${player.body ? `<div class="pe-card-body">${player.body}</div>` : ''}
        ${player.role ? `<div class="pe-card-role">${player.role}</div>` : ''}
      </article>`).join('');

    const stackHTML = (d.stack || []).map((item, index) => `
      <div class="pe-stack-item${item.highlight ? ' pe-stack-item--highlight' : ''}">
        <div class="pe-stack-title">${item.title || ''}</div>
        <div class="pe-stack-sub">${item.sub || ''}</div>
      </div>
      ${index < (d.stack || []).length - 1 ? '<div class="pe-stack-arrow" aria-hidden="true">↓</div>' : ''}`
    ).join('');

    return `
    <div class="s-player-ecosystem">
      <div class="pe-header">
        ${d.label ? `<div class="cseg-label">${d.label}</div>` : ''}
        <h2 class="mseg-title">${d.title || ''}</h2>
        ${d.intro ? `<p class="dori-intro">${d.intro}</p>` : ''}
      </div>

      <div class="pe-grid">${playersHTML}</div>

      <div class="pe-stack-block">
        ${d.stackTitle ? `<div class="pe-stack-label">${d.stackTitle}</div>` : ''}
        <div class="pe-stack">${stackHTML}</div>
      </div>

      ${summaryHTML(d.insight, d.insightLabel || t('insight'), 'pe-insight')}
    </div>`;
  }

  function htmlCompetitiveDynamics(d) {
    const traitsHTML = (d.traits || []).map(item => `
      <article class="cd-card">
        <div class="cd-card-label">${item.label || ''}</div>
        <div class="cd-card-title">${item.title || ''}</div>
        <div class="cd-card-body">${item.body || ''}</div>
        <div class="cd-card-takeaway">${item.takeaway || ''}</div>
      </article>`).join('');

    const rankingHTML = (d.ranking || []).map(item => `
      <div class="cd-rank-item">
        <div class="cd-rank-num">${item.num || ''}</div>
        <div class="cd-rank-main">
          <div class="cd-rank-label">${item.label || ''}</div>
          <div class="cd-rank-note">${item.note || ''}</div>
        </div>
      </div>`).join('');

    const compareRowsHTML = (d.compareRows || []).map(row => `
      <div class="cd-compare-row">
        <div class="cd-compare-cell cd-compare-cell--dimension">${row.dimension || ''}</div>
        <div class="cd-compare-cell">${row.horizontal || ''}</div>
        <div class="cd-compare-cell">${row.vertical || ''}</div>
      </div>`).join('');

    return `
    <div class="s-competitive-dynamics">
      <div class="cd-header">
        ${d.label ? `<div class="cseg-label">${d.label}</div>` : ''}
        <h2 class="mseg-title">${d.title || ''}</h2>
        ${d.intro ? `<p class="dori-intro">${d.intro}</p>` : ''}
      </div>

      <div class="cd-grid">
        <div class="cd-traits">${traitsHTML}</div>
        <div class="cd-ranking-block">
          <div class="cd-ranking-title">${d.rankingTitle || ''}</div>
          <div class="cd-ranking">${rankingHTML}</div>
        </div>
      </div>

      <div class="cd-compare-block">
        <div class="cd-compare-title">${d.compareTitle || ''}</div>
        <div class="cd-compare">
          <div class="cd-compare-row cd-compare-row--head">
            ${(d.compareHeaders || []).map((header, index) => `<div class="cd-compare-cell${index === 0 ? ' cd-compare-cell--dimension' : ''}">${header}</div>`).join('')}
          </div>
          ${compareRowsHTML}
        </div>
      </div>

      ${summaryHTML(d.insight, d.insightLabel || t('insight'), 'cd-insight pe-insight')}
    </div>`;
  }

  function htmlBuyingDecision(d) {
    const rolesHTML = (d.roles || []).map(role => `
      <article class="bd-card${role.danger ? ' bd-card--danger' : ''}">
        <div class="bd-card-top">
          <div class="bd-card-label">${role.label || ''}</div>
          ${role.badge ? `<div class="bd-card-badge">${role.badge}</div>` : ''}
        </div>
        <div class="bd-card-title">${role.title || ''}</div>
        ${role.sub ? `<div class="bd-card-sub">${role.sub}</div>` : ''}
        ${role.body ? `<div class="bd-card-body">${role.body}</div>` : ''}
        ${role.points && role.points.length ? `
          <div class="bd-points">
            ${role.points.map(point => `<div class="bd-point">${point}</div>`).join('')}
          </div>` : ''}
        ${role.speak ? `
          <div class="bd-speak">
            <div class="bd-speak-label">What to say</div>
            <div class="bd-speak-text">${role.speak}</div>
          </div>` : ''}
      </article>`).join('');

    const tableRowsHTML = (d.tableRows || []).map(row => `
      <div class="bd-table-row">
        <div class="bd-table-cell bd-table-cell--label">${row.label || ''}</div>
        <div class="bd-table-cell">${row.enterprise || ''}</div>
        <div class="bd-table-cell bd-table-cell--mid">${row.mid || ''}</div>
        <div class="bd-table-cell">${row.small || ''}</div>
      </div>`).join('');

    return `
    <div class="s-buying-decision">
      <div class="bd-header">
        ${d.label ? `<div class="cseg-label">${d.label}</div>` : ''}
        <h2 class="mseg-title">${d.title || ''}</h2>
        ${d.intro ? `<p class="dori-intro">${d.intro}</p>` : ''}
      </div>

      <div class="bd-grid">${rolesHTML}</div>

      <div class="bd-table-block">
        <div class="bd-table">
          <div class="bd-table-row bd-table-row--head">
            ${(d.tableHeaders || []).map((header, index) => `<div class="bd-table-cell${index === 2 ? ' bd-table-cell--mid' : ''}${index === 0 ? ' bd-table-cell--label' : ''}">${header}</div>`).join('')}
          </div>
          ${tableRowsHTML}
        </div>
      </div>

      <div class="bd-advisor">
        ${d.advisorLabel ? `<div class="bd-advisor-label">${d.advisorLabel}</div>` : ''}
        ${d.advisorTitle ? `<div class="bd-advisor-title">${d.advisorTitle}</div>` : ''}
        ${d.advisorBody ? `<div class="bd-advisor-body">${d.advisorBody}</div>` : ''}
      </div>

      ${summaryHTML(d.insight, d.insightLabel || t('insight'), 'bd-insight pe-insight')}
    </div>`;
  }

  function htmlBuyingProcess(d) {
    const stagesHTML = (d.stages || []).map((stage, index) => `
      <article class="bp-stage">
        <div class="bp-stage-top">
          <div class="bp-stage-num">${stage.num || ''}</div>
          ${stage.duration ? `<div class="bp-stage-duration">${stage.duration}</div>` : ''}
        </div>
        <div class="bp-stage-title">${stage.title || ''}</div>
        ${stage.body ? `<div class="bp-stage-body">${stage.body}</div>` : ''}
        ${(stage.points || []).length ? `
          <div class="bp-stage-points">
            ${(stage.points || []).map(point => `<div class="bp-stage-point">${point}</div>`).join('')}
          </div>` : ''}
        ${stage.key ? `<div class="bp-stage-key">${stage.key}</div>` : ''}
        ${index < (d.stages || []).length - 1 ? '<div class="bp-stage-arrow" aria-hidden="true">→</div>' : ''}
      </article>`).join('');

    const tableRowsData = d.summaryRows || d.budgetRows || [];
    const summaryRowsHTML = tableRowsData.map(row => {
      const cells = row.cells || [row.size, row.cycle, row.budget];
      return `
      <article class="bp-summary-item">
        <div class="bp-summary-term">${cells[0] || ''}</div>
        <div class="bp-summary-text">${cells[1] || ''}</div>
      </article>`;
    }).join('');

    const strategyPoints = d.strategyPoints || d.funding || [];
    const strategyHTML = strategyPoints.map(item => `
      <article class="bp-strategy-item">
        <div class="bp-strategy-text">${item}</div>
      </article>`).join('');

    const frictionCasesHTML = (d.frictionCases || []).map(item => `
      <article class="bp-friction-card">
        <div class="bp-friction-label">${item.label || ''}</div>
        <div class="bp-friction-title">${item.title || ''}</div>
        ${item.body ? `<div class="bp-friction-body">${item.body}</div>` : ''}
        ${(item.points || []).length ? `<div class="bp-friction-points">${item.points.map(point => `<div class="bp-friction-point">${point}</div>`).join('')}</div>` : ''}
        ${item.takeaway ? `<div class="bp-friction-takeaway">${item.takeaway}</div>` : ''}
      </article>`).join('');

    const frictionContent = frictionCasesHTML ? `
      <div class="bp-friction-grid">${frictionCasesHTML}</div>` : '';

    const frictionBlock = frictionContent
      ? (d.frictionDetailsTitle ? `
        <details class="dm-details bp-details">
          <summary class="dm-summary">
            <span class="dm-summary-copy">
              <span class="dm-summary-title">${d.frictionDetailsTitle}</span>
              ${d.frictionDetailsPreview ? `<span class="dm-summary-preview">${d.frictionDetailsPreview}</span>` : ''}
            </span>
            <span class="dm-summary-icon" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </summary>
          <div class="bp-details-body">${frictionContent}</div>
        </details>`
      : `
        <div class="bp-friction-block">
          ${d.frictionTitle ? `<div class="bp-block-label">${d.frictionTitle}</div>` : ''}
          ${frictionContent}
        </div>`)
      : '';

    return `
    <div class="s-buying-process">
      <div class="bp-header">
        ${d.label ? `<div class="cseg-label">${d.label}</div>` : ''}
        <h2 class="mseg-title">${d.title || ''}</h2>
        ${d.intro ? `<p class="dori-intro">${d.intro}</p>` : ''}
      </div>

      <div class="bp-flow-block">
        ${d.processLabel ? `<div class="bp-block-label">${d.processLabel}</div>` : ''}
        <div class="bp-flow">${stagesHTML}</div>
      </div>

      <div class="bp-bottom">
        <div class="bp-budget-block">
          ${(d.summaryTitle || d.budgetTitle) ? `<div class="bp-block-label">${d.summaryTitle || d.budgetTitle}</div>` : ''}
          <div class="bp-summary-list">
            ${summaryRowsHTML}
          </div>
        </div>

        <div class="bp-funding-block">
          ${(d.strategyTitle || d.fundingLabel) ? `<div class="bp-block-label">${d.strategyTitle || d.fundingLabel}</div>` : ''}
          <div class="bp-funding">
            ${strategyHTML}
          </div>
        </div>
      </div>

      ${summaryHTML(d.insight, d.insightLabel || t('insight'), 'bp-insight pe-insight')}
      ${frictionBlock}
    </div>`;
  }

  function htmlTrustEstablishment(d) {
    const sourcesHTML = (d.sources || []).map(item => `
      <article class="te-card${item.highlight ? ' te-card--highlight' : ''}">
        <div class="te-card-top">
          <div class="te-card-num">${item.num || ''}</div>
          ${item.highlight ? '<div class="te-card-badge">Most important</div>' : ''}
        </div>
        <div class="te-card-title">${item.title || ''}</div>
        ${item.body ? `<div class="te-card-body">${item.body}</div>` : ''}
        ${item.points && item.points.length ? `
          <div class="te-points">
            ${item.points.map(point => `<div class="te-point">${point}</div>`).join('')}
          </div>` : ''}
      </article>`).join('');

    const pathsHTML = (d.paths || []).map(item => `
      <article class="te-path">
        <div class="te-path-label">${item.label || ''}</div>
        <div class="te-path-title">${item.title || ''}</div>
        ${item.body ? `<div class="te-path-body">${item.body}</div>` : ''}
      </article>`).join('');

    return `
    <div class="s-trust-establishment">
      <div class="te-header">
        ${d.label ? `<div class="cseg-label">${d.label}</div>` : ''}
        <h2 class="mseg-title">${d.title || ''}</h2>
        ${d.intro ? `<p class="dori-intro">${d.intro}</p>` : ''}
      </div>

      <div class="te-sources-block">
        ${d.sourcesLabel ? `<div class="te-block-label">${d.sourcesLabel}</div>` : ''}
        <div class="te-grid">${sourcesHTML}</div>
      </div>

      <div class="te-paths-block">
        ${d.pathsLabel ? `<div class="te-block-label">${d.pathsLabel}</div>` : ''}
        <div class="te-paths">${pathsHTML}</div>
      </div>
    </div>`;
  }

  function htmlPart2Summary(d) {
    const columnsHTML = (d.columns || []).map(col => `
      <article class="p2s-col">
        <div class="p2s-col-title">${col.title || ''}</div>
        <div class="p2s-lines">
          ${(col.lines || []).map((line, index) => `<div class="p2s-line${index === 0 ? ' p2s-line--lead' : ''}">${line}</div>`).join('')}
        </div>
      </article>`).join('');

    const conclusionsHTML = (d.conclusions || []).map((item, index) => `
      <div class="p2s-principle">
        <span class="p2s-principle-num">${String(index + 1).padStart(2, '0')}</span>
        <span class="p2s-principle-text">${item}</span>
      </div>`).join('');

    return `
    <div class="s-part2-summary">
      <div class="p2s-header">
        ${d.label ? `<div class="cseg-label">${d.label}</div>` : ''}
        <h2 class="mseg-title">${d.title || ''}</h2>
      </div>

      <div class="p2s-map">${columnsHTML}</div>

      <div class="p2s-conclusions-block">
        ${d.conclusionsLabel ? `<div class="p2s-block-label">${d.conclusionsLabel}</div>` : ''}
        <div class="p2s-principles">${conclusionsHTML}</div>
      </div>

      ${summaryHTML(d.transition || '', d.transitionLabel || t('conclusion'), 'p2s-transition pe-insight')}
    </div>`;
  }

  function htmlSegmentDeepDive(d, slideId = '') {
    const editorialLayout = slideId === 'p3-seg1-automation' || slideId === 'p3-seg2-vertical' || slideId === 'p3-seg3-ai';
    const makeTierMark = name => {
      if (!name) return '•';
      const parts = String(name)
        .split(/·|\/|,/)
        .map(part => part.trim())
        .filter(Boolean);
      if (parts.length > 1) {
        return parts.slice(0, 2).map(part => part.charAt(0).toUpperCase()).join('·');
      }
      return parts[0]
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map(part => part.charAt(0).toUpperCase())
        .join('');
    };

    const tiersHTML = (d.tiers || []).map(tier => editorialLayout ? `
      <div class="sdv-tier-row sdv-tier-row--editorial">
        <div class="sdv-tier-head">
          <div class="sdv-tier-meta">
            <span class="sdv-tier-level">${tier.tier || ''}</span>
            ${tier.badge ? `<span class="sdv-tier-badge">${tier.badge}</span>` : ''}
          </div>
          <div class="sdv-tier-name">${tier.name || ''}</div>
        </div>
        <div class="sdv-tier-desc">${tier.desc || ''}</div>
      </div>` : `
      <div class="sdv-tier-row">
        <div class="sdv-tier-mark" aria-hidden="true">${makeTierMark(tier.name)}</div>
        <div class="sdv-tier-content">
          <div class="sdv-tier-meta">
            <span class="sdv-tier-level">${tier.tier || ''}</span>
            <span class="sdv-tier-name">${tier.name || ''}</span>
            ${tier.badge ? `<span class="sdv-tier-badge">${tier.badge}</span>` : ''}
          </div>
          <div class="sdv-tier-desc">${tier.desc || ''}</div>
        </div>
      </div>`).join('');

    const gapChainHTML = (d.gapChain || []).map(item => `
      <div class="sdv-gap-row${editorialLayout ? ' sdv-gap-row--editorial' : ''}">
        <span class="sdv-gap-row-player">${item.player || ''}</span>
        <span class="sdv-gap-row-reason">${item.reason || ''}</span>
      </div>`).join('');

    const approachesHTML = (d.startupApproaches || []).map(item =>
      `<li class="sdv-approach">${item}</li>`).join('');

    const risksHTML = (d.startupRisks || []).map(item =>
      `<li class="sdv-risk">${item}</li>`).join('');

    const rolesHTML = (d.roles || []).map(role => `
      <div class="sdv-role">
        <div class="sdv-role-title">${role.title || ''}</div>
        <div class="sdv-role-employers">${role.employers || ''}</div>
        <div class="sdv-role-skills">${role.skills || ''}</div>
      </div>`).join('');

    const actionButtons = `
      <button class="sdv-action-btn sdv-action-btn--startup" data-sdv-modal="startup" aria-haspopup="dialog" aria-expanded="false">
        <span class="sdv-action-icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
            <path d="M2.25 4.25h11.5v7.5H2.25z" stroke="currentColor" stroke-width="1.2" />
            <path d="M2.75 4.75L8 8.5l5.25-3.75" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span>${d.startupLabel || 'Get Startup Perspective'}</span>
      </button>
      <button class="sdv-action-btn sdv-action-btn--employment" data-sdv-modal="employment" aria-haspopup="dialog" aria-expanded="false">
        <span class="sdv-action-icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
            <path d="M2.25 4.25h11.5v7.5H2.25z" stroke="currentColor" stroke-width="1.2" />
            <path d="M2.75 4.75L8 8.5l5.25-3.75" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span>${d.rolesLabel ? `Get ${d.rolesLabel}` : 'Get Career Perspective'}</span>
      </button>`;

    const gapSummaryHTML = editorialLayout ? `
      <div class="summary-block sdv-gap-conclusion sdv-gap-conclusion--editorial">
        <span class="summary-block-label">${d.gapConclusionLabel || t('insight')}</span>
        <div class="summary-block-text">${d.gapConclusion || ''}</div>
        ${((d.gapEvidence || '').trim() || (d.gapNote || '').trim()) ? `
          <div class="sdv-gap-support">
            <p class="sdv-gap-support-line">${[d.gapEvidence, d.gapNote].filter(Boolean).join(' ')}</p>
          </div>` : ''}
      </div>` : `
      ${summaryHTML(d.gapConclusion || '', d.gapConclusionLabel || t('insight'), 'sdv-gap-conclusion')}
      ${d.gapEvidence ? `<div class="sdv-gap-evidence">${d.gapEvidence}</div>` : ''}
      ${d.gapNote ? `<div class="sdv-gap-footnote">${d.gapNote}</div>` : ''}`;

    return `
    <div class="s-segment-deep-dive${slideId ? ` s-segment-deep-dive--${slideId}` : ''}">
      <div class="sdv-header">
        <div class="sdv-header-copy">
          ${d.segmentLabel ? `<div class="sdv-segment-label">${d.segmentLabel}</div>` : ''}
          <h2 class="sdv-title">${d.title || ''}</h2>
          ${d.intro ? `
            <div class="sdv-read-together">
              <p class="sdv-intro">${d.intro}</p>
            </div>` : ''}
        </div>
      </div>

      <div class="sdv-main${editorialLayout ? ' sdv-main--editorial' : ''}">
        ${editorialLayout ? `
          <div class="sdv-board">
            <article class="sdv-card sdv-card--editorial sdv-card--landscape">
              <div class="sdv-card-top">
                <div class="sdv-card-label">${d.compLabel || ''}</div>
              </div>
              <div class="sdv-card-body">
                ${d.compNote ? `<div class="sdv-card-hero sdv-card-hero--editorial">${d.compNote}</div>` : ''}
                <div class="sdv-tier-list sdv-tier-list--editorial">${tiersHTML}</div>
              </div>
            </article>

            <article class="sdv-card sdv-card--editorial sdv-card--gap">
              <div class="sdv-card-top">
                <div class="sdv-card-label">${d.gapLabel || ''}</div>
              </div>
              <div class="sdv-card-body sdv-card-body--gap">
                <div class="sdv-gap-list sdv-gap-list--editorial">${gapChainHTML}</div>
                ${gapSummaryHTML}
              </div>
            </article>
          </div>` : `
          <article class="sdv-card sdv-card--landscape">
            <div class="sdv-card-top">
              <div class="sdv-card-label">${d.compLabel || ''}</div>
              ${d.compNote ? `<div class="sdv-card-hero">${d.compNote}</div>` : ''}
            </div>
            <div class="sdv-card-body">
              <div class="sdv-tier-list">${tiersHTML}</div>
            </div>
          </article>

          <article class="sdv-card sdv-card--gap">
            <div class="sdv-card-top">
              <div class="sdv-card-label">${d.gapLabel || ''}</div>
            </div>
            <div class="sdv-card-body sdv-card-body--gap">
              <div class="sdv-gap-list">${gapChainHTML}</div>
              ${gapSummaryHTML}
            </div>
          </article>`}
      </div>

      <div class="sdv-actions">${actionButtons}</div>

      <div class="sdv-modal" data-sdv-panel="startup" role="dialog" aria-modal="true" aria-hidden="true">
        <button class="sdv-modal-backdrop" data-sdv-close="true" tabindex="-1" aria-label="Close"></button>
        <div class="sdv-modal-card">
          <div class="sdv-modal-top">
            <div class="sdv-modal-label">${d.startupLabel || 'Startup Perspective'}</div>
            <button class="sdv-modal-close" data-sdv-close="true" aria-label="Close">×</button>
          </div>
          <div class="sdv-modal-hero">
            <div class="sdv-modal-title">${d.startupLabel || 'Startup Perspective'}</div>
            ${d.startupDirection ? `<p class="sdv-startup-direction">${d.startupDirection}</p>` : ''}
          </div>
          <div class="sdv-modal-grid sdv-modal-grid--startup">
            <section class="sdv-modal-section">
              <div class="sdv-modal-section-label">Entry logic</div>
              ${d.startupAnalogy ? `<div class="sdv-startup-analogy"><span class="sdv-analogy-tag">Analogy · Personio</span><span>${d.startupAnalogy}</span></div>` : ''}
              ${approachesHTML ? `<ul class="sdv-approaches">${approachesHTML}</ul>` : ''}
            </section>
            <section class="sdv-modal-section sdv-modal-section--risk">
              <div class="sdv-modal-section-label">Watch-outs</div>
              ${risksHTML ? `<div class="sdv-risks-block"><ul class="sdv-risks">${risksHTML}</ul></div>` : ''}
            </section>
          </div>
        </div>
      </div>

      <div class="sdv-modal" data-sdv-panel="employment" role="dialog" aria-modal="true" aria-hidden="true">
        <button class="sdv-modal-backdrop" data-sdv-close="true" tabindex="-1" aria-label="Close"></button>
        <div class="sdv-modal-card">
          <div class="sdv-modal-top">
            <div class="sdv-modal-label">${d.rolesLabel || 'Employment Perspective'}</div>
            <button class="sdv-modal-close" data-sdv-close="true" aria-label="Close">×</button>
          </div>
          <div class="sdv-modal-hero">
            <div class="sdv-modal-title">${d.rolesLabel || 'Employment Perspective'}</div>
            ${d.rolesNote ? `<p class="sdv-roles-note">${d.rolesNote}</p>` : ''}
          </div>
          <div class="sdv-modal-grid sdv-modal-grid--employment">
            <div class="sdv-roles">${rolesHTML}</div>
          </div>
          ${d.rolesEmployers ? `<div class="sdv-employers">${d.rolesEmployers}</div>` : ''}
        </div>
      </div>
    </div>`;
  }

  function htmlOpportunityAssessment(d) {
    const axesHTML = (d.axes || []).map(item => `
      <article class="oa-axis-card">
        <div class="oa-axis-label">${item.axis || ''}</div>
        <div class="oa-axis-title">${item.title || ''}</div>
        ${item.body ? `<div class="oa-axis-body">${item.body}</div>` : ''}
        ${item.metrics && item.metrics.length ? `
          <div class="oa-axis-metrics">
            ${item.metrics.map(metric => `<div class="oa-axis-metric">${metric}</div>`).join('')}
          </div>` : ''}
      </article>`).join('');

    const bubblesHTML = (d.segments || []).map(item => `
      <div class="oa-bubble${item.focus ? ' oa-bubble--focus' : ''} oa-bubble--${item.size || 'md'}"
           style="left:${item.posX || 0}%; top:${100 - (item.posY || 0)}%;">
        <div class="oa-bubble-num">${item.num || ''}</div>
        <div class="oa-bubble-title">${item.title || ''}</div>
        ${item.sizeLabel ? `<div class="oa-bubble-size">${item.sizeLabel}</div>` : ''}
      </div>`).join('');

    const actionsHTML = (d.actions || []).map(item => `
      <button class="oa-action-btn" data-oa-modal="${item.id || ''}" aria-haspopup="dialog" aria-expanded="false">
        <span class="oa-action-icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
            <path d="M2.25 4.25h11.5v7.5H2.25z" stroke="currentColor" stroke-width="1.2" />
            <path d="M2.75 4.75L8 8.5l5.25-3.75" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span>${item.label || ''}</span>
      </button>`).join('');

    const modalsHTML = (d.actions || []).map(item => `
      <div class="oa-modal" data-oa-panel="${item.id || ''}" role="dialog" aria-modal="true" aria-hidden="true">
        <button class="oa-modal-backdrop" data-oa-close="true" tabindex="-1" aria-label="Close"></button>
        <div class="oa-modal-card">
          <div class="oa-modal-top">
            <div class="oa-modal-label">${item.label || ''}</div>
            <button class="oa-modal-close" data-oa-close="true" aria-label="Close">×</button>
          </div>
          <div class="oa-modal-title">${item.title || ''}</div>
          ${item.intro ? `<div class="oa-modal-intro">${item.intro}</div>` : ''}
          ${(item.points || []).length ? `
            <div class="oa-modal-points">
              ${(item.points || []).map(point => `<div class="oa-modal-point">${point}</div>`).join('')}
            </div>` : ''}
        </div>
      </div>`).join('');

    return `
    <div class="s-opportunity-assessment">
      <div class="oa-header">
        ${d.label ? `<div class="cseg-label">${d.label}</div>` : ''}
        <h2 class="mseg-title">${d.title || ''}</h2>
        ${d.intro ? `<p class="dori-intro">${d.intro}</p>` : ''}
      </div>

      <div class="oa-main">
        <div class="oa-map-block">
          <div class="oa-map">
            <div class="oa-map-grid" aria-hidden="true"></div>
            <div class="oa-map-cross oa-map-cross--v" aria-hidden="true"></div>
            <div class="oa-map-cross oa-map-cross--h" aria-hidden="true"></div>
            <div class="oa-map-quad oa-map-quad--lt">${d.map?.quadrants?.[0]?.title || ''}</div>
            <div class="oa-map-quad oa-map-quad--rt">${d.map?.quadrants?.[1]?.title || ''}</div>
            <div class="oa-map-quad oa-map-quad--rb">${d.map?.quadrants?.[2]?.title || ''}</div>
            <div class="oa-map-quad oa-map-quad--lb">${d.map?.quadrants?.[3]?.title || ''}</div>
            ${bubblesHTML}
            <div class="oa-map-y oa-map-y--top">${d.map?.yLabelTop || ''}</div>
            <div class="oa-map-y oa-map-y--bottom">${d.map?.yLabelBottom || ''}</div>
            <div class="oa-map-x oa-map-x--left">${d.map?.xLabelLeft || ''}</div>
            <div class="oa-map-x oa-map-x--right">${d.map?.xLabelRight || ''}</div>
          </div>
        </div>

        <div class="oa-axes">${axesHTML}</div>
      </div>

      ${summaryHTML(d.summary || '', d.summaryLabel || t('conclusion'), 'oa-summary pe-insight')}

      <div class="oa-actions">
        ${actionsHTML}
      </div>

      ${d.sourcesNote ? `<div class="text-note"><span class="text-note-icon">※</span><span class="text-note-text">${d.sourcesNote}</span></div>` : ''}
      ${modalsHTML}
    </div>`;
  }

  function htmlSummaryAssessment(d) {
    const headers = d.headers || [];
    const rows = d.rows || [];
    const notes = d.notes || [];
    const audiences = d.audiences || [];

    function dots(score, tone) {
      const total = 5;
      return `<div class="sas-dots">${Array.from({ length: total }, (_, i) => {
        const filled = i < Number(score || 0);
        return `<span class="sas-dot${filled ? ` sas-dot--filled sas-dot--${tone || 'neutral'}` : ''}"></span>`;
      }).join('')}</div>`;
    }

    const tableHeadHTML = headers.map((header, index) => `
      <div class="sas-th${index === 0 ? ' sas-th--stub' : ''}${header.tone ? ` sas-th--${header.tone}` : ''}">
        ${header.label || ''}
      </div>`).join('');

    const tableRowsHTML = rows.map(row => `
      <div class="sas-row">
        <div class="sas-stub">${row.label || ''}</div>
        ${(row.values || []).map(value => {
          if (value.type === 'window') {
            return `<div class="sas-cell sas-cell--window${value.tone ? ` sas-cell--${value.tone}` : ''}"><span class="sas-window">${value.text || ''}</span></div>`;
          }
          return `<div class="sas-cell${value.tone ? ` sas-cell--${value.tone}` : ''}">${dots(value.score, value.tone)}</div>`;
        }).join('')}
      </div>`).join('');

    const notesHTML = notes.map(item => `
      <article class="sas-note">
        <div class="sas-note-title">${item.title || ''}</div>
        <div class="sas-note-body">${item.body || ''}</div>
      </article>`).join('');

    const audiencesHTML = audiences.map(item => `
      <article class="sas-audience${item.tone ? ` sas-audience--${item.tone}` : ''}">
        <div class="sas-audience-label">${item.label || ''}</div>
        <div class="sas-audience-title">${item.title || ''}</div>
        <div class="sas-audience-list">
          ${(item.points || []).map(point => `<div class="sas-audience-point">${point}</div>`).join('')}
        </div>
      </article>`).join('');

    return `
    <div class="s-summary-assessment">
      <div class="sas-header">
        ${d.label ? `<div class="cseg-label">${d.label}</div>` : ''}
        <h2 class="mseg-title">${d.title || ''}</h2>
        ${d.intro ? `<p class="dori-intro">${d.intro}</p>` : ''}
      </div>

      <div class="sas-matrix-block">
        <div class="sas-table">
          <div class="sas-head">${tableHeadHTML}</div>
          <div class="sas-body">${tableRowsHTML}</div>
        </div>
      </div>

      <div class="sas-notes">${notesHTML}</div>

      <div class="sas-audiences">${audiencesHTML}</div>

      ${summaryHTML(d.closing || '', d.closingLabel || t('conclusion'), 'sas-closing')}
    </div>`;
  }

  /* ─── Interactive events (all slide types) ────────────────────── */
  function attachInteractiveEvents() {
    if (interactiveEventsBound) return;
    interactiveEventsBound = true;
    let lastTouch = null;

    deck.addEventListener('mouseenter', e => {
      const el = findInteractive(e.target);
      if (el && !isClickOnlyInteractive(el)) dispatch(el);
    }, true);

    deck.addEventListener('click', e => {
      const el = findInteractive(e.target);
      if (el) dispatch(el);
    }, true);

    deck.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const el = findInteractive(e.target);
      if (el) { e.preventDefault(); dispatch(el); }
    }, true);

    deck.addEventListener('touchstart', e => {
      const el = findInteractive(e.target);
      if (!el) return;
      if (lastTouch === el) { lastTouch = null; return; }
      lastTouch = el;
      dispatch(el);
      e.stopPropagation();
    }, true);

    deck.addEventListener('toggle', e => {
      const detailEl = e.target;
      if (!(detailEl instanceof HTMLDetailsElement)) return;
      if (!detailEl.classList.contains('dm-details')) return;
      if (!detailEl.open) return;
      const container = detailEl.closest('.s-delivery-modes');
      const summary = detailEl.querySelector('.dm-summary');
      if (!container || !summary) return;
      requestAnimationFrame(() => {
        const top = summary.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
        container.scrollTo({
          top: Math.max(0, top - 12),
          behavior: 'smooth',
        });
      });
    }, true);
  }

  function findInteractive(target) {
    return target.closest?.('.fc-node') ||
           target.closest?.('.dg-card') ||
           target.closest?.('.sl-layer') ||
           target.closest?.('.sdv-action-btn') ||
           target.closest?.('.sdv-modal-close') ||
           target.closest?.('.sdv-modal-backdrop') ||
           target.closest?.('.oa-action-btn') ||
           target.closest?.('.oa-modal-close') ||
           target.closest?.('.oa-modal-backdrop') ||
           target.closest?.('.sm-tier') ||
           target.closest?.('.sdv-drawer-header') || null;
  }

  function isClickOnlyInteractive(el) {
    return el.classList.contains('sdv-action-btn') ||
           el.classList.contains('sdv-modal-close') ||
           el.classList.contains('sdv-modal-backdrop') ||
           el.classList.contains('oa-action-btn') ||
           el.classList.contains('oa-modal-close') ||
           el.classList.contains('oa-modal-backdrop');
  }

  function dispatch(el) {
    if (el.classList.contains('fc-node'))  showFcDetail(el);
    else if (el.classList.contains('dg-card'))  showDgDetail(el);
    else if (el.classList.contains('sl-layer')) showSlDetail(el);
    else if (el.classList.contains('sdv-action-btn') || el.classList.contains('sdv-modal-close') || el.classList.contains('sdv-modal-backdrop')) toggleSdvModal(el);
    else if (el.classList.contains('oa-action-btn') || el.classList.contains('oa-modal-close') || el.classList.contains('oa-modal-backdrop')) toggleOaModal(el);
    else if (el.classList.contains('sdv-drawer-header')) toggleSdvDrawer(el);
    else if (el.classList.contains('sm-tier'))  showSmDetail(el);
  }

  function showFcDetail(nodeEl) {
    const nodeId = nodeEl.dataset.nodeId;
    const slideData = c('framework-flowchart');
    const nodes = slideData.nodes || [];
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    deck.querySelectorAll('.fc-node').forEach(n => n.classList.remove('active'));
    nodeEl.classList.add('active');
    const detail = byId('fcDetail');
    if (!detail) return;
    detail.classList.add('has-content');
    detail.innerHTML = `
      <div class="fc-detail-head">
        <span class="fc-detail-tag" style="color:${node.color}">${node.num}</span>
        <span class="fc-detail-name">${node.label}</span>
      </div>
      <div class="fc-detail-title">${node.title}</div>
      <div class="fc-detail-desc">${node.desc}</div>
    `;
  }

  function showDgDetail(cardEl) {
    const num = cardEl.dataset.catNum;
    const cats = (c('market-demand').categories || []);
    const cat = cats.find(x => x.num === num);
    if (!cat) return;
    deck.querySelectorAll('.dg-card').forEach(n => n.classList.remove('active'));
    cardEl.classList.add('active');
    const detail = byId('dgDetail');
    if (!detail) return;
    detail.classList.add('has-content');
    detail.innerHTML = `
      <div class="dg-detail-head">
        <span class="dg-detail-num">${cat.num}</span>
        <span class="dg-detail-name">${cat.label}</span>
        <span class="dg-detail-stat">${cat.stat}</span>
      </div>
      ${cat.problem ? `<div class="dg-detail-line"><span class="dg-detail-k">Problem</span><span class="dg-detail-v">${cat.problem}</span></div>` : ''}
      ${cat.pattern ? `<div class="dg-detail-line"><span class="dg-detail-k">Current pattern</span><span class="dg-detail-v">${cat.pattern}</span></div>` : ''}
      <div class="dg-detail-desc">${cat.desc}</div>
      <div class="dg-detail-src">※ ${cat.src || ''}</div>
    `;
  }

  function showSlDetail(layerEl) {
    const id = layerEl.dataset.layerId;
    const layers = (c('market-delivery').layers || []);
    const layer = layers.find(x => x.id === id);
    if (!layer) return;
    deck.querySelectorAll('.sl-layer').forEach(n => n.classList.remove('active'));
    layerEl.classList.add('active');
    const detail = byId('slDetail');
    if (!detail) return;
    detail.classList.add('has-content');
    detail.innerHTML = `
      <div class="sl-detail-head">
        <span class="sl-detail-name">${layer.label}</span>
        <span class="sl-detail-meta">${layer.share} · ${layer.rate}</span>
      </div>
      <div class="sl-detail-desc">${layer.desc}</div>
    `;
  }

  function showSmDetail(tierEl) {
    const id = tierEl.dataset.tierId;
    const tiers = (c('market-supply').tiers || []);
    const tier = tiers.find(x => x.id === id);
    if (!tier) return;
    deck.querySelectorAll('.sm-tier').forEach(n => n.classList.remove('active'));
    tierEl.classList.add('active');
    const detail = byId('smDetail');
    if (!detail) return;
    detail.classList.add('has-content');
    detail.innerHTML = `
      <div class="sm-detail-head">
        <span class="sm-detail-num">${tier.num}</span>
        <span class="sm-detail-name">${tier.label}</span>
        <span class="sm-detail-sub">${tier.sub}</span>
      </div>
      <div class="sm-detail-desc">${tier.detail}</div>
    `;
  }

  function toggleSdvDrawer(headerEl) {
    const drawer = headerEl.closest('.sdv-drawer');
    if (!drawer) return;
    const isOpen = drawer.classList.contains('open');
    // close all drawers in the same slide
    const slide = drawer.closest('.s-segment-deep-dive');
    if (slide) {
      slide.querySelectorAll('.sdv-drawer').forEach(d => {
        d.classList.remove('open');
        const btn = d.querySelector('.sdv-drawer-header');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
    if (!isOpen) {
      drawer.classList.add('open');
      headerEl.setAttribute('aria-expanded', 'true');
    }
  }

  function toggleSdvModal(el) {
    const slide = el.closest('.s-segment-deep-dive');
    if (!slide) return;

    const modals = slide.querySelectorAll('.sdv-modal');
    const buttons = slide.querySelectorAll('.sdv-action-btn');

    if (el.dataset.sdvClose === 'true') {
      modals.forEach(modal => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
      });
      buttons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
      return;
    }

    const targetId = el.dataset.sdvModal;
    if (!targetId) return;

    const modal = slide.querySelector(`.sdv-modal[data-sdv-panel="${targetId}"]`);
    if (!modal) return;
    const isOpen = modal.classList.contains('open');

    modals.forEach(m => {
      m.classList.remove('open');
      m.setAttribute('aria-hidden', 'true');
    });
    buttons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));

    if (!isOpen) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      el.setAttribute('aria-expanded', 'true');
    }
  }

  function toggleOaModal(el) {
    const slide = el.closest('.s-opportunity-assessment');
    if (!slide) return;

    const modals = slide.querySelectorAll('.oa-modal');
    const buttons = slide.querySelectorAll('.oa-action-btn');

    if (el.dataset.oaClose === 'true') {
      modals.forEach(modal => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
      });
      buttons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
      return;
    }

    const targetId = el.dataset.oaModal;
    if (!targetId) return;

    const modal = slide.querySelector(`.oa-modal[data-oa-panel="${targetId}"]`);
    if (!modal) return;
    const isOpen = modal.classList.contains('open');

    modals.forEach(m => {
      m.classList.remove('open');
      m.setAttribute('aria-hidden', 'true');
    });
    buttons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));

    if (!isOpen) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      el.setAttribute('aria-expanded', 'true');
    }
  }

  /* ─── Navigation ──────────────────────────────────────────────── */
  function goTo(index, animate = true) {
    if (busy) return;
    if (index < 0 || index >= SLIDES.length) return;
    if (index === current && animate) return;

    const slides = deck.querySelectorAll('.slide');
    const from = slides[current];
    const to   = slides[index];
    if (!to) return;

    busy = true;
    current = index;

    if (from && animate) {
      from.classList.add('leaving');
      from.classList.remove('active');
      setTimeout(() => from.classList.remove('leaving'), 400);
    } else if (from) {
      from.classList.remove('active');
    }

    to.classList.add('active');
    syncUI(index, animate);

    setTimeout(() => { busy = false; }, 420);
  }

  function syncUI(index, animate) {
    const slide   = SLIDES[index];
    const chapter = ch(slide.chapter);
    const color   = chapter.color || '#4F8EF7';
    const label =
      lang === 'de' ? (chapter.labelDe || chapter.label) :
      lang === 'zh' ? (chapter.labelZh || chapter.label) :
      chapter.label;

    // HUD
    hudChapter.textContent = label || '';
    hudCount.textContent   = `${index + 1} / ${SLIDES.length}`;

    // Chapter-specific background theme
    const bg         = chapter.bg         || '#090B10';
    const bgS        = chapter.bgS        || '#0F1219';
    const bgE        = chapter.bgE        || '#171C28';
    const bgOv       = chapter.bgOv       || '#1E2334';
    const bgOverlay  = chapter.bgOverlay  || 'rgba(9,11,16,0.88)';
    const root = document.documentElement;
    root.style.setProperty('--bg',    bg);
    root.style.setProperty('--bg-s',  bgS);
    root.style.setProperty('--bg-e',  bgE);
    root.style.setProperty('--bg-ov', bgOv);
    document.body.style.backgroundColor = bg;
    hud.style.backgroundColor           = bgOverlay;
    ctrlBar.style.backgroundColor       = bgOverlay;

    // Accent
    root.style.setProperty('--accent', color);

    // Buttons
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === SLIDES.length - 1;

    // Nav active
    updateNavActive(index);
    updateControlRail(index, slide.chapter);
  }

  /* ─── Chapter nav ─────────────────────────────────────────────── */
  function buildNav() {
    chapterNavList.innerHTML = '';
    navGroups().forEach(group => {
      const section = document.createElement('div');
      section.className = `nav-section${navExpanded.has(group.id) ? ' open' : ''}`;
      section.dataset.group = group.id;
      section.style.setProperty('--item-color', group.color || '#fff');

      const children = group.slides.map((slideItem, itemIndex) => `
        <button class="nav-subitem" type="button" data-index="${slideItem.index}">
          <span class="nav-subdot"></span>
          <span class="nav-subnum">${String(itemIndex + 1).padStart(2, '0')}</span>
          <span class="nav-sublabel">${slideItem.label}</span>
        </button>
      `).join('');

      section.innerHTML = `
        <button class="nav-parent" type="button" data-index="${group.firstIndex}">
          <span class="nav-dot"></span>
          <span class="nav-num">${group.number}</span>
          <span class="nav-label">${group.label}</span>
          <span class="nav-caret" aria-hidden="true">⌄</span>
        </button>
        <div class="nav-sublist">
          ${children}
        </div>
      `;

      section.querySelector('.nav-parent')?.addEventListener('click', () => {
        if (navExpanded.has(group.id)) navExpanded.delete(group.id);
        else navExpanded.add(group.id);
        buildNav();
        updateNavActive(current);
      });

      section.querySelectorAll('.nav-subitem').forEach(btn => {
        btn.addEventListener('click', () => {
          goTo(Number(btn.dataset.index));
          closeNav();
        });
      });

      chapterNavList.appendChild(section);
    });
  }

  function updateNavActive(index) {
    chapterNavList.querySelectorAll('.nav-section').forEach(section => {
      const items = Array.from(section.querySelectorAll('.nav-subitem'));
      const slideIndexes = items.map(item => Number(item.dataset.index));
      const sectionActive = slideIndexes.includes(index);
      section.classList.toggle('active', sectionActive);

      items.forEach(item => {
        item.classList.toggle('active', Number(item.dataset.index) === index);
      });
    });
  }

  function buildControlRail() {
    if (!ctrlChapterRail || !ctrlChapterCount) return;
    const groups = chapterGroups();
    const firstIntroIndex = SLIDES.findIndex(slide => slide.type === 'chapter-intro');
    const coverSlides = SLIDES
      .slice(0, firstIntroIndex > 0 ? firstIntroIndex : 0)
      .map((slide, index) => ({ slide, index }));

    const coverDots = coverSlides.map((slideItem, slideIndex) => `
      <button class="ctrl-chapter-dot"
              type="button"
              data-slide-index="${slideItem.index}"
              aria-label="Go to cover section ${slideIndex + 1}"></button>
    `).join('');

    ctrlChapterCount.innerHTML = `
      <div class="ctrl-chapter-card ctrl-chapter-card--cover" data-cover-card="true" role="button" tabindex="0">
        <div class="ctrl-chapter-top">
          <span class="ctrl-chapter-num">00</span>
          <span class="ctrl-chapter-label">Cover & What to Expect</span>
        </div>
        <div class="ctrl-chapter-dots">${coverDots}</div>
      </div>
    `;
    const coverCard = ctrlChapterCount.querySelector('[data-cover-card="true"]');
    coverCard?.addEventListener('click', e => {
      const dot = e.target.closest('.ctrl-chapter-dot');
      if (dot) {
        e.stopPropagation();
        const targetIndex = Number(dot.dataset.slideIndex);
        if (!Number.isNaN(targetIndex)) goTo(targetIndex);
        return;
      }
      goTo(0);
    });
    coverCard?.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      goTo(0);
    });
    ctrlChapterRail.innerHTML = '';

    groups.forEach((group, groupIndex) => {
      const chapter = ch(group.chapterId);
      const label =
        lang === 'de' ? (chapter.labelDe || chapter.label) :
        lang === 'zh' ? (chapter.labelZh || chapter.label) :
        chapter.label;

      const card = document.createElement('div');
      card.className = 'ctrl-chapter-card';
      card.dataset.chapter = group.chapterId;
      card.dataset.firstIndex = String(group.firstIndex);
      card.style.setProperty('--chapter-color', chapter.color || '#fff');
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');

      const dots = group.slides.map((slideItem, slideIndex) => `
        <button class="ctrl-chapter-dot"
                type="button"
                data-slide-index="${slideItem.index}"
                aria-label="Go to ${label} section ${slideIndex + 1}"></button>
      `).join('');

      card.innerHTML = `
        <div class="ctrl-chapter-top">
          <span class="ctrl-chapter-num">${chapter.number || String(groupIndex + 1).padStart(2, '0')}</span>
          <span class="ctrl-chapter-label">${label}</span>
        </div>
        <div class="ctrl-chapter-dots">${dots}</div>
      `;

      card.addEventListener('click', e => {
        const dot = e.target.closest('.ctrl-chapter-dot');
        if (dot) {
          e.stopPropagation();
          const targetIndex = Number(dot.dataset.slideIndex);
          if (!Number.isNaN(targetIndex)) goTo(targetIndex);
          return;
        }
        goTo(group.firstIndex);
      });

      card.addEventListener('keydown', e => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        goTo(group.firstIndex);
      });

      ctrlChapterRail.appendChild(card);
    });
  }

  function updateControlRail(index, chapterId) {
    if (!ctrlChapterRail) return;
    if (ctrlChapterCount) {
      const coverCard = ctrlChapterCount.querySelector('[data-cover-card="true"]');
      const coverDots = Array.from(ctrlChapterCount.querySelectorAll('.ctrl-chapter-dot'));
      const coverIndexes = coverDots.map(dot => Number(dot.dataset.slideIndex));
      const coverActive = coverIndexes.includes(index);
      const coverLast = coverIndexes.length ? coverIndexes[coverIndexes.length - 1] : 0;

      coverCard?.classList.toggle('active', coverActive);
      coverCard?.classList.toggle('complete', index > coverLast);

      coverDots.forEach(dot => {
        const dotIndex = Number(dot.dataset.slideIndex);
        dot.classList.toggle('active', dotIndex === index);
        dot.classList.toggle('seen', dotIndex < index);
      });
    }
    ctrlChapterRail.querySelectorAll('.ctrl-chapter-card').forEach(card => {
      const firstIndex = Number(card.dataset.firstIndex);
      const dots = Array.from(card.querySelectorAll('.ctrl-chapter-dot'));
      const slideIndexes = dots.map(dot => Number(dot.dataset.slideIndex));
      const activeChapter = card.dataset.chapter === chapterId;

      card.classList.toggle('active', activeChapter);
      card.classList.toggle('past', index > firstIndex && !activeChapter);

      dots.forEach(dot => {
        const dotIndex = Number(dot.dataset.slideIndex);
        dot.classList.toggle('active', dotIndex === index);
        dot.classList.toggle('seen', dotIndex < index);
      });

      const lastIndex = slideIndexes.length ? slideIndexes[slideIndexes.length - 1] : firstIndex;
      card.classList.toggle('complete', index > lastIndex);
    });
  }

  function openNav()  {
    navExpanded.clear();
    buildNav();
    updateNavActive(current);
    chapterNav.classList.add('open');
    overlay.classList.add('show');
  }
  function closeNav() { chapterNav.classList.remove('open'); overlay.classList.remove('show'); }

  /* ─── Events ──────────────────────────────────────────────────── */
  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  menuBtn.addEventListener('click', () => {
    chapterNav.classList.contains('open') ? closeNav() : openNav();
  });
  overlay.addEventListener('click', closeNav);

  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || (e.key === ' ' && !e.shiftKey)) {
      e.preventDefault(); goTo(current + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || (e.key === ' ' && e.shiftKey)) {
      e.preventDefault(); goTo(current - 1);
    } else if (e.key === 'Escape') {
      closeNav();
    }
  });

  // Swipe
  document.addEventListener('touchstart', e => {
    touchX0 = e.touches[0].clientX;
    touchY0 = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchX0;
    const dy = e.changedTouches[0].clientY - touchY0;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 48) {
      dx < 0 ? goTo(current + 1) : goTo(current - 1);
    }
  }, { passive: true });

  /* ─── Init ────────────────────────────────────────────────────── */
  document.documentElement.lang = 'en';
  renderAll();

})();
