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

type PickedKeys<T, K extends keyof T> = Partial<Record<K, T[K]>>;

function pickObjectKeys<T, K extends keyof T>(
  obj: T,
  keys: K[]
): PickedKeys<T, K> {
  const result: PickedKeys<T, K> = {};

  keys.forEach((key) => {
    result[key] = obj[key];
  });

  return result;
}

const res = pickObjectKeys(user, ["age", "skills"]);
const res2 = pickObjectKeys(bread, ["weight", "type"]);
