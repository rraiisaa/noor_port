const doas = [
    {
        title: { id: 'Doa Berbuka Puasa', en: 'Breaking Fast Prayer' },
        desc: { id: 'Doa penuh syukur saat menyempurnakan puasa.', en: 'A prayer of gratitude when completing your fast.' },
        img: 'https://plus.unsplash.com/premium_photo-1677516158026-9d3e07f0efb8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        arabic: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللهُ تَعَالَى',
        latin: "Dhahaba adh-dhama'u wa abtallatil 'uruuqu wa thabata al-'ajru in sya'a Allah ta'ala.",
        arti: {
            id: "Telah hilang rasa haus, telah basah urat-urat, dan telah pasti ganjaran, dengan kehendak Allah Ta'ala.",
            en: "The thirst is gone, the veins are wet, and the reward is certain, by the will of Allah Ta'ala."
        }
    },
    {
        title: { id: 'Doa Setelah Sahur', en: 'Post-Suhoor Prayer' },
        desc: { id: 'Awali puasamu dengan niat yang tulus dan hati yang tenang.', en: 'Begin your fast with sincere intention and a calm heart.' },
        img: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=600&q=70',
        arabic: 'يَرْحَمُ اللَّهُ الْمُتَسَحَّرِينَ',
        latin: "Yarhamullahul mutasahhirin.",
        arti: {
            id: "Semoga Allah menurunkan rahmat-Nya bagi mereka yang bersahur.",
            en: "May Allah bestow His mercy upon those who eat sahur."
        }
    },
    {
        title: { id: 'Doa Malam Lailatul Qadr', en: 'Laylatul Qadr Prayer' },
        desc: { id: 'Doa memohon ampunan di malam yang lebih baik dari seribu bulan.', en: 'A prayer seeking forgiveness on the night better than a thousand months.' },
        img: 'https://images.unsplash.com/photo-1587617425953-9075d28b8c46?q=80&w=1170&auto=format&fit=crop',
        arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
        latin: "Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni.",
        arti: {
            id: 'Ya Allah, sesungguhnya Engkau Maha Pemaaf, Engkau menyukai pemaafan, maka maafkanlah aku.',
            en: 'O Allah, You are All-Forgiving and You love forgiveness, so forgive me.'
        }
    },
];

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

    // Touch support — biar hover effect jalan di HP juga
    if ('ontouchstart' in window) {
        grid.querySelectorAll('.doa-card').forEach(card => {
            card.addEventListener('touchend', function (e) {
                if (!this.classList.contains('touched')) {
                    e.preventDefault();
                    document.querySelectorAll('.doa-card').forEach(c => c.classList.remove('touched'));
                    this.classList.add('touched');
                }
            });
        });
    }
}

function openModal(i) {
    const d = doas[i];
    const lang = currentLang;
    document.getElementById('mTag').textContent    = i18n[lang].mTag;
    document.getElementById('mTitle').textContent  = d.title[lang];
    document.getElementById('mArabic').textContent = d.arabic;
    document.getElementById('mLatin').textContent  = d.latin;
    document.getElementById('mArti').textContent   = d.arti[lang];
    document.getElementById('doaModal').classList.add('open');
}

// ─── FIX: event delegation di document ───────────────────────────
// Tidak perlu tunggu DOM siap — document SELALU ada saat script load
// Bekerja meskipun doa.js dipanggil sebelum elemen modal ada di HTML
document.addEventListener('click', function (e) {
    const modalBg = document.getElementById('doaModal');
    if (!modalBg) return;

    // Klik tombol ✕ (atau child-nya)
    if (e.target.closest('#modalClose')) {
        e.stopPropagation();
        modalBg.classList.remove('open');
        return;
    }

    // Klik backdrop (bukan isi modal)
    if (e.target === modalBg) {
        modalBg.classList.remove('open');
    }
});

function initDoaSection() {
    rebuildCards();
}