import { phoneMask } from "./phoneMask";
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
  const postData = async (url, data) => {
    const result = await fetch(url, {
      method: "POST",
      body: data,
    });

    return await result.text();
  };

  const clearInputs = () => {
    inputs.forEach((input) => (input.value = ""));
    upload.forEach((field) => {
      field.previousElementSibling.textContent = "Загрузить фотографию";
    });
  };

  upload.forEach((field) => {
    field.addEventListener("input", () => {
      let dots, fileName, fileExtention;
      let inputName = field.files[0].name.split(".");
      dots = inputName[0].length > 7 ? "..." : ".";
      (function() { 
          fileExtention = inputName.pop();
          fileName = inputName.join('.');
        } ());

      const outputFilename = fileName.substring(0, 7) + dots + fileExtention;
      field.previousElementSibling.textContent = outputFilename;
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
