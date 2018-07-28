// Global variables
var enemySelected = false;

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
$(".selection").one("click", function() {
    console.log("Did this work?");
    $("#characters").text("Character Chosen");
    $(".evil-goblin").visible();
    $(".enemy-list").visible();
    $("#log-container").visible();
    $(".log-line-1").text("Choose an enemy to attack");
    // console.log($(".slayer-hp").text() - 5); Gets hp
    $(".slayer-hp").text($(".slayer-hp").text() - 5);
})

// When we select the first enemy to attack
$(".goblin_1").on("click", function() {
    // If there is no enemy selected then we move the goblin into position
    if (!enemySelected) {
    var $cloneGoblin = $(".goblin_1").clone();
    $(".container-to-clone").html($cloneGoblin);
    enemySelected = true; // So we don't fight mutiple enemies
    } else {
        $(".log-line-1").text("You're already an enemy");
        $(".log-line-2").text("You can either attack or run away");
    }
})

});