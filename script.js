function fetchGitHubData() {
    const username = document.getElementById('username').value;
    const token = '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'; // Replace with your actual token 

    // Fetch user profile data
    fetch(`https://api.github.com/users/${username}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        displayUserProfile(data);
        // Fetch user repositories
        return fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.statusText}`);
        }
        return response.json();
    })
    .then(repos => {
        displayUserRepositories(repos);
    })
    .catch(error => {
        console.error('Error fetching GitHub data:', error);
        // In your JavaScript code
    document.getElementById('profile').innerHTML = '<span class="error-message">Error fetching GitHub data. Please check the username and try again.</span>';

        document.getElementById('repositories').innerHTML = '';
    });
}

function displayUserProfile(user) {
    const profilePicture = document.getElementById('profile-picture');
    const profileName = document.getElementById('profile-name');
    const profileBio = document.getElementById('profile-bio');
    const profileFollowers = document.getElementById('profile-followers');
    
    profilePicture.src = user.avatar_url;
    profileName.textContent = user.name || 'No name';
    profileBio.textContent = user.bio || 'No bio available';
    profileFollowers.textContent = `Followers: ${user.followers || 0}`;
}

function displayUserRepositories(repos) {
    const repositoriesContainer = document.getElementById('repositories');
    repositoriesContainer.innerHTML = '<h2>Repositories:</h2>';

    if (repos.length === 0) {
        repositoriesContainer.innerHTML += '<p>No repositories found.</p>';
        return;
    }

    const ul = document.createElement('ul');
    repos.forEach(repo => {
        const li = document.createElement('li');
        li.textContent = repo.name;
        ul.appendChild(li);
    });

    repositoriesContainer.appendChild(ul);
}