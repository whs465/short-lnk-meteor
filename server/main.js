// @flow
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import './../imports/api/users';
import { Links } from './../imports/api/links';
import moment from 'moment';

Meteor.startup(() => {
  let now = new Date();
  console.log(now);
  let momentNow = moment();
  console.log(momentNow.format('MMM Do, YYYY'));
  // code to run on server at startup
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });

    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
  });
});
