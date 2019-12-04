export const fillLeague = function(leagueName) {
    axios({
        method: "get",
        url: "http://localhost:3000/private/leagues/" + leagueName,
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGF2Y3ViIiwiaWF0IjoxNTc1MzIyMTk3LCJleHAiOjE1Nzc5MTQxOTd9.ceQcmbOd3WAirw7rKUtufa1uFzVzcB3y5jumizx9EEw"
        }
    }).then(data => {
        let nameLibrary = ["KMP", "Aaron", "Burgess", "Stotts", "McMillan", "Kris", "Plaisted", "Pizer", "Timmy", "David"];
        let d = data.data.result;
        let owner = d.owner;
        let teams = d.users;
        let size = d.size;
        let teamsNeed = 8 - size;
        for (let key in teams) {
            teams[key] = makeTeam();
        }
        for (let i = 0; i < teamsNeed; i++) {
            let rand = Math.floor(Math.random()*10);
            if (teams[nameLibrary[rand]] == undefined) {
                teams[nameLibrary[rand]] = makeTeam();
            } else {
                i--;
            }
        }
        axios({
            method: "post",
            url: "http://localhost:3000/private/leagues/Hello",
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGF2Y3ViIiwiaWF0IjoxNTc1MzIyMTk3LCJleHAiOjE1Nzc5MTQxOTd9.ceQcmbOd3WAirw7rKUtufa1uFzVzcB3y5jumizx9EEw"
            },
            data: {
                data: {
                    owner: owner,
                    size: 8,
                    users: teams
                }
            }
        })
    });
}

export const makeTeam = function() {
    let a = {
        roster: {
            QB: "",
            RB: "",
            WR: "",
            TE: "",
            Bench: []
        }
    }
    return a;
}

//This fills the league called Hello
//fillLeague("Hello");
let timer;

export const makeTimer = function() {
    let panel = $('<div id="timer"></div>').css({
        "width": "10%",
        "float": "left"
    });
    let div = $('<div>Time Remaining</div>');
    let counter = $('<div id="counter"></div>').text("1:00");

    let count = 59;

    //update display

    timer = setTimeout(update, 1000);
    //this allows for 'clearTimeout' if needed

    function update() {
        if (count > 0) {
            $("#counter").text("0:"+count--);
            timer = setTimeout(update, 1000);
        } else {
            autoDraft(user);
        }
    }
    panel.append(div, counter);
    return panel;
}

export const autoDraft = function(team) {
    let current = 0;
    while (true) {
        let position = mainPlayers[current][1].position;
        if (mainTeams[team].roster[position] == "") {
            draft(team, mainPlayers[current]);
            break;
        } else if (mainTeams[team].roster["QB"] != "" && mainTeams[team].roster["RB"] != "" && mainTeams[team].roster["WR"] != "" && mainTeams[team].roster["TE"] != "") {
            draft(team, mainPlayers[current]);
            break;
        }
        current++;
    }
}

export const draft = function(team, player) {
    let position = player[1].position;
    if (mainTeams[team].roster[position] != "") {
        mainTeams[team].roster["Bench"].push(player);
    } else {
        mainTeams[team].roster[position] = player;
    }
    let index = mainPlayers.indexOf(player);
    mainPlayers.splice(index, 1);
    let id = player[0];
    $('#'+id).remove();
    $('#draftQueue')[0].children[0].remove();
}

export const makeDraftBoard = function() {
    axios({
        method: "get",
        url: "http://localhost:3000/public/players"
    }).then(data => {
        let players = Object.entries(data.data.result);
        for (let i = 0; i < players.length; i++) {
            let total = 0;
            let playerStats = players[i][1].statsPerWeek;
            for (let key in playerStats) {
                if (playerStats[key].points != undefined) {
                    total += playerStats[key].points;
                }
            }
            players[i][1]["points"] = Math.round((total)*100) / 100.0;
        }
        players.sort((a, b) => (a[1].points < b[1].points) ? 1 : -1);
        for (let i = 0; i < players.length; i++) {
            if (players[i][1].first != undefined) {
                $('#draftBoard').append(makePlayerDraftCard(players[i]));
                mainPlayers.push(players[i]);
            }
        }
    });
}

export const makePlayerDraftCard = function(player) {
    let panel = $('<div class="player"></div>').attr({
        id: player[0]
    });
    let nameDiv = $('<div></div>').append(player[1].first + " " + player[1].last);
    let pointDiv = $('<div></div>').append(player[1].points);
    let draftButton = $('<button class="draftButton">Draft</button>').css({
        "background-color": "#4CAF50"
    });
    panel.append(nameDiv, pointDiv, draftButton);
    return panel;
}

export const makeDraftQueue = function() {
    axios({
        method: "get",
        url: "http://localhost:3000/private/leagues/Hello/users/",
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGF2Y3ViIiwiaWF0IjoxNTc1MzIyMTk3LCJleHAiOjE1Nzc5MTQxOTd9.ceQcmbOd3WAirw7rKUtufa1uFzVzcB3y5jumizx9EEw"
        }
    }).then(data => {
        let teams = data.data.result;
        for (let i = 0; i < teams.length; i++) {
            mainTeams[teams[i]] = makeTeam();
        }
        for (let i = 0; i < 8; i++) {
            for (let i = 0; i < teams.length; i++) {
                mainQueue.push(teams[i]);
            }
        }
        for (let i = 0; i < mainQueue.length; i++) {
            $('#draftQueue').append(makeQueueDraftCard(i+1, mainQueue[i]));
        }
    });
}

export const makeQueueDraftCard = function(number, name) {
    let panel = $('<div></div>');
    let pickDiv = $('<div></div>').append("Pick No. " + number);
    let nameDiv = $('<div></div>').append(name);
    panel.append(pickDiv, nameDiv);
    return panel;
}

export const loadAutoDraftManager = function() {
    while (mainQueue[0] != user) {
        let team = mainQueue[0];
        setTimeout(function() {
            autoDraft(team)
        }, 500);
        mainQueue.shift();
        if (mainQueue.length == 0 && mainTeams != {}) {
            setTimeout(function() {
                alert("Draft OVER!!");
                console.log(mainTeams);
            },500);
            break;
        }
    }
    $('#home').prepend(makeTimer());
}

export const handleDraftEvent = function(event) {
    let id = $(event.target).closest('.player')[0].id;
    let player;
    for (let i = 0; i < mainPlayers.length; i++) {
        if (mainPlayers[i][0] == id) {
            player = mainPlayers[i];
            break;
        }
    }
    draft(user, player);
    clearTimeout(timer);
    $('#timer').remove();
    mainQueue.shift();
    loadAutoDraftManager();
}

export const loadDraftPage = function() {
    let $home = $('#home');

    $home.append($('<div id="draftBoard"></div>').css({"width": "60%", "float": "left"}));
    
    makeDraftBoard();

    $home.append($('<div id="draftQueue"></div>').css({"width": "25%", "float": "left"}));
    
    makeDraftQueue();

    setTimeout(function() {
        loadAutoDraftManager()
    }, 1500);

    $home.on('click', '.draftButton', handleDraftEvent);

}

//Have user stored somehow here
let user = "David";
let mainQueue = [];
let mainTeams = {};
let mainPlayers = [];

$(function() {
    fillLeague("Hello");
    loadDraftPage();
});
