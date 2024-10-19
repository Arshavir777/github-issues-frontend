import { IGithubIssue } from "./githubIssueTypes";
import { IPagination } from "./paginationTypes";
import { IStatistics } from "./statisticsTypes";

export interface IIssuesResponse {
    issues: IGithubIssue[],

    pagination: IPagination
}

export interface IStatisticsResponse {
    statistics: IStatistics[],

    pagination: IPagination
}
