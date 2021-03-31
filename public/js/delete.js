const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
        alert("Delete Succesful");
      } else {
        alert('Failed to delete user');
      }
    }
  };

  document
  .querySelector('.delete')
  .addEventListener('click', delButtonHandler);