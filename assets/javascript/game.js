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
    // $(".image-container").fadeOut(500);
    $(".evil-goblin").visible();
    $(".enemies-list").visible();
})

});