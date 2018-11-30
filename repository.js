(function () {
    var repo = 'angular/angular';
    var baseUrl = 'https://api.github.com/repos/';
    var nextUrl = null;
    var token = null;

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });

    function init() {
        document.getElementById('title').innerText = repo;

        loadToken().then(loadCommits);

        window.addEventListener('scroll', function () {
            if (nextUrl && (window.scrollY + window.innerHeight) >= document.body.offsetHeight) {
                loadCommits(nextUrl);
                document.getElementById('scrollTop').style.display = 'block';
            }
        })

        document.getElementById('scrollTop').addEventListener('click', function () {
            window.scrollTo(0, 0);
        });

    }

    function loadToken() {
        return fetch('token.json')
            .then(function (response) {
                return response.json();
            }).then(function (json) {
                token = json;
            });
    }

    function loadCommits(url) {
        url = url || baseUrl + repo + '/commits';
        toggleElement('loading', true);
        var headers = new Headers();
        headers.append('Authorization', 'token ' + token);
        return fetch(url, { headers: headers })
            .then(function (response) {
                var link = response.headers.get('Link');
                if (link && link.indexOf('rel="next"') != -1) {
                    var url = link.split(';')[0];
                    nextUrl = url.substring(1, url.length - 1);
                } else {
                    nextUrl = null;
                }
                console.log(link);
                return response.json();
            })
            .then(function (commits) {
                toggleElement('loading', false);
                var html = '';
                commits.forEach(function (commit) {
                    html += '<li> <span class="sha">' + commit.sha.substring(0, 7) + '</span> - ' +
                        commit.commit.message + '</li>';
                });
                html += '';
                document.getElementById('commits').innerHTML += html;

            });
    }

    function toggleElement(id, toggle) {
        var element = document.getElementById(id);
        element.style.display = toggle ? 'block' : 'none';
    }

})();