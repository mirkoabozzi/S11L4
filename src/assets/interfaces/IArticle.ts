export interface Launch {
  launch_id: string;
  provider: string;
}
export interface Event {
  event_id: number;
  provider: string;
}
export interface IArticle {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: Date;
  updated_at: Date;
  featured: boolean;
  launches: Launch[];
  events: Event[];
}
