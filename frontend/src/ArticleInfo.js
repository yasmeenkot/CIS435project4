import React from 'react';

function ArticleInfo({item}) {
  return (
    <div className="ArticleInfo">
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <p>Author: {item.author}</p>
      <p>Published: {new Date(item.publishedAt).toLocaleString()}</p>
      <img src={item.urlToImage} alt={item.title} />
      <a href={item.url}>
        Read more
      </a>
      <hr />
    </div>
  );
}
export default ArticleInfo;