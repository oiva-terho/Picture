export const sliders = ({ 
    slidesSelector, 
    vertical = false, 
    prevSelector, 
    nextSelector 
}) => {
    let slideIndex = 1,
        pause;
    const slides = document.querySelectorAll(slidesSelector);
    const showSlide = (n) => {
        if (n > slides.length) { slideIndex = 1; }
        if (n < 1 ) { slideIndex = slides.length; }

        slides.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none';
        });

        slides[slideIndex - 1].style.display = 'block';
    };

    showSlide(slideIndex);

    const plusSlide = (n, removeAnimationClass, addAnimationClass) => { 
        showSlide(slideIndex += n); 
        slides[slideIndex - 1].classList.remove(removeAnimationClass);
        slides[slideIndex - 1].classList.add(addAnimationClass);
}; 

    try {
        const prevBtn = document.querySelector(prevSelector),
              nextBtn = document.querySelector(nextSelector);

        prevBtn.addEventListener('click', () => { 
            plusSlide(-1, 'slideInLeft', 'slideInRight'); 
        });
        nextBtn.addEventListener('click', () => { 
            plusSlide(1, 'slideInRight', 'slideInLeft'); 
        });
    } catch {}

    const activateAnimation = () => {
        if (vertical) {
            pause = setInterval(() => { 
                plusSlide(1, null, 'slideInDown'); 
            }, 4000);
        } else {
            pause = setInterval(() => { 
                plusSlide(1, 'slideInRight', 'slideInLeft'); 
            }, 4000);
        }
    };

    activateAnimation(); 

    slides[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(pause);
    });
    slides[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    });
};