/// <reference types="cypress" />

const { Button } = require("bootstrap")

describe('First test suite', () => {

    it('first test case', () => {
        //code of the test 
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by tag name
        cy.get('input')

        //by ID
        cy.get('#inputEmail')

        //by class value
        cy.get('.input-full-width')

        //by attribute name
        cy.get('[fullwidth]')

        //by attribute and value
        cy.get('[placeholder="Email"]')

        /*<input _ngcontent-xov-c22="" data-cy="imputEmail1" fullwidth="" id="inputEmail1" 
        nbinput="" placeholder="Email" type="email" ng-reflect-full-width="" 
        class="input-full-width size-medium shape-rectangle">*/

        //by entire class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')
        
        //by two attributes 
        cy.get('[placeholder="Email"][fullwidth]')

        //by tag, attribute id and class
        cy.get('input[placeholder="Email"]#inputEmail.input-full-width')

        //by cypress test ID
        cy.get('[data-cy="imputEmail1"]')

    })

    it('second test case', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //get() find elements on the page by locator globally
        //find() child elements by locator
        //contains() find html text and by text and locator - The first match on the page

        cy.contains('Sign in')
        //find  by class and text
        cy.contains('[status="primary"]', 'Sign in')
        cy.contains('[status="warning"]', "Sign in")
        //child element in relation to the parent element
        cy.contains("nb-card", "Horizontal form").find('input')
        //contain method chained and find by text
        cy.contains("nb-card", "Horizontal form").contains('Sign in')
        //method get will find always methods from the whole page, no matter if it's chained 
        cy.contains("nb-card", "Horizontal form").get('Sign in')

        //cypress chains and DOM
        cy.get('#inputEmail3')
         .parents('form')
         .find('button')
         .should('contain','Sign in')
         .parents('forms')
         .find('nb-checkbox')
         //best practice is to not chain any other command after an action, e.g. 'click' action
         .click()

    })

    it('save subject from the command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()    
        //making a validation for inputs email and password within 'using the grid' form

        cy.contains("nb-card", "Using the Grid").find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains("nb-card", "Using the Grid").find('[for="inputPassword2"]').should('contain', 'Password')


        //approaches to save locators
        // 1. Cypress Alias as() method defiing a global variable
        cy.contains("nb-card", "Using the Grid").as('usingTheGrid')
        //calling the alias with a @ at the beginning
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password')

        //2. Cypress then() method, as callback function that will define our locator
        cy.contains("nb-card", "Using the Grid").then( usingTheGrid => {
            //this function is only visible inside this block
            //wrap is needed to return the function to a cypress chainable commands instead of JQuery commands syntax
            cy.wrap(usingTheGrid).find('[for="inputEmail1"]').should('contain', 'Email')
            cy.wrap(usingTheGrid).find('[for="inputPassword2"]').should('contain', 'Password')

        })
    })

    //lesson extract text values from webpagew
    it('exctracts text from web elements', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // 1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //2 using jquery text method 
        cy.get('[for="exampleInputEmail1"]').then( label => {
            const labelText = label.text()
            expect(labelText).to.equal('Email address')
            cy.wrap(labelText).should('contain', 'Email address')
        })

        //3 using invoke method using text so we dont need to use a text() method afterwards
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')
        })
        // saving text as cypress alias
        cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelText').should('contain', 'Email address')

        //4 provide attribute
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then( classValue => {
            expect(classValue).to.equal('label')
        })

        //5 invoke property input field, using prop key, 
        cy.get('#exampleInputEmail1').type('test@test.com')
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'test@test.com').then( property => {
            expect(property).to.equal('test@test.com')
        })

    })

    //Lesson checkboxes and radio buttons
    it('radio buttons', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //finding the using the grid form inside the web page
        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
            //activating a force flag to be true so we can check elements that are hidden or disabled
            cy.wrap(radioButtons).eq(0).check({force:true}).should('be.checked')
            cy.wrap(radioButtons).eq(1).check({force:true})
            cy.wrap(radioButtons).eq(0).should('not.be.checked')
            cy.wrap(radioButtons).eq(2).check({force:true}).should('be.disabled')



        })
    })

    it.only('checkboxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()
    
        //cy.get('[type="checkbox"]').uncheck({force:true}) same action for all found checkboxes
        cy.get('[type="checkbox"]').eq(0).click({force:true})
        cy.get('[type="checkbox"]').eq(1).click({force:true})

    })
})


