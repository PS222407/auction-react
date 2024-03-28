/* eslint-disable */
describe('Load Admin Auction Edit', () => {
    it('passes', () => {
        cy.intercept("GET", "https://localhost:44305/api/v1/Product", { statusCode: 200, fixture: 'products.json' }).as('getProducts');
        cy.intercept("GET","https://localhost:44305/api/v1/Auction/3", { statusCode: 200, fixture: 'auction3.json' }).as('GetAuction3');
        cy.intercept("PUT","https://localhost:44305/api/v1/Auction/3", { statusCode: 204 }).as('UpdateAuction');
        cy.intercept("GET","https://localhost:44305/api/v1/Auction", { statusCode: 200, fixture: 'auctions.json' }).as('getAuctions');

        cy.login('admin');

        cy.visit('http://localhost:5173/admin/auctions/3/edit');

        cy.get('[data-cy="auction-edit"]').should('be.visible');

        cy.get('#product').select('4');
        cy.get('#startDateTime').type('2024-03-29T15:50');
        cy.get('#durationInSeconds').clear().type('3589');
        cy.get('[data-cy="auction-submit"]').click();

        cy.get('[data-cy="auction-row"]').should('be.visible');
    })
})
