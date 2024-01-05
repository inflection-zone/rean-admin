import { type FeatureOptions } from "$lib/system.types";
import { getFeatureOptions } from '$lib/options/options.selector';

///////////////////////////////////////////////////////////////////////////////

export interface SidebarMenu {
    name     : string;
    title    : string;
    icon     : string;
    link    ?: string | null | undefined;
    children : SidebarMenu[];
}

export interface navigation {
    title   : string;
    icon    : string;
    link   ?: string | null | undefined;
    childNav?: navigation[];
}
///////////////////////////////////////////////////////////////////////////////

export const getMenuList = (userId: string): SidebarMenu[] => {

    const menuList: SidebarMenu[] = [];

    const dashbord: SidebarMenu = {
        name    : 'Main-Dashboard',
        title   : 'Dashboard',
        icon    : 'material-symbols:dashboard-outline-rounded',
        link    : null,
        children: []
    };
    menuList.push(dashbord);

    const rhg: SidebarMenu = {
        name    : 'Main-Home',
        title   : 'Home',
        icon    : 'material-symbols:home-outline-rounded',
        link    : `/users/${userId}/home`,
        children: []
    };
    menuList.push(rhg);

    //................................................................

    const administration: SidebarMenu = {
        name    : 'Administration',
        title   : 'Administration',
        icon    : 'material-symbols:shield-person-outline-rounded',
        link    : null,
        children: []
    };
    menuList.push(administration);

    const client: SidebarMenu = {
        name    : 'Clients',
        title   : 'Clients',
        icon    : 'material-symbols:frame-person-outline-rounded',
        link    : `/users/${userId}/api-clients`,
        children: []
    };
    menuList.push(client);

    const tenant: SidebarMenu = {
        name    : 'Tenants',
        title   : 'Tenants',
        icon    : 'material-symbols:tenancy-outline',
        link    : `/users/${userId}/tenants`,
        children: []
    };
    menuList.push(tenant);

    const personRole: SidebarMenu = {
        name    : 'Person-Role',
        title   : 'Person Role',
        icon    : 'material-symbols:person-search-outline-rounded',
        link    : `/users/${userId}/person-role-types`,
        children: []
    };
    menuList.push(personRole);

    //................................................................

    const analysis: SidebarMenu = {
        name    : 'Analysis',
        title   : 'Analysis',
        icon    : 'material-symbols:analytics-outline-rounded',
        link    : null,
        children: []
    };
    menuList.push(analysis);

    const customQuery: SidebarMenu = {
        name    : 'Custom-Queries',
        title   : 'Custom Queries',
        icon    : 'material-symbols:database-outline',
        link    : `/users/${userId}/custom-queries`,
        children: []
    };
    menuList.push(customQuery);

    //................................................................

    const hospitalSystems: SidebarMenu = {
        name    : 'Hospital-Systems',
        title   : 'Hospital Systems',
        icon    : 'material-symbols:account-tree-outline-rounded',
        link    : null,
        children: []
    };
    menuList.push(hospitalSystems);

    const hospital: SidebarMenu = {
        name    : 'Hospitals',
        title   : 'Hospitals',
        icon    : 'material-symbols:local-hospital-outline-rounded',
        link    : `/users/${userId}/hospitals`,
        children: []
    };
    menuList.push(hospital);

    const healthSystem: SidebarMenu = {
        name    : 'Health-Systems',
        title   : 'Health Systems',
        icon    : 'material-symbols:health-and-safety-outline-rounded',
        link    : `/users/${userId}/health-systems`,
        children: []
    };
    menuList.push(healthSystem);

    //................................................................

    const clinical: SidebarMenu = {
        name    : 'Clinical',
        title   : 'Clinical',
        icon    : 'material-symbols:medical-services-outline-rounded',
        link    : null,
        children: []
    };
    menuList.push(clinical);

    const assessment: SidebarMenu = {
        name    : 'Assessments',
        title   : 'Assessments',
        icon    : 'material-symbols:assignment-outline-rounded',
        link    : `/users/${userId}/assessment-templates`,
        children: []
    };
    menuList.push(assessment);

    const labRecordType: SidebarMenu = {
        name    : 'Lab-Records',
        title   : 'Lab-Records',
        icon    : 'material-symbols:lab-research-outline-rounded',
        link    : `/users/${userId}/lab-record-types`,
        children: []
    };
    menuList.push(labRecordType);

    const symptom: SidebarMenu = {
        name    : 'Symptoms',
        title   : 'Symptoms',
        icon    : 'material-symbols:symptoms-outline',
        link    : `/users/${userId}/symptoms`,
        children: []
    };
    menuList.push(symptom);

    const drug: SidebarMenu = {
        name    : 'Drugs',
        title   : 'Drugs',
        icon    : 'material-symbols:pill-outline',
        link    : `/users/${userId}/drugs`,
        children: []
    };
    menuList.push(drug);

    //................................................................

    const careplan: SidebarMenu = {
        name    : 'Careplan',
        title   : 'Careplan',
        icon    : 'material-symbols:home-health-outline-rounded',
        link    : null,
        children: []
    };
    menuList.push(careplan);

    const careplanDashboard: SidebarMenu = {
        name    : 'Careplan-Dashboard',
        title   : 'Dashboard',
        icon    : 'material-symbols:dashboard-outline-rounded',
        link    : `/users/${userId}/careplan`,
        children: []
    };
    menuList.push(careplanDashboard);

    const careplanAssets: SidebarMenu = {
        name    : 'Careplan-Assets',
        title   : 'Assets',
        icon    : 'carbon:task-asset-view',
        link    : `/users/${userId}/careplan/assets`,
        children: []
    };
    menuList.push(careplanAssets);

    const careplanPlans: SidebarMenu = {
        name    : 'Careplan-Plans',
        title   : 'Careplans',
        icon    : 'iconoir:healthcare',
        link    : `/users/${userId}/careplan/careplans`,
        children: []
    };
    menuList.push(careplanPlans);

    const careplanEnrollments: SidebarMenu = {
        name    : 'Careplan-Enrollments',
        title   : 'Enrollments',
        icon    : 'material-symbols:check-box-outline-rounded',
        link    : `/users/${userId}/careplan/enrollments`,
        children: []
    };
    menuList.push(careplanEnrollments);

    //................................................................

    const educational: SidebarMenu = {
        name    : 'Educational',
        title   : 'Educational',
        icon    : 'material-symbols:school-outline-rounded',
        link    : null,
        children: []
    };
    menuList.push(educational);

    const course: SidebarMenu = {
        name    : 'Courses',
        title   : 'Courses',
        icon    : 'material-symbols:abc-rounded',
        link    : `/users/${userId}/courses`,
        children: []
    };
    menuList.push(course);

    const learningJourney: SidebarMenu = {
        name    : 'Learning-Journeys',
        title   : 'Learning Journeys',
        icon    : 'material-symbols:local-library-outline-rounded',
        link    : `/users/${userId}/learning-journeys`,
        children: []
    };
    menuList.push(learningJourney);

    const knowledgeNugget: SidebarMenu = {
        name    : 'Knowledge-Nuggets',
        title   : 'Knowledge Nuggets',
        icon    : 'material-symbols:assignment-add-outline-rounded',
        link    : `/users/${userId}/knowledge-nuggets`,
        children: []
    };
    menuList.push(knowledgeNugget);

    //................................................................

    const types: SidebarMenu = {
        name    : 'Types',
        title   : 'Types',
        icon    : 'material-symbols:account-tree-outline-rounded',
        link    : null,
        children: []
    };
    menuList.push(types);

    const priority: SidebarMenu = {
        name    : 'Priorities',
        title   : 'Priorities',
        icon    : 'material-symbols:priority-outline',
        link    : `/users/${userId}/priorities`,
        children: []
    };
    menuList.push(priority);

    const goal: SidebarMenu = {
        name    : 'Goals',
        title   : 'Goals',
        icon    : 'material-symbols:radar',
        link    : `/users/${userId}/goals`,
        children: []
    };
    menuList.push(goal);

    //................................................................

    const miscellaneous: SidebarMenu = {
        name    : 'Miscellaneous',
        title   : 'Miscellaneous',
        icon    : 'material-symbols:home-max-dots-outline',
        link    : null,
        children: []
    };
    menuList.push(miscellaneous);

    const organization: SidebarMenu = {
        name    : 'Organizations',
        title   : 'Organizations',
        icon    : 'material-symbols:corporate-fare-rounded',
        link    : `/users/${userId}/organizations`,
        children: []
    };
    menuList.push(organization);

    const cohort: SidebarMenu = {
        name    : 'Cohorts',
        title   : 'Cohorts',
        icon    : 'material-symbols:groups-outline-rounded',
        link    : `/users/${userId}/cohorts`,
        children: []
    };
    menuList.push(cohort);

    const notification: SidebarMenu = {
        name    : 'Notifications',
        title   : 'Notifications',
        icon    : 'material-symbols:notifications-outline-rounded',
        link    : `/users/${userId}/notifications`,
        children: []
    };
    menuList.push(notification);

    const notice: SidebarMenu = {
        name    : 'Notices',
        title   : 'Notices',
        icon    : 'material-symbols:release-alert-outline-rounded',
        link    : `/users/${userId}/notices`,
        children: []
    };
    menuList.push(notice);

    const newsFeed: SidebarMenu = {
        name    : 'Newsfeeds',
        title   : 'News Feeds',
        icon    : 'material-symbols:newsmode-outline-rounded',
        link    : `/users/${userId}/newsfeeds`,
        children: []
    };
    menuList.push(newsFeed);

    //................................................................

    const gamification: SidebarMenu = {
        name    : 'Gamification',
        title   : 'Gamification',
        icon    : 'simple-icons:gamedeveloper',
        link    : null,
        children: []
    };
    menuList.push(gamification);

    const eventType: SidebarMenu = {
        name    : 'Gamification-Event-Types',
        title   : 'Event Types',
        icon    : 'mdi:event-edit',
        link    : `/users/${userId}/gamification/event-types`,
        children: []
    };
    menuList.push(eventType);

    const badgeCategory: SidebarMenu = {
        name    : 'Gamification-Badge-Categories',
        title   : 'Badge Categories',
        icon    : 'octicon:id-badge-16',
        link    : `/users/${userId}/gamification/badge-categories`,
        children: []
    };
    menuList.push(badgeCategory);

    const badge: SidebarMenu = {
        name    : 'Gamification-Badges',
        title   : 'Badges',
        icon    : 'cil:badge',
        link    : `/users/${userId}/gamification/badges`,
        children: []
    };
    menuList.push(badge);

    const schema: SidebarMenu = {
        name    : 'Gamification-Schemas',
        title   : 'Schemas',
        icon    : 'ic:outline-schema',
        link    : `/users/${userId}/gamification/schemas`,
        children: []
    };
    menuList.push(schema);

    //................................................................

    // Add here any new menu items

    return menuList;
}

