// Test Utilities:
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';

// Test setup:
const { expect } = chai;
chai.use(sinonChai);

// Dependencies:
import { ExpressionStatement } from 'typescript';

// Under test:
import { tsquery } from '../src/index';

describe('tsquery:', () => {
    describe('tsquery - types:', () => {
        it('should correctly cast a String', () => {
            const ast = tsquery.ast('"hello";');
            const [result] = tsquery(ast, 'StringLiteral');

            expect(result).to.equal((ast.statements[0] as ExpressionStatement).expression);
            expect(result.value).to.equal('hello');
        });

        it('should not try to cast a RegExp from inside a String', () => {
            const ast = tsquery.ast('"/t(/";');
            const [result] = tsquery(ast, 'StringLiteral');

            expect(result).to.equal((ast.statements[0] as ExpressionStatement).expression);
            expect(result.value).to.equal('/t(/');
        });

        it('should correctly cast a boolean false', () => {
            const ast = tsquery.ast('false;');
            const [result] = tsquery(ast, 'FalseKeyword');

            expect(result).to.equal((ast.statements[0] as ExpressionStatement).expression);
            expect(result.value).to.equal(false);
        });

        it('should correctly cast a boolean true', () => {
            const ast = tsquery.ast('true;');
            const [result] = tsquery(ast, 'TrueKeyword');

            expect(result).to.equal((ast.statements[0] as ExpressionStatement).expression);
            expect(result.value).to.equal(true);
        });

        it('should correctly cast a null', () => {
            const ast = tsquery.ast('null;');
            const [result] = tsquery(ast, 'NullKeyword');

            expect(result).to.equal((ast.statements[0] as ExpressionStatement).expression);
            expect(result.value).to.equal(null);
        });

        it('should correctly cast a number', () => {
            const ast = tsquery.ast('3.3;');
            const [result] = tsquery(ast, 'FirstLiteralToken');

            expect(result).to.equal((ast.statements[0] as ExpressionStatement).expression);
            expect(result.value).to.equal(3.3);
        });

        it('should correctly cast a RegExp', () => {
            const ast = tsquery.ast('/^foo$/;');
            const [result] = tsquery(ast, 'RegularExpressionLiteral');

            expect(result).to.equal((ast.statements[0] as ExpressionStatement).expression);
            expect(result.value instanceof RegExp).to.equal(true);
        });
    });
});
