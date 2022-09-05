import { modals, sliders } from "./modules";

'use strict';

try { modals(); } catch { console.log('Modal windows are broken'); }
try { sliders({ 
        slidesSelector: '.feedback-slider-item', 
        prevSelector: '.main-prev-btn', 
        nextSelector: '.main-next-btn' 
    }); 
    sliders({ 
        slidesSelector: '.main-slider-item', 
        vertical: true 
    });
} catch { console.log('Sliders are broken'); }