let addAuthorRow = document.getElementById('add-author-row');
let authorBody = document.getElementById('author-body');
// disable button if the number of authors is 1

let removeAuthorRow = document.getElementsByClassName('remove-author-row');
removeAuthorRow[0].disabled = true;

addAuthorRow.addEventListener('click', (e) => {

    // Define the HTML string for a new author row
    let authorRowString = `
            <th scope="row" class="text-center"></th>
            <td><input type="text" name="first-name" id="input-fname" class="form-control"></td>
            <td><input type="text" name="last-name" id="input-lname" class="form-control"></td>
            <td><input type="email" name="author-email" id="input-email" class="form-control"></td>
            <td><input type="text" name="author-address" id="input-address" class="form-control"></td>
            <td class="text-center"><button type="button" class="btn btn-danger fw-bold remove-author-row">-</button></td>
    `;

    // Create a new row and add it to the table body
    let authorRow = document.createElement('tr');
    authorRow.innerHTML = authorRowString;
    authorBody.appendChild(authorRow);
    e.preventDefault();
    removeAuthorRow[0].disabled = false;

    removeAuthorRow = document.getElementsByClassName('remove-author-row');
    for (item of removeAuthorRow) {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove the row from the DOM
            e.target.parentElement.parentElement.remove();
            for (element of authorBody.children) {
                // Update the row numbers after removing a row
                element.children[0].textContent = element.rowIndex;
            }
            // disable button if the number of authors is 1
            if (authorBody.children.length == 1) {
                removeAuthorRow[0].disabled = true;
            }
        });
    }

    for (element of authorBody.children) {
        // Update the row numbers after adding a new row
        element.children[0].textContent = element.rowIndex;
    }
});




document.addEventListener('DOMContentLoaded', function () {
    const tagInput = document.getElementById('input-keywords');
    const tagContainer = document.getElementById('tagContainer');
    const keyNumb = document.getElementById('key-numb');
    let maxKeys = 6;
    const keywords = [];

    tagInput.addEventListener('keydown', function (event) {
        // Hide warning message if the user starts typing again
        document.getElementById('keywords-warning').style.display = 'none';
        // Check if the user pressed Enter or comma
        if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault();
            // Get the value of the input field and remove whitespaces
            const tagValue = tagInput.value.trim();

            if (tagValue) {
                if (keywords.length < maxKeys) {
                    // Check if the keyword already exists
                    if (keywords.includes(tagValue.toLowerCase())) {
                        tagInput.value = '';
                        return;
                    }
                    // Add the keyword to the array and create a tag
                    keywords.push(tagValue);
                    createTag(tagValue);
                    tagInput.value = '';
                    // Update the number of keywords left
                    keyNumb.textContent = maxKeys - keywords.length;
                } else {
                    tagInput.value = '';
                    // Show warning message if the user tries to add more keywords
                    document.getElementById('keywords-warning').style.display = 'block';
                }
            }
        }
    });

    function createTag(tagText) {
        const tagElement = document.createElement('div');
        tagElement.className = 'btn btn-secondary me-2 mt-2';

        const tagTextElement = document.createElement('span');
        tagTextElement.textContent = tagText;

        const tagCloseElement = document.createElement('span');
        tagCloseElement.className = 'ms-2';
        tagCloseElement.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        tagCloseElement.addEventListener('click', function () {
            // Remove the tag from the DOM
            tagElement.remove();
            // Remove the tag from the array
            keywords.splice(keywords.indexOf(tagText), 1);
            // Update the number of keywords left
            keyNumb.textContent = maxKeys - keywords.length;
        });

        tagElement.appendChild(tagTextElement);
        tagElement.appendChild(tagCloseElement);
        tagContainer.appendChild(tagElement);
    }
});