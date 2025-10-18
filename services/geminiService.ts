// Fix: Implement the geminiService to fetch algorithm explanations.
import { GoogleGenAI } from "@google/genai";
import type { Algorithm } from '../types';

// Per guidelines, API key must be from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

const model = 'gemini-2.5-flash';

const algorithmDisplayNames: Record<Algorithm, string> = {
  bubble: 'Bubble Sort',
  selection: 'Selection Sort',
  insertion: 'Insertion Sort',
  merge: 'Merge Sort',
};

export const getAlgorithmExplanation = async (algorithm: Algorithm): Promise<string> => {
  const displayName = algorithmDisplayNames[algorithm];
  const prompt = `
    Provide a detailed analysis of the ${displayName} algorithm for a computer science student. Format the output as clean markdown.

    Your response must include the following sections, using these exact headings:

    ### Time Complexity
    List the Best, Average, and Worst-case scenarios in Big O notation. For each case, provide a brief, one-sentence explanation for *why* it has that complexity.

    ### Space Complexity
    Provide the Big O notation for its space complexity and explain what contributes to it (e.g., in-place, recursive call stack, auxiliary arrays).

    ### Stability
    State whether the algorithm is stable or not. Briefly explain what stability means in the context of sorting (i.e., preserving the relative order of equal elements).

    ### Key Characteristics & Use Cases
    Write a short paragraph summarizing the algorithm's main characteristics and describing a practical scenario where it would be a particularly good or poor choice.

    Do not use code blocks in your response. Keep the tone educational and clear.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    // Per guidelines, use response.text
    return response.text;
  } catch (error) {
    console.error("Error fetching explanation from Gemini API:", error);
    return "Could not fetch explanation. Please check your API key and network connection.";
  }
};