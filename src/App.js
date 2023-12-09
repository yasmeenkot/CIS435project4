import React, {useState} from 'react';
import './App.css';
import './Menu.js';

function App() {
  const [items, setItems] = useState([])
  const [category, setCategory] = useState([])

  fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=a5ced9553964428fa6dc4a7aec26f6fe`)
  .then(response => response.json())
  .then(data => {
    setItems(data.articles)
  })
  .catch(error => {
      console.error("Error fetching data:", error);
  });

  return (
    <div className="App">
      <h1>News Site</h1>
    </div>
  );
}

export default App;
