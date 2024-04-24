"use client"

import { type Editor } from "@tiptap/react"
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  HeadingIcon,
  ListBulletIcon,
} from "@radix-ui/react-icons"
import { Toggle } from "@/components/ui/Toggle"
import { ColorPicker } from "@/components/ColorPicker"
import { useEffect, useState } from "react"
import { InsertLink } from "@/components/TextEditor/InsertLink"
import { AlignText } from "@/components/TextEditor/AlignText"

type Props = {
  editor: Editor | null
}

export function Toolbar({ editor }: Props) {
  const [textAlignment, setTextAlignment] = useState("left")
  const [textColor, setTextColor] = useState("#000000")

  useEffect(() => {
    if (editor?.isEmpty) {
      setTextAlignment("left")
      setTextColor("#000000")
    }
  }, [editor?.isEmpty])

  if (editor) {
    return (
      <div className="bg-background border border-input flex gap-1 items-center justify-center p-1 rounded-lg">
        <Toggle
          size="sm"
          pressed={editor.isActive("heading")}
          onPressedChange={() => {
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }}
        >
          <HeadingIcon className="size-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => {
            editor.chain().focus().toggleBold().run()
          }}
        >
          <FontBoldIcon className="size-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => {
            editor.chain().focus().toggleItalic().run()
          }}
        >
          <FontItalicIcon className="size-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("underline")}
          onPressedChange={() => {
            editor.chain().focus().toggleUnderline().run()
          }}
        >
          <UnderlineIcon className="size-4" />
        </Toggle>

        <Toggle
          size="sm"
          pressed={editor.isActive("bulletList")}
          onPressedChange={() => {
            editor.chain().focus().toggleBulletList().run()
          }}
        >
          <ListBulletIcon className="size-4" />
        </Toggle>

        <AlignText
          value={textAlignment}
          onChange={(alignmentType) => {
            setTextAlignment(alignmentType)

            editor.isActive({ textAlign: alignmentType })
            editor.chain().focus().setTextAlign(alignmentType).run()
          }}
        />

        <InsertLink
          onSubmit={(formData) => {
            editor.commands.insertContent(
              `<a href={${formData.href}}>${formData.text}</a>`
            )
          }}
        />

        <ColorPicker
          value={textColor}
          onChange={(colorValue) => {
            setTextColor(colorValue)
            editor.chain().focus().setColor(colorValue).run()
          }}
        />
      </div>
    )
  }

  return null
}
