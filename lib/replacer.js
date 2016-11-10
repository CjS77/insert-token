'use strict';

/**
 * Given a string or object in source, replace all instances of {{KEY}} with VALUE from params.
 */
function replace_params(source, params) {
    if (Array.isArray(source)) {
        return source.map(item => replace_params(item, params));
    }
    if (typeof source === 'object') {
        let result = {};
        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                let new_key = replace_string(key, params);
                result[new_key] = replace_params(source[key], params);
            }
        }
        return result;
    }
    if (typeof source === 'string') {
        return replace_string(source, params);
    }
    // Other types -- just return it
    return source;
}

function replace_string(string, params) {
    let result = string;
    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            result = result.replace(new RegExp(`{{${key}}}`, 'gm'), params[key]);
        }
    }
    return result;
}

module.exports = {
    replace: replace_params
};
