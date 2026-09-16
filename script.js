(function(){
  const params = new URLSearchParams(location.search);
  const utmKeys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid'];
  const found = {};
  utmKeys.forEach(k => { if(params.get(k)) found[k] = params.get(k); });
  if(Object.keys(found).length) sessionStorage.setItem('vr_attribution', JSON.stringify(found));
  let saved = {};
  try { saved = JSON.parse(sessionStorage.getItem('vr_attribution') || '{}'); } catch(e) {}
  document.querySelectorAll('a[data-internal]').forEach(link => {
    const url = new URL(link.href, location.origin);
    Object.entries(saved).forEach(([k,v]) => url.searchParams.set(k,v));
    link.href = url.pathname + url.search + url.hash;
  });

  const prod = /(^|\.)vitorrangel\.com\.br$/.test(location.hostname);
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ dataLayer.push(arguments); };
  if(prod){
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17908081101';
    document.head.appendChild(tag);
    gtag('js', new Date());
    gtag('config', 'AW-17908081101');
  }
  document.querySelectorAll('a[href^="https://wa.me/5511964787505"]').forEach(link => {
    link.addEventListener('click', function(){
      if(!prod) return;
      gtag('event','conversion',{send_to:'AW-17908081101/ucerCLzF9d0cEM3DnttC'});
      if(document.body.dataset.page === 'exterior'){
        gtag('event','whatsapp_click_exterior',{page_location:location.href});
      }
    });
  });
})();
