import {
  modals,
  sliders,
  Forms,
  showMoreStyles,
  calc,
  filter,
} from "./modules";

("use strict");

// Modal windows ---------------------------------------------------------------
try {
  modals();
} catch (e) {
  console.log("Modal windows are broken", e);
}

// Slider in main window and in feedback section -------------------------------
try {
  sliders({
    slidesSelector: ".feedback-slider-item",
    prevSelector: ".main-prev-btn",
    nextSelector: ".main-next-btn",
  });
  sliders({
    slidesSelector: ".main-slider-item",
    vertical: true,
  });
} catch (e) {
  console.log("Sliders are broken", e);
}

// Get data from forms, POST to server -----------------------------------------
try {
  new Forms().init();
} catch (e) {
  console.log("Forms are broken", e);
}

// Showes more content on button in styles section -----------------------------
try {
  showMoreStyles(".button-styles", "#styles .row");
} catch (e) {
  console.log("Styles load is broken", e);
}

// Counts price of painting and prepare it to Forms function -------------------
try {
  calc({
    size: "#size",
    material: "#material",
    options: "#options input",
    promocode: ".promocode",
    result: ".calc-price",
  });
} catch (e) {
  console.log("Calculator is broken", e);
}

// Filters imges by tabs selector in portfilio section ------------------------ 
try {
  filter({
    menuSelector: ".portfolio-menu",
    imagesWrapperSelector: ".portfolio-wrapper",
    noImagesSelector: ".portfolio-no",
  });
} catch (e) {
  console.log("Filter is broken", e);
}
