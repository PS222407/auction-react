/* eslint-disable */
describe('Load Admin Dashboard', () => {
    it('passes', () => {
        cy.login('admin')

        cy.visit('http://localhost:5173/admin')

        cy.get('[data-cy="admin-dashboard"]').should('be.visible')
    })
})
