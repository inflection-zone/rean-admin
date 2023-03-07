
export interface TabDefinition {
    name: string;
    path: string;
    default: boolean;
};

const home: TabDefinition = {
    name: 'Home',
    path: `/users/userId/home`,
    default: true,
};
const notifications: TabDefinition = {
    name: 'Notifications',
    path: `/users/userId/notifications`,
    default: false,
};
const apiClients: TabDefinition = {
    name: 'Clients',
    path: `/users/userId/api-clients`,
    default: false,
};
const organizations: TabDefinition = {
    name: 'Organizations',
    path: `/users/userId/organizations`,
    default: false,
};
const linkages: TabDefinition = {
    name: 'Linkages',
    path: `/users/userId/linkages`,
    default: false,
};
const newsFeeds: TabDefinition = {
    name: 'Newsfeeds',
    path: `/users/userId/newsfeeds`,
    default: false,
};
const knowledgeNuggets: TabDefinition = {
    name: 'Knowledge-Nuggets',
    path: `/users/userId/knowledge-nuggets`,
    default: false,
};
const learningJourneys: TabDefinition = {
    name: 'Learning-Journeys',
    path: `/users/userId/learning-journeys`,
    default: false,
};
const assessments: TabDefinition = {
    name: 'Assessments',
    path: `/users/userId/assessments`,
    default: false,
};
const symptoms: TabDefinition = {
    name: 'Symptoms',
    path: `/users/userId/symptoms`,
    default: false,
};

export const navbarMenu = (userId) => {
    const menus = [
            home,
            apiClients,
            organizations,
            assessments,

    ];
    return replaceUserId(menus, userId);
};

export const sidebarMenu = (userId) => {
    const menus = [
        home,
        notifications,
        linkages,
        newsFeeds,
        learningJourneys,
        knowledgeNuggets,
        symptoms
    ];
    return replaceUserId(menus, userId);
};

const replaceUserId = (menus, userId) => {
    return menus.map(x => {
        return {
            name: x.name,
            path: x.path.replace('userId', userId),
            default: x.default,
        };
    });
};