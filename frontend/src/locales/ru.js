export default {
  translation: {
    baseTextUI: {
      header: 'Чат',
    },

    buttons: {
      btnExit: 'Выйти',
      btnEnter: 'Войти',
      btnСancel: 'Отменить',
      btnSend: 'Отправить',
      btnDelete: 'Удалить',
      btnRename: 'Переименовать',
    },

    notFoundPage: {
      header: 'Страница не найдена',
      text: 'Но вы можете перейти',
      linkMainPage: 'на главную страницу',
    },

    loginPage: {
      header: 'Войти',

      login: 'Логин',
      password: 'Пароль',

      noRegistrationQuestion: 'Нет аккаунта?',
      btnGetRegistration: 'Регистрация',
    },

    loginForm: {
      login: 'Ваш ник',
      password: 'Пароль',
      invalidCredentials: 'Неверные имя пользователя или пароль',
    },

    messages: {
      countMessages_one: '{{count}} сообщение',
      countMessages_few: '{{count}} сообщения',
      countMessages_many: '{{count}} сообщений',
    },

    newMessageForm: {
      ariaLabel: 'Новое сообщение',
      placeholder: 'Введите сообщение...',
    },

    channels: {
      header: 'Каналы',
      labelToggle: 'Управление каналом',
    },

    channelModals: {
      titleAddChannel: 'Добавить канал',
      titleRenameChannel: 'Переименовать канал',
      labelNameChannel: 'Имя канала',
    },

    errorsValidation: {
      min: 'От 3 до 20 символов',
      max: 'От 3 до 20 символов',
      required: 'Обязательное поле',
      notOneOf: 'Должно быть уникальным',
      name: 'Обязательное поле',
    },

    errorsToast: {
      networkError: 'Ошибка соединения',
      messageSendError: 'Ошибка отправки сообщения',
      channelAddError: 'Ошибка добавления канала',
    },

    infoToast: {
      channelAdding: 'Добавление канала...',
    },
  },
};
