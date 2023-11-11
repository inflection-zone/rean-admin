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
      cy.contains('Lab-Records').click()
      cy.wait(2000)
      cy.get(':nth-child(2) > :nth-child(7) > .btn > .text-lg').click()
      cy.wait(2000)
      cy.get('input[name=typeName]').clear()
      cy.wait(2000)
      cy.get('input[name=typeName]').type('bdfbdfbdf')
      cy.wait(2000)
      cy.get('input[name=displayName]').clear()
      cy.wait(2000)
      cy.get('input[name=displayName]').type('jghngfnfg')
      cy.wait(2000)
      cy.get('input[name=snowmedCode]').clear()
      cy.wait(2000)
      cy.get('input[name=snowmedCode]').type('khmnghn')
      cy.wait(2000)
      cy.get('input[name=loincCode]').clear()
      cy.wait(2000)
      cy.get('input[name=loincCode]').type('hgfbfb')
      cy.wait(2000)
      cy.get('input[name=normalRangeMin]').clear()
      cy.wait(2000)
      cy.get('input[name=normalRangeMin]').type('8')
      cy.wait(2000)
      cy.get('input[name=normalRangeMax]').clear()
      cy.wait(2000)
      cy.get('input[name=normalRangeMax]').type('1')
      cy.wait(2000)
      cy.get('input[name=unit]').clear()
      cy.wait(2000)
      cy.get('input[name=unit]').type('khmhgngf')
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Lab-Records').click()
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
      cy.contains('Lab-Records').scrollIntoView()
    })
	});
 

