import { useEffect } from 'react';
import './menu.scss';
import { useDispatch, useSelector } from 'react-redux';
import { bodySlide } from '../../body/bodySlide';

function Menu({ text }) {
  const dispatch = useDispatch();
  let listSearch = useSelector((state) => {
    if (text == '') {
      return [];
    } else {
      const product = state.listSp.database.filter((item) => {
        if (item.status != false) {
          return item.name.toLowerCase().replace(/\s/g, '').includes(text.replace(/\s/g, ''));
        }
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
      <div className="mangboc">
        <div className="mangboc__inside">
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
