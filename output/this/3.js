function a() {
    console.log(this);
}
a.call(null);

/**
 * browser
 * window 对象
 */

/**
 * node
 * global 对象
 */