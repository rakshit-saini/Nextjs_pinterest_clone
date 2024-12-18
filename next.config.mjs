/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname:"res.cloudinary.com",
                port: "",
                pathname:"/dvqfmvjij/**"
            },
            {
                protocol: "https",
                hostname:"lh3.googleusercontent.com",
                port: "",
                pathname:"/a/**"
            },
        ]
    }
};

export default nextConfig;
