// const billboard = require("../../../models/billboard");

// Wait for the DOM to completely load before we run our JS
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded! 🚀');

  const userContainer = document.querySelector('.user-container');
  const postContainer = document.getElementById('form-now')

  let user;

  //fetch user email for profile card.
  const getUserDetails = () => {

    fetch(`/api/user_data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        users = data;
        console.log('Success in getting user information:', data);
        addEmail(users)

      })
      .catch((error) => console.error('Error:', error));
  };

  getUserDetails()

  const addEmail = (users) => {
    console.log("Hello")
    console.log('createNewRow -> user', users)
    const email = document.getElementById('email');

    email.textContent = `Email: ${users.email}`


  }



  const getUserPosts = () => {

    fetch(`/api/billboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        billboards = data;
        console.log('Success in getting user information:', data);
        //pairuserPosts(billboards)
        //initializeRows(billboards)
        createNewRow(billboards)
      })
      .catch((error) => console.error('Error:', error));
  };

  getUserPosts();

  // const pairuserPosts = (billboards) => {
  //   console.log(user.email)
  //   if (billboards.User.email === user.email) {
  //     createuserRow(billboards)
  //   } else {
  //     const alertDiv = document.createElement('div');
  //     alertDiv.classList.add('alert', 'alert-danger');
  //     alertDiv.textContent = 'Must have at least one user to post';
  //     alertDiv.id = 'removeMe';
  //     alertDiv.style.marginRight = '5px';
  //     return alertDiv;
  //   }
  // }
  // const initializeRows = () => {
  //   postContainer.innerHTML = '';
  //   const postsToAdd = [];

  //   billboards.forEach((billboard) => postsToAdd.push(createNewRow(billboard)));
  //   postsToAdd.forEach((billboard) => postContainer.append(billboard));
  // };

  const createNewRow = (billboards) => {
    console.log(billboards)
    console.log('createNewRow -> billboard', billboards);
    //const newRow = document.createElement('tr');
    const newRow = document.getElementById('form-row')
    newRow.setAttribute('data-user', JSON.stringify(billboards));

    // Set each user's ID on the element itself
    //tr.id = billboards.id;
    // const postTitle = document.getElementById('title')
    // const postDate = document.getElementById('date')
    // const addPost = document.getElementById('post')
    // const createNew = document.getElementById('create')
    // const deletePost = document.getElementById('delete')
    
    const td = document.createElement('td');
    td.textContent = billboards[0].title;
    newRow.appendChild(td);
    console.log(billboards[0].title)
    console.log(td.textContent = billboards[0].title)
    console.log(newRow)
    //postContainer.appendChild(newRow)
    
    // td.textContent = billboards.post;
    // tr.appendChild(td);
    // Element to show how many posts
    // const lengthTd = document.createElement('td');
    // if (userData.Posts) {
    //   lengthTd.textContent = userData.Posts.length;
    // } else {
    //   lengthTd.textContent = '0';
    // }
    //tr.appendChild(lengthTd);

    // "Go to posts" link
    const postsLink = document.createElement('td');
    postsLink.innerHTML = `<td><a href='/billboard-add.html?Billboard_id=${billboards[0].id}'>Update Post</a></td>`;
    newRow.appendChild(postsLink);

    // // "Create a post" link
    const createLink = document.createElement('td');
    createLink.innerHTML = `<td><a href='/billboard-add.html'>Create a Post</a></td>`;
    newRow.appendChild(createLink);

    // "Delete user" link
    const deleteLink = document.createElement('td');
    deleteLink.innerHTML = `<td><a style='cursor:pointer;color:red' class='delete-user'>Delete Post</a></td>`;
    deleteLink.addEventListener('click', deletebillboard);
    newRow.appendChild(deleteLink);
    console.log(newRow)
    // // Return the table row
    return newRow;
    
  };

  //need to set this up to delete!
  const deletebillboard = (id) => {
    fetch(`/api/billboard/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(getUserDetails);
  };


});
