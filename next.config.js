
// next.config.js
// module.exports = {
 
//   images: {
//     domains: ['www.teleiosdome.com'],
//   },

// };
// reactStrictMode: true,
// output: 'standalone', 

// distDir:'build',
// output: 'export', 


// module.exports = {
//   reactStrictMode: true,
//   output: 'export',  // Produces static HTML pages with CSR
// };


module.exports = {
  reactStrictMode: true,
  // output: 'export',
  trailingSlash: true,

  images: {
    unoptimized: true,
    domains: ['192.168.70.234'], 
    

  },

  async headers() {
    return [
      {
        source: '/assets/video/dome.webm',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

};
