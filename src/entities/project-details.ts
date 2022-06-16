import { randomInt, randomUUID } from "crypto";

interface IDetailMetricsViewOrClicks {
  count: number;
  date: string;
}

interface IDetailsMetricsProps {
  views: IDetailMetricsViewOrClicks[];
  clicks: IDetailMetricsViewOrClicks[];
  likes: string[];
}

interface ProjectsDetailsProps {
  project_id: string;
  project_slug: string;
  id?: string;
  metrics?: IDetailsMetricsProps;
  comments?: any[];
}

export class ProjectDetail {
  public id: string;
  public project_slug: string;
  public project_id: string;
  public metrics: IDetailsMetricsProps;
  public comments: any[];
  constructor(props: ProjectsDetailsProps) {
    this.id = props.id || randomUUID();
    this.project_slug = props.project_slug;
    this.project_id = props.project_id;
    this.metrics = props.metrics || {
      views: [],
      clicks: [],
      likes: [],
    };
    this.comments = props.comments || [];
  }

  static Fake(project_id?: string, project_slug?: ""): ProjectDetail {
    return {
      comments: [],
      id: randomUUID(),
      metrics: {
        clicks: [],
        likes: [],
        views: [],
      },
      project_id: project_id || "",
      project_slug: project_slug || "",
    };
  }
}
