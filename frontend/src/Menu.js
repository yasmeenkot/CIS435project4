import React from 'react';

function Menu({ setCategory, activeCategory }) {
  const categories = ['General', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];

  return (
    <div className="Menu">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => setCategory(category)}
          className={category === activeCategory ? 'active' : ''}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Menu;
