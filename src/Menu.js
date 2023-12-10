import React from 'react';

function Menu({ setCategory }) {
    const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];
  
    return (
      <div className="Menu">
        {categories.map((category, index) => (
            <button key={index} onClick={() => setCategory(category)}>{category}</button>
          ))}
      </div>
    );
  }
export default Menu;