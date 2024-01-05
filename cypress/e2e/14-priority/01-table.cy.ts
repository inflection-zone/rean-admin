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
      cy.contains('Types').click()
      cy.wait(2000)
      // eslint-disable-next-line no-useless-escape
      cy.contains('Priorities').click()
      cy.wait(2000)
      cy.get(':nth-child(2) > :nth-child(5) > .btn > .text-lg').click()
      // cy.wait(2000)
      // cy.get('input[name=type]').clear()
      // cy.wait(2000)
      // cy.get('input[name=type]').type('utngfb')
      // cy.wait(2000)
      // cy.get(':nth-child(1) > .text-primary-primary-500').click()
      // cy.wait(2000)
      // cy.contains('→').scrollIntoView()
      // cy.wait(2000)
      // cy.contains('→').click()
      // cy.wait(2000)
      // cy.contains('←').click()
      // cy.wait(2000)
      // cy.get('select').select('20')
      // cy.wait(2000)
      // cy.get('select').select('10')
      // cy.wait(2000)
      // cy.contains('Priorities').scrollIntoView()
    })
	});
 

