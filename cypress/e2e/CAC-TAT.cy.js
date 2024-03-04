/// <reference types="Cypress" />

const { it } = require("mocha")


describe('CAC TAT', () => {
  beforeEach(() =>{
    cy.visit('./src/index.html')
  })
  it('Verifica o titulo da aplicação', () => {
   cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it.only('Preenche os campos obrigatórios e envia o formulário',() => {
   cy.get('#firstName').type('Ana')
   cy.get('#lastName').type('Clara')
   cy.get('#email').type('ana.clara@gmail.com')
   cy.get('#phone').type('19993658741')
   cy.get('#open-text-area').type('testando...')
   cy.get('button[type="submit"]').click()

   cy.get('.success').should('be.visible')
  })
})