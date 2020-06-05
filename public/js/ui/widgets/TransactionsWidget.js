/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const newIncomeBtn = document.querySelector('.create-income-button');
    const newExpenseBtn = document.querySelector('.create-expense-button');
    newIncomeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let newIncome  = App.getModal('newIncome');
      newIncome.open();
    });
    newExpenseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      let newExpense  = App.getModal('newExpense');
      newExpense.open();
    });

  }
}
