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

if (!_objectHasOwn(object, 'rosie')) {
  console.log('doesn’t have property rosie');
}
