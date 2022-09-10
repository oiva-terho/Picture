export const burger = (menuSelector, burgerSelector) => {
    const menuElem = document.querySelector(menuSelector),
          burgerElem = document.querySelector(burgerSelector);

    const toggleMenu = (show = true) => {
        menuElem.style.display = show ? 'block' : 'none';
    };
    
    burgerElem.addEventListener('click', () => {
       menuElem.style.display == "none" && window.screen.availWidth < 993
            ? toggleMenu()
            : toggleMenu(false);
    });

    window.addEventListener('resize', () => {
        if (window.screen.availWidth > 992) {
            toggleMenu(false);
        }
    });
};