// GLOBAL VARIABLES
var characterSelected = false;
var enemySelected = false;

var killCount = 0;

var userHp;
var userAttackPower;
var enemyHp;
var enemyAttackPower;


// GOOD CHARACTERS
// Balancing needs to be done
var slayer = {
    hp: 100,
    attack: 10,
};

var dwarf = {
    hp: 150,
    attack: 6,
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
        $(".sword-placeholder").visible();
        // Do calculations
        // And Log onto screen
        console.log("Testing attack ");
        console.log(enemyHp);
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

// Testing purposes
function usePotion() {
    $(".log-line-1").text("This is for testing purposes");
    $(".log-line-2").text("");
}

// JQUERY STUFF
$(document).ready(function() {

window.onload = function () {
    document.getElementById('button').onclick = function () {
        document.getElementById('modal').style.display = "none"
    };
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

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
// Also sets global variables to a value for damage calculation
$(".selection").one("click", function () {
    $(".left-header").text("Character Chosen");

    console.log("testing id on click, " + this.id);
    let selection = this.id;
    
    if (selection == "slayer-container") {
        $("#dwarf-container").hide();
        $("#elf-container").hide();
        $("#priestess-container").hide();
        $("#goblin-container").hide();
        //$(".bad-goblin").append($("#goblin-container")); // Not working as it should
        userHp = slayer.hp;
        userAttackPower = slayer.attack;
    } else if (selection == "dwarf-container") {
        $("#slayer-container").hide();
        $("#elf-container").hide();
        $("#priestess-container").hide();
        $("#goblin-container").hide();
        userHp = dwarf.hp;
        userAttackPower = dwarf.attack;
    } else if (selection == "elf-container") {
        $("#slayer-container").hide();
        $("#dwarf-container").hide();
        $("#priestess-container").hide();
        $("#goblin-container").hide();
        userHp = elf.hp;
        userAttackPower = elf.attack;
    } else if (selection == "priestess-container") {
        $("#slayer-container").hide();
        $("#dwarf-container").hide();
        $("#elf-container").hide();
        $("#goblin-container").hide();
        userHp = priestess.hp;
        userAttackPower = priestess.attack;
    } else if (selection == "goblin-container") {
        $("#slayer-container").hide();
        $("#dwarf-container").hide();
        $("#priestess-container").hide();
        $("#elf-container").hide();
        userHp = goodGoblin.hp;
        userAttackPower = goodGoblin.attack;
    }

    characterSelected = true;
    $(".enemy-list").visible();
    $(".shown-first").visible();
    $(".log-line-1").text("Choose an enemy to attack");
    //$(".slayer-hp").text($(".slayer-hp").text()); // Gets hp and displays on screen
})

// When user selects an enemy to attack
$(".evil-goblin").on("click", function() {
    $(".right-header").visible();
    console.log("testing id on click goblin selection, " + this.id);
    let selection = this.id;
    // If there is no enemy selected then we move the goblin into position
    // Also setting the current enemy selected hp/attack power to global variables
    // which is used for damage calculation during interaction
    if (!enemySelected) {
        if (selection == "goblin_1") {
            enemyHp = goblin_1.hp;
            enemyAttackPower = goblin_1.attack;
        } else if (selection == "goblin_2") {
            enemyHp = goblin_2.hp;
            enemyAttackPower = goblin_2.attack;
        } else if (selection == "goblin_3") {
            enemyHp = goblin_3.hp;
            enemyAttackPower = goblin_3.attack;
        } else if (selection == "bad_goblin") {
            enemyHp = bad_goblin.hp;
            enemyAttackPower = bad_goblin.attack;
        } else if (selection == "goblin_boss"){
            enemyHp = goblin_boss.hp;
            enemyAttackPower = goblin_boss.attack;
        } else {
            console.log("Should not be able to get here");
        }
        
        //var $cloneGoblin = $("#goblin_1").clone();
        //$(".container-to-clone").append($cloneGoblin);
        $(".container-to-clone").append($("#"+this.id)); // But removes the current position copy
        enemySelected = true; // So user does not fight mutiple enemies
        $(".attackButton").visible();
        //$(".runAwayButton").visible();
        $(".usePotionButton").visible();

        //enemyHp = $("."+this.id+"-hp").text(); // Gets the html number
        console.log("this id test, " + this.id);
        enemyHp = (this.id).hp;
        console.log("this id.hp test, " + enemyHp);
    } else {
        $(".log-line-1").text("You're already attacking an enemy");
        $(".log-line-2").text("You can either attack or run away");
    }

})

});