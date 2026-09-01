/* ===== Emploi du temps — logique ===== */
const LS_ACTIVE = 'edt_active_v1';
const LS_DEFAULT = 'edt_default_v1';

const COLORS = ['#7ED9A6','#E38FC5','#D9CB6A','#7EC8E3','#A99BE8','#C9CDD6','#8E7FE0','#4E6FC0','#F0A868','#E7E7EC'];

function defaultTemplates(){
  return [
    {id:'t1',subject:'HGGSP',teacher:'Sokhn S.',room:'',color:'#E7E7EC'},
    {id:'t2',subject:'FRANCAIS',teacher:'Dubois A.',room:'Salle 109',color:'#7ED9A6'},
    {id:'t3',subject:'HISTOIRE-GEOGRAPHIE',teacher:'Menanteau F.',room:'Salle 109',color:'#E38FC5'},
    {id:'t4',subject:'PH-CH',teacher:'Condette A.',room:'',color:'#D9CB6A'},
    {id:'t5',subject:'ED.PHYSIQUE & SPORTIVE',teacher:'Talleu L.',room:'Salle EPS',color:'#7EC8E3'},
    {id:'t6',subject:'ENSSCI',teacher:'',room:'Salle 109',color:'#A99BE8'},
    {id:'t7',subject:'AGL1',teacher:'Wainstein N.',room:'Salle 109',color:'#C9CDD6'},
    {id:'t8',subject:'ANGLAIS LV SECTION',teacher:'Manzah A.',room:'Salle 109',color:'#D98FC0'},
    {id:'t9',subject:'DEVOIR SURVEILLE',teacher:'N. Barre VS L.',room:'Salle 001',color:'#8E7FE0'},
    {id:'t10',subject:'MATHS SPE',teacher:'Grimonprez M.',room:'',color:'#E7E7EC'},
    {id:'t11',subject:'ALLEMAND LV2',teacher:'Halit A.',room:'Salle 114',color:'#4E6FC0'},
    {id:'t12',subject:'ACCOMPAGNEMENT PERSO.',teacher:'',room:'Salle 109',color:'#C7B8F0'},
  ];
}

function m(h,mn){return h*60+mn;}

