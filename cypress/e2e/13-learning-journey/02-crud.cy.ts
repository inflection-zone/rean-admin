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
      cy.contains('Educational').click()
      cy.wait(2000)
      // eslint-disable-next-line no-useless-escape
      cy.contains('Learning Journey').click()
      cy.wait(2000)
      cy.contains('Add New').click()
      cy.wait(2000)
      cy.get('input[name=name]').type('Growing Up')
      cy.wait(2000)
      cy.get('input[name=preferenceWeight]').type('100')
      cy.wait(2000)
      cy.get('textarea[name=description]').type('hgfbgbfgbf')
      cy.wait(2000)
      cy.get('input[name=durationInDays]').type('60')
      cy.wait(2000)
      cy.get('input[name=courses]').type('English')
      cy.wait(2000)
      cy.get('input[name=fileinput]').attachFile(filePath)
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Edit').click()
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Learning-Journeys').click()
    })
	});
 

