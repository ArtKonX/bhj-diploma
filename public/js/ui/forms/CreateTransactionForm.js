/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);

    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const currentUser = User.current();

    Account.list(currentUser, (error, response) => {
      const data = response.data;
      const accountsSelect = this.element.querySelector('.accounts-select');
      let accountsTemplate = '';

      if (data) {
        data.forEach(obj => {
          accountsTemplate += `<option value="${obj.id}">${obj.name}</option>`
        });
      }

      accountsSelect.innerHTML = accountsTemplate;
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (error, response) => {
      this.element.reset();
      App.getModal('newIncome').close();
      App.getModal('newExpense').close();
      App.update();
    })
  }
}