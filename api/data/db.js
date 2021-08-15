import mongoose from 'mongoose';

const uri = process.env.DB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', err => {
  console.error('Connection error:', err);
});

db.on('connected', () => {
  console.log('Connected to mongodb');
});

db.on('disconnected', () => {
  console.log('Disconnected from mongodb');
});

/**
 * function that clean the db resource once
 */
const closeDbHandler = (() => {
  let isCleand = false;
  return () => {
    if (isCleand) return process.exit(0);
    db.close(err => {
      if (err) console.error(err);
      isCleand = true;
      console.log('Connection to mongodb was closed due to process termination');
      process.exit(0);
    });
  };
})();

['SIGINT', 'SIGUSR1', 'SIGUSR2'].forEach(signal => process.on(signal, closeDbHandler));

export default db;
