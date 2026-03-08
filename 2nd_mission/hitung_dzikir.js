// hitung_dzikir.js
// Counter dzikir — Subhanallah, Alhamdulillah, Allahuakbar
//
// Cara kerja:
// initZikirSection() dipanggil dari index.html setelah HTML komponen
// selesai diinject lewat loadComponent(). Setelah itu tiap kartu
// jalan mandiri, ga ada state yang dishare antar kartu.
//
// Teks notifikasi target tercapai diambil dari i18n global (global.js).
// Subtitle per kartu juga ikut update waktu bahasa diganti.

function initZikirSection() {

  document.querySelectorAll('.zikir-card').forEach(card => {

    // State per kartu — counter dan target masing-masing berdiri sendiri
    let count  = 0;
    let target = 33;

    // Ambil semua elemen yang perlu dimanipulasi
    const counter    = card.querySelector('.zikir-counter');
    const progFill   = card.querySelector('.zikir-progress-fill');
    const notif      = card.querySelector('.zikir-notification');
    const targetDisp = card.querySelector('.target-display');
    const btnInc     = card.querySelector('.btn-increment');
    const btnReset   = card.querySelector('.btn-reset');
    const targetBtns = card.querySelectorAll('.btn-target');


    // Animasi angka counter pas diklik — efek "bounce" kecil biar kerasa hidup
    function animateCounter() {
      counter.classList.remove('pulse');
      void counter.offsetWidth; // paksa browser reflow biar animasi bisa ulang dari awal
      counter.classList.add('pulse');
    }


    // Ambil teks notifikasi target tercapai dari i18n global.
    // Fallback ke teks hardcode kalau i18n belum siap.
    function getTargetReachedText() {
      if (typeof i18n !== 'undefined' && typeof currentLang !== 'undefined') {
        return i18n[currentLang]?.zikirTargetReached || 'Target tercapai 🎉 Allahu Akbar!';
      }
      return 'Target tercapai 🎉 Allahu Akbar!';
    }


    // Update tampilan: angka counter, progress bar, dan notifikasi
    function updateUI() {
      counter.textContent  = count;
      progFill.style.width = Math.min((count / target) * 100, 100) + '%';

      if (count >= target) {
        notif.textContent = getTargetReachedText();
        notif.classList.add('show');
      } else {
        notif.textContent = '';
        notif.classList.remove('show');
      }
    }


    // Ganti target — update tampilan angka target dan toggle tombol aktif
    function setTarget(val) {
      target = val;
      targetDisp.textContent = val;

      targetBtns.forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.target) === val);
      });

      updateUI();
    }


    // ── Event listeners ───────────────────────────────────────
    // Tombol tambah (+) — berhenti di angka target, ga bisa lebih
    btnInc.addEventListener('click', () => {
      if (count >= target) return;
      count++;
      animateCounter();
      updateUI();
    });

    // Tombol reset — balik ke 0, progress bar ikut
    btnReset.addEventListener('click', () => {
      count = 0;
      updateUI();
    });

    // Tombol pilih target (33 / 99 / 100)
    // Klik target baru → reset counter dari awal
    targetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        count = 0;
        setTarget(parseInt(btn.dataset.target));
      });
    });


    // Waktu bahasa diganti (global.js set data-lang di <html>),
    // MutationObserver ini tangkap perubahannya dan update notifikasi
    // kalau lagi tampil (misal user udah capai target terus ganti bahasa)
    new MutationObserver(() => {
      if (count >= target) {
        notif.textContent = getTargetReachedText();
      }
    }).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-lang']
    });


    // Inisialisasi awal — default target 33
    setTarget(33);
  });
}