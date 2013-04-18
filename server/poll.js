if (Meteor.isServer) {
  Meteor.startup(function () {
    // Poll
    Choices.remove({});
    var choices = [
      "Eric sells to Carr or Manion",
      "Eric sells to the group, snake style draft",
      "Eric sells to the group, auction draft",
      "Eric sells to a specific member of the group, fight to the death"
    ];

    for (var i = 0; i < choices.length; i++) {
      Choices.insert({
        choice: choices[i],
        votes: []
      });
    }

    // Thunderstruck season ticket holders
    Meteor.users.remove({});
    Accounts.createUser({
      email: "test@test.com",
      password: "test"
    });
  }

  Meteor.publish("choices", function() {
    return Choices.find({});
  });
}