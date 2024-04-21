/* eslint-disable */
describe('Admin Category Create', () => {
    it('passes', () => {
        cy.intercept('POST', 'https://localhost:44305/api/v1/Category', { statusCode: 201, fixture: 'categoryCreate.json' }).as('createCategory')
        cy.intercept('GET', 'https://localhost:44305/api/v1/Category', { statusCode: 200, fixture: 'categories.json' }).as('getCategories')

        cy.login('admin')

        cy.visit('http://localhost:5173/admin/categories/create')

        cy.get('[data-cy="category-create"]').should('be.visible')

        cy.get('#name').type('Category Name')
        cy.get('#icon').type('Category Icon')
        cy.get('[data-cy="category-submit"]').click()

        cy.get('[data-cy="category-row"]').should('be.visible')
    })
})
