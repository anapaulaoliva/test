/// <reference types="cypress" />

describe('First test suite', () => {

    describe('suite section', () => {

        beforeEach('login', () => {
            //something to repeat every test inside the discribe block
        })

        it('first test case', () => {
            //code of the test 
    
        })
    })

    it('first test case', () => {
        //code of the test 

    })

    it('second test case', () => {
        //code of the test 
        
    })

    it('third test case', () => {
        //code of the test 
        
    })
})

//context()

describe('Second test suite', () => {

    it('first test case', () => {
        //code of the test 

    })

    it('second test case', () => {
        //code of the test 
        
    })

    it('third test case', () => {
        //code of the test 
        
    })
})