/* eslint-disable */
describe('Load Product Page', () => {
    it('passes', () => {
        cy.intercept("/config.json", { fixture: 'config.json' }).as('getConfig');
        cy.intercept("https://localhost:44305/api/v1/Category", { fixture: 'categories.json' }).as('getCategories');
        cy.intercept("https://localhost:44305/api/v1/Product/3", { fixture: 'product3.json' }).as('GetProduct3');

        cy.visit('http://localhost:5173/products/3')

        cy.get('[data-cy="product-name"]').should('be.visible');
    })
})
