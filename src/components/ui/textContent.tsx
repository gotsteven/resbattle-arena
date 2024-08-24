import React from 'react'

const TextContent = ({ textContent }: { textContent: string | undefined }) => {
  if (!textContent) return
  const lines: string[] = textContent.split('\n')
  return (
    <span>
      <span className="break-words">
        {lines.map((line, lineIndex) => (
          <React.Fragment key={line}>
            {line}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </span>
    </span>
  )
}

export default TextContent
