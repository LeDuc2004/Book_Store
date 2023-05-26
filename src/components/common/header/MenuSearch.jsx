import { useEffect } from 'react';
import './menu.scss';
import { useDispatch, useSelector } from 'react-redux';
import { bodySlide } from '../../body/bodySlide';

function Menu({ text }) {
  const dispatch = useDispatch();
  let listAuthor = useSelector((state) => {
    if (text === '') {
      return [];
    } else {
      const product = state.listSp.database.filter((item, index, self) => {
        const lowercaseAuthor = item.author.toLowerCase().replace(/\s/g, '');
        const lowercaseText = text.replace(/\s/g, '');
        return lowercaseAuthor.includes(lowercaseText) && self.findIndex((el) => el.author.toLowerCase().replace(/\s/g, '') === lowercaseAuthor) === index;
      });
      return product;
    }
  });
  
  let listSearch = useSelector((state) => {
    if (text == '') {
      return [];
    } else {
      const product = state.listSp.database.filter((item) => {
        return item.name.toLowerCase().replace(/\s/g, '').includes(text.replace(/\s/g, ''));
      });
      return product;
    }
  });
  useEffect(() => {
    dispatch(
      bodySlide.actions.copy({
        data: listSearch,
      }),
    );
  }, [listSearch.length]);

  return (
    <>
      <div className="mangboc1">
        <div className="mangboc__inside">
          <div  className="nenauthor">
            {listAuthor.length > 0
              ? listAuthor.map((item, index) => {
                  if (index < 6) {
                    return (
                      <a key={index} href={`http://localhost:3001/detail/${item.id}`} className="mangboc__sun author">
                        <div className="mangboc__author">{item.author}</div>
                      </a>
                    );
                  }
                })
              : ''}
          </div>

          {listSearch.length > 0
            ? listSearch.map((item, index) => {
                if (index < 6) {
                  return (
                    <a href={`http://localhost:3001/detail/${item.id}`} key={index} className="mangboc__sun">
                      <img src={item.img} alt="" />
                      <div className="mangboc__text">{item.name}</div>
                    </a>
                  );
                }
              })
            : ''}
        </div>
      </div>
    </>
  );
}

export default Menu;
