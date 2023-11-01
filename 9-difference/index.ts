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

type Difference = Omit<IA, keyof IB>;

type K = keyof Difference;

function difference<
  A extends Pick<typeof objA, any>,
  B extends Pick<typeof objB, any>
>(objA: A, objB: B) {
  const result: Partial<Omit<A, keyof B>> = {};
  for (const key of Object.keys(objA)) {
    if (objB.hasOwnProperty(key)) {
      result[key] = objA[key];
    }
  }
  return result;
}
