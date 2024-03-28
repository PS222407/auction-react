/* eslint-disable */
describe('Load Category Page', () => {
    it('passes', () => {
        cy.intercept("GET","/config.json", { statusCode: 200, fixture: 'config.json' }).as('getConfig');
        cy.intercept("GET","https://localhost:44305/api/v1/Category", { statusCode: 200, fixture: 'categories.json' }).as('getCategories');
        cy.intercept("GET","https://localhost:44305/api/v1/Category/2", { statusCode: 200, fixture: 'category2.json' }).as('GetCategory2');

        cy.visit('http://localhost:5173/categories/2');

        cy.get('[data-cy="category-title"]').should('be.visible');
    })
})
