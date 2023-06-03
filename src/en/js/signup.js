const host = 'http://localhost:8080';
const signupButton = document.getElementById('signup');

const labelErrorName = document.getElementById('label-error-name');
const labelErrorLastname = document.getElementById('label-error-lastname');
const labelErrorUsername = document.getElementById('label-error-username');
const labelErrorEmail = document.getElementById('label-error-email');
const labelErrorPassword = document.getElementById('label-error-password');
const labelErrorConfirmPassword = document.getElementById('label-error-confirm-password');
const labelErrorConfirmPasswordEmpty = document.getElementById('label-error-confirm-password-empty');
const currentPage = window.location.href;

// Random Background Image
let random = Math.floor(Math.random() * 4);

const homeElement = document.getElementById('home');

homeElement.style.backgroundImage = 'url(../img/background-'+random+'.jpg)';

// Check the session
let isLogged = localStorage.getItem('isLogged');

if (isLogged === 'true') {
    const newPage = currentPage.replace("/views/signup.html", "/index.html");
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
    jQuery("#second-part").html(' > Frequent Questions');
});

jQuery("#contact-us").on('click', () => {
    hideModules();
    jQuery("#contact-us-info").show();
    jQuery("#second-part").html(' > Contact us');
});

jQuery("#principal").on('click', () => {
    hideModules();
    jQuery("#signup-form").show();
});

// Close session setup
jQuery("#close-session").on('change', () => {
    const closeSession = jQuery("#close-session").val('close-session');

    if (closeSession === '') {
        closeSession = 0;

    }

    fetch(host + '/users/setup', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body: JSON.stringify({
            closeSession
        })
    })
});