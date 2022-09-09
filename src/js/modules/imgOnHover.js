export const imgOnHover = (imgsSelector) => {
    const blocks = document.querySelectorAll(imgsSelector);
    
    const showOrHideImg = (block, show = true) => {
        const img = block.querySelector('img');
        img.src = show 
            ? img.src.slice(0, -4) + '-1.png'
            : img.src.slice(0, -6) + '.png';
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = show ? 'none' : 'block';
        });
    };
    blocks.forEach(block => {
        let isShown = false;
        block.addEventListener('mouseover', () => {
            if (!isShown) {
                showOrHideImg(block);
                isShown = true;
            }
        });
        block.addEventListener('mouseout', () => {
            if (isShown) {
                showOrHideImg(block, false);
                isShown = false;
            } 
        });
    });
};