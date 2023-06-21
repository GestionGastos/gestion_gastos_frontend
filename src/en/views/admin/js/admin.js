const host = 'http://localhost:8080';

// check the session
const currentPage = window.location.href;
const newPage = currentPage.replace("/admin/admin.html", "/login.html");
let isLogged = localStorage.getItem('isLogged');

if (isLogged === null) {
    window.location.replace(newPage);
}

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
                    html = "<table>" +
                            "<thead>" +
                                "<tr>" +
                                    "<th>E-Mail</th>" +
                                    "<th>Name</th>" +
                                    "<th>Last Name</th>" +
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
                                    "<td><button type='button'>Delete</button>" +
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
                    html = "<table>" +
                    "<thead>" +
                        "<tr>" +
                            "<th>From</th>" +
                            "<th>Subject</th>" +
                            "<th>Message</th>" +
                            "<th></th>" +
                        "<tr>" +
                    "</thead>" +
                    "<tbody>";
                    results.forEach(result => {
                        html += "<tr>" +
                                "<td>" + result.from + "</td>" +
                                "<td>" + result.subject + "</td>" +
                                "<td>" + result.message + "</td>" +
                                "<td><button type='button'>Delete</button>" +
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