Here's an example of a simple restaurant reservation system for websites, written in JavaScript. This system includes a `Restaurant` class that defines the properties and behaviors of a restaurant, as well as a `Reservation` class that defines the properties and behaviors of a reservation. It also includes a `ReservationSystem` class that provides a simple interface for interacting with the system.

`restaurant.js`:
```javascript
class Restaurant {
  constructor(name, capacity) {
    this.name = name;
    this.capacity = capacity;
    this.reservations = [];
  }

  addReservation(reservation) {
    this.reservations.push(reservation);
  }

  removeReservation(reservation) {
    const index = this.reservations.indexOf(reservation);
    if (index > -1) {
      this.reservations.splice(index, 1);
    }
  }

  getReservations() {
    return this.reservations;
  }
}

class Reservation {
  constructor(name, numPeople, time) {
    this.name = name;
    this.numPeople = numPeople;
    this.time = time;
  }

  toString() {
    return `Reservation for ${this.name} at ${this.time} for ${this.numPeople} people`;
  }
}

class ReservationSystem {
  constructor(restaurant) {
    this.restaurant = restaurant;
  }

  displayMenu() {
    console.log('Welcome to the Restaurant Reservation System!');
    console.log('---------------------------------------------------');
    console.log('1. Make a reservation');
    console.log('2. Cancel a reservation');
    console.log('3. View all reservations');
    console.log('4. Quit');
  }

  getInput() {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      readline.question('Enter your choice (1-4): ', (choice) => {
        readline.close();
        if (isNaN(parseInt(choice, 10))) {
          console.log('Invalid input. Please enter a number between 1 and 4.');
          resolve(null);
        } else {
          resolve(parseInt(choice, 10));
        }
      });
    });
  }

  makeReservation() {
    console.log('Make a Reservation');
    console.log('------------------');
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      readline.question('Enter your name: ', (name) => {
        readline.question('Enter the number of people in your party: ', (numPeople) => {
          readline.question('Enter the time of your reservation (e.g. 6:30 PM): ', (time) => {
            readline.close();
            const reservation = new Reservation(name, parseInt(numPeople, 10), time);
            this.restaurant.addReservation(reservation);
            console.log('Reservation made!');
            resolve();
          });
        });
      });
    });
  }

  cancelReservation() {
    console.log('Cancel a Reservation');
    console.log('--------------------');
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      readline.question('Enter your name: ', (name) => {
        readline.close();
        let found = false;
        for (let i = 0; i < this.restaurant.reservations.length; i++) {
          const reservation = this.restaurant.reservations[i];
          if (reservation.name === name) {
            this.restaurant.removeReservation(reservation);
            console.log('Reservation cancelled.');
            found = true;
            break;
          }
        }
        if (!found) {
          console.log('No reservation found for that name.');
        }
        resolve();
      });
    });
  }

  viewReservations() {
    console.log('All Reservations');
    console.log('----------------');
    for (let i = 0; i < this.restaurant.reservations.length; i++) {
      console.log(this.restaurant.reservations[i].toString());
    }
  }

  run() {
    while (true) {
      this.displayMenu();
      this.getInput().then((choice) => {
        if (choice
```
