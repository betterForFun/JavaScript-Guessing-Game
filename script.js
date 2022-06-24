'use strict';

let click = document.querySelectorAll('.show-modal');
let shotModel = document.querySelector('.modal');
let overLay = document.querySelector('.overlay');
let close = document.querySelector('.close-modal');

for (let x = 0; x < click.length; x++) {
  click[x].addEventListener('click', function () {
    shotModel.classList.remove('hidden');
    overLay.classList.remove('hidden');
  });
}

close.addEventListener('click', function () {
  shotModel.classList.add('hidden');
  overLay.classList.add('hidden');
});

document.addEventListener('keydown', function (e) {
  if (e.key == 'Escape') {
    shotModel.classList.add('hidden');
    overLay.classList.add('hidden');
  }
});
