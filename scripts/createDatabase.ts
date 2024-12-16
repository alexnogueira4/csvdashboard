import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGODB_URI!
const dbName = process.env.DB_NAME!
const collectionName = process.env.COLLECTION_NAME!

const client = new MongoClient(uri)

const createDatabase = async () => {
  try {
    await client.connect()

    const db = client.db(dbName)

    await db.createCollection(collectionName)

    console.log(`Database and collection created: ${dbName}.${collectionName}`)

    await client.close()
  } catch (error) {
    console.error('Error creating database:', error)
  }
}

createDatabase().catch(console.error)
