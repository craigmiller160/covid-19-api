# covid-19-api

The REST API micro-service for serving up COVID 19 data from MongoDB.

## Config/MongoDB Library

This project depends on the @craigmiller160/covid-19-config-mongo library. It needs to be published locally in order to work.

Once it is published locally, make sure to add it and refresh the dependencies.

```
yalc add @craigmiller160/covid-19-config-mongo
yarn
```