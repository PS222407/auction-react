/* eslint-disable */
describe('Admin Category Edit', () => {
    it('passes', () => {
        cy.intercept('GET', 'https://localhost:44305/api/v1/Category/2', { statusCode: 200, fixture: 'category2.json' }).as('getCategory2')
        cy.intercept('PUT', 'https://localhost:44305/api/v1/Category/2', { statusCode: 204 }).as('updateCategory')
        cy.intercept('GET', 'https://localhost:44305/api/v1/Category', { statusCode: 200, fixture: 'categories.json' }).as('getCategories')

        cy.login('admin')

        cy.visit('http://localhost:5173/admin/categories/2/edit')

        cy.get('#name').clear().type('Category Name')
        cy.get('#icon').clear().type('Category Icon')
        cy.get('[data-cy="category-submit"]').click()

        cy.get('[data-cy="category-row"]').should('be.visible')
    })
})
