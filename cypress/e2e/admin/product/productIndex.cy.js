/* eslint-disable */
describe('Admin Product Index', () => {
    describe('navigate to product index page', () => {
        it('shows the page correctly', () => {
            cy.intercept('GET', 'https://localhost:44305/api/v1/Product', { statusCode: 200, fixture: 'products.json' }).as('getProducts')

            cy.login('admin')

            cy.visit('http://localhost:5173/admin/products')

            cy.get('[data-cy="product-row"]').should('be.visible')
        })
    })
})
