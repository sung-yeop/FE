export class SignUpAPI {
  static async checkDuplicateUsername(username: string) {
    try {
      const response = await fetch(
        `http://10.0.2.2:8080/user/${username}/check`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`오류 발생 : ${response.status}`);
      }

      return response.json();
    } catch (err) {
      console.error(err);
    }
  }
}
