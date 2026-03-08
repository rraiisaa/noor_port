//  GLOBAL.JS — Noor Port+ Ramadhan
//  CATATAN PENTING:
//  → setLang dan toggleTheme cuma boleh ada SATU definisi
//  → Dulu ada duplikat — yang kedua nimpa yang pertama
//    dan yang kedua ga punya localStorage + notifyLangComponents
//  → Udah difix semua di sini

/* DATA BAHASA GLOBAL */
const i18n = {
  id: {
    // Section Header
    Headersubtitle: '1446 H · Bulan Penuh Berkah · 2026 M',
    cdLabels: ['Hari', 'Jam', 'Menit', 'Detik'],
    nav: ['Beranda', 'Kumpulan Doa', 'Baca Dzikir', 'Hitung Zakat', 'Todo List'],

    // Section Doa
    doaRamadhanEyebrow: 'Doa Harian',
    doaRamadhanTitle: 'Doa Sahur & Buka Puasa',
    doaRamadhanSubtitle: 'Awali sahurmu dengan niat yang tulus, akhiri harimu dengan syukur yang dalam.',

    // Section Dzikir
    zikirEyebrow: 'Dzikir',
    zikirTitle: 'Hitung Dzikir',
    zikirSubtitle: 'Kata-kata penuh lindungan untuk hari - hari kita.',
    zikirTargetReached: 'Target tercapai 🎉 Allahu Akbar!',
    zikirSubs: {
      subhanallah: 'Maha Suci Allah',
      alhamdulillah: 'Segala Puji Bagi Allah',
      allahuakbar: 'Allah Maha Besar'
    },

    // Section Footer
    footerFollowTitle: 'Ikuti Kami',
    footerNavTitle: 'Navigasi',
    fnHome: 'Beranda',
    fnPrayer: 'Kumpulan Doa Ramadhan',
    fnDzikir: 'Baca Dzikir',
    fnZakat: 'Hitung Zakat',
    fnIndex: 'Todo List',

    // Section Zakat
    title: 'Kalkulator Zakat',
    subtitle: 'Hitung kewajiban zakat Anda dengan mudah dan akurat sesuai syariat Islam',
    type_label: 'Jenis Zakat',
    opt_penghasilan: 'Zakat Penghasilan',
    opt_emas: 'Zakat Emas',
    label_gaji: 'Gaji Bulanan',
    label_lain: 'Penghasilan Lain',
    label_gram: 'Jumlah Emas',
    label_gold_price: 'Harga Emas per Gram',
    nisab_ref: 'Referensi Nisab',
    ph_gaji: 'Masukkan gaji bulanan',
    ph_lain: 'Opsional',
    ph_gram: 'Masukkan berat emas (gram)',
    ph_gold_price: 'Masukkan harga emas/gram',
    btn_calculate: '✦ Hitung Zakat Saya',
    result_title: 'Hasil Perhitungan',
    result_wealth: 'Total Kekayaan / Penghasilan',
    result_nisab: 'Nilai Nisab (85 gram emas)',
    result_zakat_label: 'Zakat yang Wajib Dibayar',
    status_wajib: 'Wajib Zakat',
    status_tidak: 'Belum Wajib',
    err_required: 'Kolom ini wajib diisi',

    // Section Todo List
    shalatTitle: 'Shalat Wajib Hari Ini',
    shalatItems: ['Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'],
    shalatStatus: ['Belum optimal', 'Cukup baik', 'MasyaAllah lengkap! 🌟'],
    quranTitle: "Baca Qur'an",
    quranStatus: ['Masih bisa ditambah', 'Hampir selesai', 'Target tercapai 🎉'],
    targetLabel: 'Target Halaman',
    readLabel: 'Halaman Dibaca',
    markDone: 'Tandai target selesai ✓',
    puasaTitle: 'Puasa Ramadhan',
    puasaStatus: ['Awal Ramadhan, semangat!', 'Pertahankan konsistensi!', 'Menuju kemenangan! 🏆'],
    puasaTodayLabel: 'Saya sudah puasa hari ini ✓',
    dzikirTitle: 'To-Do Dzikir',
    dzikirEmpty: 'Belum ada to-do. Tambahkan ibadah di atas ✨',
    dzikirStatus: ['Belum ada to-do', 'Alhamdulillah teruskan', 'Hati semakin tenang 🌿'],
    progressLabel: 'Progress Hari Ini',
    progressMsgs: ['Mulai perlahan, Ramadhan masih panjang 🌙', 'Bagus! Tingkatkan lagi ✨', 'MasyaAllah luar biasa! 🌟'],
    saved: '✓ Progress tersimpan!',
    saveBtn: '💾 Simpan Progress',
    todoPlaceholder: 'Tambah dzikir / ibadah...',
    tabs: ['🕌 Shalat', "📖 Qur'an", '🌙 Puasa', '📿 Dzikir'],

    footerCopy: '© 2026 Noor Port+. Hak Cipta Dilindungi.',
    footerTagline: 'Temani Ramadhanmu dengan doa, dzikir, dan inspirasi setiap hari'
  },

  en: {
    // Section Header
    Headersubtitle: '1446 H · Month of Blessings · 2026 M',
    cdLabels: ['Days', 'Hours', 'Minutes', 'Seconds'],
    nav: ['Home', 'Ramadhan Prayer', 'Dzikr Counter', 'Calculate Zakat', 'Todo List'],

    // Section Doa
    doaRamadhanEyebrow: 'Daily Prayers',
    doaRamadhanTitle: 'Suhoor & Iftar Prayers',
    doaRamadhanSubtitle: 'Begin your suhoor with sincere intention, end your day with deep gratitude.',

    // Section Dzikr
    zikirEyebrow: 'Dhikr',
    zikirTitle: 'Dhikr Counter',
    zikirSubtitle: 'Words of protection for our daily lives.',
    zikirTargetReached: 'Target reached 🎉 Allahu Akbar!',
    zikirSubs: {
      subhanallah: 'Glory be to Allah',
      alhamdulillah: 'All Praise be to Allah',
      allahuakbar: 'Allah is the Greatest'
    },

    // Section Zakat
    title: 'Zakat Calculator',
    subtitle: 'Calculate your zakat obligation easily and accurately according to Islamic law',
    type_label: 'Zakat Type',
    opt_penghasilan: 'Income Zakat',
    opt_emas: 'Gold Zakat',
    label_gaji: 'Monthly Salary',
    label_lain: 'Additional Income',
    label_gram: 'Total Gold',
    label_gold_price: 'Gold Price per Gram',
    nisab_ref: 'Nisab Reference',
    ph_gaji: 'Enter monthly salary',
    ph_lain: 'Optional',
    ph_gram: 'Enter gold weight (grams)',
    ph_gold_price: 'Enter gold price per gram',
    btn_calculate: '✦ Calculate My Zakat',
    result_title: 'Calculation Result',
    result_wealth: 'Total Wealth / Income',
    result_nisab: 'Nisab Value (85 grams gold)',
    result_zakat_label: 'Zakat Amount to Pay',
    status_wajib: 'Zakat Obligatory',
    status_tidak: 'Not Yet Obligatory',
    err_required: 'This field is required',

    // Section Todo List
    shalatTitle: "Today's obligatory prayers",
    todolistEyebrow: 'To do list',
    todolistTitle: 'Ramadhan To do list',
    todolistSubtitle: 'Monitor and improve the consistency of worship during Ramadan',
    shalatItems: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'],
    shalatStatus: ['Not optimal', 'Doing well', 'MashaAllah, complete! 🌟'],
    quranTitle: 'Quran Reading',
    quranStatus: ['Still room to add', 'Almost there', 'Target reached 🎉'],
    targetLabel: 'Target Pages',
    readLabel: 'Pages Read',
    markDone: 'Mark target as done ✓',
    puasaTitle: 'Ramadhan Fasting',
    puasaStatus: ['Early Ramadhan, keep going!', 'Stay consistent!', 'Towards victory! 🏆'],
    puasaTodayLabel: 'I fasted today ✓',
    dzikirTitle: 'Dhikr To-Do',
    dzikirEmpty: 'No to-do yet. Add your ibadah above ✨',
    dzikirStatus: ['No to-do yet', 'Alhamdulillah, continue', 'Heart at peace 🌿'],
    progressLabel: "Today's Progress",
    progressMsgs: ['Start slow, Ramadhan is long 🌙', 'Great! Keep it up ✨', 'MashaAllah amazing! 🌟'],
    saved: '✓ Progress saved!',
    saveBtn: '💾 Save Progress',
    todoPlaceholder: 'Add dhikr / ibadah...',
    tabs: ['🕌 Prayers', '📖 Quran', '🌙 Fasting', '📿 Dhikr'],

    // Section Footer
    footerFollowTitle: 'Follow Us',
    footerNavTitle: 'Navigation',
    fnHome: 'Home',
    fnPrayer: 'Ramadhan Prayer',
    fnDzikir: 'Dhikr Counter',
    fnZakat: 'Zakat Calculator',
    fnIndex: 'Index',
    footerCopy: '© 2026 Noor Port+. All rights reserved.',
    footerTagline: 'Accompany your Ramadhan with daily prayers, dhikr, and inspiration'
  }
};

