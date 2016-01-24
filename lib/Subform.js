'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _components = {
	_$Subform: {
		displayName: 'Subform'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var Subform = (function (_Form) {
	_inherits(Subform, _Form);

	function Subform() {
		_classCallCheck(this, _Subform);

		_Form.apply(this, arguments);
	}

	Subform.prototype.render = function render() {
		var factory = _react2['default'].createFactory(this.props['class']);
		return new factory({ onRemove: this.props.onRemove });
	};

	var _Subform = Subform;
	Subform = _wrapComponent('_$Subform')(Subform) || Subform;
	return Subform;
})(_Form2['default']);

exports['default'] = Subform;
module.exports = exports['default'];