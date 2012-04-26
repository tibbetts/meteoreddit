// On server startup, create some stories if empty.
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