/* STATE GLOBAL */
let currentLang = localStorage.getItem('lang') || 'id';
let currentTheme = localStorage.getItem('theme') || 'dark';

/* SISTEM LISTENER BAHASA */
// Komponen lain (misal todo.js) bisa daftar callback di sini
// biar otomatis dipanggil pas bahasa diganti
// Cara daftar: window.languageListeners.push(fn)
window.languageListeners = [];

function notifyLangComponents() {
  window.languageListeners.forEach(fn => {
    if (typeof fn === 'function') fn(currentLang);
  });
}

/* GANTI BAHASA */
// FIX: dulu ada 2 definisi setLang → yang kedua nimpa yang pertama
// Sekarang cuma ada SATU, lengkap dengan localStorage + notifyLangComponents
function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang); // FIX: simpan ke localStorage biar ga hilang pas refresh
  document.documentElement.setAttribute('data-lang', lang);

  const t = i18n[lang];

  // toggle tombol bahasa aktif
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el && val !== undefined) el.textContent = val;
  };

  // header
  setText('headerSubtitle', t.Headersubtitle);

  // countdown
  setText('lblDays', t.cdLabels[0]);
  setText('lblHours', t.cdLabels[1]);
  setText('lblMins', t.cdLabels[2]);
  setText('lblSecs', t.cdLabels[3]);

  // navigasi
  document.querySelectorAll('#mainNav a').forEach((a, i) => {
    if (t.nav[i]) a.textContent = t.nav[i];
  });

  // section doa
  // section doa ramadhan
  setText('doaRamadhanEyebrow', t.doaRamadhanEyebrow);
  setText('doaRamadhanTitle', t.doaRamadhanTitle);
  setText('doaRamadhanSubtitle', t.doaRamadhanSubtitle);

  // section dzikir
  setText('zikirEyebrow', t.zikirEyebrow);
  setText('zikirTitle', t.zikirTitle);
  setText('zikirSubtitle', t.zikirSubtitle);
  document.querySelectorAll('.zikir-card').forEach(card => {
    const key = card.dataset.zikirKey;
    const sub = card.querySelector('.zikir-subtitle');
    if (key && sub && t.zikirSubs[key]) sub.textContent = t.zikirSubs[key];
  });

  // section zakat
  setText('zakatTitle', t.title);
  setText('zakatSubtitle', t.subtitle);
  setText('zakatTypeLabel', t.type_label);
  setText('optPenghasilan', t.opt_penghasilan);
  setText('optEmas', t.opt_emas);
  setText('labelGaji', t.label_gaji);
  setText('labelLain', t.label_lain);
  setText('labelGram', t.label_gram);
  setText('labelGoldPrice', t.label_gold_price);
  setText('nisabRef', t.nisab_ref);
  setText('btnCalculate', t.btn_calculate);
  setText('resultTitle', t.result_title);
  setText('resultWealth', t.result_wealth);
  setText('resultNisab', t.result_nisab);
  setText('resultZakatLabel', t.result_zakat_label);

  // section todo list
  // section todo list
  const setTodoText = (selector, val) => {
    const el = document.querySelector(selector);
    if (el && val !== undefined) el.textContent = val;
  };

  setTodoText('#progressLabel', t.progressLabel);

  setTodoText('#shalatTitle', t.shalatTitle);
  setTodoText('#quranTitle', t.quranTitle);
  setTodoText('#puasaTitle', t.puasaTitle);
  setTodoText('#dzikirTitle', t.dzikirTitle);

  setTodoText('#saveBtnShalat', t.saveBtn);
  setTodoText('#saveBtnQuran', t.saveBtn);
  setTodoText('#saveBtnPuasa', t.saveBtn);
  setTodoText('#saveBtnDzikir', t.saveBtn);

  const todoInput = document.getElementById('dzikirTodoInput');
  if (todoInput) todoInput.placeholder = t.todoPlaceholder;

  // tabs
  document.querySelectorAll('.ramadhan-tab').forEach((tab, i) => {
    if (t.tabs && t.tabs[i]) tab.textContent = t.tabs[i];
  });

  // footer
  setText('footerFollowTitle', t.footerFollowTitle);
  setText('footerNavTitle', t.footerNavTitle);
  setText('fnHome', t.fnHome);
  setText('fnPrayer', t.fnPrayer);
  setText('fnDzikir', t.fnDzikir);
  setText('fnZakat', t.fnZakat);
  setText('fnIndex', t.fnIndex);
  setText('footerCopy', t.footerCopy);
  setText('footerTagline', t.footerTagline);

  // rebuild doa cards kalau ada
  if (typeof rebuildCards === 'function') rebuildCards();

  // FIX: notify semua komponen yang subscribe (termasuk todo.js)
  // Dulu baris ini ada di versi pertama tapi ke-overwrite sama versi kedua
  notifyLangComponents();
}

