export const loadConferences = function(week) {
    let panel = $('<div class="conf"></div>');
    let coastal = loadCoastal(week);
    let atlantic = loadAtlantic(week);
    panel.append(coastal, atlantic);
    return panel;
}

export const loadCoastal = function(week) {
    let coa = $('<div class="is-size-4">Coastal</div>').css({
        "padding-bottom": "12px",
        "padding-top": "12px"
    });
    let panel = $('<div id="coastal"></div>').append(coa).css({
        "text-align": "center",
        "width": "45%",
        "display": "inline-block",
        "margin-left": "2.5%",
        "margin-right": "2.5%",
    });
    let categories = $('<div></div>');
    let rank = $('<div></div>').append("Rank").css({
        "width": "5%",
        "display": "inline-block",
        "padding-left": "10px"
    });
    let team = $('<div></div>').append("Teams").css({
        "width": "40%",
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
    let atl = $('<div class="is-size-4">Atlantic</div>').css({
        "padding-bottom": "12px",
        "padding-top": "12px"
    });
    let panel = $('<div id="atlantic"></div>').append(atl).css({
        "text-align": "center",
        "width": "45%",
        "display": "inline-block",
        "margin-left": "2.5%",
        "margin-right": "2.5%",
    });
    let categories = $('<div></div>');
    let rank = $('<div></div>').append("Rank").css({
        "width": "5%",
        "display": "inline-block",
        "padding-left": "10px"
    });
    let team = $('<div></div>').append("Teams").css({
        "width": "40%",
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
        "text-align": "center",
        "border-style": "solid",
        "border-radius": "8px",
        "border-color": "black",
        "margin-top": "12px",
        "padding-top": "12px",
        "margin-bottom": "12px",
        "padding-bottom": "12px",
        "padding-left": "8px"
    });
    let ranks = $('<div></div>').append(rank+1).css({
        "width": "5%",
        "display": "inline-block",
    });
    let teamName = $('<div></div>').append(team.teamCity + " " + team.teamName).css({
        "width": "40%",
        "display": "inline-block",
    });
    let wins = 0;
    let losses = 0;
    let sched = team.schedule;
    for (let i = 1; i < week; i++) {
        if (sched[i].thisScore > sched[i].oppScore) {
            wins++;
        } else if (sched[i].thisScore < sched[i].oppScore) {
            losses++;
        }
    }
    let record = wins + " - " + losses;
    let recordDiv = $('<div></div>').append(record).css({
        "width": "20%",
        "display": "inline-block",
        "text-align": "center"
    });
    let opponent = sched[week].opponent;
    let oppDiv = $('<div></div>').append(opponent).css({
        "width": "35%",
        "display": "inline-block",
    });
    teamDiv.append(ranks, teamName, recordDiv, oppDiv);
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
    $('#home')[0].children[0].remove();
    $('#home').prepend(loadConferences(weekNum));
}

export const loadHomePage = function() {
    let $home = $('#home');

    $home.append(loadConferences(13));
    $home.append(weekForm(13));
}

$(function() {
    loadHomePage();
});
