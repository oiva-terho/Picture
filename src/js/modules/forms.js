import { phoneMask } from "./phoneMask";
import { postData } from "../services/requests";

export class Forms {
    constructor() {
        this.forms = document.querySelectorAll("form");
        this.inputs = document.querySelectorAll("input");
        this.upload = document.querySelectorAll('[name="upload"]');
        this.select = document.querySelectorAll("select");
        this.message = {
            loading: "Загрузка",
            success: "Спасибо! Скоро мы с Вами свяжемся",
            failure: "Что-то полшло не так",
            spinner: "assets/img/spinner.gif",
            ok: "assets/img/ok.png",
            fail: "assets/img/fail.png",
        };
        this.path = {
            designer: "assets/server.php",
            question: "assets/question.php",
        };
        this.images = ['apng', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 
        'pjp', 'png', 'svg', 'webp', 'bmp', 'ico', 'cur', 'tif', 'tiff', 
        'eps', 'psd', 'cdr', 'indd', 'ai', 'raw', 'raf', 'cr2', 'nrw', 'erf', 
        'rw2', 'nef', 'arw', 'rwz', 'eip', 'dng', 'bay', 'dcr', 'crw', '3fr', 
        'k25', 'kc2', 'mef', 'dng', 'cs1', 'orf', 'ari', 'sr2', 'mos', 'cr3', 
        'gpr', 'srw', 'mfw', 'srf', 'fff', 'kdc', 'mrw', 'x3f', 'j6i', 'rwl', 
        'pef', 'iiq', 'cxi', 'nksc', 'mdc'];
        this.statusMessage = document.createElement("div");
        this.statusImg = document.createElement("img");
        this.textMessage = document.createElement("div");
        this.contactsForm = document.createElement('form');

    }

    clearInputs() {
        setTimeout(() => {
          this.inputs.forEach((input) => (input.value = ""));
          this.inputs.forEach((input) => (input.checked = false));
          this.select.forEach((select) => (select.options[0].selected = true));
          this.upload.forEach((field) => {
            field.previousElementSibling.textContent = "Загрузить фотографию";
          });
          document.querySelector(".calc-price").textContent =
            "Для расчета нужно выбрать размер картины и материал картины";
        }, 600);
      };
    
    checkFileName() {
        this.upload.forEach((field) => {
            field.addEventListener("input", () => {
              let file = field.files[0].name.split("."),
                  fileExtention = file.pop(),
                  fileName = file.join("."),
                  dots = fileName.length > 7 ? "..." : ".";
        
              const clippedName = fileName.substring(0, 7) + dots + fileExtention;
              
              if (this.images.some((img) => fileExtention == img)) {
                field.previousElementSibling.textContent = clippedName;
              } else {
                field.border = "1px solid red";
                field.previousElementSibling.textContent =
                  "Неверный формат изображения";
                this.upload.forEach((field) => (field.value = ""));
              }
            });
          });
    }

    createNotification(form) {
        
        this.statusMessage.classList.add("status");

        form.classList.add("animated", "fadeOutUp");
        setTimeout(() => {
            form.style.display = "none";
            form.parentNode.append(this.statusMessage);
        }, 1000);

        
        this.statusImg.setAttribute("src", this.message.spinner);
        this.statusImg.classList.add("animated", "fadeInUp");
        this.statusMessage.append(this.statusImg);

        
        this.textMessage.textContent = this.message.loading;
        this.statusMessage.append(this.textMessage);
    }

    failNotification(result) {
        this.statusImg.setAttribute("src", this.message.fail);
        this.textMessage.textContent = `${this.message.failure}. Ошибка ${result.status}`;
    }

    async additionalData(form, api, formData, countedPrice) {
        formData.append("Counted price", countedPrice);
        form.style.display = 'none';

        this.contactsForm.classList.add('calc-form-contacts', 'animated', 'fadeInUp');
        this.contactsForm.innerHTML = `
        <form action=# method=POST>
            <h4>Пожалуйста, оставьте ваши контактные данные. Мы Вам перезвоним</h4>
            <div class=main-form>
            <input type=text name=name placeholder="Ваше имя" required>
            <input type=text name=phone placeholder="Ваш телефон" required>
            <button class="button button-order">Заказать</button>
            </div>
        </form>
        `;
        form.parentNode.append(this.contactsForm);
        this.contactsForm.querySelector('button').addEventListener('click', (e) => {
            e.preventDefault();
            formData.append('name', this.contactsForm.querySelector('[name=name]').value);
            formData.append('phone', this.contactsForm.querySelector('[name=phone]').value);
            //How to force function to wait for the formData fill?
            return formData;
        });
      };

    post(form, api, formData) {
        postData(api, formData)
            .then(async (result) => {
            console.log(await result.text());
            if (result.ok) {
                this.statusImg.setAttribute("src", this.message.ok);
                this.textMessage.textContent = this.message.success;
            } else { this.failNotification(result); }
            })
            .catch((err) => { this.failNotification(err); })
            .finally(() => {
            this.clearInputs();
            setTimeout(() => {
                this.statusMessage.remove();
                this.contactsForm.remove();
                form.style.display = "block";
                form.classList.remove("fadeOutUp");
                form.classList.add("fadeInUp");
            }, 5000);
            });
    }
    
    init() {
        phoneMask('input[name="phone"]');
        this.checkFileName();
        this.forms.forEach((form) => {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                this.createNotification(form);

                const formData = new FormData(form);

                let api =
                form.closest(".popup-design") || form.classList.contains("calc_form")
                    ? this.path.designer
                    : this.path.question;

                if (form.querySelector('.calc-price')) {
                    const countedPrice = parseFloat(
                        form.querySelector(".calc-price").textContent
                    );
                    if (!isNaN(countedPrice)) {
                        this.additionalData(form, api, formData, countedPrice)
                            .then(this.post(form, api, formData));
                }} else {
                    this.post(form, api, formData);
                }
            });
        });
    }
}