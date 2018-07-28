// Global variables
var enemySelected = false;

function testSelection() {
    var test = $(".slayer-container").on("click");
    console.log(test);
}

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

// When th user clicks on one of the starting characters
$(".slayer-container").on("click", function() {

    testSelection();
    
    $("#characters").text("Character Chosen");

    $(".elf-container").hide();
    $(".priestess-container").hide();
    $(".goblin-container").hide();

    $(".action-container").visible();
    $(".evil-goblin").visible();
    $(".enemy-list").visible();
    $(".log-line-1").text("Choose an enemy to attack");
    // console.log($(".slayer-hp").text() - 5); Gets hp
    $(".slayer-hp").text($(".slayer-hp").text() - 5); //Gets hp and displays on screen
})

$(".elf-container").one("click", function() {
    $("#characters").text("Character Chosen");

    $(".slayer-container").hide();
    $(".priestess-container").hide();
    $(".goblin-container").hide();

    $(".action-container").visible();
    $(".evil-goblin").visible();
    $(".enemy-list").visible();
    $(".log-line-1").text("Choose an enemy to attack");
})

$(".priestess-container").one("click", function() {
    $("#characters").text("Character Chosen");

    $(".slayer-container").hide();
    $(".elf-container").hide();
    $(".goblin-container").hide();

    $(".action-container").visible();
    $(".evil-goblin").visible();
    $(".enemy-list").visible();
    $(".log-line-1").text("Choose an enemy to attack");
})

$(".goblin-container").one("click", function() {
    $("#characters").text("Character Chosen");

    $(".slayer-container").hide();
    $(".priestess-container").hide();
    $(".elf-container").hide();

    $(".action-container").visible();
    $(".evil-goblin").visible();
    $(".enemy-list").visible();
    $(".log-line-1").text("Choose an enemy to attack");
}) // End of selection... there has to be a better way of doing this

// When we select the first enemy to attack
$(".goblin_1").on("click", function() {
    // If there is no enemy selected then we move the goblin into position
    if (!enemySelected) {
        var $cloneGoblin = $(".goblin_1").clone();
        $(".container-to-clone").html($cloneGoblin);
        enemySelected = true; // So we don't fight mutiple enemies
        //$(".goblin_1").hide();
        //$(".goblin_1").invisible();
    } else {
        $(".log-line-1").text("You're already attacking an enemy");
        $(".log-line-2").text("You can either attack or run away");
    }
})

});