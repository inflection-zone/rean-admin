/// <reference types="cypress" />

import login from '../../../pageObjects/login/login-test';

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
      cy.contains('Careplan').click()
      cy.wait(2000)
      cy.contains('Assets').click()
      cy.wait(2000)
      cy.get('select[class=select]').select('Message')
      cy.wait(2000)
      cy.contains('Add New').click()
      cy.wait(2000)
      cy.get('input[name=name]').type('Scheduling at the start of the day makes execution simpler!')
      cy.wait(2000)
      cy.get('textarea[name=description]').type('"1) Write out your plan every day. 2) Plan at the same time every day. 3) Brainstorm a quick to-do list. 4) Divide your task list between Work and Life. ...')
      cy.wait(2000)
      cy.get('select[name=messageType]').select('Educational')
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Edit').click()
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Assets').click()
    })
	});
 

