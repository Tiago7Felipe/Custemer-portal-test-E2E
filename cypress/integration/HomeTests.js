/// <reference types="cypress" />
require("cypress-xpath");
require("cypress-keycloak");
import { HomePage } from "../Pages/HomePage";
const homeElements = new HomePage();
import { LoginPage } from "../Pages/LoginPage";
const loginElements = new LoginPage();
describe("Smoke Tests", () => {
  // faz com que o teste prossiga, mesmo havendo erros de javascript ao carregar a aplicação
  beforeEach(() => {
    cy.logout({
      root: `${Cypress.env("auth_base_url")}`,
      realm: `${Cypress.env("auth_realm")}`,
      client_id: `${Cypress.env("auth_client_id")}`,
      redirect_uri: `${Cypress.config().baseUrl}`,
    });
  });

  it("Selecionar Loja após logar", () => {
    cy.visit("/");
    cy.get(loginElements.logoInicialImg).should("be.visible");
    cy.get(loginElements.userInput).type(Cypress.env("users").username);
    cy.get(loginElements.passInput).type(Cypress.env("users").password);
    cy.get(loginElements.loginBtn).should("be.visible");
    cy.get(loginElements.loginBtn).click();
    cy.get(homeElements.selecaoClienteInput).should("be.visible");
    cy.get(homeElements.selecaoClienteInput).click();
    cy.wait(2000);
    cy.get(homeElements.gridCheckboxList).first().click();
    cy.get(homeElements.gridConfirmButton).click();
    cy.get(homeElements.selecaoClientNumLojasSpan).should(
      "contain.text",
      "1 Loja(s) selecionada(s)"
    );
  });

  it("Realizar Logout", () => {
    cy.visit("/");
    cy.get(loginElements.logoInicialImg).should("be.visible");
    cy.get(loginElements.userInput).type(Cypress.env("users").username);
    cy.get(loginElements.passInput).type(Cypress.env("users").password);
    cy.get(loginElements.loginBtn).should("be.visible");
    cy.get(loginElements.loginBtn).click();
    cy.get(homeElements.selecaoClienteInput).should("be.visible");
    cy.get(homeElements.meuPerfilLogOut).click();
    cy.get(homeElements.logoutButton).click();
    cy.get(loginElements.logoInicialImg).should("be.visible");
  });

  it("Alterar senha", () => {
    cy.visit("/");
    cy.get(loginElements.logoInicialImg).should("be.visible");
    cy.get(loginElements.userInput).type(Cypress.env("users").username);
    cy.get(loginElements.passInput).type(Cypress.env("users").password);
    cy.get(loginElements.loginBtn).should("be.visible");
    cy.get(loginElements.loginBtn).click();
    cy.get(homeElements.selecaoClienteInput).should("be.visible");
    cy.get(homeElements.meuPerfilDadosButton).click();
    cy.get(homeElements.senhaAtualInput).type(Cypress.env("users").password);
    cy.get(homeElements.novaSenhaInput).type(
      Cypress.env("users").updatePassword
    );
    cy.get(homeElements.repetirNovaSenhaInput).type(
      Cypress.env("users").updatePassword
    );
    cy.get("button").contains("Atualizar").click();
    cy.get("modal-message").should(
      "contain.html",
      "Senha <b>alterada</b> com sucesso!"
    );
  });
});
