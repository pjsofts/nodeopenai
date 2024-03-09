const sendMessage = async (text) => {
  const res = await fetch("http://localhost:3000/message", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      message: text,
    }),
  });
  const data = await res.json();
  return data;
};

export { sendMessage };
