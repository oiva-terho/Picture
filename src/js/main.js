import { modals, sliders, Forms, showMoreStyles, calc, filter } from "./modules";

'use strict';

try { modals(); } catch (e) { console.log('Modal windows are broken', e); }
try { sliders({ 
        slidesSelector: '.feedback-slider-item', 
        prevSelector: '.main-prev-btn', 
        nextSelector: '.main-next-btn' 
    }); 
    sliders({ 
        slidesSelector: '.main-slider-item', 
        vertical: true 
    });
} catch (e) { console.log('Sliders are broken', e); }
try { new Forms().init(); } catch (e) { console.log('Forms are broken', e); }
try { 
    showMoreStyles('.button-styles', '#styles .row'); 
} catch (e) { console.log('Styles load is broken', e); }
try { calc({
    size: '#size', 
    material: '#material', 
    options: '#options input', 
    promocode: '.promocode', 
    result: '.calc-price'
}); } catch (e) { console.log('Calculator is broken', e);}
try { filter({ 
    menuSelector: '.portfolio-menu', 
    imagesWrapperSelector: '.portfolio-wrapper', 
    noImagesSelector: '.portfolio-no' 
}); } catch (e) { console.log('Filter is broken', e); }