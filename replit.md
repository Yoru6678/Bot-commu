# Haruka Protect (Nami Bot) - Discord Moderation Bot

## Overview

Haruka Protect (also known as Nami Bot) is a professional Discord moderation bot built with Discord.js v14. The bot provides comprehensive server management, moderation tools, security features, and real-time server statistics displayed via voice channel names. It's designed with security-first principles, including role hierarchy validation, anti-raid/anti-spam protection, and automated security auditing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Core Framework
- **Runtime**: Node.js 18+ with Discord.js v14
- **Command Architecture**: Message-based prefix commands (default prefix: `+`)
- **Event System**: Centralized event handling with category-based organization
- **Client Pattern**: Custom `HarukaClient` extending Discord.js Client with built-in command collections, cooldown management, and logger integration

### Database Layer
- **Primary Database**: SQLite via `better-sqlite3` for local persistence
- **Schema**: Three main tables:
  - `sanctions`: Moderation action records (bans, kicks, mutes)
  - `tickets`: Support ticket tracking
  - `user_data`: User profile data for GDPR compliance
- **Additional Storage**: File-based JSON storage for warning system (`src/database/warns/`)
- **Data Location**: Configurable via `SQLITE_PATH` environment variable (default: `./data/haruka.db`)

### Security Architecture

#### Multi-Layer Protection
1. **Permission Validation**: Hierarchical permission checks before any moderation action
   - Owner protection (bot owner cannot be moderated)
   - Guild owner protection
   - Role hierarchy enforcement (executor must outrank target)
   - Bot permission validation (bot must outrank target)

2. **Anti-Abuse Systems**:
   - **AntiSpam**: Message frequency tracking per user (configurable threshold/timeframe)
   - **AntiRaid**: Join rate monitoring with guild-level thresholds
   - **AntiBot**: Automated bot join detection with optional auto-kick
   - **RoleProtector**: Role modification monitoring
   - **MemberProtector**: VIP member protection against unwanted changes

3. **Security Auditing**:
   - Startup security audit system (`securityAudit.js`)
   - Scans for hardcoded secrets in codebase
   - Validates environment variables
   - Checks file structure integrity
   - Dependency vulnerability scanning
   - Optional blocking on detected vulnerabilities

#### Environment Security
- All sensitive data (tokens, IDs) stored in environment variables
- No secrets in source code (enforced via security audit)
- `.env` support with fallback to system environment

### Command System

#### Command Structure
- **Category-based organization**: Commands grouped by function (moderation, utility, information, system, administration)
- **Handler Architecture**: Dynamic command loading from filesystem
- **Alias Support**: Commands can have multiple trigger aliases
- **Cooldown System**: Per-user, per-command rate limiting

#### Command Categories
1. **Moderation**: ban, kick, mute, warn, clear, lock-channel, unlock, slowmode
2. **Utility**: help, ping, stats, uptime, calc, avatar, ticket
3. **Information**: serverinfo, userinfo, profile
4. **System** (Owner-only): reload, shutdown
5. **Administration**: setup-stats (creates stat display channels)

### Background Jobs

#### Stats Voice Updater
- **Purpose**: Automatically updates voice channel names to display live server statistics
- **Update Interval**: Configurable (default: 5 minutes)
- **Supported Stats**:
  - Total members count
  - Online members count (requires Presence intent)
  - Voice channel occupancy
- **Channels**: Supports separate voice channels for each stat type
- **Trigger Events**: Auto-updates on member join/leave, presence changes, voice state changes

### Logging System
- **Library**: Winston logger with file and console transports
- **Log Levels**: Configurable via `LOG_LEVEL` environment variable
- **Output**:
  - Console output for real-time monitoring
  - `logs/combined.log`: All log entries
  - `logs/error.log`: Error-level entries only
- **Custom Methods**: `logger.success()` and `logger.command()` for semantic logging

### Event Handling
- **Event Categories**: Organized by source (client, guild, message)
- **Key Events**:
  - `ready`: Bot initialization and presence setting
  - `messageCreate`: Command parsing and execution
  - `interactionCreate`: Button interactions (tickets, profile management)
  - `guildMemberAdd/Remove`: Auto-trigger stats updates
  - `presenceUpdate`: Online count updates
  - `voiceStateUpdate`: Voice count updates

### Interaction Features

#### Ticket System
- Button-based ticket creation
- Private channel generation with user-specific permissions
- Database tracking of ticket state
- Close button for staff

#### Profile Management
- User profile display with avatar, join dates, role count
- "Delete my data" button for GDPR compliance
- Database cleanup on profile deletion

### Configuration Management
- **Config File**: `src/config/config.js` centralizes all configuration
- **Environment Variables**: All runtime config via env vars
- **Defaults**: Sensible fallbacks for all optional settings
- **Dynamic Loading**: Config attached to client instance for global access

## External Dependencies

### NPM Packages
- **discord.js** (^14.14.1): Core Discord API wrapper
- **dotenv** (^16.3.1): Environment variable management
- **better-sqlite3** (^8.4.0): Synchronous SQLite database driver
- **sqlite3** (^5.1.6): Alternative SQLite driver (backup)
- **winston** (^3.9.0): Logging framework

### Development Dependencies
- **eslint** (^8.55.0): Code linting
- **jest** (^29.7.0): Testing framework
- **nodemon** (^3.0.2): Development auto-reload

### Discord API Requirements
- **Required Intents**:
  - Guilds
  - GuildMembers
  - GuildMessages
  - MessageContent
  - GuildMessageReactions
  - GuildPresences (for online count accuracy)
  - GuildVoiceStates (for voice count tracking)

- **Required Bot Permissions**:
  - MANAGE_CHANNELS (for stats updates and channel locking)
  - BAN_MEMBERS (for ban command)
  - KICK_MEMBERS (for kick command)
  - MODERATE_MEMBERS (for mute/timeout)
  - MANAGE_MESSAGES (for clear command)
  - VIEW_CHANNEL, SEND_MESSAGES (basic operation)

### Platform Support
- **Replit**: Full support with documented deployment guide (`README_REPLIT.md`)
- **Local Development**: Standard Node.js execution
- **Environment**: Requires Node.js >= 18.0.0

### External Services
- **Discord Developer Portal**: Bot token and application management
- **Optional**: UptimeRobot or similar for keeping bot alive on free hosting tiers