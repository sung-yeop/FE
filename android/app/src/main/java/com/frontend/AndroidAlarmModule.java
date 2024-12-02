package com.frontend;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;
import java.util.Calendar;
import android.provider.Settings;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class AndroidAlarmModule extends ReactContextBaseJavaModule {
    private AlarmManager alarmManager;
    private Context context;

    public AndroidAlarmModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
        alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
    }

    @Override
    public String getName() {
        return "AndroidAlarmModule";
    }

    private int generateRequestCode(int alarmId, int dayOffset) {
        return Math.abs((alarmId % 100000) * 10 + dayOffset);
    }

    @ReactMethod
    public void setAlarm(int alarmId, double timestamp, boolean isVibrate, int soundVolume, String soundUri, Integer alarmDays) {
        Log.d("AndroidAlarmModule", "Setting alarm - ID: " + alarmId + 
        ", timestamp: " + timestamp + 
        ", isVibrate: " + isVibrate + 
        ", soundUri: " + soundUri);

        long currentTime = System.currentTimeMillis();
        long alarmTime = (long) timestamp;

        // 요일별 알람 설정
        if (alarmDays != null && alarmDays > 0) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTimeInMillis(alarmTime);
            
            // 각 요일별로 알람 설정
            for (int i = 0; i < 7; i++) {
                if (((alarmDays >> i) & 1) == 1) {  // 해당 요일이 설정되어 있으면
                    Calendar targetCalendar = (Calendar) calendar.clone();
                    
                    // 요일 설정 (Calendar.MONDAY = 2, ... Calendar.SUNDAY = 1)
                    int targetDay = ((i + 1) % 7) + 1;
                    targetCalendar.set(Calendar.DAY_OF_WEEK, targetDay);
                    
                    // 현재 시각보다 이전이면 다음 주로 설정
                    if (targetCalendar.getTimeInMillis() <= currentTime) {
                        targetCalendar.add(Calendar.WEEK_OF_YEAR, 1);
                    }

                    // 각 요일별로 고유한 PendingIntent 생성
                    Intent intent = new Intent(context, AlarmReceiver.class);
                    intent.putExtra("alarmId", alarmId);
                    intent.putExtra("isVibrate", isVibrate);
                    intent.putExtra("soundVolume", soundVolume);
                    intent.putExtra("soundUri", soundUri);
                    intent.putExtra("dayOfWeek", i);  // 요일 정보 추가

                    PendingIntent pendingIntent = PendingIntent.getBroadcast(
                        context,
                        generateRequestCode(alarmId, i),
                        intent,
                        PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
                    );

                    alarmManager.setExactAndAllowWhileIdle(
                        AlarmManager.RTC_WAKEUP,
                        (long) targetCalendar.getTimeInMillis(),
                        pendingIntent
                    );

                    Log.d("AndroidAlarmModule", "Set alarm for day " + i + " at " + targetCalendar.getTime());
                }
            }
        } else {
            // 기존 단일 알람 설정 로직
            if (alarmTime <= currentTime) {
                alarmTime += 24 * 60 * 60 * 1000;
            }

            Intent intent = new Intent(context, AlarmReceiver.class);
            intent.putExtra("alarmId", alarmId);
            intent.putExtra("isVibrate", isVibrate);
            intent.putExtra("soundVolume", soundVolume);
            intent.putExtra("soundUri", soundUri);

            PendingIntent pendingIntent = PendingIntent.getBroadcast(
                context,
                alarmId,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
            );

            alarmManager.setExactAndAllowWhileIdle(
                AlarmManager.RTC_WAKEUP,
                (long) alarmTime,
                pendingIntent
            );
        }
    }

    @ReactMethod
    public void cancelAlarm(int alarmId) {
        Log.d("AndroidAlarmModule", "Attempting to cancel alarm with ID: " + alarmId);
        
        // 모든 요일의 알람 취소
        for (int i = 0; i < 7; i++) {
            Intent intent = new Intent(context, AlarmReceiver.class);
            intent.putExtra("alarmId", alarmId);
            PendingIntent pendingIntent = PendingIntent.getBroadcast(
                context,
                generateRequestCode(alarmId, i),
                intent,
                PendingIntent.FLAG_NO_CREATE | PendingIntent.FLAG_IMMUTABLE
            );

            if (pendingIntent != null) {
                alarmManager.cancel(pendingIntent);
                pendingIntent.cancel();
                Log.d("AndroidAlarmModule", "알람삭제");    
            }
        }

        // 단일 알람도 취소
        Intent intent = new Intent(context, AlarmReceiver.class);
        intent.putExtra("alarmId", alarmId);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(
            context,
            alarmId,
            intent,
            PendingIntent.FLAG_NO_CREATE | PendingIntent.FLAG_IMMUTABLE
        );

        if (pendingIntent != null) {
            alarmManager.cancel(pendingIntent);
            pendingIntent.cancel();
        }
    }

    @ReactMethod
    public void updateAlarm(int alarmId, double newTimestamp, boolean active, double alarmInterval, int delayTimes, boolean isVibrate, boolean repeatTrigger, int soundVolume, String soundUri, Integer alarmDays) {
        cancelAlarm(alarmId);

        if(active){
            long currentTime = System.currentTimeMillis();
            long newAlarmTime;

            if (repeatTrigger) {
                long repeatIntervalMillis = (long) (alarmInterval * 60 * 1000 * delayTimes); // 분을 밀리초로 변환
                newAlarmTime = (long) newTimestamp + repeatIntervalMillis;
            } else {
                newAlarmTime = (long) newTimestamp;
            }

            if (newAlarmTime <= currentTime) {
                newAlarmTime += 24 * 60 * 60 * 1000;
            }
            Log.d("AndroidAlarmModule", "Repeat Trigger : " + repeatTrigger);
            Log.d("AndroidAlarmModule", "Update Time : " + newAlarmTime);
                
            setAlarm(alarmId, (double) newAlarmTime, isVibrate, soundVolume, soundUri, alarmDays);
        }
    }

    @ReactMethod
    public void requestAlarmPermission(Promise promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
            if (!alarmManager.canScheduleExactAlarms()) {
                Intent intent = new Intent(Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                context.startActivity(intent);
                promise.resolve(false);
            } else {
                promise.resolve(true);
            }
        } else {
            promise.resolve(true);
        }
    }
}
