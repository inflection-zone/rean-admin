/// <reference types="cypress" />

import login from '../pageObjects/login/login-test';

describe('test', () => {
	it.only('LoginTest', function () {
    const filePath = 'image.jpg';
    const file = 'image1.jpg';
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
      cy.contains('Assessments').click()
      cy.wait(2000)  
      cy.get('.absolute > .btn').click()
      cy.wait(2000)
      cy.get('input[name=title]').type('rb')
      cy.wait(2000)
      cy.get('textarea[name=description]').type('rgrtg')
      cy.wait(2000)
      cy.get('input[name=provider]').type('ascascas')
      cy.wait(2000)
      cy.get('input[name=providerAssessmentCode]').type('dfwqfqwqwf')
      cy.wait(2000)
      cy.get('input[name=serveListNodeChildrenAtOnce]').check().should('be.checked')
      cy.wait(2000)
      cy.get('input[name=scoringApplicable]').check().should('be.checked')
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      // cy.contains('Edit').click()
      // cy.wait(2000)
      // cy.get('button[type=submit]').click()
      // cy.wait(2000)
      // cy.get(':nth-child(1) > .text-primary-primary-500').click()   
    })
	});
 

