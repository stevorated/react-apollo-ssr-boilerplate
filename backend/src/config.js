export const {
  APP_PORT,
  NODE_ENV,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  SESSION_NAME,
  SESSION_LIFE,
  SESSION_SECRET,
  SESSION_DB_HOST,
  SESSION_DB_PORT,
  SESSION_DB_NAME,
  SESSION_DB_COLLECTION
} = process.env

export const IN_PROD = NODE_ENV === 'production'
