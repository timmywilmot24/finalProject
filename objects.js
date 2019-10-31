//This is a constructor that creates individuals NCAA players (Sam Howell)
export function NCAAPlayer(first, last, picture, stats, onTeam, ncaaTeam, leaguePlayer, position) {
    this.first = first; //String
    this.last = last;
    this.picture = picture; //Img of player
    this.stats = stats; //Stats Object
    this.onTeam = onTeam; //boolean
    this.ncaaTeam = ncaaTeam; //ncaaTeam Object
    this.leaguePlayer = leaguePlayer; //leaguePlayer Object
    this.position = position; //String
}

//This is a constructor that creates the NCAA teams (UNC)
export function NCAATeam(weeks, logo) {
    this.weeks = weeks; //Array of schedule
    this.logo = logo; //Img of team logo
}

//This is a constructor that creates individual league players (Timmy Wilmot)
export function LeaguePlayer(teamName, first, picture, stats, schedule, roster) {
    this.teamName = teamName; //Team Name
    this.first = first; //String
    this.picture = picture; //Img of player
    this.stats = stats; //Stats Object (wins, losses, points, etc.)
    this.schedule = schedule; //Schedule Object
    this.roster = roster; //Roster Object
}

//This is a constructor that creates Stat Objects for the LeaguePlayer (Timmy's Stats)
export function StatsLeaguePlayer(wins, losses, pointsFor, pointsAgainst) {
    this.wins = wins; //Integer
    this.losses = losses; //Integer
    this.pointsFor = pointsFor; //Double
    this.pointsAgainst = pointsAgainst; //Double
}

//This is a constructor that creates a Roster Object for LeaguePlayers (Timmy's Roster)
export function RosterLeaguePlayer(starters, bench) {
    this.starters = starters; //Starter Object (contains all starters)
    this.bench = bench; //Bench Object (contains all bench)
}

//This is a constructor that creates a Starter Object for the Roster (Timmy's Starters)
export function RosterStarters(qb, rb, wr1, wr2, te, k, def) {
    this.qb = qb; //Player Object
    this.rb = rb; //Player Object
    this.wr1 = wr1; //Player Object
    this.wr2 = wr2; //Player Object
    this.te = te; //Player Object
    this.def = def; //Player Object
}

//This is a constructor that creates a Bench Object for the Roster (Timmy's Bench)
export function BenchStarters(bench1, bench2, bench3) {
    this.bench1 = bench1; //Player Object
    this.bench2 = bench2; //Player Object
    this.bench3 = bench3; //Player Object
}

//This is a constructor that creates a League Object (Timmy's Fantasy League)
export function League(schedule, player1, player2, player3, player4, player5, player6, player7, player8, player9, player10, transactions) {
    this.schedule = schedule; //League Schedule Object
    //Array of all the players in the league
    this.players = [player1, player2, player3, 
        player4, player5, player6, player7, player8,
        player9, player10];
    this.transactions = transactions; //Stack Object
}

//This is a constructor that creates the OffensiveStats object (Sam Howell's Stats)
export function OffensiveStats(yardsAir, yardsGround, yardsCatch, catches, intThrown, fumblesLost, touchdowns) {
    this.yardsAir = yardsAir; //Integer
    this.yardsGround = yardsGround; //Integer
    this.yardsCatch = yardsCatch; //Integer
    this.catches = catches; //Integer
    this.intThrown = intThrown; //Integer
    this.fumblesLost = fumblesLost; //Integer
    this.touchdowns = touchdowns; //Integer
}

//This is a constructor that creates the DefensiveStats object (Sam Howell's Stats)
export function DefensiveStats(interceptions, fumblesRec, touchdowns, pointsAg, sacks, safeties) {
    this.interceptions = interceptions; //Integer
    this.fumblesRec = fumblesRec; //Integer
    this.touchdowns = touchdowns; //Integer
    this.pointsAg = pointsAg; //Integer
    this.sacks = sacks; //Integer
    this.safeties = safeties; //Integer
}