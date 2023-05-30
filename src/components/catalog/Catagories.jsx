import Body from '../body/Body';
import Footsell from '../common/footer/Footsell';
import './catagories.scss';
import { Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { bodySlide, fetchDatabase, fetchMoreTodos } from '../body/bodySlide';
import ScrollToTopButton from '../btnsmooth/ScrollToTopButton';
function Catagories() {
  const [inputpt, setInputpt] = useState(0);
  const [thanhloc, setThanhloc] = useState(100);
  const [nenloc, setNenloc] = useState(0);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [selectedStar, setSelectedStar] = useState(null);

  const dispatch = useDispatch();

  let { id } = useParams();
let endpoint = id.split("=")[1]
let startpoint =id.split("=")[0]

  useEffect(() => { 
    if (startpoint == 'search') {
      dispatch(fetchMoreTodos({id , search:endpoint}));
    }
    if (startpoint == 'author') {
      dispatch(fetchMoreTodos({id , author:endpoint}));
    }else{
      dispatch(fetchMoreTodos({id , data:endpoint}));
    }
    dispatch(fetchDatabase());
    setSelectedCheckbox(id);
    setSelectedStar('all');
  }, []);


  function filter1() {
    if (thanhloc == 0) {
      setThanhloc(100);
    } else {
      setThanhloc(0);
    }
    setNenloc(1);
  }
  function hidefilter() {
    setThanhloc(100);
    setNenloc(0);
  }
  const handleCheckboxClick = (checkboxId) => {
    setSelectedCheckbox(checkboxId)
  };
  const handleClickStar = (checkboxId) => {
    dispatch(bodySlide.actions.trangthaistar(checkboxId))
    setSelectedStar(checkboxId);
  };
  function resetChose() {
    setSelectedCheckbox('all');
    setSelectedStar('all');
  }
  const handleChange = (value) => {
    dispatch(bodySlide.actions.trangthaisach({status:value}))
  };

  return (
    <>




      <div className="catagories">
        <div className="catagories__body">
          <div className="thanhloc">
            <div className="thanhloc-location thanhloc-keoPrice">
            <div className="thanhloc-keoPrice__text">Trang thái</div>

              <Space wrap>
                <Select
                  defaultValue="Tất cả"
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: 'all',
                      label: 'Tất cả',
                    },
                    {
                      value: false,
                      label: 'Đang mượn',
                    },
                    {
                      value: true,
                      label: 'Chưa mượn',
                    }
                  ]}
                />
              </Space>
            </div>
            <div className="thanhloc-location thanhloc-keoPrice">
              <div className="thanhloc-keoPrice__text">Filter by Rating</div>

              <div className="location-sun">
                <input type="checkbox" checked={selectedStar === 'all'} onChange={() => handleClickStar('all')} />
                <div className="location-sun__name cata">Tất cả</div>
              </div>

              <div className="location-sun">
                <input type="checkbox" checked={selectedStar === '1'} onChange={() => handleClickStar('1')} />
                <div className="location-sun__name cata">
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
              <div className="location-sun">
                <input type="checkbox" checked={selectedStar === '2'} onChange={() => handleClickStar('2')} />
                <div className="location-sun__name cata">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
              <div className="location-sun">
                <input type="checkbox" checked={selectedStar === '3'} onChange={() => handleClickStar('3')} />
                <div className="location-sun__name cata">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
              <div className="location-sun">
                <input type="checkbox" checked={selectedStar === '4'} onChange={() => handleClickStar('4')} />
                <div className="location-sun__name cata">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
              <div className="location-sun">
                <input type="checkbox" checked={selectedStar === '5'} onChange={() => handleClickStar('5')} />
                <div className="location-sun__name cata">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
              </div>
            </div>
            <div onClick={() => resetChose()} id="resetfilter-btn">
              Reset Filter
            </div>
          </div>
          <div className="sp-loc">
            <Body></Body>
          </div>
        </div>
      </div>
      <Footsell></Footsell>
      <ScrollToTopButton></ScrollToTopButton>
    </>
  );
}

export default Catagories;
