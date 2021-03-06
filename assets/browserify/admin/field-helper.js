var FieldHelper = function(m, tabs, editor, fields, i18n) {
	'use strict';

	var generate = require('./field-generator.js')(m);
	var overlay = require('./overlay.js')(m,i18n);
	var forms = require('./field-forms.js')(m, i18n);
	var fieldConfig;

	editor.on('blur', m.redraw);

	/**
	 * Choose a field to open the helper form for
	 *
	 * @param index
	 * @returns {*}
	 */
	function setActiveField(index) {
		fieldConfig = fields.get(index);
		m.redraw();
	}


	/**
	 * Controller
	 */
	function controller() {

	}

	/**
	 * Create HTML based on current config object
	 */
	function createFieldHTMLAndAddToForm() {

		// generate html
		var html = generate(fieldConfig);

		// add to editor
		editor.insert( html );

		// reset field form
		setActiveField('');

		// redraw
		m.redraw();
	}

	/**
	 * View
	 * @returns {*}
	 */
	function view() {

		// build DOM for fields choice
		var availableFields = fields.getAll();

		var fieldsChoice = m( "div.available-fields.small-margin", [
			m("strong", i18n.chooseField),

			(availableFields.length) ?

				// render fields
				availableFields.map(function(field, index) {

					var className = "button";
					if( field.required() ) {
						className += " is-required";
					}

					var inForm = field.inFormContent();
					if( inForm !== null ) {
						className += " " + ( inForm ? 'in-form' : 'not-in-form' );
					}

					return m("button", {
							"class": className,
							type   : 'button',
							onclick: m.withAttr("value", setActiveField),
							value  : index
						}, field.title() );
				})

				:

				// no fields
				m( "p", i18n.noAvailableFields )
		]);

		// build DOM for overlay
		var form = null;
		if( fieldConfig ) {
			form = overlay(
				// field wizard
				m("div.field-wizard", [

					//heading
					m("h3", [
						fieldConfig.title(),
						fieldConfig.required() ? m('span.red', '*' ) : '',
						fieldConfig.name().length ? m("code", fieldConfig.name()) : ''
					]),

					// help text
					( fieldConfig.help().length ) ? m('p', m.trust( fieldConfig.help() ) ) : '',

					// actual form
					forms.render(fieldConfig),

					// add to form button
					m("p", [
						m("button", {
							"class": "button-primary",
							type: "button",
							onclick: createFieldHTMLAndAddToForm
						}, i18n.addToForm )
					])
				]), setActiveField);
		}

		return [
			fieldsChoice,
			form
		];
	}

	// expose some variables
	return {
		view: view,
		controller: controller
	}
};

module.exports = FieldHelper;