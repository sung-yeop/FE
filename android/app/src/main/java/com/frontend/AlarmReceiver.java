package com.frontend;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.media.AudioAttributes;
import android.media.RingtoneManager;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.util.Log;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.os.Build;

public class AlarmReceiver extends BroadcastReceiver {
    private MediaPlayer mediaPlayer;

    @Override
    public void onReceive(Context context, Intent intent) {
        String alarmId = intent.getStringExtra("alarmId");
        boolean isVibrate = intent.getBooleanExtra("isVibrate", false);
        int soundVolume = intent.getIntExtra("soundVolume", 50);
        String soundUri = intent.getStringExtra("soundUri");
        double repeatInterval = intent.getDoubleExtra("repeatInterval", 0);

        Log.d("AlarmReceiver", "Alarm triggered: " + alarmId);

        if (isVibrate) {
            vibrate(context);
        } else {
            playAlarmSound(context, soundUri, soundVolume);
        }

        // React Native 앱의 특정 화면을 열기 위한 Intent 생성
        Intent launchIntent = new Intent(context, MainActivity.class);
        launchIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        launchIntent.putExtra("showAlarmScreen", true);
        launchIntent.putExtra("alarmId", alarmId);
        context.startActivity(launchIntent);
    }

    private void vibrate(Context context) {
        Vibrator vibrator = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);
        if (vibrator != null && vibrator.hasVibrator()) {
            long[] pattern = {0, 500, 1000};
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                vibrator.vibrate(VibrationEffect.createWaveform(pattern, 0));
            } else {
                vibrator.vibrate(pattern, 0);
            }
        }
    }

    // private void playAlarmSound(Context context, String soundUri, int volume) {
    //     try {
    //         Uri sound = Uri.parse(soundUri);
    //         mediaPlayer = new MediaPlayer();
    //         mediaPlayer.setDataSource(context, sound);
    //         final AudioManager audioManager = (AudioManager) context.getSystemService(Context.AUDIO_SERVICE);
    //         if (audioManager != null) {
    //             audioManager.setStreamVolume(AudioManager.STREAM_ALARM, volume, 0);
    //         }
    //         mediaPlayer.setAudioAttributes(
    //             new AudioAttributes.Builder()
    //                 .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
    //                 .setUsage(AudioAttributes.USAGE_ALARM)
    //                 .build()
    //         );
    //         mediaPlayer.setLooping(true);
    //         mediaPlayer.prepare();
    //         mediaPlayer.start();
    //     } catch (Exception e) {
    //         Log.e("AlarmReceiver", "Error playing alarm sound", e);
    //     }
    // }
    private void playAlarmSound(Context context, String soundUri, int volume) {
        try {
            Uri sound;
            if (soundUri == null || soundUri.isEmpty()) {
                // 시스템 기본 알람 소리 사용
                sound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM);
                if (sound == null) {
                    // 알람 소리가 없으면 알림 소리로 대체
                    sound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
                }
            } else {
                sound = Uri.parse(soundUri);
            }
    
            mediaPlayer = new MediaPlayer();
            mediaPlayer.setDataSource(context, sound);
            final AudioManager audioManager = (AudioManager) context.getSystemService(Context.AUDIO_SERVICE);
            if (audioManager != null) {
                audioManager.setStreamVolume(AudioManager.STREAM_ALARM, volume, 0);
            }
            mediaPlayer.setAudioAttributes(
                new AudioAttributes.Builder()
                    .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                    .setUsage(AudioAttributes.USAGE_ALARM)
                    .build()
            );
            mediaPlayer.setLooping(true);
            mediaPlayer.prepare();
            mediaPlayer.start();
        } catch (Exception e) {
            Log.e("AlarmReceiver", "Error playing alarm sound", e);
        }
    }

    // 필요한 경우 알람 소리를 중지하는 메소드
    // public void stopAlarmSound() {
    //     if (mediaPlayer != null && mediaPlayer.isPlaying()) {
    //         mediaPlayer.stop();
    //         mediaPlayer.release();
    //         mediaPlayer = null;
    //     }
    // }
}