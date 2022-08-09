module.exports = {
    apps: [
        {
            name: 'ArcSpyt+',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
            env: {
                PORT: 3999,
                NODE_ENV: "development",
                NITRO_PORT: 3999,
                NITRO_HOST: "127.0.0.1",
            },
            env_production: {
                PORT: 3999,
                NODE_ENV: "production",
                NITRO_PORT: 3999,
                NITRO_HOST: "127.0.0.1",
            }
        }
    ]
}