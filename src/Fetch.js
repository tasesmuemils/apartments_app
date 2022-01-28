import React from "react";
import styled from "styled-components";
import { Carousel } from "react-bootstrap";
import INCHLogo from "./icons/inch.svg";
import City24Logo from "./icons/city24.svg";

const StyledFetch = styled.div`
  /* .filters {
    position: fixed;
    z-index: 3;
    background-color: white;
  } */
  .card-wrapper {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid #ebebeb;

    .apatment-images {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 10px;
      width: 300px;

      img {
        margin: 5px;
        border-radius: 20px;
      }
    }

    .apartment-info {
      padding-left: 20px;

      .site-logo {
        display: flex;
        padding-bottom: 15px;
      }
      .small-info {
        display: flex;
        color: #484848;
        p {
          color: #484848;
          font-size: 16px;
          padding: 0 20px;
        }
      }
    }
  }
`;

export default function FetchData({ apartments }) {
  return (
    <StyledFetch>
      {console.log("VISI", apartments)}

      {apartments.map((item) => {
        return (
          <div className="card-wrapper" key={item.id}>
            <div className="apatment-images">
              <Carousel interval={null}>
                {item.siteType === "INCH"
                  ? item.images.keys.map((image, index) => {
                      return (
                        <Carousel.Item key={index}>
                          <img
                            className="d-block w-100"
                            key={index}
                            src={`https://i.inch.lv/images/apartment/${item.id}/view_${image}?t=${item.images.t}`}
                            alt=""
                          />
                        </Carousel.Item>
                      );
                    })
                  : item.images.map((image, index) => {
                      return (
                        <Carousel.Item key={index}>
                          <img
                            key={index}
                            className="d-block w-100"
                            src={`https://c24lv.img-bcg.eu/object/1_11_${
                              image.split("_")[2]
                            }`}
                            alt=""
                          />
                        </Carousel.Item>
                      );
                    })}
              </Carousel>
            </div>
            <div className="apartment-info">
              <div className="site-logo">
                <img
                  src={item.siteType === "INCH" ? INCHLogo : City24Logo}
                  alt=""
                />
              </div>

              <h4>
                {typeof item.address === "object"
                  ? `${item.address.street_name} ${item.address.house_number}, ${item.address.city_name}, ${item.address.county_name}`
                  : `${item.address}`}
              </h4>
              <div className="small-info">
                <p>Istabas: {item.roomCount || item.room_count}</p>
                <p>
                  Stāvs:{" "}
                  {typeof item.attributes === "object"
                    ? `${item.attributes.FLOOR}/${item.attributes.TOTAL_FLOORS}`
                    : `${item.floorNumber}/${item.floorTotal}`}
                </p>
                <p>
                  Platība: {item.area || item.property_size} m
                  {String.fromCharCode(178)}
                </p>
              </div>
              <h4>Cena: {item.price} EUR</h4>
            </div>
          </div>
        );
      })}
    </StyledFetch>
  );
}
