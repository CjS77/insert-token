'use strict';
const assert = require('assert');
const tokens = require('../lib/replacer');

const params = {
    name: 'Cayle',
    address: 'The Beach',
    height: 1.75,
    busy: true
};

describe('String replacement', () => {
    it('single replacement', function() {
        let result = tokens.replace('Hi {{name}}', params);
        assert.equal(result, 'Hi Cayle');
    });

    it('multiple replacement', function() {
        let result = tokens.replace('Hi {{name}}{{name}}. Busy? {{busy}}', params);
        assert.equal(result, 'Hi CayleCayle. Busy? true');
    });

    it('No matches', function() {
        let result = tokens.replace('A thing', params);
        assert.equal(result, 'A thing');
    });

    it('Non-matched tokens', function() {
        let result = tokens.replace('A {{special}} thing', params);
        assert.equal(result, 'A {{special}} thing');
    });
});

describe('Primitives', () => {
    it('Number', function() {
        let result = tokens.replace(5.35, params);
        assert.equal(result, 5.35);
    });

    it('Boolean', function() {
        let result = tokens.replace(true, params);
        assert.equal(result, true);
    });
});

describe('Arrays', () => {
    it('Flat array', function() {
        let result = tokens.replace(['My name is {{name}}', 'Height is {{height}}'], params);
        assert.deepEqual(result, ['My name is Cayle', 'Height is 1.75']);
    });
});

describe('Objects', () => {
    it('Flat object', function() {
        let result = tokens.replace({ name: '{{name}}', '{{address}}': 1, '{{name}}': '{{height}}' }, params);
        assert.deepEqual(result, { name: 'Cayle', 'The Beach': 1, 'Cayle': '1.75' });
    });

    it('Nested object', function() {
        let result = tokens.replace({
            id: { name: '{{name}}',
                  address: '{{address}}'
            },
            tokens: ['{{name}}', '{{busy}}', '{{height}}'],
            wins: 99
        }, params);
        assert.deepEqual(result, {
            id: { name: 'Cayle',
                address: 'The Beach'
            },
            tokens: ['Cayle', 'true', '1.75'],
            wins: 99
        });
    });
});

