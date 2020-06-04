/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
debugger;
    let request = new XMLHttpRequest();
    request.withCredentials = true;
    request.responseType = options.responseType;

    if (options.method === 'GET') {
        let url, mail, password;

        for (let key in options.data) {
            if (key === 'mail') {
                mail = key + '=' + options.data[key];
            }
            if (key === 'password') {
                password = key + '=' + options.data[key];
            }
            if (mail && password) {
                url = options.url + '?' + mail + '&' + password;
            }
        }
        try {
            if(url != undefined) {
                request.open(options.method, url, true);
                request.send();

                request.addEventListener('readystatechange', () => {

                    if (request.readyState === request.DONE && request.status === 200) {
                        let err = null;
                        let response = request.response;
                        options.callback(err, response);
                    }
                });
            }

        } catch (e) {
            options.callback( e );
        }

    } else {
        let formData = new FormData();
        let data = options.data;

        formData.append( 'email', data.email);
        formData.append( 'password', data.password);

    try {
        request.open(options.method, options.url, true);
        request.send(formData);
        request.addEventListener('readystatechange', () => {

            if (request.readyState === request.DONE && request.status === 200) {
                let err = null;
                let response = request.response;
                options.callback(err, response);
            }

        });
    } catch (e) {
        options.callback(e);

    }

    }

    return request;
};
