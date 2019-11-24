import _ from 'lodash';
import qs from 'query-string';
let c = new Map([['s','f'],['e','d']])
const a  = new Promise(resolve => {
  resolve('1234')
})

console.log(
    _.join(['A', 'Module', 'Loaded!'], ' ')
);