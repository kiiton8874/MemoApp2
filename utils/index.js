export function translateErrors(code) {
  const error = { title: 'エラー', description: '時間をおいてお試しください'};
  switch (code) {
    case 'auth/invalid-email':
    error.description = 'メールアドレスが不正です。';
    break;
    case 'auth/user-disabled':
    error.description = 'アカウントが無効です。';
    break;
    case 'auth/user-not-found':
    error.description = 'ユーザーが見つかりませんでした。';
    break;
    case 'auth/wrong-passeord':
    error.description = 'パスワードが間違っています。';
    break;

    case 'auth/email-aleady-in-use':
    error.description = 'メールアドレスが使用されています。';
    break;
    case 'auth/operation-not-allowed':
    error.description = '開発者にお問い合わせください。';
    break;
    case 'auth/weak-password':
    error.description = 'パスワードが簡単すぎます。';
    break;
    default:
  }
  return error;
}