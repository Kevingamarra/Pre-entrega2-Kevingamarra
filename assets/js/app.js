/* ----DATA ---- */
/* PERFUMERÍA */
const products = [
  // Femenina
  { id:'pf1', name:'Pitangá Frescor',     price:13999, img:'assets/img/productos/perfumeria/femenina/perfumeria-femenina-1.jpg', category:'perfumeria', subcat:'Kaiak',     aromas:['Acuático'] },
  { id:'pf4', name:'Kriska Shock',        price:12999, img:'assets/img/productos/perfumeria/femenina/perfumeria-femenina-4.jpg', category:'perfumeria', subcat:'Kriska',    aromas:['Frutal'] },
  { id:'pf5', name:'Humor Própria',       price:11999, img:'assets/img/productos/perfumeria/femenina/perfumeria-femenina-5.jpg', category:'perfumeria', subcat:'Humor',     aromas:['Frutal'] },
  { id:'pf8', name:'Luna Rubí',           price:14499, img:'assets/img/productos/perfumeria/femenina/perfumeria-femenina-8.jpg', category:'perfumeria', subcat:'Luna',      aromas:['Floral'] },

  // Masculina
  { id:'pm2', name:'Essencial Oud',       price:21999, img:'assets/img/productos/perfumeria/masculina/perfumeria-masculina-2.jpg', category:'perfumeria', subcat:'Essencial', aromas:['Amaderado'] },
  { id:'pm3', name:'HOMEM Potence',       price:18999, img:'assets/img/productos/perfumeria/masculina/perfumeria-masculina-3.jpg', category:'perfumeria', subcat:'Otros',     aromas:['Especiado'] },
  { id:'pm6', name:'Kaiak Urbe',          price:15999, img:'assets/img/productos/perfumeria/masculina/perfumeria-masculina-6.jpg', category:'perfumeria', subcat:'Kaiak',     aromas:['Acuático'] },
  { id:'pm7', name:'Kaiak Aventura',      price:15999, img:'assets/img/productos/perfumeria/masculina/perfumeria-masculina-7.jpg', category:'perfumeria', subcat:'Kaiak',     aromas:['Acuático'] },
  { id:'pm8', name:'Kaiak Oceano',        price:16999, img:'assets/img/productos/perfumeria/masculina/perfumeria-masculina-8.jpg', category:'perfumeria', subcat:'Kaiak',     aromas:['Acuático'] },
];

const SUBCAT_ORDER = ['Kaiak','Essencial','Kriska','Luna','Humor','Otros'];
const currentFilters = { subcat:'*', aroma:'*' };

/* CUIDADOS DIARIOS */
const productosCuidados = [
  { id:'cd1', name:'Tododia Cereza Negra – Crema 400 ml',     price:8999,  img:'assets/img/productos/cuidados/cuidados-1.jpg', subcat:'Tododia' },
  { id:'cd2', name:'Tododia Body Splash Cereza Negra 200 ml', price:7999,  img:'assets/img/productos/cuidados/cuidados-2.jpg', subcat:'Tododia' },
  { id:'cd3', name:'Jabón en barra Tododia (x5)',             price:6499,  img:'assets/img/productos/cuidados/cuidados-3.jpg', subcat:'Tododia' },
  { id:'cd4', name:'Ekos Mini Jabones Surtidos',              price:6999,  img:'assets/img/productos/cuidados/cuidados-4.jpg', subcat:'Ekos' },
  { id:'cd5', name:'Ekos Castanha Pulpa corporal 400 ml',     price:9999,  img:'assets/img/productos/cuidados/cuidados-5.jpg', subcat:'Ekos' },
  { id:'cd6', name:'Tododia Refil 400 ml',                    price:5999,  img:'assets/img/productos/cuidados/cuidados-6.jpg', subcat:'Tododia' },
];

/* MAQUILLAJE */
const productosMaquillaje = [
  { id:'mq1', name:'UNA Cushion Base',      price:10999, img:'assets/img/productos/maquillaje/maquillaje-1.jpg', subcat:'UNA' },
  { id:'mq2', name:'UNA Gloss FPS15',       price:6999,  img:'assets/img/productos/maquillaje/maquillaje-2.jpg', subcat:'UNA' },
  { id:'mq3', name:'FACES Máscara Negra',   price:5499,  img:'assets/img/productos/maquillaje/maquillaje-3.jpg', subcat:'FACES' },
  { id:'mq4', name:'UNA Máscara Magnífico', price:8499,  img:'assets/img/productos/maquillaje/maquillaje-4.jpg', subcat:'UNA' },
  { id:'mq5', name:'FACES Labial',          price:5999,  img:'assets/img/productos/maquillaje/maquillaje-5.jpg', subcat:'FACES' },
  { id:'mq6', name:'UNA Primer Blur',       price:7999,  img:'assets/img/productos/maquillaje/maquillaje-6.jpg', subcat:'UNA' },
  { id:'mq7', name:'UNA Serum Pestañas',    price:9999,  img:'assets/img/productos/maquillaje/maquillaje-7.jpg', subcat:'UNA' },
  { id:'mq8', name:'UNA Delineador',        price:6499,  img:'assets/img/productos/maquillaje/maquillaje-8.jpg', subcat:'UNA' },
];

