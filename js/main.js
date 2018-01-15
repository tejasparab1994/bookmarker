// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e) {
  // Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl,
  };

  //local storage test; only stores strings.

  // localStorage.setItem('test', 'Hello World');
  // console.log(localStorage.getItem('test'));
  // localStorage.removeItem('test');
  // console.log(localStorage.getItem('test'));
  // Init array
  var bookmarks = [];

  // Test if bookmarks is null
  if (localStorage.getItem('bookmarks') === null) {

    // Add to array
    bookmarks.push(bookmark);

    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  } else {
    // Get Bookmarks from localStorage
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // add bookmark to array
    bookmarks.push(bookmark);

    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('myForm').reset();

  // Re-fetch bookmarksResults
  fetchBookmarks();

  //Prevent form from submitting
  e.preventDefault();
}

// Delete bookmarks
function deleteBookmark(url) {
  //Get bookmarks from localStorage
  bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // Loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      //REMOVE from array
      bookmarks.splice(i, 1);
    }
  }

  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarksResults
  fetchBookmarks();
}

//Fetch bookmarks
function fetchBookmarks() {
  // Get Bookmarks from localStorage
  bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //GET output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  //build output
  bookmarksResults.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="card bg-light p-4 text-muted">' +
                                  '<h3>' + name +
                                  ' <a onclick="deleteBookmark(\'' + url + '\')" class= "btn btn-danger float-right"  href="#">Delete</a> ' +
                                  ' <a class= "btn btn-info float-right" target="_blank" href="' + url + '">Visit</a> ' +
                                  '</h3>' +
                                  '</div>';
  }
}

//Validate form
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Please use a valid URL');
    return false;
  }

  return true;
}
