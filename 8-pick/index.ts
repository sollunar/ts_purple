const user = {
  name: "Vasiliy",
  age: 8,
  skills: ["typescript", "javascript"],
};

const bread = {
  weight: 5,
  type: "baguet",
  extraIngredients: ["garlic", "sunflower seeds"],
};

function pickObjectKeys<T, K extends keyof T>(
  obj: T,
  keys: K[]
): { [P in K]+?: T[P] } {
  const result: { [P in K]+?: T[P] } = {};

  keys.forEach((key) => {
    result[key] = obj[key];
  });

  return result;
}

const res = pickObjectKeys(user, ["age", "skills"]);
const res2 = pickObjectKeys(bread, ["weight", "type"])
