var fs = require('fs');

var htmlTemplate =
    "<!DOCTYPE html>\n\
<html>\n\
<head>\n\
    <title></title>\n\
</head>\n\
<body>\n\
\n\
</body>\n\
</html>";

var serverJsTemplate =
    "var http = require('http');\nvar fs = require('fs');";

var logStatus = function (err, file_name, callback) {
    if (err) {
        console.log(file_name + ': ERROR');
        console.log(err);
    } else {
        console.log(file_name + ': DONE');
        if (callback) {
            callback();
        }
    }
};

var cleanup = function() {
    var cleanDirSync = function(dirName) {
        if (fs.existsSync(dirName)) {
            fs.rmdirSync(dirName);
            console.log(dirName + '/: REMOVED');
        }
    };

    var cleanFileSync = function(fileName) {
        if (fs.existsSync(fileName)) {
            fs.unlinkSync(fileName);
            console.log(fileName + ': REMOVED')
        }
    };

    cleanDirSync('lib');
    cleanFileSync('server.js');

    if (fs.existsSync('public')) {
        cleanDirSync('public/javascripts');
        cleanFileSync('public/index.html');

        if (fs.existsSync('public/css')) {
            cleanFileSync('public/css/style.css');
            cleanDirSync('public/css');
        }

        cleanDirSync('public');
    }
};

function createNewProject() {
    fs.mkdir("lib", function (err) {
        logStatus(err, 'lib/');
    });

    fs.writeFile('server.js', serverJsTemplate, function (err) {
        logStatus(err, 'server.js');
    });

    fs.mkdir("public", function (err) {
        logStatus(err, 'public/', function () {
            fs.writeFile('public/index.html', htmlTemplate, function (err) {
                logStatus(err, 'public/index.html');
            });

            fs.mkdir("public/javascripts", function (err) {
                logStatus(err, 'public/javascripts/');
            });

            fs.mkdir("public/css", function (err) {
                logStatus(err, 'public/css/', function () {
                    fs.open('public/css/style.css', 'w', function (err) {
                        logStatus(err, 'public/css/style.css');
                    });
                });
            });

        });
    });
}

if (process.argv[2] === '-clean') {
    cleanup();
} else {
    var newCurrentDir = process.argv[2];

    if (newCurrentDir) {
        process.chdir(newCurrentDir);
    }

    createNewProject();
}
