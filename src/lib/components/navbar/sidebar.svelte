<script lang="ts">
    import { navigating, page } from '$app/stores';
    import Icon from '@iconify/svelte';
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

    export let userId = undefined;
    export let showSidebar = false;

    const navData = [
        {
            title: 'Dashboard',
            icon: 'material-symbols:dashboard-outline-rounded',
            childNav: [
                {
                    icon: '/rean-logo-white.png',
                    title: 'RHG App',
                    link: `/users/${userId}/home`
                }
                // {
                // 	icon: '/rean-logo-white.png',
                // 	title: 'RHG Bot',
                // 	link: `/users/${userId}/bot-stats`
                // }
            ]
        },
        {
            title: 'Hospitals Systems',
            icon: 'material-symbols:account-tree-outline-rounded',
            childNav: [
                {
                    title: 'Hospitals',
                    icon: 'material-symbols:local-hospital-outline-rounded',
                    link: `/users/${userId}/hospitals`
                },
                {
                    title: 'Health Systems',
                    icon: 'material-symbols:health-and-safety-outline-rounded',
                    link: `/users/${userId}/health-systems`
                }
            ]
        },
        {
            title: 'Clinical',
            icon: 'material-symbols:medical-services-outline-rounded',
            childNav: [
                {
                    icon: 'material-symbols:assignment-outline-rounded',
                    title: 'Assessments',
                    link: `/users/${userId}/assessment-templates`
                },
                {
                    icon: 'material-symbols:lab-research-outline-rounded',
                    title: 'Lab-Records',
                    link: `/users/${userId}/lab-record-types`
                },
                {
                    icon: 'material-symbols:symptoms-outline',
                    title: 'Symptoms',
                    link: `/users/${userId}/symptoms`
                },
                {
                    icon: 'material-symbols:pill-outline',
                    title: 'Drugs',
                    link: `/users/${userId}/drugs`
                },
                {
                    icon: 'material-symbols:home-health-outline-rounded',
                    title: 'Careplan',
                    children: [
                        {
                            icon: 'material-symbols:dashboard-outline-rounded',
                            title: 'Dashboard',
                            link: `/users/${userId}/careplan`
                        },
                        {
                            icon: 'carbon:task-asset-view',
                            title: 'Assets',
                            link: `/users/${userId}/careplan/assets`
                        },
                        {
                            icon: 'iconoir:healthcare',
                            title: 'Careplans',
                            link: `/users/${userId}/careplan/careplans`
                        },
                        {
                            icon: 'material-symbols:check-box-outline-rounded',
                            title: 'Enrollments',
                            link: `/users/${userId}/careplan/enrollments`
                        }
                    ]
                }
            ]
        },
        {
            title: 'Educational',
            icon: 'material-symbols:school-outline-rounded',
            childNav: [
                {
                    icon: 'material-symbols:abc-rounded',
                    title: 'Courses',
                    link: `/users/${userId}/courses`
                },
                {
                    icon: 'material-symbols:local-library-outline-rounded',
                    title: 'Learning Journeys',
                    link: `/users/${userId}/learning-journeys`
                },
                {
                    icon: 'material-symbols:assignment-add-outline-rounded',
                    title: 'Knowledge Nuggets',
                    link: `/users/${userId}/knowledge-nuggets`
                }
            ]
        },
        {
            title: 'Types',
            icon: 'material-symbols:account-tree-outline-rounded',
            childNav: [
                {
                    icon: 'material-symbols:person-search-outline-rounded',
                    title: 'Person Role',
                    link: `/users/${userId}/person-role-types`
                },
                {
                    icon: 'material-symbols:priority-outline',
                    title: 'Priorities',
                    link: `/users/${userId}/priorities`
                },
                {
                    icon: 'material-symbols:radar',
                    title: 'Goals',
                    link: `/users/${userId}/goals`
                }
            ]
        },
        {
            title: 'Miscellaneous',
            icon: 'material-symbols:home-max-dots-outline',
            childNav: [
                {
                    icon: 'material-symbols:frame-person-outline-rounded',
                    title: 'Clients',
                    link: `/users/${userId}/api-clients`
                },
                {
                    icon: 'material-symbols:corporate-fare-rounded',
                    title: 'Organizations',
                    link: `/users/${userId}/organizations`
                },
                {
                    icon: 'material-symbols:notifications-outline-rounded',
                    title: 'Notifications',
                    link: `/users/${userId}/notifications`
                },
                {
                    icon: 'material-symbols:newsmode-outline-rounded',
                    title: 'News Feed',
                    link: `/users/${userId}/newsfeeds`
                },
                {
                    icon: 'material-symbols:release-alert-outline-rounded',
                    title: 'Notices',
                    link: `/users/${userId}/notices`
                },
                {
                    icon: 'material-symbols:database-outline',
                    title: 'Custom Queries',
                    link: `/users/${userId}/custom-queries`
                },
                {
                    icon: 'material-symbols:tenancy-outline',
                    title: 'Tenants',
                    link: `/users/${userId}/tenants`
                },
                {
                    icon: 'material-symbols:groups-outline-rounded',
                    title: 'Cohorts',
                    link: `/users/${userId}/cohorts`
                }
            ]
        },
        {
            title: 'Gamification',
            icon: 'simple-icons:gamedeveloper',
            childNav: [
                {
                    icon: 'mdi:event-edit',
                    title: 'Event Types',
                    link: `/users/${userId}/gamification/event-types`
                },
                {
                    icon: 'octicon:id-badge-16',
                    title: 'Badge Categories',
                    link: `/users/${userId}/gamification/badge-categories`
                },
                {
                    icon: 'cil:badge',
                    title: 'Badges',
                    link: `/users/${userId}/gamification/badges`
                },
                {
                    icon: 'ic:outline-schema',
                    title: 'Schemas',
                    link: `/users/${userId}/gamification/schemas`
                }
            ]
        }
    ];

    $: if ($navigating) showSidebar = false;
