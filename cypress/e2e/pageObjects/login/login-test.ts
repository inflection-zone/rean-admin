class login {
	setUserName(username) {
		cy.get('input[name=username]').type(username);
	}

	setPassword(password) {
		cy.get('input[name=password]').type(password);
	}

	clickLogin() {
		cy.get('button').click();
	}
	verifyLogin() {
		cy.contains('Welcome').should('have.text', 'Welcome');
	}
}

export default login;