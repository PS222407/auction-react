/* eslint-disable */
describe('Load Admin Product Create', () => {
    it('passes', () => {
        cy.intercept("GET","https://localhost:44305/api/v1/Category", { statusCode: 200, fixture: 'categories.json' }).as('getCategories');
        cy.intercept("POST","https://localhost:44305/api/v1/Product", { statusCode: 201, fixture: 'productCreate.json' }).as('createProduct');
        cy.intercept("GET","https://localhost:44305/api/v1/Product", { statusCode: 200, fixture: 'products.json' }).as('getProducts');

        cy.login('admin');

        cy.visit('http://localhost:5173/admin/products/create');

        cy.get('[data-cy="product-create"]').should('be.visible');

        cy.get('#name').type('Test Product');
        cy.get('#description').type('Test Description');
        cy.get('#image').selectFile('cypress/used_uploads/lilo.png');
        cy.get('#category').select('2');

        cy.get('[data-cy="product-submit"]').click();

        cy.get('[data-cy="product-row"]').should('be.visible');
    })
})