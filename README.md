# RapJeuBackend

BackendService for RapJeu
## Commands

To install the dependencies use:

```bash
$ npm install
```

To start the service use:

```bash
$ npm start
```

## Environment variables

The configuration is done through the environment variables.
It can also be done within a `.env` file.

See [config.js](src/config.js) for more details.

| Variable                                | Description                                                                      | Type                                                      |
|-----------------------------------------|----------------------------------------------------------------------------------|-----------------------------------------------------------|
| `API_KEY`                               | API key (for administrators only)                                                | String                                                    |
| `ACCESS_TOKEN_SECRET`                   | Secret access token                                                              | String                                                    |
| `DEFAULT_MIXED_ARRAY_LENGTH`            | Default length for mixedArray received by users                                  | Number                                                    |
| `GET_MIXED_ARRAY_MAX_EXECUTION_TIME_MS` | Maximal execution time (in milliseconds) for the getMixedArray controller method | Number                                                    |
| `SEQUELIZE_LOG_LEVEL`                   | Log level (using log4js) for Sequelize log                                       | String [off, fatal, error, warn, info, debug, trace, all] |

## Database

You can use **[Docker Compose](https://docs.docker.com/compose/)** to create a development database using:

```bash
$ docker-compose -f docker/postgres/docker-compose.yml up -d
```

## References

* [JavaScript MDN page](https://developer.mozilla.org/en/docs/Web/JavaScript)
* [Node.js website](https://nodejs.org/en/)
* [NPM website](https://www.npmjs.com/)
* [Docker docs](https://docs.docker.com/)
* [Docker Compose docs](https://docs.docker.com/compose/)
* [Sequelize website](https://sequelize.org/)
* [Express website](https://expressjs.com/)
