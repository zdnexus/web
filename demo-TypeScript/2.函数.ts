/**
 * Created by zhongdong on 18/7/4.
 */

function add(x: string, y: string): string {
    return 'Hello TypeScript';
}

let add2 = function (x: string, y: string): string {
    return 'Hello TypeScript';
};

let add3: (x: string, y: string) => string = function (x: string, y: string): string {
    return 'Hello TypeScript';
};