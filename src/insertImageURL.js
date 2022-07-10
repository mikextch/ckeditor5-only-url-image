import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';

import linkIcon from '../theme/icons/link.svg';

export default class InsertImageURL extends Plugin {
	static get pluginName() {
		return 'InsertImageURL';
	}

	init() {
		const editor = this.editor;
		const t = editor.t;
		const model = editor.model;

		// Add the "InsertImageURL" button to feature components.
		editor.ui.componentFactory.add( 'insertImageURL', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: t( 'Image from URL' ),
				icon: linkIcon,
				tooltip: true
			} );

			// Insert a text into the editor after clicking the button.
			this.listenTo( view, 'execute', () => {
				// eslint-disable-next-line no-alert, no-undef
				const imageUrl = prompt( t( 'URL image' ) );
				if ( !imageUrl ) {
					return false;
				}
				model.change( writer => {
					const imageElement = writer.createElement( 'imageBlock', {
						src: imageUrl
					} );

					model.insertContent(
						imageElement,
						model.document.selection
					);
				} );
			} );
			return view;
		} );
	}
}
