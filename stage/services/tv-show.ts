import { Service } from '@hapipal/schmervice';
import { TVShow } from '@interfaces/tv-show';

export default class TVShowService extends Service {
  async findById({ id }: { id: number }): Promise<TVShow> {
    const { tVShowRepository } = this.server.services();
    const tvShow = await tVShowRepository.findById<TVShow>('TVShowModel', id, null);
    return tvShow;
  }
}

declare module '@hapipal/schmervice' {
  interface RegisteredServices {
    tVShowService: TVShowService;
  }
}
