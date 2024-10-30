/* ------ ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ------ */
window.addEventListener('scroll', headerShadow);
window.addEventListener('load', initializeNavigation);

// Gestion du loader et du typing text
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.querySelector('.loader');
    
    // Masquer le contenu principal pendant le chargement
    document.body.style.overflow = 'hidden';
    
    // Faire disparaître le loader après 4 secondes
    setTimeout(function() {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease';
        
        // Supprimer le loader et démarrer le typing text
        setTimeout(function() {
            loader.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Démarrer l'animation du typing text
            const typed = new Typed('.typedText', {
                strings: ['Développeur Full Stack,', 'Je suis aussi Testeur QA,', 'Bienvenu sur mon portfolio.'],
                typeSpeed: 55,
                backSpeed: 20,
                backDelay: 2000,
                loop: true
            });
        }, 500);

        setTimeout(function() {
            sr.reveal('.rectangle-border', {});
            sr.reveal('.presentation-image', {});
        }, 50);
    }, 4000);
});

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    headerShadow();
});

function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');

    function setActiveLink() {
        const scrollPosition = window.scrollY;

        sections.forEach((section, index) => {
            if (scrollPosition >= section.offsetTop - 100) {
                navLinks.forEach((link) => link.classList.remove('active'));
                navLinks[index].classList.add('active');
            }
        });
    }

    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70, // Ajustez cette valeur si nécessaire
                behavior: 'smooth'
            });
        }
        closemenu();
    }

    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    setActiveLink();
    window.addEventListener('scroll', setActiveLink);
}

function headerShadow() {
    const navHeader = document.getElementById("headerNavigation");
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        navHeader.classList.add('scrolled');
        navHeader.style.backgroundColor = '#1a2435';
    } else {    
        navHeader.classList.remove('scrolled');
        navHeader.style.backgroundColor = 'transparent';
    }
}

window.addEventListener('scroll', headerShadow);

function openmenu() {
    document.getElementById("sidemenu").style.right = "-550px";
}

function closemenu() {
    document.getElementById("sidemenu").style.right = "-802px";
}

/* ------ ## -- SCROLL REVEAL ANIMATION -- ## ------ */
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px', 
    duration: 2000,
    reset: false
});

// sr.reveal('.services-box', {});
// Modifier la configuration de ScrollReveal pour les services-box
sr.reveal('.services-box', {
    reset: false, // Empêche la réinitialisation de l'animation
    cleanup: true, // Nettoie les styles après l'animation
    afterReveal: function(domEl) {
        // Supprime les styles inline ajoutés par ScrollReveal après l'animation
        domEl.style.transform = '';
        domEl.style.transition = '';
    }
});

sr.reveal('.row-about',{});

const srBottom = ScrollReveal({
    origin: 'bottom',
    distance: '80px', 
    duration: 2000,
    reset: false
});
srBottom.reveal('.contact-container',{});

/* ------ ## -- TRAITEMENT FORMULAIRE CONTACT -- ## ------ */
const scriptURL = 'https://script.google.com/macros/s/AKfycbx9RRj6gu0iCVRPKQx1nu3z9fYLMZ2AiXlAvaG1NU4VAE-8yVN4Nn5lECIp-zynBvo/exec'
const form = document.forms['contact-form']
const msg = document.getElementById("msg")
const btnMsg = document.getElementById("soumettreForm")

form.addEventListener('submit', e => {
    e.preventDefault()
    btnMsg.innerHTML = 'En cours d\'envoi <i class="fa-solid fa-spinner fa-spin-pulse"></i>'
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML = "Message envoyé avec succès"
        btnMsg.innerHTML = "Envoyer"
        setTimeout(function(){
            msg.innerHTML = ""
        }, 5000)
        form.reset()
    })
    .catch(error => console.error('Error!', error.message))
})

// transition image
function changeBackgroundImage() {
    const header = document.querySelector('header');
    setInterval(() => {
        header.classList.toggle('switch-background');
    }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    headerShadow();
    changeBackgroundImage(); // Ajoutez cette ligne
});

// langages de programmation
/* ------ ## -- SCROLL REVEAL ANIMATION -- ## ------ */
const srL = ScrollReveal({
    origin: 'top',
    distance: '80px', 
    duration: 2000,
    reset: false
});

srL.reveal('.row-about', {});
srL.reveal('.skill-category', { interval: 200 });

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent + '%';
    });
}

// Intersection Observer pour les barres de progression
const skillsSection = document.getElementById('skills-detail');
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateProgressBars();
        observer.unobserve(skillsSection);
    }
}, { threshold: 0.5 });

observer.observe(skillsSection);

// Ajoutez ceci à votre fonction d'initialisation existante
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    headerShadow();
});

// Ajoutez ce code à votre fichier JavaScript existant
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

// Effet de rotation de l'image de profil
function rotateProfileImage() {
    const profileImage = document.getElementById('profileImage');
    setInterval(() => {
        profileImage.classList.add('rotate');
        setTimeout(() => {
            profileImage.classList.remove('rotate');
        }, 500);
    }, 7000);
}

// Appelez cette fonction lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', rotateProfileImage);

// Mettre à jour l'année dans le footer
document.getElementById('currentYear').textContent = new Date().getFullYear();