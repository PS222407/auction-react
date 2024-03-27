/* eslint-disable */
describe('Load Homepage', () => {
    it('passes', () => {
        cy.visit('http://localhost:5173/')

        cy.intercept("/config.json", { fixture: 'config.json' }).as('getConfig');
        cy.intercept("https://localhost:44305/api/v1/Category", { fixture: 'categories.json' }).as('getCategories');
    })
})