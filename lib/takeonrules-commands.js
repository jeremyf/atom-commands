const {CompositeDisposable} = require('atom')

module.exports = {
  subscriptions: null,

  activate () {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(
      atom.commands.add(
        'atom-workspace', {'takeonrules-commands:wrapAbbr': () => this.wrapAbbr()}
        'atom-workspace', {'takeonrules-commands:wrapUpdate': () => this.hugoUpdate()}
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

  wrapUpdate() {
    const editor = atom.workspace.getActiveTextEditor()
    if (editor == null) return;
    return editor.mutateSelectedText(function(selection) {
      var newText, text;
      if (selection.isEmpty()) {
        selection.selectWord();
      }
      text = selection.getText();
      dateObj = new Date();
      month = dateObject.getMonth() + 1;
      if (month < 10 ) {
        month = "0" + month;
      }
      day = dateObject.getDay() + 1;
      if (day < 10 ) {
        day = "0" + day;
      }
      dateTxt = dateObj.getFullYear() + "-" + month + "-" + day;
      newText = "{{< update mode=\"sidenote\" date=\"" + dateTxt + "\">}}" + text + "{{< /sidenote >}}";
      return selection.insertText(newText, {
        select: true
      });
    });
  }
}
