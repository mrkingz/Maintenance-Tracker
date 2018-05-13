$(document).ready(function () {
  $('#activities').hover(function (e) {
    displayDropdown(e)
  });


  $('.dropdown-content a').on('click', function (e) {
    loadPage();
  })

  window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {

      var dropdowns = $(".dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if ($(openDropdown).css('display') !== 'none') {
          dropdowns.toggle();
        }
      }
    }
  } 
});

function displayDropdown(e) {
  const dropdown = $(e.target);
  const content = $('.dropdown-content');

  let top = dropdown.position().top;
  let height = parseInt(dropdown.css('height').replace('px', ''));
  let width = parseInt(dropdown.css('width').replace('px', ''));
  let contWidth = parseInt(content.css('width').replace('px', ''));
  content.css({
    'top': (top + height) + 'px',
    'left': (dropdown.position().left - contWidth + width) + 'px',
  });
  $('.dropdown-content').toggle();
}
