import Header from "../components/common/header/Header";
import Body from "../components/body/Body"
import { useState } from "react";
import Search from "../components/search/Search";
import Home from "../components/home/Home";

function PageHome() {
    const [searchPage , setSearchPage] = useState(false)
    return ( <>
      <Header setSearchPage={setSearchPage}></Header>
      <div style={searchPage == true ? {display:"none"} : {}}>
        <Home></Home>
      </div>
      <div style={searchPage == true ? {} : {display:"none"}}>
        <Search></Search>
      </div>
      
      
    </> );
}

export default PageHome;