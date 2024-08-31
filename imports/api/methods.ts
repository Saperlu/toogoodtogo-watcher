import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
// import { TasksCollection } from '/imports/db/TasksCollection';

Meteor.methods({
  'user.register'({email, password}:{email: String, password: String}) {
    check(email, String);
    check(password, String);

    // if (!this.userId) {
    //   throw new Meteor.Error('Not authorized.');
    // }

    // TasksCollection.insert({
    //   text,
    //   createdAt: new Date(),
    //   userId: this.userId,
    // });
    return 'ok'
  },
});