
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Teemu Teekkari',
      username: 'tteekkari',
      password: 'pystis'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tteekkari')
      cy.get('#password').type('pystis')
      cy.get('#loginButton').click()
      cy.contains('Teemu Teekkari logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrongUsername')
      cy.get('#password').type('wrongPassword')
      cy.get('#loginButton').click()
      cy.get('.error').should('contain', 'wrong username or password')
    })

    it('shows error message with correct styles', function() {
      cy.get('#username').type('wrongUsername')
      cy.get('#password').type('wrongPassword')
      cy.get('#loginButton').click()
      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('tteekkari')
      cy.get('#password').type('pystis')
      cy.get('#loginButton').click()
      cy.contains('Teemu Teekkari logged in')
    })

    it('A blog can be created', function() {
      cy.contains('add a new blog').click()
      cy.get('#title').type('This is A Test Blog')
      cy.get('#author').type('Will be deleted soon')
      cy.get('#url').type('www.test.fi')
      cy.get('#createButton').click()
      cy.get('.blogList').contains('This is A Test Blog')
    })
  })

  describe('Bloglist', function () {
    beforeEach(function() {
      cy.get('#username').type('tteekkari')
      cy.get('#password').type('pystis')
      cy.get('#loginButton').click()
      cy.contains('Teemu Teekkari logged in')

      cy.contains('add a new blog').click()
      cy.get('#title').type('This is A Test Blog 1')
      cy.get('#author').type('Will be deleted soon')
      cy.get('#url').type('www.test.fi')
      cy.get('#createButton').click()
      cy.get('.blogList').contains('This is A Test Blog')
    })

    it('A blog can be liked', function() {
      cy.get('.visibilityButton').click()
      cy.get('.blogInfo').contains('likes: 0')
      cy.get('.likeButton').click()
      cy.get('.blogInfo').contains('likes: 1')
    })

    it('A blog can be deleted', function() {
      cy.on('window:confirm', () => true)

      cy.get('.visibilityButton').click()
      cy.get('.deleteButton').click()

      cy.get('.blogList').contains('This is A Test Blog 1').should('not.exist')

    })

    describe('Blogs are in correct order', function() {
      beforeEach(function() {
        cy.contains('add a new blog').click()
        cy.get('#title').type('This is A Test Blog 2')
        cy.get('#author').type('Will be deleted soon')
        cy.get('#url').type('www.test.fi')
        cy.get('#createButton').click()
        cy.get('.blogList').contains('This is A Test Blog 2')

        cy.contains('add a new blog').click()
        cy.get('#title').type('This is A Test Blog 3')
        cy.get('#author').type('Will be deleted soon')
        cy.get('#url').type('www.test.fi')
        cy.get('#createButton').click()
        cy.get('.blogList').contains('This is A Test Blog 3')

      })

      it('Blogs are in correct order', function() {
        cy.contains('2').find('.visibilityButton').click()
        cy.get('.likeButton').click()
        cy.get('.likeButton').click()

        cy.contains('3').find('.visibilityButton').click()
        cy.contains('3').find('.likeButton').click()
        cy.wait(100)
        cy.get('.blogList > :nth-child(1)').contains('This is A Test Blog 2')
        cy.get('.blogList > :nth-child(2)').contains('This is A Test Blog 3')
        cy.get('.blogList > :nth-child(3)').contains('This is A Test Blog 1')
      })
    })
  })
})