function defaultBlocks(){
  let id=1; const nb=()=> 'b'+(id++);
  return [
    // Lundi
    {id:nb(),day:0,start:m(7,55),dur:110,week:'all',subject:'HGGSP',teacher:'Sokhn S.',room:'Salle 112',color:'#E7E7EC'},
    {id:nb(),day:0,start:m(10,0),dur:55,week:'all',subject:'FRANCAIS',teacher:'Dubois A.',room:'Salle 109',color:'#7ED9A6'},
    {id:nb(),day:0,start:m(10,55),dur:55,week:'all',subject:'HISTOIRE-GEOGRAPHIE',teacher:'Menanteau F.',room:'Salle 109',color:'#E38FC5'},
    {id:nb(),day:0,start:m(14,35),dur:55,week:'all',subject:'HISTOIRE-GEOGRAPHIE',teacher:'Menanteau F.',room:'Salle 109',color:'#E38FC5'},
    // Mardi
    {id:nb(),day:1,start:m(7,55),dur:110,week:'all',subject:'HGGSP',teacher:'Sokhn S.',room:'Salle 108',color:'#E7E7EC'},
    {id:nb(),day:1,start:m(10,0),dur:55,week:'all',subject:'PH-CH',teacher:'Condette A.',room:'Labo Ampère 002',color:'#D9CB6A'},
    {id:nb(),day:1,start:m(12,45),dur:55,week:'A',subject:'RENFORCEMENT LINGUISTIQUE',teacher:'Wainstein N.',room:'Salle 109',color:'#C9CDD6'},
    {id:nb(),day:1,start:m(12,45),dur:55,week:'B',subject:'FRANCAIS',teacher:'Dubois A.',room:'Salle 109',color:'#7ED9A6'},
    {id:nb(),day:1,start:m(13,40),dur:55,week:'A',subject:'ENS. MORAL & CIVIQUE',teacher:'Allard M.',room:'Salle 109',color:'#E38FC5'},
    {id:nb(),day:1,start:m(13,40),dur:55,week:'B',subject:'AGL1',teacher:'Wainstein N.',room:'Salle 109',color:'#C9CDD6'},
    {id:nb(),day:1,start:m(14,35),dur:55,week:'all',subject:'ENSSCI',teacher:'Allard M.',room:'Salle 109',color:'#A99BE8'},
    {id:nb(),day:1,start:m(15,45),dur:55,week:'A',subject:'FRANCAIS',teacher:'Dubois A.',room:'Salle 109',color:'#7ED9A6'},
    // Mercredi
    {id:nb(),day:2,start:m(7,55),dur:55,week:'all',subject:'ENSSCI',teacher:'Condette A.',room:'Salle 109',color:'#A99BE8'},
    {id:nb(),day:2,start:m(8,50),dur:55,week:'all',subject:'FRANCAIS',teacher:'Dubois A.',room:'Salle 109',color:'#7ED9A6'},
    {id:nb(),day:2,start:m(10,0),dur:110,week:'all',subject:'ED.PHYSIQUE & SPORTIVE',teacher:'Talleu L.',room:'Salle EPS',color:'#7EC8E3'},
    {id:nb(),day:2,start:m(12,45),dur:165,week:'all',subject:'DEVOIR SURVEILLE',teacher:'N. Barre VS L.',room:'Salle 001',color:'#8E7FE0'},
    {id:nb(),day:2,start:m(15,30),dur:70,week:'all',subject:'HISTOIRE-GEOGRAPHIE',teacher:'Menanteau F.',room:'Salle 109',color:'#E38FC5'},
    // Jeudi
    {id:nb(),day:3,start:m(7,55),dur:110,week:'all',subject:'PH-CH',teacher:'Condette A.',room:'Labo Lavoisier 003',color:'#D9CB6A'},
    {id:nb(),day:3,start:m(10,55),dur:55,week:'all',subject:'FRANCAIS',teacher:'Dubois A.',room:'Salle 109',color:'#7ED9A6'},
    {id:nb(),day:3,start:m(12,45),dur:55,week:'A',subject:'AGL1',teacher:'Wainstein N.',room:'Salle 109',color:'#C9CDD6'},
    {id:nb(),day:3,start:m(12,45),dur:55,week:'B',subject:'ACCOMPAGNEMENT PERSO.',teacher:'Dubois A.',room:'Salle 109',color:'#C7B8F0'},
    {id:nb(),day:3,start:m(13,40),dur:110,week:'all',subject:'MATHS SPE',teacher:'Grimonprez M.',room:'Salle 208',color:'#E7E7EC'},
    {id:nb(),day:3,start:m(15,45),dur:55,week:'all',subject:'ALLEMAND LV2',teacher:'Halit A.',room:'Salle 114',color:'#4E6FC0'},
    // Vendredi
    {id:nb(),day:4,start:m(7,55),dur:55,week:'B',subject:'ACCOMPAGNEMENT PERSO.',teacher:'Condette A.',room:'',color:'#C7B8F0'},
    {id:nb(),day:4,start:m(8,50),dur:55,week:'all',subject:'AGL1',teacher:'Wainstein N.',room:'Salle 109',color:'#C9CDD6'},
    {id:nb(),day:4,start:m(10,0),dur:55,week:'all',subject:'AGL1',teacher:'Wainstein N.',room:'Salle 109',color:'#C9CDD6'},
    {id:nb(),day:4,start:m(10,55),dur:55,week:'all',subject:'ANGLAIS LV SECTION',teacher:'Manzah A.',room:'Salle 109',color:'#D98FC0'},
    {id:nb(),day:4,start:m(13,40),dur:110,week:'all',subject:'MATHS SPE',teacher:'Grimonprez M.',room:'Salle 207',color:'#E7E7EC'},
  ];
}

