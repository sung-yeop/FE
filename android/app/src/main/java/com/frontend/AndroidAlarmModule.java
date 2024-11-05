package com.frontend;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;
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

    // React에서는 시간을 double에 맞춰서 전달해줘야한다.
    @ReactMethod
    public void setAlarm(String alarmId, double timestamp, boolean isVibrate, int soundVolume, String soundUri) {
        Intent intent = new Intent(context, AlarmReceiver.class);
        intent.putExtra("alarmId", alarmId);
        intent.putExtra("isVibrate", isVibrate);
        intent.putExtra("soundVolume", soundVolume);
        intent.putExtra("soundUri", soundUri);
        Log.d("AndroidAlarmModule", "Time : " + (long) timestamp);

        PendingIntent pendingIntent = PendingIntent.getBroadcast(
            context, 
            alarmId.hashCode(), 
            intent, 
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        alarmManager.setExactAndAllowWhileIdle(
            AlarmManager.RTC_WAKEUP,
            (long) timestamp,
            pendingIntent
        );
    }

    @ReactMethod
    public void cancelAlarm(String alarmId) {
        Log.d("AndroidAlarmModule", "Attempting to cancel alarm with ID: " + alarmId);
        
        Intent intent = new Intent(context, AlarmReceiver.class);
        intent.putExtra("alarmId", alarmId);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(
            context,
            alarmId.hashCode(),
            intent,
            PendingIntent.FLAG_NO_CREATE | PendingIntent.FLAG_IMMUTABLE
        );

        if (pendingIntent != null) {
            Log.d("AndroidAlarmModule", "PendingIntent found, cancelling alarm");
            alarmManager.cancel(pendingIntent);
            pendingIntent.cancel();
            Log.d("AndroidAlarmModule", "Alarm cancelled successfully");
        } else {
            Log.d("AndroidAlarmModule", "No PendingIntent found for alarmId: " + alarmId);
        }   
    }

    @ReactMethod
    public void updateAlarm(String alarmId, double newTimestamp, boolean active, double alarmInterval, int delayTimes, boolean isVibrate, boolean repeatTrigger, int soundVolume, String soundUri) {
        cancelAlarm(alarmId);

        if(active){
            long newAlarmTime;
            if (repeatTrigger) {
                long repeatIntervalMillis = (long) (alarmInterval * 60 * 1000 * delayTimes); // 분을 밀리초로 변환
                newAlarmTime = (long) newTimestamp + repeatIntervalMillis;
            } else {
                newAlarmTime = (long) newTimestamp;
            }
            Log.d("AndroidAlarmModule", "Repeat Trigger : " + repeatTrigger);
            Log.d("AndroidAlarmModule", "Update Time : " + newAlarmTime);
                
            setAlarm(alarmId, (double) newAlarmTime, isVibrate, soundVolume, soundUri);
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