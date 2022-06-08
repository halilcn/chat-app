import * as cypress from 'cypress';

import userRegisterElement from '../../../elements/user-register-element';

describe('UserRegister', () => {
  //todo: !

  const nameSurname = 'a'; //faker.name.firstName();
  const username = 'va'; //faker.internet.userName();
  const password = 'vw'; //faker.internet.password();

  before(() => {
    cy.visit('/register');
  });

  it('form elements should be correct', () => {
    cy.get(userRegisterElement.nameSurname).type(nameSurname).should('have.value', nameSurname);
    cy.get(userRegisterElement.username).type(username).should('have.value', username);
    cy.get(userRegisterElement.password).type(password).should('have.value', password);
    cy.get(userRegisterElement.registerButton).should('exist');
  });

  it('button should click', () => {
    cy.get(userRegisterElement.registerButton).click();
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
