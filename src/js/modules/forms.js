import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');

    checkNumInputs('input[type="user_phone"]');

    const message = {
        loading: 'Load...',
        succes: 'Thank you',
        failure: 'Somethink is wrong'
    };

    const postData = async (url, data) => {
        // с помощью этой функции мы скрываем реализацию. Fetch API нам возвращают промис и этот промис мы должны еще раз обработать
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
        // есть нюанс, fetch это асинхронная функция. Когда мы запустим postData, она выполнит первую строку, потом она выполнит запрос (определенные данные по определеннуму url). Далее выполняется следующий код (res). На данный момент res пустая. Функция не ждет ответа. Мы можем воспользоваться операторами ES7 async/await. Тем самым мы говорим функции что есть асинхронные операции. Перед параметрами мы пишем async, а перед fetch мы пишем await

        // здесь мы обрабатываем промис. Здесь тоже есть проблема, потому что res.text() тоже выполняется асинхронно. В этом случае return пуст.
        //return res.text();
        //поэтому пишем
        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {

            //Здесь используем е потому что в ТЗ сказано, что данные должны уходить без перезагрузки страницы
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            // собираем данные, которые есть в форме
            const formData = new FormData(item);
            if (item.getAttribute('data-calc') == "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            // написание запроса
            postData('assets/server.php', formData).then(res => {
                console.log(res);
                statusMessage.textContent = message.succes;
            }).catch(() => {
                statusMessage.textContent = message.failure;
            }).finally(() => {
                clearInputs();
                setTimeout(() => {
                    statusMessage.remove();
                }, 3000);
            })
        });
    });
};

export default forms;
