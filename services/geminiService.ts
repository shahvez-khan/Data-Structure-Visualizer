import type { Algorithm } from '../types';


const algorithmDisplayNames: Record<Algorithm, string> = {
  bubble: 'Bubble Sort',
  selection: 'Selection Sort',
  insertion: 'Insertion Sort',
  merge: 'Merge Sort',
};

export const getAlgorithmExplanation = async (algorithm: Algorithm): Promise<string> => {
  const displayName = algorithmDisplayNames[algorithm];
  
  // This prompt is sent to the secure serverless function.
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
    // Making a POST request to a relative API endpoint (the secure serverless function)
    const response = await fetch('/api/explain-algo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
        throw new Error(`AI Service failed. Status: ${response.status}`);
    }

    const result = await response.json();
    
    // Assuming the secure serverless function returns an object { explanation: string }
    return result.explanation;
  } catch (error) {
    console.error("Error fetching explanation from proxy:", error);
    return "AI insights are unavailable. The API key must be secured using a serverless function (Vercel/Netlify).";
  }
};
