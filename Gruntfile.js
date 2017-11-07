module.exports = function (grunt) {

    var config = grunt.file.readJSON('app/assets/labels.json');

    var type = (grunt.option('type') || "").toLowerCase();
    type = (['zrada', 'pokemon'].includes(type) ? type: 'pokemon');
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
                            match: 'cat1_query',
                            replacement: labels.categories[0].query
                        },
                        {
                            match: 'cat2_text',
                            replacement: labels.categories[1].text
                        },
                        {
                            match: 'cat2_query',
                            replacement: labels.categories[1].query
                        }
                    ]
                },
                files: [
                    {src: ['app/assets/templates/index.html'], dest: 'app/index.html'},
                    {src: ['app/assets/templates/categories.json'], dest: 'app/assets/categories.json'},
                    {src: ['app/assets/templates/leaderboard.html'], dest: 'app/leaderboard/leaderboard.html'},
                    {src: ['app/assets/templates/voting.html'], dest: 'app/voting/voting.html'}
                ]
            }
        }
    });

    grunt.registerTask('default', 'replace:dist');
};