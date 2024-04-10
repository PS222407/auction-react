/* eslint-disable */
describe('Admin Auction Index', () => {
    it('passes', () => {
        cy.intercept('GET', 'https://localhost:44305/api/v1/Auction', { statusCode: 200, fixture: 'auctions.json' }).as('getAuctions')

        cy.login('admin')

        cy.visit('http://localhost:5173/admin/auctions')

        cy.get('[data-cy="auction-row"]').should('be.visible')
    })
})
