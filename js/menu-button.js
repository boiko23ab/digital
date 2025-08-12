
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.has-submenu');

  const getBtn  = (li) => li.querySelector('.menu-toggle');
  const getPane = (li) => {
    const id = getBtn(li)?.getAttribute('aria-controls');
    return id ? document.getElementById(id) : null;
  };

  const setOpen = (li, open) => {
    const btn  = getBtn(li);
    const pane = getPane(li);
    li.classList.toggle('open', open);
    if (btn)  btn.setAttribute('aria-expanded', String(open));
    if (pane) {
      pane.setAttribute('aria-hidden', String(!open));
      pane.inert = !open;
      if (open) {
        
        const first = pane.querySelector('a, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (first) first.focus({ preventScroll: true });
      }
    }
  };

  const closeAll = (except) => {
    items.forEach((li) => { if (li !== except) setOpen(li, false); });
  };

  items.forEach((li) => {
    const btn = getBtn(li);
    if (!btn) return;

   
    btn.addEventListener('click', () => {
      const willOpen = !li.classList.contains('open');
      closeAll(li);
      setOpen(li, willOpen);
    });

    
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const willOpen = !li.classList.contains('open');
        closeAll(li);
        setOpen(li, willOpen);
      }
    });
  });

 
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-submenu')) closeAll();
  });


  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
});




