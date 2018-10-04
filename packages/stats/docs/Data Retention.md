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
