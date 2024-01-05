<script lang="ts">
    import { navigating, page } from '$app/stores';
    import Icon from '@iconify/svelte';
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    import { buildSidebarMenu } from '$lib/components/navbar/sidebar.menus';

    export let userId = undefined;
    export let showSidebar = false;

    const navData = buildSidebarMenu(userId);
    console.log('navData', JSON.stringify(navData, null, 2));

    $: if ($navigating) showSidebar = false;
</script>

<div
    class="w-72 bg-secondary-50 dark:bg-surface-900 border-r border-r-surface-200 dark:border-r-surface-700 h-full pt-4
	{showSidebar ? 'max-md:fixed z-10' : 'hidden'} md:block transition-all"
>
    <Accordion
        width="w-[280px]"
        autocollapse:false
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
                            {:else if navItem.childNav}
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
                                                {#each navItem.childNav as childItem}
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
