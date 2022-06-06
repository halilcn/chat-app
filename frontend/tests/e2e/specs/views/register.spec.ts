import * as cypress from 'cypress';

//import { faker } from '@faker-js/faker';

describe('UserRegister', () => {
  //todo:unit ve e2e dosyaların aynı satırda olması
  //todo: tek render ile devam etme
  //todo: login olduysa store check etme
  //todo: validate olayları
  //todo: button click olayları
  //todo: data-testid için function ?
  //todo: data id her dosya export etse ?
  //todo: test'lerde local'de her zaman backend çalışmalı mı ?

  const nameSurnameElement = '[data-testid=nameSurname]';
  const usernameElement = '[data-testid=username]';
  const passwordElement = '[data-testid=password]';
  const registerButtonElement = '[data-testid=registerButton]';

  beforeEach(() => {
    cy.visit('/register');
  });

  it('form elements should be correct ', () => {
    const nameSurname = 'a'; //faker.name.firstName();
    const username = 'b'; //faker.internet.userName();
    const password = 'c'; //faker.internet.password();

    cy.get(nameSurnameElement).type(nameSurname).should('have.value', nameSurname);
    cy.get(usernameElement).type(username).should('have.value', username);
    cy.get(passwordElement).type(password).should('have.value', password);
    cy.get(registerButtonElement).should('exist');
  });

  it('localstorage should has user token', () => {
    const nameSurname = 'a'; //faker.name.firstName();
    const username = 'b'; //faker.internet.userName();
    const password = 'c'; //faker.internet.password();

    cy.get(nameSurnameElement).type(nameSurname).get(usernameElement).type(username).get(passwordElement).type(password);

    cy.get(registerButtonElement).click(); //todo: api'ye post gidiyor ?

    expect(localStorage.getItem('user')).to.not.undefined; //todo: localStorage bakılcak mı?
  });
});
