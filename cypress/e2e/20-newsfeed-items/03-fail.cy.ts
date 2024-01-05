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
      cy.get('textarea[name=description]').type('mytntfewfe')
      cy.wait(2000)
      cy.get('input[name=link]').type('https://gitlab.com/REAN-Foundation/reancare-service/pull/290')
      cy.wait(2000)
      cy.get('input[name=authorName]').type('vdvrebre')
      cy.wait(2000)
      cy.get('input[name=authorEmail]').type('abc@gmail.com')
      cy.wait(2000)
      cy.get('input[name=authorLink]').type('https://gitlab.com/REAN-Foundation/reancare-service/pull/290')
      cy.wait(2000)
      cy.get('input[name=fileinput]').attachFile(filePath)
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(7000)
      cy.contains('Newsfeeds').click()   
    })
	});
 

