// GLOBAL VARIABLES ===============================================================================
var characterSelected = false;
var enemySelected = false;
var currentEnemy = "";
var nameOfCurrentEnemyforHTML = "";

var attackCount = 1;
var killCount = 0;

var userHp;
var userMaxHp;
var userAttackPower;
var enemyHp;
var enemyAttackPower;

var potion = 0;

// OBJECTS ========================================================================================
var slayer = {
    hp: 100,
    attack: 10,
};

var dwarf = {
    hp: 125,
    attack: 4,
};

var elf = {
    hp: 80,
    attack: 12,
};

var priestess = {
    hp: 65,
    attack: 16,
};

var goodGoblin = {
    hp: 85,
    attack: 11,
};

// ENEMIES
var goblin_1 = {
    hp: 20,
    attack: 2,
};

var goblin_2 = {
    hp: 50,
    attack: 3,
};

var goblin_3 = {
    hp: 100,
    attack: 5,
};

var bad_goblin = {
    hp: 125,
    attack: 4,
};

var goblin_boss = {
    hp: 200,
    attack: 10,
};

// FUNCTIONS ======================================================================================
function attack() {
    if (characterSelected && enemySelected) {
        $(".sword-placeholder").visible();
        incrementAttack();
        userHp = userHp - enemyAttackPower;
        enemyHp = enemyHp -userAttackPower;
        userDeadOrAlive();
        enemyKO();
        // Update html hp numbers
        $(".user-hp").html(userHp);
        $("."+String(currentEnemy+"-hp")).html(enemyHp);
    } else {
        $(".log-line-1").text("You do not have an enemy selected");
        $(".log-line-2").text("Select an enemy");
    }
}

// Restore hp if user has potion available
function usePotion() {
    // In here the user takes damage for using a pottion while there is an enemy selected
    if (enemySelected) {
        checkUserHp();
        userHp = userHp - enemyAttackPower;
        $(".user-hp").html(userHp);
        $(".log-line-2").text("You take " + enemyAttackPower + " damage from " + nameOfCurrentEnemyforHTML);
    // Use a potion without getting hurt
    } else {
        checkUserHp();
    }
}

function checkUserHp() {
     // If there are potion(s) available then...
    if (potion > 0) {
        let expectedHp = userHp + 50;
        if (expectedHp >= userMaxHp) {
            userHp = userMaxHp;
            potion --;
            $(".potionButton").html("Use potion " + "("+potion+")");
            $(".user-hp").html(userHp);

            $(".log-line-1").text("You used a potion to get max health");
            $(".log-line-2").text("");
        } else {
            userHp += 50;
            potion --;
            $(".potionButton").html("Use potion " + "("+potion+")");
            $(".user-hp").html(userHp);

            $(".log-line-1").text("You used a potion, +50 health points");
            $(".log-line-2").text("");
        }
    } else {
        $(".log-line-1").text("No potions to use!");
        $(".log-line-2").text("");
    }
}

// Is not used currently
function runAway() {
    if (enemySelected == true) {
        enemySelected = false;

        $(".log-line-1").text("You fled from the enemy");
        $(".log-line-2").text("");
    } else {
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
        disableButtons();
        $(".restartButton").visible();

        $(".log-line-1").text("You have been defeated");
        $(".log-line-2").text("Try again? Restart button below");
    } else {
        $(".log-line-1").text("You take " + enemyAttackPower + " damage from " + nameOfCurrentEnemyforHTML);
        $(".log-line-2").text("The enemy takes " + userAttackPower + " damage from you");
    }
}

function enemyKO() {
    if (enemyHp <= 0  ) {
        $("#"+currentEnemy).hide();
        $(".sword-placeholder").invisible();
        $(".right-header").invisible();
        killCount ++;
        enemySelected = false;

        $(".log-line-1").text(nameOfCurrentEnemyforHTML + " has been defeated");
        $(".log-line-2").text("");
            if (killCount == 3) {
                potion++;
                $(".shown-second").visible();
                $(".potionButton").html("Use potion " + "("+potion+")");

                $(".log-line-1").text("You find a potion");
                $(".log-line-2").text("");
            } else if (killCount == 4) {
                potion++;
                $(".enemy-list").html("Goblin Boss Appears");
                $(".shown-last").visible();
                $(".enemy-list").visible();
                $(".potionButton").html("Use potion " + "("+potion+")");

                $(".log-line-1").text("You find a potion");
                $(".log-line-2").text("");
            } else if (killCount == 5){
                // Victory!
                disableButtons();
                $(".restartButton").visible();

                $(".log-line-1").text("You've completed the game, thanks for playing!!");
                $(".log-line-2").text("There's a hidden link of the trailer in the first pop up");
            } else {
                // Do nothing
            }
    } else {
        // Do nothing
    }
}

