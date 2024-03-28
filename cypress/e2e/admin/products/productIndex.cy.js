/* eslint-disable */
describe('Load Admin Product Index', () => {
    it('passes', () => {
        cy.intercept("/config.json", { fixture: 'config.json' }).as('getConfig');
        cy.intercept("https://localhost:44305/api/v1/Product", { fixture: 'products.json' }).as('getProducts');

        cy.login('admin');

        cy.visit('http://localhost:5173/admin/products');

        cy.get('[data-cy="product-row"]').should('be.visible');
    })
})



