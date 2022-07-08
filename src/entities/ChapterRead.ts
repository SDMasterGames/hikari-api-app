interface IChapterReadProps {
  project_detail_id: string;
  chapters: string[];
}

interface IChapterReadCreateProps {
  project_detail_id: string;
  chapters: string[];
}

export class ChapterRead {
  private readonly project_detail_id: string;
  private readonly chapters: string[];
  constructor(props: IChapterReadProps) {
    this.chapters = props.chapters;
    this.project_detail_id = props.project_detail_id;
    Object.freeze(this);
  }

  getChapters(): string[] {
    return this.chapters;
  }

  getProjectDetailId(): string {
    return this.project_detail_id;
  }

  static create(props: IChapterReadCreateProps) {
    if (!Array.isArray(props.chapters)) {
      throw new Error("chapters não é um array");
    }

    if (!props.project_detail_id) {
      throw new Error("project_detail_id não é uma string válida");
    }

    return new ChapterRead(props);
  }
}
