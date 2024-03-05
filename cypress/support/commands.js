Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Ana')
    cy.get('#lastName').type('Clara')
    cy.get('#email').type('ana.clara@gmail.com')
    cy.get('#phone').type('19993658741')
    cy.get('#open-text-area').type('Testando...')
    cy.contains('button', 'Enviar').click()
})