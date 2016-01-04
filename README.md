baseUI
======

All the stuff you need to create a new front-end project from the scratch. It includes handlebars HTML templates, SASS for CSS and modularized JS. All the build management/code compilation will be handled with gulp (task runner) and webpack for JS modularity.

Requirements
--
 - Node.js >= v0.10
 - git v2.6.4
 - python v2.7.11
 - bower: `npm install -g bower`
 - gulp: `npm install -g gulp`
 - web pack: `npm install -g webpack`

Install
--
`npm install && bower install`

Dev Build
--
`gulp`

Production Build (Uglified, Optimized Images)
--
`gulp publish`

Run server form the Production build
--
`gulp serve:dist`
