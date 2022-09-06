import { phoneMask } from "./phoneMask";
import{ postData } from "../services/requests";

export const forms = () => {
  const forms = document.querySelectorAll("form"),
    inputs = document.querySelectorAll("input"),
    upload = document.querySelectorAll('[name="upload"]');

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

  const clearInputs = () => {
    inputs.forEach((input) => (input.value = ""));
    upload.forEach((field) => {
      field.previousElementSibling.textContent = "Загрузить фотографию";
    });
  };

  upload.forEach((field) => {
    field.addEventListener("input", () => {
      let file = field.files[0].name.split("."),
          fileExtention = file.pop(),
          fileName = file.join('.'),
          dots = fileName.length > 7 ? "..." : ".";

      const clippedName = fileName.substring(0, 7) + dots + fileExtention;

      field.previousElementSibling.textContent = clippedName;
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
