/**
 * Created by zdnexus on 17/5/31.
 */


var arr = [
    {
        val: 10,
        name: 'a',
    },
    {
        val: 15,
        name: 'b',
    },
    {
        val: 1,
        name: 'c'
    }
];


arr.sort((item1, item2) => {
    return (item1.val < item2.val) ? -1 : 1;
});

console.log(arr);

arr.map(item => console.log(item.name))