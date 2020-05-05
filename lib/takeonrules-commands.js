const {CompositeDisposable} = require('atom')

module.exports = {
  subscriptions: null,

  activate () {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(
      atom.commands.add(
        'atom-workspace', {'takeonrules-commands:wrapAbbr': () => this.wrapAbbr()}
      )
    );
  },

  deactivate () {
    this.subscriptions.dispose();
  },

  wrapAbbr() {
    const editor = atom.workspace.getActiveTextEditor()
    if (editor == null) return;
    return editor.mutateSelectedText(function(selection) {
      var newText, text;
      if (selection.isEmpty()) {
        selection.selectWord();
      }
      text = selection.getText();
      newText = "{{< abbr \"" + text + "\" >}}";
      return selection.insertText(newText, {
        select: true
      });
    });
  }
}
