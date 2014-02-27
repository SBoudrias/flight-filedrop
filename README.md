# flight-filedrop [![Build Status](https://secure.travis-ci.org/SBoudrias/flight-filedrop.png)](http://travis-ci.org/SBoudrias/flight-filedrop)

A [Flight](https://github.com/flightjs/flight) component reprensenting a file drop zone. Files dropped on the zone are then loaded as data-URI by default.

## Installation

```bash
bower install --save flight-filedrop
```

## Example
``` js
define(function (require) {
  'use strict';

  var dropzone = require('dropzone');

  return initialize;

  function initialize() {
    dropzone.attachTo('#dropzone');
  }
});
```

Provide options to `attachTo` or listen to events to add functionnalities.

## Events

- `fileDrop:file:dropped` when files are dropped on the zone. It add the array of dropped files as the `files` parameter.
- `fileDrop:file:loaded` when a file have been converted to data-URI through the default `loadHandler`. The file data-URI source (String) is passed as the `source` parameter.
- `fileDrop:FileReader:unsupported` when the FileReader API is not supported - and thus this plugin cannot work.

## Settings

- `loadHandler` a method that'll be call once for every file dropped in the zone. The file to load is passed as parameter, and the component `this` context is applied by default.

## CSS styling

These CSS classes are set on the top level node containing the component.

- `.is-hovered` is added when the user hover the dropzone with a file.

## Development

Development of this component requires [Bower](http://bower.io) to be globally
installed:

```bash
npm install -g bower
```

Then install the Node.js and client-side dependencies by running the following
commands in the repo's root directory.

```bash
npm install & bower install
```

To continuously run the tests in Chrome during development, just run:

```bash
npm run watch-test
```

## License

MIT (c) Simon Boudrias