function defaultState(){
  return {
    config:{startHour:7,endHour:19,step:15,days:['Lundi','Mardi','Mercredi','Jeudi','Vendredi']},
    templates:defaultTemplates(),
    blocks:defaultBlocks(),
  };
}

let state = load(LS_ACTIVE) || (function(){const s=defaultState(); save(LS_ACTIVE,s); return s;})();
let currentWeek = 'A';
let editing = null; // {id} block being edited, or null = new

function load(key){ try{ const raw=localStorage.getItem(key); return raw?JSON.parse(raw):null; }catch(e){ return null; } }
function save(key,val){ localStorage.setItem(key, JSON.stringify(val)); }
function persist(){ save(LS_ACTIVE, state); }
function uid(){ return 'b'+Math.random().toString(36).slice(2,9); }

/* ===== RENDER ===== */
const grid = document.getElementById('grid');
const SLOTPX = 34;

function totalSlots(){ const {startHour,endHour,step}=state.config; return Math.round((endHour-startHour)*60/step); }

function renderGrid(){
  const {startHour,endHour,step,days}=state.config;
  const slots = totalSlots();
  grid.style.setProperty('--slotpx', SLOTPX+'px');
  grid.style.gridTemplateColumns = `64px repeat(${days.length}, minmax(140px,1fr))`;
  grid.style.gridTemplateRows = `40px repeat(${slots}, ${SLOTPX}px)`;
  grid.innerHTML='';

  // corner
  const corner=document.createElement('div');
  corner.className='hcell corner';
  grid.appendChild(corner);

  days.forEach(d=>{
    const h=document.createElement('div');
    h.className='hcell';
    h.textContent=d;
    grid.appendChild(h);
  });

  // time column cells (row 2..) — placed via grid-row spanning per hour label
  for(let i=0;i<slots;i++){
    const minsFromStart = i*step;
    const totalMin = startHour*60+minsFromStart;
    const hh = Math.floor(totalMin/60), mm = totalMin%60;
    const tc = document.createElement('div');
    tc.className='timecell';
    tc.style.gridColumn='1';
    tc.style.gridRow = (i+2)+'';
    tc.textContent = (mm===0) ? (hh+'h') : '';
    grid.appendChild(tc);
  }

  // day columns backgrounds
  days.forEach((d,di)=>{
    const col=document.createElement('div');
    col.className='daycol';
    col.style.gridColumn = (di+2)+'';
    col.style.gridRow = `2 / span ${slots}`;
    col.style.setProperty('--slotpx', SLOTPX+'px');
    col.dataset.day=di;
    grid.appendChild(col);
  });

  // blocks
  state.blocks.filter(b=> b.week==='all' || b.week===currentWeek).forEach(renderBlock);

  document.getElementById('btnWeek').textContent = 'Semaine '+currentWeek;
}

function minToPx(min){
  const {startHour,step}=state.config;
  return ((min - startHour*60)/step)*SLOTPX;
}
function pxToMin(px){
  const {startHour,step}=state.config;
  return startHour*60 + Math.round(px/SLOTPX)*step;
}

function renderBlock(b){
  const {days}=state.config;
  const el=document.createElement('div');
  el.className='block';
  el.dataset.id=b.id;
  el.style.background=b.color;
  el.style.gridColumn = (b.day+2)+'';
  el.style.gridRow = '2 / span '+totalSlots();
  el.style.top = minToPx(b.start)+'px';
  el.style.height = (b.dur/state.config.step*SLOTPX)+'px';
  el.style.position='absolute';
  el.style.left='3px'; el.style.right='3px';
  el.innerHTML = `<b>${esc(b.subject||'Cours')}</b>${b.teacher?`<div>${esc(b.teacher)}</div>`:''}${b.room?`<div class="room">${esc(b.room)}</div>`:''}${b.week!=='all'?`<span class="wtag">${b.week}</span>`:''}<div class="resize"></div>`;
  // place inside corresponding daycol for correct stacking context
  const col = grid.querySelector(`.daycol[data-day="${b.day}"]`);
  col.style.position='relative';
  col.appendChild(el);
  attachBlockInteractions(el,b);
}

