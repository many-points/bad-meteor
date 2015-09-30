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