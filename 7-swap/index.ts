type TObject = Record<string, number>;

const obj: TObject = {
  a: 1,
  b: 2,
};

function swapKeysAndValues<T extends TObject>(obj: T): Record<number, string> {
  const res: Record<number, string> = {} as Record<number, string>;
  for (const [key, value] of Object.entries(obj)) {
    res[value] = key;
  }
  return res;
}

const swappedObj = swapKeysAndValues(obj);
