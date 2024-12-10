#import <React/RCTBridgeModule.h>
#import <AVFoundation/AVFoundation.h>
#import <UserNotifications/UserNotifications.h>

@interface AlarmModule : NSObject <RCTBridgeModule>
@property (nonatomic, strong) AVAudioPlayer *audioPlayer;
@property (nonatomic, strong) NSMutableDictionary *alarmTimers;
@end