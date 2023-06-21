const host = 'http://localhost:8080';

// check the session
const currentPage = window.location.href;
const newPage = currentPage.replace("/admin/admin.html", "/login.html");
let isLogged = localStorage.getItem('isLogged');

if (isLogged === null) {
    window.location.replace(newPage);
}

// logout
const logoutButton = document.getElementById('logout');

const logoutFunction = () => {
    fetch(host + '/users/logout', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            token: localStorage.getItem('token')
        })
    })
    .then(result => {
        return result.json();
    })
    .then(res => {
        if (res.message === 'success') {
            localStorage.removeItem('isLogged');
            localStorage.removeItem('token');
            const newPage = currentPage.replace("/admin/admin.html", "/login.html");
            window.location.replace(newPage);
        }
    })
    .catch(err => {
        console.log(err);
    });
};

logoutButton.addEventListener('click', logoutFunction);

// Get info
jQuery("document").ready(() => {
    getUsers();
    getMails();
});

const getUsers = () => {
    fetch(host + '/admin/users/')
        .then(result => {
            return result.json();
        })
        .then(res => {
            if (res.message === 'success') {
                const results = res.result;
                if (results.length > 0) {
                    html = "<table cellspacing='0' class='table'>" +
                            "<thead>" +
                                "<tr>" +
                                    "<th>E-Mail</th>" +
                                    "<th>Nombre</th>" +
                                    "<th>Apellido</th>" +
                                    "<th>Username</th>" +
                                    "<th></th>" +
                                "<tr>" +
                            "</thead>" +
                            "<tbody>";
                    results.forEach(result => {
                        html += "<tr>" +
                                    "<td>" + result.email + "</td>" +
                                    "<td>" + result.name + "</td>" +
                                    "<td>" + result.lastname + "</td>" +
                                    "<td>" + result.username + "</td>" +
                                    "<td><button type='button' class='btn-delete-table'>Eliminar</button>" +
                                "<tr>";
                    });
                    html += "</tbody>" +
                        "</table>";
                    jQuery("#users").html(html);
                    jQuery("#users-error").hide();
                }
            }
        });
};

const getMails = () => {
    fetch(host + '/admin/mails/')
        .then(result => {
            return result.json();
        })
        .then(res => {
            if (res.message === 'success') {
                const results = res.result;
                console.log(results);
                if (results.length > 0) {
                    html = "<table cellspacing='0' class='table'>" +
                    "<thead>" +
                        "<tr>" +
                            "<th>De</th>" +
                            "<th>Asunto</th>" +
                            "<th>Mensaje</th>" +
                            "<th></th>" +
                        "<tr>" +
                    "</thead>" +
                    "<tbody>";
                    results.forEach(result => {
                        html += "<tr>" +
                                "<td>" + result.from + "</td>" +
                                "<td>" + result.subject + "</td>" +
                                "<td>" + result.message + "</td>" +
                                "<td><button type='button' class='btn-delete-table'>Eliminar</button>" +
                            "<tr>";
                    });
                    html += "</tbody>" +
                        "</table>";

                    jQuery("#mails").html(html);
                    jQuery("#mails-error").hide();
                }
            }
        });
};

// Show modules
const hideModules = () => {
    jQuery("#users-main").hide();
    jQuery("#mails-main").hide();
};

jQuery("#show-users").on('click', () => {
    hideModules();

    jQuery("#users-main").show();
});

jQuery("#show-mails").on('click', () => {
    hideModules();

    jQuery("#mails-main").show();
});