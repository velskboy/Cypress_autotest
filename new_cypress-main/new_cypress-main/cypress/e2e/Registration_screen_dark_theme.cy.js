import * as registration_screen from "../locators/registration_screen.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get(registration_screen.shadow_selector).should('exist');
        });

    it('Имя пользователя не с буквы, пароль 7 символов, неверный формат емейл, рефералка 3 символа', function () {
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.username_selector).type('1asdas').click(); //пишем имя пользователя
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.username_failed_result).contains('Допустимые символы (от 6 до 32): a-z, 0-9, _. Имя должно начинаться с буквы').should('be.visible');

        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.email_selector).type('voodoogmail.com').click(); //пишем почту
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.email_failed_result).contains('Формат e-mail: username@test.ru').should('be.visible'); //проверяем результат

        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.password_selector).type('testpas').click(); //пишем пароль
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.password_failed).contains('Пароль должен содержать минимум 8 символов').should('be.visible');

        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.referal_code_selector).type('tst'); //рефералка 4-8 символов норма
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.referal_code_failed).contains('Неверный формат ссылки').should('be.visible');
    })

    it('Имя пользователя русскими буквами, пароль 65 символов, пустой емейл, рефералка 9 символов', function () {
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.username_selector).type('тестимяпользователя').click(); //пишем имя пользователя
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.username_failed_result).contains('Допустимые символы (от 6 до 32): a-z, 0-9, _. Имя должно начинаться с буквы').should('be.visible');

        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.email_selector).type('asdasd').clear().click(); //пишем почту
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.email_failed_result).contains('Поле не заполнено').should('be.visible'); //проверяем результат

        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.password_selector).type('testpasstestpasstestpasstestpassstestpasstestpasstestpasstestpass').click(); //пишем пароль
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.password_failed).contains('Пароль должен содержать от 8 до 64 символов, включая заглавные буквы и цифры').should('be.visible');

        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.referal_code_selector).type('testrefer'); //рефералка 4-8 символов норма
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.referal_code_failed).contains('Неверный формат ссылки').should('be.visible');
    })

    it('Имя пользователя 33 буквы, пароль пустой', function () {
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.username_selector).type('testtesttesttesttesttesttesttestt').click(); //пишем имя пользователя
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.username_failed_result).contains('Допустимые символы (от 6 до 32): a-z, 0-9, _. Имя должно начинаться с буквы').should('be.visible');

        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.password_selector).type('sadsad').clear().click(); //пишем пароль
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.password_failed).contains('Поле не заполнено').should('be.visible');
    })

    it('Имя пользователя с некорректными символами, пароль без заглавных букв', function () {
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.username_selector).type('@#$@#$@#$@#$').click(); //пишем имя пользователя
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.username_failed_result).contains('Допустимые символы (от 6 до 32): a-z, 0-9, _. Имя должно начинаться с буквы').should('be.visible');

        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.password_selector).type('dasdasdas1').click(); //пишем пароль
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.password_failed).contains('Пароль должен содержать от 8 до 64 символов, включая заглавные буквы и цифры').should('be.visible');
    })

    it('Имя пользователя пустое, пароль без цифр', function () {
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.username_selector).type('@#$@#$@#$@#$').clear().click(); //пишем имя пользователя
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.username_failed_result).contains('Поле не заполнено').should('be.visible');

        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.password_selector).type('dasdasdasDd').click(); //пишем пароль
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.password_failed).contains('Пароль должен содержать от 8 до 64 символов, включая заглавные буквы и цифры').should('be.visible');
    })

    it('Не нажато согласие с пользовательским соглашением при корректных данных', function () {
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.username_selector).type('testnametest').click(); //пишем имя пользователя
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.password_selector).type('123123Dd').click(); //пишем пароль
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.email_selector).type('voodoo@gmail.com').click();
 
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.next_button).click();
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.private_policy_button).should('have.class', 'error--text');
    })

    it('Не нажато согласие с пользовательским соглашением при пустых полях', function () {
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.next_button).click();
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.private_policy_button).should('have.class', 'error--text');
    })

    it('Нажато согласие с пользовательским соглашением при пустых полях', function () {
        
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.private_policy_button).click();
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.next_button).click();

        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.username_failed_result).contains('Поле не заполнено').should('be.visible');
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.password_failed).contains('Поле не заполнено').should('be.visible');
        cy.get(registration_screen.shadow_selector).shadow().find(registration_screen.email_failed_result).contains('Поле не заполнено').should('be.visible');
    })
})