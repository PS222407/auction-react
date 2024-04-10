/* eslint-disable */
describe('Category Page', () => {
    it('passes', () => {
        cy.intercept('GET', '/config.json', { statusCode: 200, fixture: 'config.json' }).as('getConfig')
        cy.intercept('GET', 'https://localhost:44305/api/v1/Category', { statusCode: 200, fixture: 'categories.json' }).as('getCategories')
        cy.intercept('GET', 'https://localhost:44305/api/v1/Auction/3', { statusCode: 200, fixture: 'auction3.json' }).as('GetAuction3')

        cy.visit('http://localhost:5173/auctions/3')

        cy.get('[data-cy="auction-title"]').should('be.visible')
    })
})
