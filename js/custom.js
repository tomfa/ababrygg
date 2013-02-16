// Initiate
$(document).ready(function() {
    $(".page").hide();
    $(".page").first().show();
    $(".navigate-menu.prev").addClass("disabled");
    populateMenu();
});

$(window).resize(function() {
});

$(".navigate-menu").click(function() {
    if ($(this).hasClass("disabled"))
        return;
    console.log("navigate-menu.click()");
    if ($(this).hasClass("next"))
        nextPage();
    else
        prevPage();
});

$(".utstyr").find(".well").hover(function(){
    console.log("utstyr->well.hover()");
    $(this).addClass("shadow");
    $(this).css( 'cursor', 'pointer' );
},function(){
    $(this).removeClass("shadow");
});

$(".utstyr").find(".well").click(function() {
    if (!($(this).attr("target")))
        return;
    console.log("utstyr->well.click()");
    window.open($(this).attr("target"));
});


$(".calc").change(function() {
    try {
        if ($(".FG").val() < 1 || $(".EG").val() < 1){
            return;
        }
        var val = 1.25*0.105*($(".EG").val()-$(".FG").val());
        $(".RS").val(val);
    }
    catch (err) {
        $(".RS").val("FU");
    }
});

$(".navigate-menu").hover(function(){
    if ($(this).hasClass("disabled"))
        return;
    console.log("navigate-menu.hover()");
    $(this).addClass("shadow");
},function(){
    $(this).removeClass("shadow");
});

function populateMenu () {
    console.log("Populating menu");
    $(".page").each(function() {
        $(".nav").append('<button type="button" class="btn btn-primary btn-sm btn-block btn-warning" onclick=setActivePage("' + $(this).attr("title") + '")>' + $(this).attr("title") + '</button>');
   });
    $("button:first").addClass("active");
}

function setProperHeights () {
    var newHeight = $(window).height() - $(".navigate-menu").height();
    console.log("setProperHeights(): Setting inner-container size to " + newHeight);
    $(".inner-container").height(newHeight);
}

function prevPage(){
    console.log("prevPage()");
    if ($(".page:visible").prev(".page").length) {
        setActivePage($(".page:visible").prev().attr("title"));
    }
}

function setActiveMenu(title){
    console.log("setActiveMenu(" + title + ")");
    $(".nav").children(".active").removeClass("active");
    $("button:contains('" + title + "')").addClass("active");
}

function setActivePage(title){
    console.log("setActivePage("+title+")");
    $(".page-header").find("small").text(title);
    setActiveMenu(title);
    var active = $(".page:visible");
    var newPage = $(".page[title='"+ title +"']");
    active.hide();
    newPage.fadeIn(150);
    if (!($(".page:visible").next(".page").length)) {
        $(".navigate-menu.next").addClass("disabled");
        $(".navigate-menu.prev").removeClass("disabled");
    }
    else if (!($(".page:visible").prev(".page").length)) {
        $(".navigate-menu.prev").addClass("disabled");
        $(".navigate-menu.next").removeClass("disabled");
    }
    else {
        $(".navigate-menu.next").removeClass("disabled");
        $(".navigate-menu.prev").removeClass("disabled");
    }
    
    // setProperHeights();
}

function nextPage() {
    console.log("nextPage()");
    if ($(".page:visible").next(".page").length) {
        setActivePage($(".page:visible").next().attr("title"));
    }
}
