/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

    let request = new XMLHttpRequest();
    request.withCredentials = true;
    request.responseType = options.responseType;

    if (options.method === 'GET') {
        let url = options.url;
        if (options.data) {
            url += '?';
            let data = options.data;
            for (let key in data) {
                url += key + '=' + data[key] + '&';
                url = url.slice(0,-1);
            }
        }

        try {
            if(url) {
                request.open(options.method, url, true);
                request.send();
            }
        } catch (e) {
            options.callback( e );
        }

    } else {

        let formData = new FormData();

        for (let key in options.data) {
            formData.append( key, options.data[key]);
        }

    try {
        request.open(options.method, options.url, true);
        request.send(formData);

    } catch (e) {
        options.callback(e);
    }

    }
    request.addEventListener('readystatechange', () => {

        if (request.readyState === request.DONE && request.status === 200) {
            let err = null;
            let response = request.response;
            options.callback(err, response);
        }

    });

    return request;
};
