// Shared data + components for all pages
const projects = [
  { slug:"emc-dashboard", name:"EMC Dashboard", tag:"SAP · Power BI",
    desc:"End-to-end pipeline from SAP through ABAP/OData to Power BI for ops monitoring.",
    problem:"Operations needed near-real-time visibility into SAP transactional data, but reports took days to assemble manually and lacked validated, reusable models.",
    approach:["Modeled source data via custom CDS views in the SD/MM modules.","Exposed cleaned datasets through OData endpoints to a SQL Server staging layer.","Built a star-schema semantic model in Power BI with DAX measures.","Designed a one-page operational overview with drill-through pages per dimension."],
    impact:["~30% faster reporting cycle vs. manual extracts.","Eliminated 5+ hours of weekly manual prep.","Single source of truth shared across operations & finance."],
    stack:["SAP ABAP","CDS Views","OData","SQL Server","Power BI","DAX"]
  },
  { slug:"nema-ceo-dashboards", name:"NEMA CEO Dashboards", tag:"Executive BI",
    desc:"Real-time KPI dashboards built directly for executive decision-making.",
    problem:"Leadership lacked a single, trustworthy view of company-wide KPIs and had to wait on weekly slide decks.",
    approach:["Interviewed CEO & department heads to align on the 8 KPIs that actually drive decisions.","Built a curated semantic model with row-level security per business unit.","Designed a calm, glanceable executive layout: one screen, no tabs."],
    impact:["Cut decision-cycle time on weekly reviews from days to minutes.","Replaced 3 recurring manual reports."],
    stack:["Power BI","DAX","Power Query","RLS"]
  },
  { slug:"otif-sales", name:"OTIF Sales Dashboard", tag:"ABAP · SD",
    desc:"Automated On-Time In-Full reporting native to the SAP SD module.",
    problem:"OTIF was tracked in spreadsheets pieced together from VBAK/VBAP exports — slow, error-prone, and weeks behind reality.",
    approach:["Wrote ABAP logic in the SD module to compute OTIF directly against live tables.","Built ALV output with drilldown to delivery, customer and material.","Scheduled background jobs to push results into the analytics layer."],
    impact:["Removed manual weekly OTIF preparation entirely.","Improved fulfilment tracking accuracy and timeliness."],
    stack:["SAP ABAP","SD Module","ALV","Background Jobs"]
  },
  { slug:"within-window", name:"Within Window (WIW)", tag:"Forecasting",
    desc:"Scenario-based supply-chain planning and demand-modelling tool.",
    problem:"Planners needed to test demand scenarios quickly without rebuilding spreadsheets each cycle.",
    approach:["Modelled demand drivers and lead-time windows in a parameterised dataset.","Built what-if controls so planners could shift assumptions live.","Surfaced a comparison view between baseline and scenarios."],
    impact:["Planners self-serve scenarios in minutes instead of hours.","Cleaner conversations with sales & ops on demand assumptions."],
    stack:["Power BI","DAX","What-if Parameters","Power Query"]
  },
  { slug:"finance-scorecard", name:"Finance Performance Scorecard", tag:"Power BI",
    desc:"Department-level scorecards on budgets, expenses and profitability.",
    problem:"Finance lacked drillable views from group-level P&L down to department spend without exporting to Excel.",
    approach:["Conformed the chart of accounts into an analytics-friendly model.","Built scorecard pages per department with variance-to-budget visuals.","Added drill-through pages exposing line-level detail."],
    impact:["Faster month-end review with fewer ad-hoc requests to finance.","Variance to budget visible without exporting to Excel."],
    stack:["Power BI","DAX","Star Schema"]
  },
  { slug:"sales-market-insights", name:"Sales & Market Insights", tag:"Self-serve BI",
    desc:"Regional/product dashboards with drill-through filters for self-serve exploration.",
    problem:"Sales leaders kept asking the analytics team the same regional/product cuts every week.",
    approach:["Designed a hub page with regional summary tiles linking to detail pages.","Added drill-through and bookmarks so users could save their own views.","Wrote a short playbook so sales adopts the dashboard themselves."],
    impact:["Shifted recurring questions from the analytics team to self-serve.","Higher adoption — sales leaders open the dashboard weekly."],
    stack:["Power BI","DAX","Bookmarks","Drill-through"]
  }
];

