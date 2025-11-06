// app.js — small jQuery interactions used by the assignment
$(function(){
  // insert current year
  $('#year,#year2,#year3').text(new Date().getFullYear());

  // smooth scroll for anchor links (if any)
  $('a[href^="#"]').on('click', function(e){
    var href = $(this).attr('href');
    if(href && href.startsWith('#')) {
      e.preventDefault();
      var target = $(href);
      if(target.length) {
        $('html,body').stop().animate({scrollTop: target.offset().top - 30}, 500);
      }
    }
  });

  // print button
  $('#printBtn').on('click', function(){
    window.print();
  });

  // simple contact validation (if you add a contact form later)
  $(document).on('submit','form', function(e){
    var valid = true;
    $(this).find('[required]').each(function(){
      if(!$(this).val().trim()) valid = false;
    });
    if(!valid){
      e.preventDefault();
      alert('Please fill required fields before submitting.');
    }
  });
});
// bottom-nav helper: keep one active and handle clicks
document.addEventListener('DOMContentLoaded', function(){
  const navBtns = document.querySelectorAll('.bottom-pill .nav-btn');
  if(!navBtns || navBtns.length===0) return;

  // make sure one is active on load (prefers URL)
  if (!document.querySelector('.bottom-pill .nav-btn.active')) {
    const path = window.location.pathname.toLowerCase();
    let selected = Array.from(navBtns).find(a=>{
      const href = a.getAttribute('href');
      if(!href) return false;
      const short = href.replace('.html','').toLowerCase();
      return path.includes(short);
    });
    if(!selected) selected = navBtns[0];
    selected.classList.add('active');
  }

  navBtns.forEach(btn=>{
    btn.addEventListener('click', function(e){
      // allow normal navigation for <a>, but toggle visual active class
      navBtns.forEach(b=>b.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
// === NAV helpers (paste at end of assets/js/app.js) ===
document.addEventListener('DOMContentLoaded', function () {
  // normalize current filename (home might be '/home' or '/home.html' or '/')
  const pathname = window.location.pathname || '';
  const currentFile = (pathname.split('/').pop() || '').toLowerCase().replace(/\?.*$/,'');

  // helper to normalize href to a short filename like 'home.html' or 'home'
  function normHref(href){
    if(!href) return '';
    const parts = href.split('/').pop().toLowerCase();
    return parts || href.toLowerCase();
  }

  // Activate bottom nav links (.nav-btn) by matching href filename
  document.querySelectorAll('.bottom-pill .nav-btn').forEach(function(el){
    const href = el.getAttribute('href') || '';
    const target = normHref(href);
    // If the current file matches the link, set active
    if(target && (currentFile === target || (currentFile === '' && target === 'index.html') || (currentFile === '' && target === 'index'))){
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }

    // ensure links navigate (some setups intercept anchors; we keep default navigation)
    el.addEventListener('click', function(e){
      // allow normal anchor behavior, but if anchor has no href (or single-page routing), handle safely:
      const h = el.getAttribute('href');
      if(!h || h.trim() === '#') {
        e.preventDefault();
        const dest = el.dataset.target || '';
        if(dest) window.location.href = dest;
      }
    });
  });

  // Make small left "buttons" navigable: if they are real <button> elements, map to pages
  document.querySelectorAll('.left-buttons .left-btn').forEach(function(btn){
    const text = (btn.textContent || btn.innerText || '').trim().toLowerCase();
    // map label -> file
    const map = {
      'home': 'home.html',
      'resume': 'resume.html',
      'bio-data': 'biodata.html',
      'biodata': 'biodata.html'
    };
    const dest = map[text] || btn.dataset.target || null;
    // set role & aria to improve accessibility
    btn.setAttribute('role','link');
    btn.setAttribute('tabindex','0');

    // click handler
    btn.addEventListener('click', function(){
      if(dest) window.location.href = dest;
    });
    // keyboard handler (Enter)
    btn.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if(dest) window.location.href = dest;
      }
    });

    // set active style when it matches current page
    if(dest){
      const destShort = dest.split('/').pop().toLowerCase();
      if(currentFile === destShort || (currentFile === '' && destShort === 'index.html')){
        btn.classList.add('active-left');
      } else {
        btn.classList.remove('active-left');
      }
    }
  });

  // In case you have smaller nav instances (e.g. pills under portrait that are anchors),
  // also set active class for them by href:
  document.querySelectorAll('.contact-row a, .left-buttons a').forEach(function(a){
    const href = normHref(a.getAttribute('href')||'');
    if(href && (currentFile === href || (currentFile === '' && href === 'index.html'))){
      a.classList.add('active');
    }
  });
});
