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

describe('Load Admin Auction Create', () => {
    it('passes', () => {
        cy.intercept("/config.json", { fixture: 'config.json' }).as('getConfig');
        cy.intercept("https://localhost:44305/api/v1/Product", { fixture: 'products.json' }).as('getProducts');

        cy.login('admin');

        cy.visit('http://localhost:5173/admin/auctions/create');
        cy.get('[data-cy="auction-create"]').should('be.visible');
    })
})

describe('Load Admin Auction Edit', () => {
    it('passes', () => {
        cy.intercept("/config.json", { fixture: 'config.json' }).as('getConfig');
        cy.intercept("https://localhost:44305/api/v1/Product", { fixture: 'products.json' }).as('getProducts');
        cy.intercept("https://localhost:44305/api/v1/Auction/3", { fixture: 'auction3.json' }).as('GetAuction3');

        cy.login('admin');

        cy.visit('http://localhost:5173/admin/auctions/3/edit');
        cy.get('[data-cy="auction-edit"]').should('be.visible');
    })
})
