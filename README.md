# insert-token

Simple search and replace utility for replacing tokens in objects / strings / text etc

## Usage:

    const tokens = require('../lib/replacer');
    
    const params = {
        name: 'Cayle',
        address: 'The Beach',
        height: 1.75,
        busy: true
    };
    
    tokens.replace('Hi {{name}}', params);  // 'Hi Cayle'

It processes arrays:
    
    tokens.replace(['My name is {{name}}', 'Height is {{height}}'], params); 
    //['My name is Cayle', 'Height is 1.75']
    
and objects. Both keys and values are parsed:
    
    tokens.replace({ name: '{{name}}', '{{address}}': 1, '{{name}}': '{{height}}' }, params);
    // { name: 'Cayle', 'The Beach': 1, 'Cayle': '1.75' })

Nested objects work too:
 
    let result = tokens.replace({
        id: { name: '{{name}}',
              address: '{{address}}'
        },
        tokens: ['{{name}}', '{{busy}}', '{{height}}'],
        wins: 99
    }, params);
    
    => {
        id: { name: 'Cayle',
            address: 'The Beach'
        },
        tokens: ['Cayle', 'true', '1.75'],
        wins: 99
    });
