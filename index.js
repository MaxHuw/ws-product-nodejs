const express = require('express')
const pg = require('pg')
const dotenv = require('dotenv').config();

const rateLimiter = require('./rate-limiter')

//TODO Rate Limiting on all API endpoints.

const app = express()
// configs come from standard PostgreSQL env vars
// https://www.postgresql.org/docs/9.6/static/libpq-envars.html

const pool = new pg.Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
})

app.use(rateLimiter.checkBucket);

const queryHandler = (req, res, next) => {
  pool.query(req.sqlQuery).then((r) => {
    return res.json(r.rows || [])
  }).catch(next)
}

app.get('/', (req, res) => {

  res.send('Welcome to EQ Works 😎')
})

app.get('/events/hourly', (req, res, next) => {

  req.sqlQuery = `
    SELECT date, hour, events
    FROM public.hourly_events
    ORDER BY date, hour
    LIMIT 10;
  `
  //limit was 168
  return next()
}, queryHandler)

app.get('/events/daily', (req, res, next) => {

  let start = req.query.start;
  let end = req.query.end;

  req.sqlQuery = `
  SELECT date, SUM(events) AS events
  FROM public.hourly_events
  WHERE 
    date  >= '${start}' 
    AND date < '${end}'
  GROUP BY date
  ORDER BY date
  LIMIT 7;
  `

  return next()
}, queryHandler)

app.get('/stats/hourly', (req, res, next) => {

  req.sqlQuery = `
    SELECT date, hour, impressions, clicks, revenue
    FROM public.hourly_stats
    ORDER BY date, hour
    LIMIT 168;
  `
  return next()
}, queryHandler)

app.get('/stats/daily', (req, res, next) => {

  req.sqlQuery = `
    SELECT date,
        SUM(impressions) AS impressions,
        SUM(clicks) AS clicks,
        SUM(revenue) AS revenue
    FROM public.hourly_stats
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `
  return next()
}, queryHandler)

////////////////////////////////////////////////
// APIs made from scratch.
// Used for the geo visualization portion of the work sample.

app.get('/stats/all/', (req, res, next) => {

  let start = req.query.start;
  let end = req.query.end;
  let selection = req.query.selection;

  req.sqlQuery = `
    SELECT x.poi_id AS poi, SUM(${selection}) AS ${selection}, y.name AS poi_name, y.lat AS poi_lat, y.lon AS poi_lon
    FROM public.hourly_stats x
    JOIN public.poi y ON x.poi_id = y.poi_id
    WHERE 
      date  >= '${start}' 
      AND date < '${end}'
      GROUP BY poi, poi_name, poi_lat, poi_lon
      ORDER BY poi, poi_name, poi_lat, poi_lon
    LIMIT 20;
  `
  return next()
}, queryHandler)

app.get('/events/all/', (req, res, next) => {

  let start = req.query.start;
  let end = req.query.end;

  req.sqlQuery = `
    SELECT x.poi_id AS poi, SUM(x.events) AS events, y.name AS poi_name, y.lat AS poi_lat, y.lon AS poi_lon
    FROM public.hourly_events x
    JOIN public.poi y ON x.poi_id = y.poi_id
    WHERE 
      date  >= '${start}' 
      AND date < '${end}'
    GROUP BY poi, poi_name, poi_lat, poi_lon
    ORDER BY poi, poi_name, poi_lat, poi_lon
    LIMIT 20;
  `
  return next()
}, queryHandler)

///////////////////////////////////

app.get('/poi', (req, res, next) => {

  req.sqlQuery = `
    SELECT *
    FROM public.poi;
  `
  return next()
}, queryHandler)

app.listen(process.env.PORT || 5555, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log(`Running on ${process.env.PORT || 5555}`)
  }
})

// last resorts
process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`)
  process.exit(1)
})
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  process.exit(1)
})
