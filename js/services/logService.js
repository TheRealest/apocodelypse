module.exports = ['LINE_WIDTH', function(LINE_WIDTH) {
  // line transforms
    var justifyTransform = function(content) {
      // expect array with two strings
      var numSpaces = LINE_WIDTH - content[0].length - content[1].length;
      var spaces = Array.apply(null,new Array(numSpaces)).map(function(){return ' ';}).join('');
      return content[0] + spaces + content[1];
    };
    var indentTransform = function(n) {
      return function(content) {
        return classTransform('indent-'+n)(content);
      };
    };
    var headerTransform = function(content) {
      content = content.toUpperCase();
      var dashes = Array.apply(null,new Array(content.length)).map(function(){return '-';}).join('');
      return [content,dashes].join('<br>');
    };
    var classTransform = function(cls) {
      cls = Array.isArray(cls) ? cls.join(' ') : cls;

      return function(content) {
        return [
          '<span class="',
          cls,
          '">',
          content,
          '</span>'
        ].join('');
      };
    };

    

  this.T = {
    justify: justifyTransform,
    indent: indentTransform,
    header: headerTransform,
    class: classTransform
  };

  this.process = function(lines) {
    // wrap single string in array if need be
    lines = Array.isArray(lines) ? lines : [lines];

    // process strings
    var strings = lines.map(function(line) {
      if (line.transforms) {
        // first translate transform names to functions
        line.transforms = line.transforms.filter(function(name) {

          return name in this.T ?
        },this)
        .map(function(name) {
          return this.T[name];
        },this);

        return line.transforms.reduce(function(content,transform) {
          console.log(transform);
          return transform(content);
        },line.content);
      } else if (line.content) {
        return line.content;
      } else {
        return line;
      }
    },this);
    return strings.join('<br>');
  };
}];
