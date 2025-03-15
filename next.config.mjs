export default {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/index.html",
        permanent: false, // Temporary redirect
      },
    ];
  },
};
