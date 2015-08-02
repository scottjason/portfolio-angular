'use strict';

exports.get = function(type) {
  if (type === 'server') {
    return ['clean:all', 'concurrent:concat', 'concurrent:minify'];
  }

};