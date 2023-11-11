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
      cy.contains('Drug').click()
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
      cy.contains('Drugs').scrollIntoView()
      cy.wait(2000)
      cy.get(':nth-child(2) > :nth-child(6) > .btn > .text-lg').click()
      cy.wait(2000)
      cy.get('input[name=drugName]').clear()
      cy.wait(2000)
      cy.get('input[name=drugName]').type('Dndxeame')
      cy.wait(2000)
      cy.get('input[name=genericName]').clear()
      cy.wait(2000)
      cy.get('input[name=genericName]').type('Paracetamol')
      cy.wait(2000)
      cy.get('input[name=ingredients]').clear()
      cy.wait(2000)
      cy.get('input[name=ingredients]').type('cdeee')
      cy.wait(2000)
      cy.get('select[name=strength]').select('High')
      cy.wait(2000)
      cy.get('input[name=otherCommercialNames]').clear()
      cy.wait(2000)
      cy.get('input[name=otherCommercialNames]').type('trcfr')
      cy.wait(2000)
      cy.get('input[name=manufacturer]').clear()
      cy.wait(2000)
      cy.get('input[name=manufacturer]').type('ergreer')
      cy.wait(2000)
      cy.get('input[name=otherInformation]').clear()
      cy.wait(2000)
      cy.get('input[name=otherInformation]').type('sdufdfss')
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Drugs').click()
      cy.wait(2000)
      cy.get('input[name=drugName]').type('Dndxeame')
      cy.wait(5000)
      cy.get('input[name=drugName]').clear()
      cy.wait(2000)
      cy.get('input[name=genericName]').type('Paracetamol')
      cy.wait(5000)
      cy.get('input[name=genericName]').clear()
      cy.wait(2000)

    })
	});
 

