import "./App.css";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Table from "./components/Table/Table";

function App() {
  const [loadingData, setLoadingData] = useState(true);
  const columns = useMemo(() => [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Price",
      accessor: (a) => +a.current_price.toFixed(5) + "zł",
    },
    {
      Header: "Last 24h %",
      accessor: (a) => +a.price_change_percentage_24h.toFixed(2) + "%",
    },
    {
      Header: "Last 24h zł",
      accessor: (a) => +a.price_change_24h.toFixed(2) + "zł",
    },
  ]);

  const [data, setData] = useState([]);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=pln&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C%2024h%2C%207d";

  useEffect(() => {
    async function getData() {
      await axios.get(url).then((res) => {
        setData(res.data);
        setLoadingData(false);
      });
    }
    if (loadingData) {
      // if the result is not ready so you make the axios call
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="App">
        {/* here you check if the state is loading otherwise if you wioll not call that you will get a blank page because the data is an empty array at the moment of mounting */}
        {loadingData ? (
          <p>Loading Please wait...</p>
        ) : (
          <Table columns={columns} data={data} />
        )}
      </div>
    </>
  );
}

export default App;
