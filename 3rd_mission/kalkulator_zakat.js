// kalkulator_zakat.js
//
// Kalkulator zakat penghasilan dan zakat emas.
// Komponen ini tidak punya state bahasa/tema sendiri —
// semuanya diambil dari global.js (variabel i18n dan currentLang).
// Jadi pastikan global.js di-load sebelum file ini.
//
// Formula yang dipakai:
//   Nisab  = harga emas per gram × 85
//   Zakat  = 2.5% × total harta (hanya jika total ≥ nisab)
//   Zakat Penghasilan = (gaji + penghasilan lain) × 12 bulan

(function () {


  // Ambil teks dari i18n global
  // Kalau i18n belum tersedia (misalnya load order salah), fallback ke bahasa Indonesia
  function t(key) {
    if (typeof i18n !== 'undefined' && typeof currentLang !== 'undefined') {
      return i18n[currentLang]?.[key] ?? i18n['id']?.[key] ?? '';
    }
    return '';
  }


  // Switch jenis zakat (Penghasilan ↔ Emas) 
  // Dipanggil dari onchange di select element
  function zakatSwitchType() {
    const tipe = document.getElementById('zakat-type').value;

    document.getElementById('section-penghasilan').classList.toggle('active', tipe === 'penghasilan');
    document.getElementById('section-emas').classList.toggle('active', tipe === 'emas');

    // Sembunyikan hasil lama biar tidak membingungkan ketika tipe diganti
    const resultEl = document.getElementById('zakat-result');
    if (resultEl) resultEl.classList.remove('visible');

    clearErrors();
  }


  // Bersihkan semua error validation
  function clearErrors() {
    document.querySelectorAll('.zakat-field.has-error')
      .forEach(f => f.classList.remove('has-error'));
  }


  // Tandai field yang tidak valid 
  function markError(fieldId) {
    const el = document.getElementById(fieldId);
    if (el) el.classList.add('has-error');
  }


  // Format angka ke Rupiah 
  function formatRp(num) {
    if (!num || num === 0) return 'Rp 0';
    return 'Rp ' + Math.round(num).toLocaleString('id-ID');
  }


  // Kalkulasi utama 
  // Dipanggil saat tombol "Hitung Zakat" diklik
  function zakatCalculate() {
    clearErrors();

    const tipe      = document.getElementById('zakat-type').value;
    const goldPrice = parseFloat(document.getElementById('input-gold-price').value);
    let valid       = true;
    let total       = 0;

    // Validasi harga emas — wajib diisi di semua jenis zakat
    if (!document.getElementById('input-gold-price').value.trim() || isNaN(goldPrice) || goldPrice <= 0) {
      markError('field-goldprice');
      valid = false;
    }

    if (tipe === 'penghasilan') {
      const gajiVal = document.getElementById('input-gaji').value.trim();
      const gaji    = parseFloat(gajiVal);
      const lain    = parseFloat(document.getElementById('input-lain').value) || 0;

      if (!gajiVal || isNaN(gaji) || gaji < 0) {
        markError('field-gaji');
        valid = false;
      }

      // Zakat penghasilan dihitung dari total setahun
      if (!isNaN(gaji)) total = (gaji + lain) * 12;

    } else if (tipe === 'emas') {
      const gramVal = document.getElementById('input-gram').value.trim();
      const gram    = parseFloat(gramVal);

      if (!gramVal || isNaN(gram) || gram <= 0) {
        markError('field-gram');
        valid = false;
      }

      // Zakat emas: konversi berat ke nilai rupiah dulu
      if (!isNaN(gram) && !isNaN(goldPrice)) total = gram * goldPrice;
    }

    if (!valid) return;

    // Hitung zakat
    const nisab    = goldPrice * 85;           // nisab = 85 gram emas
    const isWajib  = total >= nisab;
    const zakatAmt = isWajib ? total * 0.025 : 0;  // 2.5% dari total harta

    // Tampilkan hasil
    document.getElementById('result-wealth').textContent      = formatRp(total);
    document.getElementById('result-nisab').textContent       = formatRp(nisab);
    document.getElementById('result-zakat-amount').textContent = formatRp(zakatAmt);

    const badge       = document.getElementById('result-status-badge');
    badge.textContent = isWajib ? t('status_wajib') : t('status_tidak');
    badge.className   = 'status-badge ' + (isWajib ? 'wajib' : 'tidak');

    // Munculkan result section dengan animasi expand (max-height transition di CSS)
    const resultEl = document.getElementById('zakat-result');
    resultEl.classList.add('visible');
    setTimeout(() => {
      resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100); // tunda sedikit biar transisi max-height selesai dulu sebelum scroll
  }


  // Auto-hitung total tahunan saat input gaji berubah 
  // Fungsi ini opsional — hanya jalan kalau ada elemen #input-tahunan di HTML
  function updateTahunan() {
    const gaji = parseFloat(document.getElementById('input-gaji')?.value) || 0;
    const lain = parseFloat(document.getElementById('input-lain')?.value) || 0;
    const tahunanEl = document.getElementById('input-tahunan');
    if (tahunanEl) tahunanEl.value = Math.round((gaji + lain) * 12);
  }


  // Event listener
  document.addEventListener('DOMContentLoaded', function () {
    const gajiInput = document.getElementById('input-gaji');
    const lainInput = document.getElementById('input-lain');
    if (gajiInput) gajiInput.addEventListener('input', updateTahunan);
    if (lainInput) lainInput.addEventListener('input', updateTahunan);
  });


  // ── Expose ke global scope ────────────────────────────────────────────────
  // Dua fungsi ini dipanggil dari atribut HTML (onchange, onclick)
  // jadi harus bisa diakses dari luar IIFE ini

  window.zakatSwitchType = zakatSwitchType;
  window.zakatCalculate  = zakatCalculate;

})();