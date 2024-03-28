/* eslint-disable */
describe('Load Admin Auction Create', () => {
    it('passes', () => {
        cy.login('admin');

        cy.visit('http://localhost:5173/admin');

        cy.intercept("/config.json", { fixture: 'config.json' }).as('getConfig');
        cy.intercept("https://localhost:44305/api/v1/Product", { fixture: 'products.json' }).as('getProducts');
    })
})
