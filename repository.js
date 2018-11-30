(function () {
    var repo = 'agea/js-course';
    var baseUrl = 'https://api.github.com/repos/';

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });

    function init() {
        document.getElementById('title').innerText = repo;
        fetch(baseUrl + repo + '/commits').then(function (response) {
            console.log(response);
        });
    }

})();