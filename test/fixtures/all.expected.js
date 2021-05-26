var _objectHasOwn = function (object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
};

const object = {};

if (_objectHasOwn(object, 'becky')) {
  console.log('has property becky');
}

if (!_objectHasOwn(object, 'rosie')) {
  console.log('doesn’t have property rosie');
}
