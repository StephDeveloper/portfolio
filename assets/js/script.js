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

    // Configuration de ScrollReveal
    const sr = ScrollReveal({
        distance: '60px',
        duration: 2000,
        // delay: 400,
        reset: false
    });

    // Fonction pour initialiser toutes les animations
    function initializeAnimations() {
        // Animations de base
        sr.reveal('.hero-left', { origin: 'left' });
        sr.reveal('.hero-right', { origin: 'right' });
        sr.reveal('.about h2', { origin: 'top' });
        sr.reveal('.tabs', { origin: 'bottom' });
        
        // Animations des sections
        const sections = [
            { selector: '.skills h2', options: { origin: 'top' } },
            { selector: '.skill-card', options: { origin: 'bottom', interval: 200 } },
            { selector: '.services h2', options: { origin: 'top' } },
            { selector: '.service-card', options: { origin: 'bottom', interval: 200 } },
            { selector: '.contact h2', options: { origin: 'top' } },
            { selector: '.contact-info', options: { origin: 'left' } },
            { selector: '.contact-form', options: { origin: 'right' } }
        ];

        sections.forEach(section => {
            const elements = document.querySelectorAll(section.selector);
            if (elements.length > 0) {
                sr.reveal(section.selector, section.options);
            }
        });
    }

    // Gestion des onglets avec nouvelle approche pour les animations
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Retirer la classe active
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Ajouter la classe active
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const activeContent = document.getElementById(tabId);
            activeContent.classList.add('active');

            // Révéler les éléments de la timeline dans l'onglet actif
            const timelineItems = activeContent.querySelectorAll('.timeline-item');
            timelineItems.forEach((item, index) => {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 200);
            });

            // Forcer le recalcul des animations ScrollReveal pour les sections suivantes
            ScrollReveal().sync();
        });
    });

    // Initialisation des animations au chargement
    initializeAnimations();

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
    const navLink = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navLink.classList.toggle('active');
        
        // Animation des liens
        if (navLink.classList.contains('active')) {
            navLinksItems.forEach((link, index) => {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index * 0.1 + 0.2}s`;
            });
        } else {
            navLinksItems.forEach(link => {
                link.style.animation = '';
            });
        }
    });

    // Fermer le menu quand on clique sur un lien
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            navLink.classList.remove('active');
            navLinksItems.forEach(link => {
                link.style.animation = '';
            });
        });
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

    // Gestion du thème sombre/clair
    function setupThemeToggle() {
        // Créer le bouton de retour en haut de page
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-top-btn';
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollTopBtn);

        // Gérer le clic sur le bouton de retour en haut
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Afficher/masquer le bouton en fonction du scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        // Ajouter le toggle de thème dans le footer
        const socialLinks = document.querySelector('.social-links');
        if (socialLinks) {
            const themeToggle = document.createElement('a');
            themeToggle.href = 'javascript:void(0)';
            themeToggle.className = 'theme-toggle-footer';
            themeToggle.title = 'Changer de thème';
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            socialLinks.appendChild(themeToggle);

            // Vérifier le thème enregistré
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme);

            // Gérer le changement de thème
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateThemeIcon(newTheme);

                // Animation du bouton
                themeToggle.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    themeToggle.style.transform = 'scale(1)';
                }, 200);
            });
        }
    }

    // Mettre à jour l'icône du bouton
    function updateThemeIcon(theme) {
        const themeToggle = document.querySelector('.theme-toggle-footer');
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'dark' 
                ? '<i class="fas fa-sun"></i>' 
                : '<i class="fas fa-moon"></i>';
        }
    }

    // Appelez cette fonction dans votre DOMContentLoaded
    setupThemeToggle();

    // Amélioration des effets parallax
    function initEnhancedParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        const layers = document.querySelectorAll('.parallax-layer');
        let ticking = false;

        // Fonction pour l'effet de parallaxe au scroll
        function updateParallax(scrolled) {
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                const rotation = scrolled * 0.03;
                element.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${rotation}deg)`;
            });

            layers.forEach((layer, index) => {
                const speed = (index + 1) * 0.1;
                const yPos = scrolled * speed;
                const xPos = Math.sin(scrolled * 0.002) * 20 * speed;
                layer.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
            });
        }

        // Effet de parallaxe au mouvement de la souris
        document.addEventListener('mousemove', (e) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const mouseX = (window.innerWidth / 2 - e.clientX) / 25;
                    const mouseY = (window.innerHeight / 2 - e.clientY) / 25;
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Effet au scroll
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateParallax(window.pageYOffset);
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Initialisation des effets améliorés
    initEnhancedParallax();

    // Effet parallax au scroll
    function initParallaxEffects() {
        const elements = document.querySelectorAll('.skill-card, .service-card, h2, .profile-image');
        
        // Effet de mouvement au survol de la souris
        elements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });

        // Animation au scroll
        const scrollElements = document.querySelectorAll('.scroll-animate');
        
        function checkScroll() {
            scrollElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }

        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Vérification initiale
    }

    // Initialisation des effets
    initParallaxEffects();
}); 