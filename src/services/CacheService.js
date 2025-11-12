class CacheService {
    constructor() {
        this.deletedMessages = new Map();
        this.editedMessages = new Map();
        this.maxCacheSize = 100;
        this.cacheExpiry = 300000;
    }

    cacheDeletedMessage(message) {
        const key = message.channel.id;
        this.deletedMessages.set(key, {
            content: message.content,
            author: message.author,
            createdAt: message.createdAt,
            attachments: Array.from(message.attachments.values()),
            timestamp: Date.now()
        });

        if (this.deletedMessages.size > this.maxCacheSize) {
            const firstKey = this.deletedMessages.keys().next().value;
            this.deletedMessages.delete(firstKey);
        }

        setTimeout(() => {
            const cached = this.deletedMessages.get(key);
            if (cached && Date.now() - cached.timestamp >= this.cacheExpiry) {
                this.deletedMessages.delete(key);
            }
        }, this.cacheExpiry);
    }

    cacheEditedMessage(oldMessage, newMessage) {
        const key = newMessage.channel.id;
        this.editedMessages.set(key, {
            oldContent: oldMessage.content,
            newContent: newMessage.content,
            author: newMessage.author,
            editedAt: new Date(),
            timestamp: Date.now()
        });

        if (this.editedMessages.size > this.maxCacheSize) {
            const firstKey = this.editedMessages.keys().next().value;
            this.editedMessages.delete(firstKey);
        }

        setTimeout(() => {
            const cached = this.editedMessages.get(key);
            if (cached && Date.now() - cached.timestamp >= this.cacheExpiry) {
                this.editedMessages.delete(key);
            }
        }, this.cacheExpiry);
    }

    getDeletedMessage(channelId) {
        return this.deletedMessages.get(channelId);
    }

    getEditedMessage(channelId) {
        return this.editedMessages.get(channelId);
    }

    clearChannel(channelId) {
        this.deletedMessages.delete(channelId);
        this.editedMessages.delete(channelId);
    }
}

module.exports = new CacheService();
