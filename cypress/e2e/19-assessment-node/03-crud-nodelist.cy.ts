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
      cy.contains('Assessments').click()
      cy.wait(2000)  
      cy.contains('Add New').click()
      cy.wait(2000)
      cy.get('input[name=title]').type('rbgfb')
      cy.wait(2000)
      cy.get('select[name=type]').select('Survey')
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Add Assessment Node').click()
      cy.wait(2000)
      cy.get('select[name=nodeType]').select('Node list')
      cy.wait(2000)
      cy.get('select[name=parentNodeId]').type('Node list - Assessment root node - RNode#8dvxjgjedzyzbugcgrgikoda')
      cy.wait(2000)
      cy.get('input[name=title]').type('Q 8/8. How much does your heart failure affect your lifestyle? Please indicate how your heart failure may have limited your participation in the following activities over the past 2 weeks.')
      cy.wait(2000)
      cy.get('textarea[name=description]').type('gbtbybgrv')
      cy.wait(2000)
      cy.get('input[name=sequence]').type('5')
      cy.wait(2000)
      cy.get('input[name=serveListNodeChildrenAtOnce]').check().should('be.checked')
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Edit').click()
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Assessment-Nodes').click()
      cy.wait(5000)
      cy.contains('Assessments').click()   
    })
	});
 

