//get user and league here
let user = "";
let league = "";
let token = "Bearer " + getCookie(user);
axios({
    method: "get",
    url: "http://localhost:3000/private/leagues/" + league + "users/",
    headers: {
        Authorization: token
    }
}).then(data => {
    let teams = data.data.result;
    let schedule = makeSchedule();
    
});

export const makeSchedule = function() {
    let sched = [];
    let w1 = [[1,2],[3,4],[5,6],[7,8]];
    let w2 = [[1,3],[2,4],[5,7],[6,8]];
    let w3 = [[1,4],[2,3],[6,7],[5,8]];
    let w4 = [[1,5],[2,7],[3,6],[4,8]];
    let w5 = [[1,6],[2,5],[4,7],[3,8]];
    let w6 = [[1,7],[3,5],[4,6],[2,8]];
    let w7 = [[1,8],[2,6],[3,7],[4,5]];
    sched.push(w1, w2, w3, w4, w5, w6, w7, w1, w2, w3, w4, w5);
//     axios({
//         method: "post",
//         url: "http://localhost:3000/public/schedule",
//         data: {
//             data: {
//                 sched
//             }
//         }
//     });
    return sched;
}
makeSchedule();
