Choices = new Meteor.Collection("choices");

Choices.allow({
  update: function () {
    return true;
  }
});

// Account handling
Accounts.config({
  sendVerificationEmail: false,
  forbidClientAccountCreation: true
});