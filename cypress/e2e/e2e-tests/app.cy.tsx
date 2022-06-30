/// <reference types="cypress" />

describe("basic-tests", ()=>{

    it("contains company name",()=>{
        cy.visit("http://localhost:3000/")
        cy.contains("Computer")
    })

})