export const loadConferences = function(week) {
    let panel = $('<div class="conf"></div>');
    let coastal = loadCoastal(week);
    let atlantic = loadAtlantic(week);
    panel.append(coastal, atlantic);
    return panel;
}

export const loadCoastal = function(week) {
    let panel = $('<div id="coastal"></div>').append("Coastal").css({
        "text-align": "center",
        "width": "40%",
        "display": "inline-block",
        "margin-left": "5%",
        "margin-right": "5%",
    });
    let categories = $('<div></div>').css({
        "text-align": "left",
    });
    let rank = $('<div></div>').append("Rank").css({
        "width": "10%",
        "display": "inline-block",
    });
    let team = $('<div></div>').append("Teams").css({
        "width": "35%",
        "display": "inline-block",
    });
    let record = $('<div></div>').append("Team Record").css({
        "width": "20%",
        "display": "inline-block",
    });
    let opponent = $('<div></div>').append("Opponent").css({
        "width": "35%",
        "display": "inline-block",
    });
    categories.append(rank, team, record, opponent);
    panel.append(categories);
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/public/teams"
    }).then(data => {
        let coastal = makeTeams("COASTAL", data, week);
        for (let i = 0; i < coastal.length; i++) {
            $('#coastal').append(renderTeamCard(coastal[i], week, i));
        }
    })
    return panel;
}

export const loadAtlantic = function(week) {
    let panel = $('<div id="atlantic"></div>').append("Atlantic").css({
        "text-align": "center",
        "width": "40%",
        "display": "inline-block",
        "margin-left": "5%",
        "margin-right": "5%",
    });
    let categories = $('<div></div>').css({
        "text-align": "left",
    });
    let rank = $('<div></div>').append("Rank").css({
        "width": "10%",
        "display": "inline-block",
    });
    let team = $('<div></div>').append("Teams").css({
        "width": "35%",
        "display": "inline-block",
    });
    let record = $('<div></div>').append("Team Record").css({
        "width": "20%",
        "display": "inline-block",
    });
    let opponent = $('<div></div>').append("Opponent").css({
        "width": "35%",
        "display": "inline-block",
    });
    categories.append(rank, team, record, opponent);
    panel.append(categories);
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/public/teams"
    }).then(data => {
        let atlantic = makeTeams("ATLANTIC", data, week);
        for (let i = 0; i < atlantic.length; i++) {
            $('#atlantic').append(renderTeamCard(atlantic[i], week, i));
        }
    })
    return panel;
}

let makeTeams = function(division, data, week) {
    let conf = [];
    for (var key in data.result) {
        if (data.result[key].division == division) {
            let wins = 0;
            let losses = 0;                
            let sched = data.result[key].schedule;
            for (let i = 1; i < week; i++) {
                if (sched[i].thisScore > sched[i].oppScore) {
                    wins++;
                } else {
                    losses++;
                }
            data.result[key].winpercent = wins / (wins+losses);
            }
            conf.push(data.result[key]);
        }
    }
    conf.sort((a, b) => (a.winpercent < b.winpercent) ? 1 : -1);
    return conf;
}
export const renderTeamCard = function(team, week, rank) {
    let teamDiv = $('<div></div>').css({
        "text-align": "left",
    });
    let ranks = $('<div></div>').append(rank+1).css({
        "width": "10%",
        "display": "inline-block",
    });
    let teamFirstName = $('<div></div>').append(team.teamCity).css({
        "width": "35%",
        "display": "inline-block",
    });
    let teamLastName = $('<div></div>').append(team.teamName).css({
        "width": "35%",
        "display": "inline-block",
    });
    let wins = 0;
    let losses = 0;
    let sched = team.schedule;
    for (let i = 1; i < week; i++) {
        if (sched[i].thisScore > sched[i].oppScore) {
            wins++;
        } else {
            losses++;
        }
    }
    let record = wins + " - " + losses;
    let recordDiv = $('<div></div>').append(record).css({
        "width": "20%",
        "display": "inline-block",
    });
    let blank = $('<div></div>').css({
        "width": "10%",
        "display": "inline-block",
    });
    let opponent = sched[week].opponent;
    let oppDiv = $('<div></div>').append(opponent).css({
        "width": "35%",
        "display": "inline-block",
    });
    teamDiv.append(ranks, teamFirstName, recordDiv, oppDiv, blank, teamLastName);
    return teamDiv;
}

export const weekForm = function(week) {
    let panel = $('<div class="select is-rounded weekForm"></div>').css({
        "width": "10%",
        "margin-left": "45%",
        "margin-right": "45%",
    });
    let select = $('<select></select>').change(handleWeekChange);
    for (let i = 1; i < 15; i++) {
        if (i == week) {
            select.append($('<option selected="selected"></option').append("Week " + i));
        } else {
            select.append($('<option></option').append("Week " + i));
        }
    }
    panel.append(select);
    return panel;
}

export const handleWeekChange = function(event) {
    event.preventDefault();
    let weekNum = $(event.target)[0].value.substr(5,6);
    $('#home')[0].children[1].remove();
    $('#home').append(loadConferences(weekNum));
}

export const loadHomePage = function() {
    let $home = $('#home');

    $home.append(weekForm(13));
    $home.append(loadConferences(13));
}

$(function() {
    loadHomePage();
});