const experience = [
  { company:"Data Graders", role:"Data Analyst (SAP Analyst)", period:"Apr 2023 — Present", location:"Lahore, PK",
    points:[,"Built 10+ custom ABAP reports, ALV dashboards and CDS views: ~30% faster turnaround.","Automated OTIF sales reporting: eliminated 5 hrs/week of manual effort.","Delivered analytics for Al-Romaih Group (KSA) supply chain decisions.","Designed reusable CDS view semantic layer: cut duplicated logic ~40%.","Exposed SAP backend via OData for live business access."]},
  { company:"Zarbsol", role:"Data Analyst", period:"Mar 2022 — Mar 2023", location:"Remote · US",
    points:["Defined KPIs and shipped Power BI solutions aligned with strategy.","Built optimized star-schema semantic models with DAX: up to 25% faster.","Applied DAX optimization, query folding, incremental refresh.","Authored Power Query workflows for audit-ready outputs."]}
];

const skills = {
  "Analytics & Visualization":["Data Storytelling","Power BI","Data Quality & Governance","Tableau"," KPI Analysis","SAP Analytics Cloud (SAC)"],
  "Data Engineering & BI":["Excel","DAX", "Data Cleaning", "Data Modeling","SQL","Power Query"," KPI Design", "Star Schema"],
  "SAP":["SAP S/4 HANA","ABAP","CDS Views","BW Extractors","OData Services","SAP Planning","SD Module","MM Module"],
  "Cloud & Tools":["AWS Cloud Foundations","Git","GitHub","ETL Pipelines"]
};

const contact = {
  email:"muhammadarishasif@gmail.com",
  phone:"+92 322 7797254",
  linkedin:"https://www.linkedin.com/in/muhammad-arish/",
  github:"https://github.com/arishasif2",
  location:"EME Society, Lahore, Pakistan"
};

// ---- Header / Footer (injected) ----
function pathPrefix(){
  // returns "" if at root, "../" if inside /projects/
  return location.pathname.includes('/') ? '../' : '';
}
function buildHeader(active){
  const p = pathPrefix();
  const link = (href,label,key) => `<a href="${p}${href}" class="${active===key?'active':''}">${label}</a>`;
  return `
  <header class="nav">
    <div class="wrap nav-inner">
      <a href="${p}index.html" class="brand"><span class="brand-mark">A</span>rish<span class="dot">.</span></a>
      <nav class="nav-links">
        ${link('index.html','Home','home')}
        ${link('about.html','About','about')}
        ${link('projects.html','Projects','projects')}
        ${link('contact.html','Contact','contact')}
      </nav>
      <a href="mailto:${contact.email}" class="btn btn-primary hide-sm">Get in Touch ↗</a>
      <button class="menu-btn" id="menuBtn" aria-label="Menu">☰</button>
    </div>
    <nav class="nav-mobile" id="navMobile">
      ${link('index.html','Home','home')}
      ${link('projects.html','Projects','projects')}
      ${link('about.html','About','about')}
      ${link('contact.html','Contact','contact')}
    </nav>
  </header>`;
}
function buildFooter(){
  const p = pathPrefix();
  return `
  <footer class="footer">
    <div class="wrap foot-grid">
      <div>
        <div class="brand"><span class="brand-mark">A</span>rish<span class="dot">.</span></div>
        <p class="muted small">Data & SAP Analyst  turning <em>Data into Decisions</em>.</p>
      </div>
      <div>
        <h4 class="mono">Explore</h4>
        <ul class="foot-list">
          <li><a href="${p}index.html">Home</a></li>
          <li><a href="${p}projects.html">Projects</a></li>
          <li><a href="${p}about.html">About</a></li>
          <li><a href="${p}contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 class="mono">Contact</h4>
        <ul class="foot-list">
          <li><a href="mailto:${contact.email}">Email</a></li>
          <li><a href="${contact.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><a href="${contact.github}" target="_blank" rel="noreferrer">GitHub</a></li>
        </ul>
      </div>
    </div>
    <div class="foot-bottom wrap">
      <span>© <span id="yr"></span> Muhammad Arish Asif</span>
      <span class="mono"> Lahore → World</span>
    </div>
  </footer>`;
}

