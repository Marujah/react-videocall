module.exports = {
  PORT: process.env.PORT || 5000,
  DB: {
    host: 'ec2-46-137-84-173.eu-west-1.compute.amazonaws.com',
    database: 'db56egft7qvgn6',
    user: 'etycnfurkdoill',
    port: 5432,
    password: '66c6996d19cfaa1874021aaf72dd536790942160f119f153016a42287a2c735f',
    uri: 'postgres://etycnfurkdoill:66c6996d19cfaa1874021aaf72dd536790942160f119f153016a42287a2c735f@ec2-46-137-84-173.eu-west-1.compute.amazonaws.com:5432/db56egft7qvgn6',
    herokuCLI: 'heroku pg:psql postgresql-octagonal-69714 --app mm-video-chat'
  }
};
