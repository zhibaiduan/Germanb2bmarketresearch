const sourceLink = (label, href) =>
  `<a class="source-link" href="${href}" target="_blank" rel="noreferrer">${label}</a>`;

const SOURCES = {
  destatisICT: sourceLink(
    'Destatis · ICT usage in enterprises',
    'https://www.destatis.de/EN/Themes/Economic-Sectors-Enterprises/Enterprises/ICT-Enterprises-ICT-Sector/_node.html'
  ),
  destatisCloud: sourceLink(
    'Destatis · Paid cloud services in enterprises',
    'https://www.destatis.de/EN/Themes/Economic-Sectors-Enterprises/Enterprises/ICT-Enterprises-ICT-Sector/Tables/icte-06-enterprises-cloud-computing.html'
  ),
  destatisAI: sourceLink(
    'Destatis · AI use and adoption barriers',
    'https://www.destatis.de/EN/Themes/Economic-Sectors-Enterprises/Enterprises/ICT-Enterprises-ICT-Sector/Tables/icte-new-1-enterprises-artifical-intelligence.html'
  ),
  destatisSME: sourceLink(
    'Destatis · Small and medium-sized enterprises',
    'https://www.destatis.de/EN/Themes/Economic-Sectors-Enterprises/Enterprises/Small-Sized-Enterprises-Medium-Sized-Enterprises/_node.html'
  ),
  bitkom: sourceLink(
    'Bitkom · Digital market outlook',
    'https://www.bitkom.org/Bitkom/Publikationen/Der-Deutsche-ITK-Markt'
  ),
  statistaIT: sourceLink(
    'Statista · IT services / outsourcing market',
    'https://www.statista.com/outlook/tmo/it-services/germany'
  ),
  startupsMag: sourceLink(
    'Startups Magazine · Germany SaaS market',
    'https://startupsmagazine.co.uk/'
  ),
  handpicked: sourceLink(
    'Handpicked Berlin · Salary trends',
    'https://www.handpickedberlin.com/'
  ),
  whitehall: sourceLink(
    'Whitehall Resources · SAP talent market',
    'https://www.whitehallresources.com/'
  ),
  accelJobs: sourceLink(
    'Accel · Job board references',
    'https://jobs.accel.com/jobs'
  ),
  kfwDigital: sourceLink(
    'KfW · SME Digitalisation Reports',
    'https://www.kfw.de/%C3%9Cber-die-KfW/KfW-Research/Digitalisierung.html'
  ),
  ifoAI: sourceLink(
    'ifo Institute · AI use in German firms',
    'https://www.ifo.de/en/facts/2025-06-16/companies-germany-increasingly-relying-artificial-intelligence'
  ),
  luenendonkIT: sourceLink(
    'Lünendonk · IT services in Germany',
    'https://www.luenendonk.de/digital-it/'
  ),

  /* ── Part 1 sources ── */
  destatisGVA: sourceLink(
    'Destatis / Eurostat · Industry GVA by country',
    'https://www.destatis.de/Europa/EN/Topic/Industry-trade-services/Industry_GVA.html'
  ),
  iwdHiddenChampions: sourceLink(
    'iwd.de · Hidden Champions — die Starken aus der zweiten Reihe (2023)',
    'https://www.iwd.de/artikel/hidden-champions-die-starken-aus-der-zweiten-reihe-424550/'
  ),
  eisGermany: sourceLink(
    'European Innovation Scoreboard 2025 · Country Profile Germany',
    'https://ec.europa.eu/assets/rtd/eis/2025/ec_rtd_eis-country-profile-de.pdf'
  ),
  wikiGermanEconomy: sourceLink(
    'Wikipedia · Economy of Germany',
    'https://en.wikipedia.org/wiki/Economy_of_Germany'
  ),
  cioErpDisasters: sourceLink(
    'CIO Magazine · 18 Famous ERP Disasters (updated Jul 2025)',
    'https://www.cio.com/article/278677/enterprise-resource-planning-10-famous-erp-disasters-dustups-and-disappointments.html'
  ),
  techRepublicHaribo: sourceLink(
    'TechRepublic · SAP S/4HANA Migration and the Gummy Bear Shortage (Jan 2019)',
    'https://www.techrepublic.com/article/how-a-troubled-sap-s4hana-migration-caused-a-gummy-bear-shortage-in-germany/'
  ),
  bitkomDESI: sourceLink(
    'Bitkom / Silicon Saxony · DESI Index 2025 — Germany 14th in EU (Aug 2025)',
    'https://silicon-saxony.de/en/bitkom-digitization-germany-in-14th-place-in-eu-comparison/'
  ),
};

/* ─── Inline citation helper ───────────────────────────────────── */
/* Reference index — consistent numbering across all slides
   Part 1
   [1] Destatis / Eurostat — Manufacturing GVA
   [2] iwd.de — Hidden Champions (Hermann Simon data)
   [3] European Innovation Scoreboard 2025 — Germany
   [4] Wikipedia — Economy of Germany (R&D GDP share)
   [5] CIO Magazine — 18 Famous ERP Disasters
   [6] TechRepublic — Haribo SAP S/4HANA case
   [7] Bitkom / Silicon Saxony — DESI Index 2025
   Part 2
   [8]  KfW SME Digitalisation Report 2023 — 62%/29% project-completion rates
   [9]  Cargoson — SAP ECC mainstream maintenance ends 2027
   [10] Grand View Research 2024 — Germany enterprise software ~$18.1B; ERP share ~33.8%
   [11] Market Research Future 2024 — Germany ERP ~$5.8B, CAGR 9.7%
   [12] Fortune Business Insights — Germany BPM ~$1.78B by 2026
   [13] Research and Markets / GlobeNewswire 2024 — Germany cybersecurity ~$12.6B
   [14] Spherical Insights 2024 — Germany MES ~$735M, CAGR 16.3%
   [15] Straits Research 2024 — Germany Industry 4.0 ~$12.1B
   [16] Wikipedia — SAP SE (98 of global top-100 companies)
   [17] Luther Lawfirm — §87(1) No.6 BetrVG co-determination rights
   Part 3
   [18] AIM Multiple — Celonis ~60% Process Mining market share
   [19] Wikipedia — Celonis (first German decacorn; funding ~$1.77B)
   [20] Fraunhofer ISI Press Release 2024 — SME–large enterprise gap widened post-2018
   [21] MarketsandMarkets — 84% of German manufacturers plan smart-manufacturing investment
   [22] TwinLadder Research — only 6% of Mittelstand firms deployed AI beyond pilot
   [23] ifo Institut 2025 / Featherflow — 40.9% of German firms using AI in processes
   [24] appliedAI Institute 2025 — 935 German AI startups (+36% YoY); 90%+ B2B         */
const CITE_URLS = {
  1: 'https://www.destatis.de/Europa/EN/Topic/Industry-trade-services/Industry_GVA.html',
  2: 'https://www.iwd.de/artikel/hidden-champions-die-starken-aus-der-zweiten-reihe-424550/',
  3: 'https://ec.europa.eu/assets/rtd/eis/2025/ec_rtd_eis-country-profile-de.pdf',
  4: 'https://en.wikipedia.org/wiki/Economy_of_Germany',
  5: 'https://www.cio.com/article/278677/enterprise-resource-planning-10-famous-erp-disasters-dustups-and-disappointments.html',
  6: 'https://www.techrepublic.com/article/how-a-troubled-sap-s4hana-migration-caused-a-gummy-bear-shortage-in-germany/',
  7: 'https://silicon-saxony.de/en/bitkom-digitization-germany-in-14th-place-in-eu-comparison/',
  8:  'https://www.kfw.de/KfW-Konzern/Newsroom/Aktuelles/KfW-Research/KfW-SME-Digitalisation-Report.html',
  9:  'https://www.cargoson.com/en/blog/how-big-is-the-erp-market',
  10: 'https://www.grandviewresearch.com/horizon/outlook/enterprise-software-market/germany',
  11: 'https://www.marketresearchfuture.com/reports/germany-erp-software-market-45926',
  12: 'https://www.fortunebusinessinsights.com/business-process-management-bpm-market-102639',
  13: 'https://www.globenewswire.com/news-release/2024/09/16/2946526/28124/en/Germany-Cybersecurity-Market-Share-Analysis-Industry-Trends-Growth-Forecasts-2024-2029.html',
  14: 'https://www.sphericalinsights.com/reports/germany-modern-manufacturing-execution-system-market',
  15: 'https://straitsresearch.com/report/industry-4.0-market/germany',
  16: 'https://en.wikipedia.org/wiki/SAP',
  17: 'https://www.luther-lawfirm.com/en/newsroom/blog/detail/dauerbrenner-software-vs-mitbestimmung-87-abs-1-nr-6-betrvg',
  18: 'https://research.aimultiple.com/celonis/',
  19: 'https://en.wikipedia.org/wiki/Celonis',
  20: 'https://www.isi.fraunhofer.de/en/presse/2024/presseinfo-27-digitale-revolution-oder-evolution-industrie.html',
  21: 'https://www.marketsandmarkets.com/ResearchInsight/germany-smart-manufacturing-market.asp',
  22: 'https://www.twinladder.ai/en/research/german-mittelstand-94-percent',
  23: 'https://featherflow.com/blog/germany%E2%80%99s-ai-adoption-(2023%E2%80%932025)-what-the-numbers-say',
  24: 'https://www.appliedai-institute.de/en/hub/2025-ai-german-startup-landscape',
};
const cite = n =>
  `<a class="cite" href="${CITE_URLS[n]}" target="_blank" rel="noreferrer">[${n}]</a>`;

/* ─── Chapter definitions ──────────────────────────────────────── */
const CHAPTERS = [
  { id: 'cover', label: '', labelDe: '', labelZh: '', color: '#6B7280', number: null },
  { id: 'foreword', label: 'Foreword', labelDe: 'Vorwort', labelZh: '导读', color: '#64748B', number: null },
  {
    id: 'context',
    label: 'Part 1 · System Logic',
    labelDe: 'Part 1 · System Logic',
    labelZh: 'Part 1 · System Logic',
    color: '#4C8DFF',
    number: '01',
    bg: '#0F1115',
    bgS: '#14171D',
    bgE: '#1A1E25',
    bgOv: '#20252E',
    bgOverlay: 'rgba(15,17,21,0.92)',
  },
  {
    id: 'delivery',
    label: 'Part 2 · Demand & Delivery',
    labelDe: 'Part 2 · Demand & Delivery',
    labelZh: 'Part 2 · Demand & Delivery',
    color: '#F59E0B',
    number: '02',
    bg: '#120F0A',
    bgS: '#18130D',
    bgE: '#201911',
    bgOv: '#281F15',
    bgOverlay: 'rgba(18,15,10,0.92)',
  },
  {
    id: 'structure',
    label: 'Part 3 · Opportunity Assessment',
    labelDe: 'Part 3 · Opportunity Assessment',
    labelZh: 'Part 3 · Opportunity Assessment',
    color: '#22C55E',
    number: '03',
    bg: '#0A120D',
    bgS: '#0F1812',
    bgE: '#132017',
    bgOv: '#18281D',
    bgOverlay: 'rgba(10,18,13,0.92)',
  },
  {
    id: 'entry',
    label: 'Implications',
    labelDe: 'Implikationen',
    labelZh: '启示',
    color: '#4C8DFF',
    number: '04',
    bg: '#0F1115',
    bgS: '#14171D',
    bgE: '#1A1E25',
    bgOv: '#20252E',
    bgOverlay: 'rgba(15,17,21,0.92)',
  },
];

/* ─── Slide manifest ───────────────────────────────────────────── */
const SLIDES = [
  { id: 'deck-cover',    chapter: 'cover', type: 'cover' },
  { id: 'research-intro', chapter: 'cover', type: 'research-overview' },
  { id: 'part1-entry',    chapter: 'context', type: 'chapter-intro' },
  { id: 'p1-question',  chapter: 'context', type: 'market-gap' },
  { id: 'p1-compare',   chapter: 'context', type: 'market-compare' },
  { id: 'p1-reframe',   chapter: 'context', type: 'refutation-frame' },
  { id: 'p1-argument',  chapter: 'context', type: 'core-argument' },
  { id: 'p1-mechanism', chapter: 'context', type: 'dual-cascade' },
  { id: 'p1-framework', chapter: 'context', type: 'framework-summary' },
  { id: 'part2-entry', chapter: 'delivery', type: 'chapter-intro' },
  { id: 'p2-a1',      chapter: 'delivery', type: 'customer-segments' },
  { id: 'p2-a2',      chapter: 'delivery', type: 'demand-origin' },
  { id: 'p2-a3',      chapter: 'delivery', type: 'market-segments' },
  { id: 'p2-a4',      chapter: 'delivery', type: 'delivery-modes' },
  { id: 'p2-a5',      chapter: 'delivery', type: 'player-ecosystem' },
  { id: 'p2-a6',      chapter: 'delivery', type: 'competitive-dynamics' },
  { id: 'p2-a7',      chapter: 'delivery', type: 'buying-decision' },
  { id: 'p2-a8',      chapter: 'delivery', type: 'buying-process' },
  { id: 'p2-a9',      chapter: 'delivery', type: 'trust-establishment' },
  { id: 'p2-summary', chapter: 'delivery', type: 'framework-summary' },
  { id: 'part3-entry', chapter: 'structure', type: 'chapter-intro' },
  { id: 'p3-e0',      chapter: 'structure', type: 'opportunity-assessment' },
  { id: 'p3-seg1-automation', chapter: 'structure', type: 'segment-deep-dive' },
  { id: 'p3-seg2-vertical', chapter: 'structure', type: 'segment-deep-dive' },
  { id: 'p3-seg3-ai', chapter: 'structure', type: 'segment-deep-dive' },
  { id: 'p3-e4-summary', chapter: 'structure', type: 'summary-assessment' },
  { id: 'final-summary',  chapter: 'entry',    type: 'final-summary' },
];

