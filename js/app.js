const header = document.querySelector("header");

const firs_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number span");

const prt_section = document.querySelector(".blog");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");

const link = document.querySelectorAll(".nav-link");

const toggle_btn = document.querySelector(".toggle-btn");

const hamburger = document.querySelector(".hamburger");

window.addEventListener("scroll", () => {
    activeLink();
    if (!skillsPlayed) skillsCounter();
    if (!mlPlayed) mlCounter();
});

/* --------------- Grab elements from DOM --------------- */

/* --------------- Sticky Navbar --------------- */

function stickyNavbar() {
    header.classList.toggle("scrolled", window.pageYOffset > 0);
}

stickyNavbar();

window.addEventListener("scroll", stickyNavbar);

/* --------------- Reveal Animation --------------- */

let sr = ScrollReveal({
    duration: 2500,
    distance: "60px",
});

sr.reveal(".showcase-info", { delay: 600 });
sr.reveal(".showcase-image", { origin: "top", delay: 700 });
sr.reveal(".showcase-square", { delay: 750 });


/* --------------- Skills Progress Bar Animation --------------- */

function hasReached(el) {
    let topPosition = el.getBoundingClientRect().top;

    if (window.innerHeight >= topPosition + el.offsetHeight) return true;
    return false;
}

function updateCount(num, maxNum) {
    let currentNum = +num.innerText;

    if (currentNum < maxNum) {
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum);
        }, 12);
    }
}

let skillsPlayed = false;

function skillsCounter() {
    if (!hasReached(firs_skill)) return;

    skillsPlayed = true;

    sk_counters.forEach((counter, i) => {
        let target = + counter.dataset.target;
        let strokeValue = 427 - 427 * (target / 100);

        progress_bars[i].style.setProperty("--target", strokeValue);

        setTimeout(() => {
            updateCount(counter, target);
        }, 400);
    });

    progress_bars.forEach(
        (p) => (p.style.animation = "progress 2s ease-in-out forwards")
    );
}

/* --------------- Blog Filter Animation --------------- */

let mixer = mixitup(".blog-gallery", {
    selectors: {
        target: ".prt-card",
    },
    animation: {
        duration: 500,
    },
});

/* --------------- Modal Pop Up Animation Animation --------------- */

let currentIndex = 0;

zoom_icons.forEach((icn, i) =>
    icn.addEventListener("click", () => {
        prt_section.classList.add("open");
        document.body.classList.add("stopScrolling");
        currentIndex = i;
        changeImage(currentIndex);
    })
);

modal_overlay.addEventListener("click", () => {
    prt_section.classList.remove("open");
    document.body.classList.remove("stopScrolling");
});

prev_btn.addEventListener("click", () => {
    if (currentIndex === 0) {
        currentIndex = 5;
    } else {
        currentIndex--;
    }
    changeImage(currentIndex);
});

next_btn.addEventListener("click", () => {
    if (currentIndex === 5) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    changeImage(currentIndex);
});

function changeImage(index) {
    images.forEach((img) => img.classList.remove("showImage"));
    images[index].classList.add("showImage");
}

/* --------------- Swiper Animation Animation --------------- */

const swiper = new Swiper('.swiper', {
    loop: true,
    speed: 500,
    autoplay: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

/* --------------- Change Active Link On Scroll --------------- */

function activeLink() {
    let sections = document.querySelectorAll("section[id]");
    let passsedSections = Array.from(sections)
        .map((sct, i) => {
            return {
                y: sct.getBoundingClientRect().top - header.offsetHeight,
                id: i,
            };
        })
        .filter((sct) => sct.y <= 0);

    let currSectionID = passsedSections.at(-1).id;

    link.forEach((l) => l.classList.remove("active"));
    link[currSectionID].classList.add("active");

}

activeLink();

/* --------------- Change Page Theme --------------- */

let firstTheme = localStorage.getItem("dark");

changeTheme(+firstTheme);

function changeTheme(isDark) {
    if (isDark) {
        document.body.classList.add("dark");
        toggle_btn.classList.replace("uil-moon", "uil-sun");
        localStorage.setItem("dark", 1);
    } else {
        document.body.classList.remove("dark");
        toggle_btn.classList.replace("uil-sun", "uil-moon");
        localStorage.setItem("dark", 0);
    }
}

toggle_btn.addEventListener("click", () => {
    changeTheme(!document.body.classList.contains("dark"));
});

/* --------------- Exploring button Update ( Use Default (ChatGPT-3.5)) --------------- */

document.addEventListener("DOMContentLoaded", function () {
    const scrollLink = document.getElementById("scroll-link");

    if (scrollLink) {
        scrollLink.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = "#about";
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offset = targetElement.offsetTop - 100;
                const duration = 1000;

                scrollToSmoothly(offset, duration);
            }
        });
    }
});

function scrollToSmoothly(offset, duration) {
    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    function scroll() {
        const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
        const elapsed = currentTime - startTime;

        window.scrollTo(0, easeInOutCubic(elapsed, start, offset, duration));

        if (elapsed < duration) {
            requestAnimationFrame(scroll);
        }
    }

    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(scroll);
}

/* --------------- Open & Close Navbar Menu --------------- */

hamburger.addEventListener("click", () => {
    document.body.classList.toggle("open");
    document.body.classList.toggle("stopScrolling");
});

link.forEach((link) =>
    link.addEventListener("click", () => {
        document.body.classList.remove("open");
        document.body.classList.remove("stopScrolling");
    })
);

/* --------------- Timeline Animation --------------- */

function isElementInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function animateTimelineItems() {
    var timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(function (item) {
        if (isElementInViewport(item) && !item.classList.contains('fade-in')) {
            item.classList.add('fade-in');
            item.classList.add('bounce');
        }
    });
}

window.addEventListener('load', animateTimelineItems);

window.addEventListener('scroll', animateTimelineItems);

/* --------------- Right click , copy & paste block --------------- */

let x = 0;

jQuery(document).ready(function () {
    jQuery(function () {
        jQuery(this).bind("contextmenu", function (event) {
            event.preventDefault();
            alert("Sorry, right click is not allowed !");
            x = x + 1;
            if (x == 10) {
                location.reload();
            };
        });
    });
    (function () {
        'use strict';
        let style = document.createElement('style');
        style.innerHTML = '*{ user-select: none !important; }';

        document.body.appendChild(style);
    })();
    window.onload = function () {
        document.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        }, false);
        document.addEventListener("keydown", function (e) {
            if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
                disabledEvent(e);
            }

            if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
                disabledEvent(e);
            }

            if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                disabledEvent(e);
            }

            if (e.ctrlKey && e.keyCode == 85) {
                disabledEvent(e);
            }

            // Disable F12 (Inspect Element)
            if (e.keyCode == 123) {
                disabledEvent(e);
            }
        }, false);
        function disabledEvent(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            } else if (window.event) {
                window.event.cancelBubble = true;
            }
            e.preventDefault();
            return false;
        }
    }
});
