/**
 *
 *
 *
 * Created by Administrator on 2016/2/18.
 */



function getDate(tm) {
    var tt = new Date(parseInt(tm) * 1000).toLocaleString().replace(/Äê|ÔÂ/g, "-").replace(/ÈÕ/g, " ")
    return tt;
}

function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 17)
}

function json2str(o) {
    var arr = [];
    var fmt = function(s) {
        if (typeof s == 'object' && s != null) return json2str(s);
        return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
    }
    for (var i in o) arr.push("'" + i + "':" + fmt(o[i]));
    return '{' + arr.join(',') + '}';
}