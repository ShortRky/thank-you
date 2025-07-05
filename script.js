
document.addEventListener('DOMContentLoaded', () => {
    // Fade-in logic for each message set
    function fadeInSet(setIdx) {
        const set = document.getElementById(`message-set-${setIdx}`);
        const fadeInEls = Array.from(set.querySelectorAll('.fade-in'));
        let delay = 0;
        fadeInEls.forEach((el, idx) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, delay);
            delay += idx === 0 ? 800 : 1200;
        });
    }

    // Slide and show next set
    function handleNext(current, next) {
        const set1 = document.getElementById(`message-set-${current}`);
        set1.classList.add('slide-left');
        setTimeout(() => {
            set1.classList.add('hidden');
            const set2 = document.getElementById(`message-set-${next}`);
            set2.classList.remove('hidden');
            fadeInSet(next);
        }, 1000);
    }

    // Set up all next buttons
    for (let i = 1; i <= 5; i++) {
        const btn = document.getElementById(`next-btn-${i}`);
        if (btn) {
            btn.addEventListener('click', () => handleNext(i, i + 1));
        }
    }

    // Start with first set
    fadeInSet(1);

    // Music: try to play on load, handle browser restrictions
    const music = document.getElementById('bg-music');
    if (music) {
        // Try to play immediately, fallback to user interaction
        music.volume = 0.02;
        music.play().catch(() => {
            document.body.addEventListener('click', () => {
                music.play();
            }, { once: true });
        });
    }
});
