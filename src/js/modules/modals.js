export const modals = () => {

    let btnPressed = false;
    const modalWindows = document.querySelectorAll('[data-modal]');
    const gift = document.querySelector('.fixed-gift');

    const calcScrollBarWidth = () => {
        const testDiv = document.createElement('div');
        testDiv.style.width = '100px';
        testDiv.style.overflowY = 'scroll';
        document.body.appendChild(testDiv);

        const scrollWidth = testDiv.offsetWidth - testDiv.clientWidth;
        testDiv.remove();
        return scrollWidth;
    };

    const scrollWidth = calcScrollBarWidth();

    const marginInsteadOfScroll = (item, add = true) => { 
        if (add) { item.style.marginRight = `${scrollWidth}px`; }
        else { item.style.marginRight = ''; }
    };

    const openModal = (openTrigger, display) => {
        openTrigger.style.display = display;
        document.body.classList.add('modal-open');
        marginInsteadOfScroll(document.body);
        try { marginInsteadOfScroll(gift); } catch {}
    };

    const closeModal = () => {
        modalWindows.forEach(window => window.style.display ="none");
        document.body.classList.remove('modal-open');
        marginInsteadOfScroll(document.body, false);
        try { marginInsteadOfScroll(gift, false); } catch {}
    };

    const bindModal = ({ 
        triggersSelector, 
        modalSelector, 
        closeSelector, 
        destroy = false 
    }) => {
        const triggers = document.querySelectorAll(triggersSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector);
                
        triggers.forEach(trigger => {
            trigger.addEventListener('click', e => {
                if (e.target) { 
                    e.preventDefault(); 
                }

                if (destroy) { trigger.remove(); }

                btnPressed = true;
                modalWindows.forEach(window => { 
                    window.style.display ="none";
                    window.classList.add('animated', 'fadeIn');
                });
                openModal(modal, 'block');
            });
        });

        close.addEventListener('click', () => closeModal());

        modal.addEventListener('click', (e) => {
            if (e.target === modal) { 
                closeModal(); 
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') { 
                closeModal(); 
            }
        });
    };

    const showModalByTime = (selector, time) => {
        setTimeout(() => {
            let modalIsOpened;
            modalWindows.forEach(window => {
                if (getComputedStyle(window).display !== 'none') {
                    modalIsOpened = true;
                }
            });
            if (!modalIsOpened) { 
                openModal(document.querySelector(selector), 'block'); 
            } 
        }, time);
    };

    const openModalByScroll = (selector) => {
        window.addEventListener('scroll', () => {
            if (!btnPressed && (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
                document.querySelector(selector).click();
            }
        });
    };

    bindModal({
        triggersSelector: '.button-design', 
        modalSelector: '.popup-design', 
        closeSelector: '.popup-design .popup-close'
    });
    bindModal({
        triggersSelector: '.button-consultation', 
        modalSelector: '.popup-consultation', 
        closeSelector: '.popup-consultation .popup-close'
    });
    bindModal({
        triggersSelector: '.fixed-gift', 
        modalSelector: '.popup-gift', 
        closeSelector: '.popup-gift .popup-close',
        destroy: true
    });
    showModalByTime('.popup-consultation', 60000);
    openModalByScroll('.fixed-gift');
};