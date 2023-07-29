# movie-reservation

---

# ERD

![image](https://github.com/yhjs1211/movie-reservation/assets/122883378/873ee1c8-3c11-4f56-bf73-f19e58a5ac64)




---

# API Description

> Users
> 
GET '/users/me' - getProfile
>
POST '/users/login' - login
>
GET '/users/logout' - logout
>
POST '/users' - signup
>
PATCH '/users' - updateProfile
>
DELETE '/users' - withdrawUser
>
> Shows
>
GET '/shows' - getShows
>
POST '/shows' - createShow
>
PATCH '/shows' - updateShow
>
DELETE '/shows' - closeShow
>
GET '/shows/:showId' - getShow
>
> Timetables
>
GET '/timetable?id=:showId&date=:date' - getTimetables
