
//  RAMADHAN TODO — todo-list.js
//
//  i18n TIDAK didefinisikan di sini — diambil dari global.js
//  yang sudah punya object i18n lengkap dengan semua key todo.
//
//  Syarat: global.js harus di-load SEBELUM file ini.
//  <script src="/main/script.js"></script>        ← global.js
//  <script src="/4rd_mission/todo-list.js"></script>

(function () {

  // Baca bahasa aktif dari state global (diset oleh global.js)
  function getLang() {
    if (typeof currentLang !== 'undefined' && currentLang) return currentLang;
    return document.documentElement.getAttribute('data-lang') || 'id';
  }

  // Ambil object teks dari i18n global
  function T() {
    if (typeof i18n !== 'undefined') return i18n[getLang()] || i18n.id;
    console.warn('todo-list.js: i18n global tidak ditemukan! Pastikan global.js di-load duluan.');
    return {};
  }


  //  initRamadhanTodo — dipanggil dari index.html:
  //  loadComponent("todo-component", "...html", () => initRamadhanTodo())
  window.initRamadhanTodo = function () {

    const root = document.getElementById('ramadhanChecker');
    if (!root) {
      console.warn('initRamadhanTodo: #ramadhanChecker tidak ditemukan!');
      return;
    }

    // Load data dari localStorage
    let shalatData = JSON.parse(localStorage.getItem('r_shalat') || '[]');
    let quranData  = JSON.parse(localStorage.getItem('r_quran')  || '{"target":20,"read":0,"done":false}');
    let puasaData  = JSON.parse(localStorage.getItem('r_puasa')  || '{"days":[],"today":false}');
    let dzikirData = JSON.parse(localStorage.getItem('r_dzikir') || '[]');


    // Helpers 
    function setBar(barId, pctId, pct) {
      const bar = root.querySelector('#' + barId);
      if (bar) bar.style.width = pct + '%';
      if (pctId) {
        const el = root.querySelector('#' + pctId);
        if (el) el.textContent = pct + '%';
      }
    }

    function showToast(msg) {
      const toast = document.createElement('div');
      toast.className = 'ramadhan-toast';
      toast.textContent = msg;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2200);
    }

    function getPct(id) {
      const el = root.querySelector('#' + id);
      return el ? parseFloat(el.style.width) || 0 : 0;
    }

    function h(sel, txt) {
      const el = root.querySelector(sel);
      if (el) el.textContent = txt;
    }


    // Update teks sesuai bahasa 
    function updateTexts() {
      const t = T();
      h('.ramadhan-progress-label',  t.progressLabel);
      root.querySelectorAll('.ramadhan-tab').forEach((tab, i) => {
        if (t.tabs && t.tabs[i]) tab.textContent = t.tabs[i];
      });
      h('#panel-shalat h3',  t.shalatTitle);
      h('#quranPanelTitle',  t.quranTitle);
      h('#puasaPanelTitle',  t.puasaTitle);
      h('#dzikirPanelTitle', t.dzikirTitle);
      h('#lblTargetHalaman', t.targetLabel);
      h('#lblHalamanDibaca', t.readLabel);
      h('#lblMarkDone',      t.markDone);
      h('#lblPuasaToday',    t.puasaTodayLabel);
      root.querySelectorAll('.ramadhan-save-btn').forEach(b => b.textContent = t.saveBtn);
      const inp = root.querySelector('#dzikirTodoInput');
      if (inp) inp.placeholder = t.todoPlaceholder;
      const empty = root.querySelector('.ramadhan-todo-empty');
      if (empty) empty.textContent = t.dzikirEmpty;
    }


    // Total Progress
    function updateTotalProgress() {
      const avg = Math.round(
        (getPct('shalatBar') + getPct('quranBar') + getPct('puasaBar') + getPct('dzikirBar')) / 4
      );
      setBar('ramadhanTotalBar', null, avg);
      h('#ramadhanTotalPct', avg + '%');
      const t = T();
      if (t.progressMsgs) {
        h('#ramadhanProgressMsg',
          avg <= 30 ? t.progressMsgs[0] : avg <= 70 ? t.progressMsgs[1] : t.progressMsgs[2]
        );
      }
    }

    function updateAllProgress() {
      updateShalatProgress();
      updateQuranProgress();
      updatePuasaProgress();
      updateDzikirProgress();
    }


    // Tab 1: Shalat
    function buildShalatList() {
      const list = root.querySelector('#shalatList');
      if (!list) return;
      list.innerHTML = '';
      const items = T().shalatItems || ['Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'];
      items.forEach((name, i) => {
        const lbl = document.createElement('label');
        lbl.className = 'ramadhan-check-item';
        lbl.innerHTML = `
          <input type="checkbox" ${shalatData[i] ? 'checked' : ''}>
          <span class="ramadhan-check-box"></span>
          <span class="ramadhan-check-text">${name}</span>
        `;
        lbl.querySelector('input').addEventListener('change', e => {
          shalatData[i] = e.target.checked;
          updateShalatProgress();
        });
        list.appendChild(lbl);
      });
      updateShalatProgress();
    }

    function updateShalatProgress() {
      const done = shalatData.filter(Boolean).length;
      const pct  = Math.round(done / 5 * 100);
      setBar('shalatBar', 'shalatPct', pct);
      const t = T();
      if (t.shalatStatus) {
        h('#shalatStatus',
          pct <= 40 ? t.shalatStatus[0] : pct < 100 ? t.shalatStatus[1] : t.shalatStatus[2]
        );
      }
      updateTotalProgress();
    }


    // Tab 2: Qur'an
    function initQuranInputs() {
      const elTarget = root.querySelector('#quranTarget');
      const elRead   = root.querySelector('#quranRead');
      const elDone   = root.querySelector('#quranDone');
      if (!elTarget || !elRead || !elDone) return;

      elTarget.value = quranData.target;
      elRead.value   = quranData.read;
      elDone.checked = quranData.done;

      const update = () => {
        quranData.target = parseInt(elTarget.value) || 1;
        quranData.read   = parseInt(elRead.value)   || 0;
        quranData.done   = elDone.checked;
        updateQuranProgress();
      };
      elTarget.addEventListener('input',  update);
      elRead.addEventListener('input',    update);
      elDone.addEventListener('change',   update);
      updateQuranProgress();
    }

    function updateQuranProgress() {
      const pct = quranData.done
        ? 100
        : Math.min(100, Math.round(quranData.read / Math.max(1, quranData.target) * 100));
      setBar('quranBar', 'quranPct', pct);
      const t = T();
      if (t.quranStatus) {
        h('#quranStatus',
          pct < 50 ? t.quranStatus[0] : pct < 100 ? t.quranStatus[1] : t.quranStatus[2]
        );
      }
      updateTotalProgress();
    }


    // Tab 3: Puasa 
    function buildPuasaCalendar() {
      const cal = root.querySelector('#puasaCalendar');
      if (!cal) return;
      cal.innerHTML = '';
      for (let d = 1; d <= 30; d++) {
        const day = document.createElement('div');
        day.className = 'ramadhan-cal-day' + (puasaData.days.includes(d) ? ' done' : '');
        day.textContent = puasaData.days.includes(d) ? '✓' : d;
        day.addEventListener('click', () => {
          const idx = puasaData.days.indexOf(d);
          if (idx === -1) {
            puasaData.days.push(d);
            day.classList.add('done');
            day.textContent = '✓';
          } else {
            puasaData.days.splice(idx, 1);
            day.classList.remove('done');
            day.textContent = d;
          }
          updatePuasaProgress();
        });
        cal.appendChild(day);
      }
      const todayEl = root.querySelector('#puasaToday');
      if (todayEl) {
        todayEl.checked = puasaData.today;
        todayEl.addEventListener('change', e => {
          puasaData.today = e.target.checked;
          updatePuasaProgress();
        });
      }
      updatePuasaProgress();
    }

    function updatePuasaProgress() {
      const done = puasaData.days.length + (puasaData.today ? 1 : 0);
      const pct  = Math.min(100, Math.round(done / 30 * 100));
      setBar('puasaBar', 'puasaPct', pct);
      const t = T();
      if (t.puasaStatus) {
        h('#puasaStatus',
          done <= 10 ? t.puasaStatus[0] : done <= 20 ? t.puasaStatus[1] : t.puasaStatus[2]
        );
      }
      updateTotalProgress();
    }


    // Tab 4: Dzikir Custom To-Do 
    function buildDzikirList() {
      const list = root.querySelector('#dzikirList');
      if (!list) return;
      list.innerHTML = '';

      if (dzikirData.length === 0) {
        list.innerHTML = `<div class="ramadhan-todo-empty">${T().dzikirEmpty || ''}</div>`;
      } else {
        dzikirData.forEach((item, i) => {
          const lbl = document.createElement('label');
          lbl.className = 'ramadhan-check-item';
          lbl.innerHTML = `
            <input type="checkbox" ${item.done ? 'checked' : ''}>
            <span class="ramadhan-check-box"></span>
            <span class="ramadhan-check-text" style="flex:1">${item.text}</span>
            <button class="ramadhan-todo-del" type="button">✕</button>
          `;
          lbl.querySelector('input').addEventListener('change', e => {
            dzikirData[i].done = e.target.checked;
            updateDzikirProgress();
          });
          lbl.querySelector('.ramadhan-todo-del').addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            dzikirData.splice(i, 1);
            buildDzikirList();
          });
          list.appendChild(lbl);
        });
      }
      updateDzikirProgress();
    }

    function bindDzikirAdd() {
      const input = root.querySelector('#dzikirTodoInput');
      const btn   = root.querySelector('#dzikirTodoAddBtn');
      if (!input || !btn) return;

      const add = () => {
        const text = input.value.trim();
        if (!text) return;
        dzikirData.push({ text, done: false });
        input.value = '';
        buildDzikirList();
        input.focus();
      };
      btn.addEventListener('click', add);
      input.addEventListener('keydown', e => { if (e.key === 'Enter') add(); });
    }

    function updateDzikirProgress() {
      const total = dzikirData.length;
      const done  = dzikirData.filter(d => d.done).length;
      const pct   = total === 0 ? 0 : Math.round(done / total * 100);
      setBar('dzikirBar', 'dzikirPct', pct);
      const t = T();
      if (t.dzikirStatus) {
        h('#dzikirStatus',
          total === 0 ? t.dzikirStatus[0] : pct < 100 ? t.dzikirStatus[1] : t.dzikirStatus[2]
        );
      }
      updateTotalProgress();
    }


    // Tabs
    function bindTabs() {
      root.querySelectorAll('.ramadhan-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          root.querySelectorAll('.ramadhan-tab').forEach(t => t.classList.remove('active'));
          root.querySelectorAll('.ramadhan-panel').forEach(p => p.classList.remove('active'));
          tab.classList.add('active');
          root.querySelector('#panel-' + tab.dataset.tab).classList.add('active');
        });
      });
    }


    // Save Button
    function bindSaveButtons() {
      root.querySelectorAll('.ramadhan-save-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const key = btn.dataset.save;
          if (key === 'shalat') localStorage.setItem('r_shalat', JSON.stringify(shalatData));
          if (key === 'quran')  localStorage.setItem('r_quran',  JSON.stringify(quranData));
          if (key === 'puasa')  localStorage.setItem('r_puasa',  JSON.stringify(puasaData));
          if (key === 'dzikir') localStorage.setItem('r_dzikir', JSON.stringify(dzikirData));
          showToast(T().saved || '✓ Tersimpan!');
        });
      });
    }


    // ── Pantau ganti bahasa dari global.js ────────────────────
    // Cara 1: MutationObserver ngintip data-lang di <html>
    // Cara 2: Daftar ke window.languageListeners (sistem global.js)
    // Keduanya dipasang biar aman di semua kondisi
    new MutationObserver(() => {
      updateTexts();
      buildShalatList();
      updateAllProgress();
    }).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-lang']
    });

    // Daftar ke sistem listener global.js
    if (window.languageListeners) {
      window.languageListeners.push(() => {
        updateTexts();
        buildShalatList();
        updateAllProgress();
      });
    }


    // Run Semua
    buildShalatList();
    buildPuasaCalendar();
    buildDzikirList();
    initQuranInputs();
    bindTabs();
    bindSaveButtons();
    bindDzikirAdd();
    updateTexts();
    updateAllProgress();

  }; // end initRamadhanTodo

})();