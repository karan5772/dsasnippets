const sample = `
{
  title: "",
  description: "",
  difficulty: EASY || MEDIUM || HARD,
  tags: ["math", "operators", "addition"],
  examples: {
  JAVA: {
      input: "-5 12",
      output: "7",
      explanation: "Adding -5 and 12 gives 7.",
    },
    PYTHON: {
      input: "3 7",
      output: "10",
      explanation: "Adding 3 and 7 gives 10.",
    },
    JAVASCRIPT: {
      input: "-5 12",
      output: "7",
      explanation: "Adding -5 and 12 gives 7.",
    },
  },
  constraints: "-10^9 ≤ a, b ≤ 10^9",
  hints: "",
  testcases: [
    {
      input: "100 200",
      output: "300",
    },
    {
      input: "-500 -600",
      output: "-1100",
    },
    {
      input: "0 0",
      output: "0",
    },
  ],
  codeSnippets: {
    JAVA: "import java.util.Scanner;\n\npublic class Main {\n    public static int addTwoNumbers(int a, int b) {\n        // Write your code here\n        // Return the sum of a and b\n        return a + b;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(addTwoNumbers(a, b));\n    }\n}",
    PYTHON:
      "def add_two_numbers(a, b):\n    # Write your code here\n    # Return the sum of a and b\n    return a + b\n\nimport sys\ninput_line = sys.stdin.read()\na, b = map(int, input_line.split())\nprint(add_two_numbers(a, b))",
    JAVASCRIPT:
      "const fs = require('fs');\n\nfunction addTwoNumbers(a, b) {\n    // Write your code here\n    // Return the sum of a and b\n    return a + b;\n}\n\n// Reading input from stdin (using fs to read all input)\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\n\nconsole.log(addTwoNumbers(a, b));",
  },
  referenceSolutions: {
    JAVA: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n    }\n}",
    PYTHON:
      "import sys\ninput_line = sys.stdin.read()\na, b = map(int, input_line.split())\nprint(a + b)",
    JAVASCRIPT:
      "const fs = require('fs');\n\n// Reading input from stdin (using fs to read all input)\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\n\nconsole.log(a + b);",
  },
}`;

export async function callGemini(text) {
  const body = {
    system_instruction: {
      parts: [
        {
          text: "You are a Problem Generator for LeetCode like code execution platform that uses judge0 for it's execution (so make the problem and test case easy to be accepted by the judge 0 platform) for JAVA, PYTHON and JAVASCRIPT langauge specific. So generate the problem and give a JSON object (Here, 'constraints', 'hints' and 'editorial' must be in string only). Simply send the object NO PREFIX NO SUFFIX. AND IT MUST FOLLOW THIS GIVEN STRUCTURE ONLY. Also in reference code mention where to write your code and what not to touch the code with help of comments",
        },
      ],
    },
    contents: [
      {
        parts: [{ text: text + `This is the sample : ${sample}` }],
      },
    ],
  };

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log(response);

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return error.message;
  }
}
