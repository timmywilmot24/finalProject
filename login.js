export const loadCreate = function() {
    let userText = $('<div>Username:</div>');
    let user = $('<input type="text" class="usernameInput">');
    let passText = $('<div>Password:</div>');
    let pass = $('<input type="text" class="passwordInput">');
    let nameText = $('<div>Nickname (Optional):</div>');
    let name = $('<input type="text" class="nameInput">');
    let leagueText = $('<div>Do you wish to create a league?</div>');
    let league = $('<input type="checkbox" class="leagueOption">')
    let submit = $('<button class="createButton">Create</button>');
    let panel = $('<div class="loginPage"></div>').append(userText, user, passText, pass, nameText, name, leagueText, league, submit);
    $('#login').append(panel);
}

export const loadLogin = function() {
    let userText = $('<div>Username:</div>');
    let user = $('<input type="text" class="usernameInput">');
    let passText = $('<div>Password:</div>');
    let pass = $('<input type="text" class="passwordInput">');
    let submit = $('<button class="loginButton">Login</button>');
    let panel = $('<div class="loginPages"></div>').append(userText, user, passText, pass, submit);
    $('#login').append(panel);
}

export const handleCreateButton = async function(event) {
    event.preventDefault();
    let username = event.target.closest(".loginPage").children[1].value;
    let password = event.target.closest(".loginPage").children[3].value;
    await $.ajax({
        method: "POST",
        url: "http://localhost:3000/account/create",
        data: {
            name: username,
            pass: password
        }
    }).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
    let name = event.target.closest(".loginPage").children[5].value;
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/account/login",
        data: {
            name: username,
            pass: password
        }
    }).then(response => {
        let jwt = response.jwt;
        document.cookie = "jwt=" + jwt;
        axios({
            method: "post",
            url: "http://localhost:3000/user/info",
            headers: {
                Authorization: "Bearer " + jwt,
            },
            data: {
                data: {
                    leagues: [],
                    name: name,
                }
            }
        }).then(data => {
            console.log(data.data.result);
        });
    });
    if (($('.leagueOption')[0].checked)) {
        $(event.target.closest('.loginPage')).replaceWith(renderLeagueCreateForm());
    } else {
        event.target.closest('.loginPage').replaceWith(loadPage);

    }
}

export const renderLeagueCreateForm = function() {
    let leagueText = $('<div>League Name:</div>');
    let league = $('<input type="text" class="leagueName">');
    let amountText = $('<div>How many teams?</div>');
    let amount = $('<input type="text" class="leagueAmount">');
    let submit = $('<button class="createLeague">Create League</button>');
    let panel = $('<div class="leagueMake"></div>').append(leagueText, league, amountText, amount, submit);
    return panel;
}

export const handleLoginButton = async function(event) {
    event.preventDefault();
    let username = event.target.closest(".loginPages").children[1].value;
    let password = event.target.closest(".loginPages").children[3].value;
    let jwt = await $.ajax({
        method: 'POST',
        url: "http://localhost:3000/account/login",
        data: {
            name: username,
            pass: password,
        }
    }).then(data => {
        return data.jwt;
    });
}

export const addButtons = function(jwt) {
    const $login = $('#login');
    let home = $('<button class="home">Home</button>');
    let league = $('<button class="league">League</button>');
    let matchup = $('<button class="matchup">Matchup</button>');
    let team = $('<button class="team">Team</button>');
    let players = $('<button class="players">Players</button>');
    let buttons = $('<div class="buttons">/<div>').append(home, league, matchup, team, players);
    $login.append(buttons);
}

export const handleCreateLeague = function(event) {
    event.preventDefault();
    let leagueName = event.target.closest(".leagueMake").children[1].value;
    let leagueAmount = event.target.closest(".leagueMake").children[3].value;
    let jwt = document.cookie.substring(4);
    axios({
        method: "post",
        url: "http://localhost:3000/private/leagues/" + leagueName,
        headers: {
            Authorization: "Bearer " + jwt,
        },
        data: {
            data: {
                name: leagueName,
                size: leagueAmount,
            }
        }
    })
    axios({
        method: "post",
        url: "http://localhost:3000/user/"
    })
}

export const loadPage = function() {
    const $login = $('#login');

    let create = $('<button class="create">Create</button>');
    let login = $('<button class="login">Login</button>');
    $login.append(create, login);

    $login.on('click', '.create', loadCreate);
    $login.on('click', '.login', loadLogin);

    $login.on('click', '.createButton', handleCreateButton);
    $login.on('click', '.loginButton', handleLoginButton);

    $login.on('click', '.createLeague', handleCreateLeague);
}

$(function() {
    loadPage();
});
