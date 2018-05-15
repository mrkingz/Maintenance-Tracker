
$('#activities, .dropdown-content a').hover(function(e) {
  $('.dropdown-content').hide()
  displayDropdown($('#activities').siblings('.dropdown-content').prop('id'))
}, 
function(e) {
  $('#activities').siblings('.dropdown-content').toggle()
})

const displayDropdown = function (target) {
  $("#"+target).toggle();
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn') && !event.target.matches('.nav-menu, .filter, i, .dropdown-content select')) {

    let dropdowns = $(".dropdown-content");

    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = $(dropdowns[i]);
      if (openDropdown.css('display') !== 'none') {
        openDropdown.hide();
      }
    }
  }
}