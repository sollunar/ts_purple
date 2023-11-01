var objA = { a: 5, b: "" };
var objB = { a: 10, c: true };
// let v0: Difference = difference(objA, objB)
function difference(objA, objB) {
    var keysToPreserve = objA;
    for (var key in objA) {
        if (!keysToPreserve.hasOwnProperty(key)) {
            delete objA[key];
        }
    }
}
difference(objA, objB);
console.log(objA);
