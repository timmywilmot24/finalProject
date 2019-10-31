

function lbContentMake(leaguePlayers) {
    //this function takes an array or objects of league players
    //afterward it arranges the object/array in chronological order accroding to their ranks
    //their record and total points scored should determine their ranks

    //after that the field should individually append to a <th>
    //have the <th> append to a <tr> then append the <tr> to #lbTable

    //sort the array from most wins to least wins
    leaguePlayers.sort(function(a, b){return b.wins - a.wins});
    // should check if wins are equal => if it is then have the one with more points be ranked higher
    for (let i = 0; i < leaguePlayers.lenght(); i++) {
        if (leaguePlayers[i].wins == leaguePlayers[i + 1].wins) {
            let more;
            if (leaguePlayers[i].points > leaguePlayers[i + 1].points) {
                more = leaguePlayers[i];
            } else if(leaguePlayers[i].points < leaguePlayers[i + 1].points) {
                more = leaguePlayers[i+1];
            }
        }
    }

    // make the <th> for each field and <tr> for each league Player
    for (let i = 0; i < leaguePlayers.length(); i++) {
        let tr = $("<tr></tr>");  

        let rank = $("<td></td>");
        let teamName = $("<td></td>");
        let record  = $("<td></td>");
        let pointsFor  = $("<td></td>");
        let pointsAgainst  = $("<td></td>");

        rank.append(leaguePlayers[i].rank);
        teamName.append(leaguePlayer[i].teamName);
        record.append(leaguePlayer[i].record);
        pointsFor.append(leaguePlayer[i].points);
        pointsAgainst.append(leaguePlayer[i].pointsAgainst);

        tr.append(rank, teamName, record, points, pointsAgainst); 
        $("#lbTable").append(tr);
    }
};


function matchupContentMake(scedule) {
    // this function takes a scedule object
    // goes through the scedule and displays only the selected week matchups

    // each matchup div contains two team divs
    // each team divs holds a picture, teamName, and total points scored
    let matchup1 = $("<div></div>");
    let matchup2 = $("<div></div>");
    let matchup3 = $("<div></div>");
    let matchup4 = $("<div></div>");
    let matchup5 = $("<div></div>");

    //need a function that creates the team div
    //need a way to relate to schedule
}

function transcationContentMake() {
    // I don't what parameter it should take in yet
    //this function creates a transcation div
    //the transcation div holds information of who was dropped and added

    // in the end appends the transaction div onto #tContent
}

$(function() {
    lbContentMake();
});