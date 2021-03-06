'use babel';
import { CompositeDisposable } from 'atom';

// const {CompositeDisposable} = require('atom')

export default {
  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(
      atom.commands.add('atom-text-editor', {
        'takeonrules-commands:wrapAbbr': () => this.wrapAbbr(),
        'takeonrules-commands:wrapUpdate': () => this.wrapUpdate()
      })
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
  },

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
      month = dateObj.getMonth() + 1;
      if (month < 10 ) {
        month = "0" + month;
      }
      day = dateObj.getDate();
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
