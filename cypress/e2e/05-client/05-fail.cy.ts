/// <reference types="cypress" />

import login from '../pageObjects/login/login-test';

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
      // eslint-disable-next-line no-useless-escape
      cy.contains('Miscellaneous').click()
      cy.wait(2000)
      cy.contains('Clients').click()
      cy.wait(2000)
      cy.contains('Add New').click()
      cy.wait(2000)
      cy.get('input[name=clientName]').type('cname')
      cy.wait(2000)
      cy.get('input[name=password]').type('svdevd')
      cy.wait(2000)
      cy.get('input[name=phone').type('987867463')
      cy.wait(2000)
      cy.get('input[name=email]').type('abc')
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(7000)
      cy.contains('Clients').click()
    })
	});
 

