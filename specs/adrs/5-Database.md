# ADRS 5: Database to store user information

## Context and Problem:

Context:
we want to construct a database to store user information, as well as horoscope information so that we can implement two new features:
1) register accounts and allow users to vist "friends" accounts to look at their horoscope data
2) display previous horoscope data to user so that they can mark whether or not the horoscope "came true"
Problem:
adding a database is a massive migration, there are tons of options to choose from and once we choose one it could make the website slow, and would likely result
a heavy increase in upkeep cost.

## considered options
1) no database usage, store all horoscope information in local storage- we decided not to implement this option as it would result in a P2P connection
   being necessary in order to implement the "friends" feature making it much more slower and a pain to implement.
2) PostGreSQL database using Ruby on Rails - using a PostGreSQL database with ruby on rails would result in us creating our own server to store the database on
   this would mean we could store all data for free and access it easily by using the same Heroku deployment to store the server - we decided not to implement
   this feature as it would necessitate us porting ALL of our code to ruby on rails which would be a lengthy process, and require multiple team members to learn a
   compeletely new language
3) **MongoDB remote Database** - we ended up choosing this option as MongoDB offers a free 5GB database for people with valid UCSD emails, although this is relatively small we do not expect to generate a wide user base and believe this will be more then large enough. in addition MongoDB offers an extremely helpful, well documented API that requires no SQL to use, and handles all input sanitization for us. We decided that these two options outweighed any small amounts of lag that would be caused by having to access a remote database from our server 
