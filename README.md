catchem-all!

Small script module simulating movement in an infinite grid as if you were Ash from pokemon... each cell contains a pokemon and if ash moves onto a cell he catches the pokemon, previously visited cells yield no pokemon, the starting cell yields a pokemon, yay free pokemon!

You must have node installed on your system:

https://nodejs.org/en/

First, clone this repo into any folder.

Then, open command line in the cloned folder and run:
**npm install**

You can run tests by running:
**npm test**

You can run the script by running:
**node start STRING**

The values for STRING can only be upper case letters N, S, E or O

**Usage examples:**

To move ash north 4 times and catch 5 pokemon then east 4 times to catch 4 more for a total of 9 pokemon run:

**node start "NNNNEEEE"** 
or
**node start NNNNEEEE**

the output should be:

*✓ Ash caught 9 pokemon.*

To simulate an error, try providing an illegal string, for example:
**node start "NO_POKEMONS"** 
or 
**node start NO_POKEMONS**

the output should be:

*☓ Ash couldn't catch any pokemon, probably some error occurred! Make sure to pr ovide a correct direction string. Can only include N, S, O or E characters, case sensitive.*

You can ommit the direction to make ash stand still by running:
**node start**
since the starting cell gives ash a pokemon, the output should be:

*✓ Ash caught 1 pokemon.*

Please beware, if you run:
**node start NN OO**
ash will only move north twice and the output will be:

*✓ Ash caught 3 pokemon.*


*this is because node treats the arguments as separate when there's a space between them, to try out a space, encapsulate in quotes like so:*

**node start "NN OO"**
 which will output an error, because space is illegal:
 
*☓ Ash couldn't catch any pokemon, probably some error occurred! Make sure to pr ovide a correct direction string. Can only include N, S, O or E characters, case sensitive.*

I believe that's it! 

Thanks
