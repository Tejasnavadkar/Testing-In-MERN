import {describe,it,expect} from '@jest/globals'
import {Sum,Multiply} from '../index'


describe('Testing all Calculator Functionality',()=>{ // here is top level describe and inside all nested describes related calculations
    describe('test for Sum function',()=>{ // test Sum function we create multiple describe block to test multiple functions and inside that we create multiple test cases
        it('adds 1 + 2 to equal 3',()=>{
            const finalAnswer = Sum(1,2)
            expect(finalAnswer).toBe(3)
        })
    })
    
    describe('test for Multiply',()=>{  // different describe for different function
        it('multiply 1 * 2 equal 2',()=>{
           const finalAnswer = Multiply(1,2)
           expect(finalAnswer).toBe(2)
        })
    })
})



