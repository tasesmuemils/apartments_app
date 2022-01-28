import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Map from "./components/Map";
import Fetch from "./Fetch";
import axios from "axios";
import City24Logo from "./icons/city24.svg";

const AppStyle = styled.div`
  /* display: grid; */
  /* justify-content: center; */

  .title {
    text-align: center;
  }

  .results-wrapper {
    position: relative;
    display: grid;
    grid-template-columns: 60% 40%;
    .apartment-lists {
      display: grid;
      h1 {
        text-align: center;
      }
    }

    .map-wrapper {
      position: relative;
      position: fixed;
      right: 0;
      top: 0;
      width: 40%;
    }
  }
`;

function App() {
  // State of Apartments data
  const [apartments, setApartments] = useState([]);
  const [sortType, setSortType] = useState("userUpdatedAt");

  // useEffect for Apartments data
  useEffect(() => {
    async function getData() {
      //INCH API call
      const responseINCH = await axios({
        method: "GET",
        url: `https://api.inch.lv/api/search/apartments?city=R%C4%ABga&district=Centrs,Vecr%C4%ABga&priceTo=125000&page=1&roomCountFrom=3&roomCountTo=3&dealType=sale&optimize=1&fields=id,images,city,district,address,longitude,latitude,userUpdatedAt,price,dealType,rentPriceUnit,area,roomCount,floorNumber,floorTotal&offset=0`,
      });

      //CITY24 API call
      const responseCITY24 = await axios({
        method: "GET",
        url: "https://m-api.city24.lv/lv_LV/search/realties?address%5Bcc%5D=2&address%5Bcity%5D%5B%5D=25892&tsType=sale&unitType=Apartment&price%5Blte%5D=125000&roomCount=3&adReach=1&itemsPerPage=200",
      });

      // INCH Data manipulation
      const INCHdata = () => {
        const main = responseINCH.data.apartments.data;
        const headers = responseINCH.data.apartments.header;

        const testingData = main.map((apartment) => {
          const apartmentObj = {};
          apartment.map((item, index) => {
            return (apartmentObj[headers[index]] = item);
          });

          return apartmentObj;
        });
        const editedDate = testingData.map((item) => {
          item.siteType = "INCH";
          item.userUpdatedAt = new Date(item.userUpdatedAt);
          return item;
        });
        return editedDate;
      };

      // CITY24 Data manipulation
      const CITY24data = () => {
        //Apartment data
        const CITY24apartment = responseCITY24.data._embedded.item;

        //All items edited
        const CITY24editedData = CITY24apartment.map((item) => {
          //For each apartment - edited price, edited date, add siteType
          item.price = parseInt(parseFloat(item.price));
          item.userUpdatedAt = item.date_published;
          delete item.date_published;
          item.userUpdatedAt = new Date(item.userUpdatedAt);
          item.siteType = "City24";
          if (item.images === null) {
            item.images = [City24Logo];
          }
          return item;
        });
        return CITY24editedData;
      };

      //All data
      const allData = [
        ...INCHdata(responseINCH),
        ...CITY24data(responseCITY24),
      ];

      //By default all data sorted by date
      const sortedAllData = [...allData].sort((a, b) =>
        a.userUpdatedAt < b.userUpdatedAt ? 1 : -1
      );

      setApartments(sortedAllData);
    }

    getData();
  }, []);

  // useEffect for sorting
  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        price: "price",
        userUpdatedAt: "userUpdatedAt",
      };
      const sortProperty = types[type];
      console.log(sortProperty);
      const sorted = [...apartments].sort((a, b) =>
        a[sortProperty] < b[sortProperty] ? 1 : -1
      );
      setApartments(sorted);
    };
    sortArray(sortType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  return (
    <AppStyle className="App">
      <div className="nav">
        <h1 className="title">DZIVOKLI</h1>
      </div>
      <div className="filters">
        <select
          onChange={(e) => {
            setSortType(e.target.value);
          }}
          name=""
          id="">
          <option value="userUpdatedAt">Jaunākie</option>
          <option value="price">Cena</option>
        </select>
        {/* <h3 className="site-numbers">{`${InchData.length} dzīvokļi no INCH, ${City24Data.length} dzīvokļi no City24`}</h3> */}
      </div>
      <div className="results-wrapper">
        <div className="apartment-lists">
          <div>
            <Fetch apartments={apartments} />
          </div>
        </div>
        <div className="map-wrapper">
          <div className="map">
            <Map latlng={apartments} />
          </div>
        </div>
      </div>
    </AppStyle>
  );
}

export default App;
