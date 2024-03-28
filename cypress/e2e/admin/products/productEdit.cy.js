/* eslint-disable */
describe('Load Admin Product Edit', () => {
    it('passes', () => {
        cy.intercept("/config.json", { fixture: 'config.json' }).as('getConfig');
        cy.intercept("https://localhost:44305/api/v1/Category", { fixture: 'categories.json' }).as('getCategories');
        cy.intercept("https://localhost:44305/api/v1/Product/3", { fixture: 'product3.json' }).as('getProduct3');

        cy.login('admin');

        cy.visit('http://localhost:5173/admin/products/3/edit');
        cy.get('[data-cy="product-edit"]').should('be.visible');
    })
})



