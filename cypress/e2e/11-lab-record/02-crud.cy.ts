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
      cy.contains('Clinical').click()
      cy.wait(2000)
      cy.contains('Lab-Records').click()
      cy.wait(2000)
      cy.contains('Add New').click()
      cy.wait(2000)
      cy.get('input[name=typeName]').type('Cholesterol')
      cy.wait(2000)
      cy.get('input[name=displayName]').type('Total Cholesterol')
      cy.wait(2000)
      cy.get('input[name=snowmedCode]').type('iSopqr')
      cy.wait(2000)
      cy.get('input[name=loincCode]').type('iSPqAb0A')
      cy.wait(2000)
      cy.get('input[name=normalRangeMin]').type('150')
      cy.wait(2000)
      cy.get('input[name=normalRangeMax]').type('250')
      cy.wait(2000)
      cy.get('input[name=unit]').type('mg/dL')
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Edit').click()
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Lab-Records').click()
    })
	});
 

