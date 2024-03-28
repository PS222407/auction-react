/* eslint-disable */
describe('Load Homepage', () => {
    it('passes', () => {
        cy.intercept("GET", "/config.json", { statusCode: 200, fixture: 'config.json' }).as('getConfig');
        cy.intercept("GET", "https://localhost:44305/api/v1/Category", { statusCode: 200, fixture: 'categories.json' }).as('getCategories');

        cy.visit('http://localhost:5173/')

        cy.get('[data-cy="category"]').should('be.visible');
    })
})
