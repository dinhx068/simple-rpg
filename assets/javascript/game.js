// GLOBAL VARIABLES
var characterSelected = false;
var enemySelected = false;
var killCount = 0;

// GOOD CHARACTERS
// Balancing needs to be done
var slayer = {
    hp: 100,
    attack: 10,
};

var dwarf = {
    hp: 125,
    attack: 8,
};

var elf = {
    hp: 80,
    attack: 12,
};

var priestess = {
    hp: 50,
    attack: 15,
};

var goodGoblin = {
    hp: 80,
    attack: 11,
};

// ENEMIES
var goblin_1 = {
    hp: 30,
    attack: 3,
};

var goblin_2 = {
    hp: 50,
    attack: 4,
};

var goblin_3 = {
    hp: 100,
    attack: 5,
};

var bad_goblin = {
    hp: 175,
    attack: 6,
};

var goblin_boss = {
    hp: 350,
    attack: 10,
};

// FUNCTIONS
function attack() {
    $(".log-line-1").text("Testing attack button");
    if (characterSelected == true && enemySelected == true) {
        // Do calculations
        // And Log onto screen
        console.log("Testing attack ");
        $(".log-line-1").text("You take x damage");
        $(".log-line-2").text("The enemy takes x damage");
    } else {
        console.log("else characterSelected, " + characterSelected);
        console.log("else enemySelected, " + enemySelected);
        $(".log-line-1").text("You do not have an enemy selected");
        $(".log-line-2").text("Select an enemy");
    }
}

function runAway() {
    if (enemySelected == true) {
        enemySelected = false;
        console.log("Testing runAway function, if half")
        $(".log-line-1").text("You fled from the enemy");
        $(".log-line-2").text("");
    } else {
        console.log("Testing runAway function, else half")
        $(".log-line-1").text("Nothing happens");
        $(".log-line-2").text("");
    }
}

// JQUERY STUFF
$(document).ready(function() {

jQuery.fn.visible = function() {
    return this.css('visibility', 'visible');
};

jQuery.fn.invisible = function() {
    return this.css('visibility', 'hidden');
};

jQuery.fn.visibilityToggle = function() {
    return this.css('visibility', function(i, visibility) {
        return (visibility == 'visible') ? 'hidden' : 'visible';
    });
};

// When th user selects on one of the starting characters
$(".selection").one("click", function () {
    $("#characters").text("Character Chosen");
    console.log("testing id on click, " + this.id);
    var selection = this.id;
    
    if (selection == "slayer-container") {
        $("#dwarf-container").hide();
        $("#elf-container").hide();
        $("#priestess-container").hide();
        $("#goblin-container").hide();
        //$(".bad-goblin").append($("#goblin-container")); // not working as it should
    } else if (selection == "dwarf-container") {
        $("#slayer-container").hide();
        $("#elf-container").hide();
        $("#priestess-container").hide();
        $("#goblin-container").hide();
    } else if (selection == "elf-container") {
        $("#slayer-container").hide();
        $("#dwarf-container").hide();
        $("#priestess-container").hide();
        $("#goblin-container").hide();
    } else if (selection == "priestess-container") {
        $("#slayer-container").hide();
        $("#dwarf-container").hide();
        $("#elf-container").hide();
        $("#goblin-container").hide();
    } else if (selection == "goblin-container") {
        $("#slayer-container").hide();
        $("#dwarf-container").hide();
        $("#priestess-container").hide();
        $("#elf-container").hide();
    }

    characterSelected = true;
    $(".sword-placeholder").visible();
    $(".action-container").visible();
    $(".evil-goblin").visible();
    $(".enemy-list").visible();
    $(".log-line-1").text("Choose an enemy to attack");
    // console.log($(".slayer-hp").text() - 5); Gets hp
    //$(".slayer-hp").text($(".slayer-hp").text() - 5); //Gets hp and displays on screen
})

// When we select the first enemy to attack
$(".evil-goblin").on("click", function() {
    // If there is no enemy selected then we move the goblin into position
    if (!enemySelected) {
        //var $cloneGoblin = $("#goblin_1").clone();
        //$(".container-to-clone").append($cloneGoblin);
        $(".container-to-clone").append($("#goblin_1")); // But removes the current position copy

        enemySelected = true; // So we don't fight mutiple enemies
        //$(".goblin_1").hide();
        //$(".goblin_1").invisible();
    } else {
        $(".log-line-1").text("You're already attacking an enemy");
        $(".log-line-2").text("You can either attack or run away");
    }

})

});