import { HashMap } from './index';

describe('HashMap', () => {
  let hashMap: HashMap;

  beforeEach(() => {
    hashMap = new HashMap();
  });

  it('добавляет и получает значения', () => {
    hashMap.set('key1', 'value1');
    hashMap.set('key2', 'value2');

    expect(hashMap.get('key1')).toBe('value1');
    expect(hashMap.get('key2')).toBe('value2');
  });

  it('возвращает undefined для несуществующих ключей', () => {
    expect(hashMap.get('nonExistentKey')).toBeUndefined();
  });

  it('изменяет значения для существующих значений', () => {
    hashMap.set('key1', 'value1');
    hashMap.set('key1', 'updatedValue');

    expect(hashMap.get('key1')).toBe('updatedValue');
  });

  it('удаляет значения', () => {
    hashMap.set('key1', 'value1');
    hashMap.delete('key1');

    expect(hashMap.get('key1')).toBeUndefined();
  });

  it('проверяет существуют ли значения', () => {
    hashMap.set('key1', 'value1');
    hashMap.set('key2', 'value2');

    expect(hashMap.has('value1')).toBe(true);
    expect(hashMap.has('nonExistentValue')).toBe(false);
  });
  it('очищает весь хеш', () =>{
    hashMap.set('key1', 'value1');
    hashMap.set('key2', 'value2');
    hashMap.set('key3', 'value3');
    
    hashMap.clear()
    expect(hashMap.has('key1')).toBe(false)
    expect(hashMap.has('key2')).toBe(false)
  })
});

