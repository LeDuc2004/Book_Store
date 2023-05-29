import Detail from "../components/detail/Detail";
import Footsell from "../components/common/footer/Footsell";
import Header from "../components/common/header/Header";

function PageDetail() {
    return (  <>
    <Header detail={"none"} ></Header>
    <Detail></Detail>
    <Footsell></Footsell>
    </>);
}

export default PageDetail;