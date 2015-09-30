Meteor.subscribe("says");

Template.body.helpers({
  last: function () {
    if( Session.get("secret", false) ) {
      return Says.find({}, {fields: {text: 1}, sort: {created_at: -1}, limit: 10})
             .fetch()
             .reverse();
    } else {
      return [];
    }
  }
});

Template.body.events({
  "submit .shout": function (event) {
    event.preventDefault();
    var text = event.target.text.value;
    if( /^.{3,30}$/.test(text) ) {
      Meteor.call("addSay", text);
    }
    event.target.text.value = "";
  }
});

getSay = function () {
  result = Says.findOne( { random_point : { $near : [Math.random(), Math.random()] } } );
  if ( result == null ) return "I AM ERROR";
  return result.text;
};

makeColor = function () {
  var red = Math.random() * 256 >> 0;
  var green = Math.random() * 256 >> 0;
  var blue = Math.random() * 256 >> 0;

  rr = red.toString(16);
  if (rr.length === 1) {
    rr = "0"+rr[0];
  }
  gg = green.toString(16);
  if (gg.length === 1) {
    gg = "0"+gg[0];
  }
  bb = blue.toString(16);
  if (bb.length === 1) {
    bb = "0"+bb[0];
  }
  return "#"+ rr + gg + bb;
};

Template.body.onRendered(function () {
  Session.set("secret", false);
  this.find("audio").play();
  window.setInterval( function () {
    $("body").css("background-color", makeColor());
    $("p").text( getSay() );
  }, 500);

});