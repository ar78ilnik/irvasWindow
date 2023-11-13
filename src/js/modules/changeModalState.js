import checkNumInputs from './checkNumInputs';

// функция получает на вход параметр state, которую мы объявили в main.js - let modalState = {};
const changeModalState = (state) => {
    // собираем данные
    // форма балкона
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
        // ширина
        windowWidth = document.querySelectorAll('#width'),
        // высота
        windowHeight = document.querySelectorAll('#height'),
        // тип окна
        windowType = document.querySelectorAll('#view_type'),
        // теплый или холодный
        windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width');
    checkNumInputs('#height');

    // мы будем взаимодействовать с тремя типами нод, поэтому необходимо выяснить какие они и уже в зависимости от этого выполнять те или иные действия. Мы можем воспользоваться свойством nodeName. Это свойство приходим в виде строки. Тут уместно воспользоваться циклом switch-case

    //    function bindActionToElems(event, elem, prop) {
    //        elem.forEach((item, i) => {
    //            // индекс i я буду записывать в объект let modalState = {}; это будет номер окна (1-4)
    //            item.addEventListener(event, () => {
    //                // в верстке элемент, который имеет больше одного предка - блок с окнами, поэтоиу мы проверяем на длину. Если она больше одного, мы записываем
    //                if (elem.length > 1) {
    //                    // в объект, который передается через state, мы сздаем ключ form и присваиваем ему порядковый номер изображения формы окна
    //                    state[prop] = i;
    //                    console.log(state, 'prop');
    //                } else {
    //                    // если один, значит это поля ширины или длины, поэтому мы извлекаем значение
    //                    state[prop] = item.value;
    //                    console.log(state, 'value');
    //                }
    //
    //            });
    //        });
    //    }

    // Перепишем функцию с использованием цикла switch

    function bindActionToElems(event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch (item.nodeName) {
                    case 'SPAN':
                        state[prop] = i;
                        break;
                    case 'INPUT':
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = "Холодное" : state[prop] = "Теплое";
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if (i == j) {
                                    box.checked = true;
                                }
                            });
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT':
                        state[prop] = item.value;
                        break;
                }

                console.log(state);
            });
        });
    }

    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowWidth, 'width');
    bindActionToElems('input', windowHeight, 'height');
    bindActionToElems('change', windowType, 'type');
    bindActionToElems('change', windowProfile, 'profile');
};

export default changeModalState;
