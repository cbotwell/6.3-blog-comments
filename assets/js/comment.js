var Comment = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    name: '',
    email: '',
    commentString: ''
  }
});

var AllComments = Backbone.Collection.extend({
  model: Comment,
  url: 'http://tiny-lr.herokuapp.com/collections/co-comments'
});
