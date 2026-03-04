
const i18n = {
  id: {
    subtitle: '1446 H · Bulan Penuh Berkah · 2026 M',
    cdLabels: ['Hari','Jam','Menit','Detik'],
    nav: ['Beranda','Jadwal Sholat','Kultum','Resep Sahur','Donasi'],
    doaEyebrow: 'Doa',
    doaTitle: 'Kumpulan Doa Ramadhan',
    doaSubtitle: 'Kata-kata penuh cahaya untuk setiap momen di bulan suci.',
    readDoa: 'Baca Doa',
    mTag: 'Doa',
    zikirEyebrow: 'Dzikir',
    zikirTitle: 'Hitung Dzikir',
    zikirSubtitle: 'Kata-kata penuh lindungan untuk hari - hari kita.',
    zikirTargetReached: 'Target tercapai 🎉 Allahu Akbar!',
    // Teks subtitle tiap card dzikir — Arabic tetap gak berubah, yang berubah cuma terjemahannya
    zikirSubs: {
      subhanallah:   'Maha Suci Allah',
      alhamdulillah: 'Segala Puji Bagi Allah',
      allahuakbar:   'Allah Maha Besar',
    },
    footerFollowTitle: 'Ikuti Kami',
    footerNavTitle: 'Navigasi',
    fnHome: 'Beranda',
    fnPrayer: 'Kumpulan Doa Ramadhan',
    fnDzikir: 'Hitung Dzikir',
    fnIndex: 'Index',
    footerCopy: '© 2026 Noor Port+. Hak Cipta Dilindungi.',
    footerTagline: 'Temani Ramadhanmu dengan doa, dzikir, dan inspirasi setiap hari'
  },
  en: {
    subtitle: '1446 H · Month of Blessings · 2026 M',
    cdLabels: ['Days','Hours','Minutes','Seconds'],
    nav: ['Home','Prayer Times','Lecture','Sahur Recipes','Donate'],
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
      subhanallah:   'Glory be to Allah',
      alhamdulillah: 'All Praise be to Allah',
      allahuakbar:   'Allah is the Greatest',
    },
    footerFollowTitle: 'Follow Us',
    footerNavTitle: 'Navigation',
    fnHome: 'Home',
    fnPrayer: 'Ramadhan Prayer Collection',
    fnDzikir: 'Dhikr Counter',
    fnIndex: 'Index',
    footerCopy: '© 2026 Noor Port+. All rights reserved.',
    footerTagline: 'Accompany your Ramadhan with daily prayers, dhikr, and inspiration'
  }
};

/* Data Doa — konten tiap kartu doa
   Arabic disimpen sebagai string biasa biar gak ada encoding issue */
const doas = [
  {
    title:  { id:'Doa Berbuka Puasa', en:'Breaking Fast Prayer' },
    desc:   { id:'Doa penuh syukur saat menyempurnakan puasa.', en:'A prayer of gratitude when completing your fast.' },
    img:    'https://plus.unsplash.com/premium_photo-1677516158026-9d3e07f0efb8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    arabic: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللهُ تَعَالَى',
    latin:  "Dhahaba adh-dhama'u wa abtallatil 'uruuqu wa thabata al-'ajru in sya'a Allah ta'ala.",
    arti:   { id:"Telah hilang rasa haus, telah basah urat-urat, dan telah pasti ganjaran, dengan kehendak Allah Ta'ala.",
              en:"The thirst is gone, the veins are wet, and the reward is certain, by the will of Allah Ta'ala." }
  },
  {
    title:  { id:'Doa Setelah Sahur', en:'Post-Suhoor Prayer' },
    desc:   { id:'Awali puasamu dengan niat yang tulus dan hati yang tenang.', en:'Begin your fast with sincere intention and a calm heart.' },
    img:    'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=600&q=70',
    arabic: 'يَرْحَمُ اللَّهُ الْمُتَسَحَّرِينَ',
    latin:  "Yarhamullahul mutasahhirin.",
    arti:   { id:"Semoga Allah menurunkan rahmat-Nya bagi mereka yang bersahur.",
              en:"May Allah bestow His mercy upon those who eat sahur." }
  },
  {
    title:  { id:'Doa Malam Lailatul Qadr', en:'Laylatul Qadr Prayer' },
    desc:   { id:'Doa memohon ampunan di malam yang lebih baik dari seribu bulan.', en:'A prayer seeking forgiveness on the night better than a thousand months.' },
    img:    'https://images.unsplash.com/photo-1587617425953-9075d28b8c46?q=80&w=1170&auto=format&fit=crop',
    arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
    latin:  "Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni.",
    arti:   { id:'Ya Allah, sesungguhnya Engkau Maha Pemaaf, Engkau menyukai pemaafan, maka maafkanlah aku.',
              en:'O Allah, You are All-Forgiving and You love forgiveness, so forgive me.' }
  },
];

