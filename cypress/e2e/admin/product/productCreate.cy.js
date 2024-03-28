/* eslint-disable */
describe('Load Admin Product Create', () => {
    it('passes', () => {
        cy.intercept("GET","https://localhost:44305/api/v1/Category", { statusCode: 200, fixture: 'categories.json' }).as('getCategories');

        cy.login('admin');

        cy.visit('http://localhost:5173/admin/products/create');

        cy.get('[data-cy="product-create"]').should('be.visible');
    })
})