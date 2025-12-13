const aboutText = `I started my programming journey in my 3rd year of college, beginning with Python and Java before diving deep into the JavaScript ecosystem. What began as building simple websites evolved into creating products that solve real-world problems.

Previously shipped features at DataFoundry AI, Dank, and other startups. I enjoy working in different environments — from intimate 3-person teams to larger organizations — and take pride in delivering quality software that makes a difference.

Currently exploring new domains in technology while staying focused on building user-friendly applications that address real-world problems.`;

const content = `# About

${aboutText}

## Personal Information

- Name: Aman Singh
- Display Name: Aman Singh
- Website: https://useraman.me

## Social Links

- [GitHub](https://github.com/SinghAman21)
- [Twitter/X](https://x.com/useraman21)
- [LinkedIn](https://www.linkedin.com/in/aman-singh21)
- [Peerlist](https://peerlist.io/singhaman21)

## Tech Stack

- Next.js
- React
- TypeScript
- Node.js
- Tailwind CSS
- Go
- Python
- AWS
`;

export const dynamic = "force-static";

export async function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}