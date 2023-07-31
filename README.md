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
GET '/shows/:showId' - getShow
>
GET '/shows' - getShows
>
GET '/shows?category=:category' - getShowsByCategory
>
GET '/shows?name=:name' - getShowsByName
>
POST '/shows' - createShow
>
DELETE '/shows' - closeShow
>
> Timetables
>
GET '/timetable?id=:showId&date=:date' - getTimetableOnDate
>
POST '/timetable?id=:showId&date=:date' - createTimetable
>
PATCH '/timetable?id=:showId&date=:date' - updateTimetable
>
DELETE '/timetable?id=:showId&date=:date' - deleteTimetable
>
> Seats
>
