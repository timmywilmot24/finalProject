export const renderWeekForm = function() {
    let panel = $('<div class="select field is-rounded weekForm"></div>').css({
        "width": "8%",
        "margin-left": "auto",
        "margin-right": "auto",
        "padding-bottom": "60px"
    });
    let select = $('<select></select>').change(handleWeekChange);
    select.append($('<option selected="selected"></option').append("All"));
    select.append($('<option></option').append("QB"));
    select.append($('<option></option').append("RB"));
    select.append($('<option></option').append("WR"));
    select.append($('<option></option').append("TE"));
    let searchBar = $('<input type="text" placeholder="Search for player here..." class="searchBar">').keyup(handleSearchKeyPress);
    panel.append(select, searchBar);
    return panel;
}

let timeout;
export const debounce = function(func, value) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        func(value);
    }, 500);
}

export const handleSearchKeyPress = function(event) {
    let search = event.target.value;
    debounce(renderResults, search);
}

export const renderResults = function(value) {
    $('#home').append(renderPlayerList(value));
}

export const handleWeekChange = function(event) {
    event.preventDefault();
    $('#home')[0].children[1].remove();
    $('#home').append(filterPos($(event.target)[0].value));
}

export const renderPlayerList = function(string) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/public/players',
    }).then(data => { 
        let players = Object.entries(data.result);
        let playerArray = [];
        for (let i = 0; i < players.length; i++) {
            let name = players[i][1].first + " " + players[i][1].last;
            name = name.toLowerCase();
            string = string.toLowerCase();
            if (name.includes(string)) {
                let position = ($('#home')[0].children[0].children[0].value);
                if (players[i][1].position == position) {
                    playerArray.push(players[i]);
                } else if (position == "All") {
                    playerArray.push(players[i]);
                }
            }
        }
        for (let i = 0; i < playerArray.length; i++) {
            let total = 0;
            let playerStats = playerArray[i][1].statsPerWeek;
            for (let key in playerStats) {
                if (playerStats[key].points != undefined) {
                    total += playerStats[key].points;
                }
            }
            playerArray[i][1]["points"] = Math.round((total)*100) / 100.0;
        }
        playerArray.sort((a, b) => (a[1].points < b[1].points) ? 1 : -1);
        let panel = $('<div class="allPlayers"></div>');
        let numPlayers = 100;
        if (playerArray.length < numPlayers) {
            numPlayers = playerArray.length;
        }
        for (let i = 0; i < numPlayers; i++) {
            panel.append(renderPlayerCard(playerArray[i][1], i));
        }
        $('#home')[0].children[1].remove();
        $("#home").append(panel);  
    });
}

export const filterPos = function(position) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/public/players',
    }).then(data => {
        let players = Object.entries(data.result);
        let playerArray = [];
        let string = $('.searchBar')[0].value;
        for (let i = 0; i < players.length; i++) {
            let name = players[i][1].first + " " + players[i][1].last;
            name = name.toLowerCase();
            string = string.toLowerCase();
            if (name.includes(string)) {
                if (players[i][1].position == position) {
                    playerArray.push(players[i]);
                } else if (position == "All") {
                    playerArray.push(players[i]);
                }
            }
        }
        for (let i = 0; i < playerArray.length; i++) {
            let total = 0;
            let playerStats = playerArray[i][1].statsPerWeek;
            for (let key in playerStats) {
                if (playerStats[key].points != undefined) {
                    total += playerStats[key].points;
                }
            }
            playerArray[i][1]["points"] = Math.round((total)*100) / 100.0;
        }
        playerArray.sort((a, b) => (a[1].points < b[1].points) ? 1 : -1);
        let panel = $('<div class="allPlayers"></div>');
        let numPlayers = 100;
        if (playerArray.length < numPlayers) {
            numPlayers = playerArray.length;
        }
        for (let i = 0; i < numPlayers; i++) {
            panel.append(renderPlayerCard(playerArray[i][1], i));
        }
        $("#home").append(panel);
    });
    
}

export const renderPlayerCard = function(player, rank) {
    let panel = $('<div class="player"></div>');
    let rankDiv = $('<div></div>').append(rank+1).css({
        "width": "10%",
        "display": "inline-block",
    })
    let name = player.first + " " + player.last;
    let nameDiv = $('<div></div>').append(name).css({
        "width": "20%",
        "display": "inline-block",
    });
    let posDiv = $('<div></div>').append(player.position).css({
        "width": "20%",
        "display": "inline-block",
    });
    let pointsDiv = $('<div></div>').append(player.points).css({
        "width": "20%",
        "display": "inline-block",
    });
    return panel.append(rankDiv, nameDiv, posDiv, pointsDiv);
}

export const loadHomePage = function() {
    let $home = $('#home');

    $home.append(renderWeekForm());
    $home.append(filterPos("All"));
}

$(function() {
    loadHomePage();
});
