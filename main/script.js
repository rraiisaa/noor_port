const i18n = {
  id: {
    Headersubtitle: '1446 H · Bulan Penuh Berkah · 2026 M',
    cdLabels: ['Hari', 'Jam', 'Menit', 'Detik'],
    nav: ['Beranda', 'Jadwal Sholat', 'Kultum', 'Resep Sahur', 'Donasi'],
    doaEyebrow: 'Doa',
    doaTitle: 'Kumpulan Doa Ramadhan',
    doaSubtitle: 'Kata-kata penuh cahaya untuk setiap momen di bulan suci.',
    readDoa: 'Baca Doa',
    mTag: 'Doa',
    zikirEyebrow: 'Dzikir',
    zikirTitle: 'Hitung Dzikir',
    zikirSubtitle: 'Kata-kata penuh lindungan untuk hari - hari kita.',
    zikirTargetReached: 'Target tercapai 🎉 Allahu Akbar!',
    zikirSubs: {
      subhanallah: 'Maha Suci Allah',
      alhamdulillah: 'Segala Puji Bagi Allah',
      allahuakbar: 'Allah Maha Besar',
    },
    footerFollowTitle: 'Ikuti Kami',
    footerNavTitle: 'Navigasi',
    fnHome: 'Beranda',
    fnPrayer: 'Kumpulan Doa Ramadhan',
    fnDzikir: 'Baca Dzikir',
    fnZakat: 'Hitung Zakat',
    fnIndex: 'Index',
    title: 'Kalkulator Zakat',
    subtitle: 'Hitung kewajiban zakat Anda dengan mudah dan akurat sesuai syariat Islam',
    type_label: 'Jenis Zakat',
    opt_penghasilan: 'Zakat Penghasilan',
    opt_emas: 'Zakat Emas',
    label_type: 'Gaji Bulanan',
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
    footerCopy: '© 2026 Noor Port+. Hak Cipta Dilindungi.',
    footerTagline: 'Temani Ramadhanmu dengan doa, dzikir, dan inspirasi setiap hari'
  },
  en: {
    Headersubtitle: '1446 H · Month of Blessings · 2026 M',
    cdLabels: ['Days', 'Hours', 'Minutes', 'Seconds'],
    nav: ['Home', 'Prayer Times', 'Lecture', 'Sahur Recipes', 'Donate'],
    doaEyebrow: 'Prayer',
    doaTitle: 'Ramadhan Prayer Collection',
    doaSubtitle: 'Words of light for every moment in this sacred month.',
    readDoa: 'Read Prayer',
    mTag: 'Prayer',
    zikirEyebrow: 'Dhikr',
    zikirTitle: 'Dhikr Counter',
    zikirSubtitle: 'Words of protection for our daily lives.',
    zikirTargetReached: 'Target reached 🎉 Allahu Akbar!',
    zikirSubs: {
      subhanallah: 'Glory be to Allah',
      alhamdulillah: 'All Praise be to Allah',
      allahuakbar: 'Allah is the Greatest',
    },
    footerFollowTitle: 'Follow Us',
    footerNavTitle: 'Navigation',
    fnHome: 'Home',
    fnPrayer: 'Ramadhan Prayer Collection',
    fnDzikir: 'Dhikr Counter',
    fnZakat: 'Zakat Calculator',
    fnIndex: 'Index',
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
    footerCopy: '© 2026 Noor Port+. All rights reserved.',
    footerTagline: 'Accompany your Ramadhan with daily prayers, dhikr, and inspiration'
  }
};

/* State aktif */
let currentLang = 'id';
let currentTheme = 'dark';

/* setLang — ganti bahasa semua teks sekaligus
   Termasuk header dzikir + subtitle tiap card dzikir */
function setLang(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('data-lang', lang);
  const t = i18n[lang];

  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  const safeSet = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  safeSet('headerSubtitle', t.Headersubtitle);
  safeSet('lblDays', t.cdLabels[0]);
  safeSet('lblHours', t.cdLabels[1]);
  safeSet('lblMins', t.cdLabels[2]);
  safeSet('lblSecs', t.cdLabels[3]);

  document.querySelectorAll('#mainNav a').forEach((a, i) => {
    if (t.nav[i]) a.textContent = t.nav[i];
  });

  // Header Doa
  safeSet('doaEyebrow', t.doaEyebrow);
  safeSet('doaTitle', t.doaTitle);
  safeSet('doaSubtitle', t.doaSubtitle);

  // Header Dzikir
  safeSet('zikirEyebrow', t.zikirEyebrow);
  safeSet('zikirTitle', t.zikirTitle);
  safeSet('zikirSubtitle', t.zikirSubtitle);

  document.querySelectorAll('.zikir-card').forEach(card => {
    const key = card.dataset.zikirKey;
    const sub = card.querySelector('.zikir-subtitle');
    if (key && sub && t.zikirSubs[key]) {
      sub.textContent = t.zikirSubs[key];
    }
  });

  // Footer
  safeSet('footerFollowTitle', t.footerFollowTitle);
  safeSet('footerNavTitle', t.footerNavTitle);
  safeSet('fnHome', t.fnHome);
  safeSet('fnPrayer', t.fnPrayer);
  safeSet('fnDzikir', t.fnDzikir);
  safeSet('fnZakat', t.fnZakat);
  safeSet('fnIndex', t.fnIndex);
  safeSet('footerCopy', t.footerCopy);
  safeSet('footerTagline', t.footerTagline);

  // rebuild doa cards
  if (typeof rebuildCards === 'function') {
    rebuildCards();
  }

  // Zakat header
  safeSet('zakatTitle', t.title);
  safeSet('zakatSubtitle', t.subtitle);
  safeSet('zakatTypeLabel', t.type_label);
  safeSet('optPenghasilan', t.opt_penghasilan);
  safeSet('optEmas', t.opt_emas);
  safeSet('labelGaji', t.label_gaji);
  safeSet('labelLain', t.label_lain);
  safeSet('labelGram', t.label_gram);
  safeSet('labelGoldPrice', t.label_gold_price);
  safeSet('nisabRef', t.nisab_ref);
  safeSet('phGaji', t.ph_gaji);
  safeSet('phLain', t.ph_lain);
  safeSet('phGram', t.ph_gram);
  safeSet('phGoldPrice', t.ph_gold_price);
  safeSet('btnCalculate', t.btn_calculate);
  safeSet('resultTitle', t.result_title);
  safeSet('resultWealth', t.result_wealth);
  safeSet('resultNisab', t.result_nisab);
  safeSet('resultZakatLabel', t.result_zakat_label);
  safeSet('resultZakatAmount', t.result_zakat_amount);
  safeSet('resultStatusBadge', t.result_status_badge);
  
  // translate semua text dengan data-i18n
  document.querySelectorAll('[id]').forEach(el => {
    const key = el.id;
    if (t[key]) el.textContent = t[key];
  });

}

/* toggleTheme — ganti dark/light mode
   Ikon bulan/matahari ikut berubah sesuai tema */
function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
}

/* Stars — bintang acak di background*/
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

/* Particles — efek partikel naik di header */
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

/* Countdown — hitung mundur ke Lebaran */
function tick() {
  const target = new Date('2026-03-20T00:00:00');
  const now = new Date();
  let diff = Math.max(target - now, 0);

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  const safeSet = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(val).padStart(2, '0');
  };

  safeSet('cdDays', d);
  safeSet('cdHours', h);
  safeSet('cdMins', m);
  safeSet('cdSecs', s);
}

tick();
setInterval(tick, 1000);