import os
import random
import speech_recognition as sr
import openai
import pyttsx3

apikey = ""
openai.api_key = apikey

engine = pyttsx3.init(driverName="sapi5")
# Set properties (optional)
engine.setProperty('rate', 150)  # Speed of speech (words per minute)
engine.setProperty('volume', 0.9)  # Volume level (0.0 to 1.0)

chatStr = ""

def chat(query):
    global chatStr
    chatStr += f"user: Generate a next basic question based on this text {query} programming language\n A.I: "
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-16k-0613",
            messages=[{"role": "system", "content": chatStr}],
            temperature=0.7,
            max_tokens=256,
            stop=None
        )
        response_text = response['choices'][0]['message']['content'].strip()
        engine.say(response_text)
        engine.runAndWait()
        print(response_text)
        chatStr += response_text
        return response_text
        if not os.path.exists("Openai"):
            os.mkdir("Openai")
        with open(f"Openai/prompt-{random.randint(1, 4565)}.txt", "w") as f:
            f.write(chatStr)
    except openai.error.OpenAIError as e:
        print("OpenAI Error:", e)
        return "Some Error..."
    except Exception as e:
        print("Error:", e)
        return "Some Error..."

def say(text):
    try:
        print(text)
        engine.say(text)
        engine.runAndWait()
    except Exception as e:
        print("Error occurred while speaking:", e)

def takeCommand():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        audio = r.listen(source)
        try:
            query = r.recognize_google(audio, language="en-in")
            print(f"User said: {query}")
            return query
        except Exception as e:
            return "Some Error Occurred, sorry..."

print('pycharm')
say("hello, I am Jarvin, I am your interviewer...")
say("please... tell me about yourself.")
query = takeCommand()
say("Nice to hear about you")
say("In which technology do you want to give your interview?")
i = 1
while i < 4:
    print("Listening....")
    query = takeCommand()
    chat(query)
    i += 1
print("Listening....")
query = takeCommand()
say("ok.. thank you...")
