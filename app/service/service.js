define(function (require) {

    function globalService($http, $location) {

        var firstWordList = JSON.parse(require('text!assets/superb.json'));
        var secondWordList = JSON.parse(require('text!assets/superheroes.json'));
        var categories = JSON.parse(require('text!assets/categories.json'));

        var name = '';

        var localhost = $location.host() + ":" + $location.port();
        var feedUri = "http://" + localhost + "/content/1";
        var leaderboardUri = "http://" + localhost + "/leaderboard/$type$";
        var voteUri = "http://" + localhost + "/vote/$username$/$item_id$/$votedcategory$";


        function get_random_integer(base, bias) {
            return Math.floor(Math.random() * base) + (bias ? bias : 0);
        }

        function generateName() {
            return (firstWordList[get_random_integer(firstWordList.length)] + '_' +
                secondWordList[get_random_integer(secondWordList.length)] + '_' +
                get_random_integer(8999, 1001)).toLowerCase();
        }

        function _getName() {
            while (!name || name.length > 20) {
                name = generateName();
            }
            return name;
        }

        return {
            getName: function () {
                return _getName();
            },

            feed: function (successCallback, errorCallback) {
                $http.get(feedUri, {
                    headers: {
                        "username": _getName()
                    }
                })
                    .then(function (response) {
                            if (response && response.data) {
                                feedUri = response.data.next_uri;
                                successCallback(response.data);
                            }
                        },
                        function (error) {
                            errorCallback(error);
                        }
                    );
            },

            vote: function (categoryId, questionId) {
                var url = voteUri.replace('$username$', _getName())
                    .replace('$item_id$', questionId)
                    .replace('$votedcategory$', encodeURIComponent(categories[categoryId]));
                $http.put(url, {}).then(
                    function (response) {
                        console.log('Vote successful. ' + _getName() + " voted for " + categories[categoryId], response);
                    },
                    function (error) {
                        console.log('Vote failed. ' + _getName() + " voted for " + categories[categoryId], error);
                    }
                );
            },

            leaderboard: function (type, successCallback, errorCallback) {
                $http.get(leaderboardUri.replace('$type$', encodeURIComponent(type)), {})
                    .then(function (response) {
                            successCallback(response);
                        },
                        function (error) {
                            errorCallback(error);
                        }
                    );
            }
        }
    }

    globalService.$inject = ['$http', '$location'];

    return globalService;
});