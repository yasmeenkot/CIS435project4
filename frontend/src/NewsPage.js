import React, {useState, useEffect} from 'react';
import './App.css';
import Menu from './Menu';
import ArticleInfo from './ArticleInfo';

function NewsPage() {
    const [items, setItems] = useState([])
    const [category, setCategory] = useState("general")
    const [active, setActive] = useState("general")

    useEffect(() => {
        fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=a3c18032f5804dfdb6402488376b796e`)
          .then(response => response.json())
          .then(data => {
            const filteredItems = data.articles.filter(item => !item.title.toLowerCase().includes("removed"));
            setItems(filteredItems)
          })
          .catch(error => {
            console.error("Error fetching data:", error);
          });
          setActive(category);
        },[category])

    return (
        <div className="App">
            <h1>News Site</h1>
            <Menu setCategory={setCategory} activeCategory={active}/>
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

  export default NewsPage;