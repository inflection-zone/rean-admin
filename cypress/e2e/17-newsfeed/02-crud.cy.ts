/// <reference types="cypress" />

import login from '../pageObjects/login/login-test';

describe('test', () => {
	it.only('LoginTest', function () {
    const filePath = 'image.jpg';
    const file = 'image1.jpg';
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
      cy.contains('News Feed').click()
      cy.wait(2000)  
      cy.contains('Add New').click()
      cy.wait(2000)
      cy.get('input[name=title]').type('Raahi News')
      cy.wait(2000)
      cy.get('textarea[name=description]').type('All news related to Sneha Raahi application')
      cy.wait(2000)
      cy.get('input[name=category]').type('News')
      cy.wait(2000)
      cy.get('input[name=link]').type('https://www.snehamumbai.org/')
      cy.wait(2000)
      cy.get('input[name=language]').type('en')
      cy.wait(2000)
      cy.get('input[name=copyright]').type('© 2022 SNEH Foundation')
      cy.wait(2000)
      cy.get('input[name=fileinput]').attachFile(filePath)
      cy.wait(2000)
      cy.get('input[name=fileInput]').attachFile(file)
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Edit').click()
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Newsfeeds').click()   
    })
	});
 

