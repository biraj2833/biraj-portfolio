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
// ================= MOBILE NAV =================

const menuToggle = document.getElementById("menuToggle");
const navbar = document.querySelector(".top-header-bar nav");

menuToggle.addEventListener("click", () => {

    navbar.classList.toggle("show-menu");

});

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

// ================= CONTACT FORM (Web3Forms) =================

(function () {
    const form = document.getElementById("contactForm");
    const btnText = document.getElementById("cfBtnText");
    const btnIcon = document.getElementById("cfBtnIcon");
    const submitBtn = document.getElementById("cfSubmitBtn");
    const status = document.getElementById("cfStatus");

    if (!form) return;

    function setStatus(msg, type) {
        status.textContent = msg;
        status.className = "cf-status " + type;
    }

    function setLoading(loading) {
        submitBtn.disabled = loading;
        if (loading) {
            btnText.textContent = "Sending…";
            btnIcon.className = "fa-solid fa-circle-notch fa-spin";
        } else {
            btnText.textContent = "Send Message";
            btnIcon.className = "fa-solid fa-paper-plane";
        }
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        setStatus("", "");

        const name = document.getElementById("cfName").value.trim();
        const email = document.getElementById("cfEmail").value.trim();
        const message = document.getElementById("cfMessage").value.trim();

        if (!name || !email || !message) {
            setStatus("Please fill in your name, email and message.", "error");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setStatus("Please enter a valid email address.", "error");
            return;
        }

        setLoading(true);

        const formData = new FormData(form);

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                if (data.success) {
                    setStatus("✓ Message sent! I'll get back to you soon.", "success");
                    form.reset();
                } else {
                    setStatus("Something went wrong. Please try again.", "error");
                }
            })
            .catch(() => {
                setLoading(false);
                setStatus("Network error. Please check your connection.", "error");
            });
    });
})();

// ================= LIGHTBOX MODAL =================
const sliderImages = document.querySelectorAll(".slide img");
const lightboxOverlay = document.getElementById("imageLightboxOverlay");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightboxBtn = document.getElementById("closeLightbox");

if (sliderImages && lightboxOverlay && lightboxImage) {
    sliderImages.forEach(img => {
        img.style.cursor = "zoom-in";
        img.addEventListener("click", () => {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxOverlay.classList.add("active");
        });
    });

    closeLightboxBtn.addEventListener("click", () => {
        lightboxOverlay.classList.remove("active");
    });

    lightboxOverlay.addEventListener("click", (e) => {
        if (e.target === lightboxOverlay) {
            lightboxOverlay.classList.remove("active");
        }
    });
}

