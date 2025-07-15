// API URL
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// DOM elementleri
const postsList = document.getElementById('postsList');
const postForm = document.getElementById('postForm');
const refreshBtn = document.getElementById('refreshBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');

// Sayfa yüklendiğinde postları getir
document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();
    
    // Event listenerları ekle
    postForm.addEventListener('submit', handlePostSubmit);
    refreshBtn.addEventListener('click', fetchPosts);
});

// POSTları getir (GET işlemi)
async function fetchPosts() {
    showLoading();
    hideError();
    
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const posts = await response.json();
        displayPosts(posts.slice(0, 5)); // İlk 5 postu göster
        hideLoading();
        
    } catch (err) {
        console.error('Ürün getirme hatası:', err);
        showError('Veriler yüklenirken bir hata oluştu.');
        hideLoading();
    }
}

// Postları görüntüle
function displayPosts(posts) {
    postsList.innerHTML = '';
    
    if (posts.length === 0) {
        postsList.innerHTML = '<p class="no-posts">Henüz ürün bulunmuyor.</p>';
        return;
    }
    
    posts.forEach(post => {
        const postElement = createPostElement(post);
        postsList.appendChild(postElement);
    });
}

// Post elementi oluştur
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-card';
    postDiv.innerHTML = `
        <div class="post-header">
            <div>
                <div class="post-title">${escapeHtml(post.title)}</div>
                <div class="post-body">${escapeHtml(post.body)}</div>
                ${post.price ? `<div class="post-price"><strong>Fiyat:</strong> ${escapeHtml(post.price)} ₺</div>` : ''}
            </div>
            <span class="post-id">#${post.id}</span>
        </div>
        <div class="post-actions">
            <button type="button" class="btn btn-danger" onclick="deletePost(${post.id})">
                🗑️ Sil
            </button>
        </div>
    `;
    
    return postDiv;
}

// Yeni post ekle (POST işlemi)
async function handlePostSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(postForm);
    const title = formData.get('title').trim();
    const body = formData.get('body').trim();
    const price = formData.get('price');  // trim yok, number input için
    
    if (!title || !body) {
        showError('Lütfen başlık ve içerik alanlarını doldurun.');
        return;
    }
    
    const postData = {
        title: title,
        body: body,
        price: price,
        userId: 1 // JSONPlaceholder için sabit user ID
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
        showSuccessMessage('Ürün başarıyla eklendi!');
        fetchPosts();
        
    } catch (err) {
        console.error('Ürün ekleme hatası:', err);
        showError('Ürün eklenirken bir hata oluştu.');
    }
}

// Post sil (DELETE işlemi) — GLOBAL yapınca onclick calısıyor
window.deletePost = async function(postId) {
    if (!confirm(`Ürün #${postId} silmek istediğinizden emin misiniz?`)) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${postId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        showSuccessMessage(`Ürün #${postId} başarıyla silindi!`);
        fetchPosts();
        
    } catch (err) {
        console.error('Ürün silme hatası:', err);
        showError('Ürün silinirken bir hata oluştu.');
    }
};

// Yardımcı fonksiyonlar
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

// Tema Değiştirici
const themeToggle = document.getElementById('themeToggle');

// Sayfa yüklendiğinde localStorage'dan temayı uygula
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeToggle.textContent = '☀️ Light Mode';
    }
});

// Butona tıklanınca tema değiştir
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

