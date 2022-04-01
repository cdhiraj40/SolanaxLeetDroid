export interface AllQuestionsCount {
    difficulty: string;
    count: number;
}

export interface Contributions {
    points: number;
    questionCount: number;
    testcaseCount: number;
}

export interface Profile {
    realName: string;
    websites: string[];
    countryName: string;
    skillTags: any[];
    company?: any;
    school: string;
    starRating: number;
    aboutMe: string;
    userAvatar: string;
    reputation: number;
    ranking: number;
}

export interface AcSubmissionNum {
    difficulty: string;
    count: number;
    submissions: number;
}

export interface TotalSubmissionNum {
    difficulty: string;
    count: number;
    submissions: number;
}

export interface SubmitStats {
    acSubmissionNum: AcSubmissionNum[];
    totalSubmissionNum: TotalSubmissionNum[];
}

export interface MatchedUser {
    username: string;
    socialAccounts?: any;
    githubUrl: string;
    contributions: Contributions;
    profile: Profile;
    submitStats: SubmitStats;
}

export interface Data {
    allQuestionsCount: AllQuestionsCount[];
    matchedUser: MatchedUser;
}

export interface RootObject {
    data: Data;
}

export interface LeetCodeProfile {
    username: string;
    name: string;
    bio: string;
    ranking: string;
    stars: number;
    problemSolved: number;
    acceptanceRate: number;
    timeStamp: number;
}
