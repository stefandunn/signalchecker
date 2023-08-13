# Signal Checker

Check your internet speed with others in your area based on your mobile network provider and device. The map will plot markers of other test results.

This project is designed to run with a [Mapbox API key](https://account.mapbox.com/access-tokens) and a [Supabase database](https://supabase.com/).

> This project is not fully-functional at the moment. Intent to include marker clustering, marker details of results and marker colouring based on speed results.

The project is built on the [NextJS framework](https://nextjs.org/docs) using [Prisma](https://www.prisma.io/docs) as an ORM library to interact with the database.

## Setup

To run this locally, clone the repo and copy `.env.example` and populate the file with the relevant API keys.

To install dependencies, run:

```bash
yarn install
# or
npm install
```

To run the database migrations and build the database schema, run:

```bash
npx prisma migrate dev
```

To run the project:

```bash
yarn dev
# or
npm dev
```

To build the project and start the built server:

```bash
yarn build & yarn start
# or
npm build & yarn start
```

### Project features:

- Run speed tests (small, medium large files)
- Get average download speeds
- Update map markers with results as it pans
- Device lookup
- User location detection
