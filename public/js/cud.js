//Function that retrieves the employee information and calls the create user endpoint.
async function addButtonHandler(event) {
    event.preventDefault();
    const first_name = document.querySelector('#first_name').value;
    const last_name = document.querySelector('#last_name').value;
    const email = document.querySelector('#email').value;
    const role = document.querySelector('#role').value;
  
    const response = await fetch(`/api/user`, {
      method: 'POST',
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        role,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add employee');
    };
};
  
  

//Function that retrieves the employee information and calls the delete user endpoint.
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
        };
    };
};

  //Function that retrieves the employee information and calls the update user endpoint.
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
        };
    };
};

document.querySelector('.add').addEventListener('click', addButtonHandler);

document.querySelector('.update').addEventListener('click', updateButtonHandler);

document.querySelector('.delete').addEventListener('click', delButtonHandler);