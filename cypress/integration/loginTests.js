/// <reference types="cypress" />
require("cypress-xpath");
require("cypress-keycloak");
import { LoginPage } from "../Pages/LoginPage";
const loginElements = new LoginPage();
import { HomePage } from "../Pages/HomePage";
const homeElements = new HomePage();
// var redirect_url=""
describe("Testes de Login Tests", () => {
  // faz com que o teste prossiga, mesmo havendo erros de javascript ao carregar a aplicação
  beforeEach(() => {
    cy.logout({
      root: `${Cypress.env("auth_base_url")}`,
      realm: `${Cypress.env("auth_realm")}`,
      client_id: `${Cypress.env("auth_client_id")}`,
      redirect_uri: `${Cypress.config().baseUrl}`,
    });
  });

  it("Login com sucesso", () => {
    cy.visit("/");
    cy.get(loginElements.logoInicialImg).should("be.visible");
    cy.get(loginElements.userInput).type(Cypress.env("users").username);
    cy.get(loginElements.passInput).type(Cypress.env("users").password);
    cy.get(loginElements.loginBtn).should("be.visible");
    cy.get(loginElements.loginBtn).click();
    cy.get(loginElements.logoImg).should("be.visible");
  });
  it("Login inválido", () => {
    cy.visit("/");
    cy.get(loginElements.logoInicialImg).should("be.visible");
    cy.get(loginElements.userInput).type(Cypress.env("users").invalidUser);
    cy.get(loginElements.passInput).type(Cypress.env("users").password);
    cy.get(loginElements.loginBtn).should("be.visible");
    cy.get(loginElements.loginBtn).click();
    cy.get(loginElements.alertText).should(
      "contain.text",
      "Usuário ou Senha inválidos"
    );
  });
});
