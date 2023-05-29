import { createSelector } from '@reduxjs/toolkit';


const getProductCata = (state) => state.listSp.datasp;
const getHanmuonCata = (state) => state.listSp.hanmuon;
const getStarCata = (state) => state.listSp.star;

export const productRemain = createSelector([getProductCata, getHanmuonCata, getStarCata], (product, hanmuon, star) => {
  return product.filter((item) => {
    if (hanmuon == 'all') {
      return star === 'all' ? item
      : star == 1 ? (item.star >= 1 && item.star < 2)
      : star == 2 ? (item.star >= 2 && item.star < 3)
      : star == 3 ? (item.star >= 3 && item.star < 4)
      : star == 4 ? (item.star >= 4 && item.star < 5)
      : star == 5 ? (item.star == 5)
      : false;
    } else if (hanmuon) {
      return star === 'all' ? item.hanmuon == ''
      : star == 1 && item.hanmuon == '' ? (item.star >= 1 && item.star < 2 )
      : star == 2 && item.hanmuon == '' ? (item.star >= 2 && item.star < 3 )
      : star == 3 && item.hanmuon == '' ? (item.star >= 3 && item.star < 4 )
      : star == 4 && item.hanmuon == '' ? (item.star >= 4 && item.star < 5 )
      : star == 5 && item.hanmuon == '' ? (item.star == 5 )
      : false;
      
    } else {
      console.log(item);
      return star === 'all' ? item.hanmuon != ''
      : star == 1 && item.hanmuon != '' ? (item.star >= 1 && item.star < 2 )
      : star == 2 && item.hanmuon != '' ? (item.star >= 2 && item.star < 3 )
      : star == 3 && item.hanmuon != '' ? (item.star >= 3 && item.star < 4 )
      : star == 4 && item.hanmuon != '' ? (item.star >= 4 && item.star < 5 )
      : star == 5 && item.hanmuon != '' ? (item.star == 5 )
      : false;
    }
  });
});
