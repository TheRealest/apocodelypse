# real-simple-webapp

A really simple webapp template for getting projects started without dealing with configuration or setup. See the example files in the `js/` and `scss/` folders to take advantage of the build system.

### Project tools:

* Angular
* Ionic
* Sass
* Express

### Development tools:

* Browserify
* Nodemon
* Napa

## `npm` scripts

This app template includes several npm scripts to make development easier. Use: 

```
npm run build:js
npm run build:sass
```

...to build javascript or sass files, respectively, or to do both at the same time use:

```
npm run build
```

To watch files for changes and automatically build when necessary, use any of:

```
npm run watch:js
npm run watch:sass
npm run watch
```

To start the webserver, which automatically restarts on either javascript or sass build, use:

```
npm run serve
```

Or both watch files to build and run the webserver at the same time for development with:

```
npm run dev
```

Finally, if you need to delete the build files for some reason, you can use:

```
npm run clean
```
