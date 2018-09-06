$(document).ready(() => {
    
//    $('.carousel-item').height( $(window).height() - $('.banner-container').height());

    addFixedTop()

    $(window).scroll(() => {
        addFixedTop()
    })   
})

const addFixedTop = () => {
    if($( document).scrollTop() > $('.banner-div').height() ) {
        $('nav').addClass("fixed-top");
    } else {
        $('nav').removeClass("fixed-top");
    }
}
