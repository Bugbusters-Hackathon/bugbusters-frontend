// Home.js
import React, { useEffect, useState } from "react";
import Monster from "../../components/data-components/Monster";
import OfferData from "../../components/data-components/OfferData";
import Layout from "../../components/layout/Layout";
import BtnRefresh from "../../components/ui/BtnRefresh";
import { getData } from "../../services/api/getData";
import { useRefresh } from "../../services/context/RefreshContext";

const Home = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const refresh = useRefresh();

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getData();
      setApiData(data);
    } catch (error) {
      setError(error.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);




  
  return (
    <Layout>
      <main className="home-page">
        {loading && <div className="loading"><p>Loading ...</p></div>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <div className="monster-data flex">
            <Monster data={apiData && apiData[0]} />
            <OfferData data={apiData && apiData[0]} />
          </div>
        )}
        <div className="btn-refresh flex">
          <BtnRefresh />
        </div>
      </main>
    </Layout>
  );
};

export default Home;
