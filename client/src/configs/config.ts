const config = {
    API_URL: import.meta.env.VITE_REACT_APP_API_URL,
    API_VERSION: 'v1',
    getAPIURL: function () {
        return `${this.API_URL}/${this.API_VERSION}`;
    }
};
export default config;