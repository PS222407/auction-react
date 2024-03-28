/* eslint-disable */
describe('Register', () => {
    it('passes', () => {
        cy.visit('http://localhost:5173/register')

        cy.intercept("/config.json", { fixture: 'config.json' }).as('getConfig');
        cy.intercept("https://localhost:44305/api/v1/Category", { fixture: 'categories.json' }).as('getCategories');

        cy.get('#email').type(`register@gmail.com`);
        cy.get('#password').type('password123456789');
        cy.get('#password-confirm').type('password123456789');
        cy.get('#register-button').click();

        cy.intercept('POST', 'https://localhost:44305/api/register', {statusCode: 204}).as('register');
    })
})

describe('Login', () => {
    it('passes', () => {
        cy.login('admin')
    })
})
