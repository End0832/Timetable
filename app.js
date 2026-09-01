/* ===== Emploi du temps — logique ===== */
const LS_ACTIVE='edt_active_v3', LS_DEFAULT='edt_default_v3';
const COLORS=['#7ED9A6','#E38FC5','#D9CB6A','#7EC8E3','#A99BE8','#C9CDD6','#8E7FE0','#4E6FC0','#F0A868','#DDE1EA'];
const ALLDAYS=['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
const HEADH=34;
let ROWH=58; // recalculé dynamiquement pour éviter le scroll

function defaultRows(){
  return [
    {start:'07:55',end:'08:50'},{start:'08:50',end:'09:45'},{start:'09:45',end:'10:00'},
    {start:'10:00',end:'10:55'},{start:'10:55',end:'11:50'},{start:'11:50',end:'12:45'},
    {start:'12:45',end:'13:40'},{start:'13:40',end:'14:35'},{start:'14:35',end:'15:30'},
    {start:'15:30',end:'15:45'},{start:'15:45',end:'16:40'},{start:'16:40',end:'17:35'},
    {start:'17:35',end:'18:30'},
  ];
}
function defaultTemplates(){
  return [
    {id:'t1',subject:'HGGSP',teacher:'Sokhn S.',room:'',color:'#DDE1EA'},
    {id:'t2',subject:'FRANCAIS',teacher:'Dubois A.',room:'Salle 109',color:'#7ED9A6'},
    {id:'t3',subject:'HISTOIRE-GEOGRAPHIE',teacher:'Menanteau F.',room:'Salle 109',color:'#E38FC5'},
    {id:'t4',subject:'PH-CH',teacher:'Condette A.',room:'',color:'#D9CB6A'},
    {id:'t5',subject:'ED.PHYSIQUE & SPORTIVE',teacher:'Talleu L.',room:'Salle EPS',color:'#7EC8E3'},
    {id:'t6',subject:'ENSSCI',teacher:'',room:'Salle 109',color:'#A99BE8'},
    {id:'t7',subject:'AGL1',teacher:'Wainstein N.',room:'Salle 109',color:'#C9CDD6'},
    {id:'t8',subject:'ANGLAIS LV SECTION',teacher:'Manzah A.',room:'Salle 109',color:'#D98FC0'},
    {id:'t9',subject:'DEVOIR SURVEILLE',teacher:'N. Barre VS L.',room:'Salle 001',color:'#8E7FE0'},
    {id:'t10',subject:'MATHS SPE',teacher:'Grimonprez M.',room:'',color:'#DDE1EA'},
    {id:'t11',subject:'ALLEMAND LV2',teacher:'Halit A.',room:'Salle 114',color:'#4E6FC0'},
    {id:'t12',subject:'ACCOMPAGNEMENT PERSO.',teacher:'',room:'Salle 109',color:'#C7B8F0'},
  ];
}
// L'unité de placement/redimensionnement est le DEMI-créneau : rowStart/rowSpan sont exprimés en demi-créneaux.
function defaultState(){
  return {config:{days:['Lundi','Mardi','Mercredi','Jeudi','Vendredi'],rows:defaultRows()},templates:defaultTemplates(),blocks:[]};
}
function load(k){try{const r=localStorage.getItem(k);return r?JSON.parse(r):null;}catch(e){return null;}}
function save(k,v){localStorage.setItem(k,JSON.stringify(v));}
function persist(){save(LS_ACTIVE,state);}
function uid(){return 'b'+Math.random().toString(36).slice(2,9);}
function esc(s){return (s||'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));}

let state = load(LS_ACTIVE) || (()=>{const s=defaultState();save(LS_ACTIVE,s);return s;})();

/* ===== RENDER ===== */
const scheduleWrap=document.getElementById('scheduleWrap');
const timeCol=document.getElementById('timeCol');
const board=document.getElementById('board');
const boardHeader=document.getElementById('boardHeader');
const boardBody=document.getElementById('boardBody');

function nRows(){return state.config.rows.length;}
function nDays(){return state.config.days.length;}
function nUnits(){return nRows()*2;} // demi-créneaux
function unitPx(){return ROWH/2;}

function computeRowH(){
  const availH = scheduleWrap.clientHeight - HEADH;
  ROWH = Math.max(24, Math.floor(availH / Math.max(1,nRows())));
}

function clusterDayBlocks(dayBlocks){
  const parent=dayBlocks.map((_,i)=>i);
  function find(x){return parent[x]===x?x:(parent[x]=find(parent[x]));}
  function union(a,b){parent[find(a)]=find(b);}
  for(let i=0;i<dayBlocks.length;i++)for(let j=i+1;j<dayBlocks.length;j++){
    const a=dayBlocks[i],b=dayBlocks[j];
    if(a.rowStart<b.rowStart+b.rowSpan && b.rowStart<a.rowStart+a.rowSpan) union(i,j);
  }
  const groups={};
  dayBlocks.forEach((b,i)=>{const r=find(i);(groups[r]=groups[r]||[]).push(b);});
  return Object.values(groups);
}
function assignColumns(group){
  if(group.length===1) return [{b:group[0],col:0,cols:1}];
  const As=group.filter(b=>b.week==='A');
  const Bs=group.filter(b=>b.week==='B');
  const others=group.filter(b=>b.week!=='A'&&b.week!=='B');
  const ordered=[...As,...others,...Bs];
  const cols=ordered.length;
  return ordered.map((b,idx)=>({b,col:idx,cols}));
}

function renderAll(){
  computeRowH();
  const rows=state.config.rows, days=state.config.days;
  timeCol.innerHTML='';
  rows.forEach(r=>{
    const d=document.createElement('div');
    d.className='timeRow'; d.style.height=ROWH+'px'; d.style.lineHeight=(ROWH<40?ROWH+'px':'14px');
    d.textContent=r.start;
    timeCol.appendChild(d);
  });
  boardHeader.innerHTML='';
  days.forEach(dname=>{
    const h=document.createElement('div');
    h.className='dayhead'; h.textContent=dname;
    boardHeader.appendChild(h);
  });
  boardBody.style.height=(rows.length*ROWH)+'px';
  boardBody.innerHTML='';
  for(let i=0;i<=rows.length;i++){
    const l=document.createElement('div');
    l.className='rowline'; l.style.top=(i*ROWH)+'px';
    boardBody.appendChild(l);
  }
  for(let i=0;i<=days.length;i++){
    const l=document.createElement('div');
    l.className='collabel'; l.style.left=(i*100/days.length)+'%';
    boardBody.appendChild(l);
  }
  const highlight=document.createElement('div');
  highlight.id='dragHighlight';
  highlight.style.cssText='position:absolute;display:none;background:rgba(94,125,255,.12);border:2px dashed var(--accent);border-radius:8px;pointer-events:none;z-index:1;';
  boardBody.appendChild(highlight);

  for(let di=0; di<days.length; di++){
    const dayBlocks = state.blocks.filter(b=>b.day===di).sort((a,b)=>a.rowStart-b.rowStart);
    clusterDayBlocks(dayBlocks).forEach(group=>{
      assignColumns(group).forEach(({b,col,cols})=>renderBlock(b,di,col,cols,days.length));
    });
  }
}

function showHighlight(day,rowStartUnits,rowSpanUnits,totalDays){
  const hl=document.getElementById('dragHighlight');
  if(!hl) return;
  const dayW=100/totalDays;
  hl.style.display='block';
  hl.style.left='calc('+(day*dayW)+'% + 2px)';
  hl.style.width='calc('+dayW+'% - 4px)';
  hl.style.top=(rowStartUnits*unitPx())+'px';
  hl.style.height=(rowSpanUnits*unitPx())+'px';
}
function hideHighlight(){ const hl=document.getElementById('dragHighlight'); if(hl) hl.style.display='none'; }

function renderBlock(b, dayIndex, colIndex, totalCols, totalDays){
  const dayW=100/totalDays;
  const w = dayW/totalCols;
  const left = dayIndex*dayW + colIndex*w;
  const el=document.createElement('div');
  el.className='block';
  el.dataset.id=b.id;
  el.style.background=b.color;
  el.style.left='calc('+left+'% + 2px)';
  el.style.width='calc('+w+'% - 4px)';
  el.style.top=(b.rowStart*unitPx()+2)+'px';
  el.style.height=(b.rowSpan*unitPx()-4)+'px';
  const small = ROWH<44;
  el.innerHTML=`<b style="${small?'font-size:10.5px;':''}">${esc(b.subject||'Cours')}</b>${(!small&&b.teacher)?`<div>${esc(b.teacher)}</div>`:''}${(!small&&b.room)?`<div class="room">${esc(b.room)}</div>`:''}${b.week!=='all'?`<span class="wtag">${b.week}</span>`:''}<div class="handle top"></div><div class="handle bottom"></div>`;
  boardBody.appendChild(el);
  attachBlockInteractions(el,b);
}

/* ===== INTERACTIONS ===== */
function getMetrics(){
  const rect=boardBody.getBoundingClientRect();
  return {rect, colW:rect.width/nDays()};
}
function clampDay(v){return Math.max(0,Math.min(nDays()-1,v));}

function attachBlockInteractions(el,b){
  const top=el.querySelector('.handle.top'), bottom=el.querySelector('.handle.bottom');

  function startDrag(e, kind){
    e.stopPropagation();
    const startX=e.clientX, startY=e.clientY;
    const origDay=b.day, origStart=b.rowStart, origSpan=b.rowSpan;
    let moved=false;
    el.setPointerCapture(e.pointerId);
    el.classList.add('dragging');
    const {colW}=getMetrics();
    function onMove(ev){
      const dx=ev.clientX-startX, dy=ev.clientY-startY;
      if(Math.abs(dx)>4||Math.abs(dy)>4) moved=true;
      const dUnit=Math.round(dy/unitPx());
      let day=b.day, rowStart=b.rowStart, rowSpan=b.rowSpan;
      if(kind==='move'){
        const dDay=Math.round(dx/colW);
        day=clampDay(origDay+dDay);
        rowStart=Math.max(0,Math.min(nUnits()-origSpan, origStart+dUnit));
        rowSpan=origSpan;
      } else if(kind==='top'){
        rowStart=Math.max(0, Math.min(origStart+origSpan-1, origStart+dUnit));
        rowSpan=origSpan+(origStart-rowStart);
        day=origDay;
      } else {
        rowSpan=Math.max(1, Math.min(nUnits()-origStart, origSpan+dUnit));
        rowStart=origStart; day=origDay;
      }
      b.day=day; b.rowStart=rowStart; b.rowSpan=rowSpan;
      showHighlight(day,rowStart,rowSpan,nDays());
      el.style.top=(rowStart*unitPx()+2)+'px';
      el.style.height=(rowSpan*unitPx()-4)+'px';
    }
    function onUp(){
      document.removeEventListener('pointermove',onMove);
      document.removeEventListener('pointerup',onUp);
      el.classList.remove('dragging');
      hideHighlight();
      persist();
      if(!moved && kind==='move'){ openEditBlock(b); }
      renderAll();
    }
    document.addEventListener('pointermove',onMove);
    document.addEventListener('pointerup',onUp);
  }
  el.addEventListener('pointerdown', e=>startDrag(e,'move'));
  top.addEventListener('pointerdown', e=>startDrag(e,'top'));
  bottom.addEventListener('pointerdown', e=>startDrag(e,'bottom'));
}

/* ===== PALETTE / DRAWER ===== */
const drawer=document.getElementById('drawer');
document.getElementById('fabAdd').onclick=()=>drawer.classList.toggle('open');

function renderPalette(){
  const list=document.getElementById('paletteList');
  list.innerHTML='';
  state.templates.forEach(t=>{
    const el=document.createElement('div');
    el.className='chip';
    el.innerHTML=`<span class="dot" style="background:${t.color}"></span>${esc(t.subject)}`;
    attachPaletteDrag(el,t);
    list.appendChild(el);
  });
}

function attachPaletteDrag(el,tmpl){
  el.addEventListener('pointerdown', e=>{
    const startX=e.clientX, startY=e.clientY;
    let dragging=false, ghost=null;
    el.setPointerCapture(e.pointerId);
    function onMove(ev){
      if(!dragging && (Math.abs(ev.clientX-startX)>6||Math.abs(ev.clientY-startY)>6)){
        dragging=true;
        ghost=document.createElement('div');
        ghost.style.cssText='position:fixed;width:150px;height:'+(ROWH*2)+'px;border-radius:10px;padding:6px 8px;font-size:12px;font-weight:700;z-index:999;pointer-events:none;box-shadow:0 8px 20px rgba(0,0,0,.25);background:'+tmpl.color+';color:#1a1d27;opacity:.9;';
        ghost.textContent=tmpl.subject;
        document.body.appendChild(ghost);
        drawer.classList.remove('open');
      }
      if(dragging && ghost){
        ghost.style.left=(ev.clientX-75)+'px'; ghost.style.top=(ev.clientY-20)+'px';
        const {rect,colW}=getMetrics();
        const x=ev.clientX-rect.left, y=ev.clientY-rect.top;
        if(x>=0&&y>=0&&x<rect.width&&y<rect.height){
          const day=clampDay(Math.floor(x/colW));
          const rowStart=Math.max(0,Math.min(nUnits()-2,Math.round(y/unitPx())));
          showHighlight(day,rowStart,2,nDays());
        } else hideHighlight();
      }
    }
    function onUp(ev){
      document.removeEventListener('pointermove',onMove);
      document.removeEventListener('pointerup',onUp);
      hideHighlight();
      if(dragging && ghost){
        const {rect,colW}=getMetrics();
        const x=ev.clientX-rect.left, y=ev.clientY-rect.top;
        if(x>=0 && y>=0 && x<rect.width && y<rect.height){
          const day=clampDay(Math.floor(x/colW));
          const rowStart=Math.max(0,Math.min(nUnits()-2,Math.round(y/unitPx())));
          state.blocks.push({id:uid(),day,rowStart,rowSpan:2,week:'all',subject:tmpl.subject,teacher:tmpl.teacher,room:tmpl.room,color:tmpl.color});
          persist(); renderAll();
        }
        ghost.remove();
      } else {
        openEditTemplate(tmpl);
      }
    }
    document.addEventListener('pointermove',onMove);
    document.addEventListener('pointerup',onUp);
  });
}

/* ===== EDIT SHEET ===== */
const editOverlay=document.getElementById('editOverlay');
const fSubject=document.getElementById('fSubject'), fTeacher=document.getElementById('fTeacher'), fRoom=document.getElementById('fRoom');
const swatchesEl=document.getElementById('swatches'), weekSeg=document.getElementById('weekSeg'), weekField=document.getElementById('weekField');
let editTarget=null, pickedColor=COLORS[0];

function buildSwatches(){
  swatchesEl.innerHTML='';
  COLORS.forEach(c=>{
    const s=document.createElement('div');
    s.className='swatch'+(c===pickedColor?' sel':'');
    s.style.background=c;
    s.onclick=()=>{pickedColor=c;buildSwatches();};
    swatchesEl.appendChild(s);
  });
}
function openEditBlock(b){
  editTarget={kind:'block',id:b.id};
  document.getElementById('editTitle').textContent='Modifier le cours';
  fSubject.value=b.subject||''; fTeacher.value=b.teacher||''; fRoom.value=b.room||'';
  pickedColor=b.color||COLORS[0]; buildSwatches();
  weekField.style.display='block';
  [...weekSeg.children].forEach(btn=>btn.classList.toggle('active',btn.dataset.v===b.week));
  document.getElementById('btnDelete').style.display='flex';
  editOverlay.classList.add('show');
}
function openEditTemplate(t){
  editTarget={kind:'template',id:t.id};
  document.getElementById('editTitle').textContent='Modifier le modèle';
  fSubject.value=t.subject||''; fTeacher.value=t.teacher||''; fRoom.value=t.room||'';
  pickedColor=t.color||COLORS[0]; buildSwatches();
  weekField.style.display='none';
  document.getElementById('btnDelete').style.display='flex';
  editOverlay.classList.add('show');
}
document.getElementById('btnNewCourse').onclick=()=>{
  const t={id:uid(),subject:'Nouveau cours',teacher:'',room:'',color:COLORS[Math.floor(Math.random()*COLORS.length)]};
  state.templates.push(t); persist(); renderPalette(); openEditTemplate(t);
};
weekSeg.addEventListener('click', e=>{
  const btn=e.target.closest('button'); if(!btn) return;
  [...weekSeg.children].forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
});
document.getElementById('btnSave').onclick=()=>{
  const subject=fSubject.value.trim()||'Cours', teacher=fTeacher.value.trim(), room=fRoom.value.trim();
  if(editTarget.kind==='block'){
    const b=state.blocks.find(x=>x.id===editTarget.id);
    const week=[...weekSeg.children].find(x=>x.classList.contains('active')).dataset.v;
    Object.assign(b,{subject,teacher,room,color:pickedColor,week});
  } else {
    const t=state.templates.find(x=>x.id===editTarget.id);
    Object.assign(t,{subject,teacher,room,color:pickedColor});
    renderPalette();
  }
  persist(); renderAll(); editOverlay.classList.remove('show');
};
document.getElementById('btnDelete').onclick=()=>{
  if(editTarget.kind==='block') state.blocks=state.blocks.filter(x=>x.id!==editTarget.id);
  else { state.templates=state.templates.filter(x=>x.id!==editTarget.id); renderPalette(); }
  persist(); renderAll(); editOverlay.classList.remove('show');
};
editOverlay.addEventListener('click', e=>{ if(e.target===editOverlay) editOverlay.classList.remove('show'); });

/* ===== SETTINGS ===== */
const settingsOverlay=document.getElementById('settingsOverlay');
function openSettings(){
  const dt=document.getElementById('dayToggles'); dt.innerHTML='';
  ALLDAYS.forEach(name=>{
    const active=state.config.days.includes(name);
    const s=document.createElement('span');
    s.className='daytoggle'; s.textContent=name.slice(0,3);
    s.style.background=active?'var(--accent)':'var(--panel-2)';
    s.style.color=active?'#fff':'var(--sub)';
    s.dataset.name=name; s.dataset.active=active?'1':'0';
    s.onclick=()=>{const a=s.dataset.active==='1'; s.dataset.active=a?'0':'1'; s.style.background=a?'var(--panel-2)':'var(--accent)'; s.style.color=a?'var(--sub)':'#fff';};
    dt.appendChild(s);
  });
  renderRowsEditor();
  settingsOverlay.classList.add('show');
}
function renderRowsEditor(){
  const re=document.getElementById('rowsEditor'); re.innerHTML='';
  state.config.rows.forEach((r,i)=>{
    const div=document.createElement('div'); div.className='rowedit';
    div.innerHTML=`<input type="time" value="${r.start}" data-f="start" data-i="${i}">
      <input type="time" value="${r.end}" data-f="end" data-i="${i}">
      <button data-act="up" data-i="${i}">↑</button>
      <button data-act="down" data-i="${i}">↓</button>
      <button data-act="del" data-i="${i}">✕</button>`;
    re.appendChild(div);
  });
  re.querySelectorAll('input').forEach(inp=>{
    inp.onchange=()=>{ state.config.rows[+inp.dataset.i][inp.dataset.f]=inp.value; };
  });
  re.querySelectorAll('button').forEach(btn=>{
    btn.onclick=()=>{
      const i=+btn.dataset.i, rows=state.config.rows;
      if(btn.dataset.act==='del') rows.splice(i,1);
      else if(btn.dataset.act==='up' && i>0) [rows[i-1],rows[i]]=[rows[i],rows[i-1]];
      else if(btn.dataset.act==='down' && i<rows.length-1) [rows[i+1],rows[i]]=[rows[i],rows[i+1]];
      renderRowsEditor();
    };
  });
}
document.getElementById('btnAddRow').onclick=()=>{
  state.config.rows.push({start:'08:00',end:'09:00'});
  renderRowsEditor();
};
document.getElementById('btnSettings').onclick=openSettings;
document.getElementById('btnCloseSettings').onclick=()=>settingsOverlay.classList.remove('show');
settingsOverlay.addEventListener('click', e=>{ if(e.target===settingsOverlay) settingsOverlay.classList.remove('show'); });
document.getElementById('btnApplySettings').onclick=()=>{
  const days=[...document.getElementById('dayToggles').children].filter(c=>c.dataset.active==='1').map(c=>c.dataset.name);
  if(days.length===0 || state.config.rows.length===0){ alert('Sélectionnez au moins un jour et un créneau.'); return; }
  state.config.days=days;
  persist(); renderAll();
};
document.getElementById('btnSaveDefault').onclick=()=>{ save(LS_DEFAULT,state); settingsOverlay.classList.remove('show'); };
document.getElementById('btnLoadDefault').onclick=()=>{
  const d=load(LS_DEFAULT);
  if(!d){ alert("Aucun emploi du temps de base enregistré."); return; }
  state=d; persist(); renderAll(); renderPalette();
  settingsOverlay.classList.remove('show');
};
document.getElementById('btnClear').onclick=()=>{
  if(confirm('Effacer tous les cours de la grille actuelle ?')){ state.blocks=[]; persist(); renderAll(); }
};

/* ===== INIT ===== */
renderPalette();
renderAll();
window.addEventListener('resize', renderAll);
if('serviceWorker' in navigator){ window.addEventListener('load', ()=>navigator.serviceWorker.register('sw.js').catch(()=>{})); }
