// Display the popup when the add button or new button is clicked
document.getElementById('add-button').addEventListener('click', function () {
    document.getElementById('popup-form').style.display = 'block';
});
document.getElementById('new-btn').addEventListener('click', function () {
    document.getElementById('popup-form').style.display = 'block';
});

// Handle form submission
document.getElementById('prescription-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from submitting traditionally

    // Get the form data
    const description = document.getElementById('description').value;
    const fileUpload = document.getElementById('file-upload').files[0];
    const date = new Date().toLocaleDateString();

    // Hide the popup and first div, and show the second div
    document.getElementById('popup-form').style.display = 'none';
    document.querySelector('.first').style.display = 'none';
    document.querySelector('.second').style.display = 'block';

    // Create a new row in the table
    const tableBody = document.getElementById('prescription-data');
    const newRow = document.createElement('tr');

    // Create cells for the new row
    const fileCell = document.createElement('td');
    const statusCell = document.createElement('td');
    const descriptionCell = document.createElement('td');
    const dateCell = document.createElement('td');

    // Insert data into cells
    fileCell.textContent = fileUpload ? fileUpload.name : 'No file uploaded';
    statusCell.textContent = 'Pending';  // Assuming a default status for new uploads

    // Truncate long descriptions and add a "More" button
    let truncatedDescription = description;
    if (description.length > 50) {  // Adjust this number as needed
        truncatedDescription = description.substring(0, 50) + '... ';
        const moreButton = document.createElement('button');
        moreButton.textContent = 'More';
        moreButton.className = 'more-btn';
        moreButton.style.border = 'none';
        moreButton.style.background = 'none';
        moreButton.style.color = 'blue';
        moreButton.style.cursor = 'pointer';
        moreButton.addEventListener('click', function () {
            // Show the full description with line breaks
            descriptionCell.innerHTML = description.replace(/\n/g, '<br>');
        });
        descriptionCell.appendChild(document.createTextNode(truncatedDescription));
        descriptionCell.appendChild(moreButton);
    } else {
        descriptionCell.innerHTML = description.replace(/\n/g, '<br>');
    }

    dateCell.textContent = date;

    // Append cells to the new row
    newRow.appendChild(fileCell);
    newRow.appendChild(statusCell);
    newRow.appendChild(descriptionCell);
    newRow.appendChild(dateCell);

    // Append the new row to the table body
    tableBody.appendChild(newRow);

    // Optionally, reset the form after submission
    document.getElementById('prescription-form').reset();
});

// Handle logout button click
document.getElementById('logout-button').addEventListener('click', function () {
    window.location.href = 'index.html';
});
