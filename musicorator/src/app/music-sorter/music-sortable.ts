export interface MusicSortable {
  dir: string;
  simple: {
    title: string;
    artist: string;
    album: string;
    composer: string;
    genre: string;
    year: string;
    bpm: number;
    initialKey: string;
    tags: string;
  };
  tags: string[];
  metadata: any;
}