/* State aktif */
let currentLang  = 'id';
let currentTheme = 'dark';

/* setLang — ganti bahasa semua teks sekaligus
   Termasuk header dzikir + subtitle tiap card dzikir */
function setLang(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('data-lang', lang);
  const t = i18n[lang];

  // Toggle button aktif
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  // Update teks header utama
  document.getElementById('headerSubtitle').textContent = t.subtitle;
  document.getElementById('lblDays').textContent   = t.cdLabels[0];
  document.getElementById('lblHours').textContent  = t.cdLabels[1];
  document.getElementById('lblMins').textContent   = t.cdLabels[2];
  document.getElementById('lblSecs').textContent   = t.cdLabels[3];

  // Update nav
  document.querySelectorAll('#mainNav a').forEach((a, i) => { a.textContent = t.nav[i]; });

  // Update section doa
  document.getElementById('doaEyebrow').textContent  = t.doaEyebrow;
  document.getElementById('doaTitle').textContent    = t.doaTitle;
  document.getElementById('doaSubtitle').textContent = t.doaSubtitle;
  document.getElementById('mTag').textContent        = t.mTag;

  // Update header dzikir — ini yang baru, biar teks dzikir juga ikut ganti bahasa
  document.getElementById('zikirEyebrow').textContent  = t.zikirEyebrow;
  document.getElementById('zikirTitle').textContent    = t.zikirTitle;
  document.getElementById('zikirSubtitle').textContent = t.zikirSubtitle;

  // Update subtitle tiap card dzikir pakai data-zikir-key
  document.querySelectorAll('.zikir-card').forEach(card => {
    const key = card.dataset.zikirKey;
    const sub = card.querySelector('.zikir-subtitle');
    if (key && sub && t.zikirSubs[key]) sub.textContent = t.zikirSubs[key];
  });

  // Update Footer
  document.getElementById('footerFollowTitle').textContent = t.footerFollowTitle;
  document.getElementById('footerNavTitle').textContent   = t.footerNavTitle;
    document.getElementById('fnHome').textContent    = t.fnHome;
    document.getElementById('fnPrayer').textContent  = t.fnPrayer;
    document.getElementById('fnDzikir').textContent  = t.fnDzikir;
    document.getElementById('fnIndex').textContent   = t.fnIndex;
    document.getElementById('footerCopy').textContent   = t.footerCopy;
    document.getElementById('footerTagline').textContent   = t.footerTagline;

  // Rebuild kartu doa dengan teks bahasa baru
  rebuildCards();
}

/* rebuildCards — bangun ulang grid kartu doa
   Dipanggil tiap kali ganti bahasa atau pertama load */
function rebuildCards() {
  const lang = currentLang;
  const t    = i18n[lang];
  const grid = document.getElementById('doaGrid');
  grid.innerHTML = '';

  doas.forEach((d, i) => {
    const card     = document.createElement('div');
    card.className = 'doa-card';
    card.onclick   = () => openModal(i);
    card.innerHTML = `
      <img class="doa-img" src="${d.img}" alt="${d.title[lang]}" loading="lazy"/>
      <div class="doa-img-overlay"><span class="tag-gold">${t.readDoa}</span></div>
      <div class="doa-body">
        <span class="doa-card-tag">${t.doaEyebrow}</span>
        <div class="doa-card-title">${d.title[lang]}</div>
        <div class="doa-card-desc">${d.desc[lang]}</div>
        <a href="#" class="doa-link" onclick="return false;">${t.readDoa} <span class="arrow">›</span></a>
      </div>`;
    grid.appendChild(card);
  });

  // Touch support — biar hover effect jalan di HP juga
  if ('ontouchstart' in window) {
    grid.querySelectorAll('.doa-card').forEach(card => {
      card.addEventListener('touchend', function(e) {
        if (!this.classList.contains('touched')) {
          e.preventDefault();
          document.querySelectorAll('.doa-card').forEach(c => c.classList.remove('touched'));
          this.classList.add('touched');
        }
      });
    });
  }
}

