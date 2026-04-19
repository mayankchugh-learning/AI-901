# import namespace
from openai import OpenAI
    
def main():
    
     try:
         # Configuration settings 
         endpoint = "https://local/openai"
         key = "key123"
         model_name = "local-llm"
    
         # Initialize the OpenAI client
         openai_client = OpenAI(
             base_url=endpoint,
             api_key=key
         )
            
         # Get a response to a prompt
         input_text = input('\nAgent: Enter a question about expense categories.\nYou: ')
         response = openai_client.responses.create(
                     model=model_name,
                     instructions="""
                       You are a helpful AI agent that assists employees with expense claim categorization.
                       Always apply the following category recommendations:
                       - 'Transportation' for taxis, rideshares, trains, buses, and flights.
                       - 'Meals' for food and drinks including breakfast, lunch, and dinner.
                       - 'Accommodation' for hotels, motels, and other lodging.
                       - 'Miscellaneous' for anything else.
                     """,
                     input=input_text
         )
         print(f"Agent: {response.output_text}")
                
    
     except Exception as ex:
         print(ex)
    
if __name__ == '__main__':
     main()