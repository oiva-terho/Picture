export const modals = () => {

    let btnPressed = false;
    const modalWindows = document.querySelectorAll('[data-modal]');
    const gift = document.querySelector('.fixed-gift');

    const calcScrollBarWidth = () => {
        const tempDiv = document.createElement('div');
        tempDiv.style.width = '100px';
        tempDiv.style.overflowY = 'scroll';
        document.body.appendChild(tempDiv);

        const scrollWidth = tempDiv.offsetWidth - tempDiv.clientWidth;
        tempDiv.remove();
        return scrollWidth;
    };

    const scrollWidth = calcScrollBarWidth();

    const marginInsteadOfScroll = (item, add = true) => { 
        if (item) { item.style.marginRight = add ? `${scrollWidth}px` : ""; }
        else { return; }
    };

    const openModal = (openTrigger, display) => {
        openTrigger.style.display = display;
        document.body.classList.add('modal-open');
        marginInsteadOfScroll(document.body);
        marginInsteadOfScroll(gift);
    };

    const closeModal = () => {
        modalWindows.forEach(window => window.style.display ="none");
        document.body.classList.remove('modal-open');
        marginInsteadOfScroll(document.body, false);
        marginInsteadOfScroll(gift, false);
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
            const scrollHeight = Math.max(
                document.documentElement.scrollHeight, 
                document.body.scrollHeight);
            if (!btnPressed && 
                (window.scrollY + document.documentElement.clientHeight >= scrollHeight)) {
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