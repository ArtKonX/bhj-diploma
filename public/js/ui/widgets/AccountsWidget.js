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
  constructor(element) {

    try {
      if (!element) {
        throw new Error('Элемента не существует');
      }

      this.element = element;
      this.registerEvents();
      this.update();

    } catch (error) {
      console.log(error);
    }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.element.addEventListener('click', (event) => {
      if (event.target.closest('.create-account')) {
        App.getModal('createAccount').open();
      }

      if (event.target.closest('.account')) {
        this.onSelectAccount(event.target.closest('.account'));
      }
    })
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
    const userCurrent = User.current();

    if (userCurrent) {
      Account.list(userCurrent, (error, response) => {
        this.clear();
        this.renderItem(response.data);
      });
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accounts = document.querySelectorAll('.account');

    accounts.forEach(account => {
      account.remove();
    })
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    const accounts = document.querySelectorAll('.account');
    const accountId = element.dataset.id;

    accounts.forEach(account => {
      if (account.classList.contains('active')) {
        account.classList.remove('active');
      }
    })
    element.classList.add('active');

    App.showPage('transactions', { accountId });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    let itemTemplate = '';

    item.forEach(elem => {
      itemTemplate += `<li class="active account" data-id=${elem.id}>
      <a href="#">
          <span>${elem.name}</span> /
          <span>${elem.sum} ₽</span>
      </a>
  </li>`;
    })

    return itemTemplate;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data) {
    const itemTemplate = this.getAccountHTML(data);
    this.element.insertAdjacentHTML('beforeEnd', itemTemplate);
  }
}
