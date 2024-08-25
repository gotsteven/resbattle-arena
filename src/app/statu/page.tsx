import { IconHandOff, IconHandStop, IconSkull, IconTrophy } from '@tabler/icons-react'

const page = () => {
  const dummydata = [
    {
      topic: '体罰は許されるべきか',
      position: 'agree',
      result: 'win',
    },
    {
      topic: '体罰は許されるべきか',
      position: 'agree',
      result: 'lose',
    },
    {
      topic: '体罰は許されるべきか',
      position: 'disdgree',
      result: 'win',
    },
    {
      topic: '体罰は許されるべきか',
      position: 'agree',
      result: 'win',
    },
    {
      topic: '体罰は許されるべきか',
      position: 'agree',
      result: 'lose',
    },
    {
      topic: '体罰は許されるべきか',
      position: 'agree',
      result: 'win',
    },
  ]
  return (
    <div className="flex flex-col gap-y-8 text-center">
      <div className="flex flex-col items-center gap-y-5 rounded-md py-8">
        <div className="flex w-full justify-evenly rounded-3xl p-10 ring-4 ring-slate-600/90">
          <div className="flex flex-col items-center justify-center">
            <div className="font-bold">通算勝利数</div>
            <div className="flex items-end">
              <div className="text-6xl">50</div>
              <div className="text-xl">回</div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="font-bold">勝率</div>
            <div className="flex items-end">
              <div className="text-6xl">50</div>
              <div className="text-xl">%</div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex w-full justify-start px-3">
          <div className="font-bold">対戦履歴</div>
        </div>
        {dummydata.map((data, index) => (
          <div
            key={index}
            className="flex w-full items-center justify-between rounded-md p-4 ring-2 ring-slate-400/50"
          >
            <p className="truncate font-bold">{data.topic}</p>
            <div className="flex items-center justify-center gap-x-2 text-foreground-300">
              {data.position === 'agree' ? (
                <IconHandStop size={25} color={'#71aaf5'} />
              ) : (
                <IconHandOff size={25} color={'#ff6b7c'} />
              )}
              {data.result === 'win' ? (
                <IconTrophy size={30} color={'#e0d312'} />
              ) : (
                <IconSkull size={30} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
