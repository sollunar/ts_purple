var user = {
    name: "Vasiliy",
    age: 8,
    skills: ["typescript", "javascript"],
};
var bread = {
    weight: 5,
    type: "baguet",
    extraIngredients: ["garlic", "sunflower seeds"],
};
function pickObjectKeys(obj, keys) {
    var result = {};
    keys.forEach(function (key) {
        result[key] = obj[key];
    });
    return result;
}
var res = pickObjectKeys(user, ["age", "skills"]);
var res2 = pickObjectKeys(bread, ["weight", "type"]);
