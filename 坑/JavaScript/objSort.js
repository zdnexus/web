/**
 * Created by zdnexus on 2018/1/6 0006.
 */
var o = {
    '2017-12-03': 3,
    '2017-12-01': 1,
    '2017-12-02': 2
};

console.log(o)
// Object.keys(o).sort((item1, item2)=> {
//     console.log(item1)
//     console.log(item2)
//     console.log(item1 > item2)
//     return item1 > item2;
// });
var sortedObjKeys = Object.keys(o).sort().map((item)=> {
    return {
        [item]: o[item]
    }
});
// var sortedObjKeys = Object.keys(o).sort().map(item=>`item:1`);
console.log(sortedObjKeys);