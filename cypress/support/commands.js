// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('Login', (email,senha) =>{
    cy.visit('')
    cy.wait(4000)
    cy.get('#textFieldLogin > .mdc-text-field__input').type(email)
    cy.get('#input-password').type(senha)
    cy.get('#submit').click()    
})

Cypress.Commands.add('Logout', (email,senha) =>{
    cy.wait(4000)
    cy.get('.icon-direction_down').click()
    cy.get('.mat-focus-indicator > p').click()
    cy.get('.btn').click()
})