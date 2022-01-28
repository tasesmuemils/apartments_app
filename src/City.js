// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import axios from "axios";

// const StyledCity = styled.div`
//   .card-wrapper {
//     padding: 20px;
//     margin: 50px 20px;
//     border-radius: 50px;
//     background: #e0e0e0;
//     box-shadow: 35px 35px 70px #bebebe, -35px -35px 70px #ffffff;
//     h3 {
//       padding: 0 20px;
//     }
//     .small-info {
//       display: flex;
//       p {
//         padding: 0 20px;
//       }
//     }

//     .apatment-images {
//       display: flex;
//       flex-wrap: wrap;
//       justify-content: center;

//       img {
//         margin: 5px;
//       }
//     }
//   }
// `;

// export default function City() {
//   const [City, getCity] = useState([]);
//   const [sortType, setSortType] = useState("date_published");

//   useEffect(() => {
//     async function getData() {
//       const response = await axios({
//         method: "GET",
//         url: "https://m-api.city24.lv/lv_LV/search/realties?address%5Bcc%5D=2&address%5Bcity%5D%5B%5D=25892&tsType=sale&unitType=Apartment&price%5Blte%5D=125000&roomCount=3&adReach=1&itemsPerPage=200",
//       });

//       const apartment = response.data._embedded.item;
//       const editedPrice = apartment.map((item) => {
//         item.price = parseInt(parseFloat(item.price));
//         item.date_published = new Date(item.date_published);
//         return item;
//       });
//       editedPrice.sort((a, b) =>
//         b.date_published > a.date_published ? 1 : -1
//       );
//       // editedPrice.sort((a, b) => (a.price < b.price ? 1 : -1));

//       console.log(editedPrice);
//       getCity(editedPrice);
//     }

//     getData();
//   }, []);

//   useEffect(() => {
//     const sortArray = (type) => {
//       const types = {
//         price: "price",
//         userUpdatedAt: "date_published",
//       };
//       const sortProperty = types[type];
//       const sorted = [...City].sort((a, b) =>
//         a[sortProperty] < b[sortProperty] ? 1 : -1
//       );
//       getCity(sorted);
//     };
//     sortArray(sortType);
//   }, [sortType]);

//   return (
//     <StyledCity>
//       <select
//         onChange={(e) => {
//           setSortType(e.target.value);
//         }}
//         name=""
//         id="">
//         <option value="date_published">Jaunākie</option>
//         <option value="price">Cena</option>
//       </select>
//       {City.map((item, index) => {
//         return (
//           <div className="card-wrapper" key={index}>
//             <h3>{`${item.address.street_name} ${item.address.house_number}, ${item.address.city_name}, ${item.address.county_name}`}</h3>
//             <div className="small-info">
//               <p>Istabas: {item.room_count}</p>
//               <p>
//                 Stāvs:{" "}
//                 {`${item.attributes.FLOOR}/${item.attributes.TOTAL_FLOORS}`}
//               </p>
//               <p>
//                 Platība: {item.property_size} m{String.fromCharCode(178)}
//               </p>
//             </div>
//             <h3>Cena: {parseInt(parseFloat(item.price))} EUR</h3>
//             <div className="apatment-images">
//               {item.images.map((image, index) => {
//                 return (
//                   <img
//                     key={index}
//                     style={{ width: "200px", height: "200px" }}
//                     src={`https://c24lv.img-bcg.eu/object/1_11_${
//                       image.split("_")[2]
//                     }`}
//                     alt=""
//                   />
//                 );
//               })}
//             </div>
//           </div>
//         );
//       })}
//     </StyledCity>
//   );
// }
