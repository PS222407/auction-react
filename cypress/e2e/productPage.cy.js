/* eslint-disable */
describe('Load Product Page', () => {
    it('passes', () => {
        cy.intercept("GET","/config.json", { statusCode: 200, fixture: 'config.json' }).as('getConfig');
        cy.intercept("GET","https://localhost:44305/api/v1/Category", { statusCode: 200, fixture: 'categories.json' }).as('getCategories');
        cy.intercept("GET","https://localhost:44305/api/v1/Product/3", { statusCode: 200, fixture: 'product3.json' }).as('GetProduct3');

        cy.visit('http://localhost:5173/products/3')

        cy.get('[data-cy="product-name"]').should('be.visible');
    })
})
