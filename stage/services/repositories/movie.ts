
import BaseRepository from './base';

export default class MovieRepository extends BaseRepository {
}

declare module '@hapipal/schmervice' {
  interface RegisteredServices {
    movieRepository: MovieRepository;
  }
}
