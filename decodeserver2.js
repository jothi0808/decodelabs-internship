// ===================================================
// PROJECT 2 - BACKEND API DEVELOPMENT
// DecodeLabs Internship
// ===================================================

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// ---------- MIDDLEWARE ----------
app.use(express.json());      // lets server understand JSON sent from client
app.use(cors());              // allows frontend (different port) to call this API

// ---------- FAKE DATABASE (temporary in-memory storage) ----------
let users = [
  { id: 1, name: "Aditi", email: "aditi@example.com" },
  { id: 2, name: "Rahul", email: "rahul@example.com" }
];

// ---------- ROUTES ----------

// Health check route - just to confirm server is alive
app.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome to the Project 2 Backend API!" });
});

// GET all users
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// GET a single user by id
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json(user);
});

// POST - create a new user (with validation)
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  // ----- Basic validation -----
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  if (typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: "Name must be a valid non-empty string" });
  }
  if (!email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (emailExists) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name: name.trim(),
    email: email.trim()
  };

  users.push(newUser);
  res.status(201).json(newUser); // 201 = Created
});

// DELETE a user (bonus - not required, but good practice)
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(index, 1);
  res.status(200).json({ message: "User deleted successfully" });
});

// ---------- 404 HANDLER (for undefined routes) ----------
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});