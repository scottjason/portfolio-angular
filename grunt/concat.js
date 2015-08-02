'use strict';

module.exports = {
  options: {
    separator: '\n\n',
  },
  dev_scripts: {
    src: ['client/scripts/app.js', 'client/scripts/app.config.js', 'client/scripts/directives/*.js', 'client/scripts/services/*.js', 'client/scripts/controllers/*.js'],
    dest: 'client/build/dev.js'
  },
  vendor_scripts: {
    src: ['client/bower_components/angular/angular.min.js', 'client/bower_components/angular-ui-router/release/angular-ui-router.min.js'],
    dest: 'client/build/vendor.min.js'
  },
  dev_styles: {
    src: ['client/styles/global.css', 'client/styles/navbar.css', 'client/styles/landing.css', 'client/styles/portfolio.css', 'client/styles/desktop/landing.css', 'client/styles/tablet/landing.css', 'client/styles/tablet/navbar.css', 'client/styles/tablet/contact.css', 'client/styles/mobile/landing.css', 'client/styles/mobile/navbar.css', 'client/styles/mobile/portfolio.css'],
    dest: 'client/build/dev.css'
  }
};
