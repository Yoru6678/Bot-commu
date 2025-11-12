# Sora Community Bot

## Overview

Sora is a comprehensive Discord community bot built with Discord.js v14 that provides an engaging server experience through XP progression, virtual economy, mini-games, and social interactions. The bot tracks user activity through messages and voice participation, rewards engagement with levels and virtual currency, and offers entertainment features to build community interaction.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Core Technology Stack

**Runtime & Framework:**
- Node.js (v18.0.0+) as the JavaScript runtime
- Discord.js v14.14.1 for Discord API integration
- Better-SQLite3 v8.4.0 for embedded database storage

**Supporting Libraries:**
- dotenv for environment configuration
- axios for HTTP requests (meme API integration)
- ms for time duration parsing

### Application Structure

**Command Architecture:**
The bot uses a prefix-based command system (default prefix: `+`) organized into distinct categories:
- `commands/fun/` - Entertainment commands (memes, 8ball, polls)
- `commands/games/` - Mini-games (rock-paper-scissors, dice rolling)
- `commands/profile/` - User profile and statistics
- `commands/social/` - Social interactions (hugs, kisses, reputation)
- `commands/utility/` - Server and user information utilities

Commands are dynamically loaded at startup and stored in a Collection for fast lookup. Each command includes cooldown management to prevent spam.

**Event-Driven Processing:**
The bot implements Discord.js event handlers in `src/events/`:
- `messageCreate.js` - Processes messages, handles XP gains, manages AFK status, and routes commands
- `ready.js` - Initializes bot presence and starts background systems
- `voiceStateUpdate.js` - Tracks voice channel join/leave events for time tracking

**Background Systems:**
- Voice XP Tracker (`src/systems/voiceTracker.js`) - Runs every 5 minutes to award XP to active voice participants
- XP gain has configurable min/max ranges and cooldown periods to prevent farming

### Data Architecture

**Database Schema:**
Uses Better-SQLite3 for local storage with the following core tables:

1. **users** - Central user data table storing:
   - Composite key: `user_id` (formatted as `userId-guildId`)
   - XP, level, and progression tracking
   - Economy data (handled separately but referenced here)
   - Social features (bio, reputation, marriage status)
   - Activity metrics (message count, voice time)
   - AFK status and reason

2. **guild_config** - Per-server configuration:
   - Leveling system enable/disable
   - XP multipliers
   - Custom level-up messages and channels
   - Role rewards (stored as JSON)

3. **marriages** - Tracks user marriage relationships
4. **voice_sessions** - Temporary tracking of ongoing voice sessions

**Database Layer (`src/database.js`):**
Implements a Database class wrapper providing:
- User CRUD operations (getUser, updateUser, addXP)
- Guild configuration management
- Leaderboard queries with different sorting options (XP, vocal time, messages, reputation)
- Rank calculation for individual users
- Automatic directory creation for database file

### XP & Leveling System

**XP Acquisition:**
- Text messages: Random amount between configurable min/max (default 15-25 XP) with 60-second cooldown per user
- Voice participation: Random amount between configurable min/max (default 20-30 XP) awarded every 5 minutes to active, unmuted users

**Level Calculation:**
Uses quadratic formula: `XP required for level N = N² × 100`

**Rewards System:**
Predefined level milestones (5, 10, 20, 30, 50) grant bonus coins from the economy system.

### Configuration Management

Environment-based configuration (`src/config.js`) with fallback defaults:
- Command prefix
- Bot owner ID
- Embed colors
- XP ranges and cooldowns
- Economy parameters
- Level reward tiers

All values can be overridden via environment variables for easy deployment customization.

### Command Cooldown System

Implements per-user, per-command cooldowns using Map collections:
- Cooldowns stored in memory (reset on bot restart)
- Default 3-second cooldown unless specified in command definition
- User-friendly error messages showing time remaining

### Utility Layer

**Embed Builder (`src/utils/embed.js`):**
Provides consistent embed creation with:
- Standard color scheme
- Timestamp inclusion
- Specialized builders for success/error messages
- Progress bar generator for visual XP display

## External Dependencies

### Third-Party Services

**Meme API Integration:**
- Service: meme-api.com
- Endpoint: `https://meme-api.com/gimme`
- Purpose: Fetches random memes from Reddit
- Usage: `+meme` command
- No authentication required

### Discord Platform

**Required Bot Permissions:**
- Read Messages/View Channels
- Send Messages
- Embed Links
- Add Reactions (for polls)
- Read Message History
- Use External Emojis
- Connect to Voice Channels (for tracking)
- View Voice Channel Members

**Gateway Intents:**
- Guilds
- GuildMembers
- GuildMessages
- MessageContent (privileged intent)
- GuildVoiceStates
- GuildPresences (for activity tracking)

### Database

**Better-SQLite3:**
- Embedded SQLite database (no external server required)
- Synchronous API for simplified error handling
- Database file stored in `data/sora.db`
- Automatic schema initialization on first run
- No migration system implemented (schema changes require manual handling)

### Environment Variables Required

```
DISCORD_TOKEN=<bot_token>
PREFIX=+ (optional, defaults to +)
OWNER_ID=<discord_user_id> (optional)
EMBED_COLOR=#7289DA (optional)
```

Optional XP/Economy tuning variables available but not required for basic operation.