export const burger = (menuSelector, burgerSelector) => {
    const menuElem = document.querySelector(menuSelector),
          burgerElem = document.querySelector(burgerSelector);

    const toggleMenu = (show = true) => {
        menuElem.style.display = show ? 'block' : 'none';
        show ? burgerElem.classList.add('burger-button-active')
        : burgerElem.classList.remove('burger-button-active');
    };
    
    burgerElem.addEventListener('click', () => {
        if (window.screen.availWidth < 993) {
            burgerElem.classList.contains('burger-button-active')
                ? toggleMenu(false)
                : toggleMenu();

            Array.from(menuElem.querySelectorAll('.header-menu-sub li')).forEach(link => {
                link.addEventListener('click', () => toggleMenu(false));
            });
        }
    });

    window.addEventListener('resize', () => {
        if (window.screen.availWidth > 992) {
            menuElem.style.display = 'flex';
            burgerElem.classList.remove('burger-button-active');
        }
        if (window.screen.availWidth < 992) {
            menuElem.style.display = 'none';
        }
    });
};