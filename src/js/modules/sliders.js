export const sliders = ({ 
    slidesSelector, 
    vertical = false, 
    prevSelector, 
    nextSelector 
}) => {
    const slides = document.querySelectorAll(slidesSelector);
    let slideIndex = 1,
        pause,
        currentSlide = slides[slideIndex - 1];
       
    const hideSlides = () => {
        slides.forEach(slide => {
            slide.classList.add('animated');
            slide.style.display = 'none';
            slide.style.position = 'absolute';
        });
    };

    const showSlide = (n) => {
        if (n > slides.length) { slideIndex = 1; }
        if (n < 1 ) { slideIndex = slides.length; }
        slides[slideIndex - 1].style.display = 'block';
        setTimeout(() => {
            slides.forEach((slide, n) => {
                if (n != slideIndex - 1) { slide.style.display = 'none'; }
            });
        }, 1000);
    };
    hideSlides();
    showSlide(slideIndex);

    const plusSlide = (n, addAnimationClassIn, addAnimationClassOut) => { 
        showSlide(slideIndex += n); 
        slides.forEach(slide => slide.classList.remove('slideInLeft', 'slideOutRight', 'slideInRight', 'slideOutLeft', 'slideInDown', 'slideOutDown'));
        slides[slideIndex - 1].classList.add(addAnimationClassIn, );

        slides.forEach((slide, n) => {
            if (n != slideIndex - 1) { slide.classList.add(addAnimationClassOut); }
        });
    }; 

    try {
        const prevBtn = document.querySelector(prevSelector),
              nextBtn = document.querySelector(nextSelector);

        prevBtn.addEventListener('click', () => { 
            plusSlide(-1, 'slideInRight', 'slideOutLeft'); 
        });
        nextBtn.addEventListener('click', () => { 
            plusSlide(1, 'slideInLeft', 'slideOutRight'); 
        });
    } catch {}

    const activateAnimation = () => {
        pause = vertical 
        ? setInterval(() => { plusSlide(1, 'slideInDown', 'slideOutDown');  }, 5000)
        : setInterval(() => { plusSlide(1, 'slideInLeft', 'slideOutRight'); }, 5000);
    };

    activateAnimation(); 

    slides[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(pause);
    });
    slides[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    });
};