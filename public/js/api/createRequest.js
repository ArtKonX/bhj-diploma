/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

    const xhr = new XMLHttpRequest();
    const method = options.method;
    const formData = new FormData();
    const optionsData = options.data;
    const URL = method == 'GET' ? `${options.url}?${new URLSearchParams(optionsData).toString()}` : options.url;

    xhr.open(method, URL);

    xhr.responseType = 'json';

    if (optionsData) {
        for (const key in optionsData) {
            formData.append(key, optionsData[key])
        }
    }

    xhr.onload = () => {
        if (xhr.status == 200) {
            const response = xhr.response;
            options.callback(null, response);
        }
    }

    xhr.send(method == 'GET' ? null : formData);

};
