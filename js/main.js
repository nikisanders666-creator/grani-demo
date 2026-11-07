/* ГРАНИ — меню и окно выбора способа связи */
(function(){
  const nav=document.querySelector('#main-nav');
  const toggle=document.querySelector('.menu-toggle');
  const backdrop=document.querySelector('#contact-dialog');
  const dialog=backdrop.querySelector('.dialog');
  const closer=backdrop.querySelector('.dialog-close');
  let focusBefore=null;
  const closeMenu=()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Открыть меню')};
  toggle.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню')});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  function openDialog(){focusBefore=document.activeElement;backdrop.classList.add('is-open');backdrop.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';closer.focus()}
  function closeDialog(){backdrop.classList.remove('is-open');backdrop.setAttribute('aria-hidden','true');document.body.style.overflow='';if(focusBefore&&typeof focusBefore.focus==='function')focusBefore.focus()}
  document.querySelectorAll('[data-open-contact]').forEach(b=>b.addEventListener('click',openDialog));
  closer.addEventListener('click',closeDialog);
  backdrop.addEventListener('click',e=>{if(e.target===backdrop)closeDialog()});
  dialog.addEventListener('keydown',e=>{if(e.key==='Tab'){const items=[...dialog.querySelectorAll('button:not([disabled]),a[href]')];const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(backdrop.classList.contains('is-open'))closeDialog();else closeMenu()}});
})();
