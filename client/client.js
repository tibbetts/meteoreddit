Template.main_content.selected_article = function() {
    return Session.get("selected_article");
}

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
    'click a.comments': function (evt) {
	evt.preventDefault();
	Session.set("selected_article", this._id);
    }
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

Template.comments.events = {
    'click a.backs': function (evt) {
	evt.preventDefault();
	Session.set("selected_article", false);
	return false;
    },
    'click #post_comment': function (evt) {
	evt.preventDefault();
	var comment = $("form#comment #text").val();
	var articleId = Session.get("selected_article");
	Comments.insert({article: articleId,
			 text: comment});
	Articles.update(articleId, {$inc: {comment_count: 1}});

    }
};
Template.comments.article = function () {
    return Articles.findOne(Session.get("selected_article"));
}
Template.comments.comments = function() {
    return Comments.find({article: Session.get("selected_article")})
};
