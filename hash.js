const bcrypt = require('bcrypt');

async function run(){
const salt = await bcrypt.genSalt(10)  // 10 stand for number of rounds we want to generate the algoritham.
const hashed = await bcrypt.hash('1234',salt) // salt generate the random string before and  after the hash password..
console.log(manoj)
console.log(manoj1);
}
run();   