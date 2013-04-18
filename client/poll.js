if (Meteor.isClient) {
  Meteor.subscribe("choices");

  Template.choices.choices = function () {
    return Choices.find({}).fetch();
  };

  function currentUserCanVote() {
    if (Meteor.user() === null) {
      return false;
    }
    var choices = Choices.find({}).fetch();
    for (var i = 0; i < choices.length; i++) {
      for (var j = 0; j < choices[i].votes.length; j++) {
        if (Meteor.userId() === choices[i].votes[j].user) {
          return false;
        }
      }
    }
    return true;
  };

  function hasUser() {
    if (Meteor.user() == null) {
      return false;
    }
    return true;
  };

  function choose(evt, id) {
    $(".selected").removeClass("selected");
    $(evt.target).addClass("selected");

    Session.set("selected-choice", id);
  };

  Template.choices.events({
    'click .choice' : function (evt) {
      choose(evt, this._id);
    },
    'touchend .choice' : function (evt) {
      choose(evt, this._id);
    }
  });

  function submit() {
    if (currentUserCanVote()) {
      Choices.update(Session.get("selected-choice"), {$addToSet: {votes: {user: Meteor.userId()}}});
    }
  };

  Template.submit.events({
    'click .submit' : submit,
    'touchend .submit' : submit
  });

  Template.submit.canSubmit = currentUserCanVote;

  Template.submit.hasUser = hasUser;

  Template.submit.canVote = currentUserCanVote;
}