/* ─── Content (EN) ─────────────────────────────────────────────── */
const CONTENT = {
  en: {
    cover: {
      meta: 'Strategic Research · Germany B2B Software · Question-led deck',
      title: 'How to Read the German B2B Software Market',
      subtitle:
        'A structural research deck for international product and software professionals entering the German B2B market.',
      body:
        'For someone with a China B2B SaaS background, the first challenge in Germany is not language or culture. It is rebuilding the cognitive frame used to interpret this market.',
      bullets: [
        'China market logic often rewards speed, rapid iteration, scale, and user volume.',
        'Germany rewards stability, compliance, and trust; applying a China-style frame leads to systematic misreading.',
        'This research builds a cognitive map of where demand sits, how money flows, who controls value, what rules shape the market, and where real outsider opportunity exists.',
      ],
      author: 'Research synthesis from public institutional sources',
    },

    'foreword-1': {
      eyebrow: 'Research structure',
      title: 'What logic does this research follow?',
      quote:
        'Nine chapters compress into three analytical layers: demand, operating structure, and opportunity.',
      body:
        'The deck focuses on B2B software rather than consumer internet because Germany’s strongest digital demand, clearest willingness to pay, and most realistic international career paths sit on the B2B side of the market.',
      audiences: [
        {
          label: 'Chapters 1-2',
          desc: 'Demand side: what enterprises are trying to solve, and how those needs are currently being met.',
        },
        {
          label: 'Chapters 3-6',
          desc: 'Operating structure: who buys, who sells, and why the market takes this specific form.',
        },
        {
          label: 'Chapters 7-9',
          desc: 'Opportunity and talent: where structural gaps exist, and what kinds of roles emerge around them.',
        },
      ],
    },

    'deck-cover': {
      meta: 'Strategic Research · German B2B Software Market',
      title: 'How to Understand the German B2B Software Market',
      subtitle: 'A Market Entry Research for Anyone Looking to Operate in This Market',
      bullets: [
        'How does the German B2B software market operate, and why?',
        'What are the demands here, and how are they served?',
        'What opportunities emerge from this structure?',
      ],
      audience: 'For founders, product managers, sales professionals, and investors who want to build a systematic understanding of this market, whether entering from China, India, the US, or elsewhere.',
    },

    'research-intro': {
      eyebrow: 'Research Guide',
      title: 'What to expect from this research',
      outcomeLabel: 'After reading this research, you will be able to:',
      outcomes: [
        {
          num: '01',
          title: 'Explain the underlying logic of this market',
          desc: 'Understand why the German B2B software market operates differently from others, and where that difference comes from.',
        },
        {
          num: '02',
          title: 'Identify the real structure of enterprise demand',
          desc: 'Understand who buys what, why, and how, and how those needs are currently being met.',
        },
        {
          num: '03',
          title: 'Assess the nature and difficulty of opportunities',
          desc: 'Distinguish opportunities for start-up and job-seekers.',
        },
      ],
      notes: [
        {
          icon: '◈',
          text: 'This should be read as a cognitive framework, not as a ground-truth industry report. It helps build market understanding quickly, but detailed judgment still requires first-hand industry experience.',
        },
        {
          icon: '△',
          text: 'About industry differences: this report uses <strong>company size</strong> as the main customer segmentation lens and <strong>functional domain</strong> as the main demand-classification lens. Industry differences are real and important, but they are handled mainly through the vertical-software sections (A2 / E2) rather than through equal-depth treatment of every industry. This is intentional: size determines decision structure; industry determines demand content.',
        },
        {
          icon: '◎',
          text: 'This is AI-assisted research. Humans defined the research goal, question structure, and final quality bar. AI assisted with information collection, organization, and layout, while the final output was reviewed and controlled by humans.',
        },
        {
          icon: '◇',
          text: 'The material mainly draws from public market reports, company materials, industry databases, and structured market observations. Because the author is not a decades-long industry insider, the value of this deck is best understood as a structured framework plus a map of current market consensus.',
        },
      ],
    },

    'part1-entry': {
      tag: 'Part 1 of 3',
      title: 'System Logic:\nHow the German B2B Software Market Operates and Why',
      subtitle: 'Before looking at demand, products, or opportunities, we need to answer a more fundamental question: what logic does this market actually run on? Without understanding this, structural features get misread as temporary friction, and normal market behavior gets mistaken for anomaly.',
      chainLabel: 'After this section, you will be able to:',
      chain: [
        {
          num: '01',
          title: 'Articulate the core differences',
          desc: 'Explain how and why the German B2B software market differs fundamentally from the US and Chinese markets.',
        },
        {
          num: '02',
          title: 'Understand the structural causes',
          desc: 'Trace how an industrial economy generates the specific constraints that shape all market behavior.',
        },
        {
          num: '03',
          title: 'Apply a unified framework',
          desc: 'Use a single explanatory model to interpret any pattern you observe in this market.',
        },
      ],
    },

    'p1-question': {
      eyebrow: 'What We See From the Outside',
      title: 'The German B2B software market behaves differently — but how differently, exactly?',
      gaps: [
        {
          num: '01',
          label: 'Sales Cycle',
          rows: [
            { market: '🇺🇸 United States', value: '3–6 months', sub: 'Mid-market enterprise' },
            { market: '🇨🇳 China', value: '1–3 months', sub: 'Relationship-driven; fast decisions' },
            { market: '🇩🇪 Germany', value: '12–18 months', sub: 'Mid-size enterprise; large enterprise up to 36 months', de: true },
          ],
          insight: 'Same deal size: 2–3× longer than the US; 4–6× longer than China.',
        },
        {
          num: '02',
          label: 'System Replacement',
          rows: [
            { market: '🇺🇸 United States', value: '2–3 year SaaS cycles', sub: 'PLG-driven; fast trial and switch' },
            { market: '🇨🇳 China', value: 'Active replacement', sub: 'Competitive pressure drives fast iteration' },
            { market: '🇩🇪 Germany', value: 'SAP from the 1990s still running', sub: 'Migration projects average 2–4 years over schedule', de: true },
          ],
          insight: 'Default answer is no. Replacement requires a mandatory external trigger — e.g. SAP ECC end-of-support in 2027.',
        },
        {
          num: '03',
          label: 'External Entry Difficulty',
          rows: [
            { market: '🇺🇸 United States', value: 'First-choice expansion market', sub: 'Mature PLG entry path for global SaaS' },
            { market: '🇨🇳 China', value: 'High local protection', sub: 'Successful localization cases exist' },
            { market: '🇩🇪 Germany', value: 'Revenue share below other EU markets', sub: 'Top US SaaS players underperform vs. UK and Netherlands', de: true },
          ],
          insight: 'The gap is not brand recognition. It is a mismatch between entry logic and market structure.',
        },
      ],
      hook: 'Slow, resistant to replacement, hard to enter — these three patterns have persisted for decades without convergence. This is not a temporary condition. It is a structural characteristic. The real question is: where does this structure come from?',
    },

    'p1-compare': {
      eyebrow: 'Cross-Market Calibration',
      title: 'Germany is not a slower version of the US market. It is a <strong>different type of market</strong>.',
      rows: [
        {
          label: 'Core economy served',
          us: 'Platforms, finance, consumer',
          cn: 'Platforms, consumer, manufacturing',
          de: 'Industrial manufacturing, process industries',
        },
        {
          label: 'Role of software',
          us: 'Software is the product',
          cn: 'Software is the product',
          de: 'Software supports the physical product',
        },
        {
          label: 'Top enterprise priority',
          us: 'Growth speed',
          cn: 'Market speed',
          de: 'Operational stability',
        },
        {
          label: 'Procurement logic',
          us: 'Try first, iterate fast',
          cn: 'Fast decision, fast switch',
          de: 'Full validation, phased rollout',
        },
        {
          label: 'Manufacturing / GDP',
          us: '~10%',
          cn: '~27%',
          de: `~20%${cite(1)} · France 11%, UK 10%`,
        },
      ],
      conclusion: 'The difference is structural. US and Chinese software markets mostly serve growth-first platform economies. German software must protect uptime inside an industrial system, so operational continuity outranks speed.',
      note: `[1] ${SOURCES.destatisGVA} · Germany 19.9%; France 11%; Spain 12%; Italy 17%; Poland 18.1% · Destatis / Eurostat GVA breakdown (2024)`,
    },

    'p1-reframe': {
      eyebrow: 'Reframing the Question',
      title: 'Why does German digitalization look <strong>slow</strong>?',
      rejections: [
        {
          claim: '"Insufficient demand"',
          argument: `Germany ranks 3rd in the EU for enterprise R&D investment and reaches 143% of the EU average.${cite(3)} Digital transformation budgets have not been absent. The problem is not on the demand side.`,
        },
        {
          claim: '"Technology lagging"',
          argument: `SAP, the world's largest enterprise software company, was founded in Germany and is still headquartered in Walldorf. German R&D spending is about 3.1% of GDP,${cite(4)} third among major economies. Capability is not the constraint.`,
        },
        {
          claim: '"Cultural conservatism"',
          argument: '"Culture" is a description, not an explanation. Saying "Germans are risk-averse" answers nothing: why? where does it come from? will it change? This framing stops thinking instead of starting understanding.',
        },
      ],
      conclusion: 'If the observed slowness is not caused by demand, technology, or culture, then what system is producing this behavior?',
      note: `[3] ${SOURCES.eisGermany} · Enterprise R&D 3rd in EU, 143% of EU avg; manufacturing employment 18.5% vs EU avg 15.6% &nbsp;·&nbsp; [4] ${SOURCES.wikiGermanEconomy} · R&D spending ~3.1% of GDP`,
    },

    'p1-argument': {
      eyebrow: 'Root Cause',
      title: 'Software here exists to serve an <strong>industrial economy</strong>.',
      lead: `Germany has 1,573 hidden champions${cite(2)}, companies that are global #1 or #2 in their niche. More than 80% are in manufacturing, with mechanical engineering accounting for more than 22%. Average revenue: €467M.`,
      quote: `In 2018, Haribo began migrating 16 factories across 10 countries to SAP S/4HANA. After go-live, the system could not track raw materials or inventory. Stores ran out of stock. <strong>Gold Bear sales fell 25% that year.</strong>${cite(5)}${cite(6)}<br><br>One ERP migration cost 25% of annual Gold Bear sales. This is why German industrial companies approach software replacement with extreme caution. This is not conservatism. It is consequence.`,
      bullets: [
        {
          label: 'Stability is the entry threshold.',
          note: 'Not a feature. A precondition for consideration.',
        },
        {
          label: 'Replacement is a high-risk operation.',
          note: 'Not an upgrade path. A decision requiring extreme justification.',
        },
        {
          label: 'Procurement is an operational decision.',
          note: 'Not an IT purchase. A cross-departmental commitment with production implications.',
        },
      ],
      statement: 'In the US and China, software failures are often fixed with a hotfix. In Germany, software failures can stop production lines. That is why stability, replacement risk, and cross-functional approval shape procurement from day one.',
      note: `[2] ${SOURCES.iwdHiddenChampions} · 1,573 companies; avg €467M revenue; 350k+ employees &nbsp;·&nbsp; [5] ${SOURCES.cioErpDisasters} · Haribo migration, Gold Bear −25% &nbsp;·&nbsp; [6] ${SOURCES.techRepublicHaribo} · supply disruption & Haribo official response`,
    },

    'p1-mechanism': {
      eyebrow: 'From Root Cause to Market Behavior',
      title: '<strong>Four constraints</strong> explain the market behavior',
      source: 'Industrial Economy',
      sourceSub: 'Mittelstand · 1,573 hidden champions · Manufacturing at ~20% of GDP',
      constraints: [
        {
          label: 'System Complexity',
          note: 'ERP, MES, PLM, supplier portals, quality systems, and custom spreadsheets already hold live operational data. Replacing one layer can break many dependencies at once.',
        },
        {
          label: 'Regulatory Pressure',
          note: 'GDPR, sector standards, audit requirements, and works-council review define what can change, what proof is required, and how fast rollout can move.',
        },
        {
          label: 'Stability Orientation',
          note: 'In industrial environments, even one day of disruption can be extremely expensive. Reliability is screened before feature depth is discussed.',
        },
        {
          label: 'Coordination Requirement',
          note: 'A software decision touches IT, operations, finance, quality, and compliance. In many cases no single department can approve alone.',
        },
      ],
      behaviors: [
        'Integration over replacement',
        'Compliance validation before deployment',
        'Evaluation cycles: 12–18 months typical',
        'Decisions span 5–8 departments',
      ],
      synthesis: 'Every "slow" you observe in this market has a specific industrial logic behind it.',
    },

    'p1-framework': {
      eyebrow: 'Part 1 Takeaway',
      title: 'German market behavior is not an anomaly. It is the inevitable output of its industrial foundations.',
      findings: [
        {
          num: '01',
          title: 'Software here is infrastructure, not the core business',
          body: `The backbone of the German economy is manufacturing processes that cannot afford to stop. A single ERP migration failure at Haribo caused a 25% drop in annual revenue.${cite(5)}${cite(6)} That cost determined the market's relationship with stability — not cultural conservatism, but a survival requirement.`,
        },
        {
          num: '02',
          title: 'Four structural constraints shape all market behavior',
          body: 'System complexity, regulatory pressure, stability-first priorities, and multi-stakeholder coordination requirements directly explain why this market moves more slowly, more cautiously, and more toward service-led engagement.',
          lines: [
            'System complexity → integration-first, not replacement',
            'Regulatory pressure → compliance validation before adoption',
            'Stability priority → extended evaluation cycles',
            'Coordination requirements → multi-party decisions; sales cycles of 12–18 months',
          ],
        },
        {
          num: '03',
          title: 'These constraints are structural and will not disappear',
          body: `Germany ranks 14th overall in EU digitalization and 21st in digital public administration.${cite(7)} This is not a temporary lag — it is a structural reality. Entering this market means operating within its constraints, not waiting for them to resolve.`,
        },
      ],
      transition: 'Part 2 moves from system logic to demand and delivery: what enterprises actually need, and how those needs are currently being served.',
      note: `[7] ${SOURCES.bitkomDESI} · Germany 14th overall; digital admin 21st; 38% govt forms pre-fill (EU avg 71%) · based on Bitkom's recompilation of EU Commission indicators (EU discontinued single DESI composite score in 2023)`,
    },

    'part2-entry': {
      tag: 'Part 2 of 3',
      title: 'Demand & Delivery:\nWhere the Money Flows and Why',
      subtitle: 'Having established the system logic of the German B2B software market, Part 2 enters the demand side directly. What does the market actually want to buy? Who is buying? And how do solutions reach customers in practice?',
      chainLabel: 'After this section, you will be able to:',
      chain: [
        {
          num: '01',
          title: 'Map the demand landscape',
          desc: 'Identify where enterprise demand comes from, what forms it takes, and how different customer segments prioritize.',
        },
        {
          num: '02',
          title: 'Understand the delivery structure',
          desc: 'See how solutions are assembled, who delivers them, and why service is a core, not optional, part of the value chain.',
        },
        {
          num: '03',
          title: 'Locate the structural gaps',
          desc: 'Identify where clear demand exists without adequate supply, and what that means for product and go-to-market strategy.',
        },
      ],
    },

    'part3-entry': {
      tag: 'Part 3 of 3',
      title: 'Opportunity Assessment:\nWhere is there still room to enter?',
      subtitle: 'Part 1 explained why this market behaves the way it does. Part 2 mapped demand, supply, procurement, and trust. Part 3 answers the final question: from an entrepreneurship and career perspective, where are the real opportunities inside this structure?',
      chainLabel: 'After this section, you will be able to:',
      chain: [
        {
          num: '01',
          title: 'Read all five segments through one framework',
          desc: 'Use competition intensity and structural supply gap as a single coordinate system for judgment.',
        },
        {
          num: '02',
          title: 'Focus only on the segments worth going deep on',
          desc: 'Filter out areas that are structurally hard to enter and concentrate on the 2-3 segments where real space still exists.',
        },
        {
          num: '03',
          title: 'Translate the market into action',
          desc: 'Compare startup difficulty, job density, and timing window across all five segments.',
        },
      ],
    },

    'p3-e0': {
      label: 'Competitive & Opportunity Assessment',
      title: 'Five segments, two axes, one framework for judgment.',
      intro: 'The right question is not simply where demand exists. The real question is where demand exists, current supply is structurally weak, and the entry cost is still survivable. This page uses one visual framework to compare all five segments before deciding which ones deserve deeper analysis.',
      axes: [
        {
          axis: 'X-axis',
          title: 'Competition intensity',
          body: 'How densely the segment is already covered: how many customers incumbents serve, how deep they are embedded, and how hard replacement is.',
          metrics: [
            'Market concentration of the top players',
            'Customer penetration of the dominant vendors',
            'Average replacement cycle',
          ],
        },
        {
          axis: 'Y-axis',
          title: 'Structural supply gap',
          body: 'Demand space that current vendors cannot or do not want to cover for structural reasons.',
          metrics: [
            'Digitalization gap between Mittelstand and large enterprise',
            'Customer-size bias of existing suppliers',
            'Demand growth vs. supply response speed',
          ],
        },
      ],
      map: {
        xLabelLeft: 'Lower competition',
        xLabelRight: 'Higher competition',
        yLabelTop: 'Higher structural gap',
        yLabelBottom: 'Lower structural gap',
        quadrants: [
          { title: 'Window open', x: 'left', y: 'top' },
          { title: 'Protected but slow', x: 'right', y: 'top' },
          { title: 'Hard to enter', x: 'right', y: 'bottom' },
          { title: 'Thin market', x: 'left', y: 'bottom' },
        ],
      },
      segments: [
        {
          num: '01',
          title: 'Enterprise core systems',
          posX: 80,
          posY: 22,
          size: 'xl',
          sizeLabel: '~USD 6.1B',
          focus: false,
          verdict: 'Not expanded',
          rationale: 'SAP + SI lock-in is deepest here; budget is large, but room for new entry is minimal.',
        },
        {
          num: '02',
          title: 'Compliance / security / data governance',
          posX: 73,
          posY: 38,
          size: 'lg',
          sizeLabel: '~USD 3.5B',
          focus: false,
          verdict: 'Not expanded',
          rationale: 'Demand is real, but trust, certification, and local regulatory depth make this a specialized path rather than a general entry point.',
        },
        {
          num: '03',
          title: 'Process automation & integration',
          posX: 39,
          posY: 78,
          size: 'xs',
          sizeLabel: '~USD 1.1B',
          focus: true,
          verdict: 'Deep dive',
          rationale: 'Mid-Mittelstand demand is visible, but current tools are still priced and designed for larger enterprises.',
        },
        {
          num: '04',
          title: 'Vertical industry software',
          posX: 57,
          posY: 60,
          size: 'md',
          sizeLabel: '~USD 2.2B*',
          focus: true,
          verdict: 'Deep dive',
          rationale: 'Incumbents are entrenched, but many products are aging faster than Industry 4.0 demand is evolving.',
        },
        {
          num: '05',
          title: 'AI application layer',
          posX: 18,
          posY: 84,
          size: 'sm',
          sizeLabel: '~USD 1.4B',
          focus: true,
          verdict: 'Deep dive',
          rationale: 'Competition is not yet fixed, while the gap between AI interest and deployable ROI remains wide.',
        },
      ],
      summaryLabel: 'What happens next',
      summary: 'Three segments will be expanded next: process automation & integration, vertical industry software, and the AI application layer. Enterprise core systems and compliance / security remain important markets, but they are not attractive as general entry paths for broad entrepreneurship analysis.',
      actions: [
        {
          id: 'startup',
          label: 'Get Startup Perspective',
          title: 'Startup perspective',
          intro: 'From an entrepreneurship angle, the key is not market size alone. The best wedges are the places where incumbents are strong enough to validate demand, but still structurally unable or unwilling to serve the middle market well.',
          points: [
            'Best entry wedge: process automation & integration for Mittelstand environments that are too small for Celonis-style complexity, but too complex for lightweight generic tools.',
            'Second path: vertical software around aging category leaders, especially where Industry 4.0 creates new requirements faster than old products can evolve.',
            'Third path: AI application layer, but only when the product is ROI-driven, embedded into existing workflows, and procurement-safe under German trust requirements.',
            'Avoid direct attacks on enterprise core systems and broad compliance platforms as general startup plays; they are real markets, but structurally hostile to new entrants.',
          ],
        },
        {
          id: 'career',
          label: 'Get Career Perspective',
          title: 'Career perspective',
          intro: 'From a job-market angle, the most attractive areas are not always the biggest software categories. They are the places where delivery complexity is high, demand is growing, and companies need people who can bridge business logic and implementation reality.',
          points: [
            'Highest role density: process automation and integration, especially for solutions engineers, implementation consultants, and process-oriented business analysts.',
            'Highest specialist premium: vertical industry software, where industry context plus digitalization knowledge creates strong scarcity value.',
            'Fastest growth: AI application layer, especially for AI implementation, solutions consulting, and workflow redesign roles rather than pure model-building jobs.',
            'Most reliable but least differentiated path: enterprise core systems, where opportunity exists mainly inside established SAP and SI ecosystems.',
          ],
        },
      ],
      sourcesNote: 'Bubble size uses indicative Germany revenue proxies rather than exact like-for-like TAM: ERP software ≈ USD 6.1B (2024), enterprise GRC ≈ USD 3.5B (2023), BPM ≈ USD 1.13B (2024), enterprise AI ≈ USD 1.44B (2024), and vertical software ≈ USD 2.2B as a blended proxy from German MES (2024), construction/design software (2024), and TMS (2025). Positions are judgment-based; bubble size reflects commercial mass, not attractiveness.',
    },

    'p3-seg1-automation': {
      segmentLabel: 'Segment Deep-Dive · 1 of 3',
      title: 'Process automation is the <strong>fastest-growing segment</strong>, and the structural gap is in the <strong>middle market</strong>.',
      intro: 'This segment becomes attractive only when two views are read together: <strong>who already dominates the category</strong>, and <strong>which demand current tools still fail to fit structurally</strong>.',

      compLabel: '① Who already dominates the category?',
      compNote: 'All major players share one characteristic: <strong>their typical customer is a large enterprise</strong>.',
      tiers: [
        {
          tier: 'Top',
          name: 'Celonis',
          badge: 'Category Definer',
          desc: `Founded Munich 2011. Germany's first $10B+ unicorn.${cite(19)} Claims <strong>~60% of the process mining market</strong>.${cite(18)} Primary clients: Fortune 500. IPO-track.`,
        },
        {
          tier: 'Platform',
          name: 'SAP · Microsoft',
          desc: '<strong>SAP acquired Signavio</strong> (BPM); <strong>Microsoft acquired Minit</strong> (Process Mining). Both are absorbing adjacent tooling into platform ecosystems, which compresses space for independent tools.',
        },
        {
          tier: 'Specialist',
          name: 'Camunda · Software AG',
          desc: 'Camunda (Berlin) leads in process orchestration and has a strong developer community. Complex scenarios usually <strong>require in-house engineering capacity</strong>.',
        },
      ],

      gapLabel: '② Which demand current tools still fail to fit structurally?',
      gapChain: [
        { player: 'Celonis', reason: `<strong>Pricing and implementation complexity</strong> target large enterprise, so the mid-market budget often does not align. Celonis holds ~60% of the Process Mining market${cite(18)} but is structurally priced for the top tier.` },
        { player: 'SAP ecosystem', reason: '<strong>Requires an existing SAP system</strong> as a prerequisite, which is not universal in Mittelstand.' },
        { player: 'Camunda', reason: '<strong>Requires an in-house engineering team</strong>, and most Mittelstand firms do not have one.' },
      ],
      gapConclusion: 'Mid-Mittelstand (50–500 employees): <strong>real demand, no structurally fit supply</strong>.',
      gapEvidence: `KfW: firms with 50+ employees complete digital projects at <strong>62%</strong>, double the rate of small firms (<strong>29%</strong>).${cite(8)} Demand is present; the tooling tier that should serve it does not exist.`,
      gapNote: 'The gap is not absent demand. Every solution is priced and scoped for a customer <strong>one tier larger</strong> than Mittelstand.',

      startupLabel: 'Startup Perspective',
      startupDirection: 'Clearest entry: <strong>lightweight process automation for mid-Mittelstand</strong>. This is not a Celonis replacement, but a "good enough, deployable without a dedicated engineering team" solution.',
      startupAnalogy: 'Personio followed the same structural logic: mid-market HR SaaS, underserved by large platforms. It did not win by being feature-complete. It won by being localized, fast to onboard, and priced to fit. It is now Europe\'s leading HR SaaS.',
      startupApproaches: [
        'Focus on <strong>1–2 high-frequency workflows</strong> (approval flows, quotation, quality handling)',
        'Extend <strong>inside SAP / Microsoft ecosystems</strong>, which lowers the trust barrier versus an independent platform',
        '<strong>Service-first</strong>: use service revenue to fund product; productize gradually',
      ],
      startupRisks: [
        'SAP and Microsoft platform consolidation continues, so deep customer relationships matter before the window closes',
        'Long Mittelstand sales cycles + limited deal sizes create structural ROI pressure',
      ],

      rolesLabel: 'Employment Perspective',
      rolesNote: 'One of the <strong>highest hiring-density segments</strong> in German B2B software. Most scarce profile: <strong>process knowledge + product fluency + integration literacy</strong>.',
      roles: [
        {
          title: 'Solutions Engineer / Pre-Sales',
          employers: 'Celonis · Camunda · SAP BTP',
          skills: 'Process analysis + product demonstration + integration fundamentals',
        },
        {
          title: 'Implementation Consultant',
          employers: 'SAP Signavio · Celonis · Camunda',
          skills: 'BPMN modeling + change management + client communication',
        },
        {
          title: 'Business Analyst · Process',
          employers: 'Client-side or SI',
          skills: 'Process diagnosis + cross-department coordination + data literacy',
        },
      ],
      rolesEmployers: 'Celonis (Munich) · Camunda (Berlin) · SAP · msg Group · Sopra Steria · Accenture Germany',
    },

    'p3-seg2-vertical': {
      segmentLabel: 'Segment Deep-Dive · 2 of 3',
      title: 'Vertical software has the <strong>deepest moats</strong> and the <strong>widest gap</strong> between what exists and what Industry 4.0 requires.',
      intro: 'This segment only becomes legible when two facts are read together: <strong>control sits inside narrow verticals</strong>, and <strong>new Industry 4.0 requirements are colliding with aging product architectures</strong>.',

      compLabel: '① Who already dominates the category?',
      compNote: 'No single platform dominates the whole field. <strong>Control sits inside specialized verticals</strong>, each with its own incumbent logic and switching cost.',
      tiers: [
        {
          tier: 'MES / MOM',
          name: 'Siemens Opcenter · SAP DMC',
          badge: 'Large-enterprise core',
          desc: 'Manufacturing execution is led by heavyweight suites such as <strong>Siemens Opcenter</strong>, <strong>SAP DMC</strong>, DELMIA Apriso, and Plex. Strong functionality, long implementation cycles, high price points, and a typical customer base above <strong>500 employees</strong>.',
        },
        {
          tier: 'BIM',
          name: 'Nemetschek Group',
          badge: 'Local moat',
          desc: 'In building and infrastructure, <strong>Nemetschek brands</strong> such as Allplan, Graphisoft, and Vectorworks are deeply embedded. The moat comes from workflow lock-in, file standards, and long replacement cycles.',
        },
        {
          tier: 'TMS / WMS',
          name: 'Inform · local specialists',
          badge: 'Fragmented but sticky',
          desc: 'Logistics and supply-chain software is more fragmented, but <strong>local operating requirements</strong> remain high. Inform is a representative German specialist; many others dominate one subsegment without owning the whole stack.',
        },
      ],

      gapLabel: '② Which demand current tools still fail to fit structurally?',
      gapChain: [
        {
          player: 'Force A',
          reason: '<strong>Legacy products no longer fit new needs.</strong> Much of the installed base still sits on 10–20 year-old architecture: weak cloud-native capability, difficult integration, and poor fit for modern data ecosystems.',
        },
        {
          player: 'Force B',
          reason: '<strong>Industry 4.0 creates requirements old stacks handle badly.</strong> Real-time machine data, digital twins, and cross-system visibility are now strategic requirements, but are exactly where older vertical products are weakest.',
        },
        {
          player: 'Mid-market gap',
          reason: '<strong>Mittelstand manufacturers are squeezed out.</strong> Existing MES products are too expensive and too complex, yet lighter, integration-friendly alternatives remain immature or missing.',
        },
      ],
      gapConclusion: 'The opening is not to replace incumbents head-on. It is to serve the space <strong>between legacy vertical systems and Industry 4.0-ready operations</strong>.',
      gapEvidence: `Fraunhofer ISI shows the digitalization gap between German SMEs and large manufacturers widened again after 2018.${cite(20)} At the same time, <strong>84% of German manufacturers</strong>${cite(21)} plan recurring smart-manufacturing investment, but today’s tooling layer still fits large firms far better than the middle market.`,
      gapNote: '<strong>Practical gaps:</strong> IIoT data access, lightweight MES for mid-sized manufacturers, and plant + ERP + quality data visibility in one view remain poorly served.',

      startupLabel: 'Startup Perspective',
      startupDirection: 'This is the <strong>hardest segment to enter</strong>, but also the one with the <strong>deepest moat once embedded</strong>. Do not build a generic MES to fight Siemens directly.',
      startupAnalogy: 'The signal is not “incumbents are weak.” The signal is that even incumbents such as Siemens now ship lighter offers like Opcenter X, which confirms the demand, while their product logic is still comparatively heavy.',
      startupApproaches: [
        '<strong>Lightweight vertical tool</strong> for one mid-sized manufacturing niche: enough functionality, good integration, and pricing that Mittelstand can actually absorb',
        '<strong>Data / integration layer</strong> that connects legacy MES, SAP, machine data, and quality systems without replacing the execution system',
        '<strong>Specialized replacement wedge</strong> in a narrow segment where Siemens / SAP coverage is weak, such as traceability or medical-device quality workflows',
      ],
      startupRisks: [
        'The first lighthouse customer can take <strong>2–3 years</strong> to win',
        'Industry know-how is the real moat; pure engineering strength is not enough',
        'Customer-side talent shortages can slow rollout even when the product is strong',
      ],

      rolesLabel: 'Employment Perspective',
      rolesNote: 'This segment has <strong>fewer open roles than process automation</strong>, but each role is usually more scarce and more defensible. The premium sits with people who understand both <strong>manufacturing operations and digital systems</strong>.',
      roles: [
        {
          title: 'Industry 4.0 / Smart Manufacturing Consultant',
          employers: 'Siemens · SAP · msg systems',
          skills: 'Manufacturing-process understanding + MES / ERP integration + project delivery',
        },
        {
          title: 'Manufacturing IT / OT-IT Integration Engineer',
          employers: 'KUKA · Bosch Rexroth · Trumpf',
          skills: 'OPC-UA / MQTT + cloud platforms + machine-to-system integration',
        },
        {
          title: 'Solutions Engineer · Industrial Software',
          employers: 'Körber · PSI Software · industrial vendors',
          skills: 'Industry context + product demo + technical solution design',
        },
      ],
      rolesEmployers: 'Siemens Digital Industries · SAP manufacturing products · Körber · PSI Software · msg systems · KUKA · Bosch Rexroth · Trumpf',
    },

    'p3-seg3-ai': {
      segmentLabel: 'Segment Deep-Dive · 3 of 3',
      title: 'AI application is the <strong>most open window</strong>, but Germany rewards <strong>deployable AI</strong>, not AI in general.',
      intro: 'This segment only makes sense when two observations are read together: <strong>the category is still structurally open</strong>, and <strong>German buyers evaluate AI through ROI, workflow fit, and governance rather than novelty</strong>.',

      compLabel: '① Who already dominates the category?',
      compNote: 'No company yet plays the role SAP plays in ERP or Siemens plays in industrial software. <strong>The field is active, but not settled.</strong>',
      tiers: [
        {
          tier: 'Platform AI',
          name: 'SAP · Microsoft · Salesforce',
          badge: 'Embedded distribution',
          desc: 'The strongest current advantage sits with vendors that can <strong>embed AI into existing workflows</strong>. SAP Joule, Microsoft Copilot, and other platform-native AI modules do not need a separate procurement story.',
        },
        {
          tier: 'German / EU AI',
          name: 'Aleph Alpha · sovereign AI stack',
          badge: 'Trust angle',
          desc: 'A second layer is built around <strong>data sovereignty, transparency, and European trust positioning</strong>. The appeal is not always best-model performance, but suitability for regulated enterprise and public-sector environments.',
        },
        {
          tier: 'Applied AI scaleups',
          name: 'Parloa · n8n · Hypatos',
          badge: 'Category builders',
          desc: `The most dynamic layer is formed by applied-AI scaleups focused on a narrow business function: customer service, workflow automation, document handling, forecasting, or analytics. Germany had 935 AI startups in 2025 (+36% YoY; 90%+ B2B).${cite(24)} These firms are shaping the category fastest.`,
        },
      ],

      gapLabel: '② Which demand current tools still fail to fit structurally?',
      gapChain: [
        {
          player: 'Friction',
          reason: '<strong>AI in Germany runs into real deployment friction.</strong> GDPR limits training-data use, the EU AI Act raises governance requirements, existing enterprise data is messy, and Betriebsrat scrutiny is especially high where AI touches employee behavior or monitoring.',
        },
        {
          player: 'Bridge',
          reason: '<strong>But friction is the source of opportunity, not the negation of it.</strong> If AI deployment were frictionless, OpenAI, Copilot, and Gemini would already cover the field. The opportunity exists precisely because most enterprises want AI but still cannot cross the compliance, workflow, and trust barriers alone.',
        },
        {
          player: 'Deployment gap',
          reason: '<strong>The shortage is not AI models. It is deployable AI.</strong> The winning layer is whatever helps firms cross those frictions: embedded AI tools, implementation support, governance-safe rollout patterns, and ROI-visible business use cases.',
        },
      ],
      gapConclusion: 'The real opening is for AI that is <strong>embedded, measurable, and operationally safe</strong>, not for standalone AI products chasing novelty.',
      gapEvidence: `<strong>40.9%</strong> of German firms now use AI in business processes${cite(23)} — yet only <strong>6%</strong> of Mittelstand companies have moved beyond pilot stage.${cite(22)} The hardest problem is not “can we use AI?” but “can we deploy it inside real operations, with acceptable ROI, governance, and internal trust?” <strong>Aleph Alpha</strong> is a direct expression of this logic: not necessarily the strongest LLM, but one positioned as AI German enterprises can trust inside a compliance framework.`,
      gapNote: '<strong>Practical gaps:</strong> AI implementation support, vertical AI for one workflow, enterprise-side AI enablement, and compliance-safe deployment layers remain far less mature than the amount of AI interest suggests.',

      startupLabel: 'Startup Perspective',
      startupDirection: 'This is the <strong>clearest current window</strong>, but it is also the one most likely to close quickly as platform vendors absorb more functionality.',
      startupAnalogy: 'The winning path is rarely “build a general AI company.” The stronger path is usually one <strong>specific workflow wedge</strong> where AI creates a measurable before/after improvement and can be embedded into an existing business system. The strategic analogy is <strong>Aleph Alpha</strong>: the wedge is not pure technical superiority; it is trusted fit inside the German governance environment.',
      startupApproaches: [
        '<strong>Vertical AI application</strong> for one concrete business scenario such as customer service, document processing, forecasting, or quality analysis',
        '<strong>Implementation-first AI company</strong> that helps Mittelstand go from AI interest to actual workflow rollout, then productizes repeatable modules',
        '<strong>Governance / trust layer</strong> around AI deployment: explainability, approval controls, and enterprise-safe rollout patterns',
      ],
      startupRisks: [
        'Platform vendors can absorb horizontal AI functionality faster than independent startups expect',
        'Procurement cycles remain long, especially when AI touches employee workflows, compliance, or sensitive data',
        'A strong demo is not enough; if ROI cannot be made legible, adoption will stall',
      ],

      rolesLabel: 'Employment Perspective',
      rolesNote: 'AI application is currently the <strong>fastest-growing role segment</strong>, but it also demands the most hybrid profile: business language, workflow understanding, AI product literacy, and internal change management.',
      roles: [
        {
          title: 'AI Implementation Consultant / AI Project Manager',
          employers: 'Enterprise AI teams · AI consultancies',
          skills: 'Business-process analysis + AI product understanding + change management + German stakeholder communication',
        },
        {
          title: 'Solutions Engineer · AI',
          employers: 'Parloa · n8n · Hypatos · vendor AI teams',
          skills: 'AI product demonstration + technical solution design + PoC support + enterprise dialogue',
        },
        {
          title: 'Data / AI Analyst',
          employers: 'Large Mittelstand · internal innovation teams',
          skills: 'Data analysis + workflow understanding + ROI framing + internal influence',
        },
      ],
      rolesEmployers: 'Parloa · n8n · Aleph Alpha · Hypatos · SAP AI teams · Microsoft AI teams · Celonis AI functions · large Mittelstand firms building internal AI teams',
    },

    'p3-e4-summary': {
      label: 'Part 3 Conclusion',
      title: 'Five segments, assessed across six dimensions. The picture is not uniform.',
      intro: 'This page is meant to make one thing immediately legible: for both founders and job-seekers, the five segments imply very different opportunity structures. The six dimensions are <strong>market size</strong>, <strong>growth</strong>, <strong>competition intensity</strong>, <strong>startup feasibility</strong>, <strong>employment density</strong>, and the <strong>timing window</strong>.',
      headers: [
        { label: 'Dimension' },
        { label: 'Enterprise core systems', tone: 'muted' },
        { label: 'Process automation', tone: 'green' },
        { label: 'Compliance / security', tone: 'muted' },
        { label: 'Vertical software', tone: 'amber' },
        { label: 'AI application', tone: 'blue' },
      ],
      rows: [
        {
          label: 'Market size',
          values: [
            { score: 5, tone: 'muted' },
            { score: 3, tone: 'green' },
            { score: 4, tone: 'muted' },
            { score: 3, tone: 'amber' },
            { score: 2, tone: 'blue' },
          ],
        },
        {
          label: 'Growth',
          values: [
            { score: 2, tone: 'muted' },
            { score: 5, tone: 'green' },
            { score: 3, tone: 'muted' },
            { score: 4, tone: 'amber' },
            { score: 5, tone: 'blue' },
          ],
        },
        {
          label: 'Competition intensity',
          values: [
            { score: 5, tone: 'muted' },
            { score: 3, tone: 'green' },
            { score: 4, tone: 'muted' },
            { score: 3, tone: 'amber' },
            { score: 2, tone: 'blue' },
          ],
        },
        {
          label: 'Startup feasibility',
          values: [
            { score: 1, tone: 'muted' },
            { score: 5, tone: 'green' },
            { score: 2, tone: 'muted' },
            { score: 3, tone: 'amber' },
            { score: 4, tone: 'blue' },
          ],
        },
        {
          label: 'Employment density',
          values: [
            { score: 4, tone: 'muted' },
            { score: 5, tone: 'green' },
            { score: 3, tone: 'muted' },
            { score: 3, tone: 'amber' },
            { score: 4, tone: 'blue' },
          ],
        },
        {
          label: 'Timing window',
          values: [
            { type: 'window', text: 'Closed', tone: 'muted' },
            { type: 'window', text: 'Open', tone: 'green' },
            { type: 'window', text: 'Half-open', tone: 'muted' },
            { type: 'window', text: 'Open', tone: 'amber' },
            { type: 'window', text: 'Closing', tone: 'blue' },
          ],
        },
      ],
      notes: [
        {
          title: 'Market size vs. startup feasibility',
          body: 'Enterprise core systems are the <strong>largest segment</strong>, but also the <strong>least attractive startup entry point</strong>. That is not a contradiction: the biggest pool of money is also where <strong>SAP + SI gatekeeping</strong> is strongest and where installed-base lock-in is deepest.',
        },
        {
          title: 'The two fastest-growing segments differ in entry logic',
          body: '<strong>Process automation</strong> and the <strong>AI application layer</strong> both score highest on growth, but they are not equally easy to enter. Process automation already has a visible Mittelstand wedge and a clearer go-to-market logic. AI grows faster, but the path is still less settled and more dependent on execution timing.',
        },
        {
          title: 'Vertical software is slower, but structurally stable',
          body: '<strong>Vertical software</strong> only scores medium on startup feasibility because entry cost is high and sales cycles are long. But the moat is two-way: if it is hard to enter, it is also hard to replace. Once embedded in one niche, both company-building and long-term employment become structurally durable.',
        },
        {
          title: 'What the timing window actually means',
          body: '<strong>Closed</strong> means the ecosystem is already mature and there is little structural whitespace. <strong>Open</strong> means demand is visible and supply still misfits. <strong>Half-open</strong> means demand is real but entry conditions remain specialized. <strong>Closing</strong> means the window is still real, but platform absorption is accelerating.',
        },
      ],
      audiences: [
        {
          label: 'For founders',
          title: 'Most attractive directions',
          tone: 'green',
          points: [
            '01  Process automation: lightweight tools for mid-Mittelstand remain the clearest wedge, with the most legible entry logic',
            '02  AI application: vertical AI rollout tools or implementation-led entry while the window is still open',
            '03  Vertical software: strongest moat, but only for teams with deep industry context and long time horizons',
          ],
        },
        {
          label: 'For job-seekers',
          title: 'Best growth-and-density paths',
          tone: 'blue',
          points: [
            '01  Process automation: solutions engineering and implementation roles remain the densest opportunity pool',
            '02  AI application: AI rollout, AI project management, and AI-facing customer roles are growing fastest',
            '03  Vertical software: fewer openings, but much higher scarcity value for candidates with real industry background',
          ],
        },
      ],
      closing: 'Across the three most attractive segments, <strong>hybrid people are rarer than pure specialists</strong>. Pure technical, pure business, or pure consulting profiles all hit a ceiling sooner in this market. The highest-value position is the person who can <strong>understand industry process</strong>, <strong>talk to business stakeholders</strong>, and still <strong>deliver under structural constraints</strong>.',
    },

    'p2-a1': {
      label: 'Who are the buyers?',
      title: 'This market breaks into <strong>three customer segments</strong> with fundamentally different needs, budgets, and buying behavior.',
      intro: 'German B2B software customers can be mapped along two dimensions: <span class="cseg-inline-accent">company size</span> and <span class="cseg-inline-accent">industry</span>. Size is the decisive variable: it determines where budget sits, who decides, and what kind of product is acceptable.',
      segments: [
        {
          title: 'Large Enterprise',
          sub: '>500 employees · DAX companies and large industrial groups',
          summary: 'Buys integration, customization, and migration more often than a net-new product.',
          facts: [
            { label: 'Budget', value: 'Dedicated IT budgets; single projects can reach EUR millions' },
            { label: 'Decision', value: 'IT + business + management + procurement + legal; typically 18-24 months' },
            { label: 'Need', value: 'Deep SAP context means the priority is integration, customization, and migration' },
            { label: 'Barrier', value: 'Requires local team, references, and certifications before serious entry is possible' },
          ],
        },
        {
          title: 'Mid Mittelstand',
          sub: '50-500 employees · the core target segment in Germany',
          summary: 'Has real demand and real budget, but needs trust and problem definition support.',
          badge: 'Priority Segment',
          highlight: true,
          facts: [
            { label: 'Budget', value: 'Usually controlled by the owner or operations lead; EUR20k-EUR200k per project' },
            { label: 'Decision', value: 'Shorter chain, but the owner is highly cautious; stability beats feature richness' },
            { label: 'Need', value: 'Digitalization problems are real, but the problem often still needs to be defined and quantified' },
            { label: 'Barrier', value: 'German language and local references are baseline requirements for trust' },
          ],
        },
        {
          title: 'Small Enterprise',
          sub: '<50 employees · fragmented and price-sensitive buyers',
          summary: 'Closer to consumer-SaaS economics than to enterprise transformation budgets.',
          facts: [
            { label: 'Budget', value: 'Extremely price sensitive; monthly pricing above roughly EUR200 already faces resistance' },
            { label: 'Decision', value: 'The owner decides alone, but buying frequency is low and loyalty is weak' },
            { label: 'Need', value: 'DATEV and basic cloud tools already cover much of the practical need' },
            { label: 'Barrier', value: 'Not the main battlefield: low contract value and high service cost' },
          ],
        },
      ],
      industryTitle: 'Industry overlays the size logic',
      industryIntro: 'Industry does not replace the segmentation above. It mainly changes the content of demand and the regulatory environment.',
      industryDetailsTitle: 'Get more details for different industries',
      industryDetailsPreview: 'Open the industry view to see how manufacturing, logistics, finance, and public sector needs diverge.',
      industryHeaders: ['Industry', 'Core software demand', 'Special factor'],
      industryRows: [
        { industry: 'Manufacturing / Industrial', demand: 'MES, ERP integration, quality management', factor: 'Industry 4.0 pressure; higher compliance burden' },
        { industry: 'Logistics / Trade', demand: 'TMS, WMS, supply-chain visibility', factor: 'Real-time coordination matters' },
        { industry: 'Financial / Professional Services', demand: 'Compliance reporting, risk control, workflow', factor: 'Regulation-heavy and GDPR-sensitive' },
        { industry: 'Public Sector', demand: 'eGov, document management, compliance systems', factor: 'Special procurement rules and longer cycles' },
      ],
      insightLabel: 'Insight',
      insight: 'Mid-sized Mittelstand is the customer group worth studying most closely. It combines real demand, real budget, and meaningful scale, but it remains underserved because its needs are too complex for standard SaaS and too small for heavyweight integrators. This middle layer is the market\'s clearest structural gap.',
    },

    'p2-a2': {
      label: 'Where Demand Comes From',
      title: 'The four structural constraints from Part 1 translate directly into <strong>six demand categories</strong>.',
      intro: 'These are established demand pools with clear buying triggers, recurring budgets, and visible implementation pain.',
      demandsTitle: 'Six Demand Categories',
      demands: [
        {
          num: '01',
          title: 'System integration and data connectivity',
          origin: 'System Complexity',
          focus: 'Cross-segment demand',
          characteristics: 'Connecting siloed systems; most universal and persistent demand across all segments',
        },
        {
          num: '02',
          title: 'Core system modernization',
          origin: 'System Complexity + Stability',
          focus: 'Enterprise-heavy trigger',
          characteristics: `SAP ECC end-of-life by 2027 is driving forced migrations — the largest single procurement trigger in recent years${cite(9)}`,
        },
        {
          num: '03',
          title: 'Process automation and workflow redesign',
          origin: 'Coordination Requirement',
          focus: 'Mid-market concentration',
          characteristics: 'Converting Excel/email-driven processes to standardized, auditable flows; especially concentrated in mid-size Mittelstand',
        },
        {
          num: '04',
          title: 'Compliance and data governance',
          origin: 'Regulatory Pressure',
          focus: 'Non-cyclical budget',
          characteristics: 'GDPR, NIS2, sector-specific regulation; budget is non-cyclical — non-compliance is more expensive than compliance',
        },
        {
          num: '05',
          title: 'Vertical industry digitalization',
          origin: 'All four constraints',
          focus: 'Strong moat, high entry cost',
          characteristics: 'Manufacturing MES, logistics TMS, construction BIM — high specificity, deep lock-in, high switching cost',
        },
        {
          num: '06',
          title: 'AI-assisted operations',
          origin: 'Stability + Coordination',
          focus: 'ROI must be demonstrable',
          characteristics: 'Embedding AI into existing workflows for analytics, forecasting, document processing; ROI must be demonstrable',
        },
      ],
      insightLabel: 'Conclusion',
      conclusion: 'These are not emerging needs that require market education. They are established demand categories with proven willingness to pay. Germany does not lack demand. It lacks solutions that can be delivered within its structural constraints.',
    },

    'p2-a3': {
      label: 'How are those demands structured?',
      title: '<strong>Five market segments</strong>, defined by how transferable the solution is across industries.',
      intro: 'The five segments differ not just by category, but by how transferable the solution is across industries, how mature the market already is, and what kind of entry logic actually works.',
      axisY: 'Market maturity',
      axisYHigh: 'Mature',
      axisYLow: 'Emerging',
      axisXLeft: 'Vertical / Specialized',
      axisXRight: 'Universal / Cross-industry',
      quadrants: [
        { pos: 'tl', label: 'Emerging · Universal' },
        { pos: 'tr', label: 'Mature · Universal' },
        { pos: 'bl', label: 'Emerging · Vertical' },
        { pos: 'br', label: 'Mature · Vertical' },
      ],
      legend: [
        { label: 'Market leaders', tone: 'leader' },
        { label: 'Unicorn / breakout scaleups', tone: 'unicorn' },
      ],
      segments: [
        {
          label: 'Enterprise Core Systems',
          sub: 'ERP · Finance · HR',
          note: `ERP ~$5.8B${cite(11)} · largest software segment`,
          x: 78, y: 78,
          width: 250,
          height: 150,
          tone: 'leader',
          color: '#60A5FA',
          fill: 'rgba(96, 165, 250, 0.12)',
        },
        {
          label: 'Process Automation',
          sub: 'BPM · Integration · RPA',
          note: `$2.5B–$2.8B combined${cite(12)} · fastest growth`,
          x: 26, y: 62,
          width: 230,
          height: 126,
          tone: 'unicorn',
          color: '#34D399',
          fill: 'rgba(52, 211, 153, 0.12)',
        },
        {
          label: 'Compliance · Security\n& Data Governance',
          sub: 'GDPR · Cybersecurity · GRC',
          note: `$12.6B broad market${cite(13)} · regulation-driven`,
          x: 70, y: 28,
          width: 250,
          height: 122,
          tone: 'leader',
          color: '#F59E0B',
          fill: 'rgba(245, 158, 11, 0.12)',
        },
        {
          label: 'Vertical Industry Software',
          sub: 'MES · TMS · WMS · BIM · APS',
          note: `MES ~$0.74B software only${cite(14)} · deepest moat`,
          x: 53, y: 14,
          width: 260,
          height: 138,
          tone: 'leader',
          color: '#F97316',
          fill: 'rgba(249, 115, 22, 0.12)',
        },
        {
          label: 'AI Application Layer',
          sub: 'Analytics · Forecasting · Copilot',
          note: `Industry 4.0 ~$12.1B broad market${cite(15)}`,
          x: 19, y: 24,
          width: 188,
          height: 108,
          tone: 'unicorn',
          color: '#818CF8',
          fill: 'rgba(129, 140, 248, 0.12)',
        },
      ],
      cloud: {
        label: 'Industry Cloud',
        sub: 'Universal platform + vertical extensions',
        x: 42, y: 47, w: 26, h: 18,
      },
      cloudPanel: {
        title: 'Industry Cloud as the middle ground',
        body: 'This is the fastest-forming in-between zone: general platforms with industry-specific extension packs. For outsiders, building a specialized extension on top of an industry cloud is usually easier than entering a vertical market from zero.',
        examples: 'SAP Industry Cloud · Siemens Xcelerator · Microsoft Cloud for Manufacturing',
      },
      tableHeaders: ['Market size', 'Growth', 'Competition', 'Entry difficulty', 'Opportunity type'],
      table: [
        { num: '①', name: 'Enterprise core systems', size: '●●●●●', growth: '●●', competition: '●●●●●', entry: '●●●●●', opp: 'Migration services' },
        { num: '②', name: 'Process automation', size: '●●●', growth: '●●●●●', competition: '●●●', entry: '●●●', opp: 'Product + service' },
        { num: '③', name: 'Compliance & security', size: '●●●●', growth: '●●●', competition: '●●●', entry: '●●●', opp: 'Localized product' },
        { num: '④', name: 'Vertical industry software', size: '●●●', growth: '●●●●', competition: '●●', entry: '●●●●●', opp: 'Deep specialization' },
        { num: '⑤', name: 'AI application layer', size: '●●', growth: '●●●●●', competition: '●●', entry: '●●', opp: 'Window opportunity' },
      ],
      marketContext: {
        label: 'Market Context',
        body: `Germany's enterprise software market is roughly <strong>$18.1B</strong>${cite(10)} in software license and subscription revenue alone in 2024. Converted at 2024 average exchange rates, that is roughly <strong>€16.7B</strong>. This excludes implementation, customization, maintenance, and integration services. Including services, the practical market likely sits closer to <strong>$36B-$54B</strong>, which is why <strong>system integrators</strong> remain so important: a large share of value sits in services, not in product revenue.`,
      },
      scopeTitle: 'How to read the segment numbers',
      scopeNotes: [
        {
          name: 'Enterprise core systems',
          body: '<strong>2024 market:</strong> Germany enterprise software overall ~$18.1B; ERP alone roughly ~$5.8B and the largest single segment. The headline numbers refer to <strong>software license + subscription revenue only</strong>, excluding implementation and maintenance. The biggest trigger remains <strong>SAP ECC end-of-support in 2027</strong>, which forces migration spend.',
        },
        {
          name: 'Process automation',
          body: '<strong>BPM alone</strong> is only part of the picture. BPM software is around ~$1.8B, but adding RPA and process mining brings the practical software layer closer to <strong>$2.5B-$2.8B</strong>. The real market is larger still because a meaningful share of automation spend sits inside <strong>SI and digital-transformation contracts</strong>, not software-only line items.',
        },
        {
          name: 'Compliance / security',
          body: 'The <strong>$12.6B</strong> figure is a <strong>broad cybersecurity market</strong> including software, hardware infrastructure, and services. Pure software is much smaller. Likewise, the projected <strong>€7.4B</strong> NIS2 / DORA compliance spend is not pure software demand; it includes consulting, implementation, and audit effort.',
        },
        {
          name: 'Vertical software',
          body: 'The <strong>$0.74B</strong> MES figure is <strong>software license revenue only</strong>. In practice, implementation and maintenance are often <strong>3–5x the software fee</strong>, which means the real budget pool is substantially larger. TMS, WMS, and BIM numbers are less standardized, so this report treats vertical software as a blended estimate rather than a single uniform TAM.',
        },
        {
          name: 'AI application layer',
          body: 'The <strong>$12.1B</strong> figure is an <strong>Industry 4.0 broad market</strong>, not a clean AI-software number. A reliable standalone German enterprise-AI software TAM does not yet exist because AI is increasingly sold as a <strong>feature inside existing products</strong>. For this segment, growth rate and deployment friction are more informative than absolute market size.',
        },
      ],
      insightLabel: 'Insight',
      conclusion: 'Five segments, five different opportunity logics. There is no segment that is both easy to enter and rich in budget. Every opportunity comes with a corresponding entry condition and cost, and in Germany a meaningful share of that value still sits in <strong>services</strong>, not just in software.',
      note: `Market size figures refer to software license/subscription revenue only, excluding implementation and services. Sources: enterprise software overall${cite(10)} · ERP${cite(11)} · BPM${cite(12)} · cybersecurity${cite(13)} · MES${cite(14)} · Industry 4.0${cite(15)}`,
    },

    'p2-a4': {
      label: 'How is demand served?',
      title: 'In Germany, software is rarely delivered as a standalone product. <strong>Delivery</strong> is part of the equation.',
      intro: 'There are three main delivery modes in the German market. Understanding them is the starting point for understanding the supply side.',
      modes: [
        {
          label: 'Mode 01',
          title: 'Product-led',
          sub: 'The software itself is the core deliverable',
          body: 'Best for standardized domains and simple SMB use cases. Even here, German entry usually still requires <strong>local support</strong>, <strong>German UI</strong>, and <strong>GDPR documentation</strong>.',
          points: [
            'HR basics, bookkeeping, project management',
            'Small firms under 50 employees',
            'Example: Personio',
          ],
        },
        {
          label: 'Mode 02',
          title: 'Service-led',
          sub: 'Software is the vehicle; services deliver the value',
          highlight: true,
          badge: 'Mainstream model',
          body: 'This is the market\'s dominant mode. The customer is buying a solution that can run inside the existing environment. In many contracts, <strong>implementation fees equal or exceed software license fees</strong>.',
          points: [
            'Large enterprise and Mittelstand',
            'ERP, MES, vertical software, integration-heavy projects',
            'License fee + implementation fee',
          ],
        },
        {
          label: 'Mode 03',
          title: 'Hybrid',
          sub: 'Standardized product plus configurable implementation layer',
          highlight: true,
          badge: 'Fastest-growing',
          body: 'A product delivers the repeatable 80%, while services configure the remaining 20%. It lowers delivery risk for the customer and improves vendor scalability.',
          points: [
            'More predictable than pure service',
            'More scalable than pure customization',
            'Example: SAP Industry Cloud, Siemens Xcelerator',
          ],
        },
      ],
      whyTitle: 'Why service weight is structurally high in Germany',
      whyPreview: 'Because system integration, accountability, coordination, and compliance all require service capacity around the product.',
      whyRows: [
        { constraint: 'System Complexity', impact: 'No enterprise product works truly out of the box; existing systems still need integration' },
        { constraint: 'Stability Orientation', impact: 'Customers need someone accountable for making it run; self-serve trial-and-error is not acceptable' },
        { constraint: 'Coordination Requirement', impact: 'Multi-department adoption requires coordination work that the product alone cannot handle' },
        { constraint: 'Regulatory Pressure', impact: 'Compliance setup requires expert judgment, not just form-filling' },
      ],
      whyConclusion: 'Result: a pure product company rarely serves enterprise demand alone in Germany. It either builds service capability itself or depends on SI, VAR, and consulting partners.',
      compareTitle: 'How the three modes compare',
      comparePreview: 'Product-led is easiest to scale, service-led is the mainstream enterprise model, and hybrid sits in the middle as the fastest-growing structure.',
      compareHeaders: ['Main customer', 'Gross margin', 'Scalability', 'Entry barrier', 'Sales cycle', 'Representative companies'],
      compareRows: [
        { name: 'Product-led', customer: 'Small business', margin: 'High', scalability: 'High', barrier: 'Lower, but localization is required', cycle: '1-3 months', examples: 'Personio, Lexware' },
        { name: 'Service-led', customer: 'Large enterprise', margin: 'Low-Mid', scalability: 'Low', barrier: 'High; local team required', cycle: '12-24 months', examples: 'SAP, Accenture' },
        { name: 'Hybrid', customer: 'Mid Mittelstand', margin: 'Mid', scalability: 'Mid', barrier: 'Medium', cycle: '6-12 months', examples: 'Celonis, Nemetschek' },
      ],
    },

    'p2-a5': {
      label: 'Who are the players?',
      title: 'Four types of players, each with a different role, reach, and relationship to the customer.',
      intro: 'Germany\'s B2B software supply side is built by four player types. They do not simply compete head-to-head; they form an ecosystem of specialized roles. Understanding that ecosystem matters more than memorizing individual company names.',
      players: [
        {
          label: 'Type 01',
          title: 'Global platform vendors',
          companies: 'SAP · Microsoft · Salesforce · Oracle · Workday',
          body: `They provide horizontal enterprise platforms. In Germany, <strong>SAP</strong> is structurally special: it is local, deeply embedded in enterprise operations, and still the standard-setting core for many large companies.${cite(16)}`,
          role: 'Role in Germany: they define the platform standard that others build around.',
        },
        {
          label: 'Type 02',
          title: 'European / German local software vendors',
          companies: 'DATEV · Haufe · Nemetschek · Inform · PSI · Fabasoft',
          body: 'These firms are deeply rooted in a function or vertical and often have 20-40 years of operating history. Their native fit to regulation, language, and workflow makes replacement unusually difficult.',
          role: 'Role in Germany: they control important vertical niches where global products struggle to compete directly.',
        },
        {
          label: 'Type 03',
          title: 'System integrators (SI)',
          companies: 'Accenture · Capgemini · Deloitte · msg Group · Atos',
          body: 'They do not sell the product; they make it work. Selection, implementation, integration, and customization flow through SI contracts, which makes them a real value-transfer node in the market.',
          role: 'Role in Germany: they are a key delivery layer and a major influence on procurement decisions.',
          highlight: true,
          badge: 'Key channel',
        },
        {
          label: 'Type 04',
          title: 'Specialized scaleups',
          companies: 'Celonis · Personio · Camunda · Staffbase · Parloa',
          body: 'These firms usually start in Germany or Europe, stay highly focused, and grow in the gaps between global platforms and entrenched local incumbents. Their path is not broad replacement, but narrow wedge expansion.',
          role: 'Role in Germany: they grow in the whitespace that neither platforms nor legacy local vendors fully cover.',
        },
      ],
      stackTitle: 'Player relationships: not flat competition, but layered coordination',
      stack: [
        {
          title: 'Global platform vendors',
          sub: 'Define the platform standard',
        },
        {
          title: 'System integrators',
          sub: 'Connect platform, implementation, and customer environment',
          highlight: true,
        },
        {
          title: 'Local software vendors + specialized scaleups',
          sub: 'Provide domain extensions and category-specific solutions',
        },
        {
          title: 'Final customer',
          sub: 'Receives the delivered solution through the ecosystem',
        },
      ],
      insightLabel: 'Insight',
      insight: 'Entering Germany is not just about beating a competitor. It is about finding the right position inside an already layered ecosystem.',
    },

    'p2-a6': {
      label: 'Competitive Dynamics',
      title: 'Competition here is not primarily about features. It is about switching costs, trust, and ecosystem position.',
      intro: 'To understand competition in Germany, you first need to drop one intuition: a better-featured product does not automatically win.',
      traits: [
        {
          label: 'Trait 01',
          title: 'Installed-base lock-in is structurally high',
          body: 'Core systems in large enterprise and Mittelstand often have 10-20 years of history behind them. Those systems carry custom configuration, historical data, and process dependency. Replacement cycles are therefore extremely long.',
          takeaway: 'Result: new entrants usually win through <strong>incremental demand</strong>, not through broad replacement of the installed base.',
        },
        {
          label: 'Trait 02',
          title: 'Trust barriers matter more than technology barriers',
          body: 'The practical buying standard is not “Which product is better?” but “Which vendor feels safe enough to adopt?” For many outside entrants, this is the biggest adjustment in market logic.',
          takeaway: 'Result: technical superiority alone is rarely sufficient to unlock enterprise adoption.',
        },
        {
          label: 'Trait 03',
          title: 'Ecosystem position matters more than raw market share',
          body: 'In Germany, who you work with often matters more than how good the product is. SAP certification, SI recommendation lists, and recognition by industry associations all materially lower trust cost.',
          takeaway: 'Result: competition is not just product against product; it is position inside the ecosystem.',
        },
      ],
      rankingTitle: 'What buyers prioritize when choosing a vendor',
      ranking: [
        { num: '01', label: 'Local reference customers', note: 'Same industry, same company size, already live in Germany' },
        { num: '02', label: 'Localization quality', note: 'German support, GDPR fit, local data handling' },
        { num: '03', label: 'Vendor stability', note: 'Will this company still exist and support us in five years?' },
        { num: '04', label: 'Feature fit', note: 'Important, but not the first decision criterion' },
        { num: '05', label: 'Price', note: 'Comes after trust and delivery risk have been addressed' },
      ],
      compareHeaders: ['Dimension', 'Horizontal categories', 'Vertical categories'],
      compareRows: [
        { dimension: 'Concentration', horizontal: 'Higher; a few major vendors dominate', vertical: 'Lower; fragmented local specialists' },
        { dimension: 'Moat source', horizontal: 'Network effects + switching costs', vertical: 'Industry know-how + data accumulation' },
        { dimension: 'Entry strategy', horizontal: 'Find a narrow wedge, as Personio did in HR', vertical: 'Go deep into one industry' },
        { dimension: 'Typical replacement cycle', horizontal: '7-15 years', vertical: '10-20 years' },
      ],
      insightLabel: 'Insight',
      insight: 'The core of competition is not product features. It is position inside the ecosystem.',
    },

    'p2-a7': {
      label: 'Who makes the buying decision?',
      title: 'In German enterprises, no single person buys software. Decisions are made by a coalition.',
      intro: 'Software procurement in Germany is rarely one person making a choice. Understanding who participates, who leads, and who can block the project matters more than understanding the feature list.',
      roles: [
        {
          label: 'Role 01',
          title: 'Decision maker',
          sub: 'Final sign-off and budget control',
          body: 'Usually the CFO or CIO in large enterprise, and often the Geschäftsführer in Mittelstand.',
          points: [
            'Most sensitive to stability, risk, and vendor credibility',
            'Not always the most technical person in the room',
          ],
          speak: 'Talk about ROI, risk control, and vendor stability, not a long feature list.',
        },
        {
          label: 'Role 02',
          title: 'Evaluator',
          sub: 'Technical and business assessment',
          body: 'Usually the IT lead, business department head, or a digitalization lead who runs evaluation and writes the recommendation.',
          points: [
            'Strong influence on the final decision, but not the final signer',
            'Owns product testing, feasibility review, and supplier interaction',
          ],
          speak: 'Talk about implementation risk, integration complexity, and relevant reference cases.',
        },
        {
          label: 'Role 03',
          title: 'End user',
          sub: 'Daily operator of the system',
          body: 'Factory staff, finance teams, and sales teams determine whether the system is actually accepted in day-to-day work.',
          points: [
            'Adoption or resistance often determines whether the rollout succeeds',
            'They know fastest whether the system adds friction or removes it',
          ],
          speak: 'Talk about ease of use, training support, and not increasing workload.',
        },
        {
          label: 'Role 04',
          title: 'Betriebsrat',
          sub: 'Works council with legal veto power',
          body: `If software changes employee workflows, monitoring, or performance-data collection, written consent can be required before implementation proceeds.${cite(17)}`,
          points: [
            'Can review technical documentation, data logic, and privacy impact',
            'Objections can delay projects for months or push them into arbitration',
            'Most relevant for HR tools, productivity software, collaboration platforms, and behavior analytics',
          ],
          speak: 'Be Betriebsrat-friendly from day one: data minimization, transparent permissions, clear privacy material, and 1-3 months of timeline buffer.',
        },
      ],
      tableHeaders: [
        '',
        'Large enterprise (>500)',
        'Mid Mittelstand (50-500)',
        'Small business (<50)',
      ],
      tableRows: [
        {
          label: 'Decision maker',
          enterprise: 'CIO / CFO + board',
          mid: 'Usually the owner',
          small: 'Owner',
        },
        {
          label: 'Evaluator',
          enterprise: 'IT + business + procurement',
          mid: 'IT lead, often wearing multiple hats',
          small: 'Usually no formal evaluation process',
        },
        {
          label: 'Betriebsrat impact',
          enterprise: 'High; formal consultation is often required',
          mid: 'Medium; depends on company structure and product type',
          small: 'Low or absent',
        },
        {
          label: 'Decision cycle',
          enterprise: '18-24 months',
          mid: '6-12 months',
          small: '1-3 months',
        },
        {
          label: 'Key driver',
          enterprise: 'Compliance, integration, vendor credentials',
          mid: 'Owner trust and local reference cases',
          small: 'Price and ease of use',
        },
      ],
      advisorLabel: 'Additional influencer',
      advisorTitle: 'External advisors quietly shape many Mittelstand buying decisions',
      advisorBody: 'Tax advisors and industry associations often act as trusted filters before the owner makes an IT decision. DATEV is powerful partly because it is deeply embedded inside the tax-advisor recommendation network.',
      insightLabel: 'Insight',
      insight: 'To reach the decision maker, you may first need to reach the advisor they already trust.',
    },

    'p2-a8': {
      label: 'How does the buying process work?',
      title: 'Typical Mittelstand procurement is <strong>document-heavy</strong>, <strong>multi-party</strong>, and hard to compress.',
      intro: 'In German mid-sized companies, enterprise procurement is usually initiated by the business side, then pulled through a structured internal risk-management process. The external vendor conversation is only one part of the cycle.',
      processLabel: 'Typical flow (mid-sized firms / Mittelstand)',
      stages: [
        {
          num: '01',
          title: 'Need identification',
          duration: '2-8 weeks',
          body: 'The process usually starts from the business department (Fachabteilung), not from IT. IT often enters later as evaluator, not as the original demander.',
          key: 'Do not assume IT is the initial buyer just because IT is unavoidable later.',
        },
        {
          num: '02',
          title: 'Internal project alignment',
          duration: '4-12 weeks',
          body: 'The project usually needs alignment across business, IT, finance, and sometimes compliance or legal. This internal step is often slower than the external vendor discussion.',
          key: 'A deal can stall before formal vendor evaluation even begins.',
        },
        {
          num: '03',
          title: 'Vendor evaluation',
          duration: '6-12 weeks',
          body: 'German firms often prefer a documented RFI / RFP-style process, especially once the shortlist is formed.',
          points: [
            'Documentation standards are high, and generic decks tend to fail',
            'Reference customers from the same industry matter disproportionately',
            'Local or European vendors begin with a trust advantage',
          ],
          key: 'If you do not look referenceable, later persuasion has limited effect.',
        },
        {
          num: '04',
          title: 'Betriebsrat involvement',
          duration: '4-12 weeks',
          body: 'This is the step many foreign vendors underestimate. Under Section 87 of the Works Constitution Act (BetrVG), software affecting employee monitoring, performance tracking, or workflow change can require formal co-determination.',
          points: [
            'This is not simple consultation; in practice it functions as a real blocking point',
            'Bypassing the Betriebsrat is unlawful and can invalidate the rollout',
            'Products touching workforce data need a separate communication strategy for employee rights and data use',
          ],
          key: 'If this step is relevant, the cycle is structurally longer.',
        },
        {
          num: '05',
          title: 'Pilot / POC',
          duration: '6-12 weeks',
          body: 'German buyers usually expect a concrete test scenario tied to the customer’s real workflow. A generic product demo is rarely enough.',
          key: 'The POC has to prove fit inside the actual operating context, not just feature breadth.',
        },
        {
          num: '06',
          title: 'Security and compliance review',
          duration: '4-8 weeks',
          body: 'The technical and legal review often becomes a gate of its own before the contract can move forward.',
          points: [
            'GDPR data storage location, ideally inside the EU and often preferably Germany',
            'ISO 27001 or BSI-baseline style compliance expectations',
            'Data processing agreement (DPA) negotiation',
          ],
        },
        {
          num: '07',
          title: 'Contract negotiation',
          duration: '4-8 weeks',
          body: 'Legal review is usually strict, and commercial terms are negotiated conservatively.',
          points: [
            'Annual or quarterly payments are often easier to accept than hard monthly lock-in logic',
            'Exit clauses and data-migration rights need to be explicit',
            'The legal text itself gets real scrutiny, not just commercial headlines',
          ],
        },
        {
          num: '08',
          title: 'Final decision',
          duration: '2-4 weeks',
          body: 'The purchase usually requires at least two management layers of sign-off. Larger deals can require Geschäftsführer or board approval.',
          key: 'Even when one champion exists, formal approval still remains multi-level.',
        },
      ],
      summaryTitle: 'Key structural constraints behind the process',
      summaryHeaders: ['Constraint', 'Practical effect'],
      summaryRows: [
        {
          cells: [
            'Betriebsrat co-determination',
            'The cycle cannot simply be compressed. If employee monitoring or workflow change is involved, this step has to be planned in from the start.',
          ],
        },
        {
          cells: [
            'Data-localization preference',
            'Pure public-cloud products start at a disadvantage when data location and control are unclear.',
          ],
        },
        {
          cells: [
            'Reference-customer requirement',
            'Cold start is hard for new entrants. Without an anchor customer, shortlist access remains difficult.',
          ],
        },
        {
          cells: [
            'Stability-first buying logic',
            'Switching vendors is hard, but once embedded the relationship is usually sticky and long-lasting.',
          ],
        },
      ],
      strategyTitle: 'What this means for sales strategy',
      strategyPoints: [
        'Build the internal champion early, before the Betriebsrat or full review cycle begins.',
        'Do not bypass IT. Even when demand starts in the business unit, IT remains a mandatory gate in the process.',
        'Make the POC concrete. A generic demo rarely works; it has to mirror the customer’s actual scenario.',
        'Prepare dedicated material for the Betriebsrat. Their lens is employee rights and data use, not product functionality.',
      ],
      insightLabel: 'Insight',
      insight: 'In this market, procurement is not just a sales funnel. It is an organizational risk-management process. The winning vendor is the one who can reduce internal friction for the customer, not just the one with the best feature list.',
    },

    'p2-a9': {
      label: 'How is trust established?',
      title: 'In this market, trust is a prerequisite, not a result, of the sales process.',
      intro: 'In Germany, trust does not naturally appear after the sale closes. Trust is the ticket into the procurement process. Without it, you often do not even receive the RFP.',
      sourcesLabel: 'Four sources of trust',
      sources: [
        {
          num: '01',
          title: 'Local reference customers',
          highlight: true,
          body: 'The first question is often whether the vendor already serves similar German customers of similar size and industry.',
          points: [
            'Without local references, it is hard to enter the shortlist for mid-sized and larger firms',
            'References are not just logos: German buyers may actually call those customers directly',
            'The first local customer is the hardest one, but it unlocks the rest of the market',
          ],
        },
        {
          num: '02',
          title: 'Localization depth',
          body: 'Localization is not just translating the UI. It is a complete trust package.',
          points: [
            'German interface and documentation are not optional',
            'GDPR compliance and EU-based data storage are baseline requirements',
            'Local support in the German time zone matters',
            'Local accounting and tax logic such as GoBD can be required',
          ],
        },
        {
          num: '03',
          title: 'Ecosystem certification and partner endorsement',
          body: 'Trust can be borrowed from the ecosystem when the right credentials already exist.',
          points: [
            'SAP partner status creates immediate trust with SAP customers',
            'BITKOM membership increases market visibility',
            'Industry association endorsement matters inside specific sectors',
            'Recommendations from major SIs are especially powerful for larger firms',
          ],
        },
        {
          num: '04',
          title: 'Proof of vendor stability',
          body: 'German buyers care deeply whether the vendor will still be around in five years.',
          points: [
            'Known investors and financing background',
            'A real German presence with office or local team',
            'Existing customer scale and renewal evidence',
            'A credible product roadmap',
          ],
        },
      ],
      pathsLabel: 'Typical entry paths for outside entrants',
      paths: [
        {
          label: 'Path A',
          title: 'Enter through partners',
          body: 'Become a certified partner of major platforms or build distribution through local SIs to borrow an existing trust network.',
        },
        {
          label: 'Path B',
          title: 'Start with one flagship customer',
          body: 'Win one highly visible reference account inside a specific industry and use it to build word-of-mouth and recommendation chains.',
        },
        {
          label: 'Path C',
          title: 'Acquire a local player',
          body: 'Buy local customer relationships, local team, and local trust assets directly. Expensive, but the fastest route.',
        },
      ],
    },

    'p2-summary': {
      eyebrow: 'Part 2 Conclusion',
      title: 'Demand is real. But the critical factor on the supply side is not product features — it is trust and delivery capability.',
      findings: [
        {
          num: '01',
          title: 'Demand density concentrates in mid-size Mittelstand',
          body: 'Of the six demand categories — system integration, core system modernization, process automation, compliance, vertical digitalization, and AI embedding — the three with the highest demand density (system integration, process automation, and vertical digitalization) all concentrate in mid-size Mittelstand. This is precisely the customer segment where supply is least adequate.',
        },
        {
          num: '02',
          title: 'The supply side is ecosystem competition, not feature competition',
          body: 'The four player types — global platforms, local software vendors, system integrators, and specialist scaleups — each occupy non-substitutable niches. Total market software revenue is approximately $18B; add services and the figure is 2–3× higher. A substantial share of the real money is in services, not in the product.',
        },
        {
          num: '03',
          title: 'Entry requires clearing three hard thresholds — all three',
          body: 'These are not soft barriers. They are structural gates embedded in the procurement process. Without advance preparation, the entry window will not open.',
          lines: [
            '<span class="de">Betriebsrat</span> statutory veto rights → workforce representation must be engaged before adoption',
            'Data localization requirements → hosting and data residency compliance is a baseline, not an option',
            'Local reference customers → without a verifiable local track record, vendor evaluation stalls at the first checkpoint',
          ],
        },
      ],
      transition: 'Demand exists, the structure is clear, and the entry conditions are specific. Part 3 answers the final question: where are the real opportunities inside this structure?',
    },

    'solution-reality': {
      eyebrow: 'Slide 7',
      question: 'How does strong demand actually get translated into delivery?',
      title: 'Part 2: Demand & Delivery',
      body:
        'Once the structural logic is clear, the next question is how real enterprise demand is actually served. This section shifts from system explanation to delivery reality.',
      leftTerm: 'Demand',
      rightTerm: 'Delivery',
    },

    'adoption-dynamics': {
      eyebrow: 'Slide 8',
      question: 'What kinds of demand actually exist in this market?',
      title: 'Demand Is Broad and Embedded in Operations',
      body:
        'Demand spans multiple layers of enterprise operations at the same time. It is not concentrated in one software category, but distributed across interfaces, workflows, control requirements, and process extension through AI.',
      core: 'Demand',
      items: [
        {
          term: 'Interface',
          note: 'Customer and supplier touchpoints continue to be digitized.',
        },
        {
          term: 'Workflow',
          note: 'Internal coordination and efficiency remain persistent priorities.',
        },
        {
          term: 'Compliance',
          note: 'Auditability, security, and control stay central to spending logic.',
        },
        {
          term: 'AI',
          note: 'AI is increasingly explored as an extension of existing processes.',
        },
      ],
    },

    'value-distribution': {
      eyebrow: 'Slide 9',
      question: 'Is this demand actually real and funded?',
      title: 'Demand Is Already Funded and Ongoing',
      body:
        'A meaningful share of firms are already investing in digital tools, infrastructure, and operational upgrades. The signal is not hypothetical interest but active and recurring expenditure.',
      items: [
        {
          value: '54%+',
          label: 'Cloud adoption',
          note: 'Paid cloud services are already widespread, especially for foundational enterprise use cases.',
          emphasis: true,
        },
        {
          value: '~41%',
          label: 'AI usage',
          note: 'A large and growing share of firms already use AI in business processes.',
        },
        {
          value: '61%',
          label: 'Security investment',
          note: 'Cybersecurity remains a major area of ongoing SME investment.',
        },
        {
          value: '18.9%',
          label: 'Near-term AI plans',
          note: 'Additional firms report plans to start AI usage soon.',
        },
      ],
      takeaway:
        'Demand is not the bottleneck.',
      note: `Sources: ${SOURCES.destatisCloud} · ${SOURCES.ifoAI} · ${SOURCES.kfwDigital}.`,
    },

    'gaps-slide': {
      eyebrow: 'Slide 11',
      question: 'How is demand actually addressed in practice?',
      title: 'Solutions Are Hybrid',
      body:
        'In practice, enterprise solutions are rarely delivered as standalone software. They are assembled from multiple components that together make the solution operationally usable.',
      layers: [
        {
          id: 'software',
          label: 'Layer 01',
          term: 'Software',
          note: 'Provides functional capability.',
        },
        {
          id: 'internal-it',
          label: 'Layer 02',
          term: 'Internal IT',
          note: 'Adapts, connects, and governs the system fit.',
        },
        {
          id: 'services',
          label: 'Layer 03',
          term: 'Services',
          note: 'Enable implementation, coordination, and rollout.',
        },
        {
          id: 'manual',
          label: 'Layer 04',
          term: 'Manual',
          note: 'Often remains part of real workflows.',
        },
      ],
      formula: 'Software + Internal IT + Services + Manual',
      takeaway:
        'Solutions are assembled, not delivered.',
    },

    'cross-system-insight': {
      eyebrow: 'Slide 12',
      question: 'Why does this hybrid structure emerge?',
      title: 'Hybrid Delivery Is a Response to Constraints',
      body:
        'The hybrid structure is not accidental. It emerges because the market must solve for system fit, delivery risk, and limited internal capacity at the same time.',
      items: [
        {
          id: 'integration',
          term: 'Integration',
          note: 'Systems must be connected rather than replaced.',
        },
        {
          id: 'risk',
          term: 'Risk',
          note: 'Implementation must be controlled and validated throughout delivery.',
        },
        {
          id: 'capacity',
          term: 'Capacity',
          note: 'Limited internal resources increase reliance on external expertise.',
        },
      ],
      center: 'Hybrid',
      takeaway:
        'Hybrid is not accidental, it is structural.',
    },

    'talent-implications': {
      eyebrow: 'Slide 13',
      question: 'What role do services play in this structure?',
      title: 'Services Enable Delivery',
      body:
        'Services translate software capability into something the organization can actually use. They handle the work that sits between the product and operational reality.',
      top: 'Software',
      center: 'Services',
      bottom: 'Business',
      items: [
        {
          term: 'Integration',
          note: 'Connects tools into existing systems and processes.',
        },
        {
          term: 'Customization',
          note: 'Adapts generic capability to local operational requirements.',
        },
        {
          term: 'Risk absorption',
          note: 'Takes on part of the coordination and implementation burden.',
        },
      ],
      takeaway:
        'Services are a core delivery layer.',
    },

    'exec-summary': {
      eyebrow: 'Slide 15',
      question: 'If solutions are hybrid and service-mediated, how are decisions made?',
      title: 'Delivery Complexity Shapes Decision-Making',
      body:
        'Once solutions involve multiple layers and actors, adoption can no longer be read as a simple purchase event. It becomes a coordinated process across roles and functions.',
      items: [
        {
          term: 'Hybrid',
          note: 'Solutions are composed of multiple delivery layers.',
        },
        {
          term: 'Coordination',
          note: 'Multiple actors must align around fit and implementation.',
        },
        {
          term: 'Decision',
          note: 'Adoption becomes a structured decision sequence.',
        },
      ],
    },

    'decision-distributed': {
      eyebrow: 'Buying Structure · German Enterprise',
      question: 'Why does an adoption decision require so much coordination?',
      title: 'No single person controls the decision — <strong>four roles each hold veto power</strong>.',
      body:
        'In German enterprise, software adoption is never a one-person call. Business, IT, management, and governance each evaluate a different dimension of feasibility. A solution must satisfy all four — any one can block.',
      core: 'Decision',
      items: [
        {
          term: 'Business',
          note: 'Owns the problem. Defines the workflow need and sponsors the initiative internally.',
        },
        {
          term: 'IT',
          note: 'Controls the architecture. Evaluates compatibility, integration cost, and security requirements.',
        },
        {
          term: 'Management',
          note: 'Controls the budget. Weighs total cost, risk tolerance, and strategic alignment.',
        },
        {
          term: 'Governance',
          note: 'Controls compliance. Adds GDPR, data residency, and procurement review where required.',
        },
      ],
      takeaway:
        'The German market does not have slow buyers. It has distributed veto structures — and every one must be satisfied.',
    },

    'decision-flow': {
      eyebrow: 'Buying Process · German Enterprise',
      question: 'How does an adoption decision actually unfold over time?',
      title: 'The buying decision moves through five checkpoints — <strong>each with independent veto power</strong>.',
      body:
        'What looks from the outside like a slow sales cycle is an internal validation sequence. Each stage has a different evaluation lens. Any one can block the process — <strong>none can be skipped</strong>.',
      nodes: [
        {
          term: 'Business\nSponsor',
          note: 'Identifies the process pain, scopes the initiative, and builds the internal mandate. Without this stage, no formal evaluation begins.',
        },
        {
          term: 'IT /\nArchitecture',
          note: 'Reviews system compatibility, integration cost, data flows, and security requirements. <strong>Most common early veto point.</strong>',
        },
        {
          term: 'Management\nSign-off',
          note: 'Weighs total cost of ownership, ROI expectation, implementation risk, and strategic fit. Releases the budget.',
        },
        {
          term: 'Procurement\n& Legal',
          note: 'Validates contract terms, GDPR compliance, data residency, and vendor qualification. Adds weeks to months.',
        },
        {
          term: 'Pilot\nValidation',
          note: 'Proves the solution in real operational conditions. Required before full rollout approval in most mid-to-large enterprise deals.',
        },
      ],
      takeaway:
        'Selling in Germany means winning five separate validation processes. Each can block. None can be skipped.',
    },

    'procurement-focus': {
      eyebrow: 'Slide 18',
      question: 'How are solutions actually procured in German B2B environments?',
      title: 'Procurement Focuses on Solutions, Not Just Software',
      body:
        'Procurement is not only about purchasing licenses. Organizations often evaluate a combined offer that includes software capability, implementation services, integration work, and ongoing support.',
      layers: [
        {
          id: 'software',
          label: 'Component 01',
          term: 'Software',
          note: 'Provides the core capability.',
        },
        {
          id: 'service',
          label: 'Component 02',
          term: 'Service',
          note: 'Turns capability into a usable project.',
        },
        {
          id: 'integration',
          label: 'Component 03',
          term: 'Integration',
          note: 'Connects the solution into the existing system.',
        },
        {
          id: 'support',
          label: 'Component 04',
          term: 'Support',
          note: 'Sustains operation after deployment.',
        },
      ],
      formula: 'Software + Service + Integration + Support',
      takeaway:
        'What is purchased is a solution, not a tool.',
    },

    'pilot-path': {
      eyebrow: 'Slide 19',
      question: 'How do new solutions enter an organization?',
      title: 'Adoption Typically Starts with a Pilot',
      body:
        'New solutions are rarely deployed at full scale immediately. They are usually introduced through limited pilots so technical compatibility, operational fit, and organizational acceptance can be tested first.',
      items: [
        {
          term: 'Pilot',
          note: 'Entry starts in a controlled scope.',
        },
        {
          term: 'Validation',
          note: 'Fit is tested across system, workflow, and organization.',
          highlight: true,
        },
        {
          term: 'Rollout',
          note: 'Scaling follows only after proof is established.',
        },
      ],
    },

    'risk-filters': {
      eyebrow: 'Slide 20',
      question: 'What determines whether a solution moves forward?',
      title: 'Solutions Must Pass Multiple Risk Filters',
      body:
        'A solution advances only if several filters can be passed at the same time. The issue is not just whether the product works, but whether it remains acceptable once operational and organizational risks are considered.',
      items: [
        {
          term: 'Integration',
          note: 'Complexity must remain manageable.',
        },
        {
          term: 'Compliance',
          note: 'Data handling and governance must stay within bounds.',
        },
        {
          term: 'Risk',
          note: 'Operational disruption must be controlled.',
        },
        {
          term: 'Maintainability',
          note: 'Long-term operability must be credible.',
        },
      ],
    },

    'survivability-check': {
      eyebrow: 'Slide 21',
      question: 'Why does this process often feel slow?',
      title: 'The System Validates Survivability, Not Just Functionality',
      body:
        'The central question is not only whether a solution works in isolation. It is whether it can survive reliably inside the organization across systems, roles, and constraints.',
      topLabel: 'What is tested first',
      topTerm: 'Functionality',
      divider: 'vs',
      bottomLabel: 'What the system ultimately needs',
      bottomTerm: 'Survivability',
    },

    'value-transition': {
      eyebrow: 'Slide 22',
      question: 'What happens after decisions are made this way?',
      title: 'Decision Complexity Shapes Value Distribution',
      body:
        'When delivery and adoption require multi-role coordination, value shifts toward those who can manage complexity rather than those who only provide isolated functionality.',
      items: [
        {
          term: 'Decision',
        },
        {
          term: 'Complexity',
        },
        {
          term: 'Value',
        },
      ],
    },

    'why-different': {
      eyebrow: 'Why Germany looks different',
      title: 'The difference is not ambition. It is constraint.',
      body:
        '<strong>Germany does not lack seriousness or demand.</strong><br>It is simply optimized for a different decision logic: stability over speed, continuity over replacement, and control over experimentation.',
      cards: [
        {
          label: 'Constraint 01',
          title: 'Decisions prioritize stability over speed.',
          body: 'Enterprise buyers optimize for controllability and risk reduction first. New solutions are judged by whether they create failure risk before they are judged by how much they improve performance.',
        },
        {
          label: 'Constraint 02',
          title: 'Legacy systems like SAP dominate core processes.',
          body: 'Core architecture is often deeply coupled and already customized. That makes replacement rare and pushes new tools toward integration rather than substitution.',
        },
        {
          label: 'Constraint 03',
          title: 'Regulation limits data usage and system behavior.',
          body: 'GDPR and governance structures narrow what tools can do in practice, especially where employee data, monitoring, or data export are involved.',
        },
        {
          label: 'Constraint 04',
          title: 'Internal IT capacity is limited.',
          body: 'Many firms do not have large transformation teams in-house. That makes compatibility, implementability, and service support central to adoption.',
        },
      ],
      takeaway:
        'Decisions in this market are optimized for stability, not speed.',
      note: `Sources: ${SOURCES.kfwDigital} · ${SOURCES.destatisAI} · ${SOURCES.destatisICT}. This slide states the operating constraints that recur across the research, not a claim that all firms behave identically.`,
    },

    'constraints-system': {
      eyebrow: 'System logic',
      title: 'Constraints directly define market behavior',
      body:
        'The key point is not just that constraints exist. It is that they chain together into the system logic of the market.',
      insights: [
        {
          num: '01',
          label: 'Constraint to architecture',
          title: 'Constraints lead to integration-heavy architectures.',
          body: `<ul class="is-points">
            <li><strong>Why:</strong> replacement is risky, expensive, and often organizationally disruptive</li>
            <li><strong>Result:</strong> new tools must connect into the existing stack rather than displace it</li>
          </ul>`,
        },
        {
          num: '02',
          label: 'Architecture to delivery',
          title: 'Integration drives reliance on services.',
          body: `<ul class="is-points">
            <li><strong>Why:</strong> implementation, process redesign, and compatibility work sit outside the product itself</li>
            <li><strong>Result:</strong> external experts absorb delivery risk and become central to execution</li>
          </ul>`,
        },
        {
          num: '03',
          label: 'Delivery to adoption',
          title: 'Service reliance slows adoption.',
          body: `<ul class="is-points">
            <li><strong>Why:</strong> multi-party validation takes time and coordination</li>
            <li><strong>Result:</strong> adoption proceeds through pilots, reviews, and staged rollout instead of pure product-led expansion</li>
          </ul>`,
        },
        {
          num: '04',
          label: 'Adoption to lock-in',
          title: 'Slow adoption increases lock-in.',
          body: `<ul class="is-points">
            <li><strong>Why:</strong> once systems, processes, and trust relationships are embedded, switching cost rises sharply</li>
            <li><strong>Result:</strong> the market becomes slower to enter but deeper once won</li>
          </ul>`,
        },
      ],
      takeaway:
        'This is not a side effect of the market. It is the system.',
      note: 'This slide is a structural synthesis across the rest of the chapter rather than a single-source statistical claim.',
    },

    'demand-strong': {
      eyebrow: 'Demand strength',
      title: 'Germany does not lack demand. It lacks efficient delivery.',
      body:
        '<strong>Demand is already mature.</strong><br>The real friction is not whether firms need solutions, but whether those solutions can be delivered cleanly under local constraints.',
      cards: [
        {
          label: 'Demand 01',
          title: 'External interfaces already attract spending.',
          body: 'Companies invest in websites, ordering flows, customer touchpoints, and supplier integration because these projects are visible, repeated, and attached to clear business ownership.',
        },
        {
          label: 'Demand 02',
          title: 'Internal workflows still rely on manual coordination and Excel.',
          body: 'A large share of process work remains semi-digital. That creates persistent demand for workflow redesign, standardization, and automation.',
        },
        {
          label: 'Demand 03',
          title: 'Compliance and operational stability are major spend drivers.',
          body: 'Security, auditability, resilience, and error reduction repeatedly drive digital budgets, especially in mid-sized firms operating under real regulatory pressure.',
        },
        {
          label: 'Demand 04',
          title: 'AI is used mainly for internal optimization rather than new products.',
          body: 'Current AI adoption skews toward reporting, documentation, analytics, and operational enablement rather than AI-native greenfield products.',
        },
      ],
      takeaway:
        'The market is mature in demand, but constrained in execution.',
      note: `Sources: ${SOURCES.kfwDigital} · ${SOURCES.destatisICT} · ${SOURCES.destatisAI} · ${SOURCES.ifoAI}.`,
    },

    'hybrid-solutions': {
      eyebrow: 'How demand is served',
      title: 'Solutions are hybrid, not SaaS-native',
      body:
        '<strong>Software rarely arrives as a standalone answer.</strong><br>In practice, enterprise problems are solved through layered delivery: baseline software capability, internal adaptation, external implementation, and manual work still running underneath.',
      layers: [
        {
          id: 'hybrid-software',
          label: 'Software capability',
          share: 'Provides standardized capability',
          rate: 'Cloud is broad, workflow depth is narrower',
          bar: 54,
          desc: 'Software supplies reusable functionality such as HR, CRM, analytics, and workflow tooling, but rarely solves the full enterprise problem by itself.',
        },
        {
          id: 'hybrid-it',
          label: 'Internal IT adaptation',
          share: 'Connects and governs systems',
          rate: 'Compatibility and security shape what can land',
          bar: 71,
          dominant: true,
          desc: 'Internal IT teams control architecture, permissions, and system acceptance. They determine how new capability can be connected into existing operations.',
        },
        {
          id: 'hybrid-services',
          label: 'External implementation',
          share: 'Handles rollout and risk',
          rate: 'Professional partners absorb delivery uncertainty',
          bar: 80,
          desc: 'External service providers handle integration, implementation, process design, and change support. They turn software into an operationally acceptable solution.',
        },
        {
          id: 'hybrid-manual',
          label: 'Manual baseline',
          share: 'Still part of everyday work',
          rate: 'Hybrid IT and manual handoffs remain common',
          bar: 51,
          desc: 'Manual coordination, spreadsheets, and semi-digital work remain embedded in daily operations, especially where end-to-end system standardization is incomplete.',
        },
      ],
      takeaway:
        'Software is rarely the solution by itself. It is one part of a broader solution.',
      note: `Sources: ${SOURCES.destatisICT} · ${SOURCES.destatisAI} · ${SOURCES.kfwDigital}.`,
    },

    'adoption-validation': {
      eyebrow: 'Adoption path',
      title: 'Adoption is not slow. It is multi-layer validated.',
      body:
        'What appears externally as slowness is usually a validation sequence: the organization checks whether a solution is operationally needed, technically acceptable, financially justified, and politically safe.',
      insights: [
        {
          num: '01',
          label: 'Operations',
          title: 'Business defines needs from real operating pain.',
          body: `<ul class="is-points">
            <li><strong>Starting point:</strong> a concrete process problem, not abstract software curiosity</li>
            <li><strong>Signal:</strong> demand begins with operational need rather than product experimentation</li>
          </ul>`,
        },
        {
          num: '02',
          label: 'IT review',
          title: 'IT evaluates compatibility and security.',
          body: `<ul class="is-points">
            <li><strong>Check:</strong> system fit, data boundaries, architecture, and implementation burden</li>
            <li><strong>Meaning:</strong> technical acceptability is a gate, not a post-purchase detail</li>
          </ul>`,
        },
        {
          num: '03',
          label: 'Management and governance',
          title: 'Approval is based on risk, budget, and organizational fit.',
          body: `<ul class="is-points">
            <li><strong>Decision makers:</strong> management, budget owners, and in some cases employee representation</li>
            <li><strong>Meaning:</strong> adoption must be acceptable across the organization, not only desirable to one team</li>
          </ul>`,
        },
        {
          num: '04',
          label: 'Pilot to rollout',
          title: 'Validation happens before scaling.',
          body: `<ul class="is-points">
            <li><strong>Pattern:</strong> pilot first, controlled rollout second, wider scaling only after proof</li>
            <li><strong>Meaning:</strong> what matters is not feature novelty, but organizational acceptability</li>
          </ul>`,
        },
      ],
      takeaway:
        'What matters in Germany is not just functionality. It is whether the organization can safely accept the solution.',
      note: `Sources: ${SOURCES.kfwDigital} · ${SOURCES.destatisAI}.`,
    },

    'value-goes': {
      eyebrow: 'Value distribution',
      title: 'Services capture value because they reduce risk',
      body:
        '<strong>Value flows toward the layer that manages uncertainty.</strong><br>Implementation and integration absorb the largest share of spend, software grows fastest but often remains a component, and internal IT controls whether either one can actually enter the system.',
      splits: [
        {
          label: 'Implementation and integration',
          share: '50-60%',
          sub: 'Largest visible budget destination',
          note: 'Services absorb project complexity, implementation work, and rollout risk.',
          dominant: true,
        },
        {
          label: 'Software / SaaS',
          share: '30-40%',
          sub: 'Fastest-growing capability layer',
          note: 'Software expands quickly, but is still frequently sold and delivered as one component inside a broader service-led project.',
          growth: '+10-12%',
        },
      ],
      control: {
        label: 'Internal IT',
        title: 'Controls access, architecture, and decision boundaries.',
        body: 'Internal IT may not appear as visible market revenue, but it decides system entry, data permissions, technical acceptance, and therefore where external budget can actually flow.',
      },
      takeaway:
        'Value flows to where uncertainty is managed.',
      note: `Sources: ${SOURCES.bitkom} · ${SOURCES.statistaIT} · ${SOURCES.luenendonkIT}.`,
    },

    'market-structure': {
      eyebrow: 'Slide 10',
      question: 'If demand is strong, why doesn’t the market look product-driven?',
      title: 'Demand Does Not Translate into Pure SaaS',
      body:
        'Despite strong demand, solutions are rarely delivered as standalone products. In this market, demand is usually embedded within broader delivery structures rather than resolved through pure software substitution.',
      left: 'Demand',
      symbol: '≠',
      right: 'SaaS',
      takeaway:
        'The gap lies in how demand is served.',
    },

    'where-gaps': {
      eyebrow: 'Where the gaps are',
      title: 'Opportunities come from mismatch, not innovation',
      body:
        '<strong>The biggest gaps do not come from missing tools.</strong><br>They come from repeated mismatch between what enterprises need and how those needs are currently delivered.',
      cards: [
        {
          label: 'Mismatch 01',
          title: 'Services are repetitive, but not reusable.',
          body: 'Firms repeatedly pay for similar implementation work. That creates opportunity where repeatable service logic can be converted into reusable product capability.',
        },
        {
          label: 'Mismatch 02',
          title: 'Integration is complex and costly.',
          body: 'Many promising tools fail not because the feature is weak, but because connecting them into the existing system is too difficult and too expensive.',
        },
        {
          label: 'Mismatch 03',
          title: 'User experience limits actual adoption.',
          body: 'In many environments the tool exists, but people still fall back to manual work because the software is too difficult, too rigid, or too poorly fitted to daily practice.',
        },
        {
          label: 'Mismatch 04',
          title: 'AI is not yet embedded into workflows.',
          body: 'AI capability is growing, but operational embedding remains weak. The gap is less about model access and more about making AI usable inside everyday workflow.',
        },
      ],
      takeaway:
        'The problem is not missing tools. It is inefficient delivery.',
      note: 'This slide synthesizes the opportunity layer from the earlier structural analysis.',
    },

    'talent-roles': {
      eyebrow: 'Talent implications',
      title: 'The most valuable roles sit at the intersection',
      body:
        '<strong>The job structure mirrors the market structure.</strong><br>Internal IT secures control, consulting secures delivery, SaaS builds capability, and hybrid roles connect business, systems, and technology.',
      headers: ['Layer', 'Representative roles', 'Hiring pattern', 'German level', 'Salary band'],
      lanes: [
        {
          label: 'Internal IT',
          sub: 'Control and stability',
          roles: 'IT Manager, SAP Admin, Internal Product Owner, BI Analyst',
          hiring: 'Stable, slower growth',
          language: 'High',
          salary: 'EUR55k-EUR95k',
        },
        {
          label: 'Consulting / delivery',
          sub: 'Implementation and rollout',
          roles: 'SAP Consultant, Solution Architect, Implementation Manager',
          hiring: 'Large, continuous',
          language: 'Medium-high',
          salary: 'EUR65k-EUR120k',
        },
        {
          label: 'SaaS capability roles',
          sub: 'Build product capability',
          roles: 'Product Manager, Software Engineer, Data Engineer, UX Designer',
          hiring: 'Fast growth',
          language: 'Low-medium',
          salary: 'EUR68k-EUR120k+',
        },
        {
          label: 'Hybrid bridge roles',
          sub: 'Connect business, systems, and technology',
          roles: 'Solutions Engineer, Value Engineer, AI Solution Architect, Automation Consultant',
          hiring: 'Fastest growth',
          language: 'Low-high',
          salary: 'EUR70k-EUR120k',
          highlight: true,
        },
      ],
      takeaway:
        'The highest-leverage role in this market is the bridge.',
      note: `Sources: ${SOURCES.bitkom} · ${SOURCES.handpicked} · ${SOURCES.whitehall} · ${SOURCES.accelJobs}.`,
    },

    'final-insight': {
      eyebrow: 'Slide 14',
      question: 'How significant is the role of services?',
      title: 'A Large Share of Spending Goes to Services',
      body:
        'A substantial share of digitalization spending is directed toward service-heavy implementation and outsourced execution. This is where project delivery capacity is concentrated.',
      items: [
        {
          value: '50-60%',
          label: 'IT services share',
          note: 'A large portion of digitalization spending goes to implementation and IT services.',
          emphasis: true,
        },
        {
          value: '30-40%',
          label: 'Software share',
          note: 'Software captures a smaller share of value than the delivery layer around it.',
        },
        {
          value: '~80%',
          label: 'SME outsourcing',
          note: 'Specialized outsourcing is common across German SMEs.',
        },
      ],
      takeaway:
        'Value concentrates in delivery.',
      note: `Sources: ${SOURCES.luenendonkIT} · ${SOURCES.statistaIT} · ${SOURCES.kfwDigital}.`,
    },

    'demand-cover': {
      homeCover: true,
      meta: 'Research Canvas · Germany B2B Software Market',
      tag: 'Chapter 01',
      title: 'German B2B\nSoftware Market Map',
      subtitle:
        'A structural guide for outsiders entering the German market and for readers who want a complete picture of how the German B2B software market actually works.',
      body:
        'For someone with a China B2B SaaS background, the first challenge in Germany is not language or culture. It is rebuilding the market frame. This research is designed as a market map: where demand sits, how delivery works, who controls value, what constraints shape adoption, and where realistic entry paths exist for outsiders.',
      coverItems: [
        {
          label: 'For whom',
          value: 'Outsiders trying to enter the German market, and readers who want a full structural understanding of German B2B software.',
        },
        {
          label: 'What it maps',
          value: 'Demand, delivery, customer structure, constraints, value distribution, player landscape, opportunity wedges, and job systems.',
        },
        {
          label: 'Why it matters',
          value: 'Because product strategy, go-to-market, and career judgment only make sense after the market itself has been read correctly.',
        },
      ],
    },

    'demand-foreword': {
      eyebrow: 'Research logic',
      title: 'How does this research proceed?',
      intro:
        'The full research spans nine chapters, but the logic compresses into three layers. The sequence is deliberate: demand first, operating structure second, opportunity third.',
      rows: [
        {
          label: 'Chapters 1-2',
          title: 'Demand side',
          body: 'Start from the market problem, not from a product idea. First establish what enterprises are already paying to solve, and how those needs are currently being met.',
          chapters: [
            '1. Demand Landscape',
            '2. Solution Landscape',
          ],
          topics: [
            'What problems are enterprises actually trying to solve?',
            'Which demand categories are recurring and already funded?',
            'How are those needs fulfilled today?',
          ],
        },
        {
          label: 'Chapters 3-6',
          title: 'Operating structure',
          body: 'Once demand is established, move to the structure that shapes every buying and delivery decision: customers, suppliers, constraints, and value control.',
          chapters: [
            '3. Customer Segmentation',
            '4. Operating Model',
            '5. Market Constraints',
            '6. Value Distribution',
          ],
          topics: [
            'Who buys, who sells, and how does the system operate?',
            'Why is the market structured this way?',
            'Where do control and value actually sit?',
          ],
        },
        {
          label: 'Chapters 7-9',
          title: 'Opportunity and talent',
          body: 'Only after the first two layers are understood does it make sense to ask where structural gaps exist, and what opportunities or role systems emerge from them.',
          chapters: [
            '7. Supply Landscape',
            '8. Gap & Opportunity',
            '9. Job Landscape',
          ],
          topics: [
            'Where are the structural gaps and entry wedges?',
            'What kinds of opportunities are realistic for outsiders?',
            'What role landscape does this market create?',
          ],
        },
      ],
    },

    'demand-paradigm': {
      eyebrow: 'Demand Landscape',
      title: 'What are enterprises already trying to solve?',
      intro:
        'To understand the German market, the first step is to understand where demand comes from. Across KfW, Destatis, Bitkom, ifo, and Wolters Kluwer, current enterprise digital demand clusters into six recurring categories.',
      items: [
        {
          label: 'Starting point',
          title: 'Begin with demand, not with product ideas.',
          desc: 'The market should first be read through enterprise problems: what firms are already paying to solve, and which needs keep returning across industries and company sizes.',
        },
        {
          label: 'Six funded priorities',
          title: 'Interfaces, infrastructure, workflows, sales, compliance, and AI operations.',
          desc: 'These six categories form the practical baseline of German digitalization demand: customer and supplier interfaces, IT infrastructure modernization, workflow reorganization, digital sales and CRM, compliance and operational resilience, and AI-assisted internal operations.',
        },
        {
          label: 'Implication',
          title: 'Germany does not lack demand. It lacks fit-for-constraint solutions.',
          desc: 'These are existing, repeated, budget-backed needs rather than markets that still require education. The real challenge is not demand creation but satisfying demand under local structural constraints.',
        },
      ],
      takeaway:
        'The first useful map of Germany is a demand map: what enterprises already need, already budget for, and already expect to solve.',
    },

    'demand-question-1': {
      eyebrow: 'Demand Landscape',
      title: 'What problems are enterprises already paying to solve?',
      intro:
        'The first useful demand map is by enterprise problem, not by software category. The six buckets below show where recurring need, recurring budget, and recurring delivery work already exist.',
      categories: [
        {
          num: '01',
          label: 'Customer & supplier interfaces',
          marker: 'Most common',
          problem: 'How do firms digitise the external interface with customers and suppliers?',
          pattern: 'Cross-industry baseline demand with clear ownership and visible ROI.',
          metric: 'Repeated SME priority',
          stat: 'KfW repeatedly lists customer and supplier interfaces among high-frequency digital projects',
          src: SOURCES.kfwDigital,
          desc: 'Web presence, ordering, feedback loops, and data exchange are not frontier bets. They are recurring baseline projects with clear business ownership and clear budget logic.',
        },
        {
          num: '02',
          label: 'IT infrastructure modernisation',
          marker: 'Broadest base',
          problem: 'How do firms modernise core IT foundations and connect applications?',
          pattern: 'Already a mainstream budget category rather than a frontier adoption story.',
          metric: '54% cloud use',
          stat: '54% of enterprises report cloud-computing services in the Destatis topic overview',
          src: SOURCES.destatisICT,
          desc: 'Cloud infrastructure is already mainstream. The question is no longer whether firms adopt cloud at all, but what kinds of operational workload they trust it to carry.',
        },
        {
          num: '03',
          label: 'Workflow reorganisation',
          marker: 'Highest complexity',
          problem: 'How do firms replace Excel, email, and manual handoffs with standardised flow?',
          pattern: 'Harder to buy and implement because it requires process redesign, not just tooling.',
          metric: 'Higher organisational load',
          stat: 'KfW treats workflow reorganisation as a distinct and more demanding digitalisation category',
          src: SOURCES.kfwDigital,
          desc: 'Replacing Excel, email, and manual handoffs requires organisational redesign, not just a new software subscription. That makes the buying process slower but the value stronger when it lands.',
        },
        {
          num: '04',
          label: 'Sales, marketing, and CRM',
          marker: 'Usually bundled',
          problem: 'How do firms digitise acquisition, sales process, and account management?',
          pattern: 'Demand is real, but delivery is often bundled into larger website, commerce, or ERP projects.',
          metric: 'Usually bundled',
          stat: 'In practice, CRM demand is often fulfilled through larger website, ecommerce, or ERP-led projects',
          src: SOURCES.kfwDigital,
          desc: 'The demand is real, but it is not always bought as a standalone SaaS motion. In Germany it is frequently embedded inside broader implementation work.',
        },
        {
          num: '05',
          label: 'Compliance and resilience',
          marker: 'Risk-led spend',
          problem: 'How do firms reduce operational risk and satisfy audit, security, and regulatory needs?',
          pattern: 'Spending is often driven by control, auditability, and error reduction rather than innovation.',
          metric: 'Control-oriented budget',
          stat: 'Security, auditability, and data protection repeatedly appear as adoption constraints and spend drivers',
          src: `${SOURCES.destatisAI} · ${SOURCES.kfwDigital}`,
          desc: 'A meaningful share of software spend is motivated by risk reduction rather than growth ambition. That changes the winning product narrative.',
        },
        {
          num: '06',
          label: 'AI-assisted internal operations',
          marker: 'Fastest momentum',
          problem: 'How do firms insert AI into existing operational workflows without rewriting the whole stack?',
          pattern: 'Growing quickly, but focused on operational support rather than AI-native greenfield products.',
          metric: '40.9% already use AI',
          stat: '40.9% of firms report AI use in business processes; 18.9% plan to begin soon',
          src: SOURCES.ifoAI,
          desc: 'AI demand is rising, but mainly inside internal workflows such as reporting, documentation, and analytics. The hot path is operational enablement, not speculative AI-first products.',
        },
      ],
      takeaway:
        'The German market does not need demand creation first. It already funds recurring operational and risk-management problems.',
    },

    'demand-question-2': {
      eyebrow: 'Solution Landscape',
      title: 'How are these needs actually fulfilled?',
      body:
        '<strong>The answer is not pure SaaS.</strong><br>Enterprise demand is usually fulfilled through a hybrid structure: baseline cloud tools, internal IT adaptation, external service partners, and manual or semi-manual workflows still operating underneath.',
      layers: [
        {
          id: 'solution-cloud',
          label: 'SaaS / Cloud',
          share: 'Baseline capability layer',
          rate: '54% paid cloud · ~23% ERP/CRM',
          bar: 54,
          desc: 'German firms clearly buy cloud and software, but the most common use cases still cluster around email, storage, and office productivity. Complex workflow software is less deeply penetrated than top-line cloud adoption suggests.',
        },
        {
          id: 'solution-it',
          label: 'Internal IT',
          share: 'Core execution constraint',
          rate: '71% knowledge gap · 44% compatibility',
          bar: 71,
          dominant: true,
          desc: 'A large share of digitalization work happens through adapting existing systems, linking departments, and redesigning workflows. Internal capability, compatibility, and organizational readiness often determine what can actually be implemented.',
        },
        {
          id: 'solution-services',
          label: 'External IT services',
          share: 'Delivery and risk-absorption layer',
          rate: '80% outsource at least one major function',
          bar: 80,
          desc: 'German SMEs widely accept relying on outside partners for specialized, compliant, and technical work. That makes IT and professional services central to how digital demand is fulfilled in practice.',
        },
        {
          id: 'solution-manual',
          label: 'Manual / hybrid workflows',
          share: 'Still the real baseline',
          rate: '51% hybrid IT · 15% fully on-premise',
          bar: 51,
          desc: 'Excel, email, manual handoffs, and partial tooling remain deeply embedded in everyday operations. In many firms, digitalization still means a hybrid operating state rather than fully standardized system deployment.',
        },
      ],
      takeaway:
        'German digital demand is fulfilled through a hybrid delivery model: software, internal IT, service partners, and manual workflows working together.',
      note: `Sources: ${SOURCES.destatisICT} · ${SOURCES.destatisAI} · ${SOURCES.kfwDigital} · ${SOURCES.ifoAI}. This page summarizes the dominant operating pattern rather than claiming every sector digitizes in the same way.`,
    },

    'demand-summary': {
      eyebrow: 'Chapter summary',
      title: 'Demand is real. The friction is elsewhere.',
      intro:
        'Chapter 1 establishes the baseline: German firms already fund repeated digitalisation needs, but the depth of operational software adoption is uneven.',
      items: [
        {
          label: 'Demand',
          title: 'The market is solving existing problems, not inventing new categories.',
          desc: 'Customer interfaces, workflow redesign, compliance, and internal AI support all map to already-funded enterprise work.',
        },
        {
          label: 'Adoption',
          title: 'Infrastructure adoption is broader than workflow adoption.',
          desc: 'Cloud is mainstream, but business-critical operational systems still move more slowly because integration and risk are harder.',
        },
        {
          label: 'Implication',
          title: 'A promising product thesis must fit an existing budget line.',
          desc: 'The first question is not “Is the problem interesting?” but “Which existing spend bucket does it attach to?”',
        },
      ],
      takeaway:
        'If a product cannot anchor itself to an existing operational or risk budget, it will struggle to enter this market cleanly.',
    },

    'delivery-intro': {
      eyebrow: 'Customer Segmentation',
      title: 'Who buys, and how do they decide?',
      body:
        '<strong>German B2B buyers are segmented less by industry</strong> and more by <strong>company size + decision complexity</strong>.<br>This is what changes the sales cycle, the acceptable product form, and the balance between software and services.',
      cards: [
        {
          label: 'Kleinunternehmen · fastest decision, lowest value',
          title: 'Small enterprises buy quickly, but budgets are limited.',
          body: `<ul class="pc-points">
            <li><strong>Decision owner:</strong> founder or operating lead</li>
            <li><strong>Winning logic:</strong> simple, immediate, low-friction utility</li>
            <li><strong>Market meaning:</strong> good for plug-and-play tools, but usually too small to define the market</li>
          </ul>`,
        },
        {
          label: 'Mittelstand · main battleground',
          title: 'Mid-sized firms are the real target market.',
          body: `<ul class="pc-points">
            <li><strong>Why it matters:</strong> ~3.5M SMEs, over 99% of enterprises, about 68% of exports</li>
            <li><strong>Decision process:</strong> business + IT + management, often with pilot validation</li>
            <li><strong>Market meaning:</strong> this layer naturally favors integration and service-backed delivery, not pure SaaS alone</li>
          </ul>`,
        },
        {
          label: 'Konzern · highest barrier',
          title: 'Large enterprises are hard to enter directly.',
          body: `<ul class="pc-points">
            <li><strong>Decision process:</strong> procurement, security, architecture, and legal all sit in the loop</li>
            <li><strong>Winning logic:</strong> credentials, stability, and long-term vendor reliability</li>
            <li><strong>Market meaning:</strong> usually a later-stage destination, not the first entry wedge</li>
          </ul>`,
        },
      ],
      note: `Sources: ${SOURCES.destatisSME} · ${SOURCES.kfwDigital}. “Mittelstand” here is used as a market shorthand rather than a formal official statistical category.`,
    },

    'delivery-question-1': {
      eyebrow: 'Operating Model',
      title: 'If this is the customer structure, how does the market actually operate?',
      body:
        'Once the buyer is understood, the next question is operational: <strong>how does delivery happen, how does entry happen, and why does the market end up service-led?</strong>',
      cards: [
        {
          label: '01 · Hybrid delivery model',
          title: 'The market runs through a three-layer delivery system.',
          body: `<ul class="pc-points">
            <li><strong>SaaS / software:</strong> provides standardized capability such as CRM, HR, or workflow tools</li>
            <li><strong>IT services:</strong> translate capability into implementation, integration, and operational delivery</li>
            <li><strong>Internal IT:</strong> controls access, security, architecture, and system boundaries</li>
          </ul>`,
        },
        {
          label: '02 · Gradual entry path',
          title: 'Entry is usually gradual, not direct.',
          body: `<ul class="pc-points">
            <li><strong>Step 1:</strong> a business unit raises a specific operational need</li>
            <li><strong>Step 2:</strong> a pilot validates fit, stability, and practical usefulness</li>
            <li><strong>Step 3:</strong> IT review and rollout approval determine whether adoption expands</li>
          </ul>`,
        },
        {
          label: '03 · Why services lead',
          title: 'Services lead because they absorb delivery risk.',
          body: `<ul class="pc-points">
            <li><strong>Why:</strong> enterprise systems are complex, integrated, and resource-constrained</li>
            <li><strong>What services do:</strong> system integration, process redesign, rollout, and change management</li>
            <li><strong>Market result:</strong> services often lead the project, while software is embedded as one component</li>
          </ul>`,
        },
        {
          label: '04 · Slow entry, deep expansion',
          title: 'Growth is slow at entry, but deep after adoption.',
          body: `<ul class="pc-points">
            <li><strong>Pattern:</strong> start narrow, prove value, expand to more teams and workflows</li>
            <li><strong>Why stickiness is high:</strong> switching cost is technical, organizational, and relational</li>
            <li><strong>Market meaning:</strong> slower entry than other markets, but much higher lifetime value after adoption</li>
          </ul>`,
        },
      ],
      takeaway:
        'The operating logic of this market is simple: enterprises are buying certainty of delivery, not just software features.',
      note: `Sources: ${SOURCES.kfwDigital} · ${SOURCES.destatisICT} · ${SOURCES.luenendonkIT}. This slide is a structural synthesis rather than a single-source market share chart.`,
    },

    'delivery-question-2': {
      eyebrow: 'Market Topology',
      title: 'Where is the market open, and where is it closed?',
      hint: 'Read from most closed to most open',
      tiers: [
        {
          id: 't-core',
          num: '01',
          label: 'Core systems',
          sub: 'Most closed',
          bar: 92,
          players: ['SAP'],
          detail: 'At the system core, switching costs are technical and organisational. The viable route is usually to integrate with the installed base, not to replace it outright.',
        },
        {
          id: 't-apps',
          num: '02',
          label: 'General business applications',
          sub: 'Open, but standards-heavy',
          bar: 62,
          players: ['Salesforce', 'HubSpot', 'Workday', 'Personio'],
          detail: 'This layer is open to international competition, but only once compliance, localisation, and integration expectations are met. Product quality alone is not enough.',
        },
        {
          id: 't-process',
          num: '03',
          label: 'Process and automation',
          sub: 'Best entry wedge',
          bar: 44,
          players: ['Celonis', 'Camunda', 'UiPath'],
          detail: 'This layer sits between the core system and the messy workflow. It is often the best entry zone because value is visible, process pain is recurring, and integration is necessary but still tractable.',
        },
        {
          id: 't-vertical',
          num: '04',
          label: 'Vertical software',
          sub: 'Fragmented frontier',
          bar: 18,
          players: ['Doctorly', 'ClaimsForce', 'Circula', 'Niche vendors'],
          detail: 'Vertical markets offer deep fit and meaningful differentiation, but they scale horizontally more slowly because each wedge is anchored in a specific process environment.',
        },
      ],
      takeaway:
        'The nearer a layer sits to core data and core process control, the more closed it becomes. Entry becomes easier as you move toward workflow-specific problems.',
      note: 'Representative players are illustrative reference points in the research synthesis, not audited market-share positions.',
    },

    'delivery-summary': {
      eyebrow: 'Market Constraints',
      title: 'Why won’t Germany become US-like?',
      body:
        'Not because demand is missing, but because <strong>stable structural constraints shape how software can enter and scale</strong>.',
      insights: [
        {
          num: '01',
          label: 'Risk aversion',
          title: 'Stability matters more than experimentation.',
          body: `<ul class="is-points">
            <li><strong>Evidence:</strong> firms optimize for controllability, not trial-and-error speed</li>
            <li><strong>Signal:</strong> <span class="de">Pilot</span> becomes the default gate before wider rollout</li>
            <li><strong>Consequence:</strong> a new solution must prove it will not create failure, not just that it is better</li>
          </ul>`,
        },
        {
          num: '02',
          label: 'Legacy systems',
          title: 'SAP-heavy architectures favor integration over replacement.',
          body: `<ul class="is-points">
            <li><strong>Evidence:</strong> core systems are deeply coupled and often heavily customized</li>
            <li><strong>Signal:</strong> switching cost is technical, organizational, and contractual</li>
            <li><strong>Consequence:</strong> new software usually enters by integrating into the stack, not by replacing it</li>
          </ul>`,
        },
        {
          num: '03',
          label: 'Regulation & governance',
          title: 'GDPR and <span class="de">Betriebsrat</span> narrow what can actually be adopted.',
          body: `<ul class="is-points">
            <li><strong>Evidence:</strong> employee-related systems face stronger privacy and governance scrutiny</li>
            <li><strong>Signal:</strong> monitoring-heavy or data-export-heavy features meet hard resistance</li>
            <li><strong>Consequence:</strong> data-driven and AI-heavy tools cannot scale quickly on product logic alone</li>
          </ul>`,
        },
        {
          num: '04',
          label: 'Organizational constraints',
          title: 'Small internal IT teams limit transformation capacity.',
          body: `<ul class="is-points">
            <li><strong>Evidence:</strong> many mid-sized firms run lean IT teams focused on maintenance and control</li>
            <li><strong>Signal:</strong> complex projects quickly exceed internal execution bandwidth</li>
            <li><strong>Consequence:</strong> external service providers become structurally necessary in delivery</li>
          </ul>`,
        },
      ],
      takeaway:
        'Taken together, these constraints push the market toward gradual, service-led, integration-first adoption.',
      implicationLabel: 'Implication',
      implication:
        'In Germany, the winning offer is not “a better product.” It is a solution the organization can accept under constraint.',
      note: `Sources: ${SOURCES.kfwDigital} · ${SOURCES.destatisICT} · ${SOURCES.destatisAI}. This slide is a structural synthesis, not a claim that every sector behaves identically.`,
    },

    'delivery-question-3': {
      eyebrow: 'Value Distribution',
      title: 'Where does the money go, and who controls value?',
      body:
        '<strong>Budget distribution and control distribution are not the same thing.</strong><br>Most visible spend flows to services, software grows fastest, and internal IT decides whether either one can actually land inside the system.',
      splits: [
        {
          label: 'IT services',
          share: '50-60%',
          sub: 'Largest budget destination',
          note: 'Implementation, integration, and outsourcing absorb the biggest share of enterprise spend.',
          dominant: true,
        },
        {
          label: 'Software / SaaS',
          share: '30-40%',
          sub: 'Fastest growth',
          note: 'Software captures a smaller value share today, but grows materially faster than the service layer.',
          growth: '+10-12%',
        },
      ],
      control: {
        label: 'Internal IT',
        title: 'Does not look like market revenue, but holds control power.',
        body: 'System access, data permissions, architecture approval, and rollout decisions all sit here. Internal IT does not maximize visible external spend, but it strongly shapes where budget can flow.',
      },
      takeaway:
        'Services capture the largest share of money, software captures the highest growth, and internal IT captures the right to decide.',
      note: `Sources: ${SOURCES.bitkom} · ${SOURCES.statistaIT} · ${SOURCES.luenendonkIT}. Share bands are research synthesis ranges, not audited national accounts buckets.`,
    },

    'entry-intro': {
      tag: 'Chapter 03',
      title: 'Given that structure, where are the players, gaps, and roles?',
      subtitle:
        'The final chapter turns market structure into practical positioning: which kinds of companies dominate supply, where the real gaps sit, and which job systems emerge from that structure.',
      chainLabel: 'Research chain',
      chain: [
        {
          num: '01',
          title: 'Map the supplier landscape',
          desc: 'Separate core incumbents, competitive SaaS layers, process tooling, and fragmented vertical software.',
        },
        {
          num: '02',
          title: 'Identify structural gaps',
          desc: 'Find where demand is real but current solutions remain too manual, too service-heavy, or too hard to adopt.',
        },
        {
          num: '03',
          title: 'Translate gaps into job systems',
          desc: 'Show which layers hire, which skills get rewarded, and where outsiders have the most realistic entry path.',
        },
      ],
      note: 'Research synthesis grounded in Chapters 1–2 and the market maps that follow.',
    },

    'entry-question-1': {
      eyebrow: 'Supply Landscape',
      title: 'What kinds of players exist in this market?',
      body:
        '<strong>The supply side is not one flat market.</strong><br>It is a layered structure: concentrated at the core, competitive in standard SaaS, strongest in process tooling, and fragmented in vertical software.',
      zones: [
        {
          id: 's-core',
          label: 'Core systems',
          position: 'Highest concentration',
          players: ['SAP'],
          detail: 'This layer controls the most critical enterprise data and workflow backbone. Direct competition is rarely realistic; integration and extension are the viable routes.',
        },
        {
          id: 's-apps',
          label: 'General business applications',
          position: 'Competitive, but head-led',
          players: ['Personio', 'Leapsome', 'Salesforce', 'HubSpot'],
          detail: 'This is the most mature SaaS layer. Competition is real, but leaders are already clear and differentiation depends on fit, UX, and integration quality.',
        },
        {
          id: 's-process',
          label: 'Process & automation',
          position: 'Fastest-growth wedge',
          players: ['Celonis', 'Camunda'],
          detail: 'This layer connects core systems to live business work. It is one of the fastest-growing zones because value is visible, but delivery still depends heavily on integration and service support.',
          wedge: true,
        },
        {
          id: 's-arch',
          label: 'Architecture & IT management',
          position: 'Control-adjacent niche',
          players: ['LeanIX'],
          detail: 'This is a smaller but strategically important layer because it sits close to architecture governance and long-term system planning.',
        },
        {
          id: 's-vertical',
          label: 'Vertical software',
          position: 'Fragmented long tail',
          players: ['Doctorly', 'ClaimsForce', 'Circula'],
          detail: 'Vertical tools are highly specialized and often deeply embedded in one domain workflow. They offer strong fit, but scale more slowly across categories.',
        },
      ],
      takeaway:
        'The closer a supplier sits to core systems, the harder it is to enter. The closer it sits to process pain or vertical workflows, the more room there is for differentiated entrants.',
      note: `Sources: ${SOURCES.startupsMag} · ${SOURCES.luenendonkIT}. Representative companies are structural anchors, not a complete market map.`,
    },

    'entry-question-2': {
      eyebrow: 'Gap & Opportunity',
      title: 'Where are the real gaps, and what do they mean for outsiders?',
      body:
        '<strong>Opportunity comes from structural mismatch, not new demand.</strong><br>The strongest gaps appear where current delivery remains too manual, too service-heavy, or too hard to use, even though the need itself is already real and budgeted.',
      opportunities: [
        {
          rank: '01',
          label: 'AI workflow embedding',
          fit: 'Outsider fit: high',
          title: 'Strongest current wedge',
          body: 'AI capability is global, but embedding it into real workflows remains weak. This is one of the clearest gaps where outsider product experience can translate into local value.',
          route: 'Best path: join a trusted SaaS company and work on AI product or workflow automation roles.',
          priority: 'high',
        },
        {
          rank: '02',
          label: 'UX / product modernization',
          fit: 'Outsider fit: high',
          title: 'Underserved but highly practical gap',
          body: 'Many tools exist, but remain difficult to use. Strong product and UX experience is a real differentiator in a market where functionality often outruns usability.',
          route: 'Best path: improve product experience inside international SaaS teams already trusted by the market.',
          priority: 'high',
        },
        {
          rank: '03',
          label: 'Service productization',
          fit: 'Outsider fit: medium',
          title: 'Real demand, but ecosystem-dependent',
          body: 'Firms repeatedly pay for similar implementation work. The opportunity is to standardize repeatable service work into reusable software capability.',
          route: 'Best path: build from inside a company that already has local delivery trust.',
          priority: 'medium',
        },
        {
          rank: '04',
          label: 'System integration',
          fit: 'Outsider fit: low',
          title: 'Important, but high barrier',
          body: 'Integration pain is real, but this layer depends on deep SAP and local ecosystem knowledge. It is rarely a clean first wedge for outsiders.',
          route: 'Best path: enter only after building local project and delivery experience.',
          priority: 'low',
        },
        {
          rank: '05',
          label: 'Compliance-driven products',
          fit: 'Outsider fit: very low',
          title: 'Strategically valuable, but hardest to enter',
          body: 'Compliance-driven software has clear structural value, but the domain is so tied to local law and governance that it is difficult for outsiders to attack directly.',
          route: 'Best path: collaborate with local legal / compliance specialists instead of leading with this wedge.',
          priority: 'low',
        },
      ],
      takeaway:
        'The best outsider opportunities sit where capability is globally transferable but trust can be borrowed from an already accepted local platform.',
      note: 'Friendliness rankings are strategic interpretation based on the full chapter, not a universal job-market rule.',
    },

    'entry-question-3': {
      eyebrow: 'Job Landscape',
      title: 'What job systems does this market create?',
      body:
        '<strong>The job structure mirrors the market structure.</strong><br>Germany does not reward only coding depth. It strongly rewards roles that can make systems run, processes land, and organizations accept change.',
      headers: ['Market layer', 'Representative roles', 'Hiring pattern', 'German level', 'Salary band'],
      lanes: [
        {
          label: 'Internal IT',
          sub: 'Control layer',
          roles: 'IT Manager, SAP Admin, Internal Product Owner, BI Analyst',
          hiring: 'Large and stable',
          language: 'High',
          salary: 'EUR55k-EUR95k',
        },
        {
          label: 'IT services & consulting',
          sub: 'Delivery layer',
          roles: 'SAP Consultant, Solution Architect, Implementation Manager',
          hiring: 'Largest and continuous',
          language: 'Medium-high',
          salary: 'EUR65k-EUR120k',
        },
        {
          label: 'SaaS product & engineering',
          sub: 'Capability layer',
          roles: 'Product Manager, Software Engineer, Data Engineer, UX Designer',
          hiring: 'Fast growth',
          language: 'Low-medium',
          salary: 'EUR68k-EUR120k+',
        },
        {
          label: 'Solutions & automation',
          sub: 'Cross-layer wedge',
          roles: 'Solutions Engineer, Value Engineer, AI Solution Architect, RPA Consultant',
          hiring: 'Fastest growth',
          language: 'Low-high',
          salary: 'EUR70k-EUR120k',
          highlight: true,
        },
      ],
      takeaway:
        'The most valuable roles sit where business understanding, technical execution, and workflow delivery intersect.',
      note: `Sources: ${SOURCES.bitkom} · ${SOURCES.whitehall} · ${SOURCES.handpicked} · ${SOURCES.accelJobs}. Salary bands are directional ranges from the research text, not a unified salary survey.`,
    },


    'entry-summary': {
      eyebrow: 'Chapter summary',
      title: 'Opportunity lies at the seam, not at the centre.',
      intro:
        'Chapter 3 converts the research into action logic for product and GTM teams. The realistic path is rarely to fight incumbents on their strongest ground.',
      items: [
        {
          label: 'Proof',
          title: 'System fit and risk clarity travel before differentiation.',
          desc: 'A sharper UX or cleaner category story matters only after the product clears compatibility and governance scrutiny.',
        },
        {
          label: 'Wedge',
          title: 'The best entry zone is usually workflow-adjacent.',
          desc: 'This is where pain is concrete, software can standardise real work, and the core system can stay in place.',
        },
        {
          label: 'Route',
          title: 'Go-to-market has to respect trust structures.',
          desc: 'Partner-led, reference-led, and risk-aware motions fit the market better than a generic “move fast” software narrative.',
        },
      ],
      takeaway:
        'The German B2B opportunity is not “sell software faster.” It is “solve a repeatable operational problem in a way the system, the buyer, and the delivery layer can all accept.”',
    },

    'final-summary': {
      eyebrow: 'Summary',
      synopsis: 'After three chapters of analysis, this market resolves to one sentence: the German B2B software market is <strong>real in scale and persistent in demand</strong> — but its entry barriers are <strong>structural and will not ease on their own</strong>.',
      findingsLabel: 'What this research found',
      findings: [
        {
          tag: 'Part 1',
          tagColor: 'blue',
          heading: 'Market behavior is structurally determined, not culturally accidental.',
          body: 'Manufacturing at ~20% of GDP, 1,573 hidden champions, and production lines that cannot stop — this industrial foundation produces predictable market behavior: <strong>integration over replacement</strong>, <strong>compliance-first validation</strong>, <strong>extended decision cycles</strong>, and <strong>service-heavy delivery</strong>. This is the <strong>operating system of the market</strong>. It will not change as digitalization matures.',
        },
        {
          tag: 'Part 2',
          tagColor: 'amber',
          heading: 'Demand is real and layered — but supply access is gatekept.',
          body: 'Six demand categories map onto three customer tiers, with the <strong>highest density in mid-size <span class=”de”>Mittelstand</span></strong>. The supply side is a four-player ecosystem where competition is about <strong>niche and trust</strong>, not features. Three hard procurement gates apply universally: <strong><span class=”de”>Betriebsrat</span> veto rights</strong>, <strong>data localization requirements</strong>, and <strong>local reference customers</strong>.',
        },
        {
          tag: 'Part 3',
          tagColor: 'green',
          heading: 'Opportunity is unevenly distributed across the five segments.',
          body: 'Enterprise core systems are locked by the <strong>SAP ecosystem</strong> — startup room is minimal. Compliance entry is gated by <strong>regulatory certification</strong>, not technical capability. <strong>Process automation</strong>, <strong>vertical software</strong>, and the <strong>AI application layer</strong> are the three viable entry directions — each with a different entry logic, timing window, and resource requirement.',
        },
      ],
      implicationsLabel: 'What this means for you',
      audiences: [
        {
          tag: 'For founders',
          body: 'Do not challenge the SAP ecosystem head-on — it is an unbreakable moat. The real opportunity lies in the <strong>process automation gap</strong> in <span class=”de”>Mittelstand</span>, and in <strong>vertical digitalization</strong> driven by Industry 4.0. Enter through a <strong>defensible vertical niche</strong>, not a general-purpose product.',
        },
        {
          tag: 'For job seekers',
          body: '<strong>Solutions Engineer</strong> and <strong>Implementation Consultant</strong> roles in process automation and AI are the most undersupplied positions today. <strong>German B2 + enterprise software background + SAP/Celonis ecosystem knowledge</strong> is the highest-value combination currently on offer.',
        },
        {
          tag: 'For researchers',
          body: 'This research covers <strong>80% of the framework</strong>. The remaining 20% — customer procurement psychology, industry-level decision structures, local ecosystem norms — can only come from <strong>primary interviews</strong> and <strong>direct operating experience</strong>.',
        },
      ],
    },
  },

  /* ─── DE ─────────────────────────────────────────────────────── */
  de: {
    'deck-cover': {
      meta: 'Strategic Research · German B2B Digitalization',
      title: 'Reading the German B2B Digitalization Market',
      subtitle: 'A structural research deck on why demand, delivery, and opportunity in Germany follow a distinct logic.',
      body: 'This deck approaches the market as a system. Rather than treating observed patterns as isolated facts, it traces how structural conditions shape delivery, decision-making, and market outcomes.',
    },
  },

  /* ─── ZH ─────────────────────────────────────────────────────── */
  zh: {
    'deck-cover': {
      meta: 'Strategic Research · German B2B Digitalization',
      title: 'Reading the German B2B Digitalization Market',
      subtitle: 'A structural research deck on why demand, delivery, and opportunity in Germany follow a distinct logic.',
      body: 'This deck approaches the market as a system. Rather than treating observed patterns as isolated facts, it traces how structural conditions shape delivery, decision-making, and market outcomes.',
    },
  },
};
