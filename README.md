# JavaScript Challenge 1

When the design team creates a style guide, if the developer wants to use an element or section, they have to inspect the element and view the source. This can be time consuming and can lead to errors if they miss a section of code.

## The Challenge

Your task is to create a JavaScript plugin that can be included by a simple file at the end of the page.
This plugin will run straight away when included and will do the following:
 
* Find all elements that are surrounded by a <div> with a class of "code-snippet-container"
* Attach a mouse over event to that <div> that, when hovered, will show a button in the top right corner of the <div> with the text of "Code". Styling of this element is up to you, but not a requirement
* After clicking the code button, a bootstrap modal (this part will need to be jQuery specific - the processing part should be in plain JS) will show with a formatted version of the HTML markup in the content section of the modal. The modal already has a close button in the top right corner

### Outcome

As a developer I should be able to hover my mouse over any of the of the sections and quickly the view the HTML markup needed to achieve those elements. 

#### Bonus Points!

Colour code the HTML markup in the modal body for easy reading. However, the main idea is that it's quick and easy for the developer to copy and paste the markup! 