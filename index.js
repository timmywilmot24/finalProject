import {makeDiv} from "./pages.js";
import {makeButton} from "./pages.js";
import {handleScheduleButton} from "./buttonHandle.js";

export const makeHead = function() {
    let head = makeDiv("indexHead").attr({
        class: "box has-text-white has-background-grey-darker has-text-centered"
    });
    let title = makeDiv("indexTitle", "title has-text-white").append("ACC FANTASY FOOTBALL");

    let buttons = makeDiv("indexButtons", "buttons has-text-centered");
    let loginButton = makeButton("login", "button", "login").css({
        "width": "50%",
        "margin": "1% 25%"
    }).append("Login");
    let signupButton = makeButton("signup", "button", "signup").css({
        "width": "50%",
        "margin": "1% 25%"
    }).append("Sign Up");
    buttons.append(loginButton, signupButton);

    head.append(title, buttons);

    return head;
};

export const makeCard = function(team) {
    let card = makeDiv("card").attr({
        class: "teamCard column is-one-half has-text-white"
    }).css({
        "border-style": "solid",
        "border-color": "white",
        "border-radius": "10px",
        "width": "80%",
        "margin": "2% 10%",
    });
    let title = makeDiv().append(team.teamCity);
    let subtitle = makeDiv().append(team.teamName);
    
    let sButton = makeButton(team.teamCity, "button", team.teamCity).css({
        "width": "50%",
        "margin": "1% 25%"
    }).append("Schedule").on("click",handleScheduleButton);
    
    card.append(title,subtitle,sButton);
    return card;
};

export const makeTeamsCard = function() {
    let cards = makeDiv("cards");
    
    $.ajax({
        method: 'GET',
        url: "http://localhost:3000/public/teams",
        
    }).then(data => {
        let teams = data.result;
        for (let key in teams) {
            let team = teams[key];
            let card = makeCard(team);
            cards.append(card);
        };
    });
    
    return cards;
};

export const makeFoot = function() {
    let foot = makeDiv("indexFoot").attr({
        class: "box has-background-grey-darker"
    });
    let contactBox = makeDiv("contact").attr({
        class: "has-text-white"
    });
    let title = makeDiv().append("Contact Developer");
    let david = makeDiv().append("David Cubrilla");
    let timmy = makeDiv().append("Timmy Wilmot");
    contactBox.append(title, david, timmy);
    foot.append(contactBox);
    return foot;
};

export const renderEverything = function() {
    const $root = $('#root');
    let head = makeHead();
    let foot = makeFoot();
    $root.append(head, makeTeamsCard(), foot);
};

$(function() {
    renderEverything();
});

