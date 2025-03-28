/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: process.env.UI_BASE_PATH || '',
};

nextConfig.experimental = {
    missingSuspenseWithCSRBailout: false
}

export default nextConfig;
