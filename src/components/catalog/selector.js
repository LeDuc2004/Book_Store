import { createSelector } from '@reduxjs/toolkit';

const getProductCata = (state) => state.listSp.datasp;
const getHanmuonCata = (state) => state.listSp.hanmuon;
const getStarCata = (state) => state.listSp.star;

export const productRemain = createSelector(
  [getProductCata, getHanmuonCata, getStarCata],
  (product, hanmuon, star) => {
    switch (hanmuon) {
      case true:
        return product.filter((item) => item.hanmuon === "");
      case false:
        return product.filter((item) => item.hanmuon !== "");
      case "all":
        return product;
      default:
        if (star === 6) {
          return product.filter((item) => item.hanmuon === "");
        } else if (star >= 1 && star <= 5) {
          return product.filter((item) => {
            const itemStar = parseFloat(item.star);
            return (
              itemStar >= star &&
              itemStar < star + 1
            );
          });
        } else {
          return product;
        }
    }
  }
);
