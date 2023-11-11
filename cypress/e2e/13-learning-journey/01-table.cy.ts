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
      cy.contains('Learning Journey').click()
      cy.wait(2000)
      cy.get(':nth-child(2) > :nth-child(6) > a > .svelte-fa').click()
      cy.wait(2000)
      cy.get('input[name=name]').clear()
      cy.wait(2000)
      cy.get('input[name=name]').type('khtnt')
      cy.wait(2000)
      cy.get('input[name=preferenceWeight]').clear()
      cy.wait(2000)
      cy.get('input[name=preferenceWeight]').type('2')
      cy.wait(2000)
      cy.get('textarea[name=description]').clear()
      cy.wait(2000)
      cy.get('textarea[name=description]').type('mhnbgfbf')
      cy.wait(2000)
      cy.get('input[name=durationInDays]').clear()
      cy.wait(2000)
      cy.get('input[name=durationInDays]').type('4')
      cy.wait(2000)
      cy.get('select[name=courseIds]').select('English')
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Learning-Journeys').click()
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
      cy.wait(2000)
      cy.get('input[name=name]').type('khtnt')
      cy.wait(5000)
      cy.get('input[name=name]').clear()
      cy.wait(2000)
      cy.get('input[name=preferenceWeight]').type('2')
      cy.wait(5000)
      cy.get('input[name=preferenceWeight]').clear()
    })
	});
 

