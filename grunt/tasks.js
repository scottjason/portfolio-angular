'use strict';

exports.get = function(type) {
  if (type === 'server') {
    return ['clean:all', 'concurrent:concat', 'concurrent:minify', 'concurrent:watch'];
  } else if (type === 'build') {
    return ['clean:all', 'concurrent:concat', 'concurrent:minify'];
  }
};
