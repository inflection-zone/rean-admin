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
      cy.contains('Clinical').click()
      cy.wait(2000)
      // eslint-disable-next-line no-useless-escape
      cy.contains('Symptoms').click()
      cy.wait(2000)
      cy.get(':nth-child(2) > :nth-child(6) > .btn > .text-lg').click()
      cy.wait(2000)
      cy.get('input[name=symptom]').clear()
      cy.wait(2000)
      cy.get('input[name=symptom]').type('vdfv')
      cy.wait(2000)
      cy.get('textarea[name=description]').clear()
      cy.wait(2000)
      cy.get('textarea[name=description]').type('mhgngngfb')
      cy.wait(2000)
      cy.get('input[name=language]').clear()
      cy.wait(2000)
      cy.get('input[name=language]').type('mghngfbf')
      cy.wait(2000)
      cy.get('input[name=fileinput]').attachFile(filePath)
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Symptoms').click()
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
      cy.contains('Symptoms').scrollIntoView()
      cy.wait(2000)
      cy.get('input[name=symptom]').type('vdfv')
      cy.wait(5000)
      cy.get('input[name=symptom]').clear()
      cy.wait(2000)
      cy.get('input[name=tags]').type('Sleeplessness')
      cy.wait(5000)
      cy.get('input[name=tags]').clear()
    })
	});
 

