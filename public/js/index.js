

$(document).ready(function() {
  var item, tile, author, publisher, publishedDate, isbnNumber, bookLink, book10, bookImg;
  var outputList = document.getElementById("list-output");
  var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  var apiKey = "key=AIzaSyDtXC7kb6a7xKJdm_Le6_BYoY5biz6s8Lw";
  var placeHldr = '<img src="https://via.placeholder.com/150">';
  var searchData;
  var CatalogueData;

  //listener for search button
 //listener for search button
 $("#search").click(function() {
  outputList.innerHTML = ""; //empty html output
  document.body.style.backgroundImage = "url('')";
   searchData = $("#search-box").val();
   //handling empty search input field
   if(searchData === "" || searchData === null) {
     displayError();
   }
     //checks if ISBN is shorter than usual (All ISBNs are either 10 or 13 characters)
    else if(searchData.length <= 10) {
      displayError1();
    }

     else {
      displayError2()
      // console.log(searchData);
      // $.get("https://www.googleapis.com/books/v1/volumes?q="+searchData, getBookData()});
      $.ajax({
         url: bookUrl + searchData,
         dataType: "json",
         success: function(response) {
           console.log(response)
           if (response.totalItems === 0) {
             alert("no result!.. try again")
           }

           else {
             $("#title").animate({'margin-top': '5px'}, 1000); //search box animation
             $(".book-list").css("visibility", "visible");
             displayResults(response);
           }
         },
         error: function () {
           alert("Something went wrong.. <br>"+"Try again!");
         }
       });
     }
     $("#search-box").val(""); //clearn search box
  });

   /*
   * function to display result in index.html
   * @param response
   */
   function displayResults(response) {
    for (var i = 0; i < response.items.length; i+=2) {
      item = response.items[i];
      title1 = item.volumeInfo.title;
      author1 = item.volumeInfo.authors;
      publisher1 = item.volumeInfo.publisher;
      publishedDate1 = item.volumeInfo.publishedDate;
      edition1 = item.volumeInfo.edition;
      bookLink1 = item.volumeInfo.previewLink;
      bookIsbn = item.volumeInfo.industryIdentifiers[1].identifier
      book101 = item.volumeInfo.industryIdentifiers[0].identifier
      bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr ;

      item2 = response.items[i+1];
      title2 = item2.volumeInfo.title;
      author2 = item2.volumeInfo.authors;
      publisher2 = item2.volumeInfo.publisher;
      publishedDate2 = item2.volumeInfo.publishedDates;
      edition2 = item2.volumeInfo.edition;
      bookLink2 = item2.volumeInfo.previewLink;
      bookIsbn2 = item2.volumeInfo.industryIdentifiers[1].identifier
      book102 = item2.volumeInfo.industryIdentifiers[0].identifier
      bookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeHldr ;

      // in production code, item.text should have the HTML entities escaped.
      outputList.innerHTML += '<div class="row mt-4">' +
                              formatOutput(bookImg1, title1, author1, publisher1, publishedDate1, edition1, bookLink1, book101, bookIsbn) +
                              formatOutput(bookImg2, title2, author2, publisher2, publishedDate2, edition2, bookLink2, book102, bookIsbn2) +
                              '</div>';

      console.log(outputList);
    }
 }

   /*
   * card element formatter using es6 backticks and templates (indivial card)
   * @param bookImg title author publisher bookLink
   * @return htmlCard
   */
   function formatOutput(bookImg, title, author, publisher, publishedDate, edition, bookLink, book10, bookIsbn) {
    // console.log(title + ""+ author +" "+ publisher +" "+ publishedDate +" "+ edition +" "+ bookLink+" "+ bookImg)
    var viewURL ='book.html?isbn='+bookIsbn; //constructing link for bookviewer
    var Group = 'category.html?isbn='+bookIsbn; //constructs link for adding book to category
    var NotFound = '404.html?isbn='+bookIsbn;// constructs link for error if invalid isbn
    var htmlCard = `<div class="col-lg-6">
      <div class="card" style="">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${bookImg}" class="card-img" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">Author: ${author}</p>
              <p class="card-text">ISBN-10: ${book10}</p>
              <p class="card-text">ISBN-13: ${bookIsbn}</p>
              <p class="card-text">Date: ${publishedDate}</p>
              <p class="card-text">Publisher: ${publisher}</p>
              <a target="_blank" href="${viewURL}" class="btn btn-secondary">Read Book</a>
              <a target="_blank" href="${NotFound}" class="btn btn-secondary">Add to Catalogue</a>
            </div>
          </div>
        </div>
      </div>
    </div>`
    return htmlCard;
  }

   //handling error for empty search box
   function displayError() {
     alert("search term can not be empty!")
   }
//Displays if the ISBN isn't valid
   function displayError1() {
    alert("Too Short! Make sure you put it in correctly!")
  }
  //Displays if Book Isn't in Library Already
  function displayError2() {
    alert("The Book might not exist in the library, Results will be or similiar to the book you've inputted.")
  }});