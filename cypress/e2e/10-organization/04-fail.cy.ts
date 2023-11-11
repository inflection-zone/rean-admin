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
      cy.contains('Miscellaneous').click()
      cy.wait(2000)
      // eslint-disable-next-line no-useless-escape
      cy.contains('Organizations').click()
      cy.wait(2000)
      cy.contains('Add New').click()
      cy.wait(2000)
      cy.get('input[name=name]').type('or')
      cy.wait(2000)
      cy.get('select[name=countryCode]').select('+91')
      cy.wait(2000)
      cy.get('input[name=contactPhone]').type('+91-123670')
      cy.wait(2000)
      cy.get('input[name=contactEmail]').type('abc')
      cy.wait(2000)
      cy.get('select[name=addressType]').select('Office')
      cy.wait(2000)
      cy.get('input[name=addressLine]').type('a/p-pune')
      cy.wait(2000)
      cy.get('input[name=city]').type('pune')
      cy.wait(2000)
      cy.get('input[name=district]').type('pune')
      cy.wait(2000)
      cy.get('select[name=state]').select('Maharashtra')
      cy.wait(2000)
      cy.get('input[name=country]').type('India')
      cy.wait(2000)
      cy.get('input[name=postalCode').type('412301')
      cy.wait(2000)
      cy.get('input[name=fileinput]').attachFile(filePath)
      cy.wait(2000)
      cy.get('input[name=isHealthFacility').check().should('be.checked')
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(7000)
      cy.contains('Organizations').click()
    })
	});
 