/* REGALOS */
const productosRegalos = [
  { id:'rg1', name:'Set Tododia jabones (edición)', price:7999,  img:'assets/img/productos/regalos/regalos-1.jpg', subcat:'Sets' },
  { id:'rg2', name:'Kaiak Vital Dúo',               price:21999, img:'assets/img/productos/regalos/regalos-2.jpg', subcat:'Perfumería' },
  { id:'rg3', name:'Kit UNA Mirada',                price:16999, img:'assets/img/productos/regalos/regalos-3.jpg', subcat:'Maquillaje' },
  { id:'rg4', name:'Spray de ambientes Todanoite',  price:10999, img:'assets/img/productos/regalos/regalos-4.jpg', subcat:'Hogar' },
  { id:'rg5', name:'Bolsa de regalo Natura',        price:1999,  img:'assets/img/productos/regalos/regalos-5.jpg', subcat:'Accesorios' },
  { id:'rg6', name:'Set regalo mini',               price:9999,  img:'assets/img/productos/regalos/regalos-6.jpg', subcat:'Sets' },
];

/* ----Utilidades ---- */
const slug = s => (s || 'otros').toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'');

/* ---- Render Perfumería ---- */
function renderPerfumeria({ subcat='*', aroma='*' } = {}){
  const container = document.getElementById('perfumeria-groups');
  if(!container) return;

  let list = products.filter(p => p.category === 'perfumeria');
  if (subcat !== '*') list = list.filter(p => p.subcat === subcat);
  if (aroma !== '*')  list = list.filter(p => (p.aromas||[]).includes(aroma));

  const groups = {};
  list.forEach(p => { (groups[p.subcat || 'Otros'] ||= []).push(p); });

  const ordered = (subcat === '*'
    ? SUBCAT_ORDER.filter(k => groups[k]?.length)
    : [subcat]).filter(Boolean);

  container.innerHTML = ordered.map(key => {
    const items = (groups[key] || []).sort((a,b)=>a.name.localeCompare(b.name));
    const rowId = `row-${slug(key)}`;
    return `
      <h3 class="subcat-heading">${key}</h3>
      <div class="carousel-row">
        <button class="carousel-btn prev" aria-label="Anterior" data-target="${rowId}">
          <i class="bi bi-chevron-left"></i>
        </button>
        <div class="products-row" id="${rowId}">
          ${items.map(cardProductHTML).join('')}
        </div>
        <button class="carousel-btn next" aria-label="Siguiente" data-target="${rowId}">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    `;
  }).join('') || `<p class="text-muted">No hay productos para el filtro seleccionado.</p>`;

  initRowNavButtons();
}

/* ----Card producto ----*/
function cardProductHTML(p){
  const aromaBadges = (p.aromas||[]).map(a => `<span class="badge badge-aroma me-1 mb-1">${a}</span>`).join('');
  return `
    <div class="card product shadow-sm">
      <div class="img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="card-body">
        <div class="d-flex flex-wrap gap-1 mb-1">
          <span class="badge-subcat">${p.subcat || 'Otros'}</span>
          ${aromaBadges}
        </div>
        <h3 class="title mb-1">${p.name}</h3>
        <div class="price fw-bold">$ ${p.price.toLocaleString('es-AR')}</div>
      </div>
      <div class="card-footer bg-transparent border-0 pt-0">
        <button class="btn btn-brand w-100" data-add="${p.id}">Agregar</button>
      </div>
    </div>
  `;
}

/* ---- Flechas carrusel ----*/
function initRowNavButtons(){
  document.querySelectorAll('.carousel-btn').forEach(btn=>{
    const targetId = btn.getAttribute('data-target');
    const row = document.getElementById(targetId);
    if(!row) return;

    const step = () => {
      const card = row.querySelector('.card.product');
      const val = card ? card.getBoundingClientRect().width + 16 : row.clientWidth * 0.8;
      return Math.max(200, Math.min(val, 420));
    };

    const updateDisabled = () => {
      btn.closest('.carousel-row').querySelectorAll('.carousel-btn').forEach(b=>{
        const r = document.getElementById(b.getAttribute('data-target'));
        b.disabled = (b.classList.contains('prev') && r.scrollLeft <= 1)
                  || (b.classList.contains('next') && r.scrollLeft + r.clientWidth >= r.scrollWidth - 1);
      });
    };
    updateDisabled();
    row.addEventListener('scroll', updateDisabled, { passive:true });

    btn.addEventListener('click', ()=>{
      row.scrollBy({ left: btn.classList.contains('prev') ? -step() : step(), behavior:'smooth' });
    });
  });
}

