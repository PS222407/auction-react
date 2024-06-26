/* eslint-disable */
describe('Admin Product Create', () => {
    describe('navigate to create product form', () => {
        beforeEach(() => {
            cy.intercept('GET', 'https://localhost:44305/api/v1/Category', { statusCode: 200, fixture: 'categories.json' }).as('getCategories')
            cy.intercept('POST', 'https://localhost:44305/api/v1/Product', { statusCode: 201, fixture: 'productCreate.json' }).as('createProduct')
            cy.intercept('GET', 'https://localhost:44305/api/v1/Product', { statusCode: 200, fixture: 'products.json' }).as('getProducts')

            cy.login('admin')

            cy.visit('http://localhost:5173/admin/products/create')
        })

        it('fills in valid data successfully', () => {
            cy.get('#name').type('Test Product')
            cy.get('#price').type('10.7')
            cy.get('#description').type('Test Description')
            cy.get('#image').selectFile('cypress/used_uploads/lilo.png')
            cy.get('#category').select('2')

            cy.get('[data-cy="product-submit"]').click()

            cy.get('[data-cy="product-row"]').should('be.visible')
        })

        it('fills in incomplete data and fails with errormessage', () => {
            cy.get('[data-cy="product-create"]').should('be.visible')

            cy.get('#name').type('Test Product')
            cy.get('#description').type('Test Description')
            cy.get('#image').selectFile('cypress/used_uploads/lilo.png')
            cy.get('#category').select('2')

            cy.get('[data-cy="product-submit"]').click()

            cy.get('[data-cy="form-errors"]').should('be.visible')
        })
    })
})
