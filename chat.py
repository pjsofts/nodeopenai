import openai

openai.api_key = "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"


def ask_openai(question):
    response = openai.Completion.create(
        engine="gpt-3.5-turbo", prompt=question, max_tokens=100
    )
    return response.choices[0].text.strip()


def chatbot():
    print("Hello! I'm a chatbot. How can I assist you today?")
    while True:
        user_input = input("You: ")
        response = ask_openai(user_input)
        print("Bot:", response)


if __name__ == "__main__":
    chatbot()
