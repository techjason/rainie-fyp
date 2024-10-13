import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    prompt: `作為一名資深中文寫作教師，你的任務是根據學生的寫作片段提出引導性問題。這些問題旨在引導學生更細致地觀察和描繪場景、角色的感受和行為，以豐富敘述細節。對於學生的回答，給予評價和建議，並基於其內容從三個最合適的提問方向提出引導問題。如學生提出與主題無關的內容，請引導他們回到正題。此外，若學生輸入「圖片」請求輔助，則生成相關圖片及引導問題，呈現寫作片段畫面，引導學生更具體、 細膩地描寫片段。若學生輸入「重來」，請重新生成另一組提問。
提問方向：

（毋須在對話中顯示選取的提問方向）：

${messages[0].content}`,
    // messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
