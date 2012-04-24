Articles = new Meteor.Collection("articles");
Users = new Meteor.Collection("users");

if (Meteor.is_client) {
  Template.articles.articles = function () {
    return Articles.find({}, {sort: {score: -1, title: 1}});
  };

  Template.new_article.events = {
    'click #post': function () {
	var title = $('#title').val();
	var url = $('#url').val();
	console.log("Got title " + title + " url=" + url);
        Articles.insert({title: title, url: url});
    }
  };

  Template.article.events = {
      'click .arrow.up': function () {
	  Articles.update(this._id, {$inc: {score: 1}});
      },
      'click .arrow.down': function () {
	  Articles.update(this._id, {$inc: {score: -1}});
      },
  };

    Template.loginout.username = function () {
	if (Session.get('user')) {
	    return Session.get('user').username;
	} else {
	    return undefined;
	}
    };

    Template.loginout.events = {
	'submit #login': function (evt) {
	    var username = $("#login #username").val();
	    console.log("Username is " + username);
	    evt.preventDefault();
	    var user = Users.findOne({username: username});
	    if (!user) {
		user = Users.insert({username: username});
	    }
	    Session.set('user', user);
	}
    };

}

// On server startup, create some stories if empty.
if (Meteor.is_server) {
  Meteor.startup(function () {
    if (Articles.find().count() === 0) {
	console.log("Populating articles with default data");
	var articles = [["Meteor", "http://meteor.com"],
			["StreamBase", "http://streambase.com"],
			["Richard Tibbetts", "http://innocuous.org"],
		       ];
	for (var i = 0; i < articles.length; i++)
            Articles.insert({title: articles[i][0],
			     url: articles[i][1],
			     score: Math.floor(Math.random()*10)*5});
    }
  });
}
