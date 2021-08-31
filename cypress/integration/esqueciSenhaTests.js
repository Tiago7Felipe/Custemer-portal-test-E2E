/// <reference types="cypress" />
require("cypress-xpath");
require("cypress-keycloak");
import { LoginPage } from "../Pages/LoginPage";
const loginElements = new LoginPage();
describe("Smoke Tests", () => {
  // faz com que o teste prossiga, mesmo havendo erros de javascript ao carregar a aplicação

  before(() => {
    cy.logout({
      root: `${Cypress.env("auth_base_url")}`,
      realm: `${Cypress.env("auth_realm")}`,
      client_id: `${Cypress.env("auth_client_id")}`,
      redirect_uri: `${Cypress.config().baseUrl}`,
    });
  });

  it("Acessar esqueci senha", () => {
    cy.visit("/");
    cy.get(loginElements.logoInicialImg).should("be.visible");
    cy.get(loginElements.esqueciSenhaLink).click();
    cy.get(loginElements.loginBtn).should("be.disabled");
  });
  it("Realizar solicitação de nova senha", () => {
    cy.get(loginElements.userInput).type(Cypress.env("users").invalidUser);
    cy.get(loginElements.loginBtn).should("be.visible");
    cy.get(loginElements.loginBtn).click();
    cy.get(loginElements.alertText).should(
      "contain.text",
      "Link enviado com sucesso"
    );
  });
  it("Cancelar solicitação de nova senha", () => {
    cy.visit("/");
    cy.get(loginElements.logoInicialImg).should("be.visible");
    cy.get(loginElements.esqueciSenhaLink).click();
    cy.get(loginElements.loginBtn).should("be.disabled");
    cy.get(loginElements.esqueciSenhaVoltarLink).click();
    cy.get(loginElements.logoInicialImg).should("be.visible");
  });
});
