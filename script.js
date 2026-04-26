// =====================================================
// script.js — Kaktüs Yazılım Ana Sayfa Mantığı
// =====================================================

// ----- 1. LOADING EKRANI -----
window.addEventListener('load', function () {
  var ls = document.getElementById('loadingScreen');
  if (!ls) return;
  setTimeout(function () {
    ls.classList.add('hidden-out');
    setTimeout(function () { ls.remove(); }, 600);
  }, 700);
});

// ----- 2. KARANLIK MOD -----
(function () {
  var dm = localStorage.getItem('darkMode');
  var html = document.documentElement;
  if (dm === 'enabled' || (dm === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
  }
})();

var darkBtn = document.getElementById('darkModeToggle');
if (darkBtn) {
  function updateDarkIcon() {
    var isDark = document.documentElement.classList.contains('dark');
    darkBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }
  updateDarkIcon();
  darkBtn.addEventListener('click', function () {
    var html = document.documentElement;
    var isDark = html.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    updateDarkIcon();
  });
}

// ----- 3. MOBİL MENÜ -----
var mobileBtn = document.getElementById('mobileMenuBtn');
var mobileMenu = document.getElementById('mobileMenu');
if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener('click', function () {
    var hidden = mobileMenu.classList.toggle('hidden');
    var icon = mobileBtn.querySelector('i');
    if (icon) {
      icon.className = hidden ? 'fas fa-bars' : 'fas fa-times';
    }
  });
  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      mobileMenu.classList.add('hidden');
      var icon = mobileBtn.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    });
  });
}

