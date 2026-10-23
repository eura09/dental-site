import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'

export function RichText({ data, className = '' }: { data?: unknown; className?: string }) {
  if (!data) return null
  return (
    <LexicalRichText data={data as SerializedEditorState} className={`prose ${className}`.trim()} />
  )
}
