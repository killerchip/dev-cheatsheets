var menuBtn = document.querySelector('.menu-btn');
var pageContent = document.querySelector('.page-content');
var menu = document.querySelector('.menu');

// Clicking on Menu Button assigns "open" class to menu
menuBtn.addEventListener('click', function(e) {
  menu.classList.toggle('open');
  e.stopPropagation();
});

// Clicking on page content removes the "open" class from menu
pageContent.addEventListener('click', function(e) {
  menu.classList.remove('open');
  e.stopPropagation();
});
