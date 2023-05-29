import { useEffect, useRef, useState } from 'react';
import './menu.scss';
import { useDispatch, useSelector } from 'react-redux';
import { bodySlide } from '../../body/bodySlide';

function Menu({ text, setInputFocused, isInputFocused }) {
  const dispatch = useDispatch();
  const listAuthorRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  let listAuthor = useSelector((state) => {
    if (text === '') {
      return [];
    } else {
      const product = state.listSp.database.filter((item, index, self) => {
        const lowercaseAuthor = item.author.toLowerCase().replace(/\s/g, '');
        const lowercaseText = text.replace(/\s/g, '');
        return (
          lowercaseAuthor.includes(lowercaseText) &&
          self.findIndex((el) => el.author.toLowerCase().replace(/\s/g, '') == lowercaseAuthor) === index
        );
      });
      return product;
    }
  });
  let listSearch = useSelector((state) => {
    if (text == '') {
      return [];
    } else {
      const product = state.listSp.database.filter((item) => {
        return item.name.toLowerCase().replace(/\s/g, '').includes(text.replace(/\s/g, '').toLowerCase());
      });
      return product;
    }
  });
  useEffect(() => {
    if (listAuthorRef.current && isInputFocused) {
      listAuthorRef.current.focus();
    }
  }, [isInputFocused]);
  useEffect(() => {
    setFocusedIndex(-1);
  }, [text]);

  useEffect(() => {
    let lengtharr = -1;
    if (listSearch.length >= 5 && listAuthor.length >= 3) {
      lengtharr = lengtharr + 5 + 3;
    }
    if (listSearch.length >= 5 && listAuthor.length < 3) {
      lengtharr = lengtharr + 5 + listAuthor.length;
    }
    if (listSearch.length < 5 && listAuthor.length >= 3) {
      lengtharr = lengtharr + listSearch.length + 3;
    }
    if (listSearch.length < 5 && listAuthor.length < 3) {
      lengtharr = lengtharr + listSearch.length + listAuthor.length;
    }
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setFocusedIndex((prevIndex) => {
          return prevIndex < lengtharr ? prevIndex + 1 : 0;
        });
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setFocusedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : lengtharr));
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [listSearch]);
  useEffect(() => {
    if (listAuthorRef.current && focusedIndex !== -1) {
      const listItems = listAuthorRef.current.querySelectorAll('.list-item');
      if (listItems.length > 0) {
        listItems[focusedIndex].focus();
        
      }
    }
  }, [focusedIndex]);
  useEffect(() => {
    dispatch(
      bodySlide.actions.copy({
        data: listSearch,
      }),
    );
  }, [listSearch.length]);



  const handleFocus = (event) => {
    event.target.style.outline = 'none';

    event.target.style.background = 'rgba(211, 211, 211, 0.221)';
  };

  const handleBlur = (event) => {
    event.target.style.background = '';
  };
  const handleMouseEnter = (event) => {
      event.target.focus();

  };

  return (
    <>
      <div className="mangboc1">
        <div className="mangboc__inside">
          <div
            ref={listAuthorRef}
            tabIndex="0"
            style={listAuthor.length < 1 && listSearch.length < 1 ? {display:"none"} : {}}
            className="list-search-results nenauthor"
            
          >
            <div  style={listAuthor.length > 0 ? {} : { display: 'none' }} className="searchAuthor">
              Author
            </div>
            {listAuthor.length > 0
              ? listAuthor.map((item, index) => {
                  if (index < 3) {
                    return (
                      <a
                        key={index}
                        href={`http://localhost:3001/catalog/author=${item.author.replace(/\s/g, '')}`}
                        className={`mangboc__sun list-item ${index === focusedIndex ? 'focused' : ''}`}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onMouseEnter={handleMouseEnter}
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <div className="mangboc__author">{item.author}</div>
                      </a>
                    );
                  }
                })
              : ''}
            <div style={listSearch.length > 0 ? {} : { display: 'none' }} className="searchAuthor">
              Title
            </div>


            {listSearch.length > 0
              ? listSearch.map((item, index) => {
                if (index < 5) {
                  return (
                      <a
                        href={`http://localhost:3001/detail/${item.id}`}
                        key={index}
                        className={`mangboc__sun list-item ${listAuthor.length + 1 === focusedIndex ? 'focused' : ''}`}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onMouseEnter={handleMouseEnter}
                      >
                        <img src={item.img} alt="" />
                        <div className="mangboc__text">{item.name}</div>
                      </a>
                    );
                  }
                })
              : ''}
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
