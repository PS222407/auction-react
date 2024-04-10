/* eslint-disable */
describe('Load Admin Auction Create', () => {
    it('passes', () => {
        cy.intercept('GET', 'https://localhost:44305/api/v1/Product', { statusCode: 200, fixture: 'products.json' }).as('getProducts')
        cy.intercept('POST', 'https://localhost:44305/api/v1/Auction', { statusCode: 201, fixture: 'productCreate' }).as('createAuction')
        cy.intercept('GET', 'https://localhost:44305/api/v1/Auction', { statusCode: 200, fixture: 'auctions.json' }).as('getAuctions')

        cy.login('admin')

        cy.visit('http://localhost:5173/admin/auctions/create')

        cy.get('[data-cy="auction-create"]').should('be.visible')

        cy.get('#product').select('4')
        cy.get('#startDateTime').type('2024-03-29T15:50')
        cy.get('#durationInSeconds').type('3589')
        cy.get('[data-cy="auction-submit"]').click()

        cy.get('[data-cy="auction-row"]').should('be.visible')
    })
})
