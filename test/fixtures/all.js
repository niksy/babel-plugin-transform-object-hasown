const object = {};

if (Object.hasOwn(object, 'becky')) {
	console.log('has property becky');
}

if (!Object.hasOwn(object, 'rosie')) {
	console.log('doesn’t have property rosie');
}
