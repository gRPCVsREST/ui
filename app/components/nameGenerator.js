define(function() {
    function nameGenerator(globalService) {
        return function(scope, elm) {
            elm.text(globalService.getName());
        };
    }

    nameGenerator.$inject = ['globalService'];

    return nameGenerator;
});