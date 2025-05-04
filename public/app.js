document.getElementById('fetchResultsBtn').addEventListener('click', function() {
    fetch('https://assume-breach-project.onrender.com/api/results')
        .then(response => response.json())
        .then(data => {
            document.getElementById('results').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        })
        .catch(error => {
            document.getElementById('results').innerHTML = 'Error fetching data';
            console.error('Error:', error);
        });
});
