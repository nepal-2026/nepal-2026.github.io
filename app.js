const D = JSON.parse(document.getElementById('data').textContent);
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const T = (tag, k, cls) => `<${tag}${cls?' class="'+cls+'"':''} data-k="${k}">${esc(get(k))}</${tag}>`;
function get(path){ return path.split('.').reduce((o,p)=> o[/^\d+$/.test(p)?+p:p], D); }
function set(path, val){
  const parts = path.split('.'); const last = parts.pop();
  const obj = parts.reduce((o,p)=> o[/^\d+$/.test(p)?+p:p], D);
  obj[/^\d+$/.test(last)?+last:last] = val;
}

function render(){
  const f = D.facts.map((x,i)=>`<div class="fact"><strong data-k="facts.${i}.0">${esc(x[0])}</strong><span data-k="facts.${i}.1">${esc(x[1])}</span></div>`).join('');
  const moments = D.moments.map((m,i)=>`
    <div class="moment">
      <figure><span class="index">0${i+1}</span><div class="shot im-${m.img}" role="img" aria-label="${esc(m.alt)}"></div></figure>
      ${T('h3',`moments.${i}.h`)}
      ${T('p',`moments.${i}.p`)}
      <div class="caption" data-k="moments.${i}.cap">${esc(m.cap)}</div>
    </div>`).join('');
  const route = D.route.map((r,i)=>`
    <div class="route-stop"><b data-k="route.${i}.0">${esc(r[0])}</b><span data-k="route.${i}.1">${esc(r[1])}</span><small data-k="route.${i}.2">${esc(r[2])}</small></div>`).join('');
  const daysNav = D.days.map((_,i)=>`<a href="#day${i+1}">День ${i+1}</a>`).join('');
  const days = D.days.map((d,i)=>`
    <article class="day" id="day${i+1}">
      <figure class="day-visual">
        <div class="shot im-${d.img}" role="img" aria-label="${esc(d.alt)}"></div>
        <figcaption>${esc(d.alt)}</figcaption>
      </figure>
      <div>
        <div class="day-heading"><span class="day-no">День ${i+1}</span><span class="day-place" data-k="days.${i}.place">${esc(d.place)}</span></div>
        ${T('h3',`days.${i}.h`)}
        ${d.legend ? `<div class="legend" data-k="days.${i}.legend">${esc(d.legend)}</div>` : ''}
        ${d.ps.map((p,j)=>`<p data-k="days.${i}.ps.${j}">${esc(p)}</p>`).join('')}
      </div>
    </article>`).join('');
  const comfort = D.comfort.map((c,i)=>`
    <div class="comfort-item"><div class="n" data-k="comfort.${i}.0">${esc(c[0])}</div>${T('h3',`comfort.${i}.1`)}${T('p',`comfort.${i}.2`)}</div>`).join('');
  const dates = D.dates.map((d,i)=>`
    <div class="date-card">
      <div><span class="date-large" data-k="dates.${i}.0">${esc(d[0])}</span><span class="date-small" data-k="dates.${i}.1">${esc(d[1])}</span></div>
      <div class="tag" data-k="dates.${i}.2">${esc(d[2])}</div>
    </div>`).join('');
  const persons = D.authors.map((a,i)=>`
    <div class="person">
      <div class="photo-slot${a.img ? ' filled im-'+a.img : ''}" role="img" aria-label="${esc(a.slot)}">${a.img ? '' : esc(a.slot)}</div>
      ${T('h3',`authors.${i}.name`)}
      ${a.paras.map((t,j)=>`<p data-k="authors.${i}.paras.${j}">${esc(t)}</p>`).join('')}
    </div>`).join('');
  const inclList = D.incl.map((t,i)=>`<li data-k="incl.${i}">${esc(t)}</li>`).join('');
  const exclList = D.excl.map((t,i)=>`<li data-k="excl.${i}">${esc(t)}</li>`).join('');
  const faq = D.faq.map((q,i)=>`
    <details><summary data-k="faq.${i}.0">${esc(q[0])}</summary><p data-k="faq.${i}.1">${esc(q[1])}</p></details>`).join('');

  document.getElementById('root').innerHTML = `

<header class="hero" id="top">
  <div class="hero-bg im-hero-drug" role="img" aria-label="Ступа Боуднатх"></div>
  <div class="hero-inner">
    <div class="eyebrow" data-k="heroEyebrow">${esc(D.heroEyebrow)}</div>
    <h1><span data-k="heroTitle1">${esc(D.heroTitle1)}</span> <em data-k="heroTitle2">${esc(D.heroTitle2)}</em></h1>
    <p class="lead" data-k="heroLead">${esc(D.heroLead)}</p>
    <div class="hero-actions">
      <a class="btn" href="#program"><span data-k="heroBtn">${esc(D.heroBtn)}</span> <span aria-hidden="true">↗</span></a>
      <a class="hero-link" href="#about" data-k="heroLink">${esc(D.heroLink)}</a>
    </div>
    <div class="hero-when" data-k="heroWhen">${esc(D.heroWhen)}</div>
    <div class="hero-foot">
      <div></div>
      <div class="place" data-k="heroPlace">${esc(D.heroPlace)}</div>
    </div>
  </div>
</header>

<div class="wrap">
  <div class="facts">${f}</div>

  <section class="intro" id="about">
    <div>
      <div class="eyebrow muted" data-k="introEyebrow">${esc(D.introEyebrow)}</div>
      ${T('h2','introTitle')}
      <div class="intro-sign" data-k="introSign">${esc(D.introSign)}</div>
    </div>
    <div class="intro-copy">
      ${T('p','introBig','big')}
      ${T('p','introP2')}
      ${T('p','introP3')}
    </div>
  </section>

  <section class="moments">
    <div class="section-head">
      <div class="eyebrow muted" data-k="momentsEyebrow">${esc(D.momentsEyebrow)}</div>
      ${T('h2','momentsTitle')}
      ${T('p','momentsNote')}
    </div>
    <div class="moment-grid">${moments}</div>
  </section>
</div>

<section class="route">
  <div class="wrap">
    <div><div class="eyebrow" data-k="routeEyebrow">${esc(D.routeEyebrow)}</div>${T('h2','routeTitle')}</div>
    <div class="route-track">${route}</div>
  </div>
</section>

<div class="wrap">
  <section class="program" id="program">
    ${days}
  </section>
</div>



<section class="mountain">
  <div class="shot im-gryada" role="img" aria-label="Гималаи на рассвете"></div>
  <div class="wrap">
    <div class="eyebrow" data-k="mountainEyebrow">${esc(D.mountainEyebrow)}</div>
    ${T('h2','mountainTitle')}
    ${T('p','mountainNote')}
  </div>
</section>

<div class="wrap">
  <section class="comfort" id="comfort">
    <div class="section-head">
      <div><div class="eyebrow muted" data-k="comfortEyebrow">${esc(D.comfortEyebrow)}</div>${T('h2','comfortTitle')}</div>
      ${T('p','comfortNote')}
    </div>
    <div class="comfort-grid">${comfort}</div>
  </section>
</div>

<section class="author" id="author">
  <div class="wrap">
    <div class="eyebrow muted" data-k="authorEyebrow">${esc(D.authorEyebrow)}</div>
    ${T('h2','authorTitle')}
    <div class="author-grid">${persons}</div>
  </div>
</section>

<section class="price" id="price">
  <div class="wrap">
    <div class="eyebrow" data-k="priceEyebrow">${esc(D.priceEyebrow)}</div>
    ${T('h2','priceTitle')}
    <div class="price-top">
      <div>
        <div class="price-sum" data-k="priceSum">${esc(D.priceSum)}</div>
        <div class="price-sub" data-k="priceSub">${esc(D.priceSub)}</div>
        <div class="price-when" data-k="priceWhen">${esc(D.priceWhen)}</div>
        <div class="price-extra" data-k="priceExtra">${esc(D.priceExtra)}</div>
      </div>
    </div>
    <div class="incl">
      <div>
        <h3 data-k="inclTitle">${esc(D.inclTitle)}</h3>
        <ul>${inclList}</ul>
      </div>
      <div class="out">
        <h3 data-k="exclTitle">${esc(D.exclTitle)}</h3>
        <ul>${exclList}</ul>
      </div>
    </div>
    <div class="price-deal">
      ${T('p','priceBook1')}
      <a class="btn light" href="#price"><span data-k="priceBtn">${esc(D.priceBtn)}</span> <span aria-hidden="true">↗</span></a>
    </div>
  </div>
</section>

<div class="wrap">
  <section class="faq">
    <div><div class="eyebrow muted" data-k="faqEyebrow">${esc(D.faqEyebrow)}</div>${T('h2','faqTitle')}</div>
    <div>${faq}</div>
  </section>

</div>

<div class="wrap">
</div>

<div class="paybar" id="paybar" aria-hidden="true">
  <div class="sum" data-k="barSum">${esc(D.barSum)}<span data-k="barNote">${esc(D.barNote)}</span></div>
  <a class="btn" href="#price"><span data-k="barBtn">${esc(D.barBtn)}</span> <span aria-hidden="true">↗</span></a>
</div>

<footer class="footer"><div class="wrap footer-top"><span data-k="footer">${esc(D.footer)}</span><a class="up" href="#top">Наверх ↑</a></div></footer>`;
}

render();

(function paybar(){
  const bar = document.getElementById('paybar');
  const hero = document.querySelector('.hero');
  if (!bar || !hero) return;
  const onScroll = () => {
    const past = window.scrollY > hero.offsetHeight * 0.85;
    bar.classList.toggle('show', past);
    bar.setAttribute('aria-hidden', past ? 'false' : 'true');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
