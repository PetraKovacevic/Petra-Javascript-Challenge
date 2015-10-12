/**
*/


var Modal = (function($) {

	var modalId;

	var buildModal = function() {

		// Build the modal
		html =  '<div id="' + modalId + '" class="modal fade in" style="display:none;">';
		html += '<div class="modal-dialog modal-lg">';
		html += '<div class="modal-content">';
		html += '<div class="modal-header">';
		html += '<button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>';
		html += '<h4 class="modal-title">Source Code</h4>'
		html += '</div>'; // Close header
		html += '<div class="modal-body">';
		html += '</div>'; // Close body
		html += '</div>'; // Close content
		html += '</div>'; // Close dialog
		html += '</div>';  // Close modal

	    var temp = document.createElement('div');
	    temp.innerHTML = html;

	    // Add the modal to the page
	    document.body.appendChild(temp.firstChild);
	};

	var showModal = function(modalBodyContent) {

		// Add the text to the modal body and show the modal
		var modalBody = document.getElementById(modalId).getElementsByClassName('modal-body')[0];
		modalBody.innerHTML = '';
		modalBody.appendChild(modalBodyContent);
		$('#' + modalId).modal('show');

	};

	var init = function() {
		buildModal();
	};

	return {
		init: init,
		showModal: showModal
	}
})(jQuery);

var SourceCode = (function(Modal) {

	var snippetClassName = 'code-snippet-container';
	var sourceCodeContainerClassName = 'source-code-container';

	var buildCodeSnippetLink = function() {

		// Set the css for the source code link
		var helperCss = 'top: 5px; right: 5px; position: absolute; ' +
					'background:#fff; color:#454545; border:1px solid #ddd; ' + 
				    'padding:1px 5px 0px 5px; -webkit-border-radius:5px; -moz-border-radius:5px; border-radius:5px;' +
				    'display: none; font-size: 11px; text-decoration: none;';

	    // Set the html for the source code link
		var helper = '<a class="helper" href="#">CODE</a>';

	    var helperObject = document.createElement('div');
	    helperObject.innerHTML = helper;
	    helper = helperObject.firstChild;
	    helper.style.cssText = helperCss;

	    return helper;
	};

	var buildCopyLink = function(selectId) {

		// Set the css for the copy button
		var copyCss = 'top: 15px; right: 15px; position: absolute; ' +
					'background:#fff; color:#454545; border:1px solid #ddd; ' + 
				    'padding:2px 7px; -webkit-border-radius:3px; -moz-border-radius:3px; border-radius:3px;' +
				    'font-size: 13px; text-decoration: none;';

	    // Set the html for the copy button
		var copyButton = '<button type="button" class="select-text"><span>Copy</span></button>';

	    var temp = document.createElement('div');
	    temp.innerHTML = copyButton;
	    copyButton = temp.firstChild;
	    copyButton.style.cssText = copyCss;

	    // Add an event listener on click to select and copy the source code
	    copyButton.addEventListener('click', function(e) {
	    	selectText(selectId);
	    });

	    return copyButton;
	};

	var selectText = function(selectId) {

	    var text = document.getElementById(selectId), 
	    	range, 
	    	selection;

    	// Selects the text of a given element
	    if (document.body.createTextRange) { // IE
	        range = document.body.createTextRange();
	        range.moveToElementText(text);
	        range.select();
	    } else if (window.getSelection) { 	// Chrome, Firefox, Opera
	        selection = window.getSelection();        
	        range = document.createRange();
	        range.selectNodeContents(text);
	        selection.removeAllRanges();
	        selection.addRange(range);
	    }

	    // Copy to clipboard
	    // This may or may not work, depends on the browser
	    document.execCommand('copy');

	}

	var processSourceCode = function(sourceCode) {

		// Remove the source code link from the html
		sourceCode = sourceCode.replace(/<.*helper.*>/g, "");

		// Get the number of spaces in the first line of the source code before the first tag.
		// This is the number of spaces we will need to remove from the beginning of each line of code
		// in order to get it correctly formatted. 
		var length = sourceCode.match(/^\s*/)[0].length - 1;

		// Crete a regex which will look for the number of spaces calculated above followed by '<' 
		// and replace this with '<'
		var re = new RegExp('\\s{' + length + '}<', "g");	
		sourceCode = sourceCode.replace(re, "<");

		sourceCode = sourceCode.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace('\t','');

		// Create the source code <pre> container
		var sourceCodeContainer = document.createElement('pre');
		sourceCodeContainer.style.cssText = 'word-wrap: normal;';
		sourceCodeContainer.id = sourceCodeContainerClassName;
		sourceCodeContainer.innerHTML = sourceCode;

		// Create the copy button
		var copyButton = buildCopyLink(sourceCodeContainerClassName);

		// Create the final element that will be shown in the modal with the copy button and source code
		var temp = document.createElement('div');
		temp.appendChild(copyButton);
		temp.appendChild(sourceCodeContainer);

		return temp;
	};

	var bindUIActions = function() {

		// Get all the container which have the specified class name.
		// We will be appending a link to this container which will show on mouseover
		// and open a modal with the source code of the container.
		var code_containers = document.getElementsByClassName(snippetClassName);

		// Get the html for the link we will be appending to each container
		var helper = buildCodeSnippetLink();

		for (var i = 0; i < code_containers.length; i++) {
	   		var container = code_containers[i];
	   		var helperClone = helper.cloneNode(true);

   			// Add a click event listener to the source code link to open a modal and
   			// display the source code of the selected element
	   		helperClone.addEventListener("click", function(e) {
				e.preventDefault();

				var sourceCode = processSourceCode(this.parentNode.innerHTML);
				Modal.showModal(sourceCode);
	   		});

	   		// Add the hidden link to the container
	   		container.appendChild(helperClone);

   			// Add a mouseover event listener to show the link
	   		container.addEventListener("mouseover", function(e){
	    		var elem = this.getElementsByClassName('helper')[0];
	    		elem.style.display = 'block';
			});

	   		// Add a mouseleave event to hide the link
	   		container.addEventListener("mouseleave", function(e){
	   			// Have a look at unobtrusive javascript
	    		this.getElementsByClassName('helper')[0].style.display = 'none';
			});
	   }
	};

	var init = function() {
		Modal.init();
		bindUIActions();
	};

	return {
		init: init
	}

})(Modal);

(function(SourceCode) {

	SourceCode.init();
    
})(SourceCode);