///////////////////////////////////////////////////////////////////////////////

const getMenu = (menuList, menuName) => {
    const menu = menuList.find(menu => menu.name === menuName);
    return menu;
};

const toNavigation = (menu: SidebarMenu, options: FeatureOptions[]) => {
    const featureOption = options.find(option => option.Name === menu.name);
    const isEnabled = featureOption && featureOption.Enabled;
    if (!isEnabled) {
        return null;
    }
    const navigation: navigation = {
        title: menu.title,
        icon: menu.icon,
    };
    if (menu.link) {
        navigation['link'] = menu.link;
    }
    if (menu.children.length > 0) {
        navigation['childNav'] = [];
        for (const child of menu.children) {
            const childNavigation = toNavigation(child, options);
            if (childNavigation) {
                navigation['childNav'].push(childNavigation);
            }
        }
    }
    return navigation;
};

export const buildSidebarMenu = (userId: string): navigation[] => {
    const menuList: SidebarMenu[] = getMenuList(userId);
    const options: FeatureOptions = getFeatureOptions();

    const sidebarMenu: navigation[] = [];

    const mainDashboard: SidebarMenu = getMenu(menuList, 'Main-Dashboard');
    const mainHome: SidebarMenu = getMenu(menuList, 'Main-Home');
    mainDashboard?.children.push(mainHome);

    const administration: SidebarMenu = getMenu(menuList, 'Administration');
    const clients: SidebarMenu = getMenu(menuList, 'Clients');
    const tenants: SidebarMenu = getMenu(menuList, 'Tenants');
    const personRole: SidebarMenu = getMenu(menuList, 'Person-Role');
    administration?.children.push(clients);
    administration?.children.push(tenants);
    administration?.children.push(personRole);

    const analysis: SidebarMenu = getMenu(menuList, 'Analysis');
    const customQueries: SidebarMenu = getMenu(menuList, 'Custom-Queries');
    analysis?.children.push(customQueries);

    const hospitalSystems: SidebarMenu = getMenu(menuList, 'Hospital-Systems');
    const hospitals: SidebarMenu = getMenu(menuList, 'Hospitals');
    const healthSystems: SidebarMenu = getMenu(menuList, 'Health-Systems');
    hospitalSystems?.children.push(hospitals);
    hospitalSystems?.children.push(healthSystems);

    const clinical: SidebarMenu = getMenu(menuList, 'Clinical');
    const assessments: SidebarMenu = getMenu(menuList, 'Assessments');
    const labRecords: SidebarMenu = getMenu(menuList, 'Lab-Records');
    const symptoms: SidebarMenu = getMenu(menuList, 'Symptoms');
    const drugs: SidebarMenu = getMenu(menuList, 'Drugs');
    clinical?.children.push(assessments);
    clinical?.children.push(labRecords);
    clinical?.children.push(symptoms);
    clinical?.children.push(drugs);

    const careplan: SidebarMenu = getMenu(menuList, 'Careplan');
    const careplanDashboard: SidebarMenu = getMenu(menuList, 'Careplan-Dashboard');
    const careplanAssets: SidebarMenu = getMenu(menuList, 'Careplan-Assets');
    const careplanPlans: SidebarMenu = getMenu(menuList, 'Careplan-Plans');
    const careplanEnrollments: SidebarMenu = getMenu(menuList, 'Careplan-Enrollments');
    careplan?.children.push(careplanDashboard);
    careplan?.children.push(careplanAssets);
    careplan?.children.push(careplanPlans);
    careplan?.children.push(careplanEnrollments);

    const educational: SidebarMenu = getMenu(menuList, 'Educational');
    const courses: SidebarMenu = getMenu(menuList, 'Courses');
    const learningJourneys: SidebarMenu = getMenu(menuList, 'Learning-Journeys');
    const knowledgeNuggets: SidebarMenu = getMenu(menuList, 'Knowledge-Nuggets');
    educational?.children.push(courses);
    educational?.children.push(learningJourneys);
    educational?.children.push(knowledgeNuggets);

    const types: SidebarMenu = getMenu(menuList, 'Types');
    const priorities: SidebarMenu = getMenu(menuList, 'Priorities');
    const goals: SidebarMenu = getMenu(menuList, 'Goals');
    types?.children.push(priorities);
    types?.children.push(goals);

    const miscellaneous: SidebarMenu = getMenu(menuList, 'Miscellaneous');
    const organizations: SidebarMenu = getMenu(menuList, 'Organizations');
    const cohorts: SidebarMenu = getMenu(menuList, 'Cohorts');
    const notifications: SidebarMenu = getMenu(menuList, 'Notifications');
    const notices: SidebarMenu = getMenu(menuList, 'Notices');
    const newsfeeds: SidebarMenu = getMenu(menuList, 'Newsfeeds');
    miscellaneous?.children.push(organizations);
    miscellaneous?.children.push(cohorts);
    miscellaneous?.children.push(notifications);
    miscellaneous?.children.push(notices);
    miscellaneous?.children.push(newsfeeds);

    const gamification: SidebarMenu = getMenu(menuList, 'Gamification');
    const eventTypes: SidebarMenu = getMenu(menuList, 'Gamification-Event-Types');
    const badgeCategories: SidebarMenu = getMenu(menuList, 'Gamification-Badge-Categories');
    const badges: SidebarMenu = getMenu(menuList, 'Gamification-Badges');
    const schemas: SidebarMenu = getMenu(menuList, 'Gamification-Schemas');
    gamification?.children.push(eventTypes);
    gamification?.children.push(badgeCategories);
    gamification?.children.push(badges);
    gamification?.children.push(schemas);

    // Now construct navigation based on options

    const mainDashboardNavigation: navigation | null = toNavigation(mainDashboard, options);
    if (mainDashboardNavigation) {
        sidebarMenu.push(mainDashboardNavigation);
    }

    const administrationNavigation: navigation | null = toNavigation(administration, options);
    if (administrationNavigation) {
        sidebarMenu.push(administrationNavigation);
    }

    const analysisNavigation: navigation | null = toNavigation(analysis, options);
    if (analysisNavigation) {
        sidebarMenu.push(analysisNavigation);
    }

    const hospitalSystemsNavigation: navigation | null = toNavigation(hospitalSystems, options);
    if (hospitalSystemsNavigation) {
        sidebarMenu.push(hospitalSystemsNavigation);
    }

    const clinicalNavigation: navigation | null = toNavigation(clinical, options);
    if (clinicalNavigation) {
        sidebarMenu.push(clinicalNavigation);
    }

    const careplanNavigation: navigation | null = toNavigation(careplan, options);
    if (careplanNavigation) {
        sidebarMenu.push(careplanNavigation);
    }

    const educationalNavigation: navigation | null = toNavigation(educational, options);
    if (educationalNavigation) {
        sidebarMenu.push(educationalNavigation);
    }

    const typesNavigation: navigation | null = toNavigation(types, options);
    if (typesNavigation) {
        sidebarMenu.push(typesNavigation);
    }

    const miscellaneousNavigation: navigation | null = toNavigation(miscellaneous, options);
    if (miscellaneousNavigation) {
        sidebarMenu.push(miscellaneousNavigation);
    }

    const gamificationNavigation: navigation | null = toNavigation(gamification, options);
    if (gamificationNavigation) {
        sidebarMenu.push(gamificationNavigation);
    }

    // Add here any new menu items

    console.log('sidebarMenu', sidebarMenu);

    return sidebarMenu;
};

///////////////////////////////////////////////////////////////////////////////