/* TOGGLE TEMA */
// FIX: dulu ada 2 definisi toggleTheme → yang kedua ga punya localStorage
// Sekarang cuma ada SATU, dengan localStorage biar tema tersimpan

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', currentTheme); // FIX: simpan ke localStorage
  document.documentElement.setAttribute('data-theme', currentTheme);
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
}


/* BACKGROUND BINTANG */
const starsEl = document.getElementById('starsLayer');
if (starsEl) {
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const sz = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
      width:${sz}px;
      height:${sz}px;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      --dur:${Math.random() * 3 + 2}s;
      --delay:${Math.random() * 4}s;
      --min-op:${Math.random() * .3 + .05}
    `;
    starsEl.appendChild(s);
  }
}

/* PARTIKEL HEADER */
const pEl = document.getElementById('particles');
if (pEl) {
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const sz = Math.random() * 4 + 1;
    p.style.cssText = `
      width:${sz}px;
      height:${sz}px;
      left:${Math.random() * 100}%;
      bottom:${Math.random() * 30}%;
      --dur:${Math.random() * 4 + 3}s;
      --delay:${Math.random() * 5}s
    `;
    pEl.appendChild(p);
  }
}

/* HITUNG MUNDUR LEBARAN */
function tick() {
  const target = new Date('2026-03-20T00:00:00');
  const now = new Date();
  let diff = Math.max(target - now, 0);

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(val).padStart(2, '0');
  };

  set('cdDays', d);
  set('cdHours', h);
  set('cdMins', m);
  set('cdSecs', s);
}

tick();
setInterval(tick, 1000);

/* SETUP AWAL */
// FIX: dipindah ke paling bawah biar semua fungsi udah terdefinisi dulu
// sebelum dijalankan. Dulu ini ada di tengah-tengah file.
document.documentElement.setAttribute('data-theme', currentTheme);
document.documentElement.setAttribute('data-lang', currentLang);