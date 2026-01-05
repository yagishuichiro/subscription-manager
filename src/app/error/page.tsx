import Link from "next/link";

export default function ErrorPage() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>エラーが発生しました</h1>
      <p>認証処理中にエラーが発生しました。</p>
      <p>しばらく時間をおいてから再度お試しください。</p>
      <Link href="/" style={{ color: "blue", textDecoration: "underline" }}>
        トップページに戻る
      </Link>
    </div>
  );
}
