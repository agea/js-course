(function () {
    var repo = 'agea/js-course';
    var baseUrl = 'https://api.github.com/repos/';

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });

    function init() {
        document.getElementById('title').innerText = repo;
        loadCommits();
    }

    function loadCommits() {
        toggleElement('loading', true);
        return fetch(baseUrl + repo + '/commits')
            .then(function (response) {
                return response.json()
            })
            .then(function (commits) {
                toggleElement('loading', false);
                var commitsElement = document.getElementById('commits');
                var html = '<ul>';

                commits.forEach(function (commit) {
                    html += '<li> <span class="sha">' + commit.sha.substring(0, 7) + '</span> - ' +
                        commit.commit.message + '</li>';
                });

                html += '</ul>';
                commitsElement.innerHTML = html;

            });
    }

    function toggleElement(id, toggle) {
        var element = document.getElementById(id);
        element.style.display = toggle ? 'block' : 'none';
    }

})();