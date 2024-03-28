/* eslint-disable */
describe('Load Admin Auction Index', () => {
    it('passes', () => {
        cy.login('admin');

        cy.visit('http://localhost:5173/admin/auctions');

        cy.intercept("/config.json", { fixture: 'config.json' }).as('getConfig');
        cy.intercept("https://auction.jensramakers.nl/api/v1/Auction", { fixture: 'auctions.json' }).as('getAuctions');
    })
})
