import { randomInt } from "crypto";

export class Chapter {
  public id: number;
  public title: string;
  public slug: string;
  public number: string;
  public url: string;
  public pags?: string[];
  constructor(props: Chapter) {
    Object.assign(this, props);
  }

  static Fake(slug?:string): Chapter {
    return {
      id: randomInt(100),
      title: "",
      slug: slug || "",
      number: "",
      url: "",
      pags: [],
    };
  }
}
