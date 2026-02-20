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
import { JSONFilePreset } from 'lowdb/node'
import { mkdir } from 'fs/promises';

await mkdir(".data", { recursive: true });
const db = await JSONFilePreset('.data/db.json', { users: [], credentials: [] });
await db.read();

/**
 * User data schema
 * {
 *   id: string Base64URL encoded user ID,
 *   username: string username,
 *   displayName: string display name,
 * }
 **/

export const Users = {
  findById: (user_id) => {
    const user = db.data.users.find(user => user.id === user_id);
    return user;
  },

  findByUsername: (username) => {
    const user = db.data.users.find(user => user.username === username);
    return user;
  },

  update: async (user) => {
    let found = false;
    db.data.users = db.data.users.map(_user => {
      if (_user.id === user.id) {
        found = true;
        return user;
      } else {
        return _user;
      }
    });
    if (!found) {
      db.data.users.push(user);
    }
    return db.write();
  }
}

