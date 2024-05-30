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
  constructor(element) {
    try {
      if (!element) {
        throw new Error('Элемента не существует');
      }

      this.element = element;
      this.registerEvents();

    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    this.element.addEventListener('click', event => {
      if (event.target.closest('.create-income-button')) {
        App.getModal('newIncome').open();
      }

      if (event.target.closest('.create-expense-button')) {
        App.getModal('newExpense').open();
      }
    }
  )}
}
