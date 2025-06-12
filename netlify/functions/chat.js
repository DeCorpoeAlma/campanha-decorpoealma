export async function handler(event) {
  const { message } = JSON.parse(event.body);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral/mistral-7b-instruct",
      messages: [
        { role: "system", content: "És um assistente simpático que responde de forma clara e direta." },
        { role: "user", content: message }
      ]
    })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({ reply: data.choices[0].message.content })
  };
}