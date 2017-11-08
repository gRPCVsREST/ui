module.exports = function (grunt) {

    var config = grunt.file.readJSON('app/assets/labels.json');

    var type = (grunt.option('type') || "").toLowerCase();
    type = (type == 'zrada' || type == 'pokemon'? type: 'pokemon');
    var labels = config[type];
    console.log(type, labels);

    grunt.loadNpmTasks('grunt-replace');

    grunt.initConfig({
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'title',
                            replacement: labels.title
                        },
                        {
                            match: 'greeting',
                            replacement: labels.greeting
                        },
                        {
                            match: 'cat1_text',
                            replacement: labels.categories[0].text
                        },
                        {
                            match: 'cat1_vote',
                            replacement: labels.categories[0].vote
                        },
                        {
                            match: 'cat1_leaderboard',
                            replacement: labels.categories[0].leaderboard
                        },
                        {
                            match: 'cat2_text',
                            replacement: labels.categories[1].text
                        },
                        {
                            match: 'cat2_vote',
                            replacement: labels.categories[1].vote
                        },
                        {
                            match: 'cat2_leaderboard',
                            replacement: labels.categories[1].leaderboard
                        }
                    ]
                },
                files: [
                    {src: ['app/templates/index.html'], dest: 'app/index.html'},
                    {src: ['app/templates/categories.json'], dest: 'app/assets/categories.json'},
                    {src: ['app/templates/leaderboard.html'], dest: 'app/leaderboard/leaderboard.html'},
                    {src: ['app/templates/voting.html'], dest: 'app/voting/voting.html'}
                ]
            }
        }
    });

    grunt.registerTask('default', 'replace:dist');
};