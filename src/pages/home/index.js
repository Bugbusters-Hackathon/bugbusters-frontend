import Monster from "../../components/data-components/Monster";
import OfferData from "../../components/data-components/OfferData";
import Layout from "../../components/layout/Layout";
import BtnRefresh from "../../components/ui/BtnRefresh";

const Home = () => {


  return (
    <Layout>
        <main className="home-page">
            <div className="monster-data flex">
                <Monster />
                <OfferData />
            </div>
            <div className="btn-refresh flex">
                <BtnRefresh />
            </div>
        </main>
    </Layout>
  );
}

export default Home;