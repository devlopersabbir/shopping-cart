## Shopping Cart System

Next 14 Shopping cart system test project

**Live Demo** [Click here](https://shopping-cart-chi-rouge.vercel.app/)

### Setup <a name="setup"></a>

1. Clone this repository.
2. Rename `.env.example` file to `.env` and input your credentials.
3. Run `pnpm install` or `npm install` (check your node version >= 16)
4. Migrate your database and seed initail data
   `npx prisma migrate dev --name MIGRATION_NAME`(**for development**)
5. Run `pnpm run dev` or `npm run dev`
6. If you want to build in production, Just run `pnpm build` or `npm run build`.

### Uses Technology

- Next14 (**APP Router**)
- Prisma (**ORM**)
- PG (**DataBase**)
- TailwindCss & shadcn-ui (**UI Library**)
- Next Auth (**Authentecation**)
