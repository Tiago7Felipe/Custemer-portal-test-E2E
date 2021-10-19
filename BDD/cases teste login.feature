            # language: pt

            Funcionalidade: Login

            Contexto:
            Dado que esteja acessando "https://novoportal-hti.auttar.com.br/"

            Cenário: Validar campos para login
            Quando a página carregar
            Então devo conseguir ver os campos para realizar login

            Cenário: Validar Login com a senha Inválida
            Quando colocar <email> válido
            E <senha> Inválida
            Então não devo conseguir realizar login
            E a <mensagem>
            Exemplos:
            | email                            | senha    | mensagem                   |
            | client.portal.gtcom+28@gmail.com | #S123456 | Usuário ou Senha inválidos |

            Cenário: Validar Login com email inválido
            Quando colocar <email> inválido
            E <senha> válida
            Então não devo conseguir realizar login
            E a <mensagem>
            Exemplos:
            | email                             | senha      | mensagem                   |
            | cliente.portal.gtcom+28@gmail.com | #Secret123 | Usuário ou Senha inválidos |

            Cenário: Validar login com sucesso
            Quando passar os dados válidos <email> <senha>
            E entrar
            Então devo conseguir realizar login com sucesso
            Exemplos:
            | email                            | senha      |
            | client.portal.gtcom+28@gmail.com | #Secret123 |