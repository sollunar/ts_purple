type Bucket = [values: any[], keys: string[]];

export class HashMap {
  private buckets: Bucket[] = [];

  private hash(key: string): number {
    let hash: number = 0;
    for (let i = 0; i < key.length; i++) {
      const charCode: number = key.charCodeAt(i);
      hash += charCode;
    }
    return Math.floor(hash / 4)
  }

  add(key: string, value: any): void {
    const hash: number = this.hash(key);
    const [values, keys] = this.buckets[hash] || [[], []];
    const index = keys.indexOf(key);

    if (index === -1) {
      values.push(value);
      keys.push(key);
    } else {
      values[index] = value;
    }

    this.buckets[hash] = [values, keys];
  }

  get(key: string): any | undefined {
    const hash: number = this.hash(key);
    const [values, keys] = this.buckets[hash] || [[], []];
    const index = keys.indexOf(key);

    if (index !== -1) {
      return values[index];
    }

    return undefined;
  }

  delete(key: string): void {
    const hash: number = this.hash(key);
    const [values, keys] = this.buckets[hash] || [[], []];
    const index = keys.indexOf(key);

    if (index !== -1) {
      values.splice(index, 1);
      keys.splice(index, 1);
    }
  }

  has(value: any): boolean {
    for (const entries of this.buckets) {
      if (entries) {
        const [values, keys] = entries;
        if (values.includes(value)) {
          return true;
        }
      }
    }
    return false;
  }
}

