# movie-reservation

---

# ERD

![image](https://github.com/yhjs1211/movie-reservation/assets/122883378/308f5598-f309-4a0c-8b4d-3481a5d46a7f)



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
