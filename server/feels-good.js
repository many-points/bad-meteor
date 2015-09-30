Meteor.publish("says", function () {
  return Says.find();
});

Meteor.methods({
  addSay: function (text) {
    Says.insert({
      text: text,
      random_point: [Math.random(), Math.random()],
      created_at: new Date()
    });
  }
});

Meteor.startup(function () {
  if (Says.find().count() === 0) {
    Says._ensureIndex( { random_point: '2d' } );
    Meteor.call("addSay", "It feels good");
  }
});