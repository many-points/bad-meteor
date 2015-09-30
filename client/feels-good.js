Meteor.subscribe("says");

Template.body.helpers({
  last: function () {
    if( Session.get("secret") ) {
      return Says.find({}, {fields: {text: 1, createdAt: 1}, sort: {createdAt: -1}})
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
    if( ! /^.{3,30}$/.test(text) ) return;
    if( text === "konami code" ) {
      if( Session.get("secret") )
        Session.set("secret", false);
      else
        Session.set("secret", true);
    } else {
      Meteor.call("addSay", text);
    }
    event.target.text.value = "";
    event.target.text.blur();
  }
});

Template.say.helpers({
  feels: function (createdAt) {
    return createdAt < Date.parse("1 Jan 9999");
  }
});

Template.say.events({
  "click .delete": function () {
    Meteor.call("deleteSay", this._id);
  }
});

getSay = function () {
  result = Says.findOne( { random_point : { $near : [Math.random(), Math.random()] } } );
  if ( result == null ) return "Looking for my database...";
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