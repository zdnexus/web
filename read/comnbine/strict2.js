/**
 * Created by zdnexus on 17/5/11.
 */

function f1() {
    console.log(this);
}

module.exports = {
    a: f1
};