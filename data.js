
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
addByes();


let getStats = async function() {
    for (let i = 1; i < 13; i++) {
        await axios({
            method: "get",
            url: "https://api.collegefootballdata.com/games/players?year=2019&week=" + i + "&seasonType=regular&conference=ACC",
        }).then(data => {
            for (let j = 0; j < data.data.length; j++) {
                let game = data.data[j];
                if(game.teams[0].conference == "ACC") {
                    let teamStat = game.teams[0].categories;
                    let receiving = 0;
                    let rushing = 0;
                    let passing = 0;

                    let rtd = 0;
                    let ryd = 0;
                    let rec = 0;

                    let runtd = 0;
                    let runyd = 0;
                    
                    let ptd = 0;
                    let pyd = 0;

                    for (let k = 0; k < teamStat.length; k++) {
                        if (teamStat[k].name == "receiving") {
                            let receiving = teamStat[k];
                            for (let t = 0; t < receiving.types.length; t++) {
                                if (receiving.types[t].name == "TD") {
                                    rtd = receiving.types[t].athletes;
                                } else if (receiving.types[t].name == "YDS") {
                                    ryd = receiving.types[t].athletes;
                                } else if (receiving.types[t].name == "REC") {
                                    rec = receiving.types[t].athletes;
                                }
                            }
                        } else if (teamStat[k].name == "rushing") {
                            let rushing = teamStat[k];
                            for (let t = 0; t < rushing.types.length; t++) {
                                if (rushing.types[t].name == "TD") {
                                    runtd = rushing.types[t].athletes;
                                } else if (rushing.types[t].name == "YDS") {
                                    runyd = rushing.types[t].athletes;
                                }
                            }
                        } else if (teamStat[k].name == "passing") {
                            let passing = teamStat[k];
                            for (let t = 0; t < passing.types.length; t++) {
                                if (passing.types[t].name == "TD") {
                                    ptd = passing.types[t].athletes;
                                } else if (passing.types[t].name == "YDS") {
                                    pyd = passing.types[t].athletes;
                                }
                            }
                        } 
                    }

                    let tempStats = {};
                    updateStat(rtd, "rtd", tempStats);
                    updateStat(ryd, "ryd", tempStats);
                    updateStat(rec, "rec", tempStats);
                    updateStat(runtd, "runtd", tempStats);
                    updateStat(runyd, "runyd", tempStats);
                    updateStat(ptd, "ptd", tempStats);
                    updateStat(pyd, "pyd", tempStats);
                    for (let key in tempStats) {
                        pubRoot.post("/players/" + key + "/statsPerWeek/" + i, {
                            data: tempStats[key],
                        });
                    }                 
                };
                if(game.teams[1].conference == "ACC") {
                    let teamStat = game.teams[1].categories;
                    let receiving = 0;
                    let rushing = 0;
                    let passing = 0;

                    let rtd = 0;
                    let ryd = 0;
                    let rec = 0;

                    let runtd = 0;
                    let runyd = 0;
                    
                    let ptd = 0;
                    let pyd = 0;
                    for (let k = 0; k < teamStat.length; k++) {
                        if (teamStat[k].name == "receiving") {
                            let receiving = teamStat[k];
                            for (let t = 0; t < receiving.types.length; t++) {
                                if (receiving.types[t].name == "TD") {
                                    rtd = receiving.types[t].athletes;
                                } else if (receiving.types[t].name == "YDS") {
                                    ryd = receiving.types[t].athletes;
                                } else if (receiving.types[t].name == "REC") {
                                    rec = receiving.types[t].athletes;
                                }
                            }
                        } else if (teamStat[k].name == "rushing") {
                            let rushing = teamStat[k];
                            for (let t = 0; t < rushing.types.length; t++) {
                                if (rushing.types[t].name == "TD") {
                                    runtd = rushing.types[t].athletes;
                                } else if (rushing.types[t].name == "YDS") {
                                    runyd = rushing.types[t].athletes;
                                }
                            }
                        } else if (teamStat[k].name == "passing") {
                            let passing = teamStat[k];
                            for (let t = 0; t < passing.types.length; t++) {
                                if (passing.types[t].name == "TD") {
                                    ptd = passing.types[t].athletes;
                                } else if (passing.types[t].name == "YDS") {
                                    pyd = passing.types[t].athletes;
                                }
                            }
                        }
                    }
                    
                    let tempStats = {};
                    updateStat(ptd, "ptd", tempStats);
                    updateStat(pyd, "pyd", tempStats);
                    updateStat(rtd, "rtd", tempStats);
                    updateStat(ryd, "ryd", tempStats);
                    updateStat(rec, "rec", tempStats);
                    updateStat(runtd, "runtd", tempStats);
                    updateStat(runyd, "runyd", tempStats);
                   
                    for (let key in tempStats) {
                        pubRoot.post("/players/" + key + "/statsPerWeek/" + i, {
                            data: tempStats[key],
                        });
                    }   
                }
            }
        });
    }
}
getStats();

