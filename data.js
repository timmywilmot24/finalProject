
let fullTeams = ["Clemson", "Syracuse", "North Carolina State", "Duke", "Virginia", "Boston College", "Wake Forest", "Georgia Tech", "Miami", "Pittsburgh", "Virginia Tech", "Florida State", "North Carolina", "Louisville"];
let teamAbb = ["CLE", "SYR", "NCST", "DUK", "UVA", "BC", "WF", "GT", "MFL", "PIT", "VT", "FSU", "NC", "LOU"];

import axios from 'axios';

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
});

pubRoot.delete(`/teams`);

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
            createTeam(market, teams[i].name, [], 0);
        }
    });
}
getTeams();

let getSchedule = function() {
    axios({
        method: "get",
        url: 'http://api.sportradar.us/ncaafb-t1/2018/REG/schedule.json?api_key=sg8pf7bdjt5u8ueedttyytwx',
    }).then(data => {
        let weeks = data.data.weeks;
        for (let i = 0; i < weeks.length; i++) {
            for (let j = 0; j < weeks[i].games.length; j++) {
                for (let k = 0; k < fullTeams.length; k++) {
                    if (weeks[i].games[j].home == teamAbb[k]) {
                        pubRoot.post(`/teams/` + fullTeams[k] + `/schedule/` + (i+1).toString(), {
                            "data": weeks[i].games[j].away,
                        })
                    } else if (weeks[i].games[j].away == teamAbb[k]) {
                        pubRoot.post(`/teams/` + fullTeams[k] + `/schedule/` + (i+1).toString(), {
                            "data": "@" + weeks[i].games[j].home,
                        })
                    }
                }
            }
        }
    })
}
setTimeout(function() {
    getSchedule();
}, 1000);
