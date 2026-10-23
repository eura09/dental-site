/**
 * Minimaler Helfer, um Lexical-Richtext für den Seed zu erzeugen.
 * Strings werden Absätze, "## Text" wird eine H2, ["a", "b"] wird eine Liste.
 */
type Block = string | string[]

const text = (t: string) => ({
  type: 'text',
  text: t,
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const base = { direction: 'ltr' as const, format: '' as const, indent: 0, version: 1 }

export const richText = (...blocks: Block[]) => ({
  root: {
    ...base,
    type: 'root',
    children: blocks.map((b) => {
      if (Array.isArray(b)) {
        return {
          ...base,
          type: 'list',
          listType: 'bullet',
          start: 1,
          tag: 'ul',
          children: b.map((item, i) => ({
            ...base,
            type: 'listitem',
            value: i + 1,
            children: [text(item)],
          })),
        }
      }
      if (b.startsWith('## ')) {
        return { ...base, type: 'heading', tag: 'h2', children: [text(b.slice(3))] }
      }
      return { ...base, type: 'paragraph', textFormat: 0, textStyle: '', children: [text(b)] }
    }),
  },
})
