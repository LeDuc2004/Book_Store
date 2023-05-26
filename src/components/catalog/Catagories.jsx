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

  useEffect(() => {
    console.log("ref");
    dispatch(fetchDatabase());
    dispatch(fetchMoreTodos(id));
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
    console.log(value);
    dispatch(bodySlide.actions.trangthaisach({status:value}))
  };

  return (
    <>
      <div onClick={() => filter1()} className="filter-btn-icon">
        <div className="filter-btn-icon__icon">
          <i className="fa-solid fa-filter"></i>
        </div>
        <div className="filter-btn-icon__btn">Lọc</div>
      </div>

      <div
        onClick={() => hidefilter()}
        style={nenloc == 0 ? { display: 'none' } : { display: '' }}
        className="thanh-loc-moble__con"
      ></div>
      <div className="thanhloc moble" style={{ transform: `translateX(-${thanhloc}%)` }}>
        <div className="thanhloc-scroll">
          <div className="thanhloc-scroll__name">All Categories</div>
          <div className="thanhloc-scroll__list">
            <div className="thanhloc-scroll__son">
              <div className="thanhloc-scroll__son-name">Computer & Laptop</div>
              <div className="thanhloc-scroll__son-sl">(25)</div>
            </div>

            <div className="thanhloc-scroll__son">
              <div className="thanhloc-scroll__son-name">Mobile & Tablet</div>
              <div className="thanhloc-scroll__son-sl">(125)</div>
            </div>

            <div className="thanhloc-scroll__son">
              <div className="thanhloc-scroll__son-name">Camera</div>
              <div className="thanhloc-scroll__son-sl"> (150)</div>
            </div>

            <div className="thanhloc-scroll__son">
              <div className="thanhloc-scroll__son-name">TV & Smart Box</div>
              <div className="thanhloc-scroll__son-sl">(75)</div>
            </div>

            <div className="thanhloc-scroll__son">
              <div className="thanhloc-scroll__son-name">Home Appliance</div>
              <div className="thanhloc-scroll__son-sl">(75)</div>
            </div>

            <div className="thanhloc-scroll__son">
              <div className="thanhloc-scroll__son-name">Smart Watch</div>
              <div className="thanhloc-scroll__son-sl">(45)</div>
            </div>
          </div>
        </div>
        <div className="thanhloc-keoPrice">
          <div className="thanhloc-keoPrice__text">Filter by Price</div>
          <div className="renge-input">
            <div className="renge-input__pt">
              <div className="fill" style={{ width: `${inputpt}%` }}></div>
            </div>
            <input
              className="input-keo"
              onChange={(e) => setInputpt(e.target.value)}
              value={inputpt}
              min={0}
              max={100}
              type="range"
            />
          </div>
          <div className="thanhloc-keoPrice__price">
            <div className="thanhloc-keoPrice__textpr">Price:</div>
            <div className="thanhloc-keoPrice__number">$100 - $250 </div>
          </div>
        </div>

        <div className="thanhloc-location thanhloc-keoPrice">
          <div className="thanhloc-keoPrice__text">Filter by Location</div>

          <div className="location-sun">
            <input type="checkbox" />
            <div className="location-sun__name">Jakata</div>
          </div>
          <div className="location-sun">
            <input type="checkbox" />
            <div className="location-sun__name">Yogyakarta</div>
          </div>
          <div className="location-sun">
            <input type="checkbox" />
            <div className="location-sun__name">Bandung</div>
          </div>
          <div className="location-sun">
            <input type="checkbox" />
            <div className="location-sun__name">Semarang</div>
          </div>
          <div className="location-sun">
            <input type="checkbox" />
            <div className="location-sun__name">Surabaya</div>
          </div>
        </div>
        <div className="thanhloc-location thanhloc-keoPrice">
          <div className="thanhloc-keoPrice__text">Filter by Rating</div>

          <div className="location-sun">
            <input type="checkbox" />
            <div className="location-sun__name cata">
              <i className="fa-solid fa-star"></i>
            </div>
          </div>
          <div className="location-sun">
            <input type="checkbox" />
            <div className="location-sun__name cata">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
          </div>
          <div className="location-sun">
            <input type="checkbox" />
            <div className="location-sun__name cata">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
          </div>
          <div className="location-sun">
            <input type="checkbox" />
            <div className="location-sun__name cata">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
          </div>
          <div className="location-sun">
            <input type="checkbox" />
            <div className="location-sun__name cata">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
          </div>
        </div>

        <div className="filter-btn">Filter</div>
        <div className="resetfilter-btn">Reset Filter</div>
      </div>

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
              <div className="thanhloc-keoPrice__text">Thể loại</div>
              <div className="location-sun">
                <input
                  type="checkbox"
                  checked={selectedCheckbox === 'all'}
                  onChange={() => handleCheckboxClick('all')}
                />
                <div className="location-sun__name">Tất cả</div>
              </div>

              <div className="location-sun">
                <input
                  type="checkbox"
                  checked={selectedCheckbox === 'kids'}
                  onChange={() => handleCheckboxClick('kids')}
                />
                <div className="location-sun__name">Sách cho bé</div>
              </div>
              <div className="location-sun">
                <input
                  type="checkbox"
                  checked={selectedCheckbox === 'young'}
                  onChange={() => handleCheckboxClick('young')}
                />
                <div className="location-sun__name">Thanh thiếu niên</div>
              </div>
              <div className="location-sun">
                <input
                  type="checkbox"
                  checked={selectedCheckbox === 'manga'}
                  onChange={() => handleCheckboxClick('manga')}
                />
                <div className="location-sun__name">Manga & Anime</div>
              </div>
              <div className="location-sun">
                <input
                  type="checkbox"
                  checked={selectedCheckbox === 'action'}
                  onChange={() => handleCheckboxClick('action')}
                />
                <div className="location-sun__name">Hành động</div>
              </div>
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
