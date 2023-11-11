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
      cy.get('select[class=select]').select('Web newsfeed')
      cy.wait(2000)
      cy.get(':nth-child(2) > :nth-child(6) > .btn > .text-lg').click()
      cy.wait(2000)
      cy.get('input[name=name]').clear()
      cy.wait(2000)
      cy.get('input[name=name]').type('condition')
      cy.wait(2000)
      cy.get('textarea[name=description]').clear()
      cy.wait(2000)
      cy.get('textarea[name=description]').type('Working out')
      cy.wait(2000)
      cy.get('input[name=pathUrl]').clear()
      cy.wait(2000)
      cy.get('input[name=pathUrl]').type('http://watchlearnlive.heart.org/CVML_Player.php?moduleSelect=hrtflr')
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Assets').click()
      cy.wait(2000)
      cy.get('select[class=select]').select('Web newsfeed')
      cy.wait(2000)
      cy.contains('→').scrollIntoView()
      cy.wait(2000)
      cy.contains('→').click()
      cy.wait(2000)
      cy.contains('←').click()
      cy.wait(2000)
      // cy.contains('Items').select('20 Items')
      // cy.wait(2000)
      // cy.contains('Items').select('10 Items')
      // cy.wait(2000)
      cy.contains('Assets').scrollIntoView()
      cy.wait(2000)
      cy.get('input[name=code]').type('Webnewsfeed-11')
      cy.wait(5000)
      cy.get('input[name=code]').clear()
      cy.wait(2000)
      cy.get('input[name=name]').type('Know your condition')
      cy.wait(5000)
      cy.get('input[name=name]').clear()
    })
	});
 

