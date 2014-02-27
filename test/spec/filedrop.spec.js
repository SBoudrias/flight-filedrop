'use strict';

describeComponent('lib/filedrop', function () {

  // Initialize the component and attach it to the DOM
  beforeEach(function () {
    setupComponent();
  });

  it('is defined', function () {
    expect(this.component).toBeDefined();
  });

  describe('CSS styling', function () {
    it('toggle `.is-hovered` class when a file is dragged upon the zone', function () {
      this.component.trigger('dragover');
      expect(this.component.$node).toHaveClass('is-hovered');
      this.component.trigger('dragleave');
      expect(this.component.$node).not.toHaveClass('is-hovered');
    });
  });

  describe('#handleDrop()', function () {
    var dropEvent = $.Event('drop', {
      originalEvent: {
        dataTransfer: { files: ['foo', 'bar'] }
      }
    });

    it('manage CSS state', function () {
      this.component.trigger('dragover');
      expect(this.component.$node).toHaveClass('is-hovered');
      this.component.$node.trigger(dropEvent);
      expect(this.component.$node).not.toHaveClass('is-hovered');
    });

    it('trigger loadHandler for each files', function () {
      var loadSpy = jasmine.createSpy('loadHandler');
      setupComponent({
        loadHandler: loadSpy
      });
      this.component.$node.trigger(dropEvent);
      expect(loadSpy.calls.length).toEqual(2);
      expect(loadSpy.calls[0].args[0]).toEqual('foo');
      expect(loadSpy.calls[1].args[0]).toEqual('bar');
    });

    it('trigger an event passing files as parameter', function () {
      var eventSpy = spyOnEvent(this.component.node, 'fileDrop:file:dropped');
      this.component.$node.trigger(dropEvent);
      expect(eventSpy.calls[0].data).toEqual({ files: ['foo', 'bar'] });
    });
  });

});