// ---- Page renderers ----
function renderHome(){
  document.getElementById('hero').innerHTML = `
    <h1 class="display">Turning raw <em>Data</em><br/>into decisions that <em>move</em> the business.</h1>
    <p class="lede">Data &amp; SAP analyst with 3+ years building reporting pipelines across ABAP, CDS Views, OData and Power BI for teams in Pakistan, the US and KSA.</p>
    <div class="cta-row">
      <a class="btn btn-primary" href="projects.html">See Selected Work ↗</a>
      <a class="btn btn-ghost" href="contact.html">Contact Me</a>
    </div>
    <div class="stats">
      <div><div class="stat-k" data-count="3" data-suffix="+">0</div><div class="stat-v">Years in Analytics</div></div>
      <div><div class="stat-k" data-count="10" data-suffix="+">0</div><div class="stat-v">Custom Reports</div></div>
      <div><div class="stat-k" data-count="35" data-suffix="%">0</div><div class="stat-v">Faster Reporting</div></div>
      <div><div class="stat-k" data-count="8">0</div><div class="stat-v">Developers Led</div></div>
    </div>`;

  document.getElementById('expGrid').innerHTML = experience.map(e=>`
    <article class="exp reveal">
      <div class="exp-head">
        <div><div class="exp-role">${e.role}</div><div class="exp-co">${e.company}</div></div>
        <div class="mono">${e.period} · ${e.location}</div>
      </div>
      <ul>${e.points.map(p=>`<li>${p}</li>`).join('')}</ul>
    </article>`).join('');

  document.getElementById('featGrid').innerHTML = projects.slice(0,3).map(p=>`
    <a href="/${p.slug}.html" class="proj reveal">
      <span class="proj-tag">${p.tag}</span>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <span class="link-cta">View case study ↗</span>
    </a>`).join('');
}

function renderProjects(){
  document.getElementById('projGrid').innerHTML = projects.map((p,i)=>`
    <a href="/${p.slug}.html" class="proj reveal">
      <div class="proj-head">
        <span class="proj-tag">${p.tag}</span>
        <span class="mono">${String(i+1).padStart(2,'0')}</span>
      </div>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <span class="link-cta">View case study ↗</span>
    </a>`).join('');
}

function renderCase(slug){
  const p = projects.find(x=>x.slug===slug);
  if(!p){ document.getElementById('case').innerHTML = '<p>Project not found. <a href="../projects.html">Back</a></p>'; return; }
  document.title = `${p.name} — Muhammad Arish`;
  const idx = projects.findIndex(x=>x.slug===slug);
  const next = projects[(idx+1)%projects.length];
  document.getElementById('case').innerHTML = `
    <a href="../projects.html" class="back-link">← All projects</a>
    <span class="proj-tag" style="margin-top:20px">${p.tag}</span>
    <h1 class="display sm">${p.name}</h1>
    <p class="lede">${p.desc}</p>
    <section class="case-block reveal">
      <div class="case-head"><span class="dot-icon">◎</span><h2 class="mono">The problem</h2></div>
      <p>${p.problem}</p>
    </section>
    <section class="case-block reveal">
      <div class="case-head"><span class="dot-icon">⚙</span><h2 class="mono">My approach</h2></div>
      <ul class="arrow-list">${p.approach.map(a=>`<li><span>→</span>${a}</li>`).join('')}</ul>
    </section>
    <section class="case-block reveal">
      <div class="case-head"><span class="dot-icon">✓</span><h2 class="mono">Impact</h2></div>
      <ul class="impact-grid">${p.impact.map(a=>`<li>${a}</li>`).join('')}</ul>
    </section>
    <section class="reveal">
      <h3 class="mono">Stack</h3>
      <div class="proj-stack">${p.stack.map(s=>`<span>${s}</span>`).join('')}</div>
    </section>
    <div class="case-foot">
      <a href="../contact.html" class="btn btn-primary">Discuss a similar project ↗</a>
      <a href="${next.slug}.html" class="muted">Next: ${next.name} ↗</a>
    </div>`;
}

