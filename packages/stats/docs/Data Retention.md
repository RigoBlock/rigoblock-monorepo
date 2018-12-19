# Data downsampling and retention

https://docs.influxdata.com/influxdb/v1.6/guides/downsampling_and_retention/

By default if not specified in the telegraf.conf file, Telegraf will write to the "autogen" retention policy, which will keep data forever and is automatically created by InfluxDB.

We can create additional retention policies like so:

```sql
CREATE RETENTION POLICY one_day ON telegraf DURATION 24h REPLICATION 1 DEFAULT
```

>The minimum duration is one hour and the maximum is `INF`. Adding *DEFAULT* sets the retention policy as the default for the database. The REPLICATION clause must always be set to 1 since we are using OSS InfluxDB and only have a single node.

To modify an existing retention policy:
```sql
ALTER RETENTION POLICY one_day ON telegraf DURATION <duration> REPLICATION 1 DEFAULT
```

To drop a retention policy:
```sql
DROP RETENTION POLICY one_day ON telegraf
```

To downsample our data we can write *continuous queries*. Continuous Queries (CQ) are InfluxQL queries that run automatically and periodically on realtime data and store query results in a specified measurement.

```sql
CREATE CONTINUOUS QUERY "cq_30m" ON "telegraf"
BEGIN
  SELECT mean("value") AS "mean_value"
  INTO "telegraf"."one_day"."downsampled_balances"
  FROM "telegraf"."two_hours"."balance"
  WHERE "type"='Vault'
  GROUP BY time(30m), "id"
END
```
- get data from `two_hours` retention policy
- group by 30 minutes
- calculate mean value
- store under `one_day` retention policy, `downsampled_balances` measurement

## Retention policies and CQ on our database

We currently have 4 retention policies on our `telegraf` database:

- `autogen` (unused)
- `one_day` (default); 24 hours data retention, this is where telegraf stores new data
- `one_week`; 7 days data retention
- `infinite`; Infinite data retention

We currently have 6 continuous queries running on our *telegraf* database:

- *cq_1d_price*: selects data from *telegraf.one_week.price* and aggregates it by *1 day*, then stores the result into *telegraf.infinite.price*

```sql
CREATE CONTINUOUS QUERY cq_1d_price ON telegraf BEGIN SELECT mean(value) AS value INTO telegraf.infinite.price FROM telegraf.one_week.price GROUP BY time(1d), * END
```
- *cq_1d_balance*: selects data from *telegraf.one_week.balance* and aggregates it by *1 day*, then stores the result into *telegraf.infinite.balance*
```sql
CREATE CONTINUOUS QUERY cq_1d_balance ON telegraf BEGIN SELECT mean(value) AS value INTO telegraf.infinite.balance FROM telegraf.one_week.balance GROUP BY time(1d), * END
```
- *cq_1d_totalsupply*: selects data from *telegraf.one_week.balance* and aggregates it by *1 day*, then stores the result into *telegraf.infinite.balance*
```sql
CREATE CONTINUOUS QUERY cq_1d_totalsupply ON telegraf BEGIN SELECT mean(value) AS value INTO telegraf.infinite.totalsupply FROM telegraf.one_week.totalsupply GROUP BY time(1d), * END
```

- *cq_1h_balance*: selects data from *telegraf.one_day.balance* and aggregates it by *1 hour*, then stores the result into *telegraf.one_week.balance*
```sql
CREATE CONTINUOUS QUERY cq_1h_balance ON telegraf BEGIN SELECT mean(value) AS value INTO telegraf.one_week.balance FROM telegraf.one_day.balance GROUP BY time(1h), * END
```
- *cq_1h_price*: selects data from *telegraf.one_day.price* and aggregates it by *1 hour*, then stores the result into *telegraf.one_week.price*
```sql
CREATE CONTINUOUS QUERY cq_1h_price ON telegraf BEGIN SELECT mean(value) AS value INTO telegraf.one_week.price FROM telegraf.one_day.price GROUP BY time(1h), * END
```
- *cq_1h_totalsupply*: selects data from *telegraf.one_day.price* and aggregates it by *1 hour*, then stores the result into *telegraf.one_week.price*
```sql
CREATE CONTINUOUS QUERY cq_1h_totalsupply ON telegraf BEGIN SELECT mean(value) AS value INTO telegraf.one_week.totalsupply FROM telegraf.one_day.totalsupply GROUP BY time(1h), * END
```

// TODO: add nav continuous query to move data from *one_day* to *infinite*
