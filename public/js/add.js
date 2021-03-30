async function newFormHandler(event) {
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
    }
  }
  
  document.querySelector('.add').addEventListener('submit', newFormHandler);