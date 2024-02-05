/*!
* Start Bootstrap - Bare v5.0.9 (https://startbootstrap.com/template/bare)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

function setActive(activePage) {
    // Remove 'active' class from all nav items
    document.querySelectorAll('.navbar-nav .nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Add 'active' class to the clicked nav item
    const clickedNavItem = document.querySelector(`.navbar-nav .nav-link[href="/${activePage}"]`);
    clickedNavItem.parentElement.classList.add('active');
}