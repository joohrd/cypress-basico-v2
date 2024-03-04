/// <reference types="Cypress" />

const { it } = require("mocha")


describe('CAC TAT', () => {
  beforeEach(() =>{
    cy.visit('./src/index.html')
  })
  it('Verifica o titulo da aplicação', () => {
   cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário',() => {
    const longText = 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncove'
   cy.get('#firstName').type('Ana')
   cy.get('#lastName').type('Clara')
   cy.get('#email').type('ana.clara@gmail.com')
   cy.get('#phone').type('19993658741')
   cy.get('#open-text-area').type(longText, {delay:0})
   cy.get('button[type="submit"]').click()

   cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
   cy.get('#firstName').type('Ana')
   cy.get('#lastName').type('Clara')
   cy.get('#email').type('ana.clara@gmail,com')
   cy.get('#open-text-area').type('testando...')
   cy.get('button[type="submit"]').click()

   cy.get('.error').should('be.visible')
  })

  it('Campo telefone continua vazio quando preenchido com valor não-numérico', () => {
    cy.get('#phone').type('fdgdgdgfd').should('have.value', '')

  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
   cy.get('#firstName').type('Ana')
   cy.get('#lastName').type('Clara')
   cy.get('#email').type('ana.clara@gmail.com')
   cy.get('#phone-checkbox').click()
   cy.get('#open-text-area').type('testando...')
   cy.get('button[type="submit"]').click()

   cy.get('.error').should('be.visible')
  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
   cy.get('#firstName')
     .type('Ana')
     .should('have.value', 'Ana')
     .clear()
     .should('have.value', '')

   cy.get('#lastName')
     .type('Clara')
     .should('have.value', 'Clara')
     .clear()
     .should('have.value', '')

   cy.get('#email')
     .type('ana.clara@gmail.com')
     .should('have.value', 'ana.clara@gmail.com')
     .clear()
     .should('have.value', '')

   cy.get('#phone')
     .type('19993658741')
     .should('have.value', '19993658741')
     .clear()
     .should('have.value', '')
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })
})