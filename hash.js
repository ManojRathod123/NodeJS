const bcrypt = require('bcrypt');

async function run(){
const salt = await bcrypt.genSalt(10)  // 10 stand for number of rounds we want to generate the algoritham.
const hashed = await bcrypt.hash('1234',salt)
console.log(manoj)
console.log(manoj1);
}
run();   