/* ------ ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ------ */
window.onscroll = function() {headerShadow()};

function headerShadow() {
    const navHeader = document.getElementById("headerNavigation");

    if (document.body.scroll > 50 || document.documentElement.scrollTop > 50) {
        navHeader.style.backgroundColor = "rgba(40, 58, 90, 0.9)";
        navHeader.style.transition = ".5s";
        navHeader.style.height = "70px";
        navHeader.style.lineHeight = "70px";
    } else {
        navHeader.style.backgroundColor = "transparent";
        navHeader.style.transition = ".5s";
        navHeader.style.boxShadow = "none";
        navHeader.style.height = "90px";
        navHeader.style.lineHeight = "70px";
    }
}

/* ------ TYPING EFFECT ------ */
var typingEffect = new Typed(".typedText", {
    strings : ["Hello, je suis Stéphane N'DA","Développeur Web","Je suis aussi Testeur QA", "Je vous souhaite la bienvenu."],
    Loops : true,
    // typeSpeed : 100,
    // backSpeed : 80, 
    typeSpeed : 50,
    backSpeed : 40, 
    backDelay : 2000, 
});

// --------- ACTIVE NAVBAR MENU PRINCIPAL ---------------
let menus = document.getElementsByClassName("selection");
function activeDesactive() {
    for(menu of menus) {
        menu.classList.remove("active");
    }
    event.currentTarget.classList.add("active");
}

// --------- SELECTION MENU ABOUT ACTIVE ---------------
let tablinks = document.getElementsByClassName("tab-links");
let tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for(tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

/* ------ ## -- SCROLL REVEAL ANIMATION -- ## ------ */
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px', 
    duration: 2000,
    reset: false
});

sr.reveal('.services-box',{ interval: 200 });
sr.reveal('.row-about',{});

const srLeft = ScrollReveal({
    origin: 'left',
    distance: '80px', 
    duration: 2000,
    reset: false
});

srLeft.reveal('.work',{ delay: 100 });

const srRight = ScrollReveal({
    origin: 'right',
    distance: '80px', 
    duration: 2000,
    reset: false
});
srRight.reveal('.skills-box',{ delay: 100 });

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
        },5000)
        form.reset()
    })
    .catch(error => console.error('Error!', error.message))
})

/* ------ ## -- SIDE MENU -- ## ------ */
let sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "-550px";
}
function closemenu() {
    sidemenu.style.right = "-802px";
}

/* ------ ## -- DROP ELEMENT -- ## ------ */
document.addEventListener('DOMContentLoaded', () =>{
    var disclaimer = document.querySelector("img[alt='www.000webhost.com']");
    if (disclaimer) {
        disclaimer.remove();
    }
});