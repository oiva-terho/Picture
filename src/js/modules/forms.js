import { phoneMask } from "./phoneMask";
import{ postData } from "../services/requests";

export const forms = () => {
  const forms = document.querySelectorAll("form"),
    inputs = document.querySelectorAll("input"),
    upload = document.querySelectorAll('[name="upload"]'),
    select = document.querySelectorAll("select");

  phoneMask('input[name="phone"]');

  const message = {
    loading: "Загрузка",
    success: "Спасибо! Скоро мы с Вами свяжемся",
    failure: "Что-то полшло не так",
    spinner: "assets/img/spinner.gif",
    ok: "assets/img/ok.png",
    falil: "assets/img/fail.png",
  };

  const path = {
    designer: "assets/server.php",
    question: "assets/question.php",
  };

  const clearInputs = () => { setTimeout(() => {
    inputs.forEach(input => input.value = "");
    inputs.forEach(input => input.checked = false);
    select.forEach(select => select.options[0].selected = true);
    upload.forEach(field => {
      field.previousElementSibling.textContent = "Загрузить фотографию";
    });
    document.querySelector('.calc-price').textContent = 
      'Для расчета нужно выбрать размер картины и материал картины';
    }, 600);
  };

  upload.forEach((field) => {
    field.addEventListener("input", () => {
      let file = field.files[0].name.split("."),
          fileExtention = file.pop(),
          fileName = file.join('.'),
          dots = fileName.length > 7 ? "..." : ".";

      const clippedName = fileName.substring(0, 7) + dots + fileExtention;
      const images = ['apng', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 
        'pjp', 'png', 'svg', 'webp', 'bmp', 'ico', 'cur', 'tif', 'tiff', 
        'eps', 'psd', 'cdr', 'indd', 'ai', 'raw', 'raf', 'cr2', 'nrw', 'erf', 
        'rw2', 'nef', 'arw', 'rwz', 'eip', 'dng', 'bay', 'dcr', 'crw', '3fr', 
        'k25', 'kc2', 'mef', 'dng', 'cs1', 'orf', 'ari', 'sr2', 'mos', 'cr3', 
        'gpr', 'srw', 'mfw', 'srf', 'fff', 'kdc', 'mrw', 'x3f', 'j6i', 'rwl', 
        'pef', 'iiq', 'cxi', 'nksc', 'mdc'];
      if (images.some((img) => fileExtention == img)) {
        field.previousElementSibling.textContent = clippedName;
      } else { 
        field.border = '1px solid red';
        field.previousElementSibling.textContent = 'Неверный формат изображения';
        upload.forEach(field => field.value = '');
      }
    });
  });

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      
      form.classList.add("animated", "fadeOutUp");
      setTimeout(() => {
        form.style.display = "none";
        form.parentNode.append(statusMessage);
      }, 1000);

      const statusImg = document.createElement("img");
      statusImg.setAttribute("src", message.spinner);
      statusImg.classList.add("animated", "fadeInUp");
      statusMessage.append(statusImg);

      const textMessage = document.createElement("div");
      textMessage.textContent = message.loading;
      statusMessage.append(textMessage);

      const formData = new FormData(form);
      
      try {
        const countedPrice = parseFloat(form.querySelector('.calc-price').textContent);
        if (!isNaN(countedPrice)) {
          formData.append('Counted price', countedPrice);
        }
      } catch {}

      let api;
      api =
        form.closest(".popup-design") || form.classList.contains("calc_form")
          ? path.designer
          : path.question;

      postData(api, formData)
        .then((postResult) => {
          console.log(postResult);
          statusImg.setAttribute("src", message.ok);
          textMessage.textContent = message.success;
        })
        .catch(() => {
          statusImg.setAttribute("src", message.fail);
          textMessage.textContent = message.failure;
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
            form.style.display = "block";
            form.classList.remove("fadeOutUp");
            form.classList.add("fadeInUp");
          }, 5000);
        });
    });
  });
};
