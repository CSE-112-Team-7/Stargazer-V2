# ADRS 6 Server Construction
## Context and Problem
### Context:
the previous team deployed their website compeletely using github pages. This is a poor decision for multiple reasons
1) website is served as a wholy static instance - when a user accesses the site github pages IMMEDIATLY sends ALL assets to the client, requiring the clients browser
   to load all assets (of which we have over 80!) simultanously, resulting in an incredibly slow load to our homepage. 
2) as all assets are sent at once there is NO server side computation on github pages, meaning the only "features" we could add is just adding more pages, we can't track
   analytics, or store anything in a database, or allow users to connect to other users, or really any features a good modern day site has 
### Problem:
constructing a server is an intense, ardious process that will require multiple sprints, and constant communication between multiple teams to get stuff done. Luckily we have
people on our team experienced in backend coding but nonetheless it will require the creation of tons of post methods, and over 80 getters/setters just to load assets

## Solution:
we will form a backend team which works solely on porting all assets and working with front-end teams to hook up new features/functions that are both backend/frontend
@Barak-Horowitz has the most backend experience through his internship at a startup, as well as creating a website to store his resume so he will lead this team, at
every sprint they will have designated tasks and work with other teams
