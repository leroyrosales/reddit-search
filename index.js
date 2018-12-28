import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e => {

	e.preventDefault();

	const searchTerm = searchInput.value;
	const sortBy = document.querySelector('input[name="sortby"]:checked').value;
	const searchLimit = document.getElementById('limit').value;

	// show error if nothing entered
	if(searchTerm === ''){
		showMessage('Please enter a search term.', 'alert-danger');
	}

	// clears input after search
	searchInput.value = '';

	// Search reddit
	reddit.search(searchTerm, searchLimit, sortBy)
		.then(results => {

			let output = '<div class="card-columns">';
			// loop thru posts
			results.forEach(post => {
				// Check for image
				const image = post.preview ? post.preview.images[0].source.url : 'https://source.unsplash.com/random/100x100';
				output += `
					<article class="card">
						<img class="card-img-top" src="${image}">
						<div class="card-body">
							<p class="card-title display-6">${post.title}</p>
							<p clas="card-text">${truncateText(post.selftext, 100)}<p>
							<a href="${post.url}" target="_blank" class="btn btn-primary d-block">See post</a>
							<a href="${post.subreddit}" target="_blank"><span class="badge badge-info">${post.subreddit}</span></a>
						</div>
					</article>	
				`;
			});
			output += '</div>';
			document.getElementById('results').innerHTML = output;
		});


});


function showMessage(message, className){
	const div = document.createElement('div');

	div.className = `alert ${className}`;

	div.appendChild(document.createTextNode(message));

	const searchContainer = document.getElementById('search-container');

	const search = document.getElementById('search');

	searchContainer.insertBefore(div, search);

	setTimeout(() => document.querySelector('.alert').remove(), 2000);

}

function truncateText(text, limit) {
	const shortened = text.indexOf(' ', limit);
	if(shortened == -1) return text;
	return text.substring(0, shortened);
}