function renderAbout(){
  document.getElementById('about').innerHTML = `
    <span class="eyebrow"></span>
    <h1 class="display sm">Hi, I'm Arish.</h1>
    <p class="lede"> a<em> Data Analyst/Engineer</em>, not the one presenting the charts but the one making sure they aren't lying from <em style="
  background: linear-gradient(180deg, #e8d5b7 0%, #f5e6c8 40%, #d4a96a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-style: italic;">Database to Dashboard</em>. SAP, Power BI, Tableu or whatever the stack needs. Three countries, one standard: the numbers have to be right.</p>
    <div class="about-grid">
      <div class="card">
        <h3>What I do well</h3>
        <ul class="check-list">
          <li>Translate fuzzy business questions into validated semantic models.</li>
          <li>Bridge the gap between what IT builds and what business actually needs.</li>
          <li>Write ABAP & CDS that other developers can maintain.</li>
          <li>Design dashboards executives actually use, not vanity charts.</li>
          <li>Lead analytics teams without slowing them down.</li>
        </ul>
      </div>
      <div class="card">
        <h3>Currently</h3>
        <p class="muted">Leading SAP analytics at <b>Data Graders</b>.
         </p>
        <h3 style="margin-top:24px">Status</h3>
        <p class="muted">Open to Data Analyst, BI and SAP analytics roles globally.</p>
         <h3 style="margin-top:24px">Based in</h3>
        <p class="muted">Lahore, Pakistan. Remote-friendly across timezones.</p>
      </div>
    </div>
    
    <h2 class="display sm" style="margin-top:80px">Toolkit</h2>
    <div class="skills-grid" id="skillsGrid"></div>`;
  document.getElementById('skillsGrid').innerHTML = Object.entries(skills).map(([k,v])=>`
    <div class="skill-card reveal">
      <h4>${k}</h4>
      <div class="chips">${v.map(s=>`<span>${s}</span>`).join('')}</div>
    </div>`).join('');
    
}

function renderContact(){
  document.getElementById('contact').innerHTML = `
    <span class="eyebrow"></span>
    <h1 class="display sm">Let's build something useful.</h1>
    <p class="lede">Based in Lahore but not tied to it. Open to Data Analyst, BI and SAP Analytics roles globally, remote or relocation ready.</p>
    <div class="contact-grid">
      <a href="mailto:${contact.email}" class="contact-card"><span>Email</span><b>${contact.email}</b></a>
      <a href="tel:${contact.phone.replace(/\s/g,'')}" class="contact-card"><span>Phone</span><b>${contact.phone}</b></a>
      <a href="${contact.linkedin}" target="_blank" rel="noreferrer" class="contact-card"><span>LinkedIn</span><b>linkedin.com/in/muhammad-arish</b></a>
      <a href="${contact.github}" target="_blank" rel="noreferrer" class="contact-card"><span>GitHub</span><b>github.com/arishasif2</b></a>
    </div>
    <p class="muted small" style="margin-top:32px">${contact.location}</p>`;
}

// ---- Boot ----
function boot(activeKey, pageRender){
  document.body.insertAdjacentHTML('afterbegin', buildHeader(activeKey));
  pageRender && pageRender();
  document.body.insertAdjacentHTML('beforeend', buildFooter());
  const yr = document.getElementById('yr'); if(yr) yr.textContent = new Date().getFullYear();

  // mobile menu
  const mb = document.getElementById('menuBtn'), nm = document.getElementById('navMobile');
  mb?.addEventListener('click', ()=> nm.classList.toggle('open'));

  // reveals
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.12,rootMargin:"0px 0px -8% 0px"});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // counters
  const cIO = new IntersectionObserver(es=>{
    es.forEach(en=>{
      if(!en.isIntersecting) return;
      const el=en.target, target=+el.dataset.count, suf=el.dataset.suffix||'';
      const start=performance.now(), dur=1400;
      const tick=t=>{ const p=Math.min(1,(t-start)/dur), v=Math.round(target*(1-Math.pow(1-p,3)));
        el.textContent=v+suf; if(p<1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick); cIO.unobserve(el);
    });
  },{threshold:.5});
  document.querySelectorAll('[data-count]').forEach(el=>cIO.observe(el));
}

window.Portfolio = { boot, renderHome, renderProjects, renderCase, renderAbout, renderContact };
