// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  // const response = await fetch(`https://google.com`);
  // const html = await response.text();

  const response = await fetch(`${process.env.API_URL}/messages`);
  const data = await response.json();

  res.status(200).json(data);
}
