'use strict';

module.exports = {
  options: {
    separator: '\n\n',
  },
  dev_scripts: {
    src: ['client/scripts/app.js', 'client/scripts/app.config.js', 'client/scripts/directives/*.js', 'client/scripts/services/*.js', 'client/scripts/controllers/*.js'],
    dest: 'client/build/dev.js'
  },
  dev_styles: {
    src: ['client/styles/global.css', 'client/styles/navbar.css', 'client/styles/landing.css', 'client/styles/portfolio.css', 'client/styles/desktop/landing.css', 'client/styles/tablet/landing.css', 'client/styles/mobile/navbar.css', 'client/styles/mobile/landing.css', 'client/styles/mobile/portfolio.css'],
    dest: 'client/build/dev.css'
  }
};
