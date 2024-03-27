/* eslint-disable */

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (role) => {
    cy.visit('http://localhost:5173/login')

    cy.intercept("/config.json", { fixture: 'config.json' }).as('getConfig');
    cy.intercept("https://localhost:44305/api/v1/Category", { fixture: 'categories.json' }).as('getCategories');

    cy.get('#email').type(`${role}@gmail.com`);
    cy.get('#password').type('password123456789');
    cy.get('#login-button').click();

    cy.intercept('POST','https://localhost:44305/api/Login', { statusCode: 200, fixture: 'loginAdmin.json' }).as('loginAdmin');
    cy.wait('@loginAdmin');

    cy.intercept('GET', 'https://localhost:44305/api/v1/Category', { fixture: 'categories.json' }).as('getCategories');
});