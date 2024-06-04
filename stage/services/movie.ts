import { Service } from '@hapipal/schmervice';
import { Movie } from '@interfaces/movie';

export default class MovieService extends Service {
  async findById({ id }: { id: number }): Promise<Movie> {
    const { movieRepository } = this.server.services();
    const movie = await movieRepository.findById<Movie>('MovieModel', id, null);
    return movie;
  }
}

declare module '@hapipal/schmervice' {
  interface RegisteredServices {
    movieService: MovieService;
  }
}
