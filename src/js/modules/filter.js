export const filter = ({ 
    menuSelector, 
    imagesWrapperSelector, 
    noImagesSelector 
}) => {
    const menu = document.querySelector(menuSelector),
          wrapper = document.querySelector(imagesWrapperSelector),
          no = document.querySelector(noImagesSelector);

    const hide = (element) => {
        element.style.display = 'none';
        element.classList.remove('animated', 'fadeIn');
    };
    const show = (element) => {
        element.style.display = 'block';
        element.classList.add('animated', 'fadeIn');
    };
    const typeFilter = (type) => {
        Array.from(wrapper.children).forEach(img => hide(img));
        hide(no);
        const imagesToShow =  wrapper.querySelectorAll(`.${type}`);
        if (imagesToShow.length > 0) { imagesToShow.forEach(img => show(img));
        } else { show(no); }
    };
    menu.addEventListener('click', (e) => {
        if (e.target && e.target.tagName == "LI") {
            Array.from(menu.children).forEach(btn => btn.classList.remove('active'));
            const type = e.target.getAttribute('class');
            e.target.classList.add('active');
            typeFilter(type);
        }
    });
};