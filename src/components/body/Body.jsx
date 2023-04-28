import "./_body.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchTodos } from "./bodySlide";
function Body() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  let listBook = useSelector((state) => state.listSp);
let listSearch = useSelector((state)=>{
  const product = state.listSp.datasp.filter((item)=>{
    return item.name.toLowerCase().replace(/\s/g, "").includes(state.listSp.search.replace(/\s/g, ""))
  })
  return product
})
  return (
    <>
      <div className="list-sp">
        {listBook.status == "idle"
          ? listSearch.slice().reverse().map((item , index) => {
              return (
                <div key={index} className="list-sp__sun">
                  <div className="sun-img">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="sun-name">{item.name}</div>
                  <div className="sun-price">130$</div>
                  <div className="btn-sp">
                    <div className="btn-detail">Mượn sách</div>
                    <div className="btn-add">Mua sách</div>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
}

export default Body;
