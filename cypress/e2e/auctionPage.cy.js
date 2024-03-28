/* eslint-disable */
describe('Load Category Page', () => {
    it('passes', () => {
        cy.intercept("/config.json", { fixture: 'config.json' }).as('getConfig');
        cy.intercept("https://localhost:44305/api/v1/Category", { fixture: 'categories.json' }).as('getCategories');
        cy.intercept("https://localhost:44305/api/v1/Auction/3", { fixture: 'auction3.json' }).as('GetAuction3');

        cy.visit('http://localhost:5173/auctions/3')

        cy.get('[data-cy="auction-title"]').should('be.visible');
    })
})