/* ---- Carruseles simples ---- */
function renderCarouselSimple(rowId, items){
  const row = document.getElementById(rowId);
  if(!row) return;
  row.innerHTML = items.map(p => cardProductHTML({
    ...p, category:'otros', aromas:[], subcat:p.subcat || '—', price:p.price || 0
  })).join('');
}
function attachRowNav(rowId){
  document.querySelectorAll(`.carousel-btn[data-target="${rowId}"]`).forEach(btn=>{
    const row = document.getElementById(rowId);
    if(!row) return;

    const step = () => {
      const card = row.querySelector('.card.product');
      const val  = card ? card.getBoundingClientRect().width + 16 : row.clientWidth * 0.8;
      return Math.max(200, Math.min(val, 420));
    };
    const updateDisabled = () => {
      btn.closest('.carousel-row').querySelectorAll('.carousel-btn').forEach(b=>{
        const r = document.getElementById(b.getAttribute('data-target'));
        b.disabled = (b.classList.contains('prev') && r.scrollLeft <= 1)
                  || (b.classList.contains('next') && r.scrollLeft + r.clientWidth >= r.scrollWidth - 1);
      });
    };
    updateDisabled();
    row.addEventListener('scroll', updateDisabled, { passive:true });

    btn.addEventListener('click', ()=>{
      row.scrollBy({ left: btn.classList.contains('prev') ? -step() : step(), behavior:'smooth' });
    });
  });
}

/* ----Buscador ---- */
document.querySelector('form[role="search"]')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const q = (document.getElementById('searchProducts')?.value || '').toLowerCase().trim();
  if(!q){ renderPerfumeria(currentFilters); return; }
  currentFilters.subcat='*';
  const filtered = products.filter(p =>
    p.category==='perfumeria' &&
    (p.name.toLowerCase().includes(q) || (p.subcat||'').toLowerCase().includes(q))
  );
  const container = document.getElementById('perfumeria-groups');
  const rowId = 'row-search';
  container.innerHTML = `
    <h3 class="subcat-heading">Resultados</h3>
    <div class="carousel-row">
      <button class="carousel-btn prev" data-target="${rowId}"><i class="bi bi-chevron-left"></i></button>
      <div class="products-row" id="${rowId}">${filtered.map(cardProductHTML).join('')}</div>
      <button class="carousel-btn next" data-target="${rowId}"><i class="bi bi-chevron-right"></i></button>
    </div>`;
  initRowNavButtons();
});

/* ---- Carrito ---- */
let cart = [];
function addToCart(prod){ cart.push(prod); updateCart(); }
function updateCart(){
  const list  = document.getElementById('cartItems');
  const badge = document.getElementById('cartBadge');
  const total = document.getElementById('cartTotal');
  if(!list) return;
  list.innerHTML = cart.map(p => `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      ${p.name} <span>$ ${p.price.toLocaleString('es-AR')}</span>
    </li>
  `).join('');
  badge.textContent = cart.length;
  total.textContent = "$ " + cart.reduce((s,p)=>s+p.price,0).toLocaleString('es-AR');
}
document.addEventListener('click', e=>{
  const id = e.target?.getAttribute?.('data-add');
  if(id){
    const all = [...products, ...productosCuidados, ...productosMaquillaje, ...productosRegalos];
    const prod = all.find(p=>p.id===id);
    if(prod) addToCart(prod);
  }
});
document.getElementById('btnClearCart')?.addEventListener('click', ()=>{ cart=[]; updateCart(); });

/* ----Inicio ---- */
document.addEventListener('DOMContentLoaded', ()=>{
  // Filtros de perfumería
  document.querySelectorAll('#perfumeria [data-subcat]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('#perfumeria [data-subcat]').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      currentFilters.subcat = btn.dataset.subcat;
      renderPerfumeria(currentFilters);
    });
  });
  document.querySelectorAll('#aromaMenu [data-aroma]').forEach(item=>{
    item.addEventListener('click', ()=>{
      currentFilters.aroma = item.dataset.aroma;
      renderPerfumeria(currentFilters);
    });
  });

  // Render inicial
  renderPerfumeria();
  renderCarouselSimple('row-cuidados',   productosCuidados);
  renderCarouselSimple('row-maquillaje', productosMaquillaje);
  renderCarouselSimple('row-regalos',    productosRegalos);
  attachRowNav('row-cuidados');
  attachRowNav('row-maquillaje');
  attachRowNav('row-regalos');
});
