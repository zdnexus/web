/**
 * Created by Administrator on 2016/4/7.
 */

function router(handle, pathname) {
    console.log("About to route a request for " + pathname);

    if (typeof handle[pathname] === 'function') {
        return handle[pathname]();
    }
    else {
        console.log("No request handler found for " + pathname);
        return "404 Not Found";
    }
}

exports.router = router;