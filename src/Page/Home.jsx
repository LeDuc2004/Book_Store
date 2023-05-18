import Header from "../components/common/header/Header";
import Body from "../components/body/Body"
import { useState } from "react";
import Search from "../components/search/Search";

function Home() {
    const [searchPage , setSearchPage] = useState(false)
    return ( <>
      <Header setSearchPage={setSearchPage}></Header>
      <div style={searchPage == true ? {display:"none"} : {}}>
        <Body ></Body>
      </div>
      <div style={searchPage == true ? {} : {display:"none"}}>
        <Search></Search>
      </div>
      
      
    </> );
}

export default Home;