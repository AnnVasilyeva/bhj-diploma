/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Ошибка!');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {

    const createAccount = this.element.querySelector('.create-account ');
    const accountArr = this.element.querySelectorAll('.account');

    createAccount.addEventListener('click', (e) => {
      let newAccount  = App.getModal('createAccount');
      newAccount.open();

      if (accountArr.length > 0) {
        for (let item in accountArr) {
          item.addEventListener('click', (e) => {
            this.onSelectAccount(item);
          });
        }
      }

    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    let user = User.current();
    if (user) {
      Account.list(user, (err, response) => {
        if (response.success) {
          this.clear();
          this.renderItem(response.data);
        }
      });
    } else {
      return;
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accountArr = this.element.querySelectorAll('.account');
    accountArr.forEach(item => item.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    let elementParent = element.closest('.accounts-panel');
    let elementArr = elementParent.querySelectorAll('.active');
    if (elementArr.length > 0) {
      elementArr.forEach(item => item.classList.remove('.active'));
    }
    element.classList.add('active');
    App.showPage( 'transactions', { account_id: id_счёта });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {
     return `<li class="active account" data-id="${item.id}">
                <a href="#">
                 <span>${item.name}</span> /
                 <span>${item.sum} ₽</span>
                </a>
            </li>`;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( item ) {
    let accountHTML = this.getAccountHTML( item );
    this.element.insertAdjacentHTML('beforeend', accountHTML);
  }
}
