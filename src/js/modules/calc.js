import { getResource } from "../services/requests";

export const calc = ({
    size, material, options, promocode, result
}) => {
    const sizeInput = document.querySelector(size),
          materialInput = document.querySelector(material),
          optionsInputs = document.querySelectorAll(options),
          promocodeInput = document.querySelector(promocode),
          resultDiv = document.querySelector(result);

    let sizeDB, materialDB, optionsDB, sum = 0;
    getResource('http://localhost:3000/prices')
        .then(result => { 
            sizeDB = result.size,
            materialDB = result.material,
            optionsDB = result.options;
        })
        .catch(error => {
            resultDiv.textContent = 'Простите, сервер временно недоступен';
            console.log(error);
        });

    const optionsPrice = () => {
        const selectedOptions = [ 0 ];
        optionsInputs.forEach((checkbox, i) => {
            if (checkbox.checked) { selectedOptions.push(optionsDB[i]); }
        });
        return selectedOptions.reduce((sum, i) => sum += i);
    };

    const calcFunction = () => {
        sum = Math.round(
          sizeDB[sizeInput.selectedIndex - 1] *
            materialDB[materialInput.selectedIndex - 1] +
            optionsPrice()
        );
        if (sizeInput.selectedIndex == 0 || materialInput.selectedIndex == 0) {
            resultDiv.textContent =
              "Пожалуйста, выберите размер и материал картины";
        } else if (promocodeInput.value === 'IWANTPOPART') {
            resultDiv.textContent = Math.round(sum*0.7);
        } else {
            resultDiv.textContent = sum;
        }
        nextForm();
    };

    const nextForm = () => {
        const countedPrice = parseFloat(resultDiv.textContent);
        if (!isNaN(countedPrice) && document.querySelector('#calc-file-upload').value !== '') {
            const showNextForm = () => {
                const additionalForm = document.querySelector('#send-order');
                document.querySelector('#preorder').style.display = 'none';
                additionalForm.style.display = 'block';
                additionalForm.querySelector('[name="name"]').setAttribute('required', true);
                additionalForm.querySelector('[name="phone"]').setAttribute('required', true);
            };
            console.log(countedPrice, document.querySelector('#next-form'));
            document.querySelector('#next-form').addEventListener('click', showNextForm);
        }
    };

    sizeInput.addEventListener('change', calcFunction);
    materialInput.addEventListener('change', calcFunction);
    optionsInputs.forEach(checkbox => checkbox.addEventListener('change', calcFunction));
    promocodeInput.addEventListener('input', calcFunction);
};