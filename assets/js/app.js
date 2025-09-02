
/* Pura Belleza — app.js */
(function(){
  'use strict';
  const $ = (sel,root=document)=>root.querySelector(sel);
  const $$ = (sel,root=document)=>Array.from(root.querySelectorAll(sel));
  const on = (el,ev,fn)=>el && el.addEventListener(ev,fn);

  const CART_KEY='puraBellezaCart';
  const fmtMoney=(n,c='ARS')=>new Intl.NumberFormat('es-AR',{style:'currency',currency:c,maximumFractionDigits:0}).format(Number(n)||0);
  const parseMoney=(s)=>{ if(typeof s==='number')return s; if(!s)return 0; const clean=String(s).replace(/[^\d.,-]/g,'').replace(/\.(?=\d{3}(\D|$))/g,''); return parseFloat(clean.replace(/,/g,'.'))||0; };

  const loadCart=()=>{ try{return JSON.parse(localStorage.getItem(CART_KEY))||[]}catch{return[]} };
  const saveCart=(cart)=>{ localStorage.setItem(CART_KEY, JSON.stringify(cart)); renderCart(); };
  const addToCart=(item)=>{ const cart=loadCart(); const i=cart.findIndex(p=>p.id===item.id); if(i>-1) cart[i].qty+=item.qty||1; else cart.push({...item, qty:item.qty||1}); saveCart(cart); };
  const removeFromCart=(id)=> saveCart(loadCart().filter(p=>p.id!==id));
  const changeQty=(id,d)=>{ const c=loadCart(); const p=c.find(x=>x.id===id); if(p){ p.qty=Math.max(1,p.qty+d); saveCart(c);} };

  const els={ badge:$('#cartBadge'), list:$('#cartItems')||$('#carrito .list-group'), total:$('#cartTotal'), clear:$('#btnClearCart'), checkout:$('#btnCheckout') };

  function renderCart(){
    const cart=loadCart();
    const total=cart.reduce((s,p)=>s+p.qty*(p.priceNum??parseMoney(p.price)),0);
    if(els.badge) els.badge.textContent=cart.reduce((s,p)=>s+p.qty,0);
    if(els.list){
      els.list.innerHTML='';
      if(!cart.length){ const li=document.createElement('li'); li.className='list-group-item text-center text-body-secondary'; li.textContent='Tu carrito está vacío'; els.list.appendChild(li); }
      else{
        cart.forEach(p=>{
          const li=document.createElement('li');
          li.className='list-group-item d-flex align-items-center gap-2';
          li.innerHTML=`<img src="${p.img||''}" alt="${p.name}" width="48" height="48" class="rounded object-fit-cover">
            <div class="flex-fill">
              <div class="fw-semibold">${p.name}</div>
              <div class="small text-body-secondary">${p.variant||''}</div>
              <div class="text-body-secondary">${p.price||fmtMoney(p.priceNum)}</div>
            </div>
            <div class="btn-group btn-group-sm" role="group">
              <button class="btn btn-outline-secondary" data-op="-">–</button>
              <button class="btn btn-outline-secondary" disabled>${p.qty}</button>
              <button class="btn btn-outline-secondary" data-op="+">+</button>
            </div>
            <button class="btn btn-outline-danger btn-sm ms-2" data-remove>Eliminar</button>`;
          on(li.querySelector('[data-op="-"]'),'click',()=>changeQty(p.id,-1));
          on(li.querySelector('[data-op="+"]'),'click',()=>changeQty(p.id,1));
          on(li.querySelector('[data-remove]'),'click',()=>removeFromCart(p.id));
          els.list.appendChild(li);
        });
      }
    }
    if(els.total) els.total.textContent=fmtMoney(total);
  }

  on(els.clear,'click',()=>saveCart([]));
  on(els.checkout,'click',()=>alert('Demostración: conecta acá tu checkout (p.ej., Mercado Pago / Stripe).'));

  function productFromCard(card){
    const id=card.getAttribute('data-id')||(card.querySelector('.card-title')?.textContent||'').trim();
    const name=(card.querySelector('.card-title')?.textContent||'Producto').trim();
    const priceEl=card.querySelector('[data-price], .price, .card-text strong, strong');
    const priceTxt=priceEl?.textContent?.trim()||'';
    const priceNum=priceEl?.getAttribute?.('data-price')?parseMoney(priceEl.getAttribute('data-price')):parseMoney(priceTxt);
    const img=card.querySelector('img')?.getAttribute('src')||'';
    const variant=card.querySelector('.badge, .badge-subcat')?.textContent?.trim()||'';
    return {id,name,price:priceTxt,priceNum,img,variant};
  }
  function wireAddButtons(root=document){
    $$('.card',root).forEach(card=>{
      const btn=card.querySelector('[data-add-to-cart]')||card.querySelector('.btn.btn-brand, .btn-primary');
      if(!btn||btn.dataset.wired) return;
      btn.dataset.wired='1';
      on(btn,'click',e=>{e.preventDefault(); addToCart(productFromCard(card));});
    });
  }
  const mo=new MutationObserver(muts=>{muts.forEach(m=>wireAddButtons(m.target));});
  mo.observe(document.body,{childList:true,subtree:true});

  const searchInput=$('#searchProducts')||$('input[type="search"]');
  const allCards=()=>$$('.card'); const getCol=(el)=>el.closest('.col,[class*="col-"]')||el;
  function filterCards(q){ const query=(q||'').trim().toLowerCase(); if(!query){allCards().forEach(c=>getCol(c).style.display='');return;} allCards().forEach(card=>{ const txt=(card.innerText||'').toLowerCase(); getCol(card).style.display = txt.includes(query)?'':'none'; }); }
  function debounce(fn,ms){let t; return (...a)=>{clearTimeout(t); t=setTimeout(()=>fn.apply(null,a),ms);}}
  on(searchInput,'input',debounce(e=>filterCards(e.target.value),120));

  $$('a[href^="#"]').forEach(a=>on(a,'click',e=>{ const href=a.getAttribute('href'); if(href&&href.length>1){ e.preventDefault(); $(href)?.scrollIntoView({behavior:'smooth'}); }}));
  wireAddButtons();
  renderCart();
})();

// === Filtros por subcategoría ===
(function(){
  const toolbar = document.getElementById('filtersPerf');
  if(!toolbar) return;
  let active = '*';
  const allCards = ()=>Array.from(document.querySelectorAll('#perfumeria .card'));
  const apply = ()=>{
    allCards().forEach(card=>{
      const match = active==='*' || card.getAttribute('data-subcat')===active;
      const col = card.closest('.col') || card;
      col.style.display = match ? '' : 'none';
    });
  };
  toolbar.querySelectorAll('[data-filter-subcat]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      active = btn.getAttribute('data-filter-subcat');
      toolbar.querySelectorAll('.btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      apply();
    });
  });
})();
