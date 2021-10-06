/**
 * Created by Enrique Nieto Martínez on 21/08/21
 */
require('jsdom-global')();

module.exports = {
	verbose: true,
	roots:['<rootDir>/src/js/tests/components/'],
	setupFilesAfterEnv: ['<rootDir>/vue-jest-setup.js'],
	moduleFileExtensions:['js'],
	testEnvironment: 'jsdom',
	snapshotSerializers:[
		"<rootDir>/node_modules/jest-serializer-vue"
	]
}