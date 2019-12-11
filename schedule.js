export const makeSchedule = function() {
    let sched = [];
    let w1 = {
        1: {team1: 1, team2: 2},
        2: {team1: 3, team2: 4},
        3: {team1: 5, team2: 6},
        4: {team1: 7, team2: 8},
    };
    let w2 = {
        1: {team1: 1, team2: 3},
        2: {team1: 2, team2: 4},
        3: {team1: 5, team2: 7},
        4: {team1: 6, team2: 8},
    };
    let w3 = {
        1: {team1: 1, team2: 4},
        2: {team1: 2, team2: 3},
        3: {team1: 6, team2: 7},
        4: {team1: 5, team2: 8},
    };
    let w4 = {
        1: {team1: 1, team2: 5},
        2: {team1: 2, team2: 7},
        3: {team1: 3, team2: 6},
        4: {team1: 4, team2: 8},
    };
    let w5 = {
        1: {team1: 1, team2: 6},
        2: {team1: 2, team2: 5},
        3: {team1: 4, team2: 7},
        4: {team1: 3, team2: 8},
    };
    let w6 = {
        1: {team1: 1, team2: 7},
        2: {team1: 3, team2: 5},
        3: {team1: 4, team2: 6},
        4: {team1: 2, team2: 8},
    };
    let w7 = {
        1: {team1: 1, team2: 8},
        2: {team1: 2, team2: 6},
        3: {team1: 3, team2: 7},
        4: {team1: 4, team2: 5},
    };
    sched.push(w1, w2, w3, w4, w5, w6, w7, w1, w2, w3, w4, w5);
    axios({
        method: "post",
        url: "http://localhost:3000/public/schedule",
        data: {
            data: {
                sched
            }
        }
    });
}
makeSchedule();
