
//  RAMADHAN IMSAKIYAH — jadwal_imsakiyah.js
//
// Alur kerja:
//   1. initImsakiyah() dipanggil dari index.html setelah HTML komponen diinject
//   2. fetchDaftarKota() → populate dropdown dari /kota/semua
//   3. fetchJadwalBulanan() → ambil jadwal sesuai kota + bulan yang aktif
//   4. renderKartuHariIni() → tampilkan 6 pill waktu sholat hari ini
//   5. renderTabelBulanan() → isi tabel 30 hari + highlight baris hari ini
//
// Bahasa diambil dari i18n global (global.js). Nama bulan dan badge
// "Hari Ini" diupdate otomatis via MutationObserver tiap kali bahasa diganti.

function initImsakiyah() {

  // Shortcut getElementById biar tidak capek nulis panjang-panjang terus
  const elmt = id => document.getElementById(id);

  const BASE_API = 'https://api.myquran.com/v2/sholat';

  // Referensi elemen DOM  
  const kotaSelectEl       = elmt('kotaSelect');
  const citySkeletonEl     = elmt('citySkeleton');
  const loadingStateEl     = elmt('loadingState');
  const errorStateEl       = elmt('errorState');
  const tableWrapEl        = elmt('tableWrap');
  const jadwalBodyEl       = elmt('jadwalBody');
  const todayCardEl        = elmt('todayCard');
  const timesGridEl        = elmt('timesGrid');
  const monthNameEl        = elmt('monthName');
  const monthYearEl        = elmt('monthYear');
  const todayDateEl        = elmt('todayDate');
  const todayCityEl        = elmt('todayCity');
  const retryBtnEl         = elmt('retryBtn');

  // Keluar kalau komponen belum ada di DOM — artinya loadComponent belum selesai
  if (!kotaSelectEl) return;

  // State 
  const hariIni    = new Date();
  let viewYear     = hariIni.getFullYear();
  let viewMonth    = hariIni.getMonth() + 1; // API pakai 1–12
  let lastKotaId   = null;                   // untuk keperluan tombol retry

  //  Data teks per bahasa 

  // Label nama waktu sholat — beda antara Indonesia dan English
  const labelWaktuSholat = {
    id: { imsak:'Imsak', subuh:'Subuh', dzuhur:'Dzuhur', ashar:'Ashar', maghrib:'Maghrib', isya:'Isya' },
    en: { imsak:'Suhoor', subuh:'Fajr', dzuhur:'Dhuhr', ashar:'Asr', maghrib:'Maghrib', isya:'Isha' }
  };

  const namaBulan = {
    id: ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
    en: ['January','February','March','April','May','June','July','August','September','October','November','December']
  };

  // Helper language
  function getLang() {
    return (typeof currentLang !== 'undefined' ? currentLang : 'id');
  }

  function getLabelHariIni() {
    return getLang() === 'en' ? 'Today' : 'Hari Ini';
  }

  // Update display bulan di navigator 
  function updateTampilBulan() {
    monthNameEl.textContent = namaBulan[getLang()][viewMonth - 1];
    monthYearEl.textContent = viewYear;
  }

  // Manajemen state tampilan  
  // Tiga state: loading, error, ready (tabel + kartu hari ini)
  function tampilkanLoading() {
    loadingStateEl.style.display = 'block';
    errorStateEl.style.display   = 'none';
    tableWrapEl.style.display    = 'none';
    todayCardEl.style.display    = 'none';
  }

  function tampilkanError() {
    loadingStateEl.style.display = 'none';
    errorStateEl.style.display   = 'block';
    tableWrapEl.style.display    = 'none';
    todayCardEl.style.display    = 'none';
  }

  function tampilkanData() {
    loadingStateEl.style.display = 'none';
    errorStateEl.style.display   = 'none';
    tableWrapEl.style.display    = 'block';
    // Kartu hari ini hanya tampil kalau bulan yang dilihat = bulan sekarang
    const sedangLihatBulanIni =
      viewYear === hariIni.getFullYear() && viewMonth === hariIni.getMonth() + 1;
    todayCardEl.style.display = sedangLihatBulanIni ? 'flex' : 'none';
  }

  // Fetch daftar semua kota 
  // Populate dropdown sekali waktu init, tidak perlu fetch lagi setelahnya
  async function fetchDaftarKota() {
    try {
      const response = await fetch(`${BASE_API}/kota/semua`);
      const json     = await response.json();

      if (!json.status || !Array.isArray(json.data)) throw new Error('Data kota tidak valid');

      // Urutkan alfabetis — API tidak jamin urutan
      json.data
        .sort((a, b) => a.lokasi.localeCompare(b.lokasi))
        .forEach(kota => {
          const option = document.createElement('option');
          option.value = kota.id;
          // API kasih huruf kapital semua ("KOTA JAKARTA") — bikin lebih rapi
          option.textContent = kota.lokasi
            .toLowerCase()
            .replace(/\b\w/g, huruf => huruf.toUpperCase());
          kotaSelectEl.appendChild(option);
        });

      // Sembunyikan skeleton, tampilkan dropdown yang sudah terisi
      citySkeletonEl.style.display = 'none';
      kotaSelectEl.style.display   = 'block';

      // Default ke Jakarta Pusat, atau Jakarta apapun kalau tidak ada
      const defaultKota = json.data.find(k =>
        k.lokasi.includes('JAKARTA PUSAT') || k.lokasi.includes('JAKARTA')
      );
      if (defaultKota) kotaSelectEl.value = defaultKota.id;

      fetchJadwalBulanan(kotaSelectEl.value);

    } catch (error) {
      console.error('fetchDaftarKota gagal:', error);
      citySkeletonEl.style.display = 'none';
      tampilkanError();
    }
  }

  // Fetch jadwal sholat bulanan 
  // Dipanggil tiap kali kota atau bulan berubah
  async function fetchJadwalBulanan(kotaId) {
    if (!kotaId) return;
    lastKotaId = kotaId;
    tampilkanLoading();

    try {
      const url      = `${BASE_API}/jadwal/${kotaId}/${viewYear}/${viewMonth}`;
      const response = await fetch(url);
      const json     = await response.json();

      if (!json.status || !json.data) throw new Error('Data jadwal tidak valid');

      const { lokasi, jadwal } = json.data;

      renderKartuHariIni(jadwal, lokasi);
      renderTabelBulanan(jadwal);
      tampilkanData();

    } catch (error) {
      console.error('fetchJadwalBulanan gagal:', error);
      tampilkanError();
    }
  }

  // Render kartu hari ini (6 pill waktu sholat) 
  function renderKartuHariIni(jadwal, namaKota) {
    const tanggalHariIni = hariIni.toISOString().split('T')[0]; // format YYYY-MM-DD
    const dataHariIni    = jadwal.find(j => j.date === tanggalHariIni);

    if (!dataHariIni) return;

    todayDateEl.textContent = dataHariIni.tanggal;
    todayCityEl.textContent = namaKota
      .toLowerCase()
      .replace(/\b\w/g, huruf => huruf.toUpperCase());

    const urutan    = ['imsak', 'subuh', 'dzuhur', 'ashar', 'maghrib', 'isya'];
    const label     = labelWaktuSholat[getLang()];
    const waktuAktif = tentukanWaktuSholatAktif(dataHariIni);

    timesGridEl.innerHTML = urutan.map(kunci => `
      <div class="imsak-time-pill ${kunci === waktuAktif ? 'active' : ''}">
        <span class="imsak-pill-name">${label[kunci]}</span>
        <span class="imsak-pill-time">${dataHariIni[kunci]}</span>
      </div>
    `).join('');
  }

  // Tentukan waktu sholat yang sedang aktif berdasarkan jam sekarang.
  // Cara kerja: konversi semua waktu ke menit, bandingkan dengan menit sekarang.
  // Waktu sholat terakhir yang sudah lewat = yang sedang aktif.
  function tentukanWaktuSholatAktif(dataJadwal) {
    const menitSekarang = hariIni.getHours() * 60 + hariIni.getMinutes();

    const keUrutanMenit = str => {
      const [jam, menit] = str.split(':');
      return +jam * 60 + +menit;
    };

    const urutanWaktu = [
      { kunci: 'imsak',   menit: keUrutanMenit(dataJadwal.imsak) },
      { kunci: 'subuh',   menit: keUrutanMenit(dataJadwal.subuh) },
      { kunci: 'dzuhur',  menit: keUrutanMenit(dataJadwal.dzuhur) },
      { kunci: 'ashar',   menit: keUrutanMenit(dataJadwal.ashar) },
      { kunci: 'maghrib', menit: keUrutanMenit(dataJadwal.maghrib) },
      { kunci: 'isya',    menit: keUrutanMenit(dataJadwal.isya) },
    ];

    let waktuAktif = urutanWaktu[0].kunci;
    for (const waktu of urutanWaktu) {
      if (menitSekarang >= waktu.menit) waktuAktif = waktu.kunci;
    }

    return waktuAktif;
  }

  //  Render tabel jadwal bulanan 
  function renderTabelBulanan(jadwal) {
    const tanggalHariIni = hariIni.toISOString().split('T')[0];
    const labelHariIni   = getLabelHariIni();

    jadwalBodyEl.innerHTML = jadwal.map(item => {
      const isHariIni = item.date === tanggalHariIni;

      return `
        <tr class="${isHariIni ? 'today' : ''}">
          <td ${isHariIni ? `data-today-label="${labelHariIni}"` : ''}>${item.tanggal}</td>
          <td>${item.imsak}</td>
          <td>${item.subuh}</td>
          <td>${item.dzuhur}</td>
          <td>${item.ashar}</td>
          <td>${item.maghrib}</td>
          <td>${item.isya}</td>
        </tr>
      `;
    }).join('');

    // Scroll otomatis ke baris hari ini biar langsung keliatan tanpa harus scroll manual
    const barisHariIni = jadwalBodyEl.querySelector('tr.today');
    if (barisHariIni) {
      setTimeout(() => barisHariIni.scrollIntoView({ behavior: '', block: 'center' }), 300);
    }
  }

  // Event listeners 
  kotaSelectEl.addEventListener('change', () => fetchJadwalBulanan(kotaSelectEl.value));

  elmt('btnPrevMonth').addEventListener('click', () => {
    if (--viewMonth < 1) { viewMonth = 12; viewYear--; }
    updateTampilBulan();
    fetchJadwalBulanan(kotaSelectEl.value);
  });

  elmt('btnNextMonth').addEventListener('click', () => {
    if (++viewMonth > 12) { viewMonth = 1; viewYear++; }
    updateTampilBulan();
    fetchJadwalBulanan(kotaSelectEl.value);
  });

  retryBtnEl.addEventListener('click', () => {
    // Kalau kota sudah pernah di-fetch → retry jadwal saja
    // Kalau belum (gagal di fase load kota) → retry dari awal
    if (lastKotaId) {
      fetchJadwalBulanan(lastKotaId);
    } else {
      fetchDaftarKota();
    }
  });

  // Sinkronisasi bahasa  
  // Waktu bahasa diganti, nama bulan dan badge "Hari Ini" harus ikut berubah
  function sinkronisasiBahasa() {
    updateTampilBulan();

    // Update data-today-label di semua baris hari ini yang sudah ter-render
    jadwalBodyEl.querySelectorAll('tr.today td:first-child').forEach(td => {
      td.setAttribute('data-today-label', getLabelHariIni());
    });
  }

  new MutationObserver(sinkronisasiBahasa)
    .observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-lang']
    });

  if (window.languageListeners) {
    window.languageListeners.push(sinkronisasiBahasa);
  }

  updateTampilBulan();
  fetchDaftarKota();
}