// ----- 4. NAVİGASYON SCROLL -----
window.addEventListener('scroll', function () {
  var nav = document.getElementById('mainNav');
  if (!nav) return;
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ----- 5. SCROLL REVEAL (.sr -> .visible) -----
function revealOnScroll() {
  var elements = document.querySelectorAll('.sr:not(.visible)');
  var windowH = window.innerHeight;
  elements.forEach(function (el) {
    var top = el.getBoundingClientRect().top;
    if (top < windowH - 80) {
      el.classList.add('visible');
    }
  });
}
// Hero elementlerini sayfa açılışında hemen göster
window.addEventListener('DOMContentLoaded', function () {
  revealOnScroll();
  // Hero içindeki .sr öğelerini gecikme olmadan aktif et
  document.querySelectorAll('#anasayfa .sr').forEach(function (el) {
    el.classList.add('visible');
  });
});
window.addEventListener('scroll', revealOnScroll, { passive: true });
window.addEventListener('resize', revealOnScroll, { passive: true });

// ----- 5b. COUNT-UP ANİMASYONU -----
(function () {
  var counted = false;
  function countUp() {
    if (counted) return;
    var nums = document.querySelectorAll('.hero-stat-num[data-target]');
    if (!nums.length) return;
    var first = nums[0].getBoundingClientRect().top;
    if (first > window.innerHeight - 60) return;
    counted = true;
    nums.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-target'));
      var duration = 1800;
      var start = performance.now();
      function tick(now) {
        var elapsed = now - start;
        var progress = Math.min(elapsed / duration, 1);
        // easeOutExpo
        var ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        var current = Math.floor(ease * target);
        el.textContent = current + '+';
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }
  window.addEventListener('DOMContentLoaded', countUp);
  window.addEventListener('scroll', countUp, { passive: true });
})();

// ----- 5c. BUTON HOVER MİKRO-ETKİLEŞİM -----
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(function (btn) {
    var arrow = btn.querySelector('.fa-arrow-right');
    if (!arrow) return;
    btn.addEventListener('mouseenter', function () {
      arrow.style.transform = 'translateX(3px)';
    });
    btn.addEventListener('mouseleave', function () {
      arrow.style.transform = 'translateX(0)';
    });
  });
});

// ----- 6. İLETİŞİM FORMU -----
var contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = contactForm.querySelector('button[type="submit"]');
    var orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Gönderildi!';
    btn.style.background = '#16a34a';
    setTimeout(function () {
      btn.innerHTML = orig;
      btn.style.background = '';
      contactForm.reset();
    }, 2500);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var toggleBtn  = document.getElementById('toggleChat');
  var chatWindow = document.getElementById('chatWindow');
  var closeBtn   = document.getElementById('closeChat');
  var clearBtn   = document.getElementById('clearChat');
  var chatIcon   = document.getElementById('chatIcon');
  var chatBadge  = document.getElementById('chatBadge');
  var messagesEl = document.getElementById('chatMessages');
  var userInput  = document.getElementById('userMessage');
  var sendBtn    = document.getElementById('sendMessage');
  var quickBtns  = document.querySelectorAll('.quickQuestion');
  var tsEl       = document.getElementById('chatTimestamp');

  if (!toggleBtn) return;

  var now = new Date();
  if (tsEl) tsEl.textContent = 'Bugün ' + now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');

  function openChat() {
    chatWindow.classList.remove('hidden');
    chatWindow.style.transform = 'scale(1)';
    chatWindow.style.opacity = '1';
    chatIcon.textContent = '✕';
    if (chatBadge) chatBadge.style.display = 'none';
    setTimeout(function(){ if(userInput) userInput.focus(); }, 300);
  }
  function closeChat() {
    chatWindow.style.transform = 'scale(.92)';
    chatWindow.style.opacity = '0';
    setTimeout(function(){
      chatWindow.classList.add('hidden');
      chatWindow.style.transform = '';
      chatWindow.style.opacity = '';
    }, 250);
    chatIcon.textContent = '🌵';
  }

  toggleBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (chatWindow.classList.contains('hidden')) openChat();
    else closeChat();
  });

  closeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    closeChat();
  });

  chatWindow.addEventListener('click', function (e) { e.stopPropagation(); });

  document.addEventListener('click', function () {
    if (!chatWindow.classList.contains('hidden')) closeChat();
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var children = messagesEl.children;
      while (children.length > 2) messagesEl.removeChild(children[children.length - 1]);
    });
  }

  setTimeout(function () {
    openChat();
  }, 2000);

  function addMsg(text, isUser) {
    var wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;gap:.5rem;align-items:flex-start;animation:fadeInMsg .3s ease' + (isUser ? ';flex-direction:row-reverse' : '');
    var icon = '';
    if (!isUser) {
      icon = '<div style="width:28px;height:28px;background:var(--accent-glow);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.85rem">🌵</div>';
    }
    var bubble = document.createElement('div');
    bubble.style.cssText = 'padding:.65rem 1rem;font-size:.82rem;line-height:1.6;max-width:82%;border-radius:' +
      (isUser ? '1rem 1rem 0 1rem;background:var(--accent);color:#fff' : '0 1rem 1rem 1rem;background:var(--surface);border:1px solid var(--border);color:var(--text)');
    bubble.innerHTML = text;
    wrap.innerHTML = icon;
    wrap.appendChild(bubble);
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    var t = document.createElement('div');
    t.id = 'typingIndicator';
    t.style.cssText = 'display:flex;gap:.5rem;align-items:center';
    t.innerHTML = '<div style="width:28px;height:28px;background:var(--accent-glow);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:.85rem">🌵</div>' +
      '<div style="background:var(--surface);border:1px solid var(--border);border-radius:0 1rem 1rem 1rem;padding:.65rem 1rem;display:flex;gap:5px">' +
      '<span style="width:6px;height:6px;background:var(--muted);border-radius:50%;animation:pulse .8s infinite"></span>' +
      '<span style="width:6px;height:6px;background:var(--muted);border-radius:50%;animation:pulse .8s .15s infinite"></span>' +
      '<span style="width:6px;height:6px;background:var(--muted);border-radius:50%;animation:pulse .8s .3s infinite"></span>' +
      '</div>';
    messagesEl.appendChild(t);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
  function hideTyping() {
    var t = document.getElementById('typingIndicator');
    if (t) t.remove();
  }

  var responses = {
    hizmet: { text: '<strong>Hizmetlerimiz:</strong><br>• Web Geliştirme<br>• UI/UX Tasarım<br>• Dijital Pazarlama<br>• Altyapı & Cloud<br><br>Detay için <em>Hizmetler</em> bölümüne göz atabilirsiniz.', section: 'hizmetler' },
    surec:  { text: '<strong>İş Sürecimiz:</strong><br>1️⃣ Analiz & Planlama<br>2️⃣ Tasarım<br>3️⃣ Geliştirme<br>4️⃣ Yayın & Destek<br><br>Her adımda şeffaf iletişim sağlıyoruz.', section: null },
    fiyat:  { text: 'Fiyatlarımız projenin kapsamına göre belirlenir. <strong>Ücretsiz teklif</strong> almak için iletişim formumuzu doldurabilirsiniz! 📋', section: 'iletisim' },
    iletis: { text: 'İletişim formumuzu doldurarak bize ulaşabilirsiniz. En kısa sürede size dönüş yapacağız! 📬', section: 'iletisim' },
    proje:  { text: 'Web uygulamaları, mobil uygulamalar ve SaaS platformları geliştirdik. <strong>Projeler</strong> bölümüne göz atabilirsiniz! 🚀', section: 'projeler' },
    merhaba:{ text: 'Hoş geldiniz! 👋 Size nasıl yardımcı olabilirim? Hizmetlerimiz, projelerimiz veya fiyatlandırma hakkında sorabilirsiniz.', section: null },
    tesekkur:{ text: 'Rica ederim! Başka bir sorunuz olursa her zaman buradayım 😊', section: null }
  };

  function normalize(s) {
    return s.toLocaleLowerCase('tr-TR').replace(/[üÜ]/g,'u').replace(/[çÇ]/g,'c').replace(/[şŞ]/g,'s').replace(/[ığİĞ]/g,'i').replace(/[öÖ]/g,'o');
  }

  function scrollTo(id) {
    if (!id) return;
    var el = document.getElementById(id);
    var nav = document.getElementById('mainNav');
    if (el) window.scrollTo({ top: el.offsetTop - (nav ? nav.offsetHeight : 0) - 10, behavior: 'smooth' });
  }

  function handleQuestion(q) {
    var n = normalize(q);
    var resp = null;
    if (n.includes('merhaba') || n.includes('selam') || n.includes('hey')) resp = responses.merhaba;
    else if (n.includes('tesekkur') || n.includes('sagol') || n.includes('eyv')) resp = responses.tesekkur;
    else if (n.includes('hizmet') || n.includes('web') || n.includes('tasarim') || n.includes('cloud')) resp = responses.hizmet;
    else if (n.includes('surec') || n.includes('nasil') || n.includes('adim')) resp = responses.surec;
    else if (n.includes('fiyat') || n.includes('ucret') || n.includes('maliyet') || n.includes('teklif')) resp = responses.fiyat;
    else if (n.includes('iletis') || n.includes('telefon') || n.includes('mail') || n.includes('ulasim')) resp = responses.iletis;
    else if (n.includes('proje') || n.includes('portfoy') || n.includes('calisma') || n.includes('referans')) resp = responses.proje;
    else resp = { text: 'Bu konuda size en iyi şekilde yardımcı olmak için lütfen iletişim formumuzu doldurun veya hızlı butonlardan birini deneyin! 💬', section: 'iletisim' };

    showTyping();
    var delay = 600 + Math.random() * 600;
    setTimeout(function () {
      hideTyping();
      addMsg(resp.text, false);
      if (resp.section) {
        setTimeout(function () { scrollTo(resp.section); }, 600);
      }
    }, delay);
  }

  function sendUserMessage() {
    var text = (userInput.value || '').trim();
    if (!text) return;
    addMsg(text, true);
    userInput.value = '';
    handleQuestion(text);
  }

  sendBtn.addEventListener('click', sendUserMessage);
  userInput.addEventListener('keypress', function (e) { if (e.key === 'Enter') sendUserMessage(); });
  quickBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var q = btn.textContent.replace(/^[^\w]+/, '').trim();
      addMsg(q, true);
      handleQuestion(q);
    });
  });
});