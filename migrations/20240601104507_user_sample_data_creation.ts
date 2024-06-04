import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex('user').insert([
    {
      auth0_id: 'ka51ZYFZ8xiBAMuBSdUdu',
      username: 'apricot_roadrunner_604',
    },
  ]);
}


export async function down(knex: Knex): Promise<void> {
}

