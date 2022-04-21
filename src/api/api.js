const baseUrl = 'https://asia-northeast1-multi-wordle-56e70.cloudfunctions.net/wordle'
// const baseUrl = 'http://192.168.0.227/:5002/multi-wordle-56e70/asia-northeast1/wordle'

/**
 * queries: [{ key: "", value: "" }]
 */
function buildQueryString (queries) {
    if (!queries) return ""
    let tmp = ""
    queries.forEach((query, index) => {
        if (index == 0) tmp += `?${query.key}=${query.value}`
        else tmp += `&${query.key}=${query.value}`
    });
    return tmp
}

/**
 * path: '/'
 * queries: [{ key: "", value: "" }]
 */
export function get (path, queries) {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        const url = `${baseUrl}${path}${buildQueryString(queries)}`
        req.open('GET', url, true);
        req.setRequestHeader('accept', 'application/json')

        req.onload = function() {
          if (req.status === 200) {
            resolve(JSON.parse(req.responseText));
          } else {
            reject(new Error(req.statusText));
          }
        };
        req.onerror = function() {
          reject(new Error(req.statusText));
        };
        req.send();
    });
}

/**
 * path: '/'
 * data: Object
 * queries: [{ key: "", value: "" }]
 */
export async function post (path, data, queries) {
  const url = `${baseUrl}${path}${buildQueryString(queries)}`
  // 既定のオプションには * が付いています
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // 本文のデータ型は "Content-Type" ヘッダーと一致させる必要があります
  })
  return response.json(); // JSON のレスポンスをネイティブの JavaScript オブジェクトに解釈
}
