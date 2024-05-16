/* eslint-disable */
describe('Admin Product Edit', () => {
    describe('navigate to edit product form', () => {
        beforeEach(() => {
            cy.intercept('GET', 'https://localhost:44305/api/v1/Category', { statusCode: 200, fixture: 'categories.json' }).as('getCategories')
            cy.intercept('GET', 'https://localhost:44305/api/v1/Product/3', { statusCode: 200, fixture: 'product3.json' }).as('getProduct3')
            cy.intercept('PUT', 'https://localhost:44305/api/v1/Product/3', { statusCode: 204 }).as('editProduct3')
            cy.intercept('GET', 'https://localhost:44305/api/v1/Product', { statusCode: 200, fixture: 'products.json' }).as('getProducts')

            cy.login('admin')

            cy.visit('http://localhost:5173/admin/products/3/edit')
        })

        it('fills in valid data successfully', () => {
            cy.get('[data-cy="product-edit"]').should('be.visible')

            cy.get('#name').clear().type('Test Product')
            cy.get('#description').clear().type('Test Description')
            cy.get('#image').selectFile('cypress/used_uploads/lilo.png')
            cy.get('#category').select('3')

            cy.get('[data-cy="product-submit"]').click()

            cy.get('[data-cy="product-row"]').should('be.visible')
        })

        it('fills in incomplete data and fails with errormessage', () => {
            cy.get('[data-cy="product-edit"]').should('be.visible')

            cy.get('#name').clear()
            cy.get('#description').clear().type('Test Description')
            cy.get('#image').selectFile('cypress/used_uploads/lilo.png')
            cy.get('#category').select('3')

            cy.get('[data-cy="product-submit"]').click()

            cy.get('[data-cy="form-errors"]').should('be.visible')
        })
    })
})
