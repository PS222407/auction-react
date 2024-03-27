/* eslint-disable */
describe('Load Category Page', () => {
    it('passes', () => {
        cy.visit('http://localhost:5173/categories/2')

        cy.intercept("/config.json", { fixture: 'config.json' }).as('getConfig');
        cy.intercept("https://localhost:44305/api/v1/Category", { fixture: 'categories.json' }).as('getCategories');
        cy.intercept("https://localhost:44305/api/v1/Category/2", { fixture: 'category2.json' }).as('GetCategory2');
    })
})