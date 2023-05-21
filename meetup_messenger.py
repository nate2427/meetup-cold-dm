from selenium import webdriver
from MeetupAPI import Meetup
import os
from dotenv import load_dotenv
load_dotenv()

meetup_api_key = os.getenv('MEETUP_API_KEY')
meetup_secret = os.getenv('MEETUP_SECRET_KEY')

meetup_client = Meetup(access_token=meetup_api_key,
                       client_secret=meetup_secret, group="street-coders-ai-coders-atl", )


# print(meetup_client.events(maximum_num_results=1))

meetup_client.message(receiver_members={
                      'name': 'Jean Baptiste', 'id': '1239783669398904832'}, message='Hello There!')
