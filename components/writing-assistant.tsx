"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

export function WritingAssistant() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">中文写作助手</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">AI 反馈</h2>
          <ScrollArea className="h-[calc(100vh-200px)]">
            {messages.map((m) => (
              <div key={m.id} className="whitespace-pre-wrap mb-4">
                <strong>{m.role === "user" ? "学生: " : "AI: "}</strong>
                {m.content}
              </div>
            ))}
          </ScrollArea>
        </div>
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">学生作文区</h2>
          <form onSubmit={handleSubmit}>
            <Textarea
              placeholder="在这里写下你的作文..."
              value={input}
              onChange={handleInputChange}
              className="w-full h-[calc(100vh-280px)] resize-none mb-4"
            />
            <Button type="submit" className="mt-4">
              提交获取反馈
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
