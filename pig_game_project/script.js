'use strict';
const score_element_0 = document.querySelector('#score--0');
const score_element_1 = document.querySelector('#score--1');
const dice_element = document.querySelector('.dice');
const btn_new = document.querySelector('.btn--new');
const btn_roll = document.querySelector('.btn--roll');
const btn_hold = document.querySelector('.btn--hold');
const current_score_element0 = document.querySelector('#current--0');
const current_score_element1 = document.querySelector('#current--1');
const player_element_0 = document.querySelector('.player--0');
const player_element_1 = document.querySelector('.player--1');

let arrya_data = [0, 0];
let current_score_0 = 0;
let active_score = 0;
let active_player = 0;
let checking_previou_dice_value = 0;
score_element_0.textContent = 0;
score_element_1.textContent = 0;
let flag = 0;

const fun_hold = function () {
  if (
    !player_element_0.classList.contains('player--winner') &&
    !player_element_1.classList.contains('player--winner')
  ) {
    if (flag === 1) {
      arrya_data[active_player] = arrya_data[active_player] + current_score_0;
      document.getElementById(`score--${active_player}`).textContent =
        arrya_data[active_player];
      current_score_0 = 0;
      if (active_player === 0) {
        current_score_element0.textContent = current_score_0;
      } else {
        current_score_element1.textContent = current_score_0;
      }
      flag = 0;
    }
    if (arrya_data[active_player] >= 50) {
      if (active_player === 0) {
        player_element_0.classList.add('player--winner');
        dice_element.classList.add('hidden');
      } else {
        player_element_1.classList.add('player--winner');
        dice_element.classList.add('hidden');
      }
    }

    if (active_player == 0) {
      active_player = 1;
      player_element_0.classList.remove('player--active');
      player_element_1.classList.add('player--active');
    } else {
      active_player = 0;
      player_element_1.classList.remove('player--active');
      player_element_0.classList.add('player--active');
    }
  }
};

const fun_roll_the_dice = function () {
  flag = 1;
  const dice = Math.trunc(Math.random() * 6) + 1;
  dice_element.classList.remove('hidden');
  dice_element.src = `dice-${dice}.png`;

  if (
    player_element_0.classList.contains('player--winner') ||
    player_element_1.classList.contains('player--winner')
  ) {
    dice_element.classList.add('hidden');
  } else {
    if (dice !== 1) {
      current_score_0 = current_score_0 + dice;
      document.getElementById(
        `current--${active_player}`
      ).textContent = current_score_0;
    } else {
      document.getElementById(`current--${active_player}`).textContent = 0;
      current_score_0 = 0;

      if (active_player === 0) {
        active_player = 1;
      } else if (active_player === 1) {
        active_player = 0;
      }

      if (active_player != 0) {
        player_element_0.classList.remove('player--active');
        player_element_1.classList.add('player--active');
      } else {
        player_element_1.classList.remove('player--active');
        player_element_0.classList.add('player--active');
      }
    }
  }
};

const resetting_values = function () {
  arrya_data[0] = 0;
  arrya_data[1] = 0;
  current_score_0 = 0;
  current_score_element0.textContent = 0;
  current_score_element1.textContent = 0;
  score_element_0.textContent = 0;
  score_element_1.textContent = 0;
  dice_element.classList.add('hidden');
  if (!player_element_0.classList.contains('player--active')) {
    player_element_0.classList.add('player--active');
  }
  if (player_element_0.classList.contains('player--winner')) {
    player_element_0.classList.remove('player--winner');
  }
  if (player_element_1.classList.contains('player--winner')) {
    player_element_1.classList.remove('player--winner');
  }
  if (player_element_1.classList.contains('player--active')) {
    player_element_1.classList.remove('player--active');
  }
  active_player = 0;
};

dice_element.classList.add('hidden');
btn_roll.addEventListener('click', fun_roll_the_dice);

btn_hold.addEventListener('click', fun_hold);

btn_new.addEventListener('click', resetting_values);
