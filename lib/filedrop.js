define(function (require) {
  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(fileDrop);

  /**
   * Module function
   */

  function fileDrop() {
    this.checkSupport = function () {
      if (window.FileReader == null) {
        this.trigger('fileDrop:FileReader:unsupported');
      }
    };

    this.dragOver = function (e) {
      this.$node.addClass('is-hovered');
      e.preventDefault(); // Default must be prevented or the drop event is ignored
    };

    this.dragLeave = function (e) {
      this.$node.removeClass('is-hovered');
      e.preventDefault();
    };

    this.handleDrop = function (e) {
      this.$node.removeClass('is-hovered');
      e.preventDefault();

      var files = e.originalEvent.dataTransfer.files;
      this.trigger('fileDrop:file:dropped', { files: files });

      if (!this.attr.loadHandler) return;
      files.forEach(this.attr.loadHandler.bind(this));
    };

    this.load = function (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        this.trigger('fileDrop:file:loaded', { source: e.target.result });
      }.bind(this);
      reader.readAsDataURL(file);
    };

    this.defaultAttrs({
      loadHandler: this.load
    });

    this.after('initialize', function () {
      this.on('dragover', this.dragOver);
      this.on('dragleave', this.dragLeave);
      this.on('drop', this.handleDrop);
    });
  }

});
