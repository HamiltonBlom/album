import './style.scss'

document.addEventListener("DOMContentLoaded", e => {
    ScrollReveal().reveal('.info2 h1', { distance: '50px', reset: true });
    ScrollReveal().reveal('.info2 h2', { distance: '50px', delay: 100, reset: true });
    ScrollReveal().reveal('.info2 .imgcont', { distance: '50px', delay: 500, scale: 0.85, reset: true });

    const fancyTitles = [...document.querySelectorAll(".fancy-title")];

    for (const title of fancyTitles) {
        const subs = title.querySelectorAll(":scope > div");
        for (const [i, sub] of subs.entries()) {
            ScrollReveal().reveal(sub, { distance: `${50 + i * 15}px`, delay: 300 + 170 * (i ** 1.4 + 1), duration: 1750 });
        }
    }

    const getStartedButton = document.getElementById("get-started");

    window.addEventListener("scroll", e => {
        if (window.scrollY < 400 || document.body.scrollHeight - window.scrollY - window.innerHeight < 200) {
            getStartedButton.classList.add("hidden");
        }
        else {
            getStartedButton.classList.remove("hidden");
        }
    });


});