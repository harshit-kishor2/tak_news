import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {newsListAction, newsActions} from '../redux/newsfeed.slice';

const useNewsFeed = () => {
  const dispatch = useDispatch();

  // All states
  const {newsListLoadingStatus, newsList, newsListError} = useSelector(
    state => state.newsReducer,
  );

  // All Actions
  const getAllNews = query => dispatch(newsListAction(query));

  // Filter Actions
  const filterAllNews = async data => {
    await getAllNews('').then(resu => {
      let u = [];
      data.forEach(el => {
        el.isSelected && u.push(el.name.toLowerCase());
      });
      let res = resu.payload.filter(el => {
        return (
          u.includes(el.author.toLowerCase()) ||
          u.includes(el.category.toLowerCase())
        );
      });
      dispatch(newsActions.filterListAction(u.length ? res : resu.payload));
    });
  };
  // Sort Actions
  const sortAllNews = async () => {
    await getAllNews('').then(resu => {
      var d = resu.payload;
      var res = d.slice().sort((a, b) => b.createdAt - a.createdAt);
      dispatch(newsActions.sortListAction(res));
    });
  };

  return {
    newsListLoadingStatus,
    newsList,
    newsListError,
    getAllNews,
    filterAllNews,
    sortAllNews,
  };
};
export default useNewsFeed;
