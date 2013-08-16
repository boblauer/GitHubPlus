(function($) {

  var $commentFieldContainsPlusData = null;

  function loadDOMElements(date, estimate) {
    var $container = $(document.createElement('div')).addClass('gh-plus').hide()

    var $date = $(document.createElement('input')).attr('id', 'gh-plus-due').datepicker().datepicker('setDate', date).change(saveData);
    var $input = $(document.createElement('input')).attr('id', 'gh-plus-estimated-hours').val(estimate || '').change(saveData);

    $container.append($date);
    $container.append($input);

    $('div.js-discussion').prepend($container);
    $container.slideDown();

    $("#ui-datepicker-div").wrap('<div class="gh-plus" />');
  }

  function saveData() {
    var saveData = buildSaveData();

    if ($commentFieldContainsPlusData) {
      updateExistingComment(saveData);
    }
    else {
      createNewComment(saveData);
    }
  }

  function createNewComment(message) {
    setTextAndSave($('.write-content').find('textarea'), message);
  }

  function updateExistingComment(message) {
    setTextAndSave($commentFieldContainsPlusData, message);
  }


  function findDataComment() {
    var output = null;
    var $commentContainer, $commentField, savedData, commentId;
    var $commentText = $('code:contains(ghplus):first').next();

    if ($commentText.length) {
      commentId = $commentText.parents('div[id^=issuecomment]').attr('id').split('-')[1];

      $commentContainer = $commentText.parents('.discussion-bubble:first');
      $commentField = $('textarea[data-suggester=issue_comment_' + commentId + '_suggester]');
      savedData = JSON.parse($commentText.text());

      output = {
        commentContainer: $commentContainer,
        commentField: $commentField,
        savedData: savedData
      };
    }

    return output;
  }

  function setTextAndSave($textArea, message) {
    $textArea.val(message);

    var formActions = $textArea.parent().siblings('.form-actions');
    if (!formActions.length) {
      formActions = $('.form-actions');
    }

    if (formActions.length) {
      formActions.find('button[type=submit]').click();
    }
    else {
      alert('ERROR: Unable to find the correct submit button');
    }

  }

  function buildSaveData() {
    var dueDate = $('#gh-plus-due').val();
    var estimatedHours = $('#gh-plus-estimated-hours').val();

    var savedData = JSON.stringify({ due: dueDate, estimate: estimatedHours });

    var fullMessage = 'If you can see this message, you do not have GitHub Plus installed.  To install the extensions, please visit: ';
    fullMessage += '\n';
    fullMessage += '`ghplus``' + savedData + '``ghplus`';

    return fullMessage;
  }

  (function() {
    var existingData = findDataComment()
      , dueDate = null
      , estimate = null
      ;

    if (existingData) {
      existingData.commentContainer.hide();

      $commentFieldContainsPlusData = existingData.commentField;

      dueDate = existingData.savedData.due ? new Date(existingData.savedData.due) : null;
      estimate = existingData.savedData.estimate;
    }

    loadDOMElements(dueDate, estimate);
  })();

})(window.jQuery.noConflict())