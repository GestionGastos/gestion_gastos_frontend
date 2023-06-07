const host = 'http://localhost:8080';
const currentPage = window.location.href;
const labelErrorInvalid = document.getElementById('label-error-invalid');
const labelErrorEmail = document.getElementById('label-error-email');
const labelErrorPassword = document.getElementById('label-error-password');
const newPage = currentPage.replace("/views/login.html", "/index.html");

let random = Math.floor(Math.random() * 4);

const homeElement = document.getElementById('home');

homeElement.style.backgroundImage = 'url(../img/background-'+random+'.jpg)';

// Redirect to another language page
const selectElement = document.getElementById('select-language');

selectElement.addEventListener('change', () => {
    if (selectElement.value === "es") {
        const newPage = currentPage.replace("/en", "/es");
        window.location.replace(newPage);
    }
});

// check the session
let isLogged = localStorage.getItem('isLogged');

if (isLogged === 'true') {
    window.location.replace(newPage);
}

// When the document is ready
jQuery('document').ready(function() {
    showForm();
});

const showForm = () => {
    setTimeout(() => {
        jQuery('#login-form').fadeIn();
    }, 2000);
}

// Loginss
jQuery('#login').click(() => {
    const email = jQuery("#email").val();
    const password = jQuery('#password').val();
    let validated = true;

    if (email === '') {
        labelErrorEmail.style.display = 'block';
        validated = false;
    }

    if (password === '') {
        labelErrorPassword.style.display = 'block';
        validated = false;
    }

    if (validated) {
        fetch(host +'/users/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(result => {
            return result.json();
        })
        .then(res => {
            switch(res.message) {
                case 'success':
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('isLogged',true);
                    
                    window.location.replace(newPage);
                    return true;
                case 'User Deleted':
                    jQuery("#label-error-deleted").show();
                    break;
                case 'Invalid Password':
                    jQuery("#label-error-invalid").show();
                    break;
            }
            return false;
        })
        .catch(err => {
            console.log(err);
        });
    }
});

// Signup page
jQuery('#signup').click(() => {
    const newPage = currentPage.replace("/login.html", "/signup.html");
    window.location.replace(newPage);
});

// show and hide modules
const hideModules = () => {
    jQuery("#login-form").hide();
    jQuery("#contact-us-info").hide();
    jQuery("#frequent-questions-info").hide();
    jQuery("#second-part").html('');
};

jQuery('#frequent-questions').on('click', () => {
    hideModules();
    jQuery("#frequent-questions-info").show();
    jQuery("#second-part").html(' > Frequent Questions');
});

jQuery("#contact-us").on('click', () => {
    hideModules();
    jQuery("#contact-us-info").show();
    jQuery("#second-part").html(' > Contact us');
});

jQuery("#principal").on('click', () => {
    hideModules();
    jQuery("#login-form").show();
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