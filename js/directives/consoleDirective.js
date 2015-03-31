module.exports = ['commandRunner', function(commandRunner) {
  return {
    scope: {
    },
    templateUrl: '../templates/consoleDirective.html',
    restrict: 'E',
    controller: function($scope) {
      var consoleElement = angular.element(document.getElementById('console'));

      $scope.sendCommand = function() {
        $scope.addCommandToHistory($scope.commandLine);
        $scope.postCommand($scope.commandLine);
        var result = commandRunner.runCommand($scope.commandLine);
        $scope.postResult(result);
        $scope.clearCommandLine();
      };

      $scope.clearCommandLine = function() {
        $scope.commandLine = '';
      };

      $scope.escapeHTML = function(str) {
        return angular.element('<div>').text(str).html();
      }

      $scope.postCommand = function(command) {
        var line = '';
        line += '<span class="command">&gt; ';
        line += $scope.escapeHTML(command);
        line += '</span>';
        line += '<br>';
        consoleElement.append(line);
      };

      $scope.postResult = function(result) {
        var line = '';
        line += '<span class="result">';
        line += $scope.escapeHTML(result);
        line += '</span>';
        line += '<br>';
        consoleElement.append(line);
      };

      $scope.commandHistory = [];
      $scope.commandHistoryIndex = -1;
      $scope.workingCommand = '';

      $scope.addCommandToHistory = function(command) {
        $scope.commandHistory.unshift(command);
        $scope.commandHistoryIndex = -1;
        $scope.workingCommand = '';
      };

      $scope.previousCommand = function() {
        if ($scope.commandHistoryIndex === -1) {
          $scope.workingCommand = $scope.commandLine;
        }
        if ($scope.commandHistoryIndex >= $scope.commandHistory.length-1) {
          $scope.commandHistoryIndex = $scope.commandHistory.length-1;
        } else {
          $scope.commandHistoryIndex++;
        }
        $scope.commandLine = $scope.commandHistory[$scope.commandHistoryIndex];
      };

      $scope.nextCommand = function() {
        if ($scope.commandHistoryIndex < 0) {
          $scope.commandHistoryIndex = -1;
        } else if ($scope.commandHistoryIndex === 0) {
          $scope.commandHistoryIndex = -1;
          $scope.commandLine = $scope.workingCommand;
        } else {
          $scope.commandHistoryIndex--;
          $scope.commandLine = $scope.commandHistory[$scope.commandHistoryIndex];
        }
      };

      var keymap = {
        38: $scope.previousCommand, // up arrow
        40: $scope.nextCommand,     // down arrow
        13: $scope.sendCommand      // enter key
      };

      $scope.processKey = function(key) {
        if (key.which in keymap) {
          key.preventDefault();
          keymap[key.which]();
        }
      };
    },
    link: function(scope) {
      
    }
  };
}];