// I for updating the html log to display enemy character
function checkEnemyName() {
    if (currentEnemy == "goblin_1") {
        nameOfCurrentEnemyforHTML = "Little Goblin";
    } else if (currentEnemy == "goblin_2"){
        nameOfCurrentEnemyforHTML = "Goblin"
    } else if (currentEnemy == "goblin_3"){
        nameOfCurrentEnemyforHTML = "Crazy Goblin"
    } else if (currentEnemy == "goblin_4"){
        nameOfCurrentEnemyforHTML = "Goblin Chief"
    } else if (currentEnemy == "goblin_boss"){
        nameOfCurrentEnemyforHTML = "Goblin Boss"
    } else {
        // We should not end up here but I put it in
    }
}

function disableButtons() {
    $(".attackButton").prop("disabled",true);
    $(".potionButton").prop("disabled",true);
}

// JQUERY STUFF ===================================================================================
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

    let selection = this.id;
    if (selection == "slayer-container") {
        $("#dwarf-container").hide();
        $("#elf-container").hide();
        $("#priestess-container").hide();
        $("#goblin-container").hide();
        //$(".bad-goblin").append($("#goblin-container")); // Not working as it should
        userHp = slayer.hp;
        userMaxHp = slayer.hp;
        userAttackPower = slayer.attack;
    } else if (selection == "dwarf-container") {
        $("#slayer-container").hide();
        $("#elf-container").hide();
        $("#priestess-container").hide();
        $("#goblin-container").hide();
        userHp = dwarf.hp;
        userMaxHp = dwarf.hp;
        userAttackPower = dwarf.attack;
    } else if (selection == "elf-container") {
        $("#slayer-container").hide();
        $("#dwarf-container").hide();
        $("#priestess-container").hide();
        $("#goblin-container").hide();
        userHp = elf.hp;
        userMaxHp = elf.hp;
        userAttackPower = elf.attack;
    } else if (selection == "priestess-container") {
        $("#slayer-container").hide();
        $("#dwarf-container").hide();
        $("#elf-container").hide();
        $("#goblin-container").hide();
        userHp = priestess.hp;
        userMaxHp = priestess.hp;
        userAttackPower = priestess.attack;
    } else if (selection == "goblin-container") {
        $("#slayer-container").hide();
        $("#dwarf-container").hide();
        $("#priestess-container").hide();
        $("#elf-container").hide();
        userHp = goodGoblin.hp;
        userMaxHp = goodGoblin.hp;
        userAttackPower = goodGoblin.attack;
    }

    characterSelected = true;
    $(".enemy-list").visible();
    $(".shown-first").visible();

    $(".log-line-1").text("Choose an enemy to attack");
})

// When user selects an enemy to attack
$(".evil-goblin").on("click", function() {
    $(".right-header").visible();
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
            $(".enemy-list").invisible();
        } else if (selection == "goblin_boss"){
            currentEnemy = selection;
            enemyHp = goblin_boss.hp;
            enemyAttackPower = goblin_boss.attack;
            $(".enemy-list").invisible();
        } else {
            // Should not be able to get here
        }
        
        checkEnemyName(); // For displaying normal enemy name strings
        //var $cloneGoblin = $("#goblin_1").clone();
        //$(".container-to-clone").append($cloneGoblin);
        $(".container-to-clone").append($("#"+this.id)); // But removes the current position copy
        enemySelected = true; // So user does not fight mutiple enemies
        $(".actions").visible();
        $(".attackButton").visible();
        $(".potionButton").visible();
        //$(".runAwayButton").visible();
        $(".log-line-1").text("Enemy target is " + nameOfCurrentEnemyforHTML);
        $(".log-line-2").text("");
    } else {
        $(".log-line-1").text("You are already attacking an enemy");
        $(".log-line-2").text("You can either attack or or use a potion if you have any");
    }

})

});