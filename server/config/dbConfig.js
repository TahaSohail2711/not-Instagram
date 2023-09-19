module.exports = {
  HOST: 'database',
  USER: 'postgres',
  PASSWORD: 'taha123',
  DB: 'notInstagram',
  dialect: 'postgres',
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
