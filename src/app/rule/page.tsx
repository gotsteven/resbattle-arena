import { LinkButton } from '@/components/ui/LinkButton'
import {
  IconDeviceGamepad2,
  IconMessage2,
  IconMessageDots,
  IconPray,
  IconSword,
  IconTrophy,
} from '@tabler/icons-react'
const RulePage = () => {
  return (
    <div className="bg-white p-6 font-sans text-gray-800">
      <div className="container mx-auto">
        <h1 className="mb-8 text-center font-bold text-3xl">
          <span className="inline-flex items-center">
            <IconMessage2 className="mr-2 text-blue-500" />
            レスバトルアリーナ ルール説明
          </span>
        </h1>

        <div className="mb-8">
          <h2 className="mb-4 flex items-center font-semibold text-xl">
            <IconPray className="mr-2 text-green-500" />
            1. ゲーム開始
          </h2>
          <p className="pl-8">プレイヤー1がディベートのトピックを決定し部屋を作成します。</p>
          <p className="pl-8">プレイヤー2が部屋を選び、賛成か反対の立場を選択して入室します。</p>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 flex items-center font-semibold text-xl">
            <IconMessageDots className="mr-2 text-yellow-500" />
            2. ディベート
          </h2>
          <p className="pl-8">プレイヤー1がゲームを開始し、ディベートがスタートします。</p>
          <p className="pl-8">
            プレイヤー同士が交互に主張を送信します。各プレイヤーは5回まで主張を送信できます。
          </p>
          <p className="pl-8">「相手のターンです」と表示されている間は送信できません。</p>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 flex items-center font-semibold text-xl">
            <IconTrophy className="mr-2 text-red-500" />
            3. 結果
          </h2>
          <p className="pl-8">すべての主張が終わるとゲームが終了します。</p>
          <p className="pl-8">AIが勝敗を判定し、その根拠とフィードバックを表示します。</p>
        </div>

        <div className="mt-12 text-center">
          <p className="font-semibold text-lg">
            <span className="inline-flex items-center">
              <IconSword className="mr-2 text-indigo-500" />
              勝利を目指してディベート力を鍛えましょう！
            </span>
          </p>
        </div>
      </div>
      <LinkButton
        href="/"
        className="mx-auto"
        icon={<IconDeviceGamepad2 />}
        label="ゲームを始める"
      />
    </div>
  )
}

export default RulePage
