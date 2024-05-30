# Shork Utilities

Shork makes use of several utility files to make some parts of development easier.  They can be found in the ../src/utils/ directory.


## Channel (TS)

The `getChannel` function is used to get a text channel within the guild.  It returns a Discord.js type of TextChannel.

```ts
getChannel(): TextChannel
```

## Commands (TS) (SINGLETON)

The `getCommandFiles` function is used to get all the command files within the /commands/ directory.
Due to the fact that it makes use of a redis cache this should only be used ONCE.  All other needs to access command files should be done by grabbing from the Redis cache

```ts
async getCommandFiles()
```

## Files (TS)

The `getFilesRecursively` function should be used to get all the files of a specific directory.  You shouldn't need to use this unless you're improving it or trying to get files from a directory (obviously)

TODO: Make this more efficient or something.

```ts
getFilesRecursively()
```