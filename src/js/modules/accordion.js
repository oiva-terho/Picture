export const accordion = (triggersSelector) => {
    const btns = document.querySelectorAll(triggersSelector);
    const show = (element) => {
        element.classList.add('active-style');
        element.nextElementSibling.classList.add('active-content');
    };
    const hide = (element) => {
        element.classList.remove('active-style');
        element.nextElementSibling.classList.remove('active-content');
    };
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active-style')) {
                hide(btn);
            } else {
                btns.forEach(el => hide(el));
                show(btn); 
            }
        });
    });
};