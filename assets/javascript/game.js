// GLOBAL VARIABLES
var characterSelected = false;
var enemySelected = false;
var currentEnemy;

var attackCount = 1;
var killCount = 0;

var userHp;
var userAttackPower;
var enemyHp;
var enemyAttackPower;

var potion = 0;

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
    attack: 1,
};

var goblin_2 = {
    hp: 50,
    attack: 2,
};

var goblin_3 = {
    hp: 100,
    attack: 3,
};

var bad_goblin = {
    hp: 125,
    attack: 3,
};

var goblin_boss = {
    hp: 300,
    attack: 5,
};

// FUNCTIONS
function attack() {
    $(".log-line-1").text("Testing attack button");
    if (characterSelected == true && enemySelected == true) {
        $(".sword-placeholder").visible();
        console.log("Testing attack ");
        incrementAttack();
        userHp = userHp - enemyAttackPower;
        enemyHp = enemyHp -userAttackPower;
        userDeadOrAlive();
        enemyKO();

        console.log(userHp);
        console.log(enemyHp);

        $(".log-line-1").text("You take " + enemyAttackPower + " damage");
        $(".log-line-2").text("The enemy takes " + userAttackPower + " damage");
    } else {
        console.log("else characterSelected, " + characterSelected);
        console.log("else enemySelected, " + enemySelected);
        $(".log-line-1").text("You do not have an enemy selected");
        $(".log-line-2").text("Select an enemy");
    }
}

// Testing purposes
function usePotion() {
    if (potion > 0) {
        userHp += 50;
        potion --;
        $(".log-line-1").text("You used a potion");
        $(".log-line-2").text("");
    } else {
        $(".log-line-1").text("No potions to use");
        $(".log-line-2").text("");
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

function incrementAttack() {
    // On every odd attack count increment attack by 1
    if (Math.abs(attackCount % 2) == 1) {
        attackCount++;
        userAttackPower++;
    } else {
        attackCount++;
    }
}

function userDeadOrAlive() {
    if (userHp <= 0  ) {
        console.log("DEAD, well should be");
    } else {
        console.log("User hp is above zero");
    }
}

function enemyKO() {
    if (enemyHp <= 0  ) {
        console.log(currentEnemy);
        $("#"+currentEnemy).hide();
        $(".sword-placeholder").invisible();
        $(".right-header").invisible();
        killCount ++;
        enemySelected = false;
            if (killCount == 2){
                $(".shown-second").visible();
            } else if (killCount == 4) {
                potion = 2;
                $(".shown-last").visible();
                $(".log-line-1").text("You find two potions");
                $(".log-line-2").text("");
            } else if (killCount == 5){
                console.log("Victory screen");
                $(".restartButton").visible();
                
            } else {
                console.log("Not enough kills");
                // Do nothing
            }
    } else {
        console.log("Enemy is above zero hp");
    }
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
            currentEnemy = selection;
            enemyHp = goblin_1.hp;
            enemyAttackPower = goblin_1.attack;
        } else if (selection == "goblin_2") {
            currentEnemy = selection;
            enemyHp = goblin_2.hp;
            enemyAttackPower = goblin_2.attack;
        } else if (selection == "goblin_3") {
            currentEnemy = selection;
            enemyHp = goblin_3.hp;
            enemyAttackPower = goblin_3.attack;
        } else if (selection == "bad_goblin") {
            currentEnemy = selection;
            enemyHp = bad_goblin.hp;
            enemyAttackPower = bad_goblin.attack;
        } else if (selection == "goblin_boss"){
            currentEnemy = selection;
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

        // enemyHp = $("."+this.id+"-hp").text(); // Gets the html number
        // Stuff below not working, this.ObjectProperty does not work
        /* console.log("this id test, " + this.id);
        enemyHp = (this.id).hp;
        console.log("this id.hp test, " + enemyHp);*/
    } else {
        $(".log-line-1").text("You're already attacking an enemy");
        $(".log-line-2").text("You can either attack or run away");
    }

})

});