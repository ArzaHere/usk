// Script untuk generate password hash
// Jalankan dengan: node hasPassword.js

const bcrypt = require('bcryptjs');

const password = 'kafi062';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) {
    console.error('Error generating hash:', err);
    return;
  }
  
  console.log('===========================================');
  console.log('Password Hash Generator');
  console.log('===========================================');
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('===========================================');
  console.log('\nSQL Update Query:');
  console.log(`UPDATE users SET password = '${hash}' WHERE email = 'admin@perusahaan.com';`);
  console.log('===========================================');
});