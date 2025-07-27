# AJAX and Fetch API Operations

This project demonstrates how to perform basic API operations such as GET, POST, and DELETE using the Fetch API and AJAX. It uses the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) test API service.

## Project Structure

- `index.html`: The main interface of the project.
- `script.js`: Contains the JavaScript codes using the Fetch API.
- `style.css`: Custom styles.
- `README.md`: Project documentation.

## Features

- ✅ **GET**: Displays all posts from the API.
- ✅ **POST**: Adds a new post with user input.
- ✅ **DELETE**: Deletes the selected post.
- ✅ **Responsive UI**: Modern and mobile-friendly design.
- ✅ **Error Handling**: Alerts if something goes wrong.
- ✅ **Loading Indicator**: Shows spinner while data is loading.

## Usage

1. Clone or download the project files.
2. Open `index.html` in a browser.
3. You will see a list of posts.
4. You can add a new post using the form.
5. You can delete any post by clicking the “Delete” button.

## Example API Operations

### GET (Read Data)

```javascript
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    // process and display posts
  });

### POST (Create Data)
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
  body: JSON.stringify({
    title: "Post Title",
    body: "Post Body",
    userId: 1,
  }),
})
  .then((response) => response.json())
  .then((newPost) => {
    // display the new post
  });


### DELETE (Remove Data)
fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  method: "DELETE",
})
  .then(() => {
    // remove post from UI
  });


## 🎯 Learning Objectives

With this application, you can learn:

- **Fetch API**: Making HTTP requests using modern JavaScript  
- **AJAX**: Asynchronous data fetching and sending  
- **DOM Manipulation**: Modifying HTML elements with JavaScript  
- **Event Handling**: Capturing user interactions  
- **Error Handling**: Managing errors and exceptions  
- **Form Handling**: Processing form data  

## 🎨 Features

- **Responsive Design**: Compatible with both mobile and desktop  
- **Modern UI**: Gradient backgrounds and shadow effects  
- **Animations**: Smooth transitions and hover effects  
- **Loading Spinner**: Visual feedback during data loading  
- **Success/Error Messages**: Notifications for operation outcomes  
- **XSS Protection**: HTML escaping function for security  

## 🔍 Console Commands

You can use the following functions in the browser's developer console:

- `fetchPosts()` - Fetch products using the Fetch API  
- `fetchPostsWithAJAX()` - Fetch products using XMLHttpRequest  
- `deletePost(id)` - Delete a product by its ID  

## 📚 Technologies

- **HTML5**: Semantic markup  
- **CSS3**: Flexbox, Grid, Animations  
- **JavaScript ES6+**: Async/await, Fetch API, Arrow functions  
- **JSONPlaceholder API**: Free API for testing purposes  

## 🚀 Development

To improve this project:

1. Add new features (PUT method, search, filtering)  
2. Use different APIs  
3. Add data storage with LocalStorage  
4. Enhance UI/UX with advanced features  

## 📝 Note

The JSONPlaceholder API is for testing purposes only and does not make real data changes. POST and DELETE requests are simulated.


**Geliştirici**: AJAX ve Fetch API Öğrenme Projesi
**API**: https://jsonplaceholder.typicode.com/ 
