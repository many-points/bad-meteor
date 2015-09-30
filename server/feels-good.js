Meteor.publish("says", function () {
  return Says.find();
});

Meteor.methods({
  addSay: function (text) {
    Says.insert({
      text: text,
      random_point: [Math.random(), Math.random()],
      createdAt: Date.parse(new Date())
    });
  },
  deleteSay: function (id) {
    Says.remove(id);
  }
});

Meteor.startup(function () {
  Says._ensureIndex( { random_point: '2d' } );
  Says._ensureIndex( { createdAt: 1} , {expireAfterSeconds: 60*60*24} );
  if( Says.findOne({ createdAt: Date.parse("1 Jan 9999") }) == null)
    Says.insert({ text: "It feels good", random_point: [0.5, 0.5], createdAt: Date.parse("1 Jan 9999")});
});