function esc(s){ return (s||'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])); }

/* ===== PALETTE ===== */
function renderPalette(){
  const list=document.getElementById('paletteList');
  list.innerHTML='';
  state.templates.forEach(t=>{
    const el=document.createElement('div');
    el.className='palette-item';
    el.innerHTML=`<span class="dot" style="background:${t.color}"></span>${esc(t.subject)}`;
    el.dataset.id=t.id;
    attachPaletteDrag(el,t);
    list.appendChild(el);
  });
}

/* ===== POINTER DRAG HELPERS ===== */
function getGridMetrics(){
  const rect = grid.getBoundingClientRect();
  const colW = (rect.width-64)/state.config.days.length;
  return {rect,colW};
}

function attachPaletteDrag(el,tmpl){
  let ghost=null, startX=0,startY=0, dragging=false;
  el.addEventListener('pointerdown', e=>{
    startX=e.clientX; startY=e.clientY; dragging=false;
    el.setPointerCapture(e.pointerId);
    const move = ev=>{
      if(!dragging && (Math.abs(ev.clientX-startX)>6 || Math.abs(ev.clientY-startY)>6)){
        dragging=true;
        ghost=document.createElement('div');
        ghost.className='block';
        ghost.style.position='fixed';
        ghost.style.width='140px';
        ghost.style.height='40px';
        ghost.style.background=tmpl.color;
        ghost.style.zIndex=999;
        ghost.style.pointerEvents='none';
        ghost.innerHTML=`<b>${esc(tmpl.subject)}</b>`;
        document.body.appendChild(ghost);
      }
      if(dragging && ghost){
        ghost.style.left=(ev.clientX-70)+'px';
        ghost.style.top=(ev.clientY-20)+'px';
      }
    };
    const up = ev=>{
      document.removeEventListener('pointermove',move);
      document.removeEventListener('pointerup',up);
      if(dragging && ghost){
        const {rect,colW}=getGridMetrics();
        const x=ev.clientX-rect.left-64, y=ev.clientY-rect.top-40;
        if(x>=0 && y>=0 && x < colW*state.config.days.length){
          const day = Math.min(state.config.days.length-1, Math.max(0,Math.floor(x/colW)));
          const start = clampStart(pxToMin(y+grid.parentElement.scrollTop-  (0)), 60);
          const b = {id:uid(),day,start,dur:60,week:'all',subject:tmpl.subject,teacher:tmpl.teacher,room:tmpl.room,color:tmpl.color};
          fixOverlap(b);
          state.blocks.push(b);
          persist(); renderGrid();
        }
        ghost.remove(); ghost=null;
      } else {
        openEditTemplate(tmpl);
      }
    };
    document.addEventListener('pointermove',move);
    document.addEventListener('pointerup',up);
  });
}

function clampStart(min,dur){
  const {startHour,endHour,step}=state.config;
  min = Math.round(min/step)*step;
  min = Math.max(startHour*60, Math.min(endHour*60-dur, min));
  return min;
}
function fixOverlap(){ /* overlaps allowed visually stacked simply; no-op for simplicity */ }

function attachBlockInteractions(el,b){
  let mode=null, startX=0,startY=0, origStart=b.start, origDur=b.dur, moved=false;
  const resizeHandle = el.querySelector('.resize');

  function pdown(e, isResize){
    e.stopPropagation();
    startX=e.clientX; startY=e.clientY; moved=false;
    origStart=b.start; origDur=b.dur;
    mode = isResize?'resize':'move';
    el.setPointerCapture(e.pointerId);
    el.classList.add('dragging');
    const move = ev=>{
      const dx=ev.clientX-startX, dy=ev.clientY-startY;
      if(Math.abs(dx)>4||Math.abs(dy)>4) moved=true;
      const {step}=state.config;
      const deltaMin = Math.round(dy/SLOTPX)*step;
      if(mode==='move'){
        const newStart = clampStart(origStart+deltaMin, origDur);
        b.start=newStart;
        el.style.top = minToPx(b.start)+'px';
        // horizontal day change
        const {colW}=getGridMetrics();
        const dayDelta = Math.round(dx/colW);
        const newDay = Math.min(state.config.days.length-1, Math.max(0, b.day+dayDelta - (b._baseDay!==undefined? (b.day-b._baseDay):0)));
      } else {
        const newDur = Math.max(state.config.step, origDur+deltaMin);
        const {endHour}=state.config;
        b.dur = Math.min(newDur, endHour*60-b.start);
        el.style.height = (b.dur/state.config.step*SLOTPX)+'px';
      }
    };
    const up = ev=>{
      document.removeEventListener('pointermove',move);
      document.removeEventListener('pointerup',up);
      el.classList.remove('dragging');
      if(mode==='move' && moved){
        // determine day from final X
        const {rect,colW}=getGridMetrics();
        const x=ev.clientX-rect.left-64;
        const day=Math.min(state.config.days.length-1,Math.max(0,Math.floor(x/colW)));
        b.day=day;
      }
      persist();
      renderGrid();
      if(!moved && mode==='move'){ openEditBlock(b); }
      mode=null;
    };
    document.addEventListener('pointermove',move);
    document.addEventListener('pointerup',up);
  }

  el.addEventListener('pointerdown', e=>pdown(e,false));
  resizeHandle.addEventListener('pointerdown', e=>pdown(e,true));
}

/* ===== EDIT SHEET (block or template) ===== */
const editOverlay=document.getElementById('editOverlay');
const fSubject=document.getElementById('fSubject'), fTeacher=document.getElementById('fTeacher'), fRoom=document.getElementById('fRoom');
const swatchesEl=document.getElementById('swatches');
const weekSeg=document.getElementById('weekSeg');
let editTarget=null; // {kind:'block'|'template', id}
let pickedColor=COLORS[0];

function buildSwatches(){
  swatchesEl.innerHTML='';
  COLORS.forEach(c=>{
    const s=document.createElement('div');
    s.className='swatch'+(c===pickedColor?' sel':'');
    s.style.background=c;
    s.onclick=()=>{ pickedColor=c; buildSwatches(); };
    swatchesEl.appendChild(s);
  });
}

function openEditBlock(b){
  editTarget={kind:'block',id:b.id};
  document.getElementById('editTitle').textContent='Modifier le cours';
  fSubject.value=b.subject||''; fTeacher.value=b.teacher||''; fRoom.value=b.room||'';
  pickedColor=b.color||COLORS[0]; buildSwatches();
  [...weekSeg.children].forEach(btn=>btn.classList.toggle('active',btn.dataset.v===b.week));
  document.getElementById('btnDelete').style.display='block';
  editOverlay.classList.add('show');
}
function openEditTemplate(t){
  editTarget={kind:'template',id:t.id};
  document.getElementById('editTitle').textContent='Modifier le modèle';
  fSubject.value=t.subject||''; fTeacher.value=t.teacher||''; fRoom.value=t.room||'';
  pickedColor=t.color||COLORS[0]; buildSwatches();
  [...weekSeg.children].forEach(btn=>btn.classList.toggle('active',btn.dataset.v==='all'));
  document.getElementById('btnDelete').style.display='block';
  editOverlay.classList.add('show');
}
function openNewTemplate(){
  const t={id:uid(),subject:'Nouveau cours',teacher:'',room:'',color:COLORS[Math.floor(Math.random()*COLORS.length)]};
  state.templates.push(t); persist(); renderPalette();
  openEditTemplate(t);
}

weekSeg.addEventListener('click', e=>{
  const btn=e.target.closest('button'); if(!btn) return;
  [...weekSeg.children].forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
});

document.getElementById('btnSave').onclick=()=>{
  const subject=fSubject.value.trim()||'Cours', teacher=fTeacher.value.trim(), room=fRoom.value.trim();
  const week=[...weekSeg.children].find(b=>b.classList.contains('active')).dataset.v;
  if(editTarget.kind==='block'){
    const b=state.blocks.find(x=>x.id===editTarget.id);
    Object.assign(b,{subject,teacher,room,color:pickedColor,week});
  } else {
    const t=state.templates.find(x=>x.id===editTarget.id);
    Object.assign(t,{subject,teacher,room,color:pickedColor});
    renderPalette();
  }
  persist(); renderGrid(); editOverlay.classList.remove('show');
};
document.getElementById('btnDelete').onclick=()=>{
  if(editTarget.kind==='block'){
    state.blocks = state.blocks.filter(x=>x.id!==editTarget.id);
  } else {
    state.templates = state.templates.filter(x=>x.id!==editTarget.id);
    renderPalette();
  }
  persist(); renderGrid(); editOverlay.classList.remove('show');
};
editOverlay.addEventListener('click', e=>{ if(e.target===editOverlay) editOverlay.classList.remove('show'); });

document.getElementById('btnNewCourse').onclick=openNewTemplate;

/* ===== WEEK TOGGLE ===== */
document.getElementById('btnWeek').onclick=()=>{
  currentWeek = currentWeek==='A'?'B':'A';
  renderGrid();
};

/* ===== SETTINGS ===== */
const settingsOverlay=document.getElementById('settingsOverlay');
const DAY_NAMES=['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
function openSettings(){
  document.getElementById('sStart').value=state.config.startHour;
  document.getElementById('sEnd').value=state.config.endHour;
  document.getElementById('sStep').value=state.config.step;
  const dt=document.getElementById('dayToggles'); dt.innerHTML='';
  DAY_NAMES.forEach(name=>{
    const active = state.config.days.includes(name);
    const s=document.createElement('div');
    s.textContent=name.slice(0,3);
    s.style.cssText='width:auto;border-radius:10px;padding:8px 10px;font-size:12px;font-weight:600;cursor:pointer;border:1px solid var(--line);'+(active?'background:var(--accent);color:#fff;':'background:var(--panel-2);color:var(--sub);');
    s.dataset.name=name; s.dataset.active=active?'1':'0';
    s.onclick=()=>{ const a=s.dataset.active==='1'; s.dataset.active=a?'0':'1'; s.style.background=a?'var(--panel-2)':'var(--accent)'; s.style.color=a?'var(--sub)':'#fff'; };
    dt.appendChild(s);
  });
  settingsOverlay.classList.add('show');
}
document.getElementById('btnSettings').onclick=openSettings;
document.getElementById('btnCloseSettings').onclick=()=>settingsOverlay.classList.remove('show');
settingsOverlay.addEventListener('click', e=>{ if(e.target===settingsOverlay) settingsOverlay.classList.remove('show'); });

document.getElementById('btnApplySettings').onclick=()=>{
  const startHour=parseInt(document.getElementById('sStart').value,10);
  const endHour=parseInt(document.getElementById('sEnd').value,10);
  const step=parseInt(document.getElementById('sStep').value,10);
  const days=[...document.getElementById('dayToggles').children].filter(c=>c.dataset.active==='1').map(c=>c.dataset.name);
  if(endHour<=startHour || days.length===0){ alert('Vérifiez les horaires et sélectionnez au moins un jour.'); return; }
  state.config={startHour,endHour,step,days};
  persist(); renderGrid();
};
document.getElementById('btnSaveDefault').onclick=()=>{
  save(LS_DEFAULT, state);
  settingsOverlay.classList.remove('show');
};
document.getElementById('btnLoadDefault').onclick=()=>{
  const d=load(LS_DEFAULT);
  if(!d){ alert("Aucun emploi du temps de base enregistré."); return; }
  state=d; persist(); renderGrid(); renderPalette();
  settingsOverlay.classList.remove('show');
};
document.getElementById('btnClear').onclick=()=>{
  if(confirm('Effacer tous les cours de la grille actuelle ?')){
    state.blocks=[]; persist(); renderGrid();
  }
};

/* ===== INIT ===== */
renderPalette();
renderGrid();
window.addEventListener('resize', renderGrid);

if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  });
}
