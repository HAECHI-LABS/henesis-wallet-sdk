import chalk from "chalk";

export const syntaxHighlight = (json) => {
  if (typeof json != "string") {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          // "key";
          return chalk.green(match);
        } else {
          // "string";
          return chalk.yellow(match);
        }
      } else if (/true|false/.test(match)) {
        return chalk.blue(match);
      } else if (/null/.test(match)) {
        return chalk.cyan(match);
      }
      // "number";
      return chalk.magenta(match);
    }
  );
};
