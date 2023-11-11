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
      cy.contains('News Feed').click()
      cy.wait(2000)  
      cy.contains('Add New').click()
      cy.wait(2000)
      cy.get('input[name=title]').type('rbgfb')
      cy.wait(2000)
      cy.get('input[name=language]').type('dbdfbdf')
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Add Items').click()
      cy.wait(2000)
      cy.get('input[name=title]').type('Sneha Raahi 1.0 Beta released to dev')
      cy.wait(2000)
      cy.get('textarea[name=description]').type('Release of Sneha Raahi web application version 1.0 Beta released to dev.')
      cy.wait(2000)
      cy.get('input[name=link]').type('https://www.snehamumbai.org/media/')
      cy.wait(2000)
      cy.get('input[name=content]').type('First version of Sneha Raahi web application released to dev.')
      cy.wait(2000)
      cy.get('input[name=authorName]').type('Sneha Foundation')
      cy.wait(2000)
      cy.get('input[name=authorEmail]').type('crisis@snehamumbai.org')
      cy.wait(2000)
      cy.get('input[name=authorLink]').type('https://www.snehamumbai.org/')
      cy.wait(2000)
      cy.get('input[name=fileinput]').attachFile(filePath)
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
 

