
let fullTeams = ["Clemson", "Syracuse", "NC State", "Duke", "Virginia", "Boston College", "Wake Forest", "Georgia Tech", "Miami", "Pittsburgh", "Virginia Tech", "Florida State", "North Carolina", "Louisville"];

import axios from 'axios';

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
});

function createTeam(teamCity, teamName, schedule, pic) {
    pubRoot.post(`/teams/`+teamCity, {
        data: {teamCity, teamName, schedule, pic}
    })
}

let getTeams = async function() {
    await axios({
        method: "get",
        url: 'http://api.sportradar.us/ncaafb-t1/teams/FBS/2018/REG/standings.json?api_key=sg8pf7bdjt5u8ueedttyytwx',
    }).then(data => {
        let teams = data.data.division.conferences[0].teams;
        for (let i = 0; i < teams.length; i++) {
            let market = teams[i].market;
            if (teams[i].market == "Miami (FL)") {
                market = "Miami";
            }
            if (teams[i].market == "North Carolina State") {
                market = "NC State";
            }
            createTeam(market, teams[i].name, [], 0);
        }
    });
}
getTeams();

let getSchedule = async function() {
    await axios({
    method: "get",
        url: 'https://api.collegefootballdata.com/games?year=2019&seasonType=regular&conference=ACC',
    }).then(data => {
        for (let i = 0; i < data.data.length; i++) {
            let game = data.data[i];
            for (let j = 0; j < fullTeams.length; j++) {
                if (game.home_team == fullTeams[j]) {
                    pubRoot.post('/teams/' + fullTeams[j] + "/schedule/" + game.week.toString(), {
                        "data": {
                            home: "true",
                            opponent: game.away_team,
                            thisScore: game.home_points,
                            oppScore: game.away_points,
                        },
                    })
                } else if (game.away_team == fullTeams[j]) {
                    pubRoot.post('/teams/' + fullTeams[j] + "/schedule/" + game.week.toString(), {
                        "data": {
                            home: "false",
                            opponent: game.home_team,
                            thisScore: game.away_points,
                            oppScore: game.home_points,
                        },
                    })
                }
            }
        }
    });
}
getSchedule();
