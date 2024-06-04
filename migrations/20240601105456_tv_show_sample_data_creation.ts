import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex('tv_show').insert([
    {
      title: 'Little Things',
      description: 'Little Things',
      genres: JSON.stringify(["Comedy", "Drama", "Romance"]),
      episodes: JSON.stringify([{
        "actors": ["Mithila Palkar", "Dhruv Sehgal"], "director": "Ajay Bhuyan", "releaseDate": "2024-03-01 07:03:36", "seasonNumber": 1, "episodeNumber": 1
      }]),
    },
    {
      title: 'Panchayat',
      description: 'Panchayat',
      genres: JSON.stringify(["Comedy", "Drama", "Romance", "Action"]),
      episodes: JSON.stringify([{
        "actors": ["Jitendar Kumar", "Raghubir Yadav", "Chandan Roy", "Faisal Malik"],
        "director": "Deepak Kumar Mishra",
        "releaseDate": "2024-03-01 07:03:36",
        "seasonNumber": 1,
        "episodeNumber": 1
      }]),
    },
  ]);
}


export async function down(knex: Knex): Promise<void> {
}

