export class Verification {
  static async verificationSend(imageUri: string) {
    try {
      // FormData 생성
      const formData = new FormData();

      // 이미지 파일 추가
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg', // 또는 'image/png'
        name: 'photo.jpg',
      } as any);

      const response = await fetch(
        'https://port-0-flask-m3k5a5gtc51bd19b.sel4.cloudtype.app/api/food',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(
          '[Verification] 인증이 정상적으로 진행되지 않았습니다.',
        );
      }
      return response.json();
    } catch (err) {
      console.error('인증 POST 에러 : ', err);
      throw err;
    }
  }
}
