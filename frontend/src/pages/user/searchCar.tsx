import Footer from "../../components/landingpages/footer";
import FormSearchCar from "../../components/searchcar/form";
// import FormSearchCar from "../../components/searchcar/form";
import HeroSection from "../../components/user/herosection";
import HomeHeader from "../../components/user/navbar";
let button =false;

function CariMobil() {
    return (
        <>
            <HomeHeader />
            <HeroSection button={false} />
            <FormSearchCar />
            <Footer />
        </>
    );
}

export default CariMobil;

