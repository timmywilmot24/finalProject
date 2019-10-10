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
export function NCAATeam(weeks, logo, name) {
    this.weeks = weeks; //Array of schedule
    this.logo = logo; //Img of team logo
    this.name = name; //String
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
export function OffensiveStats() {
    this.yardsAirTotal = 0; //Integer
    this.yardsGroundTotal = 0; //Integer
    this.yardsCatchTotal = 0; //Integer
    this.catchesTotal = 0; //Integer
    this.intThrownTotal = 0; //Integer
    this.fumblesLostTotal = 0; //Integer
    this.touchdownsAirTotal = 0; //Integer
    this.touchdownsGroundTotal = 0; //Integer
    this.yardsAirCurrent = 0; //Integer
    this.yardsGroundCurrent = 0; //Integer
    this.yardsCatchCurrent = 0; //Integer
    this.catchesCurrent = 0; //Integer
    this.intThrownCurrent = 0; //Integer
    this.fumblesLostCurrent = 0; //Integer
    this.touchdownsAirCurrent = 0; //Integer
    this.tochdownsGroundCurrent - 0; //Integer
}

//This is a constructor that creates the DefensiveStats object (Sam Howell's Stats)
export function DefensiveStats() {
    this.interceptionsTotal = 0; //Integer
    this.fumblesRecTotal = 0; //Integer
    this.touchdownsTotal = 0; //Integer
    this.pointsAgTotal = 0; //Integer
    this.sacksTotal = 0; //Integer
    this.safetiesTotal = 0; //Integer
    this.interceptionsCurrent = 0; //Integer
    this.fumblesRecCurrent = 0; //Integer
    this.touchdownsCurrent = 0; //Integer
    this.pointsAgCurrent = 0; //Integer
    this.sacksCurrent = 0; //Integer
    this.safetiesCurrent = 0; //Integer
}
