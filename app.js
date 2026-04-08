document.addEventListener('DOMContentLoaded', function () {
  const pathname = window.location.pathname || '';
  const currentFile = (pathname.split('/').pop() || '').toLowerCase().replace(/\?.*$/, '');

  document.querySelectorAll('.bottom-pill .nav-btn').forEach(function (el) {
    const href = (el.getAttribute('href') || '').split('/').pop().toLowerCase();
    if (href && (currentFile === href || (currentFile === '' && href === 'home.html'))) {
      document.querySelectorAll('.bottom-pill .nav-btn').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
    }
    el.addEventListener('click', function () {
      document.querySelectorAll('.bottom-pill .nav-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  const yr = new Date().getFullYear();
  document.querySelectorAll('#year,#year2,#year3').forEach(el => el.textContent = yr);

  const printBtn = document.getElementById('printBtn');
  if (printBtn) printBtn.addEventListener('click', () => window.print());
});