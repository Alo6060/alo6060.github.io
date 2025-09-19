(function() {
  const MOBILE_MAX = 768;

  // Cargar el HTML del menú
  fetch('/menu.html')
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cargar menu.html");
      return res.text();
    })
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);
      iniciarMenu();
    })
    .catch(err => console.error(err));

  function iniciarMenu() {
    const mobileNav = document.querySelector('.mobile-nav');

    function updateNav() {
      const isMobile = window.innerWidth <= MOBILE_MAX;
      if (mobileNav) {
        mobileNav.style.display = isMobile ? 'flex' : 'none';
      }

      // Ocultar menú circular en móvil
      document.querySelectorAll('.menu-circles').forEach(el => {
        el.style.display = isMobile ? 'none' : '';
      });
    }

    // Manejar clics en los botones
    mobileNav.addEventListener('click', e => {
      const btn = e.target.closest('.nav-btn');
      if (!btn) return;
      const href = btn.getAttribute('data-href');
      if (href) {
        window.location.href = href;
      }
    });

    window.addEventListener('resize', updateNav);
    window.addEventListener('orientationchange', updateNav);
    updateNav();
  }
})();
