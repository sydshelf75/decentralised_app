import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as users from '@/models/users';
import * as communities from '@/models/communities';
import * as knowledge from '@/models/knowledge';
import * as tags from '@/models/tags';
import * as relations from '@/models/relations';

const connectionString = process.env.DATABASE_URL!;

const client = postgres(connectionString);

const schema = {
    ...users,
    ...communities,
    ...knowledge,
    ...tags,
    ...relations
}

export const db = drizzle(client, { schema });
