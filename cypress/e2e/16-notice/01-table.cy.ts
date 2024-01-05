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
      cy.contains('Miscellaneous').click()
      cy.wait(2000)
      cy.contains('Notices').scrollIntoView()
      cy.wait(2000)
      // eslint-disable-next-line no-useless-escape
      cy.contains('Notices').click()
      cy.wait(2000)
      cy.get(':nth-child(2) > :nth-child(6) > .btn > .text-lg').click()
      cy.wait(2000)
      cy.get('input[name=title]').clear()
      cy.wait(2000)
      cy.get('input[name=title]').type('jnhbngtb')
      cy.wait(2000)
      cy.get('textarea[name=description]').clear()
      cy.wait(2000)
      cy.get('textarea[name=description]').type('bgtbgr')
      cy.wait(2000)
      cy.get('input[name=link]').clear()
      cy.wait(2000)
      cy.get('input[name=link]').type('https://gitbash.com/REAN-Foundation/reancare-service/pull/290')
      cy.wait(2000)
      cy.get('input[name=daysActive]').clear()
      cy.wait(2000)
      cy.get('input[name=daysActive]').type('9')
      cy.wait(2000)
      cy.get('input[name=action]').clear()
      cy.wait(2000)
      cy.get('input[name=action]').type('trvtt')
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Notices').click()
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
      cy.contains('Notices').scrollIntoView()
      cy.wait(2000)
      cy.get('input[name=title]').type('jnhbngtb')
      cy.wait(5000)
      cy.get('input[name=title]').clear()
      cy.wait(2000)
      cy.get('input[name=daysActive]').type('6')
      cy.wait(2000)
      cy.get('input[name=daysActive]').clear()
    })
	});
 

