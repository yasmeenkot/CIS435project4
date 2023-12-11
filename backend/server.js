const express = require('express');
const cors = require('cors');
const app = express()
const pool = require('./db');

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    const { username, password} = req.body;

    try {
      const userExists = await checkUserExists(username);
      if (userExists){
        return res.status(400).json({ success: false, message: 'Username already exists'});
      }

      const newUser = await addUser(username, password);
      res.json({ success: true, user: newUser});
    } catch (error) {
      console.error('User registration failed:', error);
      res.status(500).json({ success: false, message: 'User registration failed'});
    }
});

async function checkUserExists(username){
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM login WHERE username = ?', [username], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.length > 0);
      }
    });
  });
}

async function addUser(username, password) {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO login (username, password) VALUES (?, ?)',
      [username, password],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            userID: results.insertId,
            username,
          });
        }
      }
    );
  });
}

app.post('/login', async (req, res) => {
  const { username, password} = req.body;

  try {
      const user = await authenticateUser(username, password);
      res.json({ success: true, user });
  } catch (error) {
      res.status(401).json({ success: false, message: 'Invalid credentials'});
  }
});

async function authenticateUser(username, password) {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT * FROM login WHERE username = ?',
        [username],
        async (error, results) => {
          if (error) reject(error);
  
          if (results.length > 0) {
            const storedPassword = results[0].password;
  
            if (password === storedPassword) {
              resolve({
                userID: results[0].userID,
                role: results[0].role,
                username: results[0].username,
              });
            } else {
              reject('Invalid password');
            }
          } else {
            reject('User not found');
          }
        }
      );
    });
  }


app.listen(5000, () => {console.log("Server started on port 5000")})