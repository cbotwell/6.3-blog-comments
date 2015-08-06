var AppTemplates = {};

AppTemplates['app'] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<section class=\"wrapper\">\n    <header class=\"header\">\n        <h3>Comments</h1>\n        <button class=\"add-comment\">Add Comment</button>\n        <div class=\"new-comment\">\n            <p>name</p>\n            <input type=\"text\" class=\"name\">\n            <p>email</p>\n            <input type=\"text\" class=\"email\">\n            <p>comment</p>\n            <textarea class=\"comment\"></textarea>\n            <button class=\"submit-comment\">Submit</button>\n        </div>\n    </header>\n    <section class=\"main\">\n        <ul class=\"comments\"></ul>\n    </section>\n</section>\n";
},"useData":true});
AppTemplates['comment'] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<a href=\"mailto:"
    + alias3(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"email","hash":{},"data":data}) : helper)))
    + "?subject=RE:%20Your%20Obnoxious%20Comment\" class=\"name\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a>\n<p class=\"comment\">"
    + alias3(((helper = (helper = helpers.commentString || (depth0 != null ? depth0.commentString : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"commentString","hash":{},"data":data}) : helper)))
    + "</p>\n<div class=\"votes\">\n    "
    + alias3(((helper = (helper = helpers.upvotes || (depth0 != null ? depth0.upvotes : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"upvotes","hash":{},"data":data}) : helper)))
    + "\n    <i class=\"fa fa-caret-up upvote\"></i>\n    |\n    "
    + alias3(((helper = (helper = helpers.downvotes || (depth0 != null ? depth0.downvotes : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"downvotes","hash":{},"data":data}) : helper)))
    + "\n    <i class=\"fa fa-caret-down downvote\"></i>\n</div>\n";
},"useData":true});
var Comment = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    name: '',
    email: '',
    commentString: '',
    createDate: null,
    upvotes: 0,
    downvotes: 0
  }
});

var AllComments = Backbone.Collection.extend({
  model: Comment,
  url: 'http://tiny-lr.herokuapp.com/collections/co-comments'
});

var CommentView = Backbone.View.extend({
  tagName: 'li',

  template: AppTemplates.comment,

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  events: {
    'click .upvote': 'upvote',
    'click .downvote': 'downvote'
  },

  render: function() {
    var html = this.template(this.model.toJSON());
    this.$el.html(html);

    return this;
  },

  upvote: function() {
    var upvotes = this.model.get('upvotes');
    this.model.set({upvotes: ++upvotes});
  },

  downvote: function() {
    var downvotes = this.model.get('downvotes');
    this.model.set({downvotes: ++downvotes});
  }

});

var AppView = Backbone.View.extend({
  template: AppTemplates.app,

  el: '#target',

  initialize: function() {
    this.listenTo(this.collection, 'add reset sync', this.render);

    this.render();
    this.collection.fetch();
  },

  events: {
    'click .add-comment': 'addComment',
    'click .submit-comment': 'submitComment'
  },

  render: function() {
    var html = this.template(this.collection);
    var _this = this;

    this.$el.html(html);

    this.collection.sortBy('createDate').forEach(function(comment) {
      var childView = new CommentView({model: comment});
      _this.$el.find('.comments').append(childView.render().$el);
    });

    console.info('render');

    return this;
  },

  addComment: function() {
    this.$el.find('.new-comment').slideDown();
  },

  submitComment: function() {
    var name = this.$el.find('input.name').val();
    var email = this.$el.find('input.email').val();
    var commentString = this.$el.find('textarea.comment').val();
    this.collection.create({name: name, email: email, commentString: commentString, createDate: new Date()});
  }
});

var comments = new AllComments();
var app = new AppView({collection: comments});
//# sourceMappingURL=app.map