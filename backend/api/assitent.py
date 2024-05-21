# import os
# import random
# import speech_recognition as sr
# import openai
# from gtts import gTTS
# from playsound import playsound

# # Set your OpenAI API key
# apikey = os.getenv("OPENAI_API_KEY")
# openai.api_key = apikey

# chatStr = ""

# def chat(query):
#     global chatStr
#     chatStr += f"user: Generate a next basic question based on this text {query} programming language\n A.I: "
#     try:
#         response = openai.ChatCompletion.create(
#             model="gpt-3.5-turbo-16k-0613",
#             messages=[{"role": "system", "content": chatStr}],
#             temperature=0.7,
#             max_tokens=256,
#             stop=None
#         )
#         response_text = response['choices'][0]['message']['content'].strip()
#         say(response_text)
#         chatStr += response_text
#         if not os.path.exists("Openai"):
#             os.mkdir("Openai")
#         with open(f"Openai/prompt-{random.randint(1, 4565)}.txt", "w") as f:
#             f.write(chatStr)
#         return response_text
#     except openai.error.OpenAIError as e:
#         print("OpenAI Error:", e)
#         return "Some Error..."
#     except Exception as e:
#         print("Error:", e)
#         return "Some Error..."

# def say(text):
#     print(text)
#     try:
#         tts = gTTS(text, lang="en")
#         tts.save("audio.mp3")
#         playsound("audio.mp3")
#     except Exception as e:
#         print("Error playing sound:", e)

# def takeCommand():
#     r = sr.Recognizer()
#     with sr.Microphone() as source:
#         audio = r.listen(source)
#         try:
#             query = r.recognize_google(audio, language="en-in")
#             print(f"User said: {query}")
#             return query
#         except Exception as e:
#             print("Error recognizing speech:", e)
#             return "Some Error Occurred, sorry..."

# if __name__ == "__main__":
#     say("hello, I am Era, I am your interviewer...")
#     say("please tell me about yourself.")







import os
import random
import speech_recognition as sr
import openai
from gtts import gTTS
import ffmpeg

# Set up OpenAI API key
apikey = os.getenv("OPENAI_API_KEY")
# apikey = ""

openai.api_key = apikey

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
        say(response_text)
        chatStr += response_text
        if not os.path.exists("Openai"):
            os.mkdir("Openai")
        with open(f"Openai/prompt-{random.randint(1, 4565)}.txt", "w") as f:
            f.write(chatStr)
        return response_text
    except openai.error.OpenAIError as e:
        print("OpenAI Error:", e)
        return "Some Error..."
    except Exception as e:
        print("Error:", e)
        return "Some Error..."

def say(text):
    print(text)
    sound = gTTS(text, lang="en")
    audio_file = "audio.mp3"
    sound.save(audio_file)

    # Play the audio using ffmpeg
    ffmpeg.input(audio_file).output("pipe:", format="wav").run(quiet=True, overwrite_output=True)

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

if __name__ == "__main__":
    say("hello, I am Era, I am your interviewer...")
    say("please... tell me about yourself.")
    

    print("Listening....")
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

  #-----------------------------------------------------

    say("ok.. give me defination of Object oriented porgraming...")
#     i = 1
#     while i < 4:
#         print("Listeing....")
#         query = takeCommand()
#         chat(query)
#         i += 1
#     print("Listeing....")
#     query = takeCommand()

#     say("So, What is Data base...")
#     i = 1
#     while i < 4:
#         print("Listeing....")
#         query = takeCommand()
#         chat(query)
#         i += 1
#     print("Listeing....")
#     query = takeCommand()

#     say("So, What is SQL.")
#     i = 1
#     while i < 4:
#         print("Listeing....")
#         query = takeCommand()
#         chat(query)
#         i += 1
#     print("Listeing....")
#     query = takeCommand()

#     say("Please tell me about Project you made during your college time")
#     i = 1
#     while i < 6:
#         print("Listeing....")
#         query = takeCommand()
#         chat(query)
#         i += 1
#     print("Listeing....")
#     query = takeCommand()

#     say("ok, Have you create any other projects.. please tell me yes or no")
#     query = takeCommand()
#     if "yes".lower() in query.lower():
#         say("Please tell me about Other Projects")
#         i = 1
#         while i < 5:
#             print("Listeing....")
#             query = takeCommand()
#             chat(query)
#             i += 1
#         print("Listeing....")
#         query = takeCommand()
#     else:
#         say("No.. problem")

#     say("Please tell me about your hobbies")
#     i = 1
#     while i < 3:
#         print("Listeing....")
#         query = takeCommand()
#         chat(query)
#         i += 1
#     print("Listeing....")
#     query = takeCommand()

#     say("What are your greatest strengths")
#     i = 1
#     while i < 3:
#         print("Listeing....")
#         query = takeCommand()
#         chat(query)
#         i += 1
#     print("Listeing....")
#     query = takeCommand()

#     say("What are your greatest Weaknesses")
#     i = 1
#     while i < 3:
#         print("Listeing....")
#         query = takeCommand()
#         chat(query)
#         i += 1
#     print("Listeing....")
#     query = takeCommand()

#     say("Please tell me about some achievement in your life")
#     i = 1
#     while i < 3:
#         print("Listeing....")
#         query = takeCommand()
#         chat(query)
#         i += 1
#     print("Listeing....")
#     query = takeCommand()

#     say("why do you want to work for our company")
#     i = 1
#     while i < 3:
#         print("Listeing....")
#         query = takeCommand()
#         chat(query)
#         i += 1
#     print("Listeing....")
#     query = takeCommand()

#     say("ok.. thank you...")