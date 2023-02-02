package com.roommate.matching.RoommateMatching.modules;

import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.stereotype.Component;

import com.google.common.base.Strings;

@Component
public class RedissonClientProvider {
    public RedissonClient create() {
        final Config config = new Config();

        // TODO: replace with real redis key which will be in system properties
        final String redisKey = null;
        final String redisServerAddress = "redis://127.0.0.1:6379";

        if (!Strings.isNullOrEmpty(redisKey)) {
            config
                    .useSingleServer()
                    .setPassword(redisKey)
                    .setAddress(redisServerAddress);
        } else {
            config
                    .useSingleServer()
                    .setAddress(redisServerAddress);
        }
        return Redisson.create(config);
    }
}

    
