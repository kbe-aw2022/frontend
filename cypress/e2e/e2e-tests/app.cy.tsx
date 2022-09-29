/// <reference types="cypress" />

describe("basic-tests", ()=>{
    
    beforeEach(()=>{
        cy.visit("http://localhost:3000/")

    })
    it("contains company name",()=>{
        cy.contains("Computer")
    })
    
    it("user login test",()=>{
        cy.get("#log-in-button").click()
        // cy.get("#Username/Email-input").type("test")
        cy.get('input[name="Username/E-mail:-input"]').type('test')
        cy.get('input[name="Password:-input"]').type('testtest2')
        cy.get(".Form_submit-button__66Ysv").click()
        cy.contains("test")

    })

})