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
