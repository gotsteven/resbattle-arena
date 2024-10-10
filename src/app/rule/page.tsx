import { LinkButton } from '@/components/ui/LinkButton'
import {
  IconDeviceGamepad2,
  IconMessage2,
  IconMessageDots,
  IconSword,
  IconTrophy,
} from '@tabler/icons-react'

const Rule = () => (
  <div className="flex flex-col items-center gap-y-12">
    <h1 className="flex items-center justify-center gap-x-4 font-bold text-2xl">
      <IconMessage2 className="text-blue-500" size={32} />
      レスバトルアリーナ ルール説明
    </h1>
    <section className="flex w-full flex-col gap-y-2">
      <h2 className="flex items-center gap-x-4 font-bold text-xl">
        <IconDeviceGamepad2 className="text-green-500" />
        ゲーム開始
      </h2>
      <p className="whitespace-pre-line">
        プレイヤー1がディベートのトピックを決定し部屋を作成します。 <br />
        プレイヤー2が部屋を選び、賛成か反対の立場を選択して入室します。
      </p>
    </section>
    <section className="flex w-full flex-col gap-y-2">
      <h2 className="flex items-center gap-x-4 font-bold text-xl">
        <IconMessageDots className="text-yellow-500" />
        ディベート
      </h2>
      <p className="whitespace-pre-line">
        プレイヤー1がゲームを開始し、ディベートがスタートします。 <br />
        プレイヤー同士が交互に主張を送信します。各プレイヤーは5回まで主張を送信できます。 <br />
        「相手のターンです」と表示されている間は送信できません。
      </p>
    </section>
    <section className="flex w-full flex-col gap-y-2">
      <h2 className="flex items-center gap-x-4 font-bold text-xl">
        <IconTrophy className="text-red-500" />
        結果
      </h2>
      <p className="whitespace-pre-line">
        すべての主張が終わるとゲームが終了します。 <br />
        AIが勝敗を判定し、その根拠とフィードバックを表示します。
      </p>
    </section>
    <div className="flex items-center justify-center gap-x-2 font-bold text-xl">
      <IconSword className="text-indigo-500" size={32} />
      勝利を目指してディベート力を鍛えましょう！
    </div>
    <LinkButton href="/" icon={<IconDeviceGamepad2 />} label="ゲームを始める" />
  </div>
)

export default Rule
