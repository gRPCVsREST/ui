define(function () {
    function leaderBoardController($scope, globalService, $timeout) {
        var pokemon = 0;
        var bigData = 1;
        var interval = 5000;

        $scope.pokemons = {
            total: 0,
            lines: []
        };

        $scope.bigdatas = {
            total: 0,
            lines: []
        };

        $scope.promises = {};

        var successPokemonCallback = function (response) {
            response.data.lines.splice(5);
            $scope.pokemons = response.data;

            $scope.promises.pokemon = $timeout(function () {
                globalService.leaderboard(pokemon, successPokemonCallback, errorCallback);
            }, interval);
        }

        var successBigDataCallback = function (response) {
            response.data.lines.splice(5);
            $scope.bigdatas = response.data;
            $scope.promises.bigdata = $timeout(function () {
                globalService.leaderboard(bigData, successBigDataCallback, errorCallback);
            }, interval);

        }

        var errorCallback = function (error) {
            console.log('Error: ', error);
        }

        globalService.leaderboard(pokemon, successPokemonCallback, errorCallback);
        globalService.leaderboard(bigData, successBigDataCallback, errorCallback);

        $scope.$on("$destroy", function () {
            if ($scope.promises.pokemon) {
                $timeout.cancel($scope.promises.pokemon);
            }

            if ($scope.promises.bigdata) {
                $timeout.cancel($scope.promises.bigdata);
            }
        });
    }

    leaderBoardController.$inject = ['$scope', 'globalService', '$timeout'];

    return leaderBoardController;
});
