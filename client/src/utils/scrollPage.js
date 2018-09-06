const scrollPage = (page) => {
    let bound = $(".header-container").height();

    if( $('nav').hasClass("fixed-top") ) {
        $("html").animate({
            scrollTop: $("#"+page).offset().top - bound
        }, 900);
    }
};
export default scrollPage