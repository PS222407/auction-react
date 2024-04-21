/* eslint-disable */
describe('Admin Product Index', () => {
    it('passes', () => {
        cy.intercept('GET', 'https://localhost:44305/api/v1/Product', { statusCode: 200, fixture: 'products.json' }).as('getProducts')

        cy.login('admin')

        cy.visit('http://localhost:5173/admin/products')

        cy.get('[data-cy="product-row"]').should('be.visible')
    })
})
