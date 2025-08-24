export const Placeholders = {
  app: {
    errorBoundary: {
      bugButtonText: 'Throw error',
    },
  },
  pages: {
    main: {},
    auth: {
      mainText: 'Вход в аккаунт',
      describeText: 'Войдите в свой аккаунт или создайте новый',
      tabs: {
        loginTab: 'Вход',
        registerTab: 'Регистрация',
      },
    },
    login: {
      mainText: 'Вход в аккаунт',
    },
    register: {
      mainText: 'Регистрация',
    },
    forgotPassword: {
      mainText: 'Восстановление пароля',
      describeText:
        'Введите email, который был указан при регистрации. Мы отправим вам ' +
        'код для восстановления пароля.',
    },
    resetPassword: {
      mainText: 'Сброс пароля',
      describeFirstPartText:
        'Введите код из письма, отправленного на почту',
      describeSecondPartText: 'и установите новый пароль',
    },
    basket: {
      mainText: 'Корзина',
      productsQuantity: 'Товаров в корзине',
      empty: {
        mainText: 'Корзина пуста',
        describeText: 'Добавьте товары в корзину, чтобы оформить заказ',
        onRouteCatalog: 'Перейти в каталог',
      },
    },
    wishlist: {
      mainText: 'Избранное',
      describeText: 'Товары, которые вас заинтересовали',
      empty: {
        mainText: 'Список избранного пуст',
        describeText: 'Добавьте товары в избранное, чтобы не потерять',
        onRouteCatalog: 'Перейти в каталог',
      },
    },
    catalog: {
      mainText: 'Каталог',
      describeText: 'Выберите категорию для просмотра товаров',
    },
    category: {
      productsQuantity: 'Товаров в категории: ',
      notFound: 'Категория не найдена',
    },
    configurator: {
      mainText: 'Конфигуратор ПК',
      describeText: 'Соберите идеальный компьютер под ваши задачи и бюджет',
      sectionComponents: {
        mainText: 'Компоненты сборки',
      },
      total: {
        mainText: 'Итого по сборке',
        componentsQuantity: 'Выбрано компонентов:',
        compatibility: 'Совместимость:',
        price: 'Общая стоимость:',
        onPlaceAnOrder: 'Заказать сборку',
        onCopyLinkConfig: 'Сохранить конфигурацию',
        recommendation: 'Рекомендации:',
      },
    },
    notFound: {
      errorCode: '404',
      mainText: 'Страница не найдена',
      describeText:
        'К сожалению, запрашиваемая страница не существует или была перемещена.\n' +
        'Возможно, в адресе допущена ошибка.',
      onRouteMain: 'На главную',
      onRouteBack: 'Назад',
      popularSections: 'Популярные разделы:',
    },
    product: {
      notFound: 'Товар не найден',
      onRouteBack: 'Назад',
    },
    profile: {
      mainText: 'Личный кабинет',
      describeText: 'Управляйте своим профилем и заказами',
    },
    search: {
      mainText: 'Поиск',
      describeText: 'Поиск по сайту не работает',
    },
    order: {
      mainText: 'Оформление заказа',
      describeText: 'Заполните форму, чтобы оформить заказ',
      formTitle: 'Укажите свои данные',
    },
  },
  widgets: {
    footer: {
      describeText:
        'Интернет-магазин электроники и комплектующих для ПК. Собираем ' +
        'игровые компьютеры мечты с 2020 года.',
      quickLinks: 'Быстрые ссылки',
      supportLinks: 'Поддержка',
      contactLinks: 'Контакты',
      copyright: '© 2025 Lumi. Все права защищены',
    },
    errorPage: {
      mainText: 'Что то пошло не так.',
      onUploadPage: 'Обновить страницу',
      onRouteMain: 'На главную',
    },
    mobileNavBar: {},
    navBar: {},
    pageLayout: {},
  },
  features: {
    auth: {
      forgotPasswordForm: {
        labels: {
          email: 'Email',
        },
        placeholders: {
          email: 'email@mail.com',
        },
        submit: 'Отправить код',
        onRouteLogin: '← Вернуться ко входу',
      },
      loginForm: {
        labels: {
          email: 'Email',
          password: 'Пароль',
        },
        placeholders: {
          email: 'email@mail.com',
        },
        submit: 'Войти',
        onRouteForgotPassword: 'Забыли пароль?',
      },
      registerForm: {
        labels: {
          email: 'Email',
          password: 'Пароль',
        },
        placeholders: {
          email: 'email@mail.com',
        },
        submit: 'Зарегистрироваться',
      },
      resetPasswordForm: {
        labels: {
          code: 'Код из письма',
          password: 'Новый пароль',
        },
        placeholders: {
          code: 'Введите код',
        },
        submit: 'Войти',
      },
    },
    order: {
      orderForm: {
        labels: {
          address: 'Адрес доставки',
          paymentMethod: 'Способ оплаты',
        },
        submit: 'Сделать заказ',
        submitWithPayment: 'Перейти к оплате',
      },
      addressInput: {
        placeholder: 'Город, улица, дом, квартира',
      },
    },
    catalog: {
      categories: {
        productsQuantity: 'Товаров:',
      },
    },
    basket: {
      products: {
        onRouteCatalog: {
          describeText: 'Нужно что то еще?',
          triggerText: 'Продолжить покупки',
        },
        order: {
          mainText: 'Ваш заказ',
          discount: 'Ваша скидка',
          delivery: 'Доставка',
          price: 'Итого',
        },
        onPlaceAnOrder: 'Оформить заказ',
      },
    },
    breadcrumbNav: {
      onRouteMain: 'Главная',
    },
    profile: {
      cardForm: {
        labels: {
          name: 'Имя',
          email: 'Email',
          phone: 'Телефон',
        },
        placeholders: {
          name: 'Ваше имя',
          email: 'email@mail.com',
          phone: 'Номер телефона',
        },
      },
      settingsForm: {
        labels: {
          currentPassword: 'Текущий пароль',
          newPassword: 'Новый пароль',
        },
        submit: 'Изменить пароль',
      },
    },
    wishlist: {
      products: {
        onSelectAll: 'Выбрать все',
        select: {
          quantity: 'Выбрано товаров:',
          price: 'Общая стоимость:',
          onDelete: 'Удалить выбранные',
          onAddToBasket: 'Добавить в корзину',
        },
      },
    },
    search: {
      input: {
        placeholder: 'Поиск товаров',
      },
    },
  },
  entities: {
    category: {
      categoryProduct: {
        onAddMoreToBasket: '1 в корзину',
        onAddToBasket: 'В корзину',
        onRemoveFromConfigurator: 'Убрать',
        onAddToConfigurator: 'В конфиг',
      },
    },
    configurator: {
      componentSelectButtons: {
        onRouteProduct: 'К товару',
        onRouteCategory: 'Заменить',
      },
      emptyComponent: {
        describeText: 'Не выбран',
      },
    },
    dropdownMenu: {
      onSwitchTheme: 'Тема',
    },
    mainSection: {
      categories: {
        mainText: 'Категории товаров',
        onRouteCatalog: 'Все категории',
      },
      configuratorPromoBlock: {
        mainText: 'Собери игровой ПК мечты',
        describeText:
          'Используй наш конфигуратор для подбора совместимых комплектующих. ' +
          'Мы поможем собрать идеальную сборку под твой бюджет и задачи.',
        onRouteConfigurator: 'Открыть конфигуратор',
      },
    },
    order: {
      card: {
        mainText: 'Заказ',
      },
      profileOrderCard: {
        productsQuantity: 'Количество:',
      },
      profileOrderModal: {
        mainText: 'Заказ',
        dateOrder: 'Заказ от',
        trackNumber: 'Номер отслеживания',
        products: {
          mainText: 'Товары',
          notFoundText: 'Товары не найдены',
        },
        onPayment: 'Оплатить',
        details: {
          mainText: 'Детали заказа',
          address: 'Адрес доставки',
          orderPaymentText: 'Оплата заказа',
          paymentMethod: 'Способ оплаты',
          paymentStatus: 'Статус',
          totalPrice: 'Итого к оплате',
        },
      },
    },
    productDetails: {
      priceDifference: 'Экономия:',
      inStockQuantity: 'В наличии',
      onAddToBasket: 'В корзину',
      onAddMoreToBasket: '1 в корзину',
      onAddToWishlist: 'В избранное',
      onRemoveFromWishlist: 'Из избранного',
      inWishlist: 'В избранном',
      onRemoveFromConfigurator: 'Из конфигуратора',
      onAddToConfigurator: 'В конфигуратор',
      specs: {
        mainText: 'Технические характеристики',
      },
      description: {
        mainText: 'Описание',
      },
    },
    profile: {
      orders: {
        mainText: 'Мои заказы',
        onShowAllOrders: 'Показать все заказы',
        emptyOrders: {
          mainText: 'Пока нет заказов',
          describeText:
            'Вы еще не совершили ни одного заказа. Начните покупки, чтобы увидеть историю заказов здесь.',
          onRouteCatalog: 'Перейти в каталог',
          onRouteBasket: 'Проверить корзину',
        },
      },
      card: {
        ordersQuantity: 'Заказов:',
        wishlistQuantity: 'В избранном:',
        personalInfo: 'Личная информация',
        onSaveInfo: 'Сохранить',
        onEditInfo: 'Редактировать',
      },
      settings: {
        mainText: 'Описание',
        notifications: {
          mainText: 'Уведомления',
          onSave: 'Сохранить',
        },
        safety: {
          mainText: 'Безопасность',
          logout: 'Выйти',
          deleteAccount: 'Удалить аккаунт',
          deleteWarning:
            'Это действие необратимо. Все ваши данные будут удалены.',
        },
      },
      wishlist: {
        mainText: 'Избранные товары',
        empty: {
          mainText: 'Список избранного пуст',
          describeText: 'Добавьте товары в избранное, чтобы не потерять',
          onRouteCatalog: 'Перейти в каталог',
        },
      },
    },
    user: {
      passwordInput: {
        placeholder: 'Введите пароль',
      },
    },
    wishlist: {
      card: {
        onAddToBasket: 'В корзину',
        onDelete: 'Удалить',
      },
    },
  },
  shared: {
    logo: {
      mainText: 'Lumi',
    },
    config: {
      defaultError: 'Пожалуйста, перезагрузите страницу или попробуйте позже',
    },
  },
}
