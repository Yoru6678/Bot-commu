const { loadEnvironment } = require('./envLoader');
const HarukaClient = require('./client');
const SecurityAudit = require('../security/securityAudit');
const logger = require('../utils/logger');

console.log(`\nHARUKA PROTECT - STARTING\n`);

(async () => {
    try {
        loadEnvironment();

        if (process.env.SECURITY_AUDIT_ON_START === 'true') {
            logger.info('Running security audit...');
            const audit = new SecurityAudit();
            const result = await audit.runFullAudit();
            if (!result.safe && process.env.SECURITY_BLOCK_ON_VULNERABILITIES === 'true') {
                logger.error('Startup blocked due to vulnerabilities');
                process.exit(1);
            }
        }

        const client = new HarukaClient();
        await client.start();

    } catch (error) {
        logger.error('Fatal error on startup:', error);
        process.exit(1);
    }
})();

process.on('unhandledRejection', (err) => logger.error('Unhandled Rejection:', err));
process.on('uncaughtException', (err) => { logger.error('Uncaught Exception:', err); process.exit(1); });
