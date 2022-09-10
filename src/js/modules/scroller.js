export const scroller = (selector) => {
    const arrow = document.querySelector(selector);
    window.addEventListener('scroll', () => {
        document.documentElement.scrollTop > 1400
            ? arrow.removeAttribute('hidden')
            : arrow.setAttribute('hidden', true);
    });

    let links = document.querySelectorAll('[href^="#"]'),
    speed = 0.1;

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            requestAnimationFrame(step);

            function step(time) {
                if (!start) start = time;

                let progress = time - start,
                    r = (toBlock < 0 
                        ? Math.max(widthTop - progress/speed, widthTop + toBlock) 
                        : Math.min(widthTop + progress/speed, widthTop + toBlock));

                document.documentElement.scrollTo(0, r);

                r != (widthTop + toBlock) 
                    ? requestAnimationFrame(step) 
                    : location.hash = hash;
            }
        });
    });
};