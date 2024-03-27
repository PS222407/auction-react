/* eslint-disable */
describe('Load Admin Product Create', () => {
    it('passes', () => {
        cy.login('admin');

        cy.visit('http://localhost:5173/admin/products/create');

        cy.intercept("/config.json", { fixture: 'config.json' }).as('getConfig');
        cy.intercept("https://localhost:44305/api/v1/Category", { fixture: 'categories.json' }).as('getCategories');
    })
})



