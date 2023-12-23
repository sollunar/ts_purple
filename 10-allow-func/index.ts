function AllowFunc(func: (value: unknown) => boolean) {
  return (target: any, propertyKey: string | symbol): void => {
    let value = target[propertyKey];

    Object.defineProperty(target, propertyKey, {
      set: (newValue: unknown) => {
        if(typeof value !== typeof newValue) {console.log("HEU")}
        if (func(newValue)) {
          value = newValue;
        } else {
          throw new Error(
            `Ошибка присвоения значения для ${String(
              propertyKey
            )}. Разрешенные значения определяются функцией ${String(func)}`
          );
        }
      },
      get: () => value,
    });
  };
}

class User {
  @AllowFunc((a) => typeof a === 'number' && a > 0)
  age: number = 30;
}

const person = new User();
console.log(person.age);

person.age = 20;
console.log(person.age);

person.age = 0;
console.log(person.age);
