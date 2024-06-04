
import BaseRepository from './base';

export default class TVShowRepository extends BaseRepository {
}

declare module '@hapipal/schmervice' {
  interface RegisteredServices {
    tVShowRepository: TVShowRepository;
  }
}
