/* ══════════════════════════════
   I18N DATA
══════════════════════════════ */
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
  }
};

/* ══════════════════════════════
   DOA DATA (bilingual)
══════════════════════════════ */
const doas = [
  {
    title:    {id:'Doa Berbuka Puasa',         en:'Breaking Fast Prayer'},
    desc:     {id:'Doa penuh syukur saat menyempurnakan puasa.',      en:'A prayer of gratitude when completing your fast.'},
    img:      'https://plus.unsplash.com/premium_photo-1677516158026-9d3e07f0efb8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    arabic:   'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللهُ تَعَالَى',
    latin:    "Dhahaba adh-dhama'u wa abtallatil 'uruuqu wa thabata al-'ajru in sya'a Allah ta'ala.",
    arti:     {id:"Telah hilang rasa haus, telah basah urat-urat, dan telah pasti ganjaran, dengan kehendak Allah Ta'ala.",
               en:"The thirst is gone, the veins are wet, and the reward is certain, by the will of Allah Ta'ala."}
  },
  {
    title:    {id:'Doa Setelah Sahur',          en:'Post-Suhoor Prayer'},
    desc:     {id:'Awali puasamu dengan niat yang tulus dan hati yang tenang.', en:'Begin your fast with sincere intention and a calm heart.'},
    img:      'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=600&q=70',
    arabic:   'يَرْحَمُ اللَّهُ الْمُتَسَحَّرِينَ',
    latin:    "Yarhamullahul mutasahhirin.",
    arti:     {id:"Semoga Allah menurunkan rahmat-Nya bagi mereka yang bersahur.",
               en:"May Allah bestow His mercy upon those who eat sahur."}
  },
  {
    title:    {id:'Doa Malam Lailatul Qadr',    en:'Laylatul Qadr Prayer'},
    desc:     {id:'Doa memohon ampunan di malam yang lebih baik dari seribu bulan.', en:'A prayer seeking forgiveness on the night better than a thousand months.'},
    img:      'https://images.unsplash.com/photo-1587617425953-9075d28b8c46?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    arabic:   'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
    latin:    "Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni.",
    arti:     {id:'Ya Allah, sesungguhnya Engkau Maha Pemaaf, Engkau menyukai pemaafan, maka maafkanlah aku.',
               en:'O Allah, You are All-Forgiving and You love forgiveness, so forgive me.'}
  },
//   {
//     title:    {id:'Doa Khatam Al-Quran',        en:'Quran Completion Prayer'},
//     desc:     {id:'Menutup tilawah dengan penuh kekhusyukan dan harapan.', en:'Closing recitation with full devotion and hope.'},
//     img:      'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&q=70',
//     arabic:   'اللَّهُمَّ ارْحَمْنِي بِالْقُرْآنِ وَاجْعَلْهُ لِي إِمَامًا وَنُورًا وَهُدًى وَرَحْمَةً',
//     latin:    'Allahummarhamniy bil Qur\'an waj\'alhu liy imaman wa nuran wa hudan wa rahmah.',
//     arti:     {id:'Ya Allah, rahmatilah aku dengan Al-Quran dan jadikanlah ia sebagai pemimpin, cahaya, petunjuk, dan rahmat bagiku.',
//                en:'O Allah, have mercy on me through the Quran and make it a leader, light, guidance, and mercy for me.'}
//   },
//   {
//     title:    {id:'Doa Zakat Fitrah',           en:'Zakat Fitrah Prayer'},
//     desc:     {id:'Niat menunaikan zakat fitrah sebagai penyempurna ibadah puasa.', en:'Intention for zakat fitrah as the completion of fasting worship.'},
//     img:      'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=600&q=70',
//     arabic:   'نَوَيْتُ أَنْ أُخْرِجَ زَكَاةَ الْفِطْرِ عَنْ نَفْسِي فَرْضًا لِلَّهِ تَعَالَى',
//     latin:    "Nawaitu an ukhrija zakaatal fithri 'an nafsii fardhan lillahi ta'ala.",
//     arti:     {id:"Aku niat mengeluarkan zakat fitrah dari diriku sendiri, fardhu karena Allah Ta'ala.",
//                en:"I intend to give zakat fitrah from myself as an obligation for the sake of Allah Ta'ala."}
//   },
//   {
//     title:    {id:'Doa Malam Pertama Ramadhan', en:'First Night of Ramadhan'},
//     desc:     {id:'Sambut bulan mulia dengan hati bersih dan penuh semangat.', en:'Welcome the sacred month with a pure heart and full spirit.'},
//     img:      'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=600&q=70',
//     arabic:   'اللَّهُمَّ بَارِكْ لَنَا فِي رَجَبَ وَشَعْبَانَ وَبَلِّغْنَا رَمَضَانَ',
//     latin:    "Allahumma barik lana fi Rajaba wa Sya'bana wa ballighna Ramadhan.",
//     arti:     {id:"Ya Allah, berkahilah kami di bulan Rajab dan Sya'ban, dan sampaikan kami ke bulan Ramadhan.",
//                en:"O Allah, bless us in Rajab and Sha'ban and bring us to Ramadhan."}
//   }
];

