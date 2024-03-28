/* eslint-disable */
describe('Load Admin Auction Index', () => {
    it('passes', () => {
        cy.intercept("/config.json", { fixture: 'config.json' }).as('getConfig');
        cy.intercept("https://localhost:44305/api/v1/Auction", { statusCode: 200, fixture: 'auctions.json' }).as('getAuctions');

        cy.login('admin');

        cy.visit('http://localhost:5173/admin/auctions');

        cy.get('[data-cy="auction-row"]').should('be.visible');
    })
})


