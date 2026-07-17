<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Project 2 - Full Stack Demo</title>
<style>
  body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 0 20px; }
  h1 { color: #4a7c59; }
  input { padding: 8px; margin: 5px 0; width: 100%; box-sizing: border-box; }
  button { padding: 8px 16px; background: #4a7c59; color: white; border: none; cursor: pointer; margin-top: 8px; }
  button:hover { background: #3a6247; }
  ul { list-style: none; padding: 0; }
  li { padding: 10px; border: 1px solid #ddd; margin: 6px 0; border-radius: 4px; }
  #error { color: red; margin-top: 10px; }
</style>
</head>
<body>

<h1>Project 2: Users API Demo</h1>

<h3>Add a User</h3>
<input id="name" placeholder="Name" />
<input id="email" placeholder="Email" />
<button onclick="addUser()">Add User</button>
<div id="error"></div>

<h3>All Users</h3>
<script>
  const API_URL = "http://localhost:3000";

  // Fetch and display all users (GET request)
  async function loadUsers() {
    const res = await fetch(`${API_URL}/users`);
    const users = await res.json();

    const list = document.getElementById('userList');
    list.innerHTML = '';
    users.forEach(u => {
      const li = document.createElement('li');
      li.textContent = `#${u.id} - ${u.name} (${u.email})`;
      list.appendChild(li);
    });
  }

  // Send a new user to the backend (POST request)
  async function addUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = '';

    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });

    const data = await res.json();

    if (!res.ok) {
      errorDiv.textContent = data.error; // show validation error from backend
      return;
    }

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    loadUsers(); // refresh the list
  }

  loadUsers(); // load users when page opens
</script>

</body>
</html>