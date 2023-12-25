import { SystemTypes } from '../system.types';
import { FeatureOptions as AHAFeatureOptions } from './aha.options';
import { FeatureOptions as REANFeatureOptions } from './rean.options';
import { SYSTEM_ID } from '../constants';

//////////////////////////////////////////////////////////////////////////////

export const getFeatureOptions = () => {
    const systemType: SystemTypes = SYSTEM_ID as SystemTypes;
    switch (systemType as SystemTypes) {
        case SystemTypes.REAN:
            return REANFeatureOptions;
        case SystemTypes.AHA:
            return AHAFeatureOptions;
        default:
            return REANFeatureOptions;
    }
};
