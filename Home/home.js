
/*----------------------------------JS Started---------------------------------------------*/







/*-------------------------------------------------------------------------------*/

// dark light mode started

const toggleDarkWhite = document.querySelector("#toggle-ball-sun");
const bodyTag = document.querySelector("body");
const darkWhiteBox = document.querySelector(".dark-white-box ");
const aTags = document.querySelectorAll("a");
const spanTags = document.querySelectorAll("span");


toggleDarkWhite.addEventListener("click", function () {
    this.classList.toggle("bi-moon");
    if (this.classList.toggle('bi-brightness-high-fill')) {
        bodyTag.style.background = "white";
        bodyTag.style.color = "black";
        bodyTag.style.transition = "1s";
        toggleDarkWhite.style.marginLeft = "4px";
        toggleDarkWhite.style.transition = "1s";
        toggleDarkWhite.style.color = "white";
        darkWhiteBox.style.background = "black";
        openNavBtn.style.color = "black";
        searchBtn.style.color = "black";

        for (let i = 0; i < aTags.length; i++) {
            aTags[i].style.color = "black";
        }
        for (let i = 0; i < spanTags.length; i++) {
            spanTags[i].style.color = "black";
        }

    
    } else {
        bodyTag.style.background = "black";
        bodyTag.style.color = "white";
        bodyTag.style.transition = "1s";
        toggleDarkWhite.style.marginLeft = "40px";
        toggleDarkWhite.style.transition = "1s";
        toggleDarkWhite.style.color = "black";
        darkWhiteBox.style.background = "white";
        openNavBtn.style.color = "white";
        searchBtn.style.color = "white";


        for (let i = 0; i < aTags.length; i++) {
            aTags[i].style.color = "white";
        }
        for (let i = 0; i < spanTags.length; i++) {
            spanTags[i].style.color = "white";
        }

        /*
        aTags.forEach((i)=>{
            aTags[i].style.color = "white";
        });
        
        spanTags.forEach((i)=>{
            spanTags[i].style.color = "white";
        });
        
        */
    }

});

// dark light mode end

/*-------------------------------------------------------------------------------*/










/*-------------------------------------------------------------------------------*/

// search input show started

let searchBtn = document.querySelector("#search-btn");
let searchInput = document.querySelector("#search-input");
searchBtn.addEventListener("click", function () {
    searchInput.classList.toggle("input-search-show");
});

// search input hidden end

/*-------------------------------------------------------------------------------*/









/*-------------------------------------------------------------------------------*/

//responsive navbar show start

let openNavBtn = document.querySelector("#hamburger");
let navbar = document.querySelector(".navbar");
openNavBtn.addEventListener("click", function () {
    navbar.style.top = "0";
});
let closeNavBtn = document.querySelector("#close-btn");
closeNavBtn.addEventListener("click", function () {
    navbar.style.top = "-100%";
});

//responsive navbar show end

/*-------------------------------------------------------------------------------*/









/*-------------------------------------------------------------------------------*/

// jquery carousel slider started

$(document).ready(function () {
    $("#testimonial-slider").owlCarousel({
        items: 1,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [979, 1],
        itemsTablet: [768, 1],
        pagination: true,
        autoPlay: true
    });
    e.preventdefault;
});

// jquery carousel slider end

/*-------------------------------------------------------------------------------*/









/*-------------------------------------------------------------------------------*/

// chatbot popup show started

let chatIconOpen = document.querySelector("#chat-icon-open");
chatIconOpen.addEventListener("click", () => {
    let chatbotContainer = document.querySelector(".chatbot-container");

    chatbotContainer.classList.add("chatbot-show");



    const ptagBotDefault = document.querySelector("#ptag-bot-default");
    setTimeout(() => {
        ptagBotDefault.style.display = 'block';

    }, 1500);

});

let chatIconClose = document.querySelector("#chat-icon-close");
chatIconClose.addEventListener("click", () => {
    let chatbotContainer = document.querySelector(".chatbot-container");
    chatbotContainer.classList.remove("chatbot-show");
});

// chatbot popup show end

/*-------------------------------------------------------------------------------*/









/*-------------------------------------------------------------------------------*/

// chat bot functionallity started

const chatSendButton = document.querySelector("#chat-send-button");

chatSendButton.addEventListener("click", () => {
    const textAreaBot = document.querySelector("#textarea-bot");

    if (textAreaBot.value !== "") {

        const chatbotMonitor = document.querySelector(".chatbot-monitor");
        const listTagAdd = document.createElement("li");
        listTagAdd.innerHTML = `
        <p>${textAreaBot.value}</p>
        <p id="p-1">${"Salam muracietiniz qeyde alindi sizi online satis mutexessisine yoneldiririk......"}</p>   
        `;
        chatbotMonitor.append(listTagAdd);







    } else if (textAreaBot.value == "") {

        const chatbotMonitor = document.querySelector(".chatbot-monitor");
        const listTagAdd = document.createElement("li");

        const emptyAnswer = "Muraciet xanasi bosdur!";

        listTagAdd.innerHTML = `
        <p id="p-2">${emptyAnswer}</p> `;

        chatbotMonitor.append(listTagAdd);
    };
    textAreaBot.value = "";

});

// chat bot functionallity end

/*-------------------------------------------------------------------------------*/











