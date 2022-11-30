/// <reference types="cypress" />

describe("auth-tests", ()=>{
    
    beforeEach(()=>{
        cy.visit("http://localhost:3000/")

    })
    
    it("user logs in",()=>{
        cy.get("#log-in-button").click()
        .get('input[name="Username/E-mail:-input"]').type('JohnDoe')
        .get('input[name="Password:-input"]').type('dummypassword1')
        .get(".Form_submit-button__66Ysv").click()
        cy.contains("JohnDoe")
    })


})