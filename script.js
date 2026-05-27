// ================= NAVBAR ACTIVE LINK =================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

function activeNavSpy() {
    let currentSectionId = "home";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 180) {
            currentSectionId = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSectionId}`) {
            link.classList.add("active");
        }
    });
}

// ================= SCROLL REVEAL =================

function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < triggerBottom) {
            section.classList.add("show");
        }
    });
}

window.addEventListener("scroll", () => {
    activeNavSpy();
    revealOnScroll();
});

activeNavSpy();
revealOnScroll();


// ================= PHONE CLOCK =================

function updateMockClock() {
    const clockElement = document.getElementById("screenClock");

    if (!clockElement) return;

    const now = new Date();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    clockElement.textContent = `${hours}:${minutes} ${ampm}`;
}

updateMockClock();

setInterval(updateMockClock, 1000);


// ================= HIRE BUTTON =================

window.hireMeFromApp = function () {
    const contactSection = document.getElementById("contact");

    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: "smooth"
        });
    }

    const formPanel = document.getElementById("contactFormPanel");

    if (formPanel) {
        formPanel.classList.add("highlight-pulse");

        setTimeout(() => {
            formPanel.classList.remove("highlight-pulse");
        }, 2000);
    }
};


// ================= CLOSE HIRE CARD =================

const closeButton = document.getElementById("closeHireCard");

if (closeButton) {
    closeButton.addEventListener("click", () => {
        const hireCard = document.getElementById("hireCard");

        if (hireCard) {
            hireCard.style.display = "none";
        }
    });
}
// ================= SCROLL REVEAL ANIMATION =================

const animatedSections = document.querySelectorAll(
    "#about, #skills, #projects, #design, #contact"
);

const sectionObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("section-show");

            }

        });

    },
    {
        threshold: 0.15
    }
);

animatedSections.forEach((section) => {
    sectionObserver.observe(section);
});