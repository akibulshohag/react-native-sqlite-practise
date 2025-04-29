const config = {
    screens: {
        HomeStackScreens: {
            screens: {
                ProductDetails: 'brand/:m_id/:slug?',
            },
        },
    },
};

const linking = {
    prefixes: ['arogga://', 'https://www.arogga.com/', 'https://m.arogga.com/'],
    config,
};
export default linking;