/* openModal — tampilkan detail doa di popup */
function openModal(i) {
  const d    = doas[i];
  const lang = currentLang;
  document.getElementById('mTag').textContent    = i18n[lang].mTag;
  document.getElementById('mTitle').textContent  = d.title[lang];
  document.getElementById('mArabic').textContent = d.arabic;
  document.getElementById('mLatin').textContent  = d.latin;
  document.getElementById('mArti').textContent   = d.arti[lang];
  document.getElementById('doaModal').classList.add('open');
}

document.getElementById('modalClose').onclick = () =>
  document.getElementById('doaModal').classList.remove('open');

document.getElementById('doaModal').onclick = e => {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
};

/* toggleTheme — ganti dark/light mode
   Ikon bulan/matahari ikut berubah sesuai tema */
function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  document.getElementById('themeBtn').textContent = currentTheme === 'dark' ? '🌙' : '☀️';
}

/* Stars — bintang acak di background*/
const starsEl = document.getElementById('starsLayer');
for (let i = 0; i < 120; i++) {
  const s  = document.createElement('div');
  s.className = 'star';
  const sz = Math.random() * 2.5 + 0.5;
  s.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--dur:${Math.random()*3+2}s;--delay:${Math.random()*4}s;--min-op:${Math.random()*.3+.05}`;
  starsEl.appendChild(s);
}

/* Particles — efek partikel naik di header */
const pEl = document.getElementById('particles');
for (let i = 0; i < 18; i++) {
  const p  = document.createElement('div');
  p.className = 'particle';
  const sz = Math.random() * 4 + 1;
  p.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}%;bottom:${Math.random()*30}%;--dur:${Math.random()*4+3}s;--delay:${Math.random()*5}s`;
  pEl.appendChild(p);
}

/* Countdown — hitung mundur ke Ramadhan */
function tick() {
  const target = new Date('2026-03-20T00:00:00');
  const now    = new Date();
  let diff = Math.max(target - now, 0);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('cdDays').textContent  = String(d).padStart(2, '0');
  document.getElementById('cdHours').textContent = String(h).padStart(2, '0');
  document.getElementById('cdMins').textContent  = String(m).padStart(2, '0');
  document.getElementById('cdSecs').textContent  = String(s).padStart(2, '0');
}
tick();
setInterval(tick, 1000);

/* Init — load kartu doa pertama kali halaman dibuka */
rebuildCards();

/* Dzikir Counter — satu loop untuk semua card
   
   Bug lama: kalau pakai document.querySelector, counter
   bisa ngaruh ke card lain karena ngambil elemen pertama
   yang ditemukan di seluruh halaman.
   
   Fix: pakai card.querySelector — ambil elemen dari
   dalam card ini aja, jadi setiap card punya state
   sendiri yang gak ketuker sama card lain.*/
document.querySelectorAll('.zikir-card').forEach(card => {

  // State tiap card berdiri sendiri, gak akan ketuker
  let count  = 0;
  let target = 33;

  // Ambil semua elemen dari dalam card ini aja
  const counter    = card.querySelector('.zikir-counter');
  const progress   = card.querySelector('.zikir-progress-fill');
  const notif      = card.querySelector('.zikir-notification');
  const targetDisp = card.querySelector('.target-display');
  const btnInc     = card.querySelector('.btn-increment');
  const btnReset   = card.querySelector('.btn-reset');
  const targetBtns = card.querySelectorAll('.btn-target');

  // Animasi angka — hapus class pulse dulu biar bisa diulang setiap klik
  function animateCounter() {
    counter.classList.remove('pulse');
    void counter.offsetWidth; // paksa reflow biar animasi restart
    counter.classList.add('pulse');
  }

  function updateUI() {
    counter.textContent  = count;
    progress.style.width = Math.min((count / target) * 100, 100) + '%';

    // Teks notif ikut bahasa aktif, ambil dari i18n[currentLang].zikirTargetReached
    if (count >= target) {
      notif.textContent = i18n[currentLang].zikirTargetReached;
      notif.classList.add('show');
    } else {
      notif.textContent = '';
      notif.classList.remove('show');
    }
  }

  function setTarget(val) {
    target = val;
    targetDisp.textContent = val;
    targetBtns.forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.target) === val);
    });
    updateUI();
  }

  // Kalo udah capai target, tombol + gak bisa diklik lagi
  btnInc.addEventListener('click', () => {
    if (count >= target) return;
    count++;
    animateCounter();
    updateUI();
  });

  // Reset angka dan progress bar ke 0
  btnReset.addEventListener('click', () => {
    count = 0;
    updateUI();
  });

  targetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      count = 0;
      setTarget(parseInt(btn.dataset.target));
    });
  });

  setTarget(33);
});