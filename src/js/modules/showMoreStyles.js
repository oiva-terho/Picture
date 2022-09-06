import { getResource } from "../services/requests";

export const showMoreStyles = (trigger, wrapper) => {
    const btn = document.querySelector(trigger),
          container = document.querySelector(wrapper);
    
    const createCards = (response) => {
        response.forEach(({ src, title, link }) => {
            const card = document.createElement('div');
            card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1', 'animated', 'fadeInUp');
            card.innerHTML= `
                <div class="styles-block">
                    <img src=${src} alt="style">
                    <h4>${title}</h4>
                    <a href=${link}>Подробнее</a>
                </div>
            `;
            container.append(card);
        });
    };

    btn.addEventListener('click', function() {
        getResource('http://localhost:3000/styles')
            .then(result => { 
                createCards(result);
                this.remove();})
            .catch(error => {
                const notification = document.createElement('div');
                notification.classList.add('p-heading');
                notification.textContent = `Что-то пошло не так. Попробуйте позже.`;
                console.log(error);
                container.append(notification);
                setTimeout(() => notification.remove(), 3000);
            });

        
    });
};