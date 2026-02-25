import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CacheService {

  private cache = new Map<string, any>();

  get(key: string) {
    return this.cache.get(key);
  }

  set(key: string, value: any) {
    this.cache.set(key, value);
  }
}
