/**
 * Created by Administrator on 2016/4/7.
 */

function router(handle, pathname, response) {
    console.log("About to route a request for " + pathname);

    if (typeof handle[pathname] === 'function') {
        handle[pathname](response);
    }
    else {
        console.log("No request handler found for " + pathname);
        response.write("404 Not Found");
        response.end();
    }
}

exports.router = router;