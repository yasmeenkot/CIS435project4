import React, {useState, useEffect} from 'react';
import './App.css';
import Menu from './Menu';
import ArticleInfo from './ArticleInfo';

function App() {
  const [items, setItems] = useState([])
  const [category, setCategory] = useState("general")

  useEffect(() => {
  fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=a5ced9553964428fa6dc4a7aec26f6fe`)
    .then(response => response.json())
    .then(data => {
      setItems(data.articles)
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  },[category])
  
  return (
    <div className="App">
      <h1>News Site</h1>
      <Menu setCategory={setCategory} />
      <NewsItems items={items} />
    </div>
  );
}

function NewsItems({items}) {
  return (
    <div className="NewsItems">
      {items && items.length > 0 ? (
        items.map((item, i) => <ArticleInfo key={i} item={item} />)
      ) : (
        <p>No news available for the selected category.</p>
      )}
    </div>
  );
}

export default App;
