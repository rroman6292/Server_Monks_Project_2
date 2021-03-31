const updateButtonHandler = async (event) => {
    event.preventDefault();
    const first_name = document.querySelector('#first_name').value.trim();
    const last_name = document.querySelector('#last_name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const role = document.querySelector('#role').value.trim();

    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
        alert("Update Succesful");
      } else {
        alert('Failed to update the user');
      }
    }
  };

  document
  .querySelector('.update')
  .addEventListener('click', updateButtonHandler);