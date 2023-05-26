import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Slide from '../slideShow/Slide';
import Footsell from '../common/footer/Footsell';
import { fetchAult, fetchKids, fetchManga, fetchYoung } from './homeSlide';
import Flag from '../flag/Flag';
import Star from '../common/rate/Rate';
import Kids from '../sliderKids/Kids';
import Ault from '../sliderAult/Ault';
import Manga from '../sliderManga/Manga';
import Young from '../sliderYoung/Young';
import { fetchDatabase } from '../body/bodySlide';
import ScrollToTopButton from '../btnsmooth/ScrollToTopButton';

function Home() {
  const [kids, setKids] = useState([]);
  const [young, setYoung] = useState([]);
  const [ault, setAult] = useState([]);
  const [manga, setManga] = useState([]);
  const [iduser, setIduser] = useState('');
  const [toglecha , setToglecha] = useState(true)

  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      fetch('http://localhost:5000/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Beaer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIduser(data.user.id);
        });
    }
    dispatch(fetchDatabase());
  }, [toglecha]);
  let dataProduct = useSelector((state) => state.listSp);
  useEffect(() => {
    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    let arr4 = [];
    let array = dataProduct.database;

    for (let i = 0; i < array.length; i++) {
      if (i < 21) {
        arr1.push(array[i]);
      } else if (i < 42) {
        arr2.push(array[i]);
      } else if (i < 63) {
        arr3.push(array[i]);
      } else if (i < 84) {
        arr4.push(array[i]);
      }
      setKids(arr1);
      setYoung(arr2);
      setAult(arr3);
      setManga(arr4);
    }
  }, [dataProduct.database]);
  

  return (
    <>
      <Slide></Slide>
      <Kids kids={kids} text={'Trẻ em & Thiếu nhi'} iduser={iduser} setToglecha={setToglecha}></Kids>
      <Young kids={young} text={'Thanh Thiếu niên'} iduser={iduser}></Young>
      <Ault kids={ault} text={'Manga & Anime'} iduser={iduser}></Ault>
      <Manga kids={manga} text={'Hành động & Trinh thám'} iduser={iduser}></Manga>
      <Footsell></Footsell>
    </>
  );
}

export default Home;
