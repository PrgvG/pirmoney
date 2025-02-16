export function repository<T>(name: string) {
  const openRequest = indexedDB.open(name);

  openRequest.onupgradeneeded = function () {
    if (!openRequest.result.objectStoreNames.contains(name)) {
      openRequest.result.createObjectStore(name);
    }
  };

  return {
    init() {
      return new Promise((resolve, reject) => {
        openRequest.onerror = function (error) {
          reject(error);
        };

        openRequest.onsuccess = function () {
          openRequest.result.onversionchange = function () {
            openRequest.result.close();
            alert("База данных устарела, пожалуйста, перезагрузите страницу.");
          };
          resolve(openRequest.readyState);
        };
      });
    },
    add(value: T, key: string) {
      return new Promise((resolve, reject) => {
        const transaction = openRequest.result.transaction(name, "readwrite");
        const store = transaction.objectStore(name);
        const request = store.add(value, key);

        request.onsuccess = function () {
          resolve(request.result);
        };

        request.onerror = function () {
          reject(request.error);
        };
      });
    },
    put(value: T, key: string) {
      return new Promise((resolve, reject) => {
        const transaction = openRequest.result.transaction(name, "readwrite");
        const store = transaction.objectStore(name);
        const request = store.put(value, key);

        request.onsuccess = function () {
          resolve(request.result);
        };

        request.onerror = function () {
          reject(request.error);
        };
      });
    },
    getAll(): Promise<T[]> {
      return new Promise((resolve, reject) => {
        const transaction = openRequest.result.transaction(name, "readonly");
        const store = transaction.objectStore(name);

        const request = store.getAll();

        request.onsuccess = function () {
          resolve(request.result as T[]);
        };
        request.onerror = function (error) {
          reject(error);
        };
      });
    },
    del(key: string) {
      return new Promise((resolve, reject) => {
        const transaction = openRequest.result.transaction(name, "readwrite");
        const store = transaction.objectStore(name);
        const request = store.delete(key);

        request.onsuccess = function () {
          resolve(request.result);
        };

        request.onerror = function () {
          reject(request.error);
        };
      });
    },
    changeKey(oldKey: string, newKey: string) {
      return new Promise((resolve, reject) => {
        const transaction = openRequest.result.transaction(name, "readwrite");
        const store = transaction.objectStore(name);
        const request = store.getAll();

        request.onsuccess = function () {
          const objects = request.result;
          if (objects) {
            objects.forEach((object) => {
              if (oldKey in object) {
                object[newKey] = object[oldKey];
                delete object[oldKey];

                store.put(object, object.id);
              }
            });
          }
          resolve(request.result);
        };

        request.onerror = function () {
          reject(request.error);
        };
      });
    },
  };
}
