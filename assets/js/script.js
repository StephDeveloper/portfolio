document.addEventListener('DOMContentLoaded', () => {
    // Ajouter au début du fichier
    const loaderWrapper = document.querySelector('.loader-wrapper');
    
    // Masquer le loader après le chargement de la page
    window.addEventListener('load', () => {
        setTimeout(() => {
            loaderWrapper.classList.add('fade-out');
            document.body.style.overflow = 'visible';
        }, 2000); // Le loader disparaît après 2 secondes
    });

    // Désactiver le scroll pendant le chargement
    document.body.style.overflow = 'hidden';

    // Navigation fixe au scroll
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = window.scrollY;
    });

    // Gestion des liens actifs
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Initialisation de ScrollReveal
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });

    const srStephy = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });

    // Animations ScrollReveal
    sr.reveal('.hero-content', {});
    sr.reveal('.skill-card', { interval: 200 });
    sr.reveal('.project-card', { interval: 200 });
    sr.reveal('.about-content', {});
    srStephy.reveal('.hero-right', {});
    sr.reveal('.service-card', { interval: 200 });
    sr.reveal('.contact-container', {});

    // Animation du typingText
    setTimeout(() => {
        const typed = new Typed('.typing-text', {
        strings: ['Développeur Full Stack,', 'Je suis aussi Testeur QA,', 'Bienvenu sur mon portfolio.'],
        typeSpeed: 55,
        backSpeed: 20,
        backDelay: 2000,
            loop: true
        });
    }, 2500);

    // Animation au scroll pour les éléments
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('skill-card')) {
                    gsap.to(entry.target, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                }
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // Animation du menu burger améliorée
    const burgerMenu = document.querySelector('.burger-menu');
    // const navLinks = document.querySelector('.nav-links');
    
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            gsap.from('.nav-links a', {
                y: 50,
                opacity: 0,
                duration: 0.3,
                stagger: 0.1
            });
        }
    });

    // Gestion des onglets
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Fonction pour activer un onglet
    function activateTab(tabId) {
        // Masquer tous les contenus et désactiver tous les boutons
        tabContents.forEach(content => {
            content.style.display = 'none';
            content.classList.remove('active');
        });
        tabBtns.forEach(btn => btn.classList.remove('active'));

        // Activer l'onglet sélectionné
        const selectedContent = document.getElementById(tabId);
        const selectedBtn = document.querySelector(`[data-tab="${tabId}"]`);
        
        selectedContent.style.display = 'block';
        selectedContent.classList.add('active');
        selectedBtn.classList.add('active');
    }

    // Ajouter les écouteurs d'événements aux boutons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            activateTab(tabId);
        });
    });

    // Activer le premier onglet par défaut
    activateTab('experience');

    // Animation de la timeline au scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    sr.reveal('.timeline-item', {
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        interval: 200
    });

    // Initialisation de EmailJS
    emailjs.init("uZkZzG4EyHW_ElifS");

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Désactiver le bouton pendant l'envoi
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

        // Préparer les paramètres
        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            to_name: 'Stéphane N\'DA',
            to_email: 'ndayste@gmail.com'
        };

        // Envoyer l'email avec gestion d'erreur améliorée
        emailjs.send('service_mu3d8ha', 'template_9juaywk', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé!';
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
                }, 3000);

                alert('Message envoyé avec succès!');
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
                submitBtn.disabled = false;
                
                let errorMessage = 'Une erreur est survenue lors de l\'envoi du message. ';
                if (error.status === 412) {
                    errorMessage += 'Problème d\'authentification Gmail. Veuillez réessayer plus tard.';
                }
                alert(errorMessage);
            });
    });
}); 