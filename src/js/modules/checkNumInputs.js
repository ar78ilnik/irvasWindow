const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector);

    numInputs.forEach(item => {
        item.addEventListener('input', () => {
            // проверка ввода пользователя номера телефона
            // D - все не цифры
            item.value = item.value.replace(/\D/, '');
        });
    });
};

export default checkNumInputs;
