import userLoginElement from '../../../elements/user-login-element';

import { faker } from '@faker-js/faker';

describe('UserLogin', () => {
  const username = faker.internet.userName();
  const password = faker.internet.password();
  const nameSurname = faker.name.firstName();

  before(() => {
    cy.request('POST', `${Cypress.env('apiUrlV1') + 'user-action/register'}`, {
      username,
      nameSurname,
      password
    });

    cy.visit('/login');
  });

  it('form elements should be correct', () => {
    cy.get(userLoginElement.username).type(username).should('have.value', username);
    cy.get(userLoginElement.password).type(password).should('have.value', password);

    cy.get(userLoginElement.loginButton).should('exist');
  });

  it('button should click', () => {
    cy.get(userLoginElement.loginButton).click();
  });

  it('localstorage should has user', () => {
    setTimeout(() => {
      cy.getLocalStorage('user').should('equal', 'true');
    }, 1000);
  });

  it('url should redirect to dashboard', () => {
    cy.url().should('contain', '/dashboard');
  });
});
