// kumpulan_zikir.js

function initZikirSection() {

  document.querySelectorAll('.zikir-card').forEach(card => {

    let count  = 0;
    let target = 33;

    const counter    = card.querySelector('.zikir-counter');
    const progress   = card.querySelector('.zikir-progress-fill');
    const notif      = card.querySelector('.zikir-notification');
    const targetDisp = card.querySelector('.target-display');
    const btnInc     = card.querySelector('.btn-increment');
    const btnReset   = card.querySelector('.btn-reset');
    const targetBtns = card.querySelectorAll('.btn-target');

    function animateCounter() {
      counter.classList.remove('pulse');
      void counter.offsetWidth;
      counter.classList.add('pulse');
    }

    function updateUI() {
      counter.textContent  = count;
      progress.style.width = Math.min((count / target) * 100, 100) + '%';

      if (count >= target) {
        notif.textContent = "Target reached 🎉";
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
        btn.classList.toggle(
          'active',
          parseInt(btn.dataset.target) === val
        );
      });

      updateUI();
    }

    btnInc.addEventListener('click', () => {
      if (count >= target) return;
      count++;
      animateCounter();
      updateUI();
    });

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
}