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
   cy.contains('button', 'Enviar').click()

   cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
   cy.get('#firstName').type('Ana')
   cy.get('#lastName').type('Clara')
   cy.get('#email').type('ana.clara@gmail,com')
   cy.get('#open-text-area').type('testando...')
   cy.contains('button', 'Enviar').click()

   cy.get('.error').should('be.visible')
  })

  it('Campo telefone continua vazio quando preenchido com valor não-numérico', () => {
    cy.get('#phone').type('fdgdgdgfd').should('have.value', '')

  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
   cy.get('#firstName').type('Ana')
   cy.get('#lastName').type('Clara')
   cy.get('#email').type('ana.clara@gmail.com')
   cy.get('#phone-checkbox').check()
   cy.get('#open-text-area').type('testando...')
   cy.contains('button', 'Enviar').click()

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
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('Envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('select').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor', () => {
    cy.get('select').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu indice', () => {
    cy.get('select').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('[type="radio"]').check('feedback').should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('[type="radio"]')
      .should('have.length', 3)
      .each( ($radio) => {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('Marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('Seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json').should('be.visible', 'example.json')
  })

  it.only('Seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}).should('be.visible', 'example.json')
  })

})