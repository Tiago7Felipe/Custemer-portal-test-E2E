export class HomePage {
  selecaoClienteInput = "div[id ='selecao_de_cliente']";
  gridCheckboxList = "tbody tr mat-checkbox";
  gridConfirmButton = 'button[data-testid="btn-confirm"]';
  selecaoClientNumLojasSpan = "#selecao_de_cliente span :nth-last-child(1) ";
  meuPerfilDadosButton = "#dados_do_perfil";
  senhaAtualInput =
    ":nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix";
  novaSenhaInput =
    ":nth-child(2) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix";
  repetirNovaSenhaInput =
    ":nth-child(3) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix";
  meuPerfilLogOut = "#meu_perfil";
  logoutButton = ".header__right-client-menu-logout > p";
}
