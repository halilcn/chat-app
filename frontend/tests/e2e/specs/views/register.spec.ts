import * as cypress from 'cypress';
import { faker } from '@faker-js/faker';
import userRegisterElement from '../../../elements/user-register-element';

describe('UserRegister', () => {
  //todo: login olduysa store check etme
  //todo: validate olayları
  //todo: button click olayları
  //todo: test'lerde local'de her zaman backend çalışmalı mı ?
  //todo: api'ye post gidiyor ?

  const nameSurname = 'a'; // faker.name.firstName();
  const username = 'b'; //faker.internet.userName();
  const password = 'c'; //faker.internet.password();

  before(() => {
    cy.visit('/register');
  });

  it('form elements should be correct ', () => {
    cy.get(userRegisterElement.nameSurname).type(nameSurname).should('have.value', nameSurname);
    cy.get(userRegisterElement.username).type(username).should('have.value', username);
    cy.get(userRegisterElement.password).type(password).should('have.value', password);
    cy.get(userRegisterElement.registerButton).should('exist');
  });

  it('button should click', () => {
    cy.get(userRegisterElement.registerButton).click();
  });

  it('localstorage should has user', () => {
    cy.getLocalStorage('user').should('equal', 'true');
  });
});
