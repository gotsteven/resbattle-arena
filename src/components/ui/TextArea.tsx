import {
  type ChangeEvent,
  type Dispatch,
  type FC,
  type SetStateAction,
  type TextareaHTMLAttributes,
  useCallback,
  useRef,
} from 'react'
import { twMerge } from 'tailwind-merge'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  autoHeight?: boolean
  setValue?: Dispatch<SetStateAction<string>>
}

export const TextArea: FC<TextAreaProps> = ({
  className = '',
  autoHeight = false,
  setValue,
  onChange,
  ...props
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (autoHeight && textAreaRef.current !== null) {
        textAreaRef.current.style.height = 'auto'
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
      }
      onChange?.(e)
      setValue?.(e.currentTarget.value)
    },
    [onChange, autoHeight, setValue],
  )

  return (
    <textarea
      ref={textAreaRef}
      className={twMerge(
        'shrink grow rounded-lg border border-background-100 bg-background-50 p-2 text-sm outline-0',
        'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'resize-none overflow-hidden',
        className,
      )}
      onChange={handleChange}
      {...props}
    />
  )
}
