/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super( element );
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let select = this.element.querySelector('.accounts-select');
    let user = User.current();

    Account.list(user, (err, response) => {
      if (response.data);  {
        select.innerHTML = '';
        response.data.forEach((item) => select.innerHTML += `<option value="${item.id}">${item.name}</option>`);
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options.data, (err, response) => {
      if (response && response.success) {
        const modalWindow = this.element.closest('.modal');
        let modal;
        if (modalWindow.getAttribute('id') === 'modal-new-income') {
          modal = 'newIncome';
        } else {
          modal = 'newExpense';
        }
        const getModal = App.getModal(modal);
        getModal.close();
        App.update();
        this.element.reset();
      }
    });
  }
}
