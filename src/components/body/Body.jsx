import "./_body.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchMoreTodos, fetchTodos } from "./bodySlide";
import dayjs from "dayjs";
import { HandleScroll } from "../../handleScroll/HandleScroll";

function Body() {
  const [scroll, setScroll] = useState(false);
  const [list, SetList] = useState("");
  const [loading , SetLoading] = useState(false)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchMoreTodos(list.length));
  }, [])

  const ScrollMore = useEffect(() => {
    if (scroll == true) {
      SetLoading(true)
      setTimeout(() => {
        dispatch(fetchMoreTodos(list.length));
       
      }, 2000);
    }

  }, [scroll]);

  HandleScroll(setScroll);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  let listBook = useSelector((state) => state.listSp);
  useEffect(() => {
    SetList(listBook.datasp);
    setScroll(false);
    SetLoading(false)
  }, [listBook.datasp]);

  let listSearch = useSelector((state) => {
    const product = state.listSp.datasp.filter((item) => {
      return item.name
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(state.listSp.search.replace(/\s/g, ""));
    });
    return product;
  });


  function borrow(item) {
    let days = prompt("Số ngày mượn");
    const countdownDate = dayjs().add(days, "day").toDate().getTime();
    console.log(countdownDate);
    let obj = {
      ...item,
      days: countdownDate,
    };
    fetch("http://localhost:5000/borrow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Beaer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ obj }),
    });
  }

  return (
    <>
          <div className="list-sp no">
        {listSearch.length > 0
          ? listSearch.map((item, index) => {
              return (
                <div key={index} className="list-sp__sun">
                  <div className="sun-img">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="sun-name">{item.name}</div>
                  <div className="sun-price">130$</div>
                  <div className="btn-sp">
                    <div onClick={() => borrow(item)} className="btn-detail">
                      Mượn sách
                    </div>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
      <div className="list-sp">
        {list != "" && listSearch.length == 0
          ? list.map((item, index) => {
              return (
                <div key={index} className="list-sp__sun">
                  <div className="sun-img">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="sun-name">{item.name}</div>
                  <div className="sun-price">130$</div>
                  <div className="btn-sp">
                    <div onClick={() => borrow(item)} className="btn-detail">
                      Mượn sách
                    </div>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
      <div style = {loading == true ? {display:""} : {display:"none"}} className="loading">Loading.....</div>
    </>
  );
}

export default Body;
