import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Slide from '../slideShow/Slide';
import Footsell from '../common/footer/Footsell';
import { fetchAult, fetchKids, fetchManga, fetchYoung } from './homeSlide';
import Flag from '../flag/Flag';
import Star from '../common/rate/Rate';

function Home() {
    const [kids , setKids] = useState([])

  const dispatch = useDispatch();
  useEffect(()=>{
   dispatch(fetchKids())
   dispatch(fetchAult())
   dispatch(fetchManga())
   dispatch(fetchYoung())
  }, [])
  let dataKidshome = useSelector(state => state)
  console.log(dataKidshome);
  let dataKids = useSelector(state => state.home)
  useEffect(() => {
    console.log(dataKids.kids);
     setKids(dataKids.kids)
  }, [dataKids.kids]);

  return (
    <>
    <Slide kids={kids} ></Slide>
    <div className="list-sp no">
        {kids.length > 0
          ? kids.map((item, index) => {
              return (
                <>
                  <div key={item.id} className="list-sp__sun">
                    <div style={item.hanmuon != '' ? {} : { display: 'none' }}>
                      <Flag></Flag>
                    </div>
                    <div  className="tym">
                      <i className="fa-solid fa-heart"></i>
                    </div>

                    <a href={`http://localhost:3001/detail/${item.id}`} className="sun-img">
                      <img src={item.img} alt="" />
                    </a>
                    <div className="sun-name">{item.name}</div>
                    <div className="sun-price"></div>
                    <Star star={item.star} disabled={true}></Star>

                    <div className="btn-sp">
                      {item.hanmuon == '' ? (
                        <div  className="btn-detail">
                          Mượn sách
                        </div>
                      ) : (
                        <div>Hạn trả sách: {item.hanmuon}</div>
                      )}
                    </div>
                  </div>
                </>
              );
            })
          : ''}
      </div>
    
    <Footsell></Footsell>

    </>
  );
}

export default Home;
