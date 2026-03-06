(function () {

  // State
  let currentLang = 'id';   // 'id' | 'en'
  let currentTheme = 'dark'; // 'dark' | 'light'


  /* Theme */
  function applyTheme() {
    const section = document.getElementById('zakat-calculator');
    const moonIcon = document.getElementById('theme-icon-moon');
    const sunIcon = document.getElementById('theme-icon-sun');
    const themeLabel = document.getElementById('theme-label');

    if (currentTheme === 'light') {
      section.setAttribute('data-theme', 'light');
      moonIcon.style.display = 'block';
      sunIcon.style.display = 'none';
      themeLabel.textContent = 'Dark';
    } else {
      section.removeAttribute('data-theme');
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'block';
      themeLabel.textContent = 'Light';
    }
  }


  /* Switch Type Zakat (Penghasilan - Emas) */
  function zakatSwitchType() {
    const type = document.getElementById('zakat-type').value;

    document.getElementById('section-penghasilan')
      .classList.toggle('active', type === 'penghasilan');
    document.getElementById('section-emas')
      .classList.toggle('active', type === 'emas');

    // Sembunyikan hasil sebelumnya kalo formatnya ganti, biar ga bingung
    document.getElementById('zakat-result').classList.remove('visible');

    clearErrors();
  }

  // Validasi Error
  function clearErrors() {
    document.querySelectorAll('.zakat-field.has-error')
      .forEach(f => f.classList.remove('has-error'));
  }

  function parseNumber(val) {
  if (!val) return 0;
  return parseFloat(val.replace(/\./g, '').replace(/,/g, '.')) || 0;
}

  /**
   * Tandai sebuah field dengan class "has-error" untuk styling error (misal border merah)
   * @param {string} fieldId
   */
  function markError(fieldId) {
    document.getElementById(fieldId).classList.add('has-error');
  }


  // Currecy Formatter (Rupiah)
  function formatRp(num) {
    if (num === 0) return 'Rp 0';
    return 'Rp ' + Math.round(num).toLocaleString('id-ID');
  }


  /* AUTO HITUNG PENGHASILAN TAHUNAN */

  function updateTahunan() {

    const gaji = parseFloat(document.getElementById('input-gaji').value);
    const lain = parseFloat(document.getElementById('input-lain').value);

    const totalTahunan = (gaji + lain) * 12;

    const tahunanInput = document.getElementById('input-tahunan');

    if (tahunanInput) {
      tahunanInput.value = Math.round(totalTahunan);
    }

  }


  /* KALKULATOR UTAMA
     
  Formula: 
  - Nisab = harga emas × 85 gram
  - Zakat = 2.5% × total kekayaan (jika total kekayaan ≥ nisab)
  */

  function zakatCalculate() {
    clearErrors();

    const type = document.getElementById('zakat-type').value;
    const goldPrice = parseFloat(document.getElementById('input-gold-price').value);
    const t = i18n[currentLang];
    let valid = true;
    let total = 0;

    // 1. Validasi harga emas
    const gpRaw = document.getElementById('input-gold-price').value.trim();
    if (!gpRaw || isNaN(goldPrice) || goldPrice <= 0) {
      markError('field-goldprice');
      valid = false;
    }

    // 2. Validasi input berdasarkan jenis zakat yang dipilih
    if (type === 'penghasilan') {

      const gajiRaw = document.getElementById('input-gaji').value.trim();
      const gaji = parseFloat(gajiRaw);

      if (!gajiRaw || isNaN(gaji) || gaji < 0) {
        markError('field-gaji');
        valid = false;
      }

      const lain = parseFloat(document.getElementById('input-lain').value);

      if (!isNaN(gaji)) {
        total = (gaji + lain) * 12;
      }

    } else if (type === 'emas') {

      const gramRaw = document.getElementById('input-gram').value.trim();
      const gram = parseFloat(gramRaw);

      if (!gramRaw || isNaN(gram) || gram <= 0) {
        markError('field-gram');
        valid = false;
      }

      if (!isNaN(gram) && !isNaN(goldPrice)) {
        total = gram * goldPrice;
      }

    }

    if (!valid) return;

    // 3. Logic Zakat
    const nisab = goldPrice * 85;
    const isWajib = total >= nisab;
    const zakatAmt = isWajib ? total * 0.025 : 0;

    // 4. Render Values Result
    document.getElementById('result-wealth').textContent = formatRp(total);
    document.getElementById('result-nisab').textContent = formatRp(nisab);
    document.getElementById('result-zakat-amount').textContent = formatRp(zakatAmt);

    const badge = document.getElementById('result-status-badge');
    badge.textContent = isWajib ? t.status_wajib : t.status_tidak;
    badge.className = 'status-badge ' + (isWajib ? 'wajib' : 'tidak');

    // 5. Munculkan Card Result
    const resultEl = document.getElementById('zakat-result');
    resultEl.classList.add('visible');
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* Event Linetener Input */

  document.addEventListener("DOMContentLoaded", function () {

    const gajiInput = document.getElementById('input-gaji');
    const lainInput = document.getElementById('input-lain');

    if (gajiInput) {
      gajiInput.addEventListener('input', updateTahunan);
    }

    if (lainInput) {
      lainInput.addEventListener('input', updateTahunan);
    }

  });

  window.zakatToggleLang = function () {
    currentLang = (currentLang === 'id') ? 'en' : 'id';
    applyLang();
  };

  window.zakatToggleTheme = function () {
    currentTheme = (currentTheme === 'dark') ? 'light' : 'dark';
    applyTheme();
  };

  window.zakatSwitchType = zakatSwitchType;
  window.zakatCalculate = zakatCalculate;


  applyLang();
  applyTheme();

})();