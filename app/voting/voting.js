define(function () {
    
    function votingController($scope, globalService, $stateParams, $element) {
        $scope.next = $stateParams.next;

        $scope.clicked = false;

        $scope.question = {
            id: 0,
            content: '',
            category: ''
        };

        var successCallback = function (response) {
            $scope.question.id = response.id;
            $scope.question.content = response.content;
            $scope.question.category = response.category;
            $scope.clicked = false;
        }

        var errorCallback = function (error) {
            console.log('Error: ', error);
            console.log('Getting next item');
            $scope.clicked = false;
            globalService.feed(successCallback, errorCallback);
        }

        var vote = function (category) {
            globalService.vote(category, $scope.question.id);
            globalService.feed(successCallback, errorCallback);
        }

        globalService.feed(successCallback, errorCallback);

        if ($scope.next) {
            $element.on('click', function ($event) {
                if (!$scope.clicked) {
                    $scope.clicked = true;
                    globalService.feed(successCallback, errorCallback);
                }
            });
        }

        $scope.onPokemonClick = function ($event) {
            if (!$scope.clicked) {
                $scope.clicked = true;
                vote(0);
            }
        };

        $scope.onBigDataClick = function ($event) {
            if (!$scope.clicked) {
                $scope.clicked = true;
                vote(1);
            }
        };
    }

    votingController.$inject = ['$scope', 'globalService', '$stateParams', '$element'];

    return votingController;
});
