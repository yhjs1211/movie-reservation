# movie-reservation

---

# ERD

<img width="1046" alt="image" src="https://github.com/yhjs1211/movie-reservation/assets/122883378/274d5dc8-c3d0-4187-8654-7ad1d7929bf9">


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
