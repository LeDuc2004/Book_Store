import "./_header.scss"
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { bodySlide } from "../body/bodySlide";
function Header({signin}) {
    const dispatch = useDispatch()
    function handleSearch(e) {
        dispatch(bodySlide.actions.searchSp({
           search: e.target.value.toLowerCase()
        }))
        console.log(e.target.value.trim());

    }

    return ( <>
    <div className="header">
           
        <a href="/"  className="header__logo">
        <img src='https://thebookland.vn/resources/img/thebooklandNew.png' className="App-logo" alt="logo" />
        </a>  

        <div className="search" style={signin == "none" ? {display:"none"} : {}}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input onChange={handleSearch} type="text" placeholder="Tìm kiếm..." />
        </div>

        <div className="authen" style={signin == "none" ? {display:"none"} : {}}>
            <a href="/signin" className="sign-in">Đăng ký</a>
            <a href="/signup" className="sign-up">Đăng nhập</a>
        </div>
        
    </div>
    </> );
}

export default Header;