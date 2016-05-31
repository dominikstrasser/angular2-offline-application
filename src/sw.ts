importScripts('vendor/sw-toolbox/sw-toolbox.js');

declare var toolbox;
toolbox.router.get('*', toolbox.fastest);