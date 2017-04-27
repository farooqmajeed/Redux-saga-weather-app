import { takeEvery, fork, call, put } from 'redux-saga/effects';
import request from 'superagent';
// var request = require('superagent');

function getWeather(location) {
  const url ='https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${location}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
  return request
    .get(url)
    .then((data) => {
      console.log('data',data);
      return JSON.parse(data.text);
    })
}

function* callGetWeather({ location, resolve, reject }) {
  const  result = yield call(getWeather, location);
  console.log("result", result);
  if (result.query.results) {
      yield put({ type: 'FETCH_WEATHER_DONE', result });
      yield call(resolve);
  } else {
     yield call(reject, { location: 'No Data for This Location' });
  }
}
function* getWeatherSaga() {
  yield* takeEvery('FETCH_WEATHER', callGetWeather);
}

export default function* rootSaga() {
  yield [
    fork(getWeatherSaga),
  ];
}
