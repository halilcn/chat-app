import * as cypress from 'cypress';

//import faker from '@faker-js/faker';

describe('UserLogin', () => {
  //todo:unit ve e2e dosyaların aynı satırda olması
  //todo: tek render ile devam etme
  //todo: login olduysa store check etme
  //todo: validate olayları
  //todo: button click olayları

  /* it('should be render', () => {
    cy.visit('/login');
  });*/

  it('form check ', () => {
    const username = '[data-testid=username]';
    const password = '[data-testid=password]';

    cy.visit('/login');

    cy.get(username).type('test-fake').should('have.value', 'test-fake');
    cy.get(password).type('test-fake').should('have.value', 'test-fake');
  });

  it('login check ', () => {
    const username = '[data-testid=username]';
    const password = '[data-testid=password]';
    const loginButton = '[data-testid=loginButton]';

    cy.visit('/login');

    cy.get(username).type('test-fake').should('have.value', 'test-fake');
    cy.get(password).type('test-fake').should('have.value', 'test-fake');

    cy.get(loginButton).click()
  });
});
