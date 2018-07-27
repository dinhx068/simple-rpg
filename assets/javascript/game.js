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

$(".image-container").on("click", function() {
    console.log("Did this work?");
    $(".evil-goblin").visible();
    $(".enemy-list").visible();
    $("#log-container").visible();
    $(".log-line-1").text("Choose an enemy to attack");
})

});