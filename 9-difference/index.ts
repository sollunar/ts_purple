interface IA {
  a: number;
  b: string;
}

interface IB {
  a: number;
  c: boolean;
}

let objA: IA = { a: 5, b: "" };
let objB: IB = { a: 10, c: true };

function difference<
  A extends Record<string, any>,
  B extends Record<string, any>
>(objA: A, objB: B): Omit<A, keyof B> {
  const result = { ...objA };

  for (const key of Object.keys(objB)) {
    delete result[key];
  }

  return result;
}
