import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('user', (table) => {
      table.increments('id').primary();
      table.string('auth0_id', 60).unique().notNullable();
      table.index('auth0_id');
      table.string('username', 50).unique().notNullable();
      table.index('username');
      table.json('preferences').nullable();
      table.json('watch_history').nullable();
      table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    }).createTable('movie', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.json('genres').notNullable();
      table.timestamp('release_date').notNullable();
      table.string('director').notNullable();
      table.json('actors').notNullable();
      table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    }).createTable('tv_show', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.json('genres').notNullable();
      table.json('episodes').notNullable();
      table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    }).createTable('user_watch_list', (table) => {
      table.increments('id').primary();
      table.integer('fk_user').unsigned().notNullable().references('id').inTable('user');
      table.integer('fk_movie').unsigned().nullable().references('id').inTable('movie');
      table.integer('fk_tv_show').unsigned().nullable().references('id').inTable('tv_show');
      table.timestamp('removed_at').nullable();
      table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('user_watch_list').
    dropTableIfExists('user').
    dropTableIfExists('movie').
    dropTableIfExists('tv_show');
}
