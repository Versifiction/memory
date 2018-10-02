var app = {
  init: function() {
    $('#start-button').on('click', app.startGame);
    app.buildHTML();
    $('#restart-button').on('click', app.restartGame);
  },
  buildHTML: function() {
    var cardsArray = [
      {
        'name': 'aquaman',
        'img': 'aquaman.png',
      },
      {
        'name': 'batman',
        'img': 'batman.png',
      },
      {
        'name': 'captainamerica',
        'img': 'captainamerica.png',
      },
      {
        'name': 'deadpool',
        'img': 'deadpool.png',
      },
      {
        'name': 'flash',
        'img': 'flash.png',
      },
      {
        'name': 'greenlantern',
        'img': 'greenlantern.png',
      },
      {
        'name': 'ironman',
        'img': 'ironman.png',
      },
      {
        'name': 'spiderman',
        'img': 'spiderman.png',
      },
      {
        'name': 'ironfist',
        'img': 'ironfist.png',
      },
      {
        'name': 'thepunisher',
        'img': 'thepunisher.png',
      },
      {
        'name': 'wonderwoman',
        'img': 'wonderwoman.png',
      },
      {
        'name': 'xman',
        'img': 'xman.png',
      },
    ];

    var gameGrid = cardsArray.concat(cardsArray).sort(function () {
      return 0.5 - Math.random();
    });

    var firstGuess = '';
    var secondGuess = '';
    var count = 0;
    var pairFound = 0;
    var previousTarget = null;
    var delay = 1200;

    var game = document.getElementById('game');
    var grid = document.createElement('section');
    grid.setAttribute('class', 'grid');
    game.appendChild(grid);

    gameGrid.forEach(function (item) {
      var name = item.name,
          img = item.img;


      var card = document.createElement('div');
      card.classList.add('card');
      card.dataset.name = name;

      var front = document.createElement('div');
      front.classList.add('front');

      var back = document.createElement('div');
      back.classList.add('back');
      back.style.backgroundImage = 'url(' + img + ')';

      grid.appendChild(card);
      card.appendChild(front);
      card.appendChild(back);
    });

    var match = function match() {
      var selected = document.querySelectorAll('.selected');
      selected.forEach(function (card) {
        card.classList.add('match');
      });
    };

    var resetGuesses = function resetGuesses() {
      firstGuess = '';
      secondGuess = '';
      count = 0;
      previousTarget = null;

      var selected = document.querySelectorAll('.selected');
      selected.forEach(function (card) {
        card.classList.remove('selected');
      });
    };

    grid.addEventListener('click', function (event) {

      var clicked = event.target;

      if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
        return;
      }

      if (count < 2) {
        count++;
        if (count === 1) {
          firstGuess = clicked.parentNode.dataset.name;
          clicked.parentNode.classList.add('selected');
        } else {
          secondGuess = clicked.parentNode.dataset.name;
          clicked.parentNode.classList.add('selected');
        }

        if (firstGuess && secondGuess) {
          if (firstGuess === secondGuess) {
            setTimeout(match, delay);
            pairFound++;
          }
          setTimeout(resetGuesses, delay);
        }
        previousTarget = clicked;
      }

      if (pairFound === 12) {
        setTimeout(function() {
          $('#myModal').show();
        }, 1000);
      }
    });
  },
  startGame: function(evt) {
    var clicked = event.target;
    if (clicked.parentNode.classList.contains('card')) {
      return;
    }
    $('#start-button').hide();
    $('.card').css("opacity", "1");
  },
  restartGame: function(evt) {
    window.location.reload();
    app.startGame();
  }
};

document.addEventListener('DOMContentLoaded', app.init);
