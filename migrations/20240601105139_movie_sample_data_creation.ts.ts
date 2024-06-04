import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex('movie').insert([
    {
      title: 'Chamkila',
      description: 'Chamkila',
      genres: JSON.stringify(["Comedy", "Drama", "Romance"]),
      release_date: '2024-06-01 11:16:19',
      director: 'Imtiaz Ali',
      actors: JSON.stringify(["Diljit Dosanjh", "Parineeti Chopra"]),
    },
    {
      title: 'Fighter',
      description: 'Fighter',
      genres: JSON.stringify(["Comedy", "Drama", "Romance", "Action"]),
      release_date: '2024-06-01 11:16:19',
      director: 'Siddharth Anand',
      actors: JSON.stringify(["Hrithik Roshan", "Deepika Padukone"]),
    },
  ]);
}


export async function down(knex: Knex): Promise<void> {
}

