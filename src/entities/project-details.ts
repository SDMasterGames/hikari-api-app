import { ValidateUtils } from "../utils/";
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

  views = (value: number = 1) => {
    if (!Number.isInteger(value)) {
      throw new Error("Invalid value");
    }

    const findViews = this.metrics.views.find((views) => {
      return views.date === new Date().toISOString().split("T")[0];
    });
    if (findViews) {
      findViews.count += value;
    } else {
      this.metrics.views.push({
        count: value,
        date: new Date().toISOString().split("T")[0],
      });
    }
  };

  addComment = (id?: string) => {
    if (!id || !ValidateUtils.isStringValid(id)) {
      throw new Error("id is required and must be a string");
    }
    this.comments.push(id)
  };

  likes = (id?: string) => {
    if (!id || !ValidateUtils.isStringValid(id)) {
      throw new Error("id is required and must be a string");
    }
    if (this.metrics.likes.includes(id)) {
      this.metrics.likes.splice(this.metrics.likes.indexOf(id), 1);
    } else {
      this.metrics.likes.push(id);
    }
  };

  clicks = (value: number = 1) => {
    if (!Number.isInteger(value)) {
      throw new Error("Invalid value");
    }

    const findClicks = this.metrics.clicks.find((click) => {
      return click.date === new Date().toISOString().split("T")[0];
    });
    if (findClicks) {
      findClicks.count += value;
    } else {
      this.metrics.clicks.push({
        count: value,
        date: new Date().toISOString().split("T")[0],
      });
    }
  };

  static Fake(project_id?: string, project_slug?: ""): ProjectsDetailsProps {
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
