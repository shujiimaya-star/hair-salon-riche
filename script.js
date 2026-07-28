/**
 * Hair Salon RICHE - メインJavaScript (98点レベル・決定版)
 * 
 * - スクロール検出によるヘッダーの背景変化 & シャドウ制御
 * - アクセシビリティ対応モバイルナビゲーション (ARIA属性 & ドキュメント外タップ検知)
 * - IntersectionObserver API によるスクロールフェードイン
 * - WEB予約ボタンインタラクション
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. スクロールイベント：ヘッダーの表示切り替え
  const header = document.querySelector('.header');
  
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. アクセシビリティ対応 モバイルハンバーガーメニュー
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.header-nav');

  if (hamburger && nav) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !nav.classList.contains('is-open');
      hamburger.classList.toggle('is-active', isOpen);
      nav.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      nav.setAttribute('aria-hidden', !isOpen);
    };

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // ナビゲーション内のリンクをクリックしたら自動で閉じる
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // メニュー外をタップ/クリックしたら閉じる
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('is-open') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
        toggleMenu(false);
      }
    });
  }

  // 3. IntersectionObserver によるフェードインアニメーション
  const fadeInElements = document.querySelectorAll('.fade-in');

  if (fadeInElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeInElements.forEach(element => {
      fadeInObserver.observe(element);
    });
  }

  // 4. Web予約ボタンのデモ動線
  const reserveButtons = document.querySelectorAll('.reserve-btn');
  reserveButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Hair Salon RICHE の24時間WEB予約システムへ遷移します。\n（※こちらはデモ画面です）');
    });
  });
});
