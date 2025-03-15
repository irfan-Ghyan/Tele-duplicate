

module.exports = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
 

  images: {
    unoptimized: true,
    // domains: ['https://api.teleiosx.com'], 
    domains: ['https://dev.teleiosx.com/'], 
  },

  // async headers() {
  //   return [
  //     {
  //       source: '/assets/video/dome.webm',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=31536000, immutable',
  //         },
  //       ],
  //     },
  //   ];
  // },

};


