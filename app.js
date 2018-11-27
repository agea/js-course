(function () {

    var symbol;

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });

    function init() {
        symbol = 'X';
        var cells = document.getElementsByTagName('td');
        for (var i = 0; i < cells.length; i++) {
            cells[i].classList.remove('clicked');
            cells[i].innerText = '';
            cells[i].addEventListener('click', click);
        }
        document.getElementById('victory').innerHTML = '';
    }

    function click() {
        this.innerText = symbol;
        this.classList.add('clicked');
        this.removeEventListener('click', click);
        if (checkVictory()) {
            document.getElementById('victory').innerHTML = '<h1>' +
                symbol + ' wins! <button id="play-again">Play again</button></h1>';
            document.getElementById('play-again').addEventListener('click', init);
            var cells = document.getElementsByTagName('td');
            for (var i = 0; i < cells.length; i++) {
                cells[i].removeEventListener('click', click);
            }
        }
        symbol = symbol == 'X' ? 'O' : 'X';
    }


    function checkVictory() {

        function checkRow(i) {
            var txt = '';
            for (var j = 0; j < 3; j++) {
                txt += document.getElementById('cell-' + i + '-' + j).innerText;
            }
            return txt === 'XXX' || txt === 'OOO';
        }
        function checkColumn(i) {
            var txt = '';
            for (var j = 0; j < 3; j++) {
                txt += document.getElementById('cell-' + j + '-' + i).innerText;
            }
            return txt === 'XXX' || txt === 'OOO';
        }
        function checkDiag1() {
            var txt = '';
            for (var j = 0; j < 3; j++) {
                txt += document.getElementById('cell-' + j + '-' + j).innerText;
            }
            return txt === 'XXX' || txt === 'OOO';
        }
        function checkDiag2() {
            var txt = '';
            for (var j = 0; j < 3; j++) {
                txt += document.getElementById('cell-' + j + '-' + (2 - j)).innerText;
            }
            return txt === 'XXX' || txt === 'OOO';
        }

        var victory = checkDiag1() || checkDiag2();
        for (var i = 0; i < 3; i++) {
            victory = victory || checkRow(i) || checkColumn(i);
        }
        return victory;
    }

})();

