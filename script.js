// API URL
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// DOM elements
const postsList = document.getElementById('postsList');
const postForm = document.getElementById('postForm');
const refreshBtn = document.getElementById('refreshBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');

// Fetch posts when page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();

    // Add event listeners
    postForm.addEventListener('submit', handlePostSubmit);
    refreshBtn.addEventListener('click', fetchPosts);
});

// Fetch posts (GET request)
async function fetchPosts() {
    showLoading();
    hideError();

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const posts = await response.json();
        displayPosts(posts.slice(0, 5)); // Show first 5 posts
        hideLoading();

    } catch (err) {
        console.error('Error fetching products:', err);
        showError('An error occurred while loading the data.');
        hideLoading();
    }
}

// Display posts
function displayPosts(posts) {
    postsList.innerHTML = '';

    if (posts.length === 0) {
        postsList.innerHTML = '<p class="no-posts">No products available yet.</p>';
        return;
    }

    posts.forEach(post => {
        const postElement = createPostElement(post);
        postsList.appendChild(postElement);
    });
}

// Create post element
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-card';
    postDiv.innerHTML = `
        <div class="post-header">
            <div>
                <div class="post-title">${escapeHtml(post.title)}</div>
                <div class="post-body">${escapeHtml(post.body)}</div>
                ${post.price ? `<div class="post-price"><strong>Price:</strong> ${escapeHtml(post.price)} ₺</div>` : ''}
            </div>
            <span class="post-id">#${post.id}</span>
        </div>
        <div class="post-actions">
            <button type="button" class="btn btn-danger" onclick="deletePost(${post.id})">
                🗑️ Delete
            </button>
        </div>
    `;

    return postDiv;
}

// Add new post (POST request)
async function handlePostSubmit(event) {
    event.preventDefault();

    const formData = new FormData(postForm);
    const title = formData.get('title').trim();
    const body = formData.get('body').trim();
    const price = formData.get('price'); // no trim, it's a number input

    if (!title || !body) {
        showError('Please fill in both the title and content fields.');
        return;
    }

    const postData = {
        title: title,
        body: body,
        price: price,
        userId: 1 // fixed user ID for JSONPlaceholder
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newPost = await response.json();

        postForm.reset();
        showSuccessMessage('Product successfully added!');
        fetchPosts();

    } catch (err) {
        console.error('Error adding product:', err);
        showError('An error occurred while adding the product.');
    }
}

// Delete post (DELETE request) — works globally with onclick
window.deletePost = async function(postId) {
    if (!confirm(`Are you sure you want to delete product #${postId}?`)) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${postId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        showSuccessMessage(`Product #${postId} successfully deleted!`);
        fetchPosts();

    } catch (err) {
        console.error('Error deleting product:', err);
        showError('An error occurred while deleting the product.');
    }
};

// Helper functions
function showLoading() {
    loading.classList.remove('hidden');
    postsList.innerHTML = '';
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showError(message) {
    error.innerHTML = `<p>❌ ${message}</p>`;
    error.classList.remove('hidden');
}

function hideError() {
    error.classList.add('hidden');
}

function showSuccessMessage(message) {
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) existingMessage.remove();

    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `<p>✅ ${message}</p>`;

    const formSection = document.querySelector('.form-section');
    formSection.insertBefore(successDiv, formSection.firstChild);

    setTimeout(() => {
        if (successDiv.parentNode) successDiv.remove();
    }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');

// Apply theme from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeToggle.textContent = '☀️ Light Mode';
    }
});

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️ Light Mode';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙 Dark Mode';
    }
});