</script>

<div
    class="w-72 bg-secondary-50 dark:bg-surface-900 border-r border-r-surface-200 dark:border-r-surface-700 h-full pt-4
	{showSidebar ? 'max-md:fixed z-10' : 'hidden'} md:block transition-all"
>
    <Accordion
        width="w-[280px]"
        autocollapse
        rounded="rounded-none"
    >
        {#each navData as navParent, idx}
            <AccordionItem open={idx === 0}>
                <svelte:fragment slot="lead">
                    <Icon
                        icon={navParent.icon}
                        class="text-2xl"
                    />
                </svelte:fragment>
                <svelte:fragment slot="summary">{navParent.title}</svelte:fragment>
                <svelte:fragment slot="content">
                    <nav class="list-nav space-y-1">
                        {#each navParent.childNav as navItem}
                            <!-- if no navItem.link but navItem.child -->
                            {#if navItem.link}
                                <a
                                    href={navItem.link}
                                    class:!variant-soft-secondary={$page.url.pathname === navItem.link}
                                >
                                    {#if navItem.icon.endsWith('.png')}
                                        <img
                                            src={navItem.icon}
                                            alt=""
                                            class="invert dark:filter-none w-6 h-6"
                                        />
                                    {:else}
                                        <Icon
                                            icon={$page.url.pathname === navItem.link
                                                ? navItem.icon.replace('-outline', '')
                                                : navItem.icon}
                                            class="text-2xl"
                                        />
                                    {/if}
                                    <span>{navItem.title}</span>
                                </a>
                            {:else if navItem.children}
                                <Accordion>
                                    <AccordionItem>
                                        <svelte:fragment slot="lead">
                                            <Icon
                                                icon={navItem.icon}
                                                class="text-2xl"
                                            />
                                        </svelte:fragment>
                                        <svelte:fragment slot="summary">
                                            {navItem.title}
                                        </svelte:fragment>
                                        <svelte:fragment slot="content">
                                            <nav class="list-nav space-y-1">
                                                {#each navItem.children as childItem}
                                                    <a
                                                        href={childItem.link}
                                                        class:!variant-soft-secondary={$page.url.pathname ===
                                                            childItem.link}
                                                    >
                                                        <Icon
                                                            icon={$page.url.pathname === childItem.link
                                                                ? childItem.icon.replace('-outline', '')
                                                                : childItem.icon}
                                                            class="text-2xl"
                                                        />
                                                        <span>{childItem.title}</span>
                                                    </a>
                                                {/each}
                                            </nav>
                                        </svelte:fragment>
                                    </AccordionItem>
                                </Accordion>
                            {/if}
                        {/each}
                    </nav>
                </svelte:fragment>
            </AccordionItem>
        {/each}
    </Accordion>
</div>
