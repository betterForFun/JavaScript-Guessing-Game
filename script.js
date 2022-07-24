'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let curAcc;
let sorted = false;

const displayMove = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const mov = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  mov.forEach(function (value, index) {
    const type = value > 0 ? 'deposit' : 'withdrawal';

    const html = `        
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      index + 1
    }${type}</div>
    <div class="movements__value">${value}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMove(account1.movements);

const user = 'Stevan Thomas Williams';

const createUserName = function (accountList) {
  accountList.forEach(function (acc) {
    const userName = acc.owner.toLowerCase().split(' ');
    const userId = userName.map(name => name[0]).join('');
    acc.userId = userId;
    console.log(acc);
  });
};

console.log(createUserName(accounts));

const calDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, cur) {
    return acc + cur;
  }, 0);
  labelBalance.textContent = `${acc.balance}€`;
};
// calDisplayBalance(account1.movements);

const displaySummary = function (acc) {
  const moneyIn = acc.movements
    .filter(cur => cur > 0)
    .reduce((acc, cur) => acc + cur, 0);
  const moneyOut =
    acc.movements.filter(cur => cur < 0).reduce((acc, cur) => acc + cur, 0) *
    -1;
  const interest = acc.movements
    .filter(cur => cur > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumIn.textContent = `${moneyIn}€`;
  labelSumOut.textContent = `${moneyOut}€`;
  labelSumInterest.textContent = `${interest}€`;
};
// displaySummary(account1.movements);

const logIn = function (id, pin) {
  const result = accounts.find(acc => acc.userId === id && acc.pin === pin);
  if (result) {
    curAcc = result;
    labelWelcome.textContent = `Welcome back ${result.owner}`;
    containerApp.style.opacity = 100;
    updateUI(result, sorted);
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
  } else {
    alert('No such User');
  }
};

const transfer = function (from, to, amount) {
  if (amount > from.balance || to?.userId === from.userId || !to) {
    alert('Invalid Transfer !');
  } else {
    from.movements.push(-amount);
    to.movements.push(amount);
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();
    logIn(from.userId, from.pin);
  }
};

const updateUI = function (acc, sort) {
  displayMove(acc, sort);
  calDisplayBalance(acc);
  displaySummary(acc);
};

const closeAcc = function (acc, pin) {
  if (!acc || curAcc.pin !== pin || acc !== curAcc.userId) {
    alert('Invalid Information!');
  } else {
    const index = accounts.findIndex(acc => acc.userId === curAcc.userId);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    inputClosePin.value = inputCloseUsername.value = '';
    labelWelcome.textContent = `Log in to get started`;
  }
};

const loanRequest = function (amount) {
  const granted = curAcc.movements.some(move => move >= 0.1 * amount);
  if (granted && amount > 0) {
    curAcc.movements.push(amount);
    updateUI(curAcc, sorted);
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
  } else {
    console.log(`Not ellegible for this loan`);
  }
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  logIn(inputLoginUsername.value, Number(inputLoginPin.value));
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  transfer(
    curAcc,
    accounts.find(acc => acc.userId === inputTransferTo.value),
    Number(inputTransferAmount.value)
  );
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  closeAcc(inputCloseUsername.value, Number(inputClosePin.value));
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  loanRequest(Number(inputLoanAmount.value));
});

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  updateUI(curAcc, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;
const movementUsd = movements.map(value => value * eurToUsd);

const filted = movements.filter(move => move > 0);
console.log(`filted movements ${filted}`);

const withdrwal = movements.filter(move => move < 0);
console.log(withdrwal);

//acc stands for accumulator and the second parameter in reduce functio stands fot the initial value of accumulator
const amountSum = movements.reduce(function (acc, cur) {
  return acc + cur;
}, 0);
console.log(amountSum);

// console.log(movements);
// console.log(movementUsd);

// for (const move of movements) {
//   if (move > 0) {
//     console.log(`You deposited ${move}`);
//   } else {
//     console.log(`You withdrew ${-move}`);
//   }
// }

// currencies.forEach(function (value, key, arr) {
//   console.log(`currency ${value} Code: ${key}`);
// });

// const currency = new Set(['USD', 'GBP', 'EUR']);

// currency.forEach(function (value, key, arr) {
//   console.log(`currency ${value} Code: ${key}`);
// });
/////////////////////////////////////////////////

// const test = ['a', 'b', 'c', 'd', 'e'];
// const test2 = ['f', 'g', 'h', 'i', 'j'];

// console.log(test.slice(1, 3));
// console.log(test + test2);
// console.log(test.join('-'));

//Challenge 1
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages
// ('dogsJulia' and 'dogsKate'), and does the following things:
// 1. Julia found out that the owners of the first and the last two dogs actually have
// cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
// ages from that copied array (because it's a bad practice to mutate function
// parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
// is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
// ? ")
// 4. Run the function for both test datasets

const checkDogs = function (l1, l2) {
  let newJulia = l1;
  newJulia = newJulia.slice(1, -2);
  let final = newJulia.concat(l2);
  console.log(final);

  final.forEach(function (value, index) {
    if (value >= 3) {
      console.log(`Dog number ${index} is an adult, and is ${value} years old`);
    } else {
      console.log(
        `Dog number ${index} is still a puppy, and is ${value} years old`
      );
    }
  });
};

console.log(
  movements.reduce(function (acc, move) {
    if (move < acc) {
      return acc;
    } else {
      return move;
    }
  }, movements[0])
);

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// Your tasks:
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
// ages ('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula: if the dog is
// <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
// humanAge = 16 + dogAge * 4
// 2. Exclude all dogs that are less than 18 human years old (which is the same as
// keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know
// from other challenges how we calculate averages ?)
// 4. Run the function for both test datasets
// let Data1 = [5, 2, 4, 1, 15, 8, 3];
// let Data2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = ages =>
//   ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

// movements.sort((a, b) => a - b);
// movements.sort((a, b) => b - a);
// console.log(movements);

// console.log(calcAverageHumanAge(Data1));
// console.log(calcAverageHumanAge(Data2));

// const account = accounts.find(acc => acc.userId === 'jd');
// console.log(account);

// const totalUSD = movements
//   .filter(cur => cur > 0)
//   .map(eur => eur * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalUSD);

// const test = Array.from({ length: 5 }, () => 1);
// console.log(test);
// const test2 = Array.from({ length: 7 }, (_, index) => index + 1);
// console.log(test2);

// const random = Math.trunc(Math.random() * 6 + 1);
// const test3 = Array.from({ length: 10 }, () =>
//   Math.trunc(Math.random() * 6 + 1)
// );

// const bankDeposits = accounts.map(user => user.movements);
// console.log(bankDeposits.flat());

// Coding Challenge #4
// Julia and Kate are still studying dogs, and this time they are studying if dogs are
// eating too much or too little.
// Eating too much means the dog's current food portion is larger than the
// recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10%
// above and 10% below the recommended portion (see hint).
// Your tasks:
// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
// the recommended food portion and add it to the object as a new property. Do
// not create a new array, simply loop over the array. Forumla:
// recommendedFood = weight ** 0.75 * 28. (The result is in grams of
// food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too
// little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
// the owners array, and so this one is a bit tricky (on purpose) ?
// 3. Create an array containing all owners of dogs who eat too much
// ('ownersEatTooMuch') and an array with all owners of dogs who eat too little
// ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and
// Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
// too little!"
// 5. Log to the console whether there is any dog eating exactly the amount of food
// that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an okay amount of food
// (just true or false)
// 7. Create an array containing the dogs that are eating an okay amount of food (try
// to reuse the condition used in 6.)
// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food
// portion in an ascending order (keep in mind that the portions are inside the
// array's objects ?)

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(function (obj) {
  obj.recommendedFood = obj.weight ** 0.75 * 28;
});

console.log(dogs);

const SarahDog = dogs.filter(obj => obj.owners.includes('Sarah'))[0];
if (SarahDog.curFood > 1.1 * SarahDog.recommendedFood) {
  console.log(`Sarah's dog is eating too much`);
} else if (SarahDog.curFood < 0.9 * SarahDog.recommendedFood) {
  console.log(`Sarah's dog is eating too little`);
} else {
  console.log(`Sarah's dog is on a great diet`);
}

const ownersEatTooMuch = dogs
  .filter(obj => obj.curFood > 1.1 * obj.recommendedFood)
  .flatMap(cur => cur.owners);
const ownersEatTooLittle = dogs
  .filter(obj => obj.curFood < 0.9 * obj.recommendedFood)
  .flatMap(cur => cur.owners);

console.log(`${ownersEatTooLittle.join(' and ')}'s dog eat too little`);
console.log(`${ownersEatTooMuch.join(' and ')}'s dog eat too much`);

if (dogs.filter(obj => obj.curFood === obj.recommendedFood).length > 0) {
  console.log(true);
} else {
  console.log(false);
}

const checkOkay = dogs.filter(
  obj =>
    obj.curFood <= 1.1 * obj.recommendedFood &&
    obj.curFood >= 0.9 * obj.recommendedFood
);
if (checkOkay.length > 0) {
  console.log(true);
  console.log(checkOkay);
} else {
  console.log(false);
}

const dogsCopy = dogs;

dogsCopy.sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsCopy);
