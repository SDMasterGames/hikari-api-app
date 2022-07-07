import { ValidateUtils } from "../utils";

export interface IStatsViewProps {
  count: number;
  date: string;
}

export interface IStatsViewCreateProps {
  count?: number;
  date?: string;
}

export class StatsView {
  private count: number;
  private date: string;
  constructor({ count, date }: IStatsViewProps) {
    this.count = count;
    this.date = date;
    Object.freeze(this);
  }

  getCount(): number {
    return this.count;
  }

  getDate(): string {
    return this.date;
  }

  get() {
    return {
      count: this.count,
      date: this.date,
    };
  }

  static create({ count, date }: IStatsViewCreateProps): StatsView {

    if (!count || !ValidateUtils.IntegerValid(count)) {
      count = 0
    }

    if (!date || !ValidateUtils.StringValid(date)) {
      date = this.DateNow()
    }

    return new StatsView({ count, date });
  }

  static DateNow() {
    return new Date().toLocaleDateString("pt-br", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  }
}
