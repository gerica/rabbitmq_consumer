import dotenv from 'dotenv';

dotenv.config({ path: `${process.cwd()}/src/config/.env` });

export default {
  ...process.env,
};
