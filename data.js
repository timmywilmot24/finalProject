import * as obj from './objects.js';

//Overall ACC Player List
let acc = [];

//UNC Team and Players
let uncSchedule = ["USC", "Miami", "Wake Forest", "App State", "Clemson", "Georgia Tech", "BYE", "Virginia Tech", "Duke", "Virginia", "BYE", "Pitt", "Mercer", "NC State"];
let uncPic = "pictures/UNCFootballPic.jpg";
let uncTeam = new obj.NCAATeam(uncSchedule, uncPic, "UNC");
acc.push(new obj.NCAAPlayer("Sam", "Howell", null, new obj.OffensiveStats(), true, uncTeam, null, "QB"));
acc.push(new obj.NCAAPlayer("Javonte", "Williams", null, new obj.OffensiveStats(), true, uncTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("Michael", "Carter", null, new obj.OffensiveStats(), true, uncTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("Dazz", "Newsome", null, new obj.OffensiveStats(), true, uncTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Dyami", "Brown", null, new obj.OffensiveStats(), true, uncTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Beau", "Corrales", null, new obj.OffensiveStats(), true, uncTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Carl", "Tucker", null, new obj.OffensiveStats(), true, uncTeam, null, "TE"));
acc.push(new obj.NCAAPlayer("UNC", "Defense", null, new obj.DefensiveStats(), true, uncTeam, null, "DEF"));

//NC State Team and Players
let ncStateSchedule = ["ECU", "Western Carolina", "West Virginia", "Ball State", "Florida State", "BYE", "Syracuse", "Boston College", "BYE", "Wake Forest", "Clemson", "Louisville", "Georgia Tech", "UNC"];
let ncStatePic = "pictures/NCStateFootballPic.jpg";
let ncStateTeam = new obj.NCAATeam(ncStateSchedule, ncStatePic, "NC State");
acc.push(new obj.NCAAPlayer("Matthew", "McKay", null, new obj.OffensiveStats(), true, ncStateTeam, null, "QB"));
acc.push(new obj.NCAAPlayer("Zonovan", "Knight", null, new obj.OffensiveStats(), true, ncStateTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("Jordan", "Houston", null, new obj.OffensiveStats(), true, ncStateTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("Emeka", "Emezie", null, new obj.OffensiveStats(), true, ncStateTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Thayer", "Thomas", null, new obj.OffensiveStats(), true, ncStateTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Tabari", "Hines", null, new obj.OffensiveStats(), true, ncStateTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Cary", "Angeline", null, new obj.OffensiveStats(), true, ncStateTeam, null, "TE"));
acc.push(new obj.NCAAPlayer("NC State", "Defense", null, new obj.DefensiveStats(), true, ncStateTeam, null, "DEF"));

//Duke Team and Players
let dukeSchedule = ["Alabama", "NC A&T", "Middle Tennessee", "BYE", "Virginia Tech", "Pitt", "Georgia Tech", "Virginia", "UNC", "BYE", "Notre Dame", "Syracuse", "Wake Forest", "Miami"];
let dukePic = "pictures/DukeFootball.jpg";
let dukeTeam = new obj.NCAATeam(dukeSchedule, dukePic, "Duke");
acc.push(new obj.NCAAPlayer("Quentin", "Harris", null, new obj.OffensiveStats(), true, dukeTeam, null, "QB"));
acc.push(new obj.NCAAPlayer("Deon", "Jackson", null, new obj.OffensiveStats(), true, dukeTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("Aaron", "Young", null, new obj.OffensiveStats(), true, dukeTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Jalon", "Calhoun", null, new obj.OffensiveStats(), true, dukeTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Noah", "Gray", null, new obj.OffensiveStats(), true, dukeTeam, null, "TE"));
acc.push(new obj.NCAAPlayer("Duke", "Defense", null, new obj.DefensiveStats(), true, dukeTeam, null, "DEF"));

//Clemson Team and Players
let clemsonSchedule = ["Georgia Tech", "Texas A&M", "Syracuse", "UNC Charlotte", "UNC", "BYE", "Florida State", "Louisville", "Boston College", "Wofford", "NC State", "Wake Forest", "BYE", "USC"];
let clemsonPic = "pictures/ClemsonFootball.jpg";
let clemsonTeam = new obj.NCAATeam(clemsonSchedule, clemsonPic, "Clemson");
acc.push(new obj.NCAAPlayer("Trevor", "Lawrence", null, new obj.OffensiveStats(), true, clemsonTeam, null, "QB"));
acc.push(new obj.NCAAPlayer("Travis", "Etienne", null, new obj.OffensiveStats(), true, clemsonTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("Lyn-J", "Dixon", null, new obj.OffensiveStats(), true, clemsonTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("Tee", "Higgins", null, new obj.OffensiveStats(), true, clemsonTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Justyn", "Ross", null, new obj.OffensiveStats(), true, clemsonTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Amari", "Rodgers", null, new obj.OffensiveStats(), true, clemsonTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Clemson", "Defense", null, new obj.DefensiveStats(), true, clemsonTeam, null, "DEF"));

//Wake Forest Team and Players
let wakeSchedule = ["Utah State", "Rice", "UNC", "Elon", "Boston College", "BYE", "Louisville", "Florida State", "BYE", "NC State", "Virginia Tech", "Clemson", "Duke", "Syracuse"];
let wakePic = "pictures/WakeFootball.jpg";
let wakeTeam = new obj.NCAATeam(wakeSchedule, wakePic, "Wake Forest");
acc.push(new obj.NCAAPlayer("Jamie", "Newman", null, new obj.OffensiveStats(), true, wakeTeam, null, "QB"));
acc.push(new obj.NCAAPlayer("Kenneth", "Walker", null, new obj.OffensiveStats(), true, wakeTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("Cade", "Carney", null, new obj.OffensiveStats(), true, wakeTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("Sage", "Surratt", null, new obj.OffensiveStats(), true, wakeTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Scotty", "Washington", null, new obj.OffensiveStats(), true, wakeTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Wake Forest", "Defense", null, new obj.DefensiveStats(), true, wakeTeam, null, "DEF"));

//Florida State Team and Players
let fsuSchedule = ["Boise State", "ULM", "Virginia", "Louisville", "NC State", "BYE", "Clemson", "Wake Forest", "Syracuse", "Miami", "Boston College", "Alabama State", "BYE", "Florida"];
let fsuPic = "pictures/FSUFootball.jpg";
let fsuTeam = new obj.NCAATeam(fsuSchedule, fsuPic, "Florida State");
acc.push(new obj.NCAAPlayer("James", "Blackman", null, new obj.OffensiveStats(), true, fsuTeam, null, "QB"));
acc.push(new obj.NCAAPlayer("Alex", "Hornibrook", null, new obj.OffensiveStats(), true, fsuTeam, null, "QB"));
acc.push(new obj.NCAAPlayer("Cam", "Akers", null, new obj.OffensiveStats(), true, fsuTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("Tamorrion", "Terry", null, new obj.OffensiveStats(), true, fsuTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Keyshawn", "Helton", null, new obj.OffensiveStats(), true, fsuTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Tre'", "McKitty", null, new obj.OffensiveStats(), true, fsuTeam, null, "TE"));
acc.push(new obj.NCAAPlayer("Florida State", "Defense", null, new obj.DefensiveStats(), true, fsuTeam, null, "DEF"));

//Louisville Team and Players
let louisvilleSchedule = ["Notre Dame", "Eastern Kentucky", " WKU", "Florida State", "BYE", "Boston College", "Wake Forest", "Clemson", "Virginia", "BYE", "Miami", "NC State", "Syracuse", "Kentucky"];
let louisvillePic = "pictures/LouisvilleFootball.jpg";
let louisvilleTeam = new obj.NCAATeam(louisvilleSchedule, louisvillePic, "Louisville");
acc.push(new obj.NCAAPlayer("Malik", "Cunningham", null, new obj.OffensiveStats(), true, louisvilleTeam, null, "QB"));
acc.push(new obj.NCAAPlayer("Jawon", "Pass", null, new obj.OffensiveStats(), true, louisvilleTeam, null, "QB"));
acc.push(new obj.NCAAPlayer("Javion", "Hawkins", null, new obj.OffensiveStats(), true, louisvilleTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("Hassan", "Hall", null, new obj.OffensiveStats(), true, louisvilleTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("Tutu", "Atwell", null, new obj.OffensiveStats(), true, louisvilleTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Dez", "Fitzpatrick", null, new obj.OffensiveStats(), true, louisvilleTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Seth", "Dawkins", null, new obj.OffensiveStats(), true, louisvilleTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Marshon", "Ford", null, new obj.OffensiveStats(), true, louisvilleTeam, null, "TE"));
acc.push(new obj.NCAAPlayer("Louisville", "Defense", null, new obj.DefensiveStats(), true, louisvilleTeam, null, "DEF"));

//Boston College Team and Players
let bcSchedule = ["Virginia Tech", "Richmond", "Kansas", "Rutgers", "Wake Forest", "Louisville", "BYE", "NC State", "Clemson", "Syracuse", "Florida State", "BYE", "Notre Dame", "Pitt"];
let bcPic = "pictures/BCFootball.jpg";
let bcTeam = new obj.NCAATeam(bcSchedule, bcPic, "Boston College");
acc.push(new obj.NCAAPlayer("Anthony", "Brown", null, new obj.OffensiveStats(), true, bcTeam, null, "QB"));
acc.push(new obj.NCAAPlayer("AJ", "Dillon", null, new obj.OffensiveStats(), true, bcTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("David", "Bailey", null, new obj.OffensiveStats(), true, bcTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("Zay", "Flowers", null, new obj.OffensiveStats(), true, bcTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Kobay", "White", null, new obj.OffensiveStats(), true, bcTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Hunter", "Long", null, new obj.OffensiveStats(), true, bcTeam, null, "TE"));
acc.push(new obj.NCAAPlayer("Boston College", "Defense", null, new obj.DefensiveStats(), true, bcTeam, null, "DEF"));

//Syracuse Team and Players
let syracuseSchedule = ["Liberty", "Maryland", "Clemson", "Western Michigan", "Holy Cross", "BYE", "NC State", "Pitt", "Florida State", "Boston College", "BYE", "Duke", "Louisville", "Wake Forest"];
let syracusePic = "pictures/SyracuseFootball.jpg";
let syracuseTeam = new obj.NCAATeam(syracuseSchedule, syracusePic, "Syracuse");
acc.push(new obj.NCAAPlayer("Tommy", "Devito", null, new obj.OffensiveStats(), true, syracuseTeam, null, "QB"));
acc.push(new obj.NCAAPlayer("Moe", "Neal", null, new obj.OffensiveStats(), true, syracuseTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("Abdul", "Adams", null, new obj.OffensiveStats(), true, syracuseTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("Trishton", "Jackson", null, new obj.OffensiveStats(), true, syracuseTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Taj", "Harris", null, new obj.OffensiveStats(), true, syracuseTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Syracuse", "Defense", null, new obj.DefensiveStats(), true, syracuseTeam, null, "DEF"));

//Virginia Team and Players
let virginiaSchedule = ["Pitt", "William & Mary", "Florida State", "Old Dominion", "Notre Dame", "BYE", "Miami", "Duke", "Louisville", "UNC", "Georgia Tech", "BYE", "Liberty", "Virginia Tech"];
let virginiaPic = "pictures/VirginiaFootball.jpg";
let virginiaTeam = new obj.NCAATeam(virginiaSchedule, virginiaPic, "Virginia");
acc.push(new obj.NCAAPlayer("Bryce", "Perkins", null, new obj.OffensiveStats(), true, virginiaTeam, null, "QB"));
acc.push(new obj.NCAAPlayer("Wayne", "Taulapapa", null, new obj.OffensiveStats(), true, virginiaTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("Hasise", "Dubois", null, new obj.OffensiveStats(), true, virginiaTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Joe", "Reed", null, new obj.OffensiveStats(), true, virginiaTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Terrell", "Jana", null, new obj.OffensiveStats(), true, virginiaTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Virginia", "Defense", null, new obj.DefensiveStats(), true, virginiaTeam, null, "DEF"));

//Pitt Team and Players
let pittSchedule = ["Virginia", "Ohio", "Penn State", "UCF", "Delaware", "Duke", "BYE", "Syracuse", "Miami", "Georgia Tech", "BYE", "UNC", "Virginia Tech", "Boston College"];
let pittPic = "pictures/PittFootball.jpg";
let pittTeam = new obj.NCAATeam(pittSchedule, pittPic, "Pitt");
acc.push(new obj.NCAAPlayer("Kenny", "Pickett", null, new obj.OffensiveStats(), true, pittTeam, null, "QB"));
acc.push(new obj.NCAAPlayer("Todd", "Sibley", null, new obj.OffensiveStats(), true, pittTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("AJ", "Davis", null, new obj.OffensiveStats(), true, pittTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("Taysir", "Mack", null, new obj.OffensiveStats(), true, pittTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Maurice", "Ffrench", null, new obj.OffensiveStats(), true, pittTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Pitt", "Defense", null, new obj.DefensiveStats(), true, pittTeam, null, "DEF"));

//Virginia Tech Team and Players
let vtSchedule = ["Boston College", "Old Dominion", "Fulman", "BYE", "Duke", "Miami", "Rhode Island", "UNC", "BYE", "Notre Dame", "Wake Forest", "Georgia Tech", "Pitt", "Virginia"];
let vtPic = "pictures/VTFootball.jpg";
let vtTeam = new obj.NCAATeam(vtSchedule, vtPic, "Virginia Tech");
acc.push(new obj.NCAAPlayer("Ryan", "Willis", null, new obj.OffensiveStats(), true, vtTeam, null, "QB"));
acc.push(new obj.NCAAPlayer("Deshawn", "McClease", null, new obj.OffensiveStats(), true, vtTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("Keshawn", "King", null, new obj.OffensiveStats(), true, vtTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("Tayvion", "Robinson", null, new obj.OffensiveStats(), true, vtTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Virginia Tech", "Defense", null, new obj.DefensiveStats(), true, vtTeam, null, "DEF"));

//Miami Team and Players
let miamiSchedule = ["Florida", "UNC", "Bethune-Cookman", "Central Michigan", "BYE", "Virginia Tech", "Virginia", "Georgia Tech", "Pitt", "FLorida State", "Louisville", "BYE", "FIU", "Duke"];
let miamiPic = "pictures/MiamiFootball.jpg";
let miamiTeam = new obj.NCAATeam(miamiSchedule, miamiPic, "Miami");
acc.push(new obj.NCAAPlayer("Jarren", "Williams", null, new obj.OffensiveStats(), true, miamiTeam, null, "QB"));
acc.push(new obj.NCAAPlayer("N'Kosi", "Perry", null, new obj.OffensiveStats(), true, miamiTeam, null, "QB"));
acc.push(new obj.NCAAPlayer("DeeJay", "Dallas", null, new obj.OffensiveStats(), true, miamiTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("Mike", "Harley", null, new obj.OffensiveStats(), true, miamiTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("KJ", "Osborn", null, new obj.OffensiveStats(), true, miamiTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Jeff", "Thomas", null, new obj.OffensiveStats(), true, miamiTeam, null, "WR"));
acc.push(new obj.NCAAPlayer("Brevin", "Jordan", null, new obj.OffensiveStats(), true, miamiTeam, null, "TE"));
acc.push(new obj.NCAAPlayer("Miami", "Defense", null, new obj.DefensiveStats(), true, miamiTeam, null, "DEF"));

//Georgia Tech Team and Players
let gtSchedule = ["Clemson", "USF", "Citadel", "BYE", "Temple", "UNC", "Duke", "Miami", "BYE", "Pitt", "Virginia", ,"Virginia Tech", "NC State", "Georgia"];
let gtPic = "pictures/GTFootball.jpg";
let gtTeam = new obj.NCAATeam(gtSchedule, gtPic, "Georgia Tech");
acc.push(new obj.NCAAPlayer("James", "Graham", null, new obj.OffensiveStats(), true, gtTeam, null, "QB"));
acc.push(new obj.NCAAPlayer("Jordan", "Mason", null, new obj.OffensiveStats(), true, gtTeam, null, "RB"));
acc.push(new obj.NCAAPlayer("Georgia Tech", "Defense", null, new obj.DefensiveStats(), true, gtTeam, null, "DEF"));

//Compile roster for team
function getRoster(teamName) {
    let a = [];
    for (let i = 0; i < acc.length; i++) {
        if (acc[i].ncaaTeam.name == teamName) {
            a.push(acc[i]);
        }
    }
    return a;
}

//Get all of a position from a roster
function filterPos(position, array) {
    for (let i=0; i < array.length; i++) {
        if (array[i].position == position) {
            console.log(array[i].first + " " + array[i].last);
        }
    }
}

//Get Opponent of Player in a given week
function getOpp(player, week) {
    console.log(player.ncaaTeam.weeks[week-1]);
}

//Find Player by full name
function findPlayer(name) {
    for (let i = 0; i < acc.length; i++) {
        if ((acc[i].first + " " + acc[i].last) == name) {
            return acc[i];
        }
    }
}

//Update Stats - inputs player full name, the string of stat to update, and how much to set it to
function updateStats(name, stat, number) {
    let player = findPlayer(name);
    player.stats[stat] = number;
}

//Add Stats - inputs player full name, the string of stat to update, and how much to add it to
function addStats(name, stat, number) {
    let player = findPlayer(name);
    player.stats[stat] += number;
}
