Says = new Mongo.Collection("says");

if (Meteor.isClient) {

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

  Template.body.events({
    "submit .shout": function (event) {
      event.preventDefault();
      var text = event.target.text.value;

      if( validateSay(text) ) {
        Meteor.call("addSay", text);
      } else {
        console.log("did not meet criteria: " + text);
      }

      event.target.text.value = "";
    }
  });

  getSay = function () {
    result = Says.findOne( { random_point : { $near : [Math.random(), Math.random()] } } );
    if ( result == null ) return "I AM ERROR";
    return result.text;
  };

  validateSay = function (say) {
    re = /^.{3,30}$/;
    return re.test(say);
  };

  Template.body.onRendered(function () {
    this.find("audio").play();
    window.setInterval( function () {
      $("body").css("background-color", makeColor());
      $("p").text( getSay() );
    }, 500);
  });
}

Meteor.methods({
  addSay: function (text) {
    Says.insert({
      text: text,
      random_point: [Math.random(), Math.random()],
      created_at: new Date()
    });
  }
});