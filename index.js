const GLOBAL_ID = 'objectHasOwn';

const templateString = `
var GLOBAL_ID = function (object, property) {
  return Object.prototype.hasOwnProperty.call(object, property)
};
`;

const helper = {
	programEnter(path, file) {
		file.set(GLOBAL_ID, false);
	},
	programExit(path, file, template) {
		const globalId = file.get(GLOBAL_ID);
		if (!globalId && !path.scope.hasBinding(globalId.name)) {
			return;
		}
		const object = template(templateString)({
			GLOBAL_ID: globalId
		});
		path.node.body.unshift(object);
	},
	get(path, file) {
		if (!file.get(GLOBAL_ID)) {
			file.set(GLOBAL_ID, path.scope.generateUidIdentifier(GLOBAL_ID));
		}
		return file.get(GLOBAL_ID);
	}
};

export default ({ types: t, template }) => {
	return {
		visitor: {
			Program: {
				enter(path, { file }) {
					helper.programEnter(path, file);
				},
				exit(path, { file }) {
					helper.programExit(path, file, template);
				}
			},
			CallExpression(path, { file }) {
				if (path.get('callee').matchesPattern('Object.hasOwn')) {
					const helperPath = helper.get(path, file);
					path.replaceWith(
						t.callExpression(helperPath, path.node.arguments)
					);
				}
			}
		}
	};
};
