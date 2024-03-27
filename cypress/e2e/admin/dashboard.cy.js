/* eslint-disable */
describe('Load Admin Dashboard', () => {
    it('passes', () => {
        cy.login('admin');

        cy.visit('http://localhost:5173/admin');

        cy.intercept("/config.json", { fixture: 'config.json' }).as('getConfig');
    })
})
