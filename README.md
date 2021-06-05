# babel-plugin-transform-object-hasown

[![Build Status][ci-img]][ci]

Babel plugin for transforming
[`Object.hasOwn`](https://github.com/tc39/proposal-accessible-object-hasownproperty).

## Install

```sh
npm install babel-plugin-transform-object-hasown --save-dev
```

## Usage

Use it via available [plugin activation options][babel-plugins].

For `.babelrc` file:

```json
{
	"plugins": ["babel-plugin-transform-object-hasown"]
}
```

Then, in your code:

```js
const object = {};

if (Object.hasOwn(object, 'becky')) {
	console.log('has property becky');
}
```

After transformation:

```js
var _objectHasOwn = function (object, property) {
	if (typeof object === 'undefined' || object === null) {
		throw new TypeError('Cannot convert undefined or null to object');
	}

	return Object.prototype.hasOwnProperty.call(Object(object), property);
};

const object = {};

if (_objectHasOwn(object, 'becky')) {
	console.log('has property becky');
}
```

Check test fixtures ([actual](test/fixtures/all.js) and
[expected](test/fixtures/all.expected.js)) for more examples.

## Caveats

Will only work with code of the form `Object.hasOwn` or `Object['hasOwn']`.

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

<!-- prettier-ignore-start -->

[ci]: https://travis-ci.com/niksy/babel-plugin-transform-object-hasown
[ci-img]: https://travis-ci.com/niksy/babel-plugin-transform-object-hasown.svg?branch=master
[babel-plugins]: http://babeljs.io/docs/plugins/

<!-- prettier-ignore-end -->
