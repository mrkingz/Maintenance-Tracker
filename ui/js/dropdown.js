$(document).ready(function () {
  $('#activities-dropdown').hover(function (e) {
    e.preventDefault();
    displayDropdown(e, 'activities-menu')
  })
  // }, function(e) {
  //   $("#"+$(e.target).siblings('.dropdown-content').prop('id')).hide();
  // });

  
  $('.dropdown-content a').on('click', function (e) {
    loadPage();
  })

  $('#filters-dropdown').hover(function(e) {
    e.preventDefault()
    displayDropdown(e, 'filters-menu')
  })
});

function displayDropdown(e, id) {
  const dropdown = $(e.target);
  contentId = dropdown.siblings('.dropdown-content').prop('id')
  const content = $('#'+id);
  let top = dropdown.position().top;
  
  let height = parseInt(dropdown.innerHeight());
  let width = parseInt(dropdown.innerWidth());
  let contWidth = parseInt(content.innerWidth());
  content.css({
    'top': (top + height) + 'px',
    'left': (dropdown.position().left - contWidth + width) + 'px',
  });
  content.toggle();
}
