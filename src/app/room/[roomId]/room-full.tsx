import Link from 'next/link'

export const RoomFull = () => (
  <div>
    この部屋は満員になりました。
    <Link href="/" className="text-accent">
      部屋一覧へ戻る
    </Link>
  </div>
)
