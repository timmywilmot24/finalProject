
import axios from 'axios';

let fullTeams = ["Clemson", "Syracuse", "NC State", 
"Duke", "Virginia", "Boston College", "Wake Forest", "Georgia Tech", 
"Miami", "Pittsburgh", "Virginia Tech", "Florida State", "North Carolina", "Louisville"];

export const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
});

export const getPlayers = async function() {
    let teamURL = ["clemson", "syracuse", "nc%20state", 
    "duke", "virginia", "boston%20college", 
    "wake%20forest", "georgia%20tech", "miami", 
    "pittsburgh", "virginia%20tech", "florida%20state",
    "north%20carolina", "louisville"];

    for (let a = 0; a < fullTeams.length; a++) {
        await axios({
            method: "get",
            url: "https://api.collegefootballdata.com/roster?team=" + teamURL[a]
        }).then(data => {
            let d = data.data;
            let l = Object.keys(d).length;
            for (let players = 0; players < l; players++) {
                let position = d[players].position;
                if (position == "QB" || position == "RB" || position == "WR" || position == "TE") {
                    let first = d[players].first_name;
                    let last  = d[players].last_name;
                    let jersey = d[players].jersey;
                    let id = d[players].id;
                    let stats = createStatObject();
                    pubRoot.post(`/players/`+ id, {
                        data: {"first": first, "last": last, "position" : position, "jersey": jersey, "team": fullTeams[a], "statsPerWeek": stats}
                    });
                   
                };
            };
        });
    };    
};

export const createStatObject = function() {
    let statsPerWeek = {};
    let stat = {
        pyd: 0,
        ptd: 0,
        runyd: 0,
        runtd: 0,
        ryd: 0,
        rytd: 0,
        rec: 0
    };
    for (let i = 1; i < 15; i++) {
        statsPerWeek[i] = stat;
    };
    return statsPerWeek;
};

export const createTeam = function(teamCity, teamName, schedule, pic) {
    pubRoot.post(`/teams/`+teamCity, {
        data: {teamCity, teamName, schedule, pic}
    });
};

export const getTeams = async function() {
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
};

export const getSchedule = async function() {
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
                    });
                };
            };
        };
    });
};

export const getStats = async function() {
    for (let a = 1; a < 13; a++) {
        await axios({
            method: "get",
            url: "https://api.collegefootballdata.com/games/players?year=2019&week=" + a + "&seasonType=regular&conference=ACC",
        }).then(data => {
            for (let b = 0; b < data.data.length; b++) {
                let game = data.data[b];
                for (let c = 0; c < game.teams.length; c++) {
                    if(game.teams[c].conference == "ACC") {
                        let teamStat = game.teams[c].categories;
                    
                        let rtd = 0;
                        let ryd = 0;
                        let rec = 0;
    
                        let runtd = 0;
                        let runyd = 0;
                        
                        let ptd = 0;
                        let pyd = 0;
    
                        for (let d = 0; d < teamStat.length; d++) {
                            if (teamStat[d].name == "receiving") {
                                let receiving = teamStat[d];
                                for (let e = 0; e < receiving.types.length; e++) {
                                    if (receiving.types[e].name == "TD") {
                                        rtd = receiving.types[e].athletes;
                                    } else if (receiving.types[e].name == "YDS") {
                                        ryd = receiving.types[e].athletes;
                                    } else if (receiving.types[e].name == "REC") {
                                        rec = receiving.types[e].athletes;
                                    };
                                };
                            } else if (teamStat[d].name == "rushing") {
                                let rushing = teamStat[d];
                                for (let e = 0; e < rushing.types.length; e++) {
                                    if (rushing.types[e].name == "TD") {
                                        runtd = rushing.types[e].athletes;
                                    } else if (rushing.types[e].name == "YDS") {
                                        runyd = rushing.types[e].athletes;
                                    };
                                };
                            } else if (teamStat[d].name == "passing") {
                                let passing = teamStat[d];
                                for (let e = 0; e < passing.types.length; e++) {
                                    if (passing.types[e].name == "TD") {
                                        ptd = passing.types[e].athletes;
                                    } else if (passing.types[e].name == "YDS") {
                                        pyd = passing.types[e].athletes;
                                    };
                                };
                            }; 
                        };
    
                        let tempStats = {};
                        updateStat(rtd, "rtd", tempStats);
                        updateStat(ryd, "ryd", tempStats);
                        updateStat(rec, "rec", tempStats);
                        updateStat(runtd, "runtd", tempStats);
                        updateStat(runyd, "runyd", tempStats);
                        updateStat(ptd, "ptd", tempStats);
                        updateStat(pyd, "pyd", tempStats);
                        for (let key in tempStats) {
                            pubRoot.post("/players/" + key + "/statsPerWeek/" + a, {
                                data: tempStats[key],
                            });
                        };                 
                    };
                };
            };
        });
    };    
};

export const updateStat = function(s, type, tempStats) {
    for (let z = 0; z < s.length; z++) {
        if (s[z].id > 0) {
            if(tempStats[s[z].id] == undefined) {
                tempStats[s[z].id] = {
                    pyd: 0,
                    ptd: 0,
                    runyd: 0,
                    runtd: 0,
                    ryd: 0,
                    rtd: 0,
                    rec: 0,
                };
            };
            tempStats[s[z].id][type] = parseInt(s[z].stat);
        };
    };
};

export const getAllTeams = async function() {
    let teams =  await pubRoot.get('/teams')
    return teams.data;
};

let addByes = async function() {
   for (let i = 0; i < fullTeams.length; i++) {
        let schedule = await pubRoot.get("/teams/" + fullTeams[i] + "/schedule/");
        let sched = schedule.data.result;
        let schedCount = 0;
        for (let j = 1; j < 15; j++) {
            if (sched[schedCount] != j.toString()) {
                pubRoot.post("/teams/" + fullTeams[i] + "/schedule/" + j, {
                    data: "BYE",
                })
                schedCount--;
            }
            schedCount++;
        }
   }
}
//pubRoot.delete(`/players`);
//pubRoot.delete(`/teams`);
//getPlayers();
//getStats();
//getTeams();
//getSchedule();
//addByes();







