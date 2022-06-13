export class Chapter {
  public id: string;
  public title: string;
  public slug: string;
  public number: string;
  public url: string;
  public pags?: string[];
  constructor(props: Chapter) {
    Object.assign(this, props);
  }
}
