/* eslint-disable */
describe('Load Admin Category Create', () => {
    it('passes', () => {
        cy.intercept("/config.json", { fixture: 'config.json' }).as('getConfig');

        cy.login('admin');

        cy.visit('http://localhost:5173/admin/categories/create');

        cy.get('[data-cy="category-create"]').should('be.visible');
    })
})



