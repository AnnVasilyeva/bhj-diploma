/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return localStorage.user;
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    return createRequest({data, method: 'GET', url: this.URL + '/current', responseType: 'json',
      callback: (err, response) => {
        if(response && response.user) {
          this.setCurrent(response.user);
        } else {
          this.unsetCurrent();
        }
        callback( err, response );
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    return createRequest({data, method: 'POST', url: this.URL + '/login', responseType: 'json',
      callback: (err, response) => {
        if(response && response.success) {
          this.setCurrent(response.user);
        }
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    return createRequest({data, method: 'POST', url: this.URL + '/register', responseType: 'json',
      callback: (err, response) => {
        if(response && response.user) {
          this.setCurrent(response.user);
        }
      }
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    return createRequest({data, method: 'POST', url: this.URL + '/logout', responseType: 'json',
      callback: (err, response) => {
        if(response && response.user) {
          this.unsetCurrent();
        }
      }
    });
  }
}
