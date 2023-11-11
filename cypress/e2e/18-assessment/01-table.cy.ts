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
      cy.contains('Clinical').click()
      cy.wait(2000)
      // eslint-disable-next-line no-useless-escape
      cy.contains('Assessments').click()
      cy.wait(2000)
      cy.get(':nth-child(2) > :nth-child(5) > .btn > .text-lg').click()
      cy.wait(2000)
      cy.get('input[name=title]').clear()
      cy.wait(2000)
      cy.get('input[name=title]').type('oyujmhynh')
      cy.wait(2000)
      cy.get('textarea[name=description]').clear()
      cy.wait(2000)
      cy.get('textarea[name=description]').type('mjmjhkhj')
      cy.wait(2000)
      cy.get('input[name=provider]').clear()
      cy.wait(2000)
      cy.get('input[name=provider]').type('ghhyhty')
      cy.wait(2000)
      cy.get('input[name=providerAssessmentCode]').clear()
      cy.wait(2000)
      cy.get('input[name=providerAssessmentCode]').type('kumjynhnh')
      cy.wait(2000)
      cy.get('input[name=serveListNodeChildrenAtOnce]').check().should('be.checked')
      cy.wait(2000)
      cy.get('input[name=scoringApplicable]').check().should('be.checked')
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Assessments').click()
      cy.wait(2000)
      cy.contains('→').scrollIntoView()
      cy.wait(2000)
      cy.contains('→').click()
      cy.wait(2000)
      cy.contains('←').click()
      cy.wait(2000)
      cy.get('select').select('20')
      cy.wait(2000)
      cy.get('select').select('10')
      cy.wait(2000)
      cy.contains('Assessments').scrollIntoView()
      cy.wait(2000)
      cy.get('input[name=title]').type('oyujmhynh')
      cy.wait(5000)
      cy.get('input[name=title]').clear()
      cy.wait(2000)
      cy.get('input[name=type]').type('daily update')
      cy.wait(5000)
      cy.get('input[name=type]').clear()
    })
	});
 

