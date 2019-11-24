import { add } from './js/index.js'
import $ from 'jquery'
import _ from 'lodash';
import {setRem} from "../../utils/setRem";
setRem();
import qs from 'query-string';
import './less/main.less';
import img from '../../assets/imgs/bg.png'
let b = new Set(['1','2','g']);
let k = new Promise(resolve => {
  setTimeout(()=>{
    resolve('qweqwe')
  },1000)
});
k.then(res => {
  console.log(res)
})

console.log('23')

const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];
console.log([...arr1, ...arr2, ...arr3])

add();
console.log(
    _.join(['V', 'Module', 'Loaded!'], ' ')
);