import { resolve } from 'path';

export class WalletStorage {

  constructor() {
    this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    const request = window.indexedDB.open('proof', 3);
    request.onerror = (event) => {
      console.error('error at opening indexedDB', event.target.errorCode);
    };
    request.onsuccess = (event) => {
      this.db = event.target.result;
    };
    request.onupgradeneeded = (event) => {
      console.log('onupgradeneeded');
      const db = event.target.result;
      const PlasmaBlockHeaderStore = db.createObjectStore('PlasmaBlockHeader', { keyPath: 'id' });
      PlasmaBlockHeaderStore.createIndex('blkNum', 'blkNum', { unique: false });
      const proofStore = db.createObjectStore('proof', { keyPath: 'id' });
      proofStore.createIndex('utxoKey', 'utxoKey', { unique: false });
      const userActionStore = db.createObjectStore('UserAction', { keyPath: 'id' })
      userActionStore.createIndex('blkNum', 'blkNum', { unique: false });
    }
  }

  add(key, item) {
    window.localStorage.setItem(key, item);
  }

  get(key) {
    try {
      return window.localStorage.getItem(key)
    }catch (e) {
      return null;
    }
  }

  delete(key) {
    window.localStorage.deleteItem(key)
    return true
  }

  addProof(key, blkNum, value) {
    const storeName = 'proof';
    this.db.transaction(storeName, 'readwrite')
      .objectStore(storeName)
      .add({
        id: key + '.' + blkNum,
        utxoKey: key,
        blkNum: blkNum,
        value: value
      });
    return Promise.resolve(true)
  }

  getProof(key, blkNum) {
    const storeName = 'proof'
    const request = this.db.transaction(storeName, 'readwrite')
      .objectStore(storeName)
      .get(key + '.' + blkNum);
    return new Promise((resolve, reject) => {
      request.onerror = function(event) {
        reject(event);
      };
      request.onsuccess = function(event) {
        try {
          resolve(request.result.value);
        } catch (e) {
          reject(e)
        }
      };
    });
  }

  addBlockHeader(blkNum, value) {
    const storeName = 'PlasmaBlockHeader';
    this.db.transaction(storeName, 'readwrite')
      .objectStore(storeName)
      .add({
        id: blkNum,
        blkNum: blkNum,
        value: value
      });
    return Promise.resolve(true)
  }

  getBlockHeader(blkNum) {
    const storeName = 'PlasmaBlockHeader'
    const request = this.db.transaction(storeName, 'readwrite')
      .objectStore(storeName)
      .get(blkNum);
    return new Promise((resolve, reject) => {
      request.onerror = function(event) {
        reject(event);
      };
      request.onsuccess = function(event) {
        resolve(request.result.value);
      };
    });
  }

  searchBlockHeader(fromBlkNum, toBlkNum) {
    const storeName = 'PlasmaBlockHeader';
    const range = IDBKeyRange.bound(fromBlkNum, toBlkNum);
    return new Promise((resolve, reject) => {
      let proofs = [];
      this.db.transaction(storeName, 'readonly')
        .objectStore(storeName)
        .index('blkNum')
        .openCursor(range).onsuccess = function(event) {
          var cursor = event.target.result;
          if (cursor) {
            proofs.push(cursor.value);
            cursor.continue();
          } else {
            resolve(proofs.map(p => {
              return {blkNum: p.blkNum, value: p.value}
            }));
          }
        };
    });
  }

  addAction(actionId, blkNum, value) {
    const storeName = 'UserAction'
    this.db.transaction(storeName, 'readwrite')
      .objectStore(storeName)
      .add({
        id: actionId,
        blkNum,
        value
      })
    return Promise.resolve(true)
  }

  searchActions = (blkNum) => {
    const storeName = 'UserAction'
    console.log(this.db)
    return new Promise((resolve, reject) => {
      this.db.transaction(storeName, 'readonly')
        .objectStore(storeName)
        .getAll().onsuccess = function(event) {
          resolve(event.target.result);
        };
    });

  }
}
