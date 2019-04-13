Work Sample for Product Aspect, Node.js Variant
---

### Setup and Run

- Run 'npm install' in both the main, and 'frontend' folders.
- Create '.env' file in main directory with appropriate environment variables.
- Run 'npm start' in both the main and 'frontend' folders to launch application.


## Problems

These were the requirements for the work sample.

### Server-Side

- Implement rate limiting on all of the API endpoints. This is a fairly open-ended problem. If you choose to implement this, the only requirement is not to use a too obviously off-the-shelf solution such as https://flask-limiter.readthedocs.io/en/stable/ or https://www.npmjs.com/package/express-rate-limit (or one of the API gateway services).

### Client-Side

- Implement a user interface with React.js that uses the API endpoints to provide data visualizations including one or more types of charts, a data table using [this Semantic UI example](https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/examples/collections/Table/Types/TableExamplePagination.js) as a starting point, and a map-based geo visualization.
- The data table component should be extended with the following search features:
	1. Fuzzy search on table data.
	2. Highlight of matched term(s).
- The geo visualization should have the following features: 
	1. The visualization should demonstrate the "intensity" of a user selected metrics (for example, `impressions`) of a user selected date/time range. This problem would require modification of existing `/stats/*` and `/events/*` series of endpoints on the API server side. You can check out the return of the `/poi` endpoint to understand what metadata are available from the `poi` table, or leverage a SQL client to explore it.
	2. The map should allow certain degree of freedom in terms of zooming level, and allows user to see a "clustered" indicator when more than one POIs are too close to each other at the given zoom level.
