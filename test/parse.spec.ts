// Test Utilities:
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';

// Test setup:
const { expect } = chai;
chai.use(sinonChai);

// Under test:
import { tsquery } from '../src/index';

describe('tsquery:', () => {
    describe('tsquery.parse - null query:', () => {
        it('should parse an empty query', () => {
            const result = tsquery.parse('');

            expect(result).to.equal(undefined);
        });

        it('should parse a whitespace query', () => {
            const result = tsquery.parse('      ');

            expect(result).to.equal(undefined);
        });
    });

    describe('tsquery.parse - queryies with surrounding whitespace:', () => {
        it('should parse a query with some leading whitespace', () => {
            const result = tsquery.parse(' A');

            expect(result).to.not.equal(undefined);
        });

        it('should parse a query with lots of leading whitespace', () => {
            const result = tsquery.parse('     A');

            expect(result).to.not.equal(undefined);
        });

        it('should parse a query with some trailing whitespace', () => {
            const result = tsquery.parse('A ');

            expect(result).to.not.equal(undefined);
        });

        it('should parse a query with lots of trailing whitespace', () => {
            const result = tsquery.parse('A     ');

            expect(result).to.not.equal(undefined);
        });

        it('should parse a query with some leading and trailing whitespace', () => {
            const result = tsquery.parse(' A ');

            expect(result).to.not.equal(undefined);
        });

        it('should parse a query with lots of leading and trailing whitespace', () => {
            const result = tsquery.parse('     A     ');

            expect(result).to.not.equal(undefined);
        });
    });
});
