/* eslint-disable */
describe('Load Admin Category Index', () => {
    it('passes', () => {
        cy.intercept("/config.json", { fixture: 'config.json' }).as('getConfig');
        cy.intercept("https://localhost:44305/api/v1/Category", { fixture: 'categories.json' }).as('getCategories');

        cy.login('admin');

        cy.visit('http://localhost:5173/admin/categories');

        cy.get('[data-cy="category-row"]').should('be.visible');
    })
})

describe('Load Admin Category Create', () => {
    it('passes', () => {
        cy.intercept("/config.json", { fixture: 'config.json' }).as('getConfig');

        cy.login('admin');

        cy.visit('http://localhost:5173/admin/categories/create');

        cy.get('[data-cy="category-create"]').should('be.visible');
    })
})

describe('Load Admin Category Edit', () => {
    it('passes', () => {
        cy.intercept("/config.json", { fixture: 'config.json' }).as('getConfig');
        cy.intercept("https://localhost:44305/api/v1/Category/3", { fixture: 'category2.json' }).as('getCategory2');

        cy.login('admin');

        cy.visit('http://localhost:5173/admin/categories/2/edit');

        cy.get('[data-cy="category-edit"]').should('be.visible');
    })
})
