import Header from "../components/common/header/Header";
import Favorite from "../components/favorite/Favorite";

function PageFavorite() {
    return ( <>
    <Header signin={"none"}></Header>
    <Favorite></Favorite>
    </> );
}

export default PageFavorite;