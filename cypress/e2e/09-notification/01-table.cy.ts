/// <reference types="cypress" />

import login from '../pageObjects/login/login-test';

describe('test', () => {
	it.only('LoginTest', function () {
    const filePath = 'image.jpg';
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
      cy.contains('Miscellaneous').click()
      cy.wait(2000)
      // eslint-disable-next-line no-useless-escape
      cy.contains('Notifications').click()
      cy.wait(2000)
      cy.get(':nth-child(2) > :nth-child(6) > .btn > .text-lg').click()
      cy.wait(2000)
      cy.get('input[name=title]').clear()
      cy.wait(2000)
      cy.get('input[name=title]').type('gngf')
      cy.wait(2000)
      cy.get('textarea[name=body]').clear()
      cy.wait(2000)
      cy.get('textarea[name=body]').type('mjhmh')
      cy.wait(2000)
      cy.get('select[name=type]').select('General')
      cy.wait(2000)
      cy.get('input[name=broadcastToAll]').check().should('be.checked')
      cy.wait(2000)
      cy.get('input[name=fileinput]').attachFile(filePath)
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Notifications').click()
      cy.wait(2000)
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
      // cy.get(':nth-child(1) > .relative > .input').scrollIntoView()
      // cy.wait(2000)
      cy.get('input[name=title]').type('gngf')
      cy.wait(5000)
      cy.get('input[name=title]').clear()
      cy.wait(2000)
      cy.get('input[name=type]').type('Auto')
      cy.wait(5000)
      cy.get('input[name=type]').clear()
    })
	});
 

