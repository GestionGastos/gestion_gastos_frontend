const signupButton = document.getElementById('signup');

const labelErrorName = document.getElementById('label-error-name');
const labelErrorLastname = document.getElementById('label-error-lastname');
const labelErrorUsername = document.getElementById('label-error-username');
const labelErrorEmail = document.getElementById('label-error-email');
const labelErrorPassword = document.getElementById('label-error-password');
const labelErrorConfirmPassword = document.getElementById('label-error-confirm-password');
const labelErrorConfirmPasswordEmpty = document.getElementById('label-error-confirm-password-empty');
const currentPage = window.location.href;
const host = 'http://localhost:8080';

// Random Background Image
let random = Math.floor(Math.random() * 4);

const homeElement = document.getElementById('home');

//homeElement.style.backgroundImage = 'url("/es/img/background-'+random+'.jpg")';

// Redirect to another language page
const selectElement = document.getElementById('select-language');

selectElement.addEventListener('change', () => {
    if (selectElement.value === "en") {
        const newPage = currentPage.replace("/es", "/en");
        window.location.replace(newPage);
    }
});

// Check the session
let isLogged = localStorage.getItem('isLogged');

if (isLogged === 'true') {
    const newPage = currentPage.replace("/signup.html", "/index.html");
    window.location.replace(newPage);
}

// When the document is ready
jQuery('document').ready(() => {
    showForm();
});

const showForm = () => {
    setTimeout(() => {
        jQuery('#signup-form').fadeIn();
    }, 1000);
}

jQuery('#login-link').click(() => {
    const currentPage = window.location.href;
    const newPage = currentPage.replace("/signup.html", "/login.html");
    window.location.replace(newPage);
});

jQuery("#signup").click(() => {
    clearFormErrors();
    const name = jQuery('#name').val();
    const lastname = jQuery('#lastname').val();
    const username = jQuery('#username').val();
    const email = jQuery('#email').val();
    const password = jQuery('#password').val();
    const confirmPassword = jQuery('#confirm-password').val();
    let validated = true;

    if (name === '') {
        labelErrorName.style.display = 'block';
        validated = false;
    }

    if (lastname === '') {
        labelErrorLastname.style.display = 'block';
        validated = false;
    }

    if (username === '') {
        labelErrorUsername.style.display = 'block';
        validated = false;
    }

    if (email === '') {
        labelErrorEmail.style.display = 'block';
        validated = false;
    }

    if (password === '') {
        labelErrorPassword.style.display = 'block';
        validated = false;
    }

    if (confirmPassword === '') {
        labelErrorConfirmPasswordEmpty.style.display = 'block';
        validated = false;
    }

    if (password !== confirmPassword) {
        labelErrorConfirmPassword.style.display = 'block';
        validated = false;
    }

    if (validated) {
        fetch(host + '/users/signup', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                name,
                lastname,
                username,
                email,
                password
            })
        })
        .then(result => {
            return result.json();
        })
        .then(res => {
            if (res.message === 'User created') {
                const newPage = currentPage.replace("/signup.html", "/login.html");
                window.location.replace(newPage);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
});

const clearFormErrors = () => {
    labelErrorName.style.display = 'none';
    labelErrorLastname.style.display = 'none';
    labelErrorUsername.style.display = 'none';
    labelErrorEmail.style.display = 'none';
    labelErrorConfirmPassword.style.display = 'none';
    labelErrorConfirmPasswordEmpty.style.display = 'none';
}

// show and hide modules
const hideModules = () => {
    jQuery("#signup-form").hide();
    jQuery("#contact-us-info").hide();
    jQuery("#frequent-questions-info").hide();
    jQuery("#second-part").html('');
};

jQuery('#frequent-questions').on('click', () => {
    hideModules();
    jQuery("#frequent-questions-info").show();
    jQuery("#second-part").html(' > Preguntas Frecuentes');
});

jQuery("#contact-us").on('click', () => {
    hideModules();
    jQuery("#contact-us-info").show();
    jQuery("#second-part").html(' > Contactenos');
});

jQuery("#principal").on('click', () => {
    hideModules();
    jQuery("#signup-form").show();
});

// show and hide answers
const hideAnswers = () => {
    jQuery("#first-question-answer").hide();
    jQuery("#second-question-answer").hide();
    jQuery("#third-question-answer").hide();
    jQuery("#fourth-question-answer").hide();
}

let firstQuestion = 0;
jQuery("#first-question").on('click', () => {
    hideAnswers();
    if (firstQuestion === 0) {
        jQuery("#first-question-answer").show();
        firstQuestion = 1;
    } else {
        firstQuestion = 0;
    }
});

let secondQuestion = 0;
jQuery("#second-question").on('click', () => {
    hideAnswers();
    if (secondQuestion === 0) {
        jQuery("#second-question-answer").show();
        secondQuestion = 1;
    } else {
        secondQuestion = 0;
    }
});

let thirdQuestion = 0;
jQuery("#third-question").on('click', () => {
    hideAnswers();
    if (thirdQuestion === 0) {
        jQuery("#third-question-answer").show();
        thirdQuestion = 1;
    } else {
        thirdQuestion = 0;
    }
});

let fourthQuestion = 0;
jQuery("#fourth-question").on('click', () => {
    hideAnswers();
    if (fourthQuestion === 0) {
        jQuery("#fourth-question-answer").show();
        fourthQuestion = 1;
    } else {
        fourthQuestion = 0;
    }
});

// contact us
jQuery("#send-message").on('click', () => {
    const email = jQuery("#user-email").val();
    const subject = jQuery("#subject").val();
    const message = jQuery("#message").val();
    let validated = true;

    if (email === '') {
        jQuery("#label-error-email-mail").show();
        validated = false;
    }

    if (subject === '') {
        jQuery("#label-error-subject").show();
        validated = false;
    }

    if (message === '') {
        jQuery("#label-error-message").show();
        validated = false;
    }

    if (validated) {
        fetch(host + '/users/send', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email,
                subject,
                message
            })
        })
        .then(result => {
            return result.json();
        })
        .then(res => {
            if (res.message === 'success') {
                jQuery("#label-success-mail").show();
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
});

jQuery("#show-password").on('click', () => {
    if (jQuery("#show-password").is(':checked')) {
        jQuery("#confirm-password").attr('type', 'text');
        jQuery("#password").attr('type', 'text');
    } else {
        jQuery("#confirm-password").attr('type', 'password');
        jQuery("#password").attr('type', 'password');
    }
});