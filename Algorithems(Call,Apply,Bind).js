/* 
Write a function called specialMultiply which accepts two parameters. If the function is passed both parameters, it should return the product of the two. If the function is only passed one parameter - it should return a function which can later be passed another parameter to return the product. You will have to use closure and arguments to solve this.

Examples: 

    specialMultiply(3,4); // 12
    specialMultiply(3)(4); // 12
    specialMultiply(3); // function(){}....
*/

function specialMultiply(a,b){
    var first = a * b;
    if(!b){
     return function(b){
      return a * b; 
    };
  }
  return first;
}

/* 
Write a function called guessingGame which takes in one parameter amount. The function should return another function that takes in a parameter called guess. In the outer function, you should create a variable called answer which is the result of a random number between 0 and 10 as well as a variable called guesses which should be set to 0.

In the inner function, if the guess passed in is the same as the random number (defined in the outer function) - you should return the string "You got it!". If the guess is too high return "Your guess is too high!" and if it is too low, return "Your guess is too low!". You should stop the user from guessing if the amount of guesses they have made is greater than the initial amount passed to the outer function.

You will have to make use of closure to solve this problem.

Examples (yours might not be like this, since the answer is random every time):

    var game = guessingGame(5)
    game(1) // "You're too low!"
    game(8) // "You're too high!"
    game(5) // "You're too low!"
    game(7) // "You got it!"
    game(1) // "You are all done playing!"

    var game2 = guessingGame(3)
    game2(5) // "You're too low!"
    game2(3) // "You're too low!"
    game2(1) // "No more guesses the answer was 0"
    game2(1) // "You are all done playing!"
*/

function guessingGame(amount){
      var randomNumber = Math.floor(Math.random() * Math.floor(amount));
     var count = 0;
     var completed = false;
  
     return function(number) {
       if(!completed){
          count++;
            if(number === amount) {
                completed = true;
                return "You got it!";
            }
            else if(number === amount) {
                completed = true;
                return "No more guesses the answer was " + answer;
            }
            else if(number > amount) return "Your guess is too high!";
            else if(number < amount) return "Your guess is too low!";
        }
        return "You are all done playing!";
       };
}

/*
Write a function called arrayFrom which converts an array-like-object into an array.

Examples:
    var divs = document.getElementsByTagName('divs');
    divs.reduce // undefined
    var converted = arrayFrom(divs);
    converted.reduce // function(){}....
*/

