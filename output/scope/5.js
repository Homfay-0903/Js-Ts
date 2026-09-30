function a() {
    var temp = 10;
    function b() {
        console.log(temp);
    }
    b();
}
a();

function a() {
    var temp = 10;
    b();
}
function b() {
    console.log(temp);
}
a();

/**
 * browser
 * temp is not defined
 */

/**
 * node
 * temp is not defined
 */