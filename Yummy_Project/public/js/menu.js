// menuButton.js
document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.getElementById('menuButton-DaveHotChicken');
  if (menuButton) {
      menuButton.addEventListener('click', function () {
          // Redirect to the menu page for Dave's Hot Chicken
          window.location.href = '/daves';
      });
  }
});