function arrayFrom(arrayLikeObject){
    return [].slice.call(arrayLikeObject);
  }
  
  /* 
  // Write a function called sumEvenArguments which takes all of the arguments passed to a function and returns the sum of the even ones.
  
  Examples:
      sumEvenArguments(1,2,3,4) // 6
      sumEvenArguments(1,2,6) // 8
      sumEvenArguments(1,2) // 2
  */
  
  function sumEvenArguments(){
       var allarguments = [].slice.call(arguments);
       var newArr = [];  
       
       allarguments.forEach(function(val){
          val % 2 ? newArr : newArr.push(val);
       });
       
      return newArr.reduce(function(a, b){
          return a + b;
      });
  }
  
  /* 
  Write a function called invokeMax which accepts a function and a maximum amount. invokeMax should return a function that when called increments a counter. If the counter is greater than the maximum amount, the inner function should return "Maxed Out"
  
  Examples:
  
      function add(a,b){
          return a+b
      }
  
      var addOnlyThreeTimes = invokeMax(add,3);
      addOnlyThreeTimes(1,2) // 3
      addOnlyThreeTimes(2,2) // 4
      addOnlyThreeTimes(1,2) // 3
      addOnlyThreeTimes(1,2) // "Maxed Out!"
  
  */
  
  function invokeMax(fn, num){
      var count = 0;
      return function(){
          if(num === count){
            return "Maxed Out!"; 
          }
          count++;
          return fn.apply(this,arguments); 
         
      };
  }
  
  /* 
  Write a function called once which accepts two parameters, a function and a value for the keyword 'this'. Once should return a new function that can only be invoked once, with the value of the keyword this in the function set to be the second parameter.
  
  Examples:
  
      function add(a,b){
          return a+b
      }
  
      var addOnce = once(add, this);
      addOnce(2,2) // 4
      addOnce(2,2) // undefined
      addOnce(2,2) // undefined
      
      function doMath(a,b,c){
          return this.firstName + " adds " + (a+b+c)
      }
      
      var instructor = {firstName: "Elie"}
      var doMathOnce = once(doMath, instructor);
      doMathOnce(1,2,3) // "Elie adds 6"
      doMathOnce(1,2,3) // undefined
      
  
  */
  
  function once(fn, thisArg){
      var count = 0;
      return function(){
          if(count === 1){
            return undefined; 
          }
          count++;
          return fn.apply(thisArg, arguments); 
         
      };
  }
  
  // BONUSES! 
  
  /* 
  Write a function called bind which accepts a function and a value for the keyword this. Bind should return a new function that when invoked, will invoke the function passed to bind with the correct value of the keyword this. HINT - if you pass more than two parameters to bind, those parameters should be included as parameters to the inner function when it is invoked. You will have to make use of closure!
  
  Examples:
  
      function firstNameFavoriteColor(favoriteColor){
          return this.firstName + "'s favorite color is " + favoriteColor
      }
      
      var person = {
          firstName: 'Elie'
      }
      
      var bindFn = bind(firstNameFavoriteColor, person);
      bindFn('green') // "Elie's favorite color is green"
      
      var bindFn2 = bind(firstNameFavoriteColor, person, 'blue');
      bindFn2('green') // "Elie's favorite color is blue" 
      
      function addFourNumbers(a,b,c,d){
          return a+b+c+d;
      }
  
      bind(addFourNumbers,this,1)(2,3,4) // 10
      bind(addFourNumbers,this,1,2)(3,4) // 10
      bind(addFourNumbers,this,1,2,3)(4) // 10
      bind(addFourNumbers,this,1,2,3,4)() // 10
      bind(addFourNumbers,this)(1,2,3,4) // 10
      bind(addFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // 10
  
  */
  
    function bind(fn, thisArg){
        var outerArguments = [].slice.call(arguments,2);
        return function(){
              var innerArguments = [].slice.call(arguments);
            var allArguments = outerArguments.concat(innerArguments);
            return fn.apply(thisArg,allArguments);
        };
      }
  
  /* 
  Write a function called flip which accepts a function and a value for the keyword this. Flip should return a new function that when invoked, will invoke the function passed to flip with the correct value of the keyword this and all of the arguments passed to the function REVERSED. HINT - if you pass more than two parameters to flip, those parameters should be included as parameters to the inner function when it is invoked. You will have to make use of closure! 
  
  Examples:
  
      function personSubtract(a,b,c){
          return this.firstName + " subtracts " + (a-b-c);
      }
      
      var person = {
          firstName: 'Elie'
      }
      
      var flipFn = flip(personSubtract, person);
      flipFn(3,2,1) // "Elie subtracts -4"
      
      var flipFn2 = flip(personSubtract, person, 5,6);
      flipFn2(7,8). // "Elie subtracts -4"
      
      function subtractFourNumbers(a,b,c,d){
          return a-b-c-d;
      }
  
      flip(subtractFourNumbers,this,1)(2,3,4) // -2
      flip(subtractFourNumbers,this,1,2)(3,4) // -2
      flip(subtractFourNumbers,this,1,2,3)(4) // -2
      flip(subtractFourNumbers,this,1,2,3,4)() // -2
      flip(subtractFourNumbers,this)(1,2,3,4) // -2
      flip(subtractFourNumbers,this,1,2,3)(4,5,6,7) // -2
      flip(subtractFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // -2
      flip(subtractFourNumbers,this,11,12,13,14,15)(1,2,3,4,5,6,7,8,9,10) // -22
  
  */
  
  
  function flip(fn, thisArg){
      var outerArgs = [].slice.call(arguments,2)
      return function(){
          var innerArgs = [].slice.call(arguments)
          var allArgs = outerArgs.concat(innerArgs).slice(0, fn.length)
          return fn.apply(thisArg, allArgs.reverse())
      }
  }
  