/* ══════════════════════════════
   STATE
══════════════════════════════ */
let currentLang = 'id';
let currentTheme = 'dark';

/* ══════════════════════════════
   LANG
══════════════════════════════ */
function setLang(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('data-lang', lang);
  const t = i18n[lang];

  // Buttons
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  // Header
  document.getElementById('headerSubtitle').textContent = t.subtitle;
  document.getElementById('lblDays').textContent   = t.cdLabels[0];
  document.getElementById('lblHours').textContent  = t.cdLabels[1];
  document.getElementById('lblMins').textContent   = t.cdLabels[2];
  document.getElementById('lblSecs').textContent   = t.cdLabels[3];

  // Nav
  const navLinks = document.querySelectorAll('#mainNav a');
  navLinks.forEach((a, i) => { a.textContent = t.nav[i]; });

  // Section
  document.getElementById('doaEyebrow').textContent = t.doaEyebrow;
  document.getElementById('doaTitle').textContent   = t.doaTitle;
  document.getElementById('doaSubtitle').textContent = t.doaSubtitle;
  document.getElementById('mTag').textContent = t.mTag;

  // Cards
  rebuildCards();
}

function rebuildCards() {
  const lang = currentLang;
  const t = i18n[lang];
  const grid = document.getElementById('doaGrid');
  grid.innerHTML = '';
  doas.forEach((d, i) => {
    const card = document.createElement('div');
    card.className = 'doa-card';
    card.onclick = () => openModal(i);
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
  // Touch support
  if ('ontouchstart' in window) {
    grid.querySelectorAll('.doa-card').forEach(card => {
      card.addEventListener('touchend', function(e){
        if (!this.classList.contains('touched')) {
          e.preventDefault();
          document.querySelectorAll('.doa-card').forEach(c=>c.classList.remove('touched'));
          this.classList.add('touched');
        }
      });
    });
  }
}

function openModal(i) {
  const d = doas[i];
  const lang = currentLang;
  document.getElementById('mTag').textContent   = i18n[lang].mTag;
  document.getElementById('mTitle').textContent = d.title[lang];
  document.getElementById('mArabic').textContent= d.arabic;
  document.getElementById('mLatin').textContent = d.latin;
  document.getElementById('mArti').textContent  = d.arti[lang];
  document.getElementById('doaModal').classList.add('open');
}
document.getElementById('modalClose').onclick = () =>
  document.getElementById('doaModal').classList.remove('open');
document.getElementById('doaModal').onclick = e => {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
};

/* ══════════════════════════════
   THEME
══════════════════════════════ */
function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  document.getElementById('themeBtn').textContent = currentTheme === 'dark' ? '🌙' : '☀️';
}

/* ══════════════════════════════
   STARS
══════════════════════════════ */
const starsEl = document.getElementById('starsLayer');
for (let i=0;i<120;i++){
  const s=document.createElement('div'); s.className='star';
  const sz=Math.random()*2.5+.5;
  s.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--dur:${Math.random()*3+2}s;--delay:${Math.random()*4}s;--min-op:${Math.random()*.3+.05}`;
  starsEl.appendChild(s);
}

/* ══════════════════════════════
   PARTICLES
══════════════════════════════ */
const pEl=document.getElementById('particles');
for (let i=0;i<18;i++){
  const p=document.createElement('div'); p.className='particle';
  const sz=Math.random()*4+1;
  p.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;bottom:${Math.random()*30}%;--dur:${Math.random()*4+3}s;--delay:${Math.random()*5}s`;
  pEl.appendChild(p);
}

/* ══════════════════════════════
   COUNTDOWN
══════════════════════════════ */
function tick(){
  const target=new Date('2026-03-20T00:00:00');
  const now=new Date(); let diff=target-now;
  if(diff<0)diff=0;
  const d=Math.floor(diff/86400000);
  const h=Math.floor((diff%86400000)/3600000);
  const m=Math.floor((diff%3600000)/60000);
  const s=Math.floor((diff%60000)/1000);
  document.getElementById('cdDays').textContent =String(d).padStart(2,'0');
  document.getElementById('cdHours').textContent=String(h).padStart(2,'0');
  document.getElementById('cdMins').textContent =String(m).padStart(2,'0');
  document.getElementById('cdSecs').textContent =String(s).padStart(2,'0');
}
tick(); setInterval(tick,1000);

/* Init */
rebuildCards();