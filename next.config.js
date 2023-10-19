// const withImages = require('next-images');

// const redirects = {
//   async redirects() {
//     return [
//       {
//         source: '/dashboards',
//         destination: '/dashboards/tasks',
//         permanent: true
//       }
//     ];
//   }
// };

// module.exports = withImages(redirects);

// import CompressionPlugin from "compression-webpack-plugin";
// const CompressionPlugin = require('compression-webpack-plugin');
// const BrotliPlugin = require('brotli-webpack-plugin');
// const zlib = require("zlib");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config => {
      node = {
        fs: 'empty',
        child_process: 'empty',
        net: 'empty',
        dns: 'empty',
        tls: 'empty',
      };
    }
    // config.plugins.push(new CompressionPlugin(
    //   {
    //     filename: "[path][base].br",
    //     algorithm: "brotliCompress",
    //     test: /\.(js|css|html|svg)$/,
    //     compressionOptions: {
    //       params: {
    //         [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
    //       },
    //     },
    //     threshold: 10240,
    //     minRatio: 0.8,
    //   }
    // ))
    // config.plugins.push(new CompressionPlugin(
    //   {
    //     filename: "[path][base].gz",
    //     algorithm: "gzip",
    //     test: /\.js$|\.css$|\.html$/,
    //     threshold: 10240,
    //     minRatio: 0.8,
    //     // 
    //   }
    // ))

    return config
  },
}

module.exports = nextConfig