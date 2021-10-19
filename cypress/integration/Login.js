/// <reference types="cypress" />
const login = require ('../fixtures/Login.json');

describe('Login', () => {

    it('Validar campos para login', () => {
        cy.visit('')

        cy.get('#textFieldLogin').should('contain','Usuário ou E-mail')
        cy.get('#textFieldPassword').should('contain', 'Senha')
        cy.get('#submit').should('contain', 'Entrar')
        cy.get('.btn--basic').should('contain', 'Esqueci minha senha')
    });

    it('Validar Login com a senha Inválida', () => {
        cy.Login( login.email,login.passwordInvalida)
        //validando mensagem de erro
        cy.get('.alert-information').should('contain', 'Usuário ou Senha inválidos')
    });

    it('Validar Login com email inválido', () => {
        cy.Login( login.emailInvalido, login.password)
        //validando mensagem de erro
        cy.get('.alert-information').should('contain', 'Usuário ou Senha inválidos')
    });

    it('Validar login com sucesso', () => {
        cy.Login(login.email, login.password)
        //validar login
        cy.get('#meu_perfil > :nth-child(1) > small').should('contain', 'client.portal.gtcom+28@gmail.com')
        cy.get('.page-header__title').should('contain', 'Olá')
        //logout
        cy.Logout()
    });
})