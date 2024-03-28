/* eslint-disable */
describe('Load Admin Product Edit', () => {
    it('passes', () => {
        cy.intercept("GET", "https://localhost:44305/api/v1/Category", { statusCode: 200, fixture: 'categories.json' }).as('getCategories');
        cy.intercept("GET", "https://localhost:44305/api/v1/Product/3", { statusCode: 200, fixture: 'product3.json' }).as('getProduct3');

        cy.login('admin');

        cy.visit('http://localhost:5173/admin/products/3/edit');

        cy.get('[data-cy="product-edit"]').should('be.visible');
    })
})