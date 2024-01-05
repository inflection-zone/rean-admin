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
      cy.contains('Educational').click()
      cy.wait(2000)
      // eslint-disable-next-line no-useless-escape
      cy.contains('Knowledge Nuggets').click()
      cy.wait(2000)
      cy.get(':nth-child(2) > :nth-child(5) > .btn > .text-lg').click()
      cy.wait(2000)
      cy.get('input[name=topicName]').clear()
      cy.wait(2000)
      cy.get('input[name=topicName]').type('ybrgbgr')
      cy.wait(2000)
      cy.get('textarea[name=briefInformation]').clear()
      cy.wait(2000)
      cy.get('textarea[name=briefInformation]').type('jgtbggr')
      cy.wait(2000)
      cy.get('textarea[name=detailedInformation]').clear()
      cy.wait(2000)
      cy.get('textarea[name=detailedInformation]').type('mhgbgbf')
      cy.wait(2000)
      cy.get('input[name=additionalResources]').clear()
      cy.wait(2000)
      cy.get('input[name=additionalResources]').type('jnhgbfg')
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Knowledge-Nuggets').click()
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
      cy.contains('Knowledge-Nuggets').scrollIntoView()
      cy.wait(2000)
      cy.get('input[name=topicName]').type('ybrgbgr')
      cy.wait(5000)
      cy.get('input[name=topicName]').clear()
      cy.wait(2000)
      cy.get('input[name=tags]').type('BP')
      cy.wait(5000)
      cy.get('input[name=tags]').clear()
    })
	});
 

