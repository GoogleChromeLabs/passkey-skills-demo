/*
 * @license
 * Copyright 2023 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
export const $ = document.querySelector.bind(document);

export async function _fetch(path, payload = '') {
  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
  };
  if (payload && !(payload instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(payload);
  }
  const res = await fetch(path, {
    method: 'POST',
    credentials: 'same-origin',
    headers: headers,
    body: payload,
  });
  if (res.status === 200) {
    // Server authentication succeeded
    return res.json();
  } else {
    // Server authentication failed
    const result = await res.json();
    throw new Error(result.error);
  }
};

class Loading {
  constructor() {
    this.progress = $('#progress');
  }
  start() {
    this.progress.classList.remove("hidden");
    const inputs = document.querySelectorAll('input');
    if (inputs) {
      inputs.forEach(input => input.disabled = true);
    }
  }
  stop() {
    this.progress.classList.add("hidden");
    const inputs = document.querySelectorAll('input');
    if (inputs) {
      inputs.forEach(input => input.disabled = false);
    }
  }
}

export const loading = new Loading();