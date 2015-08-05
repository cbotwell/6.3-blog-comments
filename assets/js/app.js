var CommentView = Backbone.View.extend({
  tagName: 'li',

  template: AppTemplates.comment,

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  // events: {
  //   'click .upvote': 'upvote',
  //   'click .downvote': 'downvote'
  // },

  render: function() {
    var html = this.template(this.model.toJSON());
    this.$el.html(html);

    return this;
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
    var commentString = this.$el.find('input.comment').val();
    this.collection.create({name: name, email: email, commentString: commentString});
  }
});
