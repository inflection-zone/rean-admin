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
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Add Assessment Node').click()
      cy.wait(2000)
      cy.contains('Assessment-Nodes').click()
      cy.wait(2000)
      cy.get(':nth-child(1) > :nth-child(5) > .btn > .text-lg').click()
      cy.wait(2000)
      cy.get('select[name=nodeType]').select('Node list')
      cy.wait(2000)
      cy.get('input[name=title]').clear()
      cy.wait(2000)
      cy.get('input[name=title]').type('kghnjgfjgf')
      cy.wait(2000)
      cy.get('textarea[name=description]').clear()
      cy.wait(2000)
      cy.get('textarea[name=description]').type('khmmnjgfngfb')
      cy.wait(2000)
      cy.get('input[name=sequence]').clear()
      cy.wait(2000)
      cy.get('input[name=sequence]').type('9')
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Assessment-Nodes').click()
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
      cy.get('input[name=title]').type('kghnjgfjgf')
      cy.wait(5000)
      cy.get('input[name=title]').clear()
      cy.wait(2000)
      cy.get('input[name=type]').type('Message')
      cy.wait(5000)
      cy.get('input[name=type]').clear()
      cy.wait(2000)
      cy.contains('Assessments').click() 
    })
	});
 

