
interface UserDto {
    login: string;

    id: number;

    avatar_url: string;

    url: string;

    html_url: string;

    type: string;

    site_admin: boolean;
}

interface LabelDto {
    id: number;

    name: string;

    color: string;
}

interface ReactionsDto {
    url: string;

    total_count: number;

    '+1': number;

    '-1': number;

    laugh: number;

    hooray: number;

    confused: number;

    heart: number;

    rocket: number;

    eyes: number;
}

export interface IGithubIssue {
    url: string;

    repository_url: string;

    labels_url: string;

    comments_url: string;

    events_url: string;

    html_url: string;

    id: number;

    node_id: string;

    number: number;

    title: string;

    user: UserDto;

    labels: LabelDto[];

    state: string;

    locked: boolean;

    assignee: string | null;

    assignees: string[];

    milestone: string | null;

    comments: number;

    created_at: string;

    updated_at: string;

    closed_at: string | null;

    author_association: string;

    reactions: ReactionsDto;

    timeline_url: string;

    state_reason: string | null;
}
