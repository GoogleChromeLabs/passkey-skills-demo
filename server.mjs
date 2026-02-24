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

// init project
import express from 'express';
import session from 'express-session';
import hbs from 'hbs';
import { auth } from './libs/auth.mjs';
const app = express();
import useragent from 'express-useragent';
import bodyParser from 'body-parser';

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.set('views', './views');
app.use(express.json());
app.use(useragent.express());
app.use(express.static('public'));
app.use(express.static('dist'));
app.use(session({
  secret: 'secret', // You should specify a real secret here
  resave: true,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    httpOnly: true,
    secure: process.env.IS_LOCAL ? false : true,
    sameSite: process.env.IS_LOCAL ? undefined : 'none'
  }
}));
app.use(bodyParser.urlencoded({ extended: false }));

const RP_NAME = 'Passkey Skills';
const port = process.env.GLITCH_DEBUGGER ? null : 8080;

app.use((req, res, next) => {
  process.env.HOSTNAME = req.hostname;
  const protocol = process.env.IS_LOCAL ? 'http' : 'https';
  process.env.ORIGIN = `${protocol}://${process.env.HOSTNAME}${port ? `:${port}` : ''}`;
  process.env.RP_NAME = RP_NAME;
  if (
    req.get('x-forwarded-proto') &&
    req.get('x-forwarded-proto').split(',')[0] !== 'https'
  ) {
    return res.redirect(301, process.env.ORIGIN);
  }
  req.schema = 'https';
  next();
});

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  // Check session
  if (req.session.username) {
    // If username is known, redirect to `/reauth`.
    res.redirect(307, '/reauth');
    return;
  }
  // If the user is not signed in, show `index.html` with id/password form.
  res.render('index.html', {
    project_name: process.env.PROJECT_NAME,
    title: RP_NAME,
  });
});

app.get('/reauth', (req, res) => {
  const username = req.session.username;
  if (!username) {
    res.redirect(302, '/');
    return;
  }
  // Show `reauth.html`.
  // User is supposed to enter a password (which will be ignored)
  // Make XHR POST to `/signin`
  res.render('reauth.html', {
    username: username,
    project_name: process.env.PROJECT_NAME,
    title: RP_NAME,
  });
});

app.get('/home', (req, res) => {
  if (!req.session.username || req.session['signed-in'] != 'yes') {
    // If user is not signed in, redirect to `/`.
    res.redirect(307, '/');
    return;
  }
  // `home.html` shows sign-out link
  res.render('home.html', {
    displayName: req.session.username,
    project_name: process.env.PROJECT_NAME,
    title: RP_NAME,
  });
});

app.get('/test', (req, res) => {
  res.render('test.html');
})

app.use('/auth', auth);

// listen for req :)
const listener = app.listen(port || process.env.PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log('Your app is listening on port ' + listener.address().port);
});
