/// <reference types="cypress" />

import login from '../pageObjects/login/login-test';

describe('test', () => {
	it.only('LoginTest', function () {
    const filePath = 'image1.jpg';
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
      cy.contains('Notices').click()
      cy.wait(2000)
      cy.contains('Add New').click()
      cy.wait(2000)
      cy.get('input[name=title]').type('Associate-Finance Processes and Operation')
      cy.wait(2000)
      cy.get('textarea[name=description]').type('abcs')
      cy.wait(2000)
      cy.get('input[name=link]').type('https://github.com/REAN-Foundation/reancare-service/pull/290')
      cy.wait(2000)
      cy.get('input[name=daysActive]').type('7')
      cy.wait(2000)
      cy.get('input[name=action]').type('Apply for job')
      cy.wait(2000)
      cy.get('input[name=fileinput]').attachFile(filePath)
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Edit').click()
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Notices').click()
    })
	});
 

