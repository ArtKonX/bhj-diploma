/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, (error, response) => {
      if (response.success) {
        App.setState('user-logged');
        const form = document.getElementById('register-form');
        const register = App.getModal('register');
        form.reset();
        register.close();
      }
    })
  }
}