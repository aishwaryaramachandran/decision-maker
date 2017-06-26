require('dotenv').config();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
      ssl      : process.env.DB_SSL
    },

    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: 'postgresql',
    debug: true,
    connection: 'postgres://eddhvfiyeskrrv:09575f701fe7ac503222baeb38dd84d1d6d1a2fe58e61faed54d83c31b686370@ec2-54-243-252-91.compute-1.amazonaws.com:5432/djia8frqj34q6'
,
    pool: {
      min: 1,
      max: 7
    },
    migrations: {
      directory:'./db/migrations'
    },
    ssl:true
  }

}
