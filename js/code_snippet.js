var Modal = function() {

	var modalId;

	var buildModal = function() {

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

	    document.body.appendChild(temp.firstChild);
	};

	var showModal = function(modalBodyContent) {

		$('#' + modalId + ' .modal-body').html('<pre>' + modalBodyContent +'</pre>');
		$('#' + modalId).modal('show');

	};

	var init = function() {
		modalId = 'sourceCodeModal';
		buildModal();
	};

	return {
		// buildModal: buildModal,
		init: init,
		showModal: showModal
	}
}();

var SourceCode = function() {

	var snippetClassName;

	var buildCodeSnippetLink = function() {

		var helperCss = 'top: 5px; right: 5px; position: absolute; ' +
					'background:#fff; color:#454545; border:1px solid #ddd; ' + 
				    'padding:1px 5px 0px 5px; -webkit-border-radius:5px; -moz-border-radius:5px; border-radius:5px;' +
				    'display: none; font-size: 11px; text-decoration: none;';

		var helper = '<a class="helper" href="#">CODE</a>';

	    var helperObject = document.createElement('div');
	    helperObject.innerHTML = helper;
	    helper = helperObject.firstChild;
	    helper.style.cssText = helperCss;

	    return helper;
	};

	var processSourceCode = function(sourceCode) {

		sourceCode = sourceCode.replace(/<.*helper.*>/g, "");

		var length = sourceCode.match(/^\s*/)[0].length - 1;

		var re = new RegExp('\\s{' + length + '}<', "g");	

		sourceCode = sourceCode.replace(re, "<");
		sourceCode = sourceCode.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace('\t','');

		return sourceCode;
	};

	var bindUIActions = function() {

		var code_containers = document.getElementsByClassName(snippetClassName);
		var helper = buildCodeSnippetLink();

		for (var i = 0; i < code_containers.length; i++) {
	   		var container = code_containers[i];
	   		var helperClone = helper.cloneNode(true);

	   		helperClone.addEventListener("click", function(e) {
				e.preventDefault();

				var sourceCode = processSourceCode(this.parentNode.innerHTML);
				Modal.showModal(sourceCode);
	   		});

	   		container.appendChild(helperClone);

	   		container.addEventListener("mouseover", function(e){
	    		var elem = this.getElementsByClassName('helper')[0];
	    		elem.style.display = 'block';
			});

	   		container.addEventListener("mouseleave", function(e){
	   			// Have a look at unobtrusive javascript
	    		this.getElementsByClassName('helper')[0].style.display = 'none';
			});
	   }
	};

	var init = function() {

		snippetClassName = 'code-snippet-container';
		Modal.init();
		bindUIActions();
	};

	return {
		init: init
	}

}(Modal);

(function(SourceCode) {

	SourceCode.init();
    
})(SourceCode);



