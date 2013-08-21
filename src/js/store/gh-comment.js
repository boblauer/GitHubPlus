"use strict";

var $ = require('jquery');

function GitHubComment() { }

// TODO: require this instead?  Maybe not, minimal info.  More info I can extract?
GitHubComment.config = {
  commentKey: 'gh+'
};

GitHubComment._findAll = function() {
  return $('code:contains(' + this.config.commentKey + ')');
};

GitHubComment._findLatest = function() {
  return this._findAll().filter(':last');
};

GitHubComment._getCommentData = function(codeElement) {
  return this._deserialize(codeElement.prev().text());
};

GitHubComment._getLatestCommentData = function() {
  var latest = this._findLatest()
    , commentData = null
    ;

  if (latest.length) {
    commentData = this._getCommentData(latest);
  }

  return commentData;
};

GitHubComment._getContainer = function(el) {
  return el.parents('div.discussion-bubble');
};

GitHubComment._hideAll = function() {
  this._getContainer(this._findAll()).hide();
};

GitHubComment._serialize = function(data) {
  return JSON.stringify(data);
};

GitHubComment._deserialize = function(data) {
  return JSON.parse(data);
};

GitHubComment._buildComment = function(data) {
  var fullMessage = 'If you can see this, you do not have GitHub+ installed.  To install the extension, please visit: ';
  fullMessage += '\n';
  fullMessage += '`' + this.config.commentKey + '``' + data + '``' + this.config.commentKey + '`';

  return fullMessage;
};

GitHubComment._canEdit = function(latestComment) {
  return !!latestComment.parents('.comment:first').find('.js-comment-edit-button').length;
};

GitHubComment._waitForCreateDone = function(cb) {
  var commentCount = $('div.discussion-bubble').length;

  var interval = setInterval(function() {
    var comments = $('div.discussion-bubble');
    if (comments.length > commentCount) {
      clearInterval(interval);

      var container = comments.filter(':not(:last)').filter(':last');
      cb(null, container);
    }
    else if (this.errorOccurred()) {
      clearInterval(interval);
      cb(true);
    }
  }, 200);
};

GitHubComment._waitForUpdateDone = function(latestComment, cb) {
  latestComment.attr('ghplus', true);
  var container = this._getContainer(latestComment);

  var self = this;
  var interval = setInterval(function() {
    if (!self._findLatest().attr('ghplus')) {
      clearInterval(interval);
      cb(null, container);
    }
    else if (self.errorOccurred()) {
      clearInterval(interval);
      cb(true);
    }
  }, 200);
};

GitHubComment.errorOccurred = function() {
  var error = $('.ajax-error-message:visible:not([ghplus])');
  if (error.length) {
    error.attr('ghplus', true);
  }

  return !!error.length;
};

GitHubComment._createNewComment = function(text) {
  this._setTextAndSave($('.write-content').find('textarea'), text);
};

GitHubComment._updateExistingComment = function(commentField, text) {
  var commentId = commentField.parents('div[id^=issuecomment]').attr('id').split('-')[1]
    , commentTextField = $('textarea[data-suggester=issue_comment_' + commentId + '_suggester]')
    ;

   this._setTextAndSave(commentTextField, text);
};

GitHubComment._setTextAndSave = function(textArea, text) {
  var saveButtonSelector = 'button[type=submit]';
  textArea.val(text);

  var formActions = textArea.parent().siblings('.form-actions');
  if (!formActions.length) {
    formActions = $('.form-actions');
    saveButtonSelector = 'button.primary[type=submit]';
  }

  if (formActions.length) {
    formActions.find(saveButtonSelector).click();
  }
  else {
    console.error('ERROR: Unable to find the correct submit button');
  }
};

GitHubComment.save = function(data, cb) {
  data = this._buildComment(this._serialize(data));

  var latestComment = this._findLatest();
  if (latestComment.length && this._canEdit(latestComment)) {
    this._waitForUpdateDone(latestComment, cb);
    this._updateExistingComment(latestComment, data);
  }
  else {
    this._waitForCreateDone(cb);
    this._createNewComment(data);
  }
};

GitHubComment.load = function() {
  this._hideAll();
  return this._getLatestCommentData();
};

module.exports = GitHubComment;
