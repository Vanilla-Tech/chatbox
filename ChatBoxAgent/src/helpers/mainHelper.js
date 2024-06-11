var mainHelper = (function () {
  function replaceText(text) {
    var emots = {
      ":-)": "&#x1f604",
      ":)": "&#x1f603",
      ":-D": "&#x1f600",
      ":D": "&#x1f601",
      "=D": "&#x1f600",
      ";)": "&#x1f609",
      ";-)": "&#x1f609",
      ";=)": "&#x1f609",
      "(wink)": "&#x1f609",
      ":*": "&#x1f617",
      ":-*": "&#x1f617",
      ";(": "&#x1f622",
      ";-(": "&#x1f622",
      "xD": "&#x1f606",
      "XD": "&#x1f606",
      "(xd)": "&#x1f600",
      ":(": "&#x1f61e",
      ":P": "&#x1f61b",
      "-_-": "&#x1f61b",
      ":-/": "&#x1f612",
      "(smileeyes)": "&#x1f60a",
      ":$": "&#x1f60a",
      ":-$": "&#x1f60a",
      ":=$": "&#x1f60a",
      "(blush)": "&#x1f60a",
      "(hearteyes) ": "&#x1f60d",
      "(winktongueout)": "&#x1f61c",
      ":-P": "&#x1f61b",
      ":=P": "&#x1f61b",
      ":p": "&#x1f61b",
      ":-p": "&#x1f61b",
      ":=p": "&#x1f61b",
      "(flushed)": "&#x1f633",
      "(pensive)": "&#x1f614",
      "(unamused)": "&#x1f612",
      "(disappointed)": "&#x1f61e",
      ";=(": "&#x1f622",
      ":'(": "&#x1f622",
      "(cry)": "&#x1f622",
      "(joy)": "&#x1f602",
      "|-)": "&#x1f62a",
      "I-)": "&#x1f62a",
      "I=)": "&#x1f62a",
      "(snooze)": "&#x1f62a",
      "(sleepy)": "&#x1f62a",
      "(whew)": "&#x1f625",
      "(relieved)": "&#x1f625",
      "(:|": "&#x1f613",
      "(sweat)": "&#x1f613",
      "(weary)": "&#x1f629",
      "(tired)": "&#x1f62b",
      "(fearful)": "&#x1f628",
      ":@ ": "&#x1f620",
      ":-@": "&#x1f620",
      ":=@": "&#x1f620",
      "x(": "&#x1f620",
      "x-(": "&#x1f620",
      "X(": "&#x1f620",
      "X-(": "&#x1f620",
      "x=(": "&#x1f620",
      "X=(": "&#x1f620",
      ";@": "&#x1f620",
      ";-@": "&#x1f620",
      "(angry)": "&#x1f620"
    };

    for (var key in emots) {
      if (emots.hasOwnProperty(key)) {
        text = text.replace(new RegExp(key.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), 'g'), emots[key]);
      }
    }
    return text;
  }

  return {
    replaceText: replaceText
  }
})();

export default mainHelper = mainHelper;
