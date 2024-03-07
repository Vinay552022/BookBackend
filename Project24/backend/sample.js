const bcrypt = require('bcryptjs');

const originalNumber = 1;

// Hash the number using bcrypt
bcrypt.hash(String(originalNumber), 10, (err, hash) => {
  if (err) throw err;

  console.log(`Original Number: ${originalNumber}`);
  console.log(`Hashed Value: ${hash}`);
});