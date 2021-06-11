

## Installation

Install docker and docker compose in your pc.

Switch to the folder and run 
```bash
$ npm install
```
and then
```bash
$ docker-compose up
```
#### Usage
1. `npm run typeorm:migrate <myEntity-migration>`
2. Check your migration queries in `src/migrations`
3. `npm run start:dev` or `npm run start:prod` or `npm run typeorm:run`

If everything went well, you have up to date entites and a `migrations` table listing applied migrations.