export const getPlayers = async function() {
    let teamURL = ["clemson", "syracuse", "nc%20state", 
    "duke", "virginia", "boston%20college", 
    "wake%20forest", "georgia%20tech", "miami", 
    "pittsburgh", "virginia%20tech", "florida%20state",
    "north%20carolina", "louisville"];

    let allTeams = ["Clemson", "Syracuse", "North Carolina State", 
    "Duke", "Virginia", "Boston College", "Wake Forest", 
    "Georgia Tech", "Miami", "Pittsburgh", "Virginia Tech", 
    "Florida State", "North Carolina", "Louisville"];

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
                        data: {"first": first, "last": last, "position" : position, "jersey": jersey, "team": allTeams[a], "statsPerWeek": stats}
                    });
                   
                };
            };
        });
    };    
};

export const createStatObject = function() {
    let statsPerWeek = {};
    let stat = {
        passyd: 0,
        passtd: 0,
        runyd: 0,
        runtd: 0,
        recyd: 0,
        recytd: 0,
        rec: 0
    }
    for (let i = 1; i < 15; i++) {
        statsPerWeek[i] = stat;
    }
    return statsPerWeek;
};

getPlayers();

let getStats = async function() {
    for (let i = 1; i < 13; i++) {
        await axios({
            method: "get",
            url: "https://api.collegefootballdata.com/games/players?year=2019&week=" + i + "&seasonType=regular&conference=ACC",
        }).then(data => {
            for (let j = 0; j < data.data.length; j++) {
                let game = data.data[j];
                if(game.teams[0].conference == "ACC") {
                    let teamStat = game.teams[0].categories;
                    let receiving = 0;
                    let rushing = 0;
                    let passing = 0;

                    let rtd = 0;
                    let ryd = 0;
                    let rec = 0;

                    let runtd = 0;
                    let runyd = 0;
                    
                    let ptd = 0;
                    let pyd = 0;

                    for (let k = 0; k < teamStat.length; k++) {
                        if (teamStat[k].name == "receiving") {
                            let receiving = teamStat[k];
                            rtd = receiving.types[1].athletes;
                            ryd = receiving.types[3].athletes;
                            rec = receiving.types[4].athletes;
                        } else if (teamStat[k].name == "rushing") {
                            let rushing = teamStat[k];
                            runtd = rushing.types[1].athletes;
                            runyd = rushing.types[3].athletes;
                        } else if (teamStat[k].name == "passing") {
                            let passing = teamStat[k];
                            ptd = passing.types[2].athletes;
                            pyd = passing.types[4].athletes;
                        } 
                    }

                    let tempStats = {};
                    updateStat(rtd, "rtd", tempStats);
                    updateStat(ryd, "ryd", tempStats);
                    updateStat(rec, "rec", tempStats);
                    updateStat(runtd, "runtd", tempStats);
                    updateStat(runyd, "runyd", tempStats);
                    updateStat(ptd, "ptd", tempStats);
                    updateStat(pyd, "pyd", tempStats);
                    for (let key in tempStats) {
                        pubRoot.post("/players/" + key + "/statsPerWeek/" + i, {
                            data: tempStats[key],
                        });
                    }                 
                };
                if(game.teams[1].conference == "ACC") {
                    let teamStat = game.teams[1].categories;
                    let receiving = 0;
                    let rushing = 0;
                    let passing = 0;

                    let rtd = 0;
                    let ryd = 0;
                    let rec = 0;

                    let runtd = 0;
                    let runyd = 0;
                    
                    let ptd = 0;
                    let pyd = 0;
                    for (let k = 0; k < teamStat.length; k++) {
                        if (teamStat[k].name == "receiving") {
                            let receiving = teamStat[k];
                            rtd = receiving.types[1].athletes;
                            ryd = receiving.types[3].athletes;
                            rec = receiving.types[4].athletes;
                        } else if (teamStat[k].name == "rushing") {
                            let rushing = teamStat[k];
                            runtd = rushing.types[1].athletes;
                            runyd = rushing.types[3].athletes;
                        } else if (teamStat[k].name == "passing") {
                            let passing = teamStat[k];
                            ptd = passing.types[2].athletes;
                            pyd = passing.types[4].athletes;
                        } 
                    }
                    
                    let tempStats = {};
                    updateStat(rtd, "rtd", tempStats);
                    updateStat(ryd, "ryd", tempStats);
                    updateStat(rec, "rec", tempStats);
                    updateStat(runtd, "runtd", tempStats);
                    updateStat(runyd, "runyd", tempStats);
                    updateStat(ptd, "ptd", tempStats);
                    updateStat(pyd, "pyd", tempStats);
                    for (let key in tempStats) {
                        pubRoot.post("/players/" + key + "/statsPerWeek/" + i, {
                            data: tempStats[key],
                        });
                    }   
                }
            }
        });
    }
}
 getStats();
const updateStat = function(runtd, type, tempStats) {
    for (let z = 0; z < runtd.length; z++) {
        if (runtd[z].id > 0) {
            if(tempStats[runtd[z].id] == undefined) {
                tempStats[runtd[z].id] = {
                    pyd: 0,
                    ptd: 0,
                    runyd: 0,
                    runtd: 0,
                    ryd: 0,
                    rtd: 0,
                    rec: 0,
                }
            }
            tempStats[runtd[z].id][type] = parseInt(runtd[z].stat);
        }
    }
}