/*-------------------------------------------------------------------------------*/

//* scroll animation starting

const forAnimationBox = document.getElementsByName("for-animation-box");

window.addEventListener("scroll", function () {
    const movingScroll = window.innerHeight / 5 * 4;  //pencerenin hundurluyunu alir
    forAnimationBox.forEach((i) => {
        const sectionTop = i.getBoundingClientRect().top; //pencerenin olcusu ve movqeyi haqda melumat verir               
        if (sectionTop < movingScroll) {
            i.classList.add("show");
        } else {
            i.classList.remove("show");
        }
    });
});

//* scroll animation end

/*-------------------------------------------------------------------------------*/











/*-------------------------------------------------------------------------------*/

// Arrow icon smooth scrool started

let toTop = document.querySelector(".to-top");
let navBox = document.querySelector(".nav-box");

window.addEventListener("scroll", () => {
    toTop.classList.toggle("active-arrow", window.scrollY > 100);

    navBox.classList.toggle("fixed-nav-box", window.scrollY > 100);
});

// Arrow icon smooth scrool started

/*-------------------------------------------------------------------------------*/














/*-------------------------------------------------------------------------------*/

// popup-registration started

const popupRegistration = document.querySelector(".popup-registration");
setTimeout(() => {
    popupRegistration.style.left = "20px";

}, 4000);

const closePopup = document.querySelector("#close-popup");
closePopup.addEventListener("click", () => {
    popupRegistration.style.left = "-350px";

});

// popup-registration end

/*-------------------------------------------------------------------------------*/












/*-------------------------------------------------------------------------------*/

// Register form Started

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkInputs();
});

const checkInputs = () => {

    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if (usernameValue === '') {
        setErrorFor(username, 'Xana bos buraxila bilmez')
    } else {
        setSuccesFor(username);
    };

    if (emailValue === '') {
        setErrorFor(email, 'Xana bos buraxila bilmez')
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Yanlis Mail')
    } else {
        setSuccesFor(email)
    };

    if (passwordValue === '') {
        setErrorFor(password, 'Xana bos buraxila bilmez')
    } else if (passwordValue !== password2Value) {
        setErrorFor(password, 'Sifre uygun deyil')
    } else {
        setSuccesFor(password);
    };

    if (password2Value === '') {
        setErrorFor(password2, 'Xana bos buraxila bilmez')
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, 'Sifre uygun deyil')
    } else {
        setSuccesFor(password2);
    };
};

const setErrorFor = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
};

function setSuccesFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control succes';

    setTimeout(() => {
        registrationFormContainer.classList.remove("show-registration");

    }, 500);

    setTimeout(() => {
        const registrationComplatedBox = document.querySelector(".registration-complated-box");
        registrationComplatedBox.classList.add("registration-complated-box-active");

    }, 700);

    setTimeout(() => {
        const registrationComplatedBox = document.querySelector(".registration-complated-box");
        registrationComplatedBox.classList.remove("registration-complated-box-active");
        registrationComplatedBox.classList.add("registration-complated-box");

    }, 1400);

    setTimeout(() => {

        document.getElementById('username').value = "";
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";
        document.getElementById('password2').value = "";

        formControl.className = "form-control";
    }, 1100);
};

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};

// *show-hidden registration form started
let registrationFormContainer = document.querySelector(".registration-form-container");
let goToRegistration = document.querySelector("#go-to-registration");
goToRegistration.addEventListener("click", () => {
    registrationFormContainer.classList.add("show-registration");
});

let closeRegistrationBtn = document.querySelector("#close-registration");
closeRegistrationBtn.addEventListener("click", () => {
    registrationFormContainer.classList.remove("show-registration");

});

// Register form end

/*-------------------------------------------------------------------------------*/









/*-------------------------------------------------------------------------------*/

// cart container show

const cartIcon = document.querySelector("#cartIcon");
const cartContainer = document.querySelector(".cart-container");

cartIcon.addEventListener("click",()=>{
    cartContainer.classList.add("cart-container-classlist");
});

const closeCart = document.querySelector("#closeCart");

closeCart.addEventListener("click",()=>{
    cartContainer.classList.remove("cart-container-classlist");
});

// cart container hidden

/*-------------------------------------------------------------------------------*/










/*-------------------------------------------------------------------------------*/

// feedback started


const btnAdd = document.querySelector("#btn-add");
btnAdd.addEventListener("click", () => {

    let nameSurname = document.querySelector("#name-surname");
    let userComment = document.querySelector("#user-comment");

    if (nameSurname.value !== "" && userComment.value !== "") {
        let list = document.querySelector(".list");
        let time = new Date();
        let day = time.getDay();
        let month = time.getMonth();
        let fullYear = time.getFullYear();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let now = day + " / " + month + " / " + fullYear + " | " + hours + " : " + minutes;
        let listItem = document.createElement("li");

        listItem.innerHTML = `
            <p>${nameSurname.value}</p>
            <p>${userComment.value}</p>
            <p>${now}</p>
        `;
        list.append(listItem);

    } else if (nameSurname.value == "" || userComment.value == "") {
        alert("Xanalardan her hansi bir doldurulmayib");
    };
    nameSurname.value = "";
    userComment.value = "";

});

// feedback end

/*-------------------------------------------------------------------------------*/



/*----------------------------------JS End---------------------------------------------*/
