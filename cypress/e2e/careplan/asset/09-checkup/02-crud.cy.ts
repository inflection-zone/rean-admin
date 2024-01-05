/// <reference types="cypress" />

import login from '../../../pageObjects/login/login-test';

describe('test', () => {
	it.only('LoginTest', function () {
		cy.visit('http://localhost:5173/');

		cy.fixture('login').then((data) => {
			const ln = new login();
      cy.wait(3000)
			ln.setUserName(data.username);
			ln.setPassword(data.password);
			ln.clickLogin();
		});
    cy.wait(3000)
      cy.get('.app-bar-slot-lead > .flex').click()
      cy.wait(2000)
      cy.contains('Clinical').click()
      cy.wait(2000)
      // eslint-disable-next-line no-useless-escape
      cy.contains('Careplan').click()
      cy.wait(2000)
      cy.contains('Assets').click()
      cy.wait(2000)
      cy.get('select[class=select]').select('Checkup')
      cy.wait(2000)
      cy.contains('Add New').click()
      cy.wait(2000)
      cy.get('input[name=name]').type('Chest X-ray')
      cy.wait(2000)
      cy.get('textarea[name=description]').type('Studies confirm that working out with a partner significantly increases time spent exercising. A study by the Society of Behavioral Medicine showed that working with a partner, especially in a team format, improved performance, doubling the workout time of those who exercised alone.')
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Edit').click()
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Assets').click()
    })
	});
 

