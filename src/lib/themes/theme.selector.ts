import { SystemTypes } from '../system.types';

// AHA Theme imports
import { ThemeColors as AHAThemeColors } from './aha.theme';
import { ThemeDarkColor as AHAThemeDarkColor } from './aha.theme';
import { ChartColors as AHAChartColors } from './aha.theme';
import { HoverChartColors as AHAHoverChartColors } from './aha.theme';
import { TickColorLight as AHATickColorLight } from './aha.theme';
import { TickColorDark as AHATickColorDark } from './aha.theme';
import { PUBLIC_LOGO_IMAGE_SOURCE as AHA_PUBLIC_LOGO_IMAGE_SOURCE } from './aha.theme';
import { PUBLIC_FOOTER_TEXT as AHA_PUBLIC_FOOTER_TEXT } from './aha.theme';
import { PUBLIC_FOOTER_LINK as AHA_PUBLIC_FOOTER_LINK } from './aha.theme';
import { SYSTEM_NAME as AHA_SYSTEM_NAME } from './aha.theme';

// REAN Theme imports
import { ThemeColors as REANThemeColors } from './rean.theme';
import { ChartColors as REANChartColors } from './rean.theme';
import { HoverChartColors as REANHoverChartColors } from './rean.theme';
import { TickColorLight as REANTickColorLight } from './rean.theme';
import { TickColorDark as REANTickColorDark } from './rean.theme';
import { ThemeDarkColor as REANThemeDarkColor } from './rean.theme';
import { PUBLIC_LOGO_IMAGE_SOURCE as REAN_PUBLIC_LOGO_IMAGE_SOURCE } from './rean.theme';
import { PUBLIC_FOOTER_TEXT as REAN_PUBLIC_FOOTER_TEXT } from './rean.theme';
import { PUBLIC_FOOTER_LINK as REAN_PUBLIC_FOOTER_LINK } from './rean.theme';
import { SYSTEM_NAME as REAN_SYSTEM_NAME } from './rean.theme';

import { SYSTEM_ID } from '../constants';

//////////////////////////////////////////////////////////////////////////////

export const getThemeColors = () => {
    const systemType: SystemTypes = SYSTEM_ID as SystemTypes;
    switch (systemType as SystemTypes) {
        case SystemTypes.REAN:
            return REANThemeColors;
        case SystemTypes.AHA:
            return AHAThemeColors;
        default:
            return REANThemeColors;
    }
};

export const getChartColors = () => {
    const systemType: SystemTypes = SYSTEM_ID as SystemTypes;
    switch (systemType as SystemTypes) {
        case SystemTypes.REAN:
            return REANChartColors;
        case SystemTypes.AHA:
            return AHAChartColors;
        default:
            return REANChartColors;
    }
};

export const getHoverChartColors = () => {
    const systemType: SystemTypes = SYSTEM_ID as SystemTypes;
    switch (systemType as SystemTypes) {
        case SystemTypes.REAN:
            return REANHoverChartColors;
        case SystemTypes.AHA:
            return AHAHoverChartColors;
        default:
            return REANHoverChartColors;
    }
};

export const getTickColorLight = () => {
    const systemType: SystemTypes = SYSTEM_ID as SystemTypes;
    switch (systemType as SystemTypes) {
        case SystemTypes.REAN:
            return REANTickColorLight;
        case SystemTypes.AHA:
            return AHATickColorLight;
        default:
            return REANTickColorLight;
    }
};

export const getTickColorDark = () => {
    const systemType: SystemTypes = SYSTEM_ID as SystemTypes;
    switch (systemType as SystemTypes) {
        case SystemTypes.REAN:
            return REANTickColorDark;
        case SystemTypes.AHA:
            return AHATickColorDark;
        default:
            return REANTickColorDark;
    }
};

export const getThemeDarkColor = () => {
    const systemType: SystemTypes = SYSTEM_ID as SystemTypes;
    switch (systemType as SystemTypes) {
        case SystemTypes.REAN:
            return REANThemeDarkColor;
        case SystemTypes.AHA:
            return AHAThemeDarkColor;
        default:
            return REANThemeDarkColor;
    }
};

export const getPublicLogoImageSource = () => {
    const systemType: SystemTypes = SYSTEM_ID as SystemTypes;
    switch (systemType as SystemTypes) {
        case SystemTypes.REAN:
            return REAN_PUBLIC_LOGO_IMAGE_SOURCE;
        case SystemTypes.AHA:
            return AHA_PUBLIC_LOGO_IMAGE_SOURCE;
        default:
            return REAN_PUBLIC_LOGO_IMAGE_SOURCE;
    }
};

export const getPublicFooterText = () => {
    const systemType: SystemTypes = SYSTEM_ID as SystemTypes;
    switch (systemType as SystemTypes) {
        case SystemTypes.REAN:
            return REAN_PUBLIC_FOOTER_TEXT;
        case SystemTypes.AHA:
            return AHA_PUBLIC_FOOTER_TEXT;
        default:
            return REAN_PUBLIC_FOOTER_TEXT;
    }
};

export const getPublicFooterLink = () => {
    const systemType: SystemTypes = SYSTEM_ID as SystemTypes;
    switch (systemType as SystemTypes) {
        case SystemTypes.REAN:
            return REAN_PUBLIC_FOOTER_LINK;
        case SystemTypes.AHA:
            return AHA_PUBLIC_FOOTER_LINK;
        default:
            return REAN_PUBLIC_FOOTER_LINK;
    }
};

export const getSystemName = () => {
    const systemType: SystemTypes = SYSTEM_ID as SystemTypes;
    switch (systemType as SystemTypes) {
        case SystemTypes.REAN:
            return REAN_SYSTEM_NAME;
        case SystemTypes.AHA:
            return AHA_SYSTEM_NAME;
        default:
            return REAN_SYSTEM_NAME;
    }
};
