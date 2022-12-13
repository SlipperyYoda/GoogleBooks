const Clear = document.getElementById('Clear');
const div = document.getElementById('header');

Clear.addEventListener('click', function handleClick(event) {
  // 👇️ if you are submitting a form (prevents page reload)
  event.preventDefault();

  const SearchInput = document.getElementById('search-box');

  // Send value to server
  console.log(SearchInput.value);

  // 👇️ clear input field
  SearchInput.value = '';
});

div.style.color="white";
