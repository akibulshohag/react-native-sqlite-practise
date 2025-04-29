// constants

export const APP_NAME = 'Premium Homes';
export const TEL_NUMBER = '01789088779';
export const REVERSE_GEO_CODING_KEY = ''; //Not using locationiq anymore
export const GOOGLE_PLACE_API_KEY = '';
export const GOOGLE_PLACE_API_URL =
    'https://maps.googleapis.com/maps/api/place';

const checkConfig = server => {
    let config = {};
    switch (server) {
        case 'production':
            config = {
                apiBaseUrl: 'https://api.arogga.com',
                websiteBaseUrl: 'https://m.arogga.com',
                labTestApiBaseUrl: 'https://lab.arogga.com',
                mixPanelToken: '574dda9385cbe4912b1cd17b0f9812d8',
                clarityKey: 'omhuqnn7hb',
            };
            break;
        case 'staging':
            config = {
                apiBaseUrl: 'https://ss.arogga.net/api/team-master-4',
                websiteBaseUrl: 'https://stg2.arogga.net',
                labTestApiBaseUrl: 'https://stg2.arogga.net',
                mixPanelToken: '930c432eb7775d66207544440be515fd',
            };
            break;
        default:
            break;
    }
    return config;
};

// export const selectServer = 'staging';
export const selectServer = 'production';

export const config = checkConfig(selectServer);
