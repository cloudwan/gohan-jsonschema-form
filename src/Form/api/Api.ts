export class Api {
  public static fetch(
    url: string,
    headers: object = {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-type': 'application/json',
    },
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);

      if (headers) {
        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(JSON.parse(this.response));
        } else {
          reject({
            status: this.status,
            statusText: this.statusText,
          });
        }
      };

      xhr.onerror = function() {
        reject({
          status: this.status,
          statusText: this.statusText,
        });
      };

      xhr.send();
    });
  }
}
