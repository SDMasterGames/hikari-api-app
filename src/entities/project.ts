interface IProjectImages {
  cover: {
    id: number;
    url: string;
  };
  banner: {
    id: number;
    url: string;
    active: boolean;
  };
}

interface IProjectAttributes {
  title: string;
  alt_title: string;
  description: string;
  link: string;
}

interface IProjectRelationships {
  author: string;
  artist: string;
  publisher: string;
}

export interface IProjectTags {
  id: number;
  name: string;
}

export class Project {
  public id: number;
  public slug: string;
  public type: string;
  public adult: boolean;
  public last_chapter: string;
  public update_at: string;
  public status: string;
  public rating: string;

  public attributes: IProjectAttributes;
  public media: IProjectImages;
  public tags: IProjectTags[];
  public relationships: IProjectRelationships;

  constructor(props: Project) {
    Object.assign(this, props);
  }
}
