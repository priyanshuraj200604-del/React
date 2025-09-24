import React, { useState } from 'react';

const LibraryManagement = () => {
  // Initial book data
  const [books, setBooks] = useState([
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');

  // Filter books based on search term
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add new book
  const addBook = () => {
    if (newBookTitle.trim() && newBookAuthor.trim()) {
      const newBook = {
        id: books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1,
        title: newBookTitle.trim(),
        author: newBookAuthor.trim()
      };
      setBooks([...books, newBook]);
      setNewBookTitle('');
      setNewBookAuthor('');
    }
  };

  // Remove book
  const removeBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  // Handle Enter key press for adding books
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addBook();
    }
  };

  const containerStyle = {
    padding: '32px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  };

  const wrapperStyle = {
    maxWidth: '1024px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  };

  const boxStyle = {
    backgroundColor: 'white',
    border: '2px solid #9ca3af',
    padding: '24px'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '24px',
    margin: '0 0 24px 0'
  };

  const searchInputStyle = {
    width: '288px',
    padding: '8px 12px',
    border: '1px solid #9ca3af',
    fontSize: '14px',
    color: '#6b7280',
    backgroundColor: '#f9f9f9',
    marginBottom: '16px'
  };

  const searchInputFilledStyle = {
    ...searchInputStyle,
    color: 'black'
  };

  const formContainerStyle = {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px'
  };

  const inputStyle = {
    padding: '8px 12px',
    border: '1px solid #9ca3af',
    fontSize: '14px',
    width: '160px',
    color: '#6b7280',
    backgroundColor: '#f9f9f9'
  };

  const buttonStyle = {
    backgroundColor: '#e5e7eb',
    color: 'black',
    padding: '8px 16px',
    fontSize: '14px',
    border: '1px solid #9ca3af',
    cursor: 'pointer'
  };

  const buttonHoverStyle = {
    backgroundColor: '#d1d5db'
  };

  const bookItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #d1d5db'
  };

  const lastBookItemStyle = {
    ...bookItemStyle,
    borderBottom: 'none'
  };

  const bookTextStyle = {
    color: 'black'
  };

  const bookTitleStyle = {
    fontWeight: 'bold'
  };

  const removeButtonStyle = {
    backgroundColor: '#e5e7eb',
    color: 'black',
    padding: '4px 12px',
    fontSize: '14px',
    border: '1px solid #9ca3af',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        {/* First Library Management Box */}
        <div style={boxStyle}>
          <h1 style={titleStyle}>Library Management</h1>
          
          {/* Search Box */}
          <div>
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={searchInputStyle}
            />
          </div>

          {/* Add Book Form */}
          <div style={formContainerStyle}>
            <input
              type="text"
              placeholder="New book title"
              value={newBookTitle}
              onChange={(e) => setNewBookTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="New book author"
              value={newBookAuthor}
              onChange={(e) => setNewBookAuthor(e.target.value)}
              onKeyPress={handleKeyPress}
              style={inputStyle}
            />
            <button
              onClick={addBook}
              disabled={!newBookTitle.trim() || !newBookAuthor.trim()}
              style={{
                ...buttonStyle,
                opacity: (!newBookTitle.trim() || !newBookAuthor.trim()) ? 0.5 : 1,
                cursor: (!newBookTitle.trim() || !newBookAuthor.trim()) ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={(e) => {
                if (newBookTitle.trim() && newBookAuthor.trim()) {
                  e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
                }
              }}
              onMouseLeave={(e) => {
                if (newBookTitle.trim() && newBookAuthor.trim()) {
                  e.target.style.backgroundColor = buttonStyle.backgroundColor;
                }
              }}
            >
              Add Book
            </button>
          </div>

          {/* All Books List */}
          <div>
            {filteredBooks.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px 0', color: '#6b7280' }}>
                {searchTerm ? 'No books match your search.' : 'No books available.'}
              </div>
            ) : (
              filteredBooks.map((book, index) => (
                <div
                  key={book.id}
                  style={index === filteredBooks.length - 1 ? lastBookItemStyle : bookItemStyle}
                >
                  <div style={bookTextStyle}>
                    <span style={bookTitleStyle}>{book.title}</span>
                    <span> by {book.author}</span>
                  </div>
                  <button
                    onClick={() => removeBook(book.id)}
                    style={removeButtonStyle}
                    onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseLeave={(e) => e.target.style.backgroundColor = removeButtonStyle.backgroundColor}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Second Library Management Box - Filtered View */}
        <div style={boxStyle}>
          <h1 style={titleStyle}>Library Management</h1>
          
          {/* Search Box with "great" */}
          <div>
            <input
              type="text"
              value="great"
              readOnly
              style={searchInputFilledStyle}
            />
          </div>

          {/* Add Book Form */}
          <div style={formContainerStyle}>
            <input
              type="text"
              placeholder="New book title"
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="New book author"
              style={inputStyle}
            />
            <button style={buttonStyle}>
              Add Book
            </button>
          </div>

          {/* Filtered Books List - Only "The Great Gatsby" */}
          <div>
            <div style={lastBookItemStyle}>
              <div style={bookTextStyle}>
                <span style={bookTitleStyle}>The Great Gatsby</span>
                <span> by F. Scott Fitzgerald</span>
              </div>
              <button
                style={removeButtonStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = removeButtonStyle.backgroundColor